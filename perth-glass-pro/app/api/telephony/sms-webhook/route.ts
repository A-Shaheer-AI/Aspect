import { NextRequest, NextResponse } from "next/server";
import { processInboundSms } from "@/lib/telephony/inbound-handler";

/**
 * Twilio Inbound SMS Webhook
 */
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let from = "";
    let body = "";

    if (contentType.includes("application/x-www-form-urlencoded") || contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      from = (formData.get("From") as string) || "";
      body = (formData.get("Body") as string) || "";
    } else {
      const json = await req.json().catch(() => ({}));
      from = json.From || json.from || "";
      body = json.Body || json.body || "";
    }

    await processInboundSms({
      from,
      body,
      provider: "twilio"
    });

    return new NextResponse("<Response></Response>", {
      headers: { "Content-Type": "text/xml" },
      status: 200
    });
  } catch (error: any) {
    console.error("Twilio SMS Webhook Error:", error);
    return new NextResponse("<Response></Response>", {
      headers: { "Content-Type": "text/xml" },
      status: 200
    });
  }
}
