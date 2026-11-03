"use client";

import React, { useState, useEffect } from "react";
import {
  CrmJob,
  CrmStage,
  Technician,
  CrmInvoice,
  CrmActiveTab,
  ConversationMessage,
  SubscriptionVisit
} from "@/lib/crm/types";
import {
  DEFAULT_STAGES,
  DEFAULT_TECHNICIANS,
  INITIAL_SEED_JOBS,
  INITIAL_SEED_INVOICE,
  calculateNextDueDate
} from "@/lib/crm/store";
import { buildInvoiceFromParsed } from "@/lib/crm/ai-invoice-parser";

// CRM Components
import CrmHeader from "@/components/crm/CrmHeader";
import CrmNavigation from "@/components/crm/CrmNavigation";
import KanbanBoard from "@/components/crm/KanbanBoard";
import WeekScheduleView from "@/components/crm/WeekScheduleView";
import RecallsView from "@/components/crm/RecallsView";
import InvoicesView from "@/components/crm/InvoicesView";
import InvoicePreviewModal from "@/components/crm/InvoicePreviewModal";
import CustomersView from "@/components/crm/CustomersView";
import JobModal from "@/components/crm/JobModal";
import ManageStagesModal from "@/components/crm/ManageStagesModal";
import QuotePromptModal from "@/components/crm/QuotePromptModal";
import ContactPromptModal from "@/components/crm/ContactPromptModal";
import BookingPromptModal from "@/components/crm/BookingPromptModal";
import TechnicianJobSheetModal from "@/components/crm/TechnicianJobSheetModal";
import ReviewRequestModal from "@/components/crm/ReviewRequestModal";
import SubscriptionScheduleModal from "@/components/crm/SubscriptionScheduleModal";

const STORAGE_KEYS = {
  JOBS: "aspect_crm_jobs",
  STAGES: "aspect_crm_stages",
  INVOICES: "aspect_crm_invoices",
  TECHNICIANS: "aspect_crm_technicians"
};

export default function CrmPage() {
  const [isHydrated, setIsHydrated] = useState(false);

  // Core CRM State
  const [jobs, setJobs] = useState<CrmJob[]>([]);
  const [stages, setStages] = useState<CrmStage[]>([]);
  const [invoices, setInvoices] = useState<CrmInvoice[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>([]);

  // Navigation & Search State
  const [activeTab, setActiveTab] = useState<CrmActiveTab>("pipeline");
  const [searchQuery, setSearchQuery] = useState("");

  // Modals State
  const [selectedJob, setSelectedJob] = useState<CrmJob | null>(null);
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [isManageStagesOpen, setIsManageStagesOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<CrmInvoice | null>(null);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);

  // Pipeline Specific Modals
  const [contactingJob, setContactingJob] = useState<CrmJob | null>(null);
  const [isContactPromptOpen, setIsContactPromptOpen] = useState(false);

  const [quotingJob, setQuotingJob] = useState<CrmJob | null>(null);
  const [isQuotePromptOpen, setIsQuotePromptOpen] = useState(false);

  const [bookingJob, setBookingJob] = useState<CrmJob | null>(null);
  const [isBookingPromptOpen, setIsBookingPromptOpen] = useState(false);

  const [techSheetJob, setTechSheetJob] = useState<CrmJob | null>(null);
  const [isTechSheetOpen, setIsTechSheetOpen] = useState(false);

  const [reviewJob, setReviewJob] = useState<CrmJob | null>(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  // VIP Subscription Fridge Card Modal
  const [fridgeJob, setFridgeJob] = useState<CrmJob | null>(null);
  const [isFridgeModalOpen, setIsFridgeModalOpen] = useState(false);

  // Web Leads Sync State
  const [isSyncingLeads, setIsSyncingLeads] = useState(false);
  const [syncedLeadsCount, setSyncedLeadsCount] = useState(0);

  // 1. Initial Load from LocalStorage
  useEffect(() => {
    try {
      const storedJobs = localStorage.getItem(STORAGE_KEYS.JOBS);
      const storedStages = localStorage.getItem(STORAGE_KEYS.STAGES);
      const storedInvoices = localStorage.getItem(STORAGE_KEYS.INVOICES);
      const storedTechnicians = localStorage.getItem(STORAGE_KEYS.TECHNICIANS);

      setJobs(storedJobs ? JSON.parse(storedJobs) : INITIAL_SEED_JOBS);
      setStages(storedStages ? JSON.parse(storedStages) : DEFAULT_STAGES);
      setInvoices(storedInvoices ? JSON.parse(storedInvoices) : [INITIAL_SEED_INVOICE]);
      setTechnicians(storedTechnicians ? JSON.parse(storedTechnicians) : DEFAULT_TECHNICIANS);
    } catch (e) {
      console.error("Failed to load Aspect CRM data from localStorage:", e);
      setJobs(INITIAL_SEED_JOBS);
      setStages(DEFAULT_STAGES);
      setInvoices([INITIAL_SEED_INVOICE]);
      setTechnicians(DEFAULT_TECHNICIANS);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Auto-sync website leads on initial mount
  useEffect(() => {
    if (!isHydrated) return;
    syncWebsiteLeads(false);
  }, [isHydrated]);

  // 2. Persist to LocalStorage on State Change
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
    } catch (e) {
      console.error("Failed to save jobs to localStorage:", e);
    }
  }, [jobs, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEYS.STAGES, JSON.stringify(stages));
    } catch (e) {
      console.error("Failed to save stages to localStorage:", e);
    }
  }, [stages, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
    } catch (e) {
      console.error("Failed to save invoices to localStorage:", e);
    }
  }, [invoices, isHydrated]);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEYS.TECHNICIANS, JSON.stringify(technicians));
    } catch (e) {
      console.error("Failed to save technicians to localStorage:", e);
    }
  }, [technicians, isHydrated]);

  // Handler: Move Job between stages (Drag & Drop or Manual Drop)
  const handleJobMove = (jobId: string, targetStageId: string) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    const targetStage = stages.find(s => s.id === targetStageId);
    const targetName = targetStage?.name.toLowerCase() || "";

    // 1. Moving to Contacted
    if (targetStageId === "stage_contacted" || targetName.includes("contact")) {
      setContactingJob(job);
      setIsContactPromptOpen(true);
      return;
    }

    // 2. Moving to Quote Sent
    if (targetStageId === "stage_quoted" || targetName.includes("quote")) {
      setQuotingJob(job);
      setIsQuotePromptOpen(true);
      return;
    }

    // 3. Moving to Booked
    if (targetStageId === "stage_booked" || targetName.includes("booked")) {
      setBookingJob(job);
      setIsBookingPromptOpen(true);
      return;
    }

    // 4. Moving to In Progress
    if (targetStageId === "stage_in_progress" || targetName.includes("progress")) {
      handleClockIn(jobId);
      return;
    }

    // 5. Moving to Completed
    if (targetStageId === "stage_completed" || targetName.includes("completed")) {
      handleClockOut(jobId);
      return;
    }

    // 6. Moving to Invoiced
    if (targetStageId === "stage_invoiced" || targetName.includes("invoiced") || targetName.includes("paid")) {
      handleGenerateInvoiceFromCompletedJob(job);
      return;
    }

    // Default fallback
    setJobs(prev =>
      prev.map(j => (j.id === jobId ? { ...j, stageId: targetStageId, updatedAt: new Date().toISOString() } : j))
    );
  };

  // Handler: Advance Job to Next Phase (from JobCard button)
  const handleAdvanceStage = (job: CrmJob) => {
    // 1. New Leads -> Contacted
    if (job.stageId === "stage_new") {
      setContactingJob(job);
      setIsContactPromptOpen(true);
      return;
    }

    // 2. Contacted -> Quote Sent
    if (job.stageId === "stage_contacted") {
      setQuotingJob(job);
      setIsQuotePromptOpen(true);
      return;
    }

    // 3. Quote Sent -> Booked
    if (job.stageId === "stage_quoted") {
      setBookingJob(job);
      setIsBookingPromptOpen(true);
      return;
    }

    // 4. Booked -> In Progress (Technician Clock-In)
    if (job.stageId === "stage_booked") {
      setTechSheetJob(job);
      setIsTechSheetOpen(true);
      return;
    }

    // 5. In Progress -> Completed (Technician Clock-Out)
    if (job.stageId === "stage_in_progress") {
      setTechSheetJob(job);
      setIsTechSheetOpen(true);
      return;
    }

    // 6. Completed -> Invoiced (Generate Tax Invoice from Quote)
    if (job.stageId === "stage_completed") {
      handleGenerateInvoiceFromCompletedJob(job);
      return;
    }

    // 7. Invoiced -> Send Review SMS
    if (job.stageId === "stage_invoiced") {
      setReviewJob(job);
      setIsReviewModalOpen(true);
      return;
    }

    // General fallback
    const sorted = [...stages].sort((a, b) => a.order - b.order);
    const currentIdx = sorted.findIndex(s => s.id === job.stageId);
    if (currentIdx >= 0 && currentIdx < sorted.length - 1) {
      const nextStage = sorted[currentIdx + 1];
      handleJobMove(job.id, nextStage.id);
    }
  };

  // 1. Contacted Confirmation Handler
  const handleConfirmContact = (
    jobId: string,
    method: "ai_sms" | "ai_livechat" | "manual_phone" | "manual_sms" | "email",
    contactedBy: string,
    initialMessage?: string
  ) => {
    setJobs(prev =>
      prev.map(j => {
        if (j.id !== jobId) return j;
        const nowIso = new Date().toISOString();
        const newMsg: ConversationMessage | null = initialMessage
          ? {
              id: `msg_${Date.now()}`,
              sender: method === "ai_sms" || method === "ai_livechat" ? "ai" : "human",
              senderName: contactedBy,
              text: initialMessage,
              timestamp: nowIso,
              channel: method === "ai_livechat" ? "live_chat" : "sms"
            }
          : null;

        const updatedTrail = newMsg ? [...(j.conversationTrail || []), newMsg] : j.conversationTrail;

        return {
          ...j,
          stageId: "stage_contacted",
          contactMethod: method,
          contactedBy,
          contactTimestamp: nowIso,
          conversationTrail: updatedTrail,
          updatedAt: nowIso
        };
      })
    );
  };

  // 2. Quote Saved Handlers (Instant SMS & 2-Day Follow-Up System)
  const handleSaveManualPrice = (
    jobId: string,
    price: number,
    note?: string,
    autoFollowUp: boolean = true,
    sendImmediateSms: boolean = true
  ) => {
    const nowIso = new Date().toISOString();
    const twoDaysLaterIso = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();

    setJobs(prev =>
      prev.map(j => {
        if (j.id !== jobId) return j;
        const updatedNotes = note
          ? [{ id: `note_${Date.now()}`, text: note, createdAt: nowIso }, ...j.notes]
          : j.notes;

        let trail = j.conversationTrail || [];
        if (sendImmediateSms && j.phone) {
          const firstName = j.customerName.split(" ")[0];
          trail = [
            ...trail,
            {
              id: `msg_quote_${Date.now()}`,
              sender: "human",
              senderName: "Ahmed (Aspect Window Cleaning)",
              text: `Hi ${firstName}, your window cleaning quote from Aspect Window Cleaning for $${price} has been prepared. Feel free to reply or call us on 0426 996 192 with any questions!`,
              timestamp: nowIso,
              channel: "sms"
            }
          ];
        }

        return {
          ...j,
          stageId: "stage_quoted",
          priceQuoted: price,
          quoteSentDate: nowIso,
          autoFollowUpEnabled: autoFollowUp,
          followUpDueDate: autoFollowUp ? twoDaysLaterIso : undefined,
          followUpSent: false,
          conversationTrail: trail,
          notes: updatedNotes,
          updatedAt: nowIso
        };
      })
    );
  };

  const handleSaveFormalQuote = (
    jobId: string,
    quote: CrmInvoice,
    triggerPrint: boolean,
    autoFollowUp: boolean = true,
    sendImmediateSms: boolean = true
  ) => {
    // 1. Save quote into invoices store
    handleSaveInvoice(quote);

    const nowIso = new Date().toISOString();
    const twoDaysLaterIso = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();

    // 2. Save quoteId, workItems scope, and priceQuoted onto the job, move to Quote Sent
    const workItems = quote.items.map(item => ({
      heading: item.heading,
      description: item.description,
      qty: item.qty
    }));

    setJobs(prev =>
      prev.map(j => {
        if (j.id !== jobId) return j;

        let trail = j.conversationTrail || [];
        if (sendImmediateSms && j.phone) {
          const firstName = j.customerName.split(" ")[0];
          trail = [
            ...trail,
            {
              id: `msg_quote_${Date.now()}`,
              sender: "human",
              senderName: "Ahmed (Aspect Window Cleaning)",
              text: `Hi ${firstName}, your formal quotation #${quote.id} for $${quote.total} from Aspect Window Cleaning has been sent. Please feel free to reply or call 0426 996 192 with any questions!`,
              timestamp: nowIso,
              channel: "sms"
            }
          ];
        }

        return {
          ...j,
          stageId: "stage_quoted",
          priceQuoted: quote.total,
          quoteId: quote.id,
          quoteSentDate: nowIso,
          autoFollowUpEnabled: autoFollowUp,
          followUpDueDate: autoFollowUp ? twoDaysLaterIso : undefined,
          followUpSent: false,
          conversationTrail: trail,
          workItems,
          updatedAt: nowIso
        };
      })
    );

    // 3. Open preview and trigger download/print if requested
    if (triggerPrint) {
      setSelectedInvoice(quote);
      setIsInvoiceModalOpen(true);
      setTimeout(() => {
        window.print();
      }, 350);
    }
  };

  // Follow-Up Management Handlers
  const handleToggleAutoFollowUp = (jobId: string, enabled: boolean) => {
    setJobs(prev =>
      prev.map(j => {
        if (j.id !== jobId) return j;
        return {
          ...j,
          autoFollowUpEnabled: enabled,
          followUpDueDate: enabled ? new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString() : undefined,
          updatedAt: new Date().toISOString()
        };
      })
    );
  };

  const handleTriggerFollowUpSms = (job: CrmJob) => {
    const nowIso = new Date().toISOString();
    const firstName = job.customerName.split(" ")[0] || "there";
    const followUpMsgText = `Hi ${firstName}, Ahmed here from Aspect Window Cleaning! Just checking in to see if you had any questions regarding the window cleaning quote we sent for your property at ${job.address}? We'd love to lock in a time that works for you. Let me know!`;

    const newMsg: ConversationMessage = {
      id: `msg_followup_${Date.now()}`,
      sender: "human",
      senderName: "Ahmed (Follow-Up)",
      text: followUpMsgText,
      timestamp: nowIso,
      channel: "sms"
    };

    setJobs(prev =>
      prev.map(j => {
        if (j.id !== job.id) return j;
        return {
          ...j,
          followUpSent: true,
          conversationTrail: [...(j.conversationTrail || []), newMsg],
          updatedAt: nowIso
        };
      })
    );

    if (job.phone) {
      window.open(`sms:${job.phone}?body=${encodeURIComponent(followUpMsgText)}`, "_blank");
    }
  };

  // Fridge Schedule & 1-Week Advance Notice Handlers
  const handleOpenFridgeSchedule = (job: CrmJob) => {
    setFridgeJob(job);
    setIsFridgeModalOpen(true);
  };

  const handleSaveSubscriptionSchedule = (jobId: string, schedule: SubscriptionVisit[]) => {
    setJobs(prev =>
      prev.map(j => {
        if (j.id !== jobId) return j;
        return {
          ...j,
          subscriptionYearlyPlan: schedule,
          updatedAt: new Date().toISOString()
        };
      })
    );
  };

  const handleSendAdvanceNotice = (jobOrId: CrmJob | string, message?: string) => {
    const targetJob = typeof jobOrId === "string" ? jobs.find(j => j.id === jobOrId) : jobOrId;
    if (!targetJob) return;
    const jobId = targetJob.id;

    const nowIso = new Date().toISOString();
    const firstName = targetJob.customerName.split(" ")[0] || "there";
    const noticeText =
      message ||
      `Hi ${firstName}, this is Ahmed from Aspect Window Cleaning! Just a friendly advance notice that your VIP Care Plan visit is scheduled for next week. As part of our service, we can attend anytime within that week and will confirm with you 24 hours prior to our arrival. Please reply if this week still suits or if you need any adjustments!`;

    const newMsg: ConversationMessage = {
      id: `msg_advance_${Date.now()}`,
      sender: "human",
      senderName: "Ahmed (VIP Advance Notice)",
      text: noticeText,
      timestamp: nowIso,
      channel: "sms"
    };

    setJobs(prev =>
      prev.map(j => {
        if (j.id !== jobId) return j;
        return {
          ...j,
          advanceNoticeSent: true,
          conversationTrail: [...(j.conversationTrail || []), newMsg],
          updatedAt: nowIso
        };
      })
    );

    if (targetJob.phone) {
      window.open(`sms:${targetJob.phone}?body=${encodeURIComponent(noticeText)}`, "_blank");
    }
  };

  // Website Lead Synchronization Handler
  const syncWebsiteLeads = async (showToast = true) => {
    setIsSyncingLeads(true);
    try {
      const res = await fetch("/api/crm/sync-leads");
      if (!res.ok) throw new Error("Network error syncing website leads");
      const data = await res.json();
      if (data.success && Array.isArray(data.leads)) {
        let newCount = 0;
        setJobs(prev => {
          const existingPhones = new Set(prev.map(j => (j.phone || "").replace(/\D/g, "")).filter(Boolean));
          const existingEmails = new Set(prev.map(j => (j.email || "").toLowerCase().trim()).filter(Boolean));
          const existingIds = new Set(prev.map(j => j.id));

          const newlyImported: CrmJob[] = [];

          for (const lead of data.leads) {
            const cleanLeadPhone = (lead.phone || "").replace(/\D/g, "");
            const cleanLeadEmail = (lead.email || "").toLowerCase().trim();
            const customJobId = `job_${lead.id}`;

            if (
              existingIds.has(customJobId) ||
              (cleanLeadPhone && existingPhones.has(cleanLeadPhone)) ||
              (cleanLeadEmail && existingEmails.has(cleanLeadEmail))
            ) {
              continue;
            }

            const conversationTrail: ConversationMessage[] = (lead.messages || []).map((m: any, idx: number) => ({
              id: `msg_sync_${lead.id}_${idx}`,
              sender: m.role === "assistant" ? "ai" : m.role === "user" ? "customer" : "human",
              senderName: m.role === "assistant" ? "Aspect AI" : m.role === "user" ? lead.name || "Customer" : "Ahmed",
              text: m.body || "",
              timestamp: m.timestamp || new Date().toISOString(),
              channel: "sms"
            }));

            const storeysMap: Record<string, "Single Storey" | "Double Storey" | "Multi Storey"> = {
              single: "Single Storey",
              double: "Double Storey",
              multi: "Multi Storey"
            };

            const newJob: CrmJob = {
              id: customJobId,
              customerName: lead.name || "Website Prospect",
              phone: lead.phone || "",
              email: lead.email || undefined,
              address: lead.extracted_details?.address || (lead.suburb ? `${lead.suburb}` : "Perth Metro"),
              suburb: lead.suburb || "Perth",
              stageId:
                lead.status === "CONTACTED"
                  ? "stage_contacted"
                  : lead.status === "QUOTED"
                  ? "stage_quoted"
                  : lead.status === "WON"
                  ? "stage_won"
                  : "stage_new",
              propertyType: lead.extracted_details?.property_type === "commercial" ? "Commercial" : "Residential",
              storeys: storeysMap[lead.extracted_details?.storeys || ""] || "Single Storey",
              windowCount: lead.extracted_details?.window_count ? String(lead.extracted_details.window_count) : undefined,
              hasScreens: Boolean(lead.extracted_details?.has_screens),
              packageType: lead.extracted_details?.chosen_plan === "basic" ? "Basic Wash" : "Detailed Clean",
              priceQuoted: lead.quoted_value || undefined,
              leadSource: "website_form",
              contactMethod: conversationTrail.length > 0 ? "ai_sms" : "email",
              contactedBy: conversationTrail.length > 0 ? "AI SMS Assistant" : "Website Form Submission",
              contactTimestamp: lead.created_at,
              conversationTrail,
              notes:
                lead.extracted_details?.notes || lead.extracted_details?.scope
                  ? [
                      {
                        id: `note_${Date.now()}_${newCount}`,
                        text: lead.extracted_details.notes || lead.extracted_details.scope || "",
                        createdAt: lead.created_at || new Date().toISOString()
                      }
                    ]
                  : [],
              subscriptionFrequency: "one_off",
              interestedServices: [lead.serviceType || "Window Cleaning"],
              doNotContact: false,
              photos: [],
              createdAt: lead.created_at || new Date().toISOString(),
              updatedAt: lead.updated_at || new Date().toISOString()
            };

            newlyImported.push(newJob);
            if (cleanLeadPhone) existingPhones.add(cleanLeadPhone);
            if (cleanLeadEmail) existingEmails.add(cleanLeadEmail);
            existingIds.add(customJobId);
            newCount++;
          }

          if (newCount > 0) {
            setSyncedLeadsCount(c => c + newCount);
            return [...newlyImported, ...prev];
          }
          return prev;
        });

        if (showToast) {
          if (newCount > 0) {
            alert(`✅ Pulled ${newCount} new website inquiry lead${newCount > 1 ? "s" : ""} into New Leads pipeline!`);
          } else {
            alert("✨ All website leads are already synchronized up to date!");
          }
        }
      }
    } catch (err) {
      console.warn("Notice syncing web leads:", err);
    } finally {
      setIsSyncingLeads(false);
    }
  };

  // 3. Booking Confirmation Handler
  const handleConfirmBooking = (
    jobId: string,
    scheduledDate: string,
    scheduledTimeSlot: string,
    assignedTechnicianId: string,
    estimatedHours: number
  ) => {
    setJobs(prev =>
      prev.map(j => {
        if (j.id !== jobId) return j;
        return {
          ...j,
          stageId: "stage_booked",
          scheduledDate,
          scheduledTimeSlot,
          assignedTechnicianId,
          estimatedHours,
          updatedAt: new Date().toISOString()
        };
      })
    );
  };

  // 4. Technician Clock-In (Arrival)
  const handleClockIn = (jobId: string) => {
    const nowIso = new Date().toISOString();
    setJobs(prev =>
      prev.map(j => {
        if (j.id !== jobId) return j;
        return {
          ...j,
          stageId: "stage_in_progress",
          clockInTime: nowIso,
          clockOutTime: undefined,
          updatedAt: nowIso
        };
      })
    );
    // Also update active tech sheet if open
    if (techSheetJob && techSheetJob.id === jobId) {
      setTechSheetJob(prev => prev ? { ...prev, stageId: "stage_in_progress", clockInTime: nowIso } : null);
    }
  };

  // 5. Technician Clock-Out (Completed)
  const handleClockOut = (jobId: string) => {
    const nowIso = new Date().toISOString();
    const todayStr = nowIso.split("T")[0];

    setJobs(prev =>
      prev.map(j => {
        if (j.id !== jobId) return j;
        const startTime = j.clockInTime ? new Date(j.clockInTime).getTime() : Date.now() - 60 * 60 * 1000;
        const diffMin = Math.max(1, Math.round((new Date(nowIso).getTime() - startTime) / 60000));
        const nextDue = j.subscriptionFrequency !== "one_off" ? calculateNextDueDate(todayStr, j.subscriptionFrequency) : j.nextDueDate;

        return {
          ...j,
          stageId: "stage_completed",
          clockOutTime: nowIso,
          actualDurationMinutes: diffMin,
          lastCleanedDate: todayStr,
          nextDueDate: nextDue,
          updatedAt: nowIso
        };
      })
    );

    if (techSheetJob && techSheetJob.id === jobId) {
      setIsTechSheetOpen(false);
    }
  };

  // 6. Generate Invoice from Completed Job (Pre-populated from Quote)
  const handleGenerateInvoiceFromCompletedJob = (job: CrmJob) => {
    const existingCount = invoices.length + 242;
    const invoiceId = `INV-${String(existingCount).padStart(6, "0")}`;
    const todayStr = new Date().toISOString().split("T")[0];

    const due = new Date();
    due.setDate(due.getDate() + 14);
    const dueDateStr = due.toISOString().split("T")[0];

    // Find the accepted quote if exists
    const matchingQuote = job.quoteId ? invoices.find(i => i.id === job.quoteId) : null;

    let invoiceItems = matchingQuote?.items || [];
    if (invoiceItems.length === 0) {
      if (job.workItems && job.workItems.length > 0) {
        invoiceItems = job.workItems.map((wi, idx) => ({
          id: `item_${Date.now()}_${idx}`,
          heading: wi.heading || "Window Cleaning Service",
          description: wi.description,
          qty: wi.qty || 1,
          rate: job.priceQuoted ? Math.round(job.priceQuoted / job.workItems!.length) : 280,
          amount: job.priceQuoted ? Math.round(job.priceQuoted / job.workItems!.length) : 280
        }));
      } else {
        const p = job.priceQuoted || 280;
        invoiceItems = [
          {
            id: `item_${Date.now()}`,
            heading: `${job.storeys} Full Glazing Wash`,
            description: `Inside and outside pure water wash - ${job.packageType || "Detailed Clean"}. Frames and tracks detailed.`,
            qty: 1,
            rate: p,
            amount: p
          }
        ];
      }
    }

    const itemsTotal = invoiceItems.reduce((acc, i) => acc + (i.amount || 0), 0);
    const subtotal = Math.round((itemsTotal / 1.1) * 100) / 100;
    const gst = Math.round((itemsTotal - subtotal) * 100) / 100;

    const newInvoice: CrmInvoice = {
      id: invoiceId,
      type: "invoice",
      jobId: job.id,
      clientName: job.customerName,
      clientAddress: `${job.address}, ${job.suburb} WA`,
      clientPhone: job.phone,
      clientEmail: job.email,
      subject: `Tax Invoice for Window Cleaning at ${job.address}`,
      issueDate: todayStr,
      dueDate: dueDateStr,
      items: invoiceItems,
      subtotal,
      gst,
      total: itemsTotal,
      includeGst: true,
      status: "sent",
      paymentDetails: matchingQuote?.paymentDetails || {
        bankName: "Commonwealth Bank",
        accountName: "Ahmed Shaheer",
        bsb: "066134",
        accountNumber: "11259529",
        payId: "0426996192",
        customInstructions: "Payment strictly 14 days. Please quote invoice number as reference."
      },
      notes: "Payment is strictly 14 days from invoice date. Direct EFT or PayID.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    handleSaveInvoice(newInvoice);

    // Update job stage to Invoiced
    setJobs(prev =>
      prev.map(j => (j.id === job.id ? { ...j, stageId: "stage_invoiced", updatedAt: new Date().toISOString() } : j))
    );

    // Open invoice preview modal
    setSelectedInvoice(newInvoice);
    setIsInvoiceModalOpen(true);

    // Automatically queue Review Request prompt for this customer
    setReviewJob(job);
  };

  // 7. Review Request Sent Handler
  const handleSendReview = (jobId: string, channel: "sms" | "email", message: string) => {
    const nowIso = new Date().toISOString();
    setJobs(prev =>
      prev.map(j => {
        if (j.id !== jobId) return j;
        const reviewMsg: ConversationMessage = {
          id: `msg_review_${Date.now()}`,
          sender: "human",
          senderName: "Ahmed (Review Bot)",
          text: message,
          timestamp: nowIso,
          channel: channel === "sms" ? "sms" : "sms"
        };
        return {
          ...j,
          reviewRequested: true,
          reviewSentAt: nowIso,
          conversationTrail: [...(j.conversationTrail || []), reviewMsg],
          updatedAt: nowIso
        };
      })
    );
  };

  // Handler: Save or Update Job
  const handleSaveJob = (job: CrmJob) => {
    setJobs(prev => {
      const exists = prev.some(j => j.id === job.id);
      if (exists) {
        return prev.map(j => (j.id === job.id ? job : j));
      }
      return [job, ...prev];
    });
  };

  // Handler: Delete Job
  const handleDeleteJob = (jobId: string) => {
    setJobs(prev => prev.filter(j => j.id !== jobId));
  };

  // Handler: Save or Update Invoice
  const handleSaveInvoice = (invoice: CrmInvoice) => {
    setInvoices(prev => {
      const exists = prev.some(i => i.id === invoice.id);
      if (exists) {
        return prev.map(i => (i.id === invoice.id ? invoice : i));
      }
      return [invoice, ...prev];
    });

    // If an invoice is saved for a completed job, trigger review request modal if not sent yet
    if (invoice.type === "invoice" && invoice.jobId) {
      const matchingJob = jobs.find(j => j.id === invoice.jobId);
      if (matchingJob && !matchingJob.reviewRequested) {
        setReviewJob(matchingJob);
        setIsReviewModalOpen(true);
      }
    }
  };

  // Handler: Delete Invoice
  const handleDeleteInvoice = (invoiceId: string) => {
    setInvoices(prev => prev.filter(i => i.id !== invoiceId));
  };

  // Handler: Convert Quote to Formal Invoice
  const handleConvertQuoteToInvoice = (quote: CrmInvoice) => {
    const existingCount = invoices.length + 242;
    const invoiceId = `INV-${String(existingCount).padStart(6, "0")}`;
    const todayStr = new Date().toISOString().split("T")[0];

    const due = new Date();
    due.setDate(due.getDate() + 14);
    const dueDateStr = due.toISOString().split("T")[0];

    const converted: CrmInvoice = {
      ...quote,
      id: invoiceId,
      type: "invoice",
      issueDate: todayStr,
      dueDate: dueDateStr,
      status: "draft",
      notes: "Payment is strictly 14 days from invoice date. Direct EFT or PayID.",
      updatedAt: new Date().toISOString()
    };

    handleSaveInvoice(converted);
    setSelectedInvoice(converted);
    setIsInvoiceModalOpen(true);
  };

  // Quick New Job Triggers
  const handleOpenNewJob = () => {
    setSelectedJob(null);
    setIsJobModalOpen(true);
  };

  const handleNewJobInStage = (stageId: string) => {
    const emptyJob: CrmJob = {
      id: `job_${Date.now()}`,
      customerName: "",
      phone: "",
      address: "",
      suburb: "",
      stageId,
      propertyType: "Residential",
      storeys: "Single Storey",
      hasScreens: true,
      packageType: "Detailed Clean",
      subscriptionFrequency: "one_off",
      interestedServices: ["Window Cleaning"],
      doNotContact: false,
      notes: [],
      photos: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setSelectedJob(emptyJob);
    setIsJobModalOpen(true);
  };

  const handleNewJobForDate = (dateStr: string) => {
    const emptyJob: CrmJob = {
      id: `job_${Date.now()}`,
      customerName: "",
      phone: "",
      address: "",
      suburb: "",
      stageId: "stage_booked",
      scheduledDate: dateStr,
      scheduledTimeSlot: "08:30 - 11:30 AM",
      propertyType: "Residential",
      storeys: "Single Storey",
      hasScreens: true,
      packageType: "Detailed Clean",
      subscriptionFrequency: "one_off",
      interestedServices: ["Window Cleaning"],
      doNotContact: false,
      notes: [],
      photos: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setSelectedJob(emptyJob);
    setIsJobModalOpen(true);
  };

  // JSON Backup Handlers
  const handleExportBackup = () => {
    const backupData = {
      version: "1.2.0",
      timestamp: new Date().toISOString(),
      jobs,
      stages,
      invoices,
      technicians
    };
    const jsonStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `aspect_crm_backup_${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportBackup = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.jobs && Array.isArray(data.jobs)) setJobs(data.jobs);
        if (data.stages && Array.isArray(data.stages)) setStages(data.stages);
        if (data.invoices && Array.isArray(data.invoices)) setInvoices(data.invoices);
        if (data.technicians && Array.isArray(data.technicians)) setTechnicians(data.technicians);
        alert("Aspect CRM data restored successfully!");
      } catch (err) {
        console.error("Backup file parse error:", err);
        alert("Failed to restore backup file. Invalid format.");
      }
    };
    reader.readAsText(file);
  };

  // Compute stats
  const activeJobsCount = jobs.filter(j => j.stageId !== "stage_invoiced").length;
  const overdueRecallsCount = jobs.filter(j => {
    if (j.doNotContact || !j.nextDueDate) return false;
    return new Date(j.nextDueDate) <= new Date();
  }).length;

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold text-slate-300">Loading Aspect CRM Operations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70 text-slate-900">
      {/* 1. Header (Sticky Top Bar) */}
      <CrmHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewJobClick={handleOpenNewJob}
        onManageStagesClick={() => setIsManageStagesOpen(true)}
        onExportBackup={handleExportBackup}
        onImportBackup={handleImportBackup}
        onSyncWebsiteLeads={() => syncWebsiteLeads(true)}
        isSyncingLeads={isSyncingLeads}
        syncedLeadsCount={syncedLeadsCount}
      />

      {/* 2. Main Tab View Router */}
      <main className="flex-1 flex flex-col min-h-0">
        {activeTab === "pipeline" && (
          <KanbanBoard
            stages={stages}
            jobs={jobs}
            technicians={technicians}
            searchQuery={searchQuery}
            onJobClick={job => {
              setSelectedJob(job);
              setIsJobModalOpen(true);
            }}
            onJobMove={handleJobMove}
            onAdvanceStage={handleAdvanceStage}
            onNewJobInStage={handleNewJobInStage}
            onManageStagesClick={() => setIsManageStagesOpen(true)}
            onOpenTechSheet={job => {
              setTechSheetJob(job);
              setIsTechSheetOpen(true);
            }}
            onToggleAutoFollowUp={handleToggleAutoFollowUp}
            onTriggerFollowUpSms={handleTriggerFollowUpSms}
            onOpenFridgeSchedule={handleOpenFridgeSchedule}
            onSendAdvanceNotice={handleSendAdvanceNotice}
          />
        )}

        {activeTab === "schedule" && (
          <WeekScheduleView
            jobs={jobs}
            stages={stages}
            technicians={technicians}
            onJobClick={job => {
              setSelectedJob(job);
              setIsJobModalOpen(true);
            }}
            onJobUpdate={handleSaveJob}
            onNewJobForDate={handleNewJobForDate}
          />
        )}

        {activeTab === "recalls" && (
          <RecallsView
            jobs={jobs}
            onJobClick={job => {
              setSelectedJob(job);
              setIsJobModalOpen(true);
            }}
            onJobUpdate={handleSaveJob}
            onOpenFridgeSchedule={handleOpenFridgeSchedule}
            onSendAdvanceNotice={handleSendAdvanceNotice}
          />
        )}

        {activeTab === "invoices" && (
          <InvoicesView
            invoices={invoices}
            onSelectInvoice={invoice => {
              setSelectedInvoice(invoice);
              setIsInvoiceModalOpen(true);
            }}
            onSaveInvoice={handleSaveInvoice}
            onConvertToInvoice={handleConvertQuoteToInvoice}
          />
        )}

        {activeTab === "customers" && (
          <CustomersView
            jobs={jobs}
            technicians={technicians}
            onJobClick={job => {
              setSelectedJob(job);
              setIsJobModalOpen(true);
            }}
            onJobUpdate={handleSaveJob}
            onUpdateTechnicians={setTechnicians}
          />
        )}
      </main>

      {/* 3. Job & Property Details Drawer Modal */}
      <JobModal
        job={selectedJob}
        isOpen={isJobModalOpen}
        stages={stages}
        technicians={technicians}
        onClose={() => setIsJobModalOpen(false)}
        onSave={handleSaveJob}
        onDelete={handleDeleteJob}
        onGenerateInvoice={handleGenerateInvoiceFromCompletedJob}
        onAdvanceStage={handleAdvanceStage}
      />

      {/* 4. Manage Stages Modal */}
      <ManageStagesModal
        stages={stages}
        isOpen={isManageStagesOpen}
        onClose={() => setIsManageStagesOpen(false)}
        onUpdateStages={setStages}
      />

      {/* 5. Pixel-Perfect Tax Invoice / Quote Preview Modal */}
      <InvoicePreviewModal
        invoice={selectedInvoice}
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        onSave={handleSaveInvoice}
        onDelete={handleDeleteInvoice}
        onConvertToInvoice={handleConvertQuoteToInvoice}
      />

      {/* 6. Quotation Workflow Modal (Manual Verbal vs Prepopulated Formal PDF) */}
      <QuotePromptModal
        job={quotingJob}
        isOpen={isQuotePromptOpen}
        existingInvoiceCount={invoices.length + 242}
        onClose={() => setIsQuotePromptOpen(false)}
        onSaveManualPrice={handleSaveManualPrice}
        onSaveFormalQuote={handleSaveFormalQuote}
      />

      {/* 7. Contact Prompt Modal (New Leads -> Contacted) */}
      <ContactPromptModal
        job={contactingJob}
        isOpen={isContactPromptOpen}
        onClose={() => setIsContactPromptOpen(false)}
        onConfirmContact={handleConfirmContact}
      />

      {/* 8. Booking & Schedule Prompt Modal (Quote Sent -> Booked) */}
      <BookingPromptModal
        job={bookingJob}
        technicians={technicians}
        isOpen={isBookingPromptOpen}
        onClose={() => setIsBookingPromptOpen(false)}
        onConfirmBooking={handleConfirmBooking}
      />

      {/* 9. Technician Job Sheet Modal (Arrival Clock-In & Scope without Prices) */}
      <TechnicianJobSheetModal
        job={techSheetJob}
        technicians={technicians}
        isOpen={isTechSheetOpen}
        onClose={() => setIsTechSheetOpen(false)}
        onClockIn={handleClockIn}
        onClockOut={handleClockOut}
      />

      {/* 10. Review Request Modal (Post-Completion Telnyx Review Text) */}
      <ReviewRequestModal
        job={reviewJob}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        onSendReview={handleSendReview}
      />

      {/* 11. VIP Care Plan & Printable Fridge Schedule Modal */}
      <SubscriptionScheduleModal
        job={fridgeJob}
        isOpen={isFridgeModalOpen}
        onClose={() => setIsFridgeModalOpen(false)}
        onSaveSchedule={handleSaveSubscriptionSchedule}
        onSendAdvanceNotice={(jobId, msg) => handleSendAdvanceNotice(jobId, msg)}
      />

      {/* 12. Native Mobile Bottom Navigation Bar */}
      <CrmNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        overdueRecallsCount={overdueRecallsCount}
        activeJobsCount={activeJobsCount}
      />
    </div>
  );
}
