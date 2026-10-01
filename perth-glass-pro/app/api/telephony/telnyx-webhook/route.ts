import { NextRequest, NextResponse } from "next/server";
import { processInboundSms } from "@/lib/telephony/inbound-handler";

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
      const from = msgData?.from?.phone_number || "";
      const body = msgData?.text || "";

      await processInboundSms({
        from,
        body,
        provider: "telnyx"
      });
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error("Telnyx Webhook Error:", error);
    return NextResponse.json({ error: "Failed to process webhook" }, { status: 500 });
  }
}
