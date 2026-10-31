import { getLeadByPhone, saveOrUpdateLead, appendMessage, muteAiForLead, unmuteAiForLead, getLatestActiveLead } from "@/lib/leads/store";
import { getLatestActiveChatSession, appendChatMessage, setChatHumanTakeover } from "@/lib/chat/store";
import { evaluateCustomerMessage } from "@/lib/ai/sms-agent";
import { sendSms, normalizeAuPhone, getOwnerAlertPhone, mirrorConversationToOwner } from "./sms-service";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface InboundMessageParams {
  from: string;
  body: string;
  provider: "clicksend" | "telnyx" | "twilio" | "simulation";
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
  const ownerPhone = normalizeAuPhone(getOwnerAlertPhone());
  const isFromOwner = normPhone === ownerPhone;

  console.log(`\n📨 [Inbound SMS via ${provider.toUpperCase()}] From: ${normPhone}${isFromOwner ? " (OWNER)" : ""} | Message: "${trimmedBody}"`);

  // =========================================================================
  // 1. Remote Phone Control: ANY message from Owner automatically disables AI
  // =========================================================================
  if (isFromOwner) {
    // 1A. Check for live chat injection: #chat [message]
    const chatMatch = trimmedBody.match(/^#(?:chat|web|live)(?:\s+(.+))?$/i);
    if (chatMatch) {
      const chatText = chatMatch[1] ? chatMatch[1].trim() : "";
      const latestChat = getLatestActiveChatSession();
      if (latestChat && chatText) {
        appendChatMessage(latestChat.id, "owner", chatText);
        setChatHumanTakeover(latestChat.id, true);
        await sendSms(ownerPhone, `✅ [LIVE CHAT DELIVERED] Your message was posted to website visitor on chat ${latestChat.id}.`);
        return { status: "owner_replied_live_chat", target: latestChat.id };
      } else if (!latestChat) {
        await sendSms(ownerPhone, `⚠️ No active live chat found to reply to.`);
        return { status: "owner_chat_no_target" };
      }
    }

    // 1B. Check for explicit resume/unmute command
    const resumeMatch = trimmedBody.match(/^#(resume|unmute|start)(?:\s+([+0-9\s]+))?$/i);
    if (resumeMatch) {
      const explicitPhone = resumeMatch[2] ? normalizeAuPhone(resumeMatch[2].trim()) : null;
      const targetLead = explicitPhone ? getLeadByPhone(explicitPhone) : getLatestActiveLead();

      if (targetLead) {
        unmuteAiForLead(targetLead.phone);
        await sendSms(ownerPhone, `✅ [AI RESUMED] Fazal is now ACTIVE again for ${targetLead.name} (${targetLead.phone}).`);
        return { status: "owner_resumed_lead", target: targetLead.phone };
      } else {
        await sendSms(ownerPhone, `⚠️ No active lead found to resume. Usage: #resume <phone_number>`);
        return { status: "owner_command_no_target" };
      }
    }

    // For ANY OTHER message from owner (e.g. #stop, "stop", "taking over", "calling now", or any text):
    // AUTOMATICALLY DISABLE THE AI for the active lead!
    const phoneMatch = trimmedBody.match(/(?:\+61|0)4\d{8}/);
    const explicitPhone = phoneMatch ? normalizeAuPhone(phoneMatch[0]) : null;
    const targetLead = explicitPhone ? getLeadByPhone(explicitPhone) : getLatestActiveLead();

    if (targetLead) {
      muteAiForLead(targetLead.phone, `Auto-disabled: Owner sent message from phone ("${trimmedBody}")`);
      await sendSms(ownerPhone, `🛑 [AI DISABLED] Human takeover detected. Fazal is MUTED for ${targetLead.name} (${targetLead.phone}). You have full manual control. (Reply #resume to re-enable)`);
      return { status: "owner_muted_lead", target: targetLead.phone };
    } else {
      await sendSms(ownerPhone, `⚠️ No active lead found to mute. Include the customer phone number in your text to mute them.`);
      return { status: "owner_command_no_target" };
    }
  }

  // =========================================================================
  // 2. Customer Direct Opt-Out / Kill-Switch
  // =========================================================================
  if (/^#(pause|mute|stop|stop-ai)$/i.test(trimmedBody)) {
    muteAiForLead(normPhone, "Manual kill-switch command received from customer");
    await sendSms(normPhone, "⚠️ Aspect AI paused for this conversation. You can reply directly now.");
    return { status: "paused_by_user" };
  }

  if (/^#(resume|unmute|start|start-ai)$/i.test(trimmedBody)) {
    unmuteAiForLead(normPhone);
    await sendSms(normPhone, "✅ Aspect AI resumed for this conversation.");
    return { status: "resumed_by_user" };
  }

  // =========================================================================
  // 3. Fetch or Initialize Lead Profile
  // =========================================================================
  let lead = getLeadByPhone(normPhone);
  if (!lead) {
    lead = saveOrUpdateLead({
      phone: normPhone,
      name: "Prospect",
      suburb: "Perth",
      lead_source: "sms",
      status: "CONTACTED"
    });
  }

  // Log user message to conversation history
  appendMessage(normPhone, "user", trimmedBody);

  // Check if AI is currently muted for this lead
  if (lead.is_ai_muted) {
    console.log(`🔇 [AI Muted] Thread ${normPhone} is muted. AI is staying silent.`);
    return { status: "muted_silent" };
  }

  // =========================================================================
  // 4. Evaluate Message Through the Fazal AI Brain
  // =========================================================================
  const decision = await evaluateCustomerMessage(lead, trimmedBody);

  // If out of scope or off-track: AI stays silent (evaluateCustomerMessage already alerted Ahmed)
  if (!decision.can_answer || !decision.reply_text) {
    console.log(`🤫 [Silent Escalation] No SMS sent to customer. Thread muted. Waiting for Ahmed.`);
    return { status: "out_of_scope_escalated" };
  }

  // =========================================================================
  // 5. Natural Human Delay Protocol
  // First Message: ~15 seconds
  // Subsequent Messages: ~45 seconds
  // =========================================================================
  const assistantCount = lead.messages.filter(m => m.role === "assistant").length;
  const isFirstAssistantTurn = assistantCount === 0;

  const isDev = process.env.NODE_ENV !== "production";
  const configuredSec = process.env.SMS_DELAY_SECONDS ? parseFloat(process.env.SMS_DELAY_SECONDS) : null;

  let delayMs: number;
  if (configuredSec !== null) {
    delayMs = Math.max(1000, Math.round(configuredSec * 1000));
  } else if (isDev) {
    delayMs = 2000; // 2s in dev for instant feedback
  } else if (isFirstAssistantTurn) {
    // 15 seconds for initial greeting
    delayMs = Math.floor(Math.random() * (16000 - 14000) + 14000);
  } else {
    // 45 seconds cadence for subsequent questions
    delayMs = Math.floor(Math.random() * (48000 - 42000) + 42000);
  }

  console.log(`⏳ Applying natural human delay: ${(delayMs / 1000).toFixed(1)} seconds before Fazal replies...`);
  await sleep(delayMs);

  // Re-check if thread was muted by Ahmed during the delay
  const currentLead = getLeadByPhone(normPhone);
  if (currentLead?.is_ai_muted) {
    console.log(`🚫 Thread was muted during human delay. Canceling outgoing reply.`);
    return { status: "cancelled_during_delay" };
  }

  // =========================================================================
  // 6. Send Reply to Customer & Mirror to Owner's Phone
  // =========================================================================
  await sendSms(normPhone, decision.reply_text);
  appendMessage(normPhone, "assistant", decision.reply_text);

  // Mirror exchange to Ahmed's phone in real-time
  try {
    await mirrorConversationToOwner(normPhone, trimmedBody, decision.reply_text);
  } catch (mirrorErr) {
    console.warn("Notice: mirror SMS failed:", mirrorErr);
  }

  return { status: "replied", replySent: decision.reply_text };
}
