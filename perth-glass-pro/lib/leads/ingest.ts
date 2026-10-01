import { saveOrUpdateLead, appendMessage } from "./store";
import { sendSms, normalizeAuPhone } from "@/lib/telephony/twilio-client";

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
 * Ingests a new lead from landing page, website forms, or hipages
 * Immediately profiles the lead and fires the initial warm-up SMS
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
      scope: data.scope,
      bedrooms: data.bedrooms,
      notes: data.message
    }
  });

  console.log(`\n📥 [Lead Ingested] ${profile.name} (${normPhone}) | Suburb: ${profile.suburb} | Source: ${profile.sourceSummary || "Unknown"} | GCLID: ${profile.gclid ? "YES" : "NO"}`);

  // 2. Draft customized warm-up SMS based on submitted information
  let initialMsg = "";

  const firstName = (data.name || "").trim().split(" ")[0] || "";
  const greeting = firstName ? `Hi ${firstName}` : `Hi there`;
  const suburb = data.suburb ? ` in ${data.suburb}` : "";

  if (data.storeys && !data.scope) {
    initialMsg = `${greeting}, Ahmed from Aspect Window Cleaning here! Received your quote request${suburb}. Are you looking for exterior only, or inside & out as well?`;
  } else if (data.scope && !data.storeys) {
    initialMsg = `${greeting}, Ahmed from Aspect Window Cleaning here! Received your request for ${data.scope.toLowerCase()} window cleaning${suburb}. Is your property single or double storey?`;
  } else if (data.storeys && data.scope) {
    initialMsg = `${greeting}, Ahmed from Aspect Window Cleaning here! Received your quote request for ${data.storeys.toLowerCase()} ${data.scope.toLowerCase()} windows${suburb}. Feel free to text any photos of the property here, or let me know what street you're on so I can check our schedule for this week!`;
  } else {
    initialMsg = `${greeting}, Ahmed from Aspect Window Cleaning here! Received your quote request${suburb}. Are you looking for exterior glass only, or inside and out as well?`;
  }

  // 3. Dispatch initial SMS to customer (fast warm-up)
  console.log(`🚀 Sending immediate warm-up SMS to customer: "${initialMsg}"`);
  await sendSms(normPhone, initialMsg);
  appendMessage(normPhone, "assistant", initialMsg);

  return profile;
}
