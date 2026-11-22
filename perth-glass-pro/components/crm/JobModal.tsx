"use client";

import React, { useState, useEffect } from "react";
import {
  CrmJob,
  CrmStage,
  Technician,
  PropertyType,
  StoreysType,
  SubscriptionFrequency,
  JobPhoto,
  JobNote,
  ConversationMessage
} from "@/lib/crm/types";
import { calculateNextDueDate } from "@/lib/crm/store";
import {
  X,
  Phone,
  MessageSquare,
  MapPin,
  Calendar,
  Clock,
  User,
  ShieldAlert,
  Camera,
  Trash2,
  Receipt,
  Check,
  Plus,
  ExternalLink,
  DollarSign,
  Bot,
  Send,
  Play,
  Square,
  CheckCircle,
  FileCheck,
  AlertTriangle,
  Sparkles
} from "lucide-react";

interface JobModalProps {
  job: CrmJob | null;
  isOpen: boolean;
  stages: CrmStage[];
  technicians: Technician[];
  onClose: () => void;
  onSave: (job: CrmJob) => void;
  onDelete?: (jobId: string) => void;
  onGenerateInvoice?: (job: CrmJob) => void;
  onAdvanceStage?: (job: CrmJob) => void;
}

const AVAILABLE_SERVICES = [
  "Window Cleaning",
  "Solar Panels",
  "Gutters & Eaves",
  "Pressure Washing",
  "Flyscreens Repair",
  "Pool Glass Detailing"
];

export default function JobModal({
  job,
  isOpen,
  stages,
  technicians,
  onClose,
  onSave,
  onDelete,
  onGenerateInvoice,
  onAdvanceStage
}: JobModalProps) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "conversation" | "tech_sheet" | "subscription" | "photos" | "notes" | "schedule"
  >("overview");

  // Form State
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [suburb, setSuburb] = useState("");
  const [stageId, setStageId] = useState(stages[0]?.id || "stage_new");
  const [propertyType, setPropertyType] = useState<PropertyType>("Residential");
  const [storeys, setStoreys] = useState<StoreysType>("Single Storey");
  const [windowCount, setWindowCount] = useState("");
  const [hasScreens, setHasScreens] = useState(true);
  const [packageType, setPackageType] = useState<"Detailed Clean" | "Basic Wash" | "Custom">("Detailed Clean");
  const [priceQuoted, setPriceQuoted] = useState<string>("");

  // Communication & Work Scope
  const [contactMethod, setContactMethod] = useState<"ai_sms" | "ai_livechat" | "manual_phone" | "manual_sms" | "email">("ai_sms");
  const [contactedBy, setContactedBy] = useState("");
  const [conversationTrail, setConversationTrail] = useState<ConversationMessage[]>([]);
  const [newReplyText, setNewReplyText] = useState("");

  // Scope & Field Timing
  const [estimatedHours, setEstimatedHours] = useState<number>(2.0);
  const [clockInTime, setClockInTime] = useState<string>("");
  const [clockOutTime, setClockOutTime] = useState<string>("");
  const [actualDurationMinutes, setActualDurationMinutes] = useState<number | undefined>(undefined);
  const [workItems, setWorkItems] = useState<Array<{ heading?: string; description: string; qty?: number }>>([]);

  // Recurring & DNC
  const [lastCleanedDate, setLastCleanedDate] = useState("");
  const [subscriptionFrequency, setSubscriptionFrequency] = useState<SubscriptionFrequency>("one_off");
  const [nextDueDate, setNextDueDate] = useState("");
  const [interestedServices, setInterestedServices] = useState<string[]>(["Window Cleaning"]);
  const [doNotContact, setDoNotContact] = useState(false);

  // Dispatch
  const [assignedTechnicianId, setAssignedTechnicianId] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTimeSlot, setScheduledTimeSlot] = useState("08:30 - 11:30 AM");

  // Notes & Photos
  const [notes, setNotes] = useState<JobNote[]>([]);
  const [newNoteText, setNewNoteText] = useState("");
  const [photos, setPhotos] = useState<JobPhoto[]>([]);
  const [photoTag, setPhotoTag] = useState<"before" | "after" | "hazard" | "property">("property");
  const [photoCaption, setPhotoCaption] = useState("");

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Live Timer
  const [elapsedSec, setElapsedSec] = useState<number>(0);
  useEffect(() => {
    if (!clockInTime || clockOutTime) {
      setElapsedSec(0);
      return;
    }
    const start = new Date(clockInTime).getTime();
    const update = () => {
      setElapsedSec(Math.max(0, Math.floor((Date.now() - start) / 1000)));
    };
    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, [clockInTime, clockOutTime]);

  useEffect(() => {
    if (job) {
      setCustomerName(job.customerName || "");
      setPhone(job.phone || "");
      setEmail(job.email || "");
      setAddress(job.address || "");
      setSuburb(job.suburb || "");
      setStageId(job.stageId || stages[0]?.id || "stage_new");
      setPropertyType(job.propertyType || "Residential");
      setStoreys(job.storeys || "Single Storey");
      setWindowCount(job.windowCount ? String(job.windowCount) : "");
      setHasScreens(job.hasScreens ?? true);
      setPackageType(job.packageType || "Detailed Clean");
      setPriceQuoted(job.priceQuoted ? String(job.priceQuoted) : "");

      setContactMethod(job.contactMethod || "ai_sms");
      setContactedBy(job.contactedBy || "");
      setConversationTrail(job.conversationTrail || []);

      setEstimatedHours(job.estimatedHours || (job.storeys === "Double Storey" ? 3.0 : 2.0));
      setClockInTime(job.clockInTime || "");
      setClockOutTime(job.clockOutTime || "");
      setActualDurationMinutes(job.actualDurationMinutes);
      setWorkItems(job.workItems || []);

      setLastCleanedDate(job.lastCleanedDate || "");
      setSubscriptionFrequency(job.subscriptionFrequency || "one_off");
      setNextDueDate(job.nextDueDate || "");
      setInterestedServices(job.interestedServices || ["Window Cleaning"]);
      setDoNotContact(job.doNotContact || false);

      setAssignedTechnicianId(job.assignedTechnicianId || "");
      setScheduledDate(job.scheduledDate || "");
      setScheduledTimeSlot(job.scheduledTimeSlot || "08:30 - 11:30 AM");

      setNotes(job.notes || []);
      setPhotos(job.photos || []);
    } else {
      setCustomerName("");
      setPhone("");
      setEmail("");
      setAddress("");
      setSuburb("");
      setStageId(stages[0]?.id || "stage_new");
      setPropertyType("Residential");
      setStoreys("Single Storey");
      setWindowCount("");
      setHasScreens(true);
      setPackageType("Detailed Clean");
      setPriceQuoted("");

      setContactMethod("ai_sms");
      setContactedBy("");
      setConversationTrail([]);

      setEstimatedHours(2.0);
      setClockInTime("");
      setClockOutTime("");
      setActualDurationMinutes(undefined);
      setWorkItems([]);

      setLastCleanedDate("");
      setSubscriptionFrequency("one_off");
      setNextDueDate("");
      setInterestedServices(["Window Cleaning"]);
      setDoNotContact(false);

      setAssignedTechnicianId(technicians[0]?.id || "");
      setScheduledDate("");
      setScheduledTimeSlot("08:30 - 11:30 AM");

      setNotes([]);
      setPhotos([]);
    }
    setActiveTab("overview");
  }, [job, stages, technicians, isOpen]);

  if (!isOpen) return null;

  const handleLastCleanChange = (val: string) => {
    setLastCleanedDate(val);
    if (val && subscriptionFrequency !== "one_off") {
      setNextDueDate(calculateNextDueDate(val, subscriptionFrequency));
    }
  };

  const handleFrequencyChange = (freq: SubscriptionFrequency) => {
    setSubscriptionFrequency(freq);
    if (lastCleanedDate && freq !== "one_off") {
      setNextDueDate(calculateNextDueDate(lastCleanedDate, freq));
    } else if (freq === "one_off") {
      setNextDueDate("");
    }
  };

  const handleToggleService = (service: string) => {
    setInterestedServices(prev =>
      prev.includes(service) ? prev.filter(s => s !== service) : [...prev, service]
    );
  };

  const handleAddNote = () => {
    if (!newNoteText.trim()) return;
    const newNote: JobNote = {
      id: `note_${Date.now()}`,
      text: newNoteText.trim(),
      createdAt: new Date().toISOString()
    };
    setNotes([newNote, ...notes]);
    setNewNoteText("");
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(n => n.id !== id));
  };

  const handleAddPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const newPhoto: JobPhoto = {
        id: `photo_${Date.now()}`,
        dataUrl: reader.result as string,
        caption: photoCaption.trim() || `${photoTag.toUpperCase()} photo`,
        tag: photoTag,
        createdAt: new Date().toISOString()
      };
      setPhotos([newPhoto, ...photos]);
      setPhotoCaption("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.readAsDataURL(file);
  };

  const handleDeletePhoto = (id: string) => {
    setPhotos(photos.filter(p => p.id !== id));
  };

  // Reply Composer Handler
  const handleSendReply = () => {
    if (!newReplyText.trim()) return;
    const newMsg: ConversationMessage = {
      id: `msg_${Date.now()}`,
      sender: "human",
      senderName: "Ahmed (Owner)",
      text: newReplyText.trim(),
      timestamp: new Date().toISOString(),
      channel: "sms"
    };
    setConversationTrail([...conversationTrail, newMsg]);
    setNewReplyText("");
  };

  // Clock In / Clock Out Handlers
  const handleClockInAction = () => {
    const nowIso = new Date().toISOString();
    setClockInTime(nowIso);
    setClockOutTime("");
    setStageId("stage_in_progress");
  };

  const handleClockOutAction = () => {
    const nowIso = new Date().toISOString();
    setClockOutTime(nowIso);
    if (clockInTime) {
      const diffMin = Math.max(1, Math.round((new Date(nowIso).getTime() - new Date(clockInTime).getTime()) / 60000));
      setActualDurationMinutes(diffMin);
    }
    const today = nowIso.split("T")[0];
    setLastCleanedDate(today);
    if (subscriptionFrequency !== "one_off") {
      setNextDueDate(calculateNextDueDate(today, subscriptionFrequency));
    }
    setStageId("stage_completed");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
      alert("Please enter customer name.");
      return;
    }

    const updatedJob: CrmJob = {
      id: job?.id || `job_${Date.now()}`,
      customerName: customerName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      address: address.trim(),
      suburb: suburb.trim(),
      stageId,
      propertyType,
      storeys,
      windowCount: windowCount || undefined,
      hasScreens,
      packageType,
      priceQuoted: priceQuoted ? parseFloat(priceQuoted) : undefined,
      
      contactMethod,
      contactedBy: contactedBy || undefined,
      contactTimestamp: job?.contactTimestamp || (conversationTrail.length > 0 ? conversationTrail[0].timestamp : undefined),
      conversationTrail,

      quoteId: job?.quoteId,
      quoteSentDate: job?.quoteSentDate,
      autoFollowUpEnabled: job?.autoFollowUpEnabled,
      followUpSent: job?.followUpSent,
      followUpDueDate: job?.followUpDueDate,
      subscriptionYearlyPlan: job?.subscriptionYearlyPlan,
      advanceNoticeSent: job?.advanceNoticeSent,
      leadSource: job?.leadSource,
      workItems: workItems.length > 0 ? workItems : job?.workItems,
      estimatedHours,

      clockInTime: clockInTime || undefined,
      clockOutTime: clockOutTime || undefined,
      actualDurationMinutes,

      lastCleanedDate: lastCleanedDate || undefined,
      subscriptionFrequency,
      nextDueDate: nextDueDate || undefined,
      interestedServices,
      doNotContact,
      assignedTechnicianId: assignedTechnicianId || undefined,
      scheduledDate: scheduledDate || undefined,
      scheduledTimeSlot: scheduledTimeSlot || undefined,
      reviewRequested: job?.reviewRequested,
      reviewSentAt: job?.reviewSentAt,
      notes,
      photos,
      createdAt: job?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSave(updatedJob);
    onClose();
  };

  const isClockedIn = Boolean(clockInTime && !clockOutTime);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[94vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-brand-navy text-white px-5 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-base text-white">
              {job ? "Edit Job & Property Profile" : "New Aspect Job Lead"}
            </h3>
            {doNotContact && (
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-500 text-white flex items-center gap-1">
                <ShieldAlert className="w-3 h-3" /> DNC
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Customer Action Strip */}
        {job && (
          <div className="bg-slate-50 px-4 sm:px-5 py-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              {phone && (
                <>
                  <a
                    href={`tel:${phone}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-600" /> Call
                  </a>
                  <a
                    href={`sms:${phone}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-sky-600" /> SMS
                  </a>
                </>
              )}
              {address && (
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`${address}, ${suburb} WA`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-bold transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-rose-500" /> Maps
                </a>
              )}
            </div>

            {onGenerateInvoice && (
              <button
                type="button"
                onClick={() => onGenerateInvoice(job)}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-action-gold hover:bg-amber-400 text-brand-navy font-bold shadow-xs transition-colors"
              >
                <Receipt className="w-3.5 h-3.5" /> Generate Invoice / Quote
              </button>
            )}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-slate-200 bg-white px-3 overflow-x-auto no-scrollbar text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-2.5 font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "overview" ? "border-brand-navy text-brand-navy" : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Scope & Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("conversation")}
            className={`px-3 py-2.5 font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1 ${
              activeTab === "conversation" ? "border-brand-navy text-brand-navy" : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <span>💬 SMS & Chat Trail</span>
            {conversationTrail.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-purple-100 text-purple-900 font-extrabold">
                {conversationTrail.length}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("tech_sheet")}
            className={`px-3 py-2.5 font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1 ${
              activeTab === "tech_sheet" ? "border-brand-navy text-brand-navy" : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <span>🔧 Field Tech Sheet</span>
            {isClockedIn && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("schedule")}
            className={`px-3 py-2.5 font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "schedule" ? "border-brand-navy text-brand-navy" : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Schedule
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("photos")}
            className={`px-3 py-2.5 font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1 ${
              activeTab === "photos" ? "border-brand-navy text-brand-navy" : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <span>Photos</span>
            {photos.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 font-bold">
                {photos.length}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("notes")}
            className={`px-3 py-2.5 font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1 ${
              activeTab === "notes" ? "border-brand-navy text-brand-navy" : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            <span>Notes</span>
            {notes.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-100 text-amber-900 font-bold">
                {notes.length}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("subscription")}
            className={`px-3 py-2.5 font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "subscription" ? "border-brand-navy text-brand-navy" : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Recalls
          </button>
        </div>

        {/* Modal Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-4">
              {/* Customer Contact */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Customer Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="e.g. Caroline Miller"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-navy font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number *</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="e.g. 0412 889 901"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-navy font-semibold"
                  />
                </div>
              </div>

              {/* Address & Suburb */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="e.g. 17 Brown Crescent"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Suburb</label>
                  <input
                    type="text"
                    value={suburb}
                    onChange={e => setSuburb(e.target.value)}
                    placeholder="e.g. Sorrento"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-navy"
                  />
                </div>
              </div>

              {/* Pipeline Stage & Price Quoted */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Current Pipeline Stage</label>
                  <select
                    value={stageId}
                    onChange={e => setStageId(e.target.value)}
                    className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    {stages.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Quoted Price ($ AUD)</label>
                  <div className="relative">
                    <DollarSign className="w-4 h-4 text-emerald-600 absolute left-3 top-2.5" />
                    <input
                      type="number"
                      step="any"
                      value={priceQuoted}
                      onChange={e => setPriceQuoted(e.target.value)}
                      placeholder="e.g. 360"
                      className="w-full pl-9 pr-3 py-2 text-xs font-black text-emerald-800 rounded-xl border border-slate-200 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Property Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Storeys</label>
                  <select
                    value={storeys}
                    onChange={e => setStoreys(e.target.value as StoreysType)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="Single Storey">Single Storey</option>
                    <option value="Double Storey">Double Storey</option>
                    <option value="Multi Storey">Multi Storey</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Package Type</label>
                  <select
                    value={packageType}
                    onChange={e => setPackageType(e.target.value as any)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium"
                  >
                    <option value="Detailed Clean">Detailed Clean</option>
                    <option value="Basic Wash">Basic Wash</option>
                    <option value="Custom">Custom Scope</option>
                  </select>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Window Count</label>
                  <input
                    type="text"
                    value={windowCount}
                    onChange={e => setWindowCount(e.target.value)}
                    placeholder="e.g. 45 windows"
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              {/* Quick Field Photos (Before & After) */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-sky-600" />
                    <span className="text-xs font-bold text-slate-800">Job Photos ({photos.length})</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab("photos")}
                    className="text-[11px] font-bold text-brand-navy hover:underline"
                  >
                    View All Photos →
                  </button>
                </div>

                {/* Quick Camera Capture Row */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200">
                    {(["before", "after", "hazard"] as const).map(tag => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => setPhotoTag(tag)}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition-all ${
                          photoTag === tag
                            ? tag === "before"
                              ? "bg-amber-400 text-slate-900"
                              : tag === "after"
                              ? "bg-emerald-500 text-white"
                              : "bg-rose-500 text-white"
                            : "text-slate-500 hover:bg-slate-100"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    value={photoCaption}
                    onChange={e => setPhotoCaption(e.target.value)}
                    placeholder="Caption (e.g. Scratched panel / After clean)..."
                    className="flex-1 min-w-[140px] text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-xs"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Upload Photo</span>
                  </button>
                </div>

                {/* Quick Thumbnails */}
                {photos.length > 0 && (
                  <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
                    {photos.slice(0, 6).map(p => (
                      <div key={p.id} className="relative w-16 h-12 rounded-lg overflow-hidden border border-slate-200 shrink-0">
                        <img src={p.dataUrl} alt={p.caption} className="w-full h-full object-cover" />
                        <span className={`absolute bottom-0 inset-x-0 text-[8px] font-black uppercase text-center text-white py-0.2 ${
                          p.tag === "before" ? "bg-amber-600" : p.tag === "after" ? "bg-emerald-600" : "bg-rose-600"
                        }`}>
                          {p.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* DNC Safety Switch */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-800 block">Do Not Contact (DNC)</span>
                  <span className="text-[11px] text-slate-500">Excludes customer from recurring recalls & SMS outreach</span>
                </div>
                <input
                  type="checkbox"
                  checked={doNotContact}
                  onChange={e => setDoNotContact(e.target.checked)}
                  className="w-5 h-5 text-rose-600 rounded border-slate-300"
                />
              </div>
            </div>
          )}

          {/* TAB 2: CONVERSATION TRAIL & SMS COMPOSER */}
          {activeTab === "conversation" && (
            <div className="space-y-4">
              <div className="bg-purple-50/70 p-3 rounded-xl border border-purple-200 text-xs text-purple-950 flex items-center justify-between">
                <div>
                  <span className="font-bold block">Customer Communication History:</span>
                  <span>Contacted via: <strong>{contactedBy || "Not logged yet"}</strong></span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const cleanPhone = phone.replace(/\s+/g, "");
                    window.open(`sms:${cleanPhone}`, "_self");
                  }}
                  className="px-2.5 py-1 rounded-lg bg-white border border-purple-300 text-purple-900 font-bold text-[11px] flex items-center gap-1 shadow-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-purple-700" />
                  <span>Open SMS App</span>
                </button>
              </div>

              {/* Conversation Feed */}
              <div className="space-y-2 max-h-[380px] overflow-y-auto p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                {conversationTrail.length === 0 ? (
                  <div className="text-center py-10 text-slate-400">
                    No communication messages recorded yet. Send a message below to start the trail.
                  </div>
                ) : (
                  conversationTrail.map((msg, idx) => (
                    <div
                      key={msg.id || idx}
                      className={`flex flex-col max-w-[85%] rounded-2xl p-3 shadow-xs ${
                        msg.sender === "customer"
                          ? "bg-white border border-slate-200 text-slate-800 self-start"
                          : msg.sender === "ai"
                          ? "bg-purple-100/90 border border-purple-200 text-purple-950 self-end"
                          : "bg-brand-navy text-white self-end"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3 text-[10px] opacity-75 mb-1">
                        <span className="font-bold flex items-center gap-1">
                          {msg.sender === "ai" ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
                          {msg.senderName || (msg.sender === "customer" ? customerName : "Ahmed")}
                        </span>
                        <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                      </div>
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Reply Composer */}
              <div className="flex gap-2 items-end">
                <textarea
                  rows={2}
                  value={newReplyText}
                  onChange={e => setNewReplyText(e.target.value)}
                  placeholder="Type an SMS response to customer..."
                  className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-brand-navy"
                />
                <button
                  type="button"
                  onClick={handleSendReply}
                  disabled={!newReplyText.trim()}
                  className="px-4 py-2.5 bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs rounded-xl disabled:opacity-40 flex items-center gap-1.5 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Log / Send</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: FIELD TECH SHEET & CLOCK-IN */}
          {activeTab === "tech_sheet" && (
            <div className="space-y-4">
              {/* Arrival & Timer Hero */}
              <div className="bg-gradient-to-br from-slate-900 to-brand-navy text-white p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase font-extrabold text-amber-400 block">On-Site Execution</span>
                    <h4 className="text-base font-bold">
                      {isClockedIn ? "Job In Progress" : clockOutTime ? "Job Completed" : "Ready for Arrival"}
                    </h4>
                  </div>
                  {isClockedIn && (
                    <span className="text-xl font-mono font-black text-emerald-400 animate-pulse">
                      ⏱️ {Math.floor(elapsedSec / 60)}m {elapsedSec % 60}s
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-300">
                  <span>Est. Time: <strong>{estimatedHours} hrs</strong></span>
                  {actualDurationMinutes && (
                    <span className="text-emerald-300 font-bold">Actual: {Math.floor(actualDurationMinutes / 60)}h {actualDurationMinutes % 60}m</span>
                  )}
                </div>

                {/* Clock Actions */}
                {!isClockedIn && !clockOutTime && (
                  <button
                    type="button"
                    onClick={handleClockInAction}
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-brand-navy font-black text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span>🚗 We Have Arrived / Clock In</span>
                  </button>
                )}

                {isClockedIn && (
                  <button
                    type="button"
                    onClick={handleClockOutAction}
                    className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-brand-navy font-black text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                  >
                    <Square className="w-4 h-4 fill-current" />
                    <span>✅ Job Completed / Clock Out</span>
                  </button>
                )}
              </div>

              {/* Work Scope Checklist (NO PRICES) */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1">
                  <FileCheck className="w-4 h-4 text-emerald-600" />
                  <span>Work Items to Perform (Prices Hidden for Techs)</span>
                </h4>
                {workItems && workItems.length > 0 ? (
                  <div className="space-y-2">
                    {workItems.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                        <span className="font-bold text-slate-900 block">{item.heading || "Window Cleaning"}</span>
                        <p className="text-slate-600 whitespace-pre-wrap">{item.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                    <p className="font-bold text-slate-900">{storeys} Glazing Detailing ({packageType})</p>
                    <p>Wipe frames, detail sills, wash accessible glazing streak-free.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: SCHEDULE */}
          {activeTab === "schedule" && (
            <div className="space-y-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Technician & Appointment Slot</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Assigned Guy / Technician</label>
                    <select
                      value={assignedTechnicianId}
                      onChange={e => setAssignedTechnicianId(e.target.value)}
                      className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white"
                    >
                      <option value="">-- Unassigned --</option>
                      {technicians.map(t => (
                        <option key={t.id} value={t.id}>
                          {t.name} ({t.phone})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Scheduled Date</label>
                      <input
                        type="date"
                        value={scheduledDate}
                        onChange={e => setScheduledDate(e.target.value)}
                        className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Scheduled Time Window</label>
                      <input
                        type="text"
                        value={scheduledTimeSlot}
                        onChange={e => setScheduledTimeSlot(e.target.value)}
                        placeholder="e.g. 08:30 - 11:30 AM"
                        className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: PHOTOS */}
          {activeTab === "photos" && (
            <div className="space-y-4">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={photoTag}
                    onChange={e => setPhotoTag(e.target.value as any)}
                    className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-semibold"
                  >
                    <option value="property">Property</option>
                    <option value="before">Before Clean</option>
                    <option value="after">After Clean</option>
                    <option value="hazard">Hazard / Access</option>
                  </select>
                  <input
                    type="text"
                    value={photoCaption}
                    onChange={e => setPhotoCaption(e.target.value)}
                    placeholder="Caption (e.g. Gate code lock, dirty tracks)..."
                    className="flex-1 text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 bg-brand-navy text-white text-xs font-bold rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1"
                  >
                    <Camera className="w-3.5 h-3.5" /> Upload Photo
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleAddPhoto}
                    className="hidden"
                  />
                </div>
              </div>

              {photos.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs">No photos stored for this property yet.</div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {photos.map(p => (
                    <div key={p.id} className="group relative rounded-xl overflow-hidden border border-slate-200 aspect-4/3">
                      <img src={p.dataUrl} alt={p.caption} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent flex flex-col justify-end p-2 text-white">
                        <span className="text-[9px] uppercase font-bold bg-white/20 px-1 py-0.5 rounded w-max mb-0.5">
                          {p.tag}
                        </span>
                        <p className="text-[11px] truncate">{p.caption}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeletePhoto(p.id)}
                        className="absolute top-1.5 right-1.5 p-1 rounded bg-black/60 text-white hover:bg-rose-600"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 6: NOTES */}
          {activeTab === "notes" && (
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNoteText}
                  onChange={e => setNewNoteText(e.target.value)}
                  placeholder="Add note (e.g. Gate code #1822, friendly Golden Retriever, tap behind shed)..."
                  className="flex-1 text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-navy"
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddNote();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddNote}
                  disabled={!newNoteText.trim()}
                  className="px-4 py-2 bg-brand-navy text-white text-xs font-bold rounded-xl hover:bg-slate-800 disabled:opacity-40 transition-colors flex items-center gap-1"
                >
                  <Plus className="w-4 h-4" /> Add Note
                </button>
              </div>

              {notes.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">No notes recorded yet. Add gate codes above.</div>
              ) : (
                <div className="space-y-2">
                  {notes.map(note => (
                    <div key={note.id} className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/80 flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs text-slate-800 font-medium whitespace-pre-wrap">{note.text}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          {new Date(note.createdAt).toLocaleString("en-AU", { dateStyle: "short", timeStyle: "short" })}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteNote(note.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 7: SUBSCRIPTION & RECALLS */}
          {activeTab === "subscription" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Last Cleaned Date</label>
                  <input
                    type="date"
                    value={lastCleanedDate}
                    onChange={e => handleLastCleanChange(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Subscription Frequency</label>
                  <select
                    value={subscriptionFrequency}
                    onChange={e => handleFrequencyChange(e.target.value as SubscriptionFrequency)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium"
                  >
                    <option value="one_off">One-Off Wash</option>
                    <option value="monthly">Every 4 Weeks (Monthly)</option>
                    <option value="bi_monthly">Every 8 Weeks (Bi-Monthly)</option>
                    <option value="quarterly">Every 12 Weeks (Quarterly)</option>
                    <option value="half_yearly">Every 6 Months (Biannual)</option>
                    <option value="annual">Every 12 Months (Annual)</option>
                  </select>
                </div>
              </div>

              {subscriptionFrequency !== "one_off" && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Calculated Next Due Date</label>
                  <input
                    type="date"
                    value={nextDueDate}
                    onChange={e => setNextDueDate(e.target.value)}
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-emerald-50 text-emerald-950 font-bold"
                  />
                </div>
              )}
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            {job && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm("Delete this job?")) {
                    onDelete(job.id);
                    onClose();
                  }
                }}
                className="px-3 py-2 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete Job
              </button>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-action-gold hover:bg-amber-400 text-brand-navy shadow-sm transition-all"
              >
                Save Job Profile
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
