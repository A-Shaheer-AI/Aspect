import fs from "fs";
import path from "path";
import { normalizeAuPhone } from "@/lib/telephony/twilio-client";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  body: string;
  timestamp: string;
}

export interface LeadProfile {
  id: string;
  phone: string;
  name: string;
  email?: string;
  suburb: string;
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
  serviceType?: string;
  is_ai_muted: boolean;
  mute_reason?: string;
  status: "NEW" | "CONTACTED" | "QUOTED" | "WON" | "LOST";
  quoted_value?: number;
  extracted_details: {
    storeys?: string;
    scope?: string;
    bedrooms?: number;
    has_screens?: boolean;
    urgent?: boolean;
    address?: string;
    notes?: string;
  };
  messages: ChatMessage[];
  created_at: string;
  updated_at: string;
}

const DATA_DIR = path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.json");

function ensureStorage(): LeadProfile[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(LEADS_FILE)) {
      fs.writeFileSync(LEADS_FILE, JSON.stringify([], null, 2), "utf-8");
      return [];
    }
    const raw = fs.readFileSync(LEADS_FILE, "utf-8");
    return JSON.parse(raw) as LeadProfile[];
  } catch (err) {
    console.error("Error accessing leads file store:", err);
    return [];
  }
}

function persistStorage(leads: LeadProfile[]) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), "utf-8");
  } catch (err) {
    console.error("Error persisting leads file store:", err);
  }
}

export function getAllLeads(): LeadProfile[] {
  return ensureStorage();
}

export function getLeadByPhone(phone: string): LeadProfile | undefined {
  const norm = normalizeAuPhone(phone);
  const leads = ensureStorage();
  return leads.find(l => l.phone === norm);
}

export function saveOrUpdateLead(data: Partial<LeadProfile> & { phone: string }): LeadProfile {
  const norm = normalizeAuPhone(data.phone);
  const leads = ensureStorage();
  const existingIdx = leads.findIndex(l => l.phone === norm);

  const now = new Date().toISOString();

  if (existingIdx >= 0) {
    const existing = leads[existingIdx];
    const updated: LeadProfile = {
      ...existing,
      ...data,
      phone: norm,
      name: data.name || existing.name,
      suburb: data.suburb || existing.suburb,
      email: data.email || existing.email,
      gclid: data.gclid || existing.gclid,
      keyword: data.keyword || existing.keyword,
      device: data.device || existing.device,
      sourceUrl: data.sourceUrl || existing.sourceUrl,
      landingUrl: data.landingUrl || existing.landingUrl,
      submissionUrl: data.submissionUrl || existing.submissionUrl,
      referrer: data.referrer || existing.referrer,
      fullQuery: data.fullQuery || existing.fullQuery,
      sourceSummary: data.sourceSummary || existing.sourceSummary,
      formName: data.formName || existing.formName,
      extracted_details: {
        ...existing.extracted_details,
        ...(data.extracted_details || {})
      },
      updated_at: now
    };
    leads[existingIdx] = updated;
    persistStorage(leads);
    return updated;
  } else {
    const newLead: LeadProfile = {
      id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      phone: norm,
      name: data.name || "Prospect",
      email: data.email || "",
      suburb: data.suburb || "Perth Metro",
      gclid: data.gclid || "",
      keyword: data.keyword || "",
      device: data.device || "",
      sourceUrl: data.sourceUrl || "",
      landingUrl: data.landingUrl || "",
      submissionUrl: data.submissionUrl || "",
      referrer: data.referrer || "",
      fullQuery: data.fullQuery || "",
      sourceSummary: data.sourceSummary || "",
      formName: data.formName || "",
      serviceType: data.serviceType || "Window Cleaning",
      is_ai_muted: false,
      status: "NEW",
      extracted_details: data.extracted_details || {},
      messages: data.messages || [],
      created_at: now,
      updated_at: now
    };
    leads.push(newLead);
    persistStorage(leads);
    return newLead;
  }
}

export function appendMessage(phone: string, role: "user" | "assistant" | "system", body: string) {
  const norm = normalizeAuPhone(phone);
  const leads = ensureStorage();
  const lead = leads.find(l => l.phone === norm);
  const now = new Date().toISOString();

  if (lead) {
    lead.messages.push({ role, body, timestamp: now });
    lead.updated_at = now;
    persistStorage(leads);
  } else {
    saveOrUpdateLead({
      phone: norm,
      messages: [{ role, body, timestamp: now }]
    });
  }
}

export function muteAiForLead(phone: string, reason: string) {
  const norm = normalizeAuPhone(phone);
  const leads = ensureStorage();
  const lead = leads.find(l => l.phone === norm);
  if (lead) {
    lead.is_ai_muted = true;
    lead.mute_reason = reason;
    lead.updated_at = new Date().toISOString();
    persistStorage(leads);
    console.log(`🔇 [AI Muted] Lead ${lead.name} (${norm}) muted. Reason: ${reason}`);
  }
}

export function unmuteAiForLead(phone: string) {
  const norm = normalizeAuPhone(phone);
  const leads = ensureStorage();
  const lead = leads.find(l => l.phone === norm);
  if (lead) {
    lead.is_ai_muted = false;
    delete lead.mute_reason;
    lead.updated_at = new Date().toISOString();
    persistStorage(leads);
    console.log(`🔊 [AI Unmuted] Lead ${lead.name} (${norm}) unmuted.`);
  }
}
