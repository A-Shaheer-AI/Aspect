import { NextRequest, NextResponse, after } from "next/server";
import { processInboundSms } from "@/lib/telephony/inbound-handler";
import { isAiSentMessage, normalizeAuPhone, getOwnerAlertPhone } from "@/lib/telephony/sms-service";
import { muteAiForLead, appendMessage } from "@/lib/leads/store";

export const maxDuration = 60;

// In-memory set to prevent duplicate webhook processing if Telnyx or network retries
const processedMessageIds = new Set<string>();

/**
 * Telnyx Inbound SMS Webhook
 * Configured in Telnyx Portal -> Messaging -> Messaging Profiles -> Inbound Settings
 */
export async function POST(req: NextRequest) {
  try {
    const payload = await req.json().catch(() => ({}));
    const eventType = payload.data?.event_type;

    // 1. Telnyx Outbound Event: Detect Human Operator Takeover
    // If a human sends a message from the Telnyx Portal or Telnyx mobile app, auto-disable the AI
    if (eventType === "message.sent" || eventType === "message.finalized") {
      const msgData = payload.data?.payload;
      const messageId = msgData?.id;
      const recipient = msgData?.to?.[0]?.phone_number;
      const text = msgData?.text || "";

      if (messageId && !isAiSentMessage(messageId)) {
        if (recipient) {
          const normRecipient = normalizeAuPhone(recipient);
          const ownerPhone = normalizeAuPhone(getOwnerAlertPhone());

          // Only mute if the message was sent to a customer (not an internal alert to owner)
          if (normRecipient && normRecipient !== ownerPhone) {
            console.log(`🛑 [Human Takeover Detected] Human operator sent manual SMS to ${normRecipient}: "${text}". Auto-disabling AI.`);
            muteAiForLead(normRecipient, `Auto-disabled: Human operator sent manual SMS ("${text.slice(0, 40)}...")`);
            appendMessage(normRecipient, "assistant", text);
          }
        }
      }
      return NextResponse.json({ received: true, human_takeover_checked: true }, { status: 200 });
    }

    // 2. Telnyx Inbound Event: Incoming customer or owner SMS
    if (eventType === "message.received") {
      const msgData = payload.data?.payload;
      const messageId = msgData?.id || payload.data?.id;
      const from = msgData?.from?.phone_number || "";
      const body = msgData?.text || "";

      // Deduplication: if Telnyx or network retries the exact same message, acknowledge and exit
      if (messageId && processedMessageIds.has(messageId)) {
        console.log(`ℹ️ [Telnyx Deduplication] Skipping already processed message ID: ${messageId}`);
        return NextResponse.json({ received: true, duplicate: true }, { status: 200 });
      }

      if (messageId) {
        processedMessageIds.add(messageId);
        if (processedMessageIds.size > 1000) {
          const first = processedMessageIds.values().next().value;
          if (first) processedMessageIds.delete(first);
        }
      }

      // Schedule background execution using Next.js 15 after() so Telnyx receives HTTP 200 in <50ms
      after(async () => {
        try {
          await processInboundSms({
            from,
            body,
            provider: "telnyx"
          });
        } catch (processErr) {
          console.error("Error processing inbound SMS in background:", processErr);
        }
      });
    }

    // Telnyx gets 200 OK immediately, eliminating timeouts and duplicate retries
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error("Telnyx Webhook Error:", error);
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 });
  }
}
