import twilio from "twilio";

/**
 * Normalizes any Australian mobile number into standard E.164 format (+614XXXXXXXX)
 */
export function normalizeAuPhone(phone: string): string {
  if (!phone) return "";
  let cleaned = phone.replace(/[^0-9+]/g, "");

  // Starts with +61
  if (cleaned.startsWith("+61")) {
    return cleaned;
  }
  // Starts with 61 (no +)
  if (cleaned.startsWith("61") && cleaned.length === 11) {
    return "+" + cleaned;
  }
  // Starts with 04 (e.g. 0412345678)
  if (cleaned.startsWith("04") && cleaned.length === 10) {
    return "+61" + cleaned.substring(1);
  }
  // Starts with 4 (e.g. 412345678)
  if (cleaned.startsWith("4") && cleaned.length === 9) {
    return "+61" + cleaned;
  }

  return cleaned.startsWith("+") ? cleaned : `+${cleaned}`;
}

/**
 * Sends an SMS via Twilio (with simulated fallback if credentials not yet configured)
 */
export async function sendSms(to: string, message: string): Promise<{ success: boolean; messageId?: string; simulated?: boolean; error?: string }> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;

  const normalizedTo = normalizeAuPhone(to);

  // If Twilio credentials are not set, log simulation cleanly
  if (!accountSid || !authToken || !fromNumber) {
    console.log(`\n======================================================`);
    console.log(`📱 [TWILIO SIMULATION] SMS to: ${normalizedTo}`);
    console.log(`💬 Message: "${message}"`);
    console.log(`ℹ️ (Add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER in .env.local to send live)`);
    console.log(`======================================================\n`);
    return { success: true, simulated: true, messageId: `sim_${Date.now()}` };
  }

  try {
    const client = twilio(accountSid, authToken);
    const result = await client.messages.create({
      body: message,
      from: fromNumber,
      to: normalizedTo,
    });
    console.log(`✅ [Twilio SMS Sent] ID: ${result.sid} to ${normalizedTo}`);
    return { success: true, messageId: result.sid };
  } catch (error: any) {
    console.error(`❌ [Twilio SMS Error] to ${normalizedTo}:`, error.message || error);
    return { success: false, error: error.message || "Failed to send SMS" };
  }
}

/**
 * Sends an urgent alert SMS directly to Ahmed's phone
 */
export async function sendUrgentAlertToAhmed(customerName: string, customerPhone: string, customerQuery: string, reason: string) {
  const alertPhone = process.env.AHMED_ALERT_PHONE || process.env.NEXT_PUBLIC_CONTACT_PHONE || "";
  
  const alertBody = `🚨 URGENT LEAD ACTION REQUIRED\nFrom: ${customerName || "Prospect"} (${customerPhone})\nQuery: "${customerQuery}"\nReason: ${reason}\n\n⚠️ AI stayed silent and paused. Please text customer directly!`;

  if (!alertPhone) {
    console.warn("⚠️ AHMED_ALERT_PHONE not configured. Urgent alert logged to console:\n", alertBody);
    return;
  }

  await sendSms(alertPhone, alertBody);
}
