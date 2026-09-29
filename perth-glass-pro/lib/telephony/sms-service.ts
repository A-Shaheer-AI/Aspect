import twilio from "twilio";

/**
 * Normalizes any Australian mobile number into standard E.164 format (+614XXXXXXXX)
 */
export function normalizeAuPhone(phone: string): string {
  if (!phone) return "";
  let cleaned = phone.replace(/[^0-9+]/g, "");

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
 * Sends an urgent alert directly to Ahmed's mobile
 */
export async function sendUrgentAlertToAhmed(
  customerName: string,
  customerPhone: string,
  customerQuery: string,
  reason: string
) {
  const alertPhone = process.env.AHMED_ALERT_PHONE || process.env.NEXT_PUBLIC_CONTACT_PHONE || "";

  const alertBody = `🚨 URGENT LEAD ACTION REQUIRED\nFrom: ${customerName || "Prospect"} (${customerPhone})\nQuery: "${customerQuery}"\nReason: ${reason}\n\n⚠️ AI stayed silent and paused. Please text customer directly!`;

  if (!alertPhone) {
    console.warn("⚠️ AHMED_ALERT_PHONE not configured. Urgent alert logged to console:\n", alertBody);
    return;
  }

  await sendSms(alertPhone, alertBody);
}
