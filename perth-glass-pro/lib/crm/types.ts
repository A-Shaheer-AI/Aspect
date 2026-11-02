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

  notes: JobNote[];
  photos: JobPhoto[];

  createdAt: string;
  updatedAt: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  qty: number;
  rate: number;
  amount: number;
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
  subtotal: number;
  gst: number;
  total: number;
  includeGst?: boolean;
  status: "draft" | "sent" | "paid";
  paymentDetails: {
    bankName: string;
    accountName: string;
    bsb: string;
    accountNumber: string;
    payId: string;
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export type CrmActiveTab = "pipeline" | "schedule" | "recalls" | "invoices" | "customers";
