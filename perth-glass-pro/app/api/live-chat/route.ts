import { NextRequest, NextResponse } from "next/server";
import {
  getChatSession,
  saveOrUpdateChatSession,
  appendChatMessage,
  setChatHumanTakeover
} from "@/lib/chat/store";
import {
  FIRST_MESSAGE_GREETING,
  evaluateLiveChatMessage
} from "@/lib/ai/live-chat-agent";
import { sendSms, getOwnerAlertPhone } from "@/lib/telephony/sms-service";

export const maxDuration = 60;

/**
 * Format entire chat transcript for SMS notification
 */
function formatFullTranscript(session: any): string {
  const lines = session.messages.map((m: any) => {
    const sender = m.role === "user" ? "Customer" : m.role === "owner" ? "Ahmed" : "Fazal (AI)";
    return `${sender}: "${m.body}"`;
  });
  return lines.join("\n");
}

/**
 * POST /api/live-chat
 * Handles incoming customer messages, 2-minute timer logic, AI replies, and owner SMS alerts
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { message, forceAi } = body;
    let sessionId = body.sessionId;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Empty message" }, { status: 400 });
    }

    const trimmed = message.trim();
    const ownerPhone = getOwnerAlertPhone();

    // 1. Initialize or load session
    if (!sessionId) {
      sessionId = `chat_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    }

    let session = getChatSession(sessionId);
    if (!session) {
      session = saveOrUpdateChatSession({
        id: sessionId,
        isHumanTakeover: false,
        messages: []
      });
    }

    // Append user message
    session = appendChatMessage(sessionId, "user", trimmed);

    const userMessages = session.messages.filter(m => m.role === "user");
    const isFirstUserTurn = userMessages.length === 1;

    // =========================================================================
    // TURN 1: FIRST MESSAGE PROTOCOL
    // =========================================================================
    if (isFirstUserTurn) {
      const aiReply = FIRST_MESSAGE_GREETING;
      session = appendChatMessage(sessionId, "assistant", aiReply);

      // Trigger instant SMS alert to business owner so Ahmed can jump in
      const alertMsg = `💬 [NEW WEBSITE LIVE CHAT]\nCustomer: "${trimmed}"\nAI: "${aiReply}"\n\n👉 Reply to this SMS with "#chat ${trimmed}" or visit admin to take over!`;
      try {
        await sendSms(ownerPhone, alertMsg);
      } catch (smsErr) {
        console.error("Failed to send live chat alert to owner:", smsErr);
      }

      return NextResponse.json({
        sessionId,
        reply: aiReply,
        isFirstTurn: true,
        waitingForOwner: true,
        messages: session.messages
      });
    }

    // =========================================================================
    // SUBSEQUENT TURNS: 2-MINUTE TAKEOVER & AI FALLBACK
    // =========================================================================
    // If owner has already taken over, do not auto-reply with AI
    if (session.isHumanTakeover) {
      // Alert owner of the customer's new reply
      const followupMsg = `💬 [LIVE CHAT - ${sessionId}]\nCustomer: "${trimmed}"\n\n(AI is paused because you are in control)`;
      try {
        await sendSms(ownerPhone, followupMsg);
      } catch {}

      return NextResponse.json({
        sessionId,
        waitingForOwner: true,
        messages: session.messages
      });
    }

    // If client requested AI timeout (2 minutes elapsed) or forceAi is true:
    if (forceAi) {
      const aiReply = await evaluateLiveChatMessage(trimmed, session);
      session = appendChatMessage(sessionId, "assistant", aiReply);

      // Send updated notification to owner with the WHOLE conversation
      const fullTranscript = formatFullTranscript(session);
      const transcriptMsg = `📜 [LIVE CHAT TRANSCRIPT - ${sessionId}]\n${fullTranscript}\n\n(AI replied after 2m wait. Reply to take over anytime.)`;
      try {
        await sendSms(ownerPhone, transcriptMsg);
      } catch (smsErr) {
        console.error("Failed to send full transcript SMS:", smsErr);
      }

      return NextResponse.json({
        sessionId,
        reply: aiReply,
        waitingForOwner: false,
        messages: session.messages
      });
    }

    // Default for subsequent customer messages before 2m timeout:
    // Send immediate SMS alert to owner with customer's latest question
    const alertFollowup = `💬 [LIVE CHAT UPDATE - ${sessionId}]\nCustomer: "${trimmed}"\n\n👉 You have 2 minutes to reply before AI jumps in!`;
    try {
      await sendSms(ownerPhone, alertFollowup);
    } catch {}

    return NextResponse.json({
      sessionId,
      waitingForOwner: true,
      messages: session.messages
    });
  } catch (error: any) {
    console.error("Error in /api/live-chat:", error);
    return NextResponse.json({ error: "Failed to process chat" }, { status: 500 });
  }
}

/**
 * GET /api/live-chat?sessionId=...
 * Polling endpoint for the widget to retrieve new messages (e.g. from owner or background AI)
 */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
  }

  const session = getChatSession(sessionId);
  if (!session) {
    return NextResponse.json({ messages: [], isHumanTakeover: false });
  }

  return NextResponse.json({
    sessionId: session.id,
    messages: session.messages,
    isHumanTakeover: session.isHumanTakeover,
    updatedAt: session.updatedAt
  });
}
