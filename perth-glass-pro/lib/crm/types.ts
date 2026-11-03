export type PropertyType = "Residential" | "Commercial";
export type StoreysType = "Single Storey" | "Double Storey" | "Multi Storey";
export type SubscriptionFrequency = "one_off" | "monthly" | "bi_monthly" | "quarterly" | "half_yearly" | "annual";

export interface JobPhoto {
  id: string;
  dataUrl: string;
  caption: string;
  tag: "before" | "after" | "hazard" | "property";
  createdAt: string;
}

export interface JobNote {
  id: string;
  text: string;
  createdAt: string;
}

export interface CrmStage {
  id: string;
  name: string;
  color: string; // Tailwind color class or hex (e.g., 'blue', 'amber', 'emerald', 'purple')
  order: number;
}

export interface Technician {
  id: string;
  name: string;
  phone: string;
  color: string;
}

export interface ConversationMessage {
  id: string;
  sender: "customer" | "ai" | "human";
  senderName?: string;
  text: string;
  timestamp: string;
  channel: "sms" | "live_chat" | "phone";
}

export interface CrmJob {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  suburb: string;
  stageId: string;
  propertyType: PropertyType;
  storeys: StoreysType;
  windowCount?: string | number;
  hasScreens: boolean;
  packageType?: "Detailed Clean" | "Basic Wash" | "Custom";
  priceQuoted?: number;
  
  // Contact & Communication
  contactMethod?: "ai_sms" | "ai_livechat" | "manual_phone" | "manual_sms" | "email";
  contactedBy?: string; // e.g. "Fazal AI (SMS)", "Ahmed (Phone)", "Website Live Chat"
  contactTimestamp?: string;
  conversationTrail?: ConversationMessage[];

  // Quoting & Scope for Field Technicians (No prices shown to techs)
  quoteId?: string;
  workItems?: Array<{ heading?: string; description: string; qty?: number }>;
  estimatedHours?: number; // e.g. 2.0 or 2.5 hrs

  // Technician Arrival, Clock-in & Live Timer
  clockInTime?: string; // ISO string when tech tapped "We Have Arrived"
  clockOutTime?: string; // ISO string when tech tapped "Job Completed"
  actualDurationMinutes?: number;

  // Recurring subscription & recall data
  lastCleanedDate?: string; // YYYY-MM-DD
  subscriptionFrequency: SubscriptionFrequency;
  nextDueDate?: string; // YYYY-MM-DD
  interestedServices: string[]; // e.g., ["Solar Panels", "Gutters", "Pressure Washing"]
  
  // Compliance & dispatch
  doNotContact: boolean;
  assignedTechnicianId?: string;
  scheduledDate?: string; // YYYY-MM-DD
  scheduledTimeSlot?: string; // e.g. "08:30 - 11:00 AM"

  // Google Review Outreach via Telnyx
  reviewRequested?: boolean;
  reviewSentAt?: string;

  notes: JobNote[];
  photos: JobPhoto[];

  createdAt: string;
  updatedAt: string;
}

export interface InvoiceItem {
  id: string;
  heading?: string; // Item Title / Heading (e.g., "Double Storey Glazing")
  description: string; // Detailed description / scope (e.g., "Inside & out, frames, tracks")
  qty: number;
  rate: number;
  amount: number;
}

export interface CustomDocumentSection {
  id: string;
  title: string;
  content: string;
}

export interface BusinessDetails {
  name: string;
  tradingName?: string;
  address: string;
  abn: string;
  email: string;
  phone: string;
  website?: string;
  insuranceInfo?: string;
}

export interface CrmInvoice {
  id: string; // e.g. "INV-000243" or "QUO-0001"
  type: "invoice" | "quote";
  jobId?: string;
  clientName: string;
  clientAddress: string;
  clientPhone?: string;
  clientEmail?: string;
  subject?: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  
  // Financials & Discounts
  subtotal: number;
  discountType?: "fixed" | "percentage";
  discountValue?: number;
  discountLabel?: string;
  discountAmount?: number;
  gst: number;
  total: number;
  includeGst?: boolean;
  status: "draft" | "sent" | "paid";

  // Business Details & Custom Header
  businessDetails?: BusinessDetails;

  // Payment Details (Togglable)
  showPaymentDetails?: boolean;
  paymentDetails: {
    bankName: string;
    accountName: string;
    bsb: string;
    accountNumber: string;
    payId: string;
    customInstructions?: string;
  };

  // Modular customizable sections
  customerNote?: string;
  termsAndConditions?: string;
  customSections?: CustomDocumentSection[];

  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type CrmActiveTab = "pipeline" | "schedule" | "recalls" | "invoices" | "customers";
