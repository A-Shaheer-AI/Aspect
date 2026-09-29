import { getLeadByPhone, saveOrUpdateLead, appendMessage, muteAiForLead, unmuteAiForLead } from "@/lib/leads/store";
import { evaluateCustomerMessage } from "@/lib/ai/sms-agent";
import { sendSms, normalizeAuPhone } from "./sms-service";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface InboundMessageParams {
  from: string;
  body: string;
  provider: "telnyx" | "twilio" | "simulation";
}

/**
 * Common inbound SMS handler for Telnyx and Twilio
 */
export async function processInboundSms({ from, body, provider }: InboundMessageParams) {
  if (!from || !body) {
    return { status: "ignored_empty" };
  }

  const normPhone = normalizeAuPhone(from);
  const trimmedBody = body.trim();

  console.log(`\n📨 [Inbound SMS via ${provider.toUpperCase()}] From: ${normPhone} | Message: "${trimmedBody}"`);

  // 1. Manual Kill-Switch / Override Commands
  if (/^#(pause|mute|stop-ai)$/i.test(trimmedBody)) {
    muteAiForLead(normPhone, "Manual kill-switch command received via SMS");
    await sendSms(normPhone, "⚠️ Aspect AI paused for this conversation. You can reply directly now.");
    return { status: "paused_by_user" };
  }

  if (/^#(resume|unmute|start-ai)$/i.test(trimmedBody)) {
    unmuteAiForLead(normPhone);
    await sendSms(normPhone, "✅ Aspect AI resumed for this conversation.");
    return { status: "resumed_by_user" };
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
    return { status: "muted_silent" };
  }

  // 5. Evaluate message through the AI Brain
  const decision = await evaluateCustomerMessage(lead, trimmedBody);

  // 6. If out of scope: silent escalation (AI evaluator already alerted Ahmed)
  if (!decision.can_answer || !decision.reply_text) {
    console.log(`🤫 [Silent Escalation] No SMS sent to customer. Thread muted. Waiting for Ahmed.`);
    return { status: "out_of_scope_escalated" };
  }

  // 7. In Scope: Apply natural human delay (35–60s, or 3s in local dev/testing)
  const isDev = process.env.NODE_ENV !== "production";
  const delayMs = isDev ? 3000 : Math.floor(Math.random() * (55000 - 35000) + 35000);
  console.log(`⏳ Applying natural human delay: ${(delayMs / 1000).toFixed(1)} seconds before responding...`);
  await sleep(delayMs);

  // 8. Re-check if thread was muted by Ahmed during the delay
  const currentLead = getLeadByPhone(normPhone);
  if (currentLead?.is_ai_muted) {
    console.log(`🚫 Thread was muted during human delay. Canceling outgoing reply.`);
    return { status: "cancelled_during_delay" };
  }

  // 9. Send the natural SMS reply to customer
  await sendSms(normPhone, decision.reply_text);
  appendMessage(normPhone, "assistant", decision.reply_text);

  return { status: "replied", replySent: decision.reply_text };
}
