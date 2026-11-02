"use client";

import React, { useState, useEffect } from "react";
import {
  CrmJob,
  CrmStage,
  Technician,
  CrmInvoice,
  CrmActiveTab
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

  // Handler: Move Job between stages
  const handleJobMove = (jobId: string, targetStageId: string) => {
    setJobs(prev =>
      prev.map(j => (j.id === jobId ? { ...j, stageId: targetStageId, updatedAt: new Date().toISOString() } : j))
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

  // Handler: Generate Invoice directly from Job profile
  const handleGenerateInvoiceFromJob = (job: CrmJob) => {
    setIsJobModalOpen(false);

    const price = job.priceQuoted || 280;
    const parsed = {
      type: "invoice" as const,
      clientName: job.customerName,
      clientAddress: `${job.address}, ${job.suburb} WA`,
      subject: `${job.storeys} Window Cleaning & Detailing (${job.packageType || "Detailed Clean"})`,
      items: [
        {
          description: `${job.storeys} Window Cleaning (Inside & Out) - ${job.packageType || "Detailed Clean"}`,
          qty: 1,
          rate: price,
          amount: price
        }
      ],
      total: price
    };

    const existingCount = invoices.length + 242;
    const newInvoice = buildInvoiceFromParsed(parsed, existingCount);
    newInvoice.jobId = job.id;
    if (job.phone) newInvoice.clientPhone = job.phone;
    if (job.email) newInvoice.clientEmail = job.email;

    handleSaveInvoice(newInvoice);
    setSelectedInvoice(newInvoice);
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
      stageId: stages[0]?.id || "stage_new",
      propertyType: "Residential",
      storeys: "Single Storey",
      hasScreens: true,
      packageType: "Detailed Clean",
      subscriptionFrequency: "one_off",
      interestedServices: ["Window Cleaning"],
      doNotContact: false,
      scheduledDate: dateStr,
      scheduledTimeSlot: "08:30 - 11:30 AM",
      notes: [],
      photos: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setSelectedJob(emptyJob);
    setIsJobModalOpen(true);
  };

  // Backup: Export JSON
  const handleExportBackup = () => {
    const backupData = {
      version: "1.0",
      exportedAt: new Date().toISOString(),
      jobs,
      stages,
      invoices,
      technicians
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `aspect_crm_backup_${new Date().toISOString().split("T")[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Backup: Import JSON
  const handleImportBackup = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => {
      try {
        const content = e.target?.result as string;
        const parsed = JSON.parse(content);
        if (parsed.jobs && Array.isArray(parsed.jobs)) setJobs(parsed.jobs);
        if (parsed.stages && Array.isArray(parsed.stages)) setStages(parsed.stages);
        if (parsed.invoices && Array.isArray(parsed.invoices)) setInvoices(parsed.invoices);
        if (parsed.technicians && Array.isArray(parsed.technicians)) setTechnicians(parsed.technicians);
        alert("Aspect CRM data restored successfully from backup!");
      } catch (err) {
        alert("Failed to parse backup file. Please ensure it is a valid JSON file.");
      }
    };
    reader.readAsText(file);
  };

  // Stats for badge counters
  const todayIso = new Date().toISOString().split("T")[0];
  const overdueRecallsCount = jobs.filter(
    j => !j.doNotContact && j.subscriptionFrequency !== "one_off" && j.nextDueDate && j.nextDueDate < todayIso
  ).length;

  const activeJobsCount = jobs.filter(j => {
    const stage = stages.find(s => s.id === j.stageId);
    return stage && !stage.name.toLowerCase().includes("completed") && !stage.name.toLowerCase().includes("invoiced");
  }).length;

  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold text-slate-300">Loading Aspect CRM Offline Storage...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* 1. Header (Sticky Top Bar) */}
      <CrmHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onNewJobClick={handleOpenNewJob}
        onManageStagesClick={() => setIsManageStagesOpen(true)}
        onExportBackup={handleExportBackup}
        onImportBackup={handleImportBackup}
      />

      {/* 2. Main Tab View Router */}
      <main className="flex-1 flex flex-col">
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
            onNewJobInStage={handleNewJobInStage}
            onManageStagesClick={() => setIsManageStagesOpen(true)}
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
        onGenerateInvoice={handleGenerateInvoiceFromJob}
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

      {/* 6. Native Mobile Bottom Navigation Bar */}
      <CrmNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        overdueRecallsCount={overdueRecallsCount}
        activeJobsCount={activeJobsCount}
      />
    </div>
  );
}
