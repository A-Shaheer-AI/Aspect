import { NextRequest, NextResponse } from "next/server";
import { getLeadByPhone, saveOrUpdateLead, appendMessage, muteAiForLead, unmuteAiForLead } from "@/lib/leads/store";
import { evaluateCustomerMessage } from "@/lib/ai/sms-agent";
import { sendSms, normalizeAuPhone } from "@/lib/telephony/twilio-client";

// Helper for human delay
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

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

    if (!from || !body) {
      return new NextResponse("<Response></Response>", {
        headers: { "Content-Type": "text/xml" },
        status: 200
      });
    }

    const normPhone = normalizeAuPhone(from);
    const trimmedBody = body.trim();

    console.log(`\n📨 [Inbound SMS Received] From: ${normPhone} | Message: "${trimmedBody}"`);

    // 1. Manual Kill-Switch / Override Commands
    if (/^#(pause|mute|stop-ai)$/i.test(trimmedBody)) {
      muteAiForLead(normPhone, "Manual kill-switch command received via SMS");
      await sendSms(normPhone, "⚠️ Aspect AI paused for this conversation. You can reply directly now.");
      return new NextResponse("<Response></Response>", { headers: { "Content-Type": "text/xml" } });
    }

    if (/^#(resume|unmute|start-ai)$/i.test(trimmedBody)) {
      unmuteAiForLead(normPhone);
      await sendSms(normPhone, "✅ Aspect AI resumed for this conversation.");
      return new NextResponse("<Response></Response>", { headers: { "Content-Type": "text/xml" } });
    }

    // 2. Fetch or initialize lead profile
    let lead = getLeadByPhone(normPhone);
    if (!lead) {
      lead = saveOrUpdateLead({
        phone: normPhone,
        name: "Prospect",
        suburb: "Perth",
        status: "CONTACTED"
      });
    }

    // 3. Log user message to conversation history
    appendMessage(normPhone, "user", trimmedBody);

    // 4. Check if AI is currently muted for this lead
    if (lead.is_ai_muted) {
      console.log(`🔇 [AI Muted] Thread ${normPhone} is muted. AI is staying silent.`);
      return new NextResponse("<Response></Response>", { headers: { "Content-Type": "text/xml" } });
    }

    // 5. Evaluate message through the AI Brain
    const decision = await evaluateCustomerMessage(lead, trimmedBody);

    // 6. If out of scope, the AI evaluator already set is_ai_muted=true and alerted Ahmed
    if (!decision.can_answer || !decision.reply_text) {
      console.log(`🤫 [Silent Escalation] No SMS sent to customer. Thread muted. Waiting for Ahmed.`);
      return new NextResponse("<Response></Response>", { headers: { "Content-Type": "text/xml" } });
    }

    // 7. In Scope: Apply natural human delay (35–60 seconds, or 3s in local development)
    const isDev = process.env.NODE_ENV !== "production";
    const delayMs = isDev ? 3000 : Math.floor(Math.random() * (55000 - 35000) + 35000);
    console.log(`⏳ Applying natural human delay: ${(delayMs / 1000).toFixed(1)} seconds before responding...`);
    await sleep(delayMs);

    // 8. Re-check if thread was muted by Ahmed during the delay
    const currentLead = getLeadByPhone(normPhone);
    if (currentLead?.is_ai_muted) {
      console.log(`🚫 Thread was muted during human delay. Canceling outgoing reply.`);
      return new NextResponse("<Response></Response>", { headers: { "Content-Type": "text/xml" } });
    }

    // 9. Send the natural SMS reply to customer
    await sendSms(normPhone, decision.reply_text);
    appendMessage(normPhone, "assistant", decision.reply_text);

    return new NextResponse("<Response></Response>", {
      headers: { "Content-Type": "text/xml" },
      status: 200
    });
  } catch (error: any) {
    console.error("Error in SMS Webhook handler:", error);
    return new NextResponse("<Response></Response>", {
      headers: { "Content-Type": "text/xml" },
      status: 200
    });
  }
}
