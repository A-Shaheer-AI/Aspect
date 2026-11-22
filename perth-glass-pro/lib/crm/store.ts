import { CrmJob, CrmStage, Technician, CrmInvoice, SubscriptionFrequency, SubscriptionVisit, LeadSource } from "./types";

/**
 * Detects marketing attribution source channel for incoming leads
 */
export function detectLeadAttribution(lead: {
  gclid?: string;
  referrer?: string;
  sourceSummary?: string;
  sourceUrl?: string;
  utmSource?: string;
  utmCampaign?: string;
  formName?: string;
  lead_source?: string;
}): LeadSource {
  if (lead.lead_source === "manual" || lead.formName?.toLowerCase().includes("manual")) {
    return "manual";
  }
  if (
    lead.gclid ||
    lead.sourceSummary?.toLowerCase().includes("google ad") ||
    lead.utmSource?.toLowerCase().includes("google") ||
    lead.utmSource?.toLowerCase().includes("adwords")
  ) {
    return "google_ads";
  }
  const ref = (lead.referrer || "").toLowerCase();
  const sum = (lead.sourceSummary || "").toLowerCase();
  const utm = (lead.utmSource || "").toLowerCase();

  if (
    ref.includes("facebook") ||
    ref.includes("fb.me") ||
    ref.includes("instagram") ||
    sum.includes("facebook") ||
    sum.includes("instagram") ||
    utm.includes("facebook") ||
    utm.includes("meta")
  ) {
    return "facebook";
  }

  if (
    ref.includes("chatgpt") ||
    ref.includes("chat.openai.com") ||
    ref.includes("claude.ai") ||
    ref.includes("perplexity") ||
    sum.includes("chatgpt") ||
    sum.includes("ai")
  ) {
    return "chatgpt";
  }

  if (
    ref.includes("google.com") ||
    ref.includes("bing.com") ||
    ref.includes("duckduckgo.com") ||
    sum.includes("organic") ||
    utm.includes("organic")
  ) {
    return "organic";
  }

  return "website";
}

export const DEFAULT_STAGES: CrmStage[] = [
  { id: "stage_new", name: "New Leads", color: "blue", order: 1 },
  { id: "stage_contacted", name: "Contacted", color: "purple", order: 2 },
  { id: "stage_quoted", name: "Quote Sent", color: "amber", order: 3 },
  { id: "stage_booked", name: "Booked", color: "cyan", order: 4 },
  { id: "stage_in_progress", name: "In Progress", color: "indigo", order: 5 },
  { id: "stage_completed", name: "Completed", color: "emerald", order: 6 },
  { id: "stage_invoiced", name: "Invoiced / Paid", color: "green", order: 7 }
];

export const DEFAULT_TECHNICIANS: Technician[] = [
  { id: "tech_ahmed", name: "Ahmed (Lead)", phone: "0426996192", color: "#f59e0b" },
  { id: "tech_josh", name: "Josh (Tech)", phone: "0485939817", color: "#3b82f6" },
  { id: "tech_sam", name: "Sam (Tech)", phone: "0412345678", color: "#10b981" }
];

export const DEFAULT_BANKING_DETAILS = {
  bankName: "Commonwealth Bank",
  accountName: "Ahmed Shaheer",
  bsb: "066134",
  accountNumber: "11259529",
  payId: "0426996192",
  customInstructions: "Please use invoice/quote number as payment reference."
};

export const DEFAULT_BUSINESS_DETAILS = {
  name: "Aspect Window Cleaning",
  tradingName: "Aspect Window Cleaning Pty Ltd",
  address: "183 Stirling Hwy, Nedlands WA 6009",
  abn: "44 847 810 035",
  email: "info@aspectwindowcleaning.com.au",
  phone: "0426 996 192",
  website: "aspectwindowcleaning.com.au",
  insuranceInfo: "Fully Insured • $20,000,000 Public Liability Coverage"
};

export const DEFAULT_TERMS_AND_CONDITIONS =
`1. Payment Terms: Strictly 14 days from invoice date via Direct EFT or PayID.
2. Property Access: Unobstructed access to all glass panels, sliding channels, and external water points must be available.
3. Weather Policy: External cleans may be rescheduled in extreme gale winds (>45km/h) or torrential rain for operator safety.
4. Satisfaction Guarantee: 100% streak-free guarantee. Please notify us within 48 hours for immediate touch-ups.`;

/**
 * Calculates next due date given last cleaned date and frequency
 */
export function calculateNextDueDate(lastDateStr: string, frequency: SubscriptionFrequency): string {
  if (!lastDateStr || frequency === "one_off") return "";
  const d = new Date(lastDateStr);
  if (isNaN(d.getTime())) return "";

  switch (frequency) {
    case "monthly":
      d.setMonth(d.getMonth() + 1);
      break;
    case "bi_monthly":
      d.setMonth(d.getMonth() + 2);
      break;
    case "quarterly":
      d.setMonth(d.getMonth() + 3);
      break;
    case "half_yearly":
      d.setMonth(d.getMonth() + 6);
      break;
    case "annual":
      d.setFullYear(d.getFullYear() + 1);
      break;
    default:
      return "";
  }
  return d.toISOString().split("T")[0];
}

function getOrdinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

/**
 * Generates approximate target service weeks for a yearly subscription care plan
 */
export function generateYearlySubscriptionSchedule(
  startDateStr: string,
  frequency: SubscriptionFrequency
): SubscriptionVisit[] {
  if (frequency === "one_off") return [];
  const base = startDateStr ? new Date(startDateStr) : new Date();
  if (isNaN(base.getTime())) return [];

  let count = 2;
  let monthStep = 6;
  if (frequency === "monthly") {
    count = 12;
    monthStep = 1;
  } else if (frequency === "bi_monthly") {
    count = 6;
    monthStep = 2;
  } else if (frequency === "quarterly") {
    count = 4;
    monthStep = 3;
  } else if (frequency === "half_yearly") {
    count = 2;
    monthStep = 6;
  } else if (frequency === "annual") {
    count = 1;
    monthStep = 12;
  }

  const visits: SubscriptionVisit[] = [];

  for (let i = 0; i < count; i++) {
    const target = new Date(base);
    target.setMonth(target.getMonth() + i * monthStep);

    // Snap to the Monday of that target week
    const day = target.getDay(); // 0 is Sun, 1 is Mon...
    const diffToMonday = day === 0 ? -6 : 1 - day;
    target.setDate(target.getDate() + diffToMonday);

    const monthNum = target.getMonth(); // 0-11
    let seasonalTheme = "Perth Seasonal Glazing Protection";
    if (monthNum === 11 || monthNum === 0 || monthNum === 1) {
      seasonalTheme = "Summer Sunshine & Coastal Salt Spray Polish";
    } else if (monthNum >= 2 && monthNum <= 4) {
      seasonalTheme = "Autumn Clarity & Pre-Winter Glazing Shield";
    } else if (monthNum >= 5 && monthNum <= 7) {
      seasonalTheme = "Winter Rain-Repellent & Sill Detailing";
    } else {
      seasonalTheme = "Spring Rejuvenation & Sliding Track Deep Flush";
    }

    const monthName = target.toLocaleString("en-AU", { month: "short" });
    const fullMonthName = target.toLocaleString("en-AU", { month: "long" });
    const dayNum = target.getDate();
    const year = target.getFullYear();

    visits.push({
      visitNumber: i + 1,
      weekOfDate: target.toISOString().split("T")[0],
      weekLabel: `Week of Monday ${dayNum}${getOrdinal(dayNum)} ${monthName} ${year}`,
      targetMonth: `${fullMonthName} ${year}`,
      seasonalTheme,
      completed: i === 0 && Boolean(startDateStr && new Date(startDateStr) <= new Date())
    });
  }

  return visits;
}

export const INITIAL_SEED_JOBS: CrmJob[] = [
  {
    id: "job_seed_1",
    customerName: "Caroline Miller",
    phone: "0412 889 901",
    email: "caroline.m@westnet.com.au",
    address: "17 Brown Crescent",
    suburb: "Sorrento",
    stageId: "stage_booked",
    propertyType: "Residential",
    storeys: "Double Storey",
    windowCount: "45 windows",
    hasScreens: true,
    packageType: "Detailed Clean",
    priceQuoted: 360,
    quoteId: "QUO-000001",
    workItems: [
      { heading: "Double Storey Glazing Inside & Out", description: "0 PPM pure water reach-and-wash, external frames scrubbed, sills and sliding tracks detailed", qty: 1 },
      { heading: "Solar Panel Efficiency Clean", description: "16 solar panels de-ionized pure water wash to maximize generation efficiency", qty: 1 }
    ],
    estimatedHours: 2.5,
    contactMethod: "ai_sms",
    contactedBy: "Fazal AI (SMS)",
    contactTimestamp: "2026-10-25T08:32:00Z",
    conversationTrail: [
      { id: "msg_1", sender: "customer", text: "Hi, looking for a quote for double storey home in Sorrento with 45 windows and solar panels.", timestamp: "2026-10-25T08:30:00Z", channel: "sms" },
      { id: "msg_2", sender: "ai", senderName: "Fazal AI", text: "Hi Caroline, thanks for your message! We'd love to help. Would you prefer a quick phone call so we can grab all the details, or would you prefer to chat over text? Regards, Aspect Window Cleaning, Fazal.", timestamp: "2026-10-25T08:32:00Z", channel: "sms" },
      { id: "msg_3", sender: "customer", text: "Text is easiest! Access is clear, dog will be inside.", timestamp: "2026-10-25T08:35:00Z", channel: "sms" },
      { id: "msg_4", sender: "human", senderName: "Ahmed (Owner)", text: "Hi Caroline, Ahmed here! We've prepared a quote for $360 including all 45 windows inside & out plus the 16 solar panels. Sent through to your email as well!", timestamp: "2026-10-25T09:00:00Z", channel: "sms" }
    ],
    lastCleanedDate: "2026-08-01",
    subscriptionFrequency: "quarterly",
    nextDueDate: "2026-11-01",
    subscriptionYearlyPlan: [
      { visitNumber: 1, weekOfDate: "2026-08-03", weekLabel: "Week of Monday 3rd Aug 2026", targetMonth: "August 2026", seasonalTheme: "Winter Rain-Repellent & Sill Detailing", completed: true },
      { visitNumber: 2, weekOfDate: "2026-11-02", weekLabel: "Week of Monday 2nd Nov 2026", targetMonth: "November 2026", seasonalTheme: "Spring Rejuvenation & Sliding Track Deep Flush", completed: false },
      { visitNumber: 3, weekOfDate: "2027-02-01", weekLabel: "Week of Monday 1st Feb 2027", targetMonth: "February 2027", seasonalTheme: "Summer Sunshine & Coastal Salt Spray Polish", completed: false },
      { visitNumber: 4, weekOfDate: "2027-05-03", weekLabel: "Week of Monday 3rd May 2027", targetMonth: "May 2027", seasonalTheme: "Autumn Clarity & Pre-Winter Glazing Shield", completed: false }
    ],
    advanceNoticeSent: false,
    interestedServices: ["Window Cleaning", "Solar Panels"],
    doNotContact: false,
    assignedTechnicianId: "tech_ahmed",
    scheduledDate: "2026-11-04",
    scheduledTimeSlot: "08:30 - 11:30 AM",
    notes: [
      { id: "note_1", text: "Gate code is #1822. Dog (Golden Retriever) is friendly but keep gate latched.", createdAt: "2026-10-25T09:00:00Z" },
      { id: "note_2", text: "High sea salt spray on coastal balcony glazing. Use pure water reach pole.", createdAt: "2026-10-25T09:05:00Z" }
    ],
    photos: [
      {
        id: "photo_1",
        dataUrl: "https://res.cloudinary.com/dr8tjrszy/image/upload/w_800,f_auto,q_auto/v1/aspect/track-cleaning-before-after.jpg",
        caption: "Dirty sliding track before cleaning",
        tag: "before",
        createdAt: "2026-10-25T09:10:00Z"
      }
    ],
    createdAt: "2026-10-25T08:30:00Z",
    updatedAt: "2026-10-30T10:00:00Z"
  },
  {
    id: "job_seed_2",
    customerName: "David Thornton",
    phone: "0421 556 789",
    email: "d.thornton@gmail.com",
    address: "14 Fraser St",
    suburb: "Dalkeith",
    stageId: "stage_in_progress",
    propertyType: "Residential",
    storeys: "Double Storey",
    windowCount: "50 windows",
    hasScreens: true,
    packageType: "Detailed Clean",
    priceQuoted: 420,
    quoteId: "QUO-000002",
    workItems: [
      { heading: "Double Storey Glazing Inside & Out", description: "Detailed clean: razor scraper on mineral spots, frames scrubbed, flyscreens washed", qty: 1 },
      { heading: "Perimeter Sliding Door Tracks Detail", description: "Deep extraction of coastal sand and insect buildup from all 4 patio sliders", qty: 1 }
    ],
    estimatedHours: 3.0,
    clockInTime: new Date(Date.now() - 45 * 60 * 1000).toISOString(), // Clocked in 45 mins ago!
    contactMethod: "manual_phone",
    contactedBy: "Ahmed (Phone)",
    contactTimestamp: "2026-10-28T11:15:00Z",
    conversationTrail: [
      { id: "msg_5", sender: "human", senderName: "Ahmed", text: "Spoke with David over phone. Confirmed arrival Tuesday afternoon.", timestamp: "2026-10-28T11:15:00Z", channel: "phone" }
    ],
    lastCleanedDate: "2026-05-15",
    subscriptionFrequency: "half_yearly",
    nextDueDate: "2026-11-15",
    interestedServices: ["Window Cleaning", "Gutters"],
    doNotContact: false,
    assignedTechnicianId: "tech_josh",
    scheduledDate: "2026-11-03",
    scheduledTimeSlot: "12:30 - 03:30 PM",
    notes: [
      { id: "note_3", text: "Water tap located behind double garage. Watch for delicate garden beds.", createdAt: "2026-10-28T14:00:00Z" }
    ],
    photos: [],
    createdAt: "2026-10-28T11:00:00Z",
    updatedAt: "2026-10-31T08:00:00Z"
  },
  {
    id: "job_seed_3",
    customerName: "ESM Strata - Horizon Towers",
    phone: "08 9368 2211",
    email: "portfolios@esmstrata.com.au",
    address: "88 Broadway",
    suburb: "Nedlands",
    stageId: "stage_quoted",
    propertyType: "Commercial",
    storeys: "Multi Storey",
    windowCount: "120 glass panels",
    hasScreens: false,
    packageType: "Custom",
    priceQuoted: 1450,
    quoteId: "QUO-000003",
    quoteSentDate: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // Sent 2 days ago!
    autoFollowUpEnabled: true,
    followUpDueDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // Follow-up is now due!
    followUpSent: false,
    workItems: [
      { heading: "Multi-Storey Commercial Glazing", description: "Pure-water reach pole wash on 4 levels of external facade and atrium entrance", qty: 1 }
    ],
    estimatedHours: 6.0,
    contactMethod: "email",
    contactedBy: "Ahmed (Email)",
    subscriptionFrequency: "monthly",
    interestedServices: ["Window Cleaning", "Pressure Washing"],
    doNotContact: false,
    assignedTechnicianId: "tech_sam",
    notes: [
      { id: "note_4", text: "Requires notice to body corporate 48 hours in advance for balcony access.", createdAt: "2026-10-20T10:00:00Z" }
    ],
    photos: [],
    createdAt: "2026-10-20T09:30:00Z",
    updatedAt: "2026-10-29T16:00:00Z"
  },
  {
    id: "job_seed_4",
    customerName: "Sarah Jenkins",
    phone: "0499 998 888",
    email: "sarah.j@outlook.com",
    address: "42 Ozone Parade",
    suburb: "Cottesloe",
    stageId: "stage_new",
    propertyType: "Residential",
    storeys: "Single Storey",
    windowCount: "25 windows",
    hasScreens: true,
    packageType: "Detailed Clean",
    priceQuoted: 240,
    estimatedHours: 1.5,
    leadSource: "google_ads",
    leadReceivedAt: new Date(Date.now() - 45 * 1000).toISOString(),
    aiContactWindowExpiresAt: new Date(Date.now() + 195 * 1000).toISOString(), // ~3m 15s remaining
    conversationTrail: [],
    lastCleanedDate: "2026-04-10",
    subscriptionFrequency: "quarterly",
    nextDueDate: "2026-07-10",
    interestedServices: ["Window Cleaning"],
    doNotContact: false,
    notes: [
      { id: "note_5", text: "Inbound quote inquiry via Google Search Ads ('window cleaner cottesloe'). Coastal salt spray on front glass.", createdAt: new Date().toISOString() }
    ],
    photos: [],
    createdAt: new Date(Date.now() - 45 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 45 * 1000).toISOString()
  },
  {
    id: "job_seed_6",
    customerName: "Mark Robinson",
    phone: "0433 112 233",
    email: "mark.r@gmail.com",
    address: "8 The Esplanade",
    suburb: "Peppermint Grove",
    stageId: "stage_new",
    propertyType: "Residential",
    storeys: "Double Storey",
    windowCount: "38 windows",
    hasScreens: true,
    packageType: "Detailed Clean",
    priceQuoted: 380,
    estimatedHours: 2.5,
    leadSource: "chatgpt",
    leadReceivedAt: new Date(Date.now() - 130 * 1000).toISOString(),
    aiContactWindowExpiresAt: new Date(Date.now() + 110 * 1000).toISOString(), // ~1m 50s remaining
    conversationTrail: [],
    subscriptionFrequency: "bi_monthly",
    interestedServices: ["Window Cleaning", "Solar Panels"],
    doNotContact: false,
    notes: [
      { id: "note_seed_6", text: "Referred via ChatGPT recommendation for premium Perth window cleaning specialist.", createdAt: new Date().toISOString() }
    ],
    photos: [],
    createdAt: new Date(Date.now() - 130 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 130 * 1000).toISOString()
  },
  {
    id: "job_seed_7",
    customerName: "Liam Henderson",
    phone: "0411 223 344",
    email: "liam.h@iinet.net.au",
    address: "29 Marine Parade",
    suburb: "Cottesloe",
    stageId: "stage_contacted",
    propertyType: "Residential",
    storeys: "Double Storey",
    windowCount: "32 windows",
    hasScreens: true,
    packageType: "Detailed Clean",
    priceQuoted: 340,
    estimatedHours: 2.5,
    leadSource: "facebook",
    contactMethod: "ai_sms",
    contactedBy: "Fazal AI (SMS)",
    contactTimestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    conversationTrail: [
      {
        id: "msg_liam_1",
        sender: "ai",
        senderName: "Fazal AI",
        text: "Hi Liam, thanks for your query on our website! Could I grab a few more details so we can get you an instant quote? When would be a good time to chat — quick phone call or prefer text? Regards, Aspect Window Cleaning, Fazal.",
        timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        channel: "sms"
      },
      {
        id: "msg_liam_2",
        sender: "customer",
        text: "Hi Fazal, text is great. It's a double storey in Cottesloe, lots of glass facing ocean. Need external and flyscreens done before next weekend if possible!",
        timestamp: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        channel: "sms"
      }
    ],
    subscriptionFrequency: "half_yearly",
    interestedServices: ["Window Cleaning"],
    doNotContact: false,
    notes: [
      { id: "note_liam_1", text: "Customer replied to Fazal AI text. Ready for owner takeover / formal quote.", createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString() }
    ],
    photos: [],
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString()
  },
  {
    id: "job_seed_5",
    customerName: "City Toyota Perth",
    phone: "08 9200 4400",
    email: "facilities@citytoyota.com.au",
    address: "345 Scarborough Beach Rd",
    suburb: "Osborne Park",
    stageId: "stage_completed",
    propertyType: "Commercial",
    storeys: "Double Storey",
    windowCount: "Full Showroom Perimeter",
    hasScreens: false,
    packageType: "Detailed Clean",
    priceQuoted: 680,
    quoteId: "QUO-000004",
    workItems: [
      { heading: "Commercial Showroom Perimeter Glazing", description: "Ultra-pure 0 PPM water wash on all perimeter display glass, streak-free guarantee", qty: 1 }
    ],
    estimatedHours: 3.5,
    clockInTime: "2026-10-28T14:30:00Z",
    clockOutTime: "2026-10-28T17:45:00Z",
    actualDurationMinutes: 195,
    contactMethod: "manual_phone",
    contactedBy: "Ahmed (Phone)",
    lastCleanedDate: "2026-10-28",
    subscriptionFrequency: "bi_monthly",
    nextDueDate: "2026-12-28",
    interestedServices: ["Window Cleaning", "Pressure Washing"],
    doNotContact: false,
    assignedTechnicianId: "tech_ahmed",
    notes: [
      { id: "note_6", text: "After-hours cleaning completed. Showroom glass spotless.", createdAt: "2026-10-15T08:00:00Z" }
    ],
    photos: [],
    createdAt: "2026-10-15T08:00:00Z",
    updatedAt: "2026-10-28T18:00:00Z"
  }
];

export const INITIAL_SEED_INVOICE: CrmInvoice = {
  id: "INV-000242",
  type: "invoice",
  jobId: "job_seed_5",
  clientName: "City Toyota Perth",
  clientAddress: "345 Scarborough Beach Rd, Osborne Park WA 6017",
  clientPhone: "08 9200 4400",
  clientEmail: "facilities@citytoyota.com.au",
  subject: "Commercial Showroom Glazing & Pure Water Facade Detailing",
  issueDate: "2026-10-28",
  dueDate: "2026-11-11",
  items: [
    {
      id: "item_1",
      description: "Exterior Showroom Glazing & Entrance Detailing (0 PPM Pure Water)",
      qty: 1,
      rate: 450.00,
      amount: 450.00
    },
    {
      id: "item_2",
      description: "Internal High Glass & Showroom Partition Clean",
      qty: 1,
      rate: 168.18,
      amount: 168.18
    }
  ],
  subtotal: 618.18,
  gst: 61.82,
  total: 680.00,
  status: "paid",
  paymentDetails: DEFAULT_BANKING_DETAILS,
  notes: "Thank you for your business. Payment received with thanks.",
  createdAt: "2026-10-28T17:00:00Z",
  updatedAt: "2026-10-28T17:00:00Z"
};
