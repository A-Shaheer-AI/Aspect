import { NextRequest, NextResponse } from "next/server";
import { getChatSession, appendChatMessage, setChatHumanTakeover } from "@/lib/chat/store";

export const maxDuration = 60;

/**
 * POST /api/live-chat/owner-reply
 * Posts an owner/operator message into the active live chat session and pauses the AI
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { sessionId, message } = body;

    if (!sessionId || !message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Missing sessionId or message" }, { status: 400 });
    }

    const session = getChatSession(sessionId);
    if (!session) {
      return NextResponse.json({ error: "Chat session not found" }, { status: 404 });
    }

    // Append owner message and flag human takeover
    const updated = appendChatMessage(sessionId, "owner", message.trim());
    setChatHumanTakeover(sessionId, true);

    console.log(`👨‍💼 [Live Chat Human Takeover] Ahmed posted to ${sessionId}: "${message.trim()}"`);

    return NextResponse.json({
      success: true,
      sessionId,
      messages: updated.messages
    });
  } catch (error: any) {
    console.error("Error in /api/live-chat/owner-reply:", error);
    return NextResponse.json({ error: "Failed to post owner reply" }, { status: 500 });
  }
}
