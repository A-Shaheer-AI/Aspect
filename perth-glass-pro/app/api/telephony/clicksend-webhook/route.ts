import { NextRequest, NextResponse } from "next/server";
import { processInboundSms } from "@/lib/telephony/inbound-handler";

/**
 * ClickSend Inbound SMS Webhook
 * Configured in ClickSend Dashboard -> SMS -> Inbound Rules / Webhooks
 * Sends payload as x-www-form-urlencoded or JSON
 */
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let from = "";
    let body = "";

    if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      from = (formData.get("from") as string) || (formData.get("From") as string) || "";
      body = (formData.get("body") as string) || (formData.get("message") as string) || (formData.get("Body") as string) || "";
    } else {
      const json = await req.json().catch(() => ({}));
      from = json.from || json.From || json.source || "";
      body = json.body || json.message || json.Body || "";
    }

    if (!from || !body) {
      console.warn("⚠️ [ClickSend Webhook] Missing from or body in payload");
      return NextResponse.json({ status: "ignored_empty" }, { status: 200 });
    }

    await processInboundSms({
      from,
      body,
      provider: "clicksend"
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    console.error("ClickSend Webhook Error:", error);
    return NextResponse.json({ error: "Failed to process ClickSend webhook" }, { status: 500 });
  }
}
