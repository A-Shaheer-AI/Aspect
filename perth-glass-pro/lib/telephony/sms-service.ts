import twilio from "twilio";

/**
 * Normalizes any Australian mobile number into standard E.164 format (+614XXXXXXXX)
 */
export function normalizeAuPhone(phone: string): string {
  if (!phone) return "";
  let cleaned = phone.replace(/[^0-9+]/g, "");

  // Strip accidental UK extension (+44, 0044, or 44) attached by browser autofill
  if (cleaned.startsWith("+44") || cleaned.startsWith("0044")) {
    cleaned = cleaned.replace(/^(\+44|0044)/, "");
    if (cleaned.startsWith("0")) cleaned = cleaned.substring(1);
    if (/^4\d{8}$/.test(cleaned)) {
      return "+61" + cleaned;
    }
  }

  if (cleaned.startsWith("+61")) return cleaned;
  if (cleaned.startsWith("61") && cleaned.length === 11) return "+" + cleaned;
  if (cleaned.startsWith("04") && cleaned.length === 10) return "+61" + cleaned.substring(1);
  if (cleaned.startsWith("4") && cleaned.length === 9) return "+61" + cleaned;

  return cleaned.startsWith("+") ? cleaned : `+${cleaned}`;
}

export type SmsProvider = "clicksend" | "telnyx" | "twilio" | "simulation";

/**
 * Detects which SMS provider is configured
 */
export function getActiveProvider(): SmsProvider {
  if (process.env.CLICKSEND_API_KEY && process.env.CLICKSEND_USERNAME) {
    return "clicksend";
  }
  if (process.env.TELNYX_API_KEY && process.env.TELNYX_PHONE_NUMBER) {
    return "telnyx";
  }
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_PHONE_NUMBER) {
    return "twilio";
  }
  return "simulation";
}

/**
 * Sends an SMS using ClickSend v3 REST API (Perth, WA based)
 */
async function sendViaClickSend(to: string, message: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const username = process.env.CLICKSEND_USERNAME;
  const apiKey = process.env.CLICKSEND_API_KEY;
  const fromNumber = process.env.CLICKSEND_PHONE_NUMBER;

  const auth = Buffer.from(`${username}:${apiKey}`).toString("base64");

  try {
    const res = await fetch("https://rest.clicksend.com/v3/sms/send", {
      method: "POST",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messages: [
          {
            to,
            body: message,
            from: fromNumber || undefined,
            source: "api"
          }
        ]
      })
    });

    const data = await res.json();

    if (!res.ok || data.response_code !== "SUCCESS") {
      const errMsg = data.response_msg || res.statusText;
      console.error(`❌ [ClickSend SMS Error] to ${to}:`, errMsg);
      return { success: false, error: errMsg };
    }

    const messageId = data.data?.messages?.[0]?.message_id || `cs_${Date.now()}`;
    console.log(`✅ [ClickSend SMS Sent] ID: ${messageId} to ${to}`);
    return { success: true, messageId };
  } catch (err: any) {
    console.error(`❌ [ClickSend Network Error] to ${to}:`, err.message || err);
    return { success: false, error: err.message };
  }
}

/**
 * Sends an SMS using Telnyx REST API (Super lightweight, ~4c AUD/SMS)
 */
async function sendViaTelnyx(to: string, message: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const apiKey = process.env.TELNYX_API_KEY;
  const fromNumber = process.env.TELNYX_PHONE_NUMBER;

  try {
    const res = await fetch("https://api.telnyx.com/v2/messages", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: fromNumber,
        to,
        text: message
      })
    });

    const data = await res.json();

    if (!res.ok) {
      const errMsg = data.errors?.[0]?.detail || res.statusText;
      console.error(`❌ [Telnyx SMS Error] to ${to}:`, errMsg);
      return { success: false, error: errMsg };
    }

    const messageId = data.data?.id;
    console.log(`✅ [Telnyx SMS Sent] ID: ${messageId} to ${to}`);
    return { success: true, messageId };
  } catch (err: any) {
    console.error(`❌ [Telnyx Network Error] to ${to}:`, err.message || err);
    return { success: false, error: err.message };
  }
}

/**
 * Sends an SMS using Twilio
 */
async function sendViaTwilio(to: string, message: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID!;
  const authToken = process.env.TWILIO_AUTH_TOKEN!;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER!;

  try {
    const client = twilio(accountSid, authToken);
    const result = await client.messages.create({
      body: message,
      from: fromNumber,
      to,
    });
    console.log(`✅ [Twilio SMS Sent] ID: ${result.sid} to ${to}`);
    return { success: true, messageId: result.sid };
  } catch (error: any) {
    console.error(`❌ [Twilio SMS Error] to ${to}:`, error.message || error);
    return { success: false, error: error.message || "Failed to send SMS" };
  }
}

/**
 * Unified SMS sender: automatically routes through Telnyx, Twilio, or safe simulation
 */
export async function sendSms(
  to: string,
  message: string
): Promise<{ success: boolean; messageId?: string; simulated?: boolean; provider: SmsProvider; error?: string }> {
  const normTo = normalizeAuPhone(to);
  const provider = getActiveProvider();

  if (provider === "clicksend") {
    const res = await sendViaClickSend(normTo, message);
    return { ...res, provider: "clicksend" };
  }

  if (provider === "telnyx") {
    const res = await sendViaTelnyx(normTo, message);
    return { ...res, provider: "telnyx" };
  }

  if (provider === "twilio") {
    const res = await sendViaTwilio(normTo, message);
    return { ...res, provider: "twilio" };
  }

  // Safe Simulation Mode
  console.log(`\n======================================================`);
  console.log(`📱 [SMS SIMULATION (${provider.toUpperCase()})] To: ${normTo}`);
  console.log(`💬 Message: "${message}"`);
  console.log(`ℹ️ Add TELNYX_API_KEY & TELNYX_PHONE_NUMBER to send live via Telnyx (~$9.50/mo)`);
  console.log(`======================================================\n`);

  return { success: true, simulated: true, provider: "simulation", messageId: `sim_${Date.now()}` };
}

/**
 * Gets the designated alert mobile number for Ahmed / owner
 */
export function getOwnerAlertPhone(): string {
  return process.env.AHMED_ALERT_PHONE || process.env.NEXT_PUBLIC_CONTACT_PHONE || "+61426996192";
}

/**
 * Dispatches an instant alert when a customer requests a phone call
 */
export async function alertCallRequested(
  lead: { name: string; phone: string; suburb?: string },
  preferredTime: string = "ASAP"
) {
  const alertPhone = getOwnerAlertPhone();
  const alertBody = `🚨 [ASPECT CALL REQUEST]\nCustomer: ${lead.name || "Prospect"} (${lead.phone})\nSuburb: ${lead.suburb || "Perth"}\nRequested Time: ${preferredTime}\n\n⚠️ AI is muted. Please call the customer directly now!`;

  console.log(`🚨 [Alert Dispatch] Call requested by ${lead.phone} -> Alerting ${alertPhone}`);
  await sendSms(alertPhone, alertBody);
}

/**
 * Dispatches an instant alert when customer says something off-track/unusual and AI pauses
 */
export async function alertLeadOffTrack(
  lead: { name: string; phone: string; suburb?: string },
  customerMsg: string,
  reason: string
) {
  const alertPhone = getOwnerAlertPhone();
  const alertBody = `⚠️ [AI PAUSED - OFF-TRACK]\nFrom: ${lead.phone}\nMessage: "${customerMsg}"\nTrigger: ${reason}\n\nAI paused so you can take over. Reply #unmute to resume AI.`;

  console.log(`⚠️ [Alert Dispatch] Off-track message from ${lead.phone} -> Alerting ${alertPhone}`);
  await sendSms(alertPhone, alertBody);
}

/**
 * Dispatches full lead dossier when quote qualification is completed
 */
export async function alertQuoteCompleted(lead: any) {
  const alertPhone = getOwnerAlertPhone();
  const d = lead.extracted_details || {};
  const alertBody = `🎯 [ASPECT QUOTE READY]\nCustomer: ${lead.name || "Prospect"} (${lead.phone})\nAddress: ${d.address || lead.suburb || "Perth"}\nType: ${d.property_type || "Residential"}\nStoreys: ${d.storeys || "N/A"}\nWindows: ${d.window_count || "N/A"}\nCondition: ${d.condition || "N/A"}\nPlan: ${d.chosen_plan || "Pending"}\n\nAll details collected! Review & send quote.`;

  console.log(`🎯 [Alert Dispatch] Completed quote dossier for ${lead.phone} -> Alerting ${alertPhone}`);
  await sendSms(alertPhone, alertBody);
}

/**
 * Mirrors customer & AI exchange to Ahmed's phone in real-time
 */
export async function mirrorConversationToOwner(
  customerPhone: string,
  customerMsg: string,
  aiReply: string
) {
  // Can be controlled by MIRROR_SMS_TO_OWNER env var, default true if configured
  if (process.env.MIRROR_SMS_TO_OWNER === "false") return;
  const alertPhone = getOwnerAlertPhone();
  if (normalizeAuPhone(customerPhone) === normalizeAuPhone(alertPhone)) return;

  const mirrorBody = `💬 [ASPECT CHAT] ${customerPhone}:\nUser: "${customerMsg}"\nFazal: "${aiReply}"\n(Reply #stop to pause AI)`;
  await sendSms(alertPhone, mirrorBody);
}

/**
 * Sends an urgent alert directly to Ahmed's mobile (legacy wrapper)
 */
export async function sendUrgentAlertToAhmed(
  customerName: string,
  customerPhone: string,
  customerQuery: string,
  reason: string
) {
  await alertLeadOffTrack({ name: customerName, phone: customerPhone }, customerQuery, reason);
}
