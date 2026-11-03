import { CrmJob, CrmStage, Technician, CrmInvoice, SubscriptionFrequency } from "./types";

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
    lastCleanedDate: "2026-08-01",
    subscriptionFrequency: "quarterly",
    nextDueDate: "2026-11-01",
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
    packageType: "Basic Wash",
    priceQuoted: 190,
    lastCleanedDate: "2026-04-10",
    subscriptionFrequency: "quarterly",
    nextDueDate: "2026-07-10", // Overdue for recall!
    interestedServices: ["Window Cleaning"],
    doNotContact: false,
    notes: [
      { id: "note_5", text: "Customer asked for quotes over web chat. Looking for recurring service.", createdAt: "2026-10-31T11:00:00Z" }
    ],
    photos: [],
    createdAt: "2026-10-31T11:00:00Z",
    updatedAt: "2026-10-31T11:00:00Z"
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
    lastCleanedDate: "2026-10-28",
    subscriptionFrequency: "bi_monthly",
    nextDueDate: "2026-12-28",
    interestedServices: ["Window Cleaning", "Pressure Washing"],
    doNotContact: false,
    assignedTechnicianId: "tech_ahmed",
    notes: [
      { id: "note_6", text: "After-hours cleaning only. Wash external glass without spraying detailed cars.", createdAt: "2026-10-15T08:00:00Z" }
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
