import { saveOrUpdateLead, appendMessage } from "./store";
import { sendSms, normalizeAuPhone, mirrorConversationToOwner } from "@/lib/telephony/sms-service";

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export interface IngestLeadPayload {
  name: string;
  phone: string;
  email?: string;
  suburb: string;
  serviceType?: string;
  storeys?: string;
  scope?: string;
  bedrooms?: number;
  condition?: string;
  selectedTier?: string;
  priceEstimate?: number;
  message?: string;
  gclid?: string;
  keyword?: string;
  device?: string;
  sourceUrl?: string;
  landingUrl?: string;
  submissionUrl?: string;
  referrer?: string;
  fullQuery?: string;
  sourceSummary?: string;
  formName?: string;
}

/**
 * Ingests a new lead from landing page or website forms
 * Profiles the lead and fires the initial 15-second outreach from Fazal
 */
export async function ingestLead(data: IngestLeadPayload) {
  if (!data.phone) {
    console.warn("⚠️ Lead ingestion skipped: No phone number provided.");
    return null;
  }

  const normPhone = normalizeAuPhone(data.phone);

  // 1. Create or update profile
  const profile = saveOrUpdateLead({
    phone: normPhone,
    name: data.name || "Prospect",
    email: data.email,
    suburb: data.suburb || "Perth Metro",
    serviceType: data.serviceType || "Window Cleaning",
    lead_source: "website",
    gclid: data.gclid,
    keyword: data.keyword,
    device: data.device,
    sourceUrl: data.sourceUrl,
    landingUrl: data.landingUrl,
    submissionUrl: data.submissionUrl,
    referrer: data.referrer,
    fullQuery: data.fullQuery,
    sourceSummary: data.sourceSummary,
    formName: data.formName,
    extracted_details: {
      storeys: data.storeys,
      scope: data.scope || data.selectedTier,
      bedrooms: data.bedrooms,
      suburb: data.suburb,
      stage: "awaiting_preference",
      notes: data.message
    }
  });

  console.log(`\n📥 [Website Lead Ingested] ${profile.name} (${normPhone}) | Suburb: ${profile.suburb}`);

  // 2. Natural 15-second delay before first outreach
  const isDev = process.env.NODE_ENV !== "production";
  const configuredSec = process.env.SMS_DELAY_SECONDS ? parseFloat(process.env.SMS_DELAY_SECONDS) : null;
  const delayMs = configuredSec !== null 
    ? Math.max(1000, Math.round(configuredSec * 1000)) 
    : (isDev ? 2000 : 15000);

  console.log(`⏳ Applying 15-second delay before Fazal greets website lead...`);
  await sleep(delayMs);

  // Re-check if thread was muted before sending
  const current = saveOrUpdateLead({ phone: normPhone });
  if (current.is_ai_muted) {
    console.log(`🚫 Thread was muted before Fazal outreach. Canceling.`);
    return profile;
  }

  // 3. Draft Fazal's initial website touchpoint
  const firstName = (data.name || "").trim().split(" ")[0] || "";
  const nameGreeting = firstName && !/^(prospect|anonymous|user)$/i.test(firstName) ? `Hi ${firstName}` : `Hi`;

  const initialMsg = `${nameGreeting}, thanks for your query on our website! Could I grab a few more details so we can decide whether a site visit would be needed or if we can get you an instant quote? When would be a good time to have a chat — would you prefer a quick phone call so we can grab all the necessary details, or would you prefer to chat over text?\n\nRegards, Aspect Window Cleaning, Fazal.`;

  // 4. Dispatch SMS
  console.log(`🚀 Fazal sending initial website lead greeting to ${normPhone}`);
  await sendSms(normPhone, initialMsg);
  appendMessage(normPhone, "assistant", initialMsg);

  // 5. Mirror to Ahmed's phone
  try {
    await mirrorConversationToOwner(normPhone, `[Website Form: ${data.serviceType || "Quote"}]`, initialMsg);
  } catch (_) {}

  return profile;
}
