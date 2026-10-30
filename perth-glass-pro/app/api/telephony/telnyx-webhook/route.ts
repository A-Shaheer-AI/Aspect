import { NextRequest, NextResponse, after } from "next/server";
import { processInboundSms } from "@/lib/telephony/inbound-handler";

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

    // Telnyx sends different event types (e.g. message.sent, message.finalized, message.received)
    // We only process incoming customer messages: "message.received"
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
