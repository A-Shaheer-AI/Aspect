"use client";

import React, { useState, useEffect } from "react";
import {
  CrmJob,
  CrmInvoice,
  InvoiceItem,
  CustomDocumentSection,
  BusinessDetails
} from "@/lib/crm/types";
import {
  DEFAULT_BANKING_DETAILS,
  DEFAULT_BUSINESS_DETAILS,
  DEFAULT_TERMS_AND_CONDITIONS
} from "@/lib/crm/store";
import {
  X,
  Printer,
  DollarSign,
  FileText,
  CheckCircle,
  Plus,
  Trash2,
  Sparkles,
  Zap,
  Tag,
  MessageSquare,
  ScrollText,
  CreditCard,
  Building2,
  Layers,
  ChevronDown,
  ChevronUp,
  Clock,
  Send
} from "lucide-react";

interface QuotePromptModalProps {
  job: CrmJob | null;
  isOpen: boolean;
  existingInvoiceCount: number;
  onClose: () => void;
  onSaveManualPrice: (
    jobId: string,
    price: number,
    note?: string,
    autoFollowUp?: boolean,
    sendImmediateSms?: boolean
  ) => void;
  onSaveFormalQuote: (
    jobId: string,
    quote: CrmInvoice,
    triggerPrint: boolean,
    autoFollowUp?: boolean,
    sendImmediateSms?: boolean
  ) => void;
}

export default function QuotePromptModal({
  job,
  isOpen,
  existingInvoiceCount,
  onClose,
  onSaveManualPrice,
  onSaveFormalQuote
}: QuotePromptModalProps) {
  const [quoteMode, setQuoteMode] = useState<"manual" | "formal">("manual");
  const [autoFollowUp, setAutoFollowUp] = useState<boolean>(true);
  const [sendImmediateSms, setSendImmediateSms] = useState<boolean>(true);

  // Mode 1: Manual / On-Site Verbal Price State
  const [manualPrice, setManualPrice] = useState<string>("");
  const [manualNote, setManualNote] = useState<string>("Verbal quote given on site");

  // Mode 2: Formal Quotation State
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [includeGst, setIncludeGst] = useState<boolean>(true);
  const [subject, setSubject] = useState<string>("");

  // Modular Blocks & Extra Fields
  // 1. Discount
  const [hasDiscount, setHasDiscount] = useState<boolean>(false);
  const [discountType, setDiscountType] = useState<"fixed" | "percentage">("fixed");
  const [discountValue, setDiscountValue] = useState<string>("30");
  const [discountLabel, setDiscountLabel] = useState<string>("Neighborhood / Loyalty Discount");

  // 2. Customer Note
  const [hasCustomerNote, setHasCustomerNote] = useState<boolean>(true);
  const [customerNote, setCustomerNote] = useState<string>("");

  // 3. Terms & Conditions
  const [hasTerms, setHasTerms] = useState<boolean>(true);
  const [termsAndConditions, setTermsAndConditions] = useState<string>(DEFAULT_TERMS_AND_CONDITIONS);

  // 4. Payment Details
  const [showPaymentDetails, setShowPaymentDetails] = useState<boolean>(true);
  const [bankingDetails, setBankingDetails] = useState(DEFAULT_BANKING_DETAILS);

  // 5. Business Details
  const [businessDetails, setBusinessDetails] = useState<BusinessDetails>(DEFAULT_BUSINESS_DETAILS);
  const [showBusinessEditor, setShowBusinessEditor] = useState<boolean>(false);

  // 6. Custom Blocks Anywhere
  const [customSections, setCustomSections] = useState<CustomDocumentSection[]>([]);

  // Prepopulate best estimates when job changes
  useEffect(() => {
    if (!job) return;

    // 1. Calculate best estimate based on storeys, package & services
    let basePrice = 280;
    const isDouble = job.storeys === "Double Storey";
    const isMulti = job.storeys === "Multi Storey";
    const isDetailed = job.packageType !== "Basic Wash";

    if (isMulti) {
      basePrice = isDetailed ? 650 : 520;
    } else if (isDouble) {
      basePrice = isDetailed ? 380 : 300;
    } else {
      basePrice = isDetailed ? 220 : 180;
    }

    const estimatedInitial = job.priceQuoted ? String(job.priceQuoted) : String(basePrice);
    setManualPrice(estimatedInitial);

    // 2. Prepopulate formal line items with distinct Heading AND Description
    const generatedItems: InvoiceItem[] = [];
    const mainHeading = `${job.storeys} Window Cleaning (Inside & Out)`;
    const mainScope = `${job.packageType || "Detailed Clean"} package: complete streak-free glass detailing, external frame scrubbing, internal frame wipes, sills & sliding track wash.`;

    generatedItems.push({
      id: `item_${Date.now()}_0`,
      heading: mainHeading,
      description: mainScope,
      qty: 1,
      rate: parseFloat(estimatedInitial),
      amount: parseFloat(estimatedInitial)
    });

    if (job.hasScreens) {
      generatedItems.push({
        id: `item_${Date.now()}_1`,
        heading: "Flyscreens Detailing",
        description: "Removal, deep wash of mesh and dust extraction, wiped dry and reinstalled.",
        qty: 1,
        rate: 40,
        amount: 40
      });
    }

    if (job.interestedServices?.includes("Solar Panels")) {
      generatedItems.push({
        id: `item_${Date.now()}_2`,
        heading: "Solar Panel Array Wash",
        description: "0 PPM pure demineralised water wash to restore solar generation efficiency without abrasive chemicals.",
        qty: 1,
        rate: 80,
        amount: 80
      });
    }

    if (job.interestedServices?.includes("Gutters & Eaves")) {
      generatedItems.push({
        id: `item_${Date.now()}_3`,
        heading: "Gutter Clearance & Downpipe Flush",
        description: "Removal of all leaf debris, silt and blockages with downpipes water-tested for clear flow.",
        qty: 1,
        rate: 150,
        amount: 150
      });
    }

    if (job.interestedServices?.includes("Pressure Washing")) {
      generatedItems.push({
        id: `item_${Date.now()}_4`,
        heading: "High-Pressure Surface Detailing",
        description: "Commercial rotary surface cleaner wash on driveways, patios, and pool surrounds.",
        qty: 1,
        rate: 180,
        amount: 180
      });
    }

    setItems(generatedItems);
    setSubject(`Window Cleaning & Detailing Quotation for ${job.address || job.customerName}`);
    setCustomerNote(`Hi ${job.customerName.split(" ")[0]}, thank you for inviting Aspect Window Cleaning to quote your property. We would love the opportunity to provide a streak-free clean!`);
    setTermsAndConditions(DEFAULT_TERMS_AND_CONDITIONS);
    setBankingDetails(DEFAULT_BANKING_DETAILS);
    setBusinessDetails(DEFAULT_BUSINESS_DETAILS);
    setCustomSections([]);
    setHasDiscount(false);
    setIncludeGst(true);
    setQuoteMode("manual");
    setAutoFollowUp(job.autoFollowUpEnabled !== false);
    setSendImmediateSms(true);
  }, [job, isOpen]);

  if (!isOpen || !job) return null;

  // Totals & Discount Math
  const itemsSubtotal = items.reduce((acc, i) => acc + (i.amount || 0), 0);
  
  let calculatedDiscountAmount = 0;
  if (hasDiscount) {
    const val = parseFloat(discountValue) || 0;
    if (discountType === "percentage") {
      calculatedDiscountAmount = Math.round((itemsSubtotal * (val / 100)) * 100) / 100;
    } else {
      calculatedDiscountAmount = Math.min(itemsSubtotal, val);
    }
  }

  const discountedSubtotal = Math.max(0, itemsSubtotal - calculatedDiscountAmount);
  const subtotal = includeGst
    ? Math.round((discountedSubtotal / 1.1) * 100) / 100
    : discountedSubtotal;
  const gst = includeGst
    ? Math.round((discountedSubtotal - subtotal) * 100) / 100
    : 0;
  const total = discountedSubtotal;

  // Item handlers
  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: `item_${Date.now()}`,
      heading: "Additional Window Cleaning Service",
      description: "Custom glass detailing or secondary glazing treatment.",
      qty: 1,
      rate: 100,
      amount: 100
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const handleItemChange = (
    id: string,
    field: "heading" | "description" | "qty" | "rate",
    val: any
  ) => {
    setItems(prev =>
      prev.map(i => {
        if (i.id !== id) return i;
        const updated = { ...i, [field]: val };
        if (field === "qty" || field === "rate") {
          const qty = field === "qty" ? parseFloat(val) || 0 : i.qty;
          const rate = field === "rate" ? parseFloat(val) || 0 : i.rate;
          updated.amount = Math.round(qty * rate * 100) / 100;
        }
        return updated;
      })
    );
  };

  // Custom Section handlers
  const handleAddCustomSection = () => {
    const newSection: CustomDocumentSection = {
      id: `section_${Date.now()}`,
      title: "Special Property Access & Instructions",
      content: "Please ensure all windows are firmly shut. External water taps will be connected to pure water filtration equipment."
    };
    setCustomSections([...customSections, newSection]);
  };

  const handleRemoveCustomSection = (id: string) => {
    setCustomSections(customSections.filter(s => s.id !== id));
  };

  const handleCustomSectionChange = (id: string, field: "title" | "content", val: string) => {
    setCustomSections(prev =>
      prev.map(s => (s.id === id ? { ...s, [field]: val } : s))
    );
  };

  // Save Handlers
  const handleSaveManual = () => {
    const priceNum = parseFloat(manualPrice) || 0;
    if (priceNum <= 0) {
      alert("Please enter a valid quoted price.");
      return;
    }
    onSaveManualPrice(job.id, priceNum, manualNote.trim() || undefined, autoFollowUp, sendImmediateSms);
    onClose();
  };

  const handleSaveFormal = (triggerPrint: boolean) => {
    const now = new Date();
    const issueDate = now.toISOString().split("T")[0];
    const due = new Date(now);
    due.setDate(due.getDate() + 14);
    const dueDate = due.toISOString().split("T")[0];

    const quoteId = `QUO-${String(existingInvoiceCount + 1).padStart(6, "0")}`;

    const quote: CrmInvoice = {
      id: quoteId,
      type: "quote",
      jobId: job.id,
      clientName: job.customerName,
      clientAddress: `${job.address}, ${job.suburb} WA`,
      clientPhone: job.phone,
      clientEmail: job.email,
      subject,
      issueDate,
      dueDate,
      items,
      subtotal,
      discountType: hasDiscount ? discountType : undefined,
      discountValue: hasDiscount ? parseFloat(discountValue) || 0 : undefined,
      discountLabel: hasDiscount ? discountLabel : undefined,
      discountAmount: hasDiscount ? calculatedDiscountAmount : undefined,
      gst,
      total,
      includeGst,
      status: "sent",
      businessDetails,
      showPaymentDetails,
      paymentDetails: bankingDetails,
      customerNote: hasCustomerNote ? customerNote : undefined,
      termsAndConditions: hasTerms ? termsAndConditions : undefined,
      customSections: customSections.length > 0 ? customSections : undefined,
      notes: "Payment is strictly 14 days from quote acceptance. Direct EFT or PayID.",
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };

    onSaveFormalQuote(job.id, quote, triggerPrint, autoFollowUp, sendImmediateSms);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[94vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-brand-navy text-white px-5 py-4 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <h3 className="font-bold text-base text-white">Quotation Workflow</h3>
            </div>
            <p className="text-xs text-slate-300">
              Moving <strong>{job.customerName}</strong> ({job.address}) to Quote Sent stage
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Mode Selector Tabs */}
        <div className="bg-slate-100 p-2 grid grid-cols-2 gap-2 border-b border-slate-200 text-xs">
          <button
            type="button"
            onClick={() => setQuoteMode("manual")}
            className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              quoteMode === "manual"
                ? "bg-white text-brand-navy shadow-xs border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Zap className="w-4 h-4 text-amber-500" />
            <span>Quick On-Site / Verbal Price</span>
          </button>

          <button
            type="button"
            onClick={() => setQuoteMode("formal")}
            className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${
              quoteMode === "formal"
                ? "bg-white text-brand-navy shadow-xs border border-slate-200/80"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <FileText className="w-4 h-4 text-sky-500" />
            <span>Formal Quotation (PDF Builder)</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* OPTION 1: QUICK MANUAL / VERBAL PRICE */}
          {quoteMode === "manual" && (
            <div className="space-y-4">
              <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-3.5 text-xs text-amber-900 leading-relaxed">
                <span className="font-bold block mb-0.5">Quick On-Site Quote:</span>
                If you gave a quick price on-site or over phone chat, enter the amount below. The price will be saved and the job moved to <strong>Quote Sent</strong>.
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Quoted Price ($ AUD) *
                </label>
                <div className="relative">
                  <DollarSign className="w-5 h-5 text-emerald-600 absolute left-3 top-3" />
                  <input
                    type="number"
                    step="any"
                    required
                    value={manualPrice}
                    onChange={e => setManualPrice(e.target.value)}
                    placeholder="e.g. 340"
                    className="w-full pl-10 pr-4 py-2.5 text-lg font-black text-emerald-800 rounded-xl border border-slate-200 focus:outline-none focus:border-brand-navy bg-white"
                  />
                </div>
              </div>

              {/* Quick Preset Chips */}
              <div>
                <span className="text-[11px] font-semibold text-slate-500 block mb-1.5">Quick Price Presets:</span>
                <div className="flex flex-wrap gap-2">
                  {[180, 220, 280, 340, 380, 420, 550].map(val => (
                    <button
                      type="button"
                      key={val}
                      onClick={() => setManualPrice(String(val))}
                      className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-extrabold text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-colors"
                    >
                      ${val}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Quote Note / Context (Optional)
                </label>
                <input
                  type="text"
                  value={manualNote}
                  onChange={e => setManualNote(e.target.value)}
                  placeholder="e.g. Quoted $340 verbal on site for double storey inside/out"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none bg-white"
                />
              </div>

              {/* Property Specs Review */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1 text-slate-600">
                <p><strong>Property:</strong> {job.storeys} ({job.propertyType})</p>
                <p><strong>Package:</strong> {job.packageType || "Detailed Clean"}</p>
                <p><strong>Address:</strong> {job.address}, {job.suburb}</p>
              </div>
            </div>
          )}

          {/* OPTION 2: FORMAL MODULAR QUOTATION BUILDER */}
          {quoteMode === "formal" && (
            <div className="space-y-5">
              {/* Top Controls: Subject & GST Toggle */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs">
                <div className="flex-1 min-w-[240px]">
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Quotation Title / Subject</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white font-medium"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white text-slate-800 text-xs font-bold cursor-pointer border border-slate-200 shadow-xs hover:bg-slate-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={includeGst}
                      onChange={e => setIncludeGst(e.target.checked)}
                      className="w-4 h-4 text-brand-navy rounded border-slate-300"
                    />
                    <span>10% GST Included</span>
                  </label>
                </div>
              </div>

              {/* Section 1: Itemized Lines with HEADING and DESCRIPTION */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                      <span>Line Items</span>
                      <span className="text-[10px] text-slate-500 font-normal">
                        (Each item has a bold heading and detailed scope description)
                      </span>
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="px-3 py-1 text-xs font-bold text-brand-navy bg-amber-50 hover:bg-amber-100 border border-amber-300/80 rounded-lg flex items-center gap-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Service Line
                  </button>
                </div>

                {/* Items List */}
                <div className="space-y-2.5">
                  {items.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-3 bg-slate-50/80 rounded-xl border border-slate-200 space-y-2 hover:border-slate-300 transition-colors"
                    >
                      <div className="flex items-start gap-2">
                        <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-[10px] font-bold mt-1 shrink-0">
                          {idx + 1}
                        </span>

                        <div className="flex-1 space-y-1.5">
                          {/* Item Heading */}
                          <input
                            type="text"
                            value={item.heading || ""}
                            onChange={e => handleItemChange(item.id, "heading", e.target.value)}
                            placeholder="Item Heading (e.g. Double Storey Inside & Out Wash)..."
                            className="w-full text-xs font-black px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-brand-navy"
                          />

                          {/* Item Detailed Description */}
                          <textarea
                            rows={2}
                            value={item.description}
                            onChange={e => handleItemChange(item.id, "description", e.target.value)}
                            placeholder="Detailed description / scope of work..."
                            className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:border-brand-navy"
                          />
                        </div>

                        {/* Rate / Price & Delete */}
                        <div className="flex flex-col items-end gap-1.5 shrink-0">
                          <div className="flex items-center gap-1">
                            <span className="text-xs text-slate-400 font-bold">$</span>
                            <input
                              type="number"
                              step="any"
                              value={item.rate}
                              onChange={e => handleItemChange(item.id, "rate", e.target.value)}
                              placeholder="Rate"
                              className="w-20 text-xs font-black text-right px-2 py-1.5 rounded-lg border border-slate-200 bg-white"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-slate-400 hover:text-rose-600 p-1 rounded"
                            title="Remove line item"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: Modular Sections Strip (Customer Note, Discount, Terms, Payment, Custom Blocks) */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-amber-500" />
                  <span>Modular Quotation Sections</span>
                </h4>
                <p className="text-[11px] text-slate-500">
                  Easily toggle or add anything anywhere in this quotation:
                </p>

                {/* Quick Add Buttons */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setHasDiscount(!hasDiscount)}
                    className={`px-3 py-1.5 rounded-xl font-bold border flex items-center gap-1.5 transition-colors ${
                      hasDiscount
                        ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{hasDiscount ? "Discount Active" : "+ Add Discount"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHasCustomerNote(!hasCustomerNote)}
                    className={`px-3 py-1.5 rounded-xl font-bold border flex items-center gap-1.5 transition-colors ${
                      hasCustomerNote
                        ? "bg-sky-100 text-sky-900 border-sky-300"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-sky-600" />
                    <span>{hasCustomerNote ? "Customer Note Active" : "+ Add Customer Note"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHasTerms(!hasTerms)}
                    className={`px-3 py-1.5 rounded-xl font-bold border flex items-center gap-1.5 transition-colors ${
                      hasTerms
                        ? "bg-purple-100 text-purple-900 border-purple-300"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <ScrollText className="w-3.5 h-3.5 text-purple-600" />
                    <span>{hasTerms ? "Terms & Conditions Active" : "+ Add Terms & Conditions"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowPaymentDetails(!showPaymentDetails)}
                    className={`px-3 py-1.5 rounded-xl font-bold border flex items-center gap-1.5 transition-colors ${
                      showPaymentDetails
                        ? "bg-amber-100 text-amber-900 border-amber-300"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5 text-amber-600" />
                    <span>{showPaymentDetails ? "Payment Details Active" : "+ Add Payment Details"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowBusinessEditor(!showBusinessEditor)}
                    className="px-3 py-1.5 rounded-xl font-bold border bg-white text-slate-700 border-slate-200 hover:bg-slate-100 flex items-center gap-1.5 transition-colors"
                  >
                    <Building2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>{showBusinessEditor ? "Hide Business Details" : "Edit Business Details"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleAddCustomSection}
                    className="px-3 py-1.5 rounded-xl font-bold bg-brand-navy text-white hover:bg-slate-800 flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Add Custom Block</span>
                  </button>
                </div>

                {/* Sub-block 1: Discount Editor */}
                {hasDiscount && (
                  <div className="bg-emerald-50/70 p-3.5 rounded-xl border border-emerald-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-emerald-900 flex items-center gap-1.5">
                        <Tag className="w-4 h-4 text-emerald-700" />
                        Discount Configuration
                      </span>
                      <button
                        type="button"
                        onClick={() => setHasDiscount(false)}
                        className="text-xs text-rose-600 hover:underline"
                      >
                        Remove Discount
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                      <div>
                        <label className="block text-[11px] font-semibold text-emerald-900 mb-1">Discount Type</label>
                        <select
                          value={discountType}
                          onChange={e => setDiscountType(e.target.value as any)}
                          className="w-full text-xs font-semibold px-2 py-1.5 rounded-lg border border-emerald-200 bg-white"
                        >
                          <option value="fixed">Fixed Dollar ($ AUD)</option>
                          <option value="percentage">Percentage (%)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-emerald-900 mb-1">Discount Amount</label>
                        <input
                          type="number"
                          step="any"
                          value={discountValue}
                          onChange={e => setDiscountValue(e.target.value)}
                          placeholder="e.g. 50"
                          className="w-full text-xs font-black text-emerald-900 px-2 py-1.5 rounded-lg border border-emerald-200 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-emerald-900 mb-1">Discount Reason / Label</label>
                        <input
                          type="text"
                          value={discountLabel}
                          onChange={e => setDiscountLabel(e.target.value)}
                          placeholder="e.g. Neighborhood Special"
                          className="w-full text-xs px-2 py-1.5 rounded-lg border border-emerald-200 bg-white font-medium"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-block 2: Customer Note Editor */}
                {hasCustomerNote && (
                  <div className="bg-sky-50/70 p-3.5 rounded-xl border border-sky-200 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-sky-900 flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4 text-sky-700" />
                        Personal Customer Note (Appears at top of quotation)
                      </span>
                      <button
                        type="button"
                        onClick={() => setHasCustomerNote(false)}
                        className="text-xs text-rose-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      value={customerNote}
                      onChange={e => setCustomerNote(e.target.value)}
                      placeholder="Enter a friendly personal note to the client..."
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-sky-200 bg-white text-slate-800 focus:outline-none"
                    />
                  </div>
                )}

                {/* Sub-block 3: Terms and Conditions Editor */}
                {hasTerms && (
                  <div className="bg-purple-50/70 p-3.5 rounded-xl border border-purple-200 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-purple-900 flex items-center gap-1.5">
                        <ScrollText className="w-4 h-4 text-purple-700" />
                        Terms & Conditions
                      </span>
                      <button
                        type="button"
                        onClick={() => setHasTerms(false)}
                        className="text-xs text-rose-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                    <textarea
                      rows={3}
                      value={termsAndConditions}
                      onChange={e => setTermsAndConditions(e.target.value)}
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-purple-200 bg-white text-slate-800 font-mono text-[11px]"
                    />
                  </div>
                )}

                {/* Sub-block 4: Payment Details Editor */}
                {showPaymentDetails && (
                  <div className="bg-amber-50/70 p-3.5 rounded-xl border border-amber-200 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-amber-950 flex items-center gap-1.5">
                        <CreditCard className="w-4 h-4 text-amber-700" />
                        EFT & Payment Details
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowPaymentDetails(false)}
                        className="text-xs text-rose-600 hover:underline"
                      >
                        Hide Payment Details
                      </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-amber-900 mb-0.5">Bank</label>
                        <input
                          type="text"
                          value={bankingDetails.bankName}
                          onChange={e => setBankingDetails({ ...bankingDetails, bankName: e.target.value })}
                          className="w-full text-xs px-2 py-1 rounded border border-amber-200 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-amber-900 mb-0.5">Account Name</label>
                        <input
                          type="text"
                          value={bankingDetails.accountName}
                          onChange={e => setBankingDetails({ ...bankingDetails, accountName: e.target.value })}
                          className="w-full text-xs px-2 py-1 rounded border border-amber-200 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-amber-900 mb-0.5">BSB</label>
                        <input
                          type="text"
                          value={bankingDetails.bsb}
                          onChange={e => setBankingDetails({ ...bankingDetails, bsb: e.target.value })}
                          className="w-full text-xs px-2 py-1 rounded border border-amber-200 bg-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-amber-900 mb-0.5">Account No</label>
                        <input
                          type="text"
                          value={bankingDetails.accountNumber}
                          onChange={e => setBankingDetails({ ...bankingDetails, accountNumber: e.target.value })}
                          className="w-full text-xs px-2 py-1 rounded border border-amber-200 bg-white font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-block 5: Business Details Editor */}
                {showBusinessEditor && (
                  <div className="bg-slate-100 p-3.5 rounded-xl border border-slate-300 space-y-2 text-xs">
                    <span className="font-black text-slate-900 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-slate-700" />
                      Aspect Window Cleaning Business Header Details
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 mb-0.5">Trading Name</label>
                        <input
                          type="text"
                          value={businessDetails.tradingName || ""}
                          onChange={e => setBusinessDetails({ ...businessDetails, tradingName: e.target.value })}
                          className="w-full text-xs px-2 py-1 rounded border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 mb-0.5">ABN</label>
                        <input
                          type="text"
                          value={businessDetails.abn}
                          onChange={e => setBusinessDetails({ ...businessDetails, abn: e.target.value })}
                          className="w-full text-xs px-2 py-1 rounded border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 mb-0.5">Phone</label>
                        <input
                          type="text"
                          value={businessDetails.phone}
                          onChange={e => setBusinessDetails({ ...businessDetails, phone: e.target.value })}
                          className="w-full text-xs px-2 py-1 rounded border border-slate-300 bg-white"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-[10px] font-bold text-slate-700 mb-0.5">Address</label>
                        <input
                          type="text"
                          value={businessDetails.address}
                          onChange={e => setBusinessDetails({ ...businessDetails, address: e.target.value })}
                          className="w-full text-xs px-2 py-1 rounded border border-slate-300 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-700 mb-0.5">Insurance Badge</label>
                        <input
                          type="text"
                          value={businessDetails.insuranceInfo || ""}
                          onChange={e => setBusinessDetails({ ...businessDetails, insuranceInfo: e.target.value })}
                          className="w-full text-xs px-2 py-1 rounded border border-slate-300 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Sub-block 6: Custom Blocks Anywhere */}
                {customSections.map((sec, sIdx) => (
                  <div
                    key={sec.id}
                    className="bg-indigo-50/70 p-3.5 rounded-xl border border-indigo-200 space-y-2 text-xs"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-black text-indigo-950 flex items-center gap-1.5">
                        <Layers className="w-4 h-4 text-indigo-700" />
                        Custom Block #{sIdx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomSection(sec.id)}
                        className="text-xs text-rose-600 hover:underline"
                      >
                        Remove Block
                      </button>
                    </div>

                    <input
                      type="text"
                      value={sec.title}
                      onChange={e => handleCustomSectionChange(sec.id, "title", e.target.value)}
                      placeholder="Custom Block Heading (e.g. Site Safety & Animal Protocol)..."
                      className="w-full text-xs font-black px-2.5 py-1.5 rounded-lg border border-indigo-200 bg-white text-indigo-950"
                    />

                    <textarea
                      rows={2}
                      value={sec.content}
                      onChange={e => handleCustomSectionChange(sec.id, "content", e.target.value)}
                      placeholder="Enter custom content for this section..."
                      className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-indigo-200 bg-white text-slate-800"
                    />
                  </div>
                ))}
              </div>

              {/* Totals Summary with Discount & GST */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Items Subtotal:</span>
                  <span className="font-semibold text-slate-800">${itemsSubtotal.toFixed(2)}</span>
                </div>

                {hasDiscount && calculatedDiscountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount ({discountLabel}):</span>
                    <span>-${calculatedDiscountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>Net Subtotal:</span>
                  <span className="font-semibold text-slate-800">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>GST (10%):</span>
                  <span className="font-semibold text-slate-800">
                    {includeGst ? `$${gst.toFixed(2)}` : "GST Free / $0.00"}
                  </span>
                </div>

                <div className="flex justify-between text-base font-black text-slate-900 pt-2 border-t-2 border-slate-800">
                  <span>Total Quotation (AUD):</span>
                  <span className="text-emerald-700">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Automatic Follow-up & Instant Quote Notification Options */}
          <div className="bg-amber-500/10 border border-amber-300 rounded-xl p-3.5 space-y-2.5 mt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-700" />
                <span className="text-xs font-bold text-slate-800">
                  Automatic 2-Day Quote Follow-Up
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoFollowUp}
                  onChange={e => setAutoFollowUp(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-8 h-4 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-brand-navy"></div>
                <span className="ml-2 text-xs font-bold text-brand-navy">
                  {autoFollowUp ? "ON (2 Days)" : "OFF"}
                </span>
              </label>
            </div>
            <p className="text-[11px] text-slate-600 leading-normal">
              {autoFollowUp
                ? "An automated follow-up reminder will trigger after 2 days if the customer hasn't booked. You can toggle this anytime on the job card."
                : "Automated 2-day follow-up reminder is disabled for this quote."}
            </p>

            <div className="pt-2 border-t border-amber-200/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Send className="w-3.5 h-3.5 text-brand-navy" />
                <span className="text-xs font-semibold text-slate-700">
                  Send Immediate Quote SMS to Customer
                </span>
              </div>
              <input
                type="checkbox"
                checked={sendImmediateSms}
                onChange={e => setSendImmediateSms(e.target.checked)}
                className="w-4 h-4 text-brand-navy rounded border-slate-300 focus:ring-amber-400 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>

          {quoteMode === "manual" ? (
            <button
              type="button"
              onClick={handleSaveManual}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-action-gold hover:bg-amber-400 text-brand-navy shadow-sm flex items-center gap-1.5 transition-all"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Save Price & Move to Quoted</span>
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSaveFormal(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-200 hover:bg-slate-300 text-slate-800 transition-colors"
              >
                Save & Mark Quote Sent
              </button>
              <button
                type="button"
                onClick={() => handleSaveFormal(true)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-action-gold hover:bg-amber-400 text-brand-navy shadow-sm flex items-center gap-1.5 transition-all font-black"
              >
                <Printer className="w-4 h-4" />
                <span>Download / Print Quote (PDF) →</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
