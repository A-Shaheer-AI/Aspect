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
  JobNote
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
  DollarSign
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
  onGenerateInvoice
}: JobModalProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "subscription" | "photos" | "notes" | "schedule">("overview");

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
      // Defaults for brand new job
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

  // Recalculate next due date when last clean or frequency changes
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

  const toggleService = (srv: string) => {
    setInterestedServices(prev =>
      prev.includes(srv) ? prev.filter(s => s !== srv) : [...prev, srv]
    );
  };

  const handleAddNote = () => {
    if (!newNoteText.trim()) return;
    const newNote: JobNote = {
      id: `note_${Date.now()}`,
      text: newNoteText.trim(),
      createdAt: new Date().toISOString()
    };
    setNotes(prev => [newNote, ...prev]);
    setNewNoteText("");
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const newPhoto: JobPhoto = {
        id: `photo_${Date.now()}`,
        dataUrl: result,
        caption: photoCaption.trim() || `${photoTag.toUpperCase()} photo`,
        tag: photoTag,
        createdAt: new Date().toISOString()
      };
      setPhotos(prev => [newPhoto, ...prev]);
      setPhotoCaption("");
    };
    reader.readAsDataURL(file);
  };

  const handleDeletePhoto = (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
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
      lastCleanedDate: lastCleanedDate || undefined,
      subscriptionFrequency,
      nextDueDate: nextDueDate || undefined,
      interestedServices,
      doNotContact,
      assignedTechnicianId: assignedTechnicianId || undefined,
      scheduledDate: scheduledDate || undefined,
      scheduledTimeSlot: scheduledTimeSlot || undefined,
      notes,
      photos,
      createdAt: job?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSave(updatedJob);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
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

        {/* Quick Customer Action Strip (Phone, SMS, Maps, Invoice) */}
        {job && (
          <div className="bg-slate-50 px-5 py-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              {phone && (
                <>
                  <a
                    href={`tel:${phone}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 font-semibold hover:bg-emerald-100 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5" /> Call
                  </a>
                  <a
                    href={`sms:${phone}`}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-sky-50 text-sky-700 border border-sky-200 font-semibold hover:bg-sky-100 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> SMS
                  </a>
                </>
              )}
              {address && (
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`${address}, ${suburb} WA`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold hover:bg-indigo-100 transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5" /> Maps
                </a>
              )}
            </div>

            {onGenerateInvoice && (
              <button
                type="button"
                onClick={() => onGenerateInvoice(job)}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-amber-500 hover:bg-amber-400 text-brand-navy font-bold shadow-xs transition-colors"
              >
                <Receipt className="w-3.5 h-3.5" /> Generate Invoice / Quote
              </button>
            )}
          </div>
        )}

        {/* Navigation Tabs */}
        <div className="flex items-center border-b border-slate-200 bg-white px-3 overflow-x-auto scrollbar-none text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-2.5 font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "overview"
                ? "border-brand-navy text-brand-navy"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Scope & Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("subscription")}
            className={`px-3 py-2.5 font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "subscription"
                ? "border-brand-navy text-brand-navy"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Subscription & Recalls
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("photos")}
            className={`px-3 py-2.5 font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1 ${
              activeTab === "photos"
                ? "border-brand-navy text-brand-navy"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Photos ({photos.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("notes")}
            className={`px-3 py-2.5 font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1 ${
              activeTab === "notes"
                ? "border-brand-navy text-brand-navy"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Notes ({notes.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("schedule")}
            className={`px-3 py-2.5 font-bold border-b-2 whitespace-nowrap transition-colors ${
              activeTab === "schedule"
                ? "border-brand-navy text-brand-navy"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Dispatch & Tech
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* TAB 1: OVERVIEW & SCOPE */}
          {activeTab === "overview" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Customer / Strata Name *</label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="e.g. Caroline Miller or ESM Strata"
                    className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pipeline Stage</label>
                  <select
                    value={stageId}
                    onChange={e => setStageId(e.target.value)}
                    className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-navy bg-white"
                  >
                    {stages.map(s => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="0412 889 901"
                    className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="client@example.com"
                    className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-navy"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Street Address</label>
                  <input
                    type="text"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    placeholder="17 Brown Crescent"
                    className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-navy"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Suburb</label>
                  <input
                    type="text"
                    value={suburb}
                    onChange={e => setSuburb(e.target.value)}
                    placeholder="Sorrento"
                    className="w-full text-xs font-medium px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-navy"
                  />
                </div>
              </div>

              {/* Property Specs */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Property Scope & Specifications</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Property Type</label>
                    <select
                      value={propertyType}
                      onChange={e => setPropertyType(e.target.value as PropertyType)}
                      className="w-full text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                    >
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Storeys</label>
                    <select
                      value={storeys}
                      onChange={e => setStoreys(e.target.value as StoreysType)}
                      className="w-full text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                    >
                      <option value="Single Storey">Single Storey</option>
                      <option value="Double Storey">Double Storey</option>
                      <option value="Multi Storey">Multi Storey</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Package Type</label>
                    <select
                      value={packageType}
                      onChange={e => setPackageType(e.target.value as any)}
                      className="w-full text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                    >
                      <option value="Detailed Clean">Detailed Clean</option>
                      <option value="Basic Wash">Basic Wash</option>
                      <option value="Custom">Custom / Strata</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Price Quoted ($)</label>
                    <input
                      type="number"
                      step="any"
                      value={priceQuoted}
                      onChange={e => setPriceQuoted(e.target.value)}
                      placeholder="e.g. 360"
                      className="w-full text-xs font-extrabold text-emerald-800 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Window / Panel Count</label>
                    <input
                      type="text"
                      value={windowCount}
                      onChange={e => setWindowCount(e.target.value)}
                      placeholder="e.g. 45 windows, 2 patio sliders"
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <div className="flex items-center gap-2 pt-5">
                    <input
                      type="checkbox"
                      id="hasScreens"
                      checked={hasScreens}
                      onChange={e => setHasScreens(e.target.checked)}
                      className="w-4 h-4 text-brand-navy rounded border-slate-300"
                    />
                    <label htmlFor="hasScreens" className="text-xs font-semibold text-slate-700 cursor-pointer">
                      Includes Flyscreens Clean
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SUBSCRIPTION, RECALLS & DNC */}
          {activeTab === "subscription" && (
            <div className="space-y-4">
              {/* Do Not Contact Toggle Box */}
              <div className={`p-4 rounded-xl border transition-colors ${
                doNotContact ? "bg-rose-50 border-rose-300" : "bg-slate-50 border-slate-200"
              }`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className={`w-5 h-5 ${doNotContact ? "text-rose-600" : "text-slate-400"}`} />
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">Do Not Contact (DNC) Registry</h4>
                      <p className="text-[11px] text-slate-500">
                        When enabled, this customer is strictly excluded from all recall SMS and follow-ups.
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={doNotContact}
                      onChange={e => setDoNotContact(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-600"></div>
                  </label>
                </div>
              </div>

              {/* Recurring Subscription Setting */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Subscription & Recall Schedule</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Last Cleaned Date</label>
                    <input
                      type="date"
                      value={lastCleanedDate}
                      onChange={e => handleLastCleanChange(e.target.value)}
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Subscription Frequency</label>
                    <select
                      value={subscriptionFrequency}
                      onChange={e => handleFrequencyChange(e.target.value as SubscriptionFrequency)}
                      className="w-full text-xs font-medium px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white"
                    >
                      <option value="one_off">One-Off (No Recall)</option>
                      <option value="monthly">Every Month (4 Weeks)</option>
                      <option value="bi_monthly">Every 2 Months (8 Weeks)</option>
                      <option value="quarterly">Quarterly (3 Months)</option>
                      <option value="half_yearly">Biannual (6 Months)</option>
                      <option value="annual">Annual (12 Months)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Calculated Next Due Date</label>
                    <input
                      type="date"
                      value={nextDueDate}
                      onChange={e => setNextDueDate(e.target.value)}
                      className="w-full text-xs font-bold text-amber-900 px-2.5 py-1.5 rounded-lg border border-amber-300 bg-amber-50"
                    />
                  </div>
                </div>
              </div>

              {/* Cross-Sell & Interested Services */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Interested / Cross-Sell Services</h4>
                <p className="text-[11px] text-slate-500">Select any ancillary services this property needs:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                  {AVAILABLE_SERVICES.map(srv => {
                    const isChecked = interestedServices.includes(srv);
                    return (
                      <button
                        type="button"
                        key={srv}
                        onClick={() => toggleService(srv)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold text-left border flex items-center justify-between transition-all ${
                          isChecked
                            ? "bg-amber-100 text-amber-900 border-amber-300"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <span>{srv}</span>
                        {isChecked && <Check className="w-3.5 h-3.5 text-amber-700" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: PHOTOS */}
          {activeTab === "photos" && (
            <div className="space-y-4">
              {/* Photo Upload Box */}
              <div className="bg-slate-50 p-4 rounded-xl border border-dashed border-slate-300 text-center space-y-3">
                <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
                  <span className="font-bold text-slate-700">Photo Category:</span>
                  {(["before", "after", "hazard", "property"] as const).map(tag => (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => setPhotoTag(tag)}
                      className={`px-2.5 py-1 rounded-lg font-bold capitalize transition-all ${
                        photoTag === tag
                          ? "bg-brand-navy text-white shadow-xs"
                          : "bg-white text-slate-600 border border-slate-200"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <div className="flex gap-2 max-w-md mx-auto">
                  <input
                    type="text"
                    value={photoCaption}
                    onChange={e => setPhotoCaption(e.target.value)}
                    placeholder="Caption (e.g. Master bedroom track, gate access...)"
                    className="flex-1 text-xs px-3 py-1.5 rounded-lg border border-slate-200 bg-white focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3.5 py-1.5 bg-brand-navy text-white text-xs font-bold rounded-lg hover:bg-slate-800 flex items-center gap-1.5 transition-colors"
                  >
                    <Camera className="w-4 h-4" /> Take / Upload Photo
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Photos Grid */}
              {photos.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No property photos uploaded yet. Tap above to snap before/after shots.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {photos.map(p => (
                    <div
                      key={p.id}
                      className="group relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-4/3"
                    >
                      <img
                        src={p.dataUrl}
                        alt={p.caption}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2 text-white">
                        <span className="text-[10px] uppercase font-extrabold tracking-wider bg-white/20 px-1.5 py-0.5 rounded backdrop-blur-xs w-max mb-1">
                          {p.tag}
                        </span>
                        <p className="text-xs font-medium truncate">{p.caption}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeletePhoto(p.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 text-white hover:bg-rose-600 transition-colors"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: NOTES & GATE CODES */}
          {activeTab === "notes" && (
            <div className="space-y-4">
              {/* Add Note Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNoteText}
                  onChange={e => setNewNoteText(e.target.value)}
                  placeholder="Add note (e.g. Gate code #1234, friendly dog, tap behind shed)..."
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

              {/* Notes List */}
              {notes.length === 0 ? (
                <div className="text-center py-8 text-slate-400 text-xs">
                  No notes recorded yet. Add gate access codes or hazards above.
                </div>
              ) : (
                <div className="space-y-2">
                  {notes.map(note => (
                    <div
                      key={note.id}
                      className="p-3 bg-amber-50/60 rounded-xl border border-amber-200/80 flex items-start justify-between gap-2"
                    >
                      <div>
                        <p className="text-xs text-slate-800 font-medium whitespace-pre-wrap">{note.text}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          {new Date(note.createdAt).toLocaleString("en-AU", {
                            dateStyle: "short",
                            timeStyle: "short"
                          })}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleDeleteNote(note.id)}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: DISPATCH & SCHEDULE */}
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

          {/* Form Actions Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            {job && onDelete ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm("Are you sure you want to delete this job?")) {
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
                className="px-5 py-2 rounded-xl text-xs font-bold bg-action-gold hover:bg-amber-400 text-brand-navy shadow-sm transition-all"
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
