"use client";

import React, { useState, useEffect } from "react";
import { CrmJob, CrmInvoice, InvoiceItem } from "@/lib/crm/types";
import { DEFAULT_BANKING_DETAILS } from "@/lib/crm/store";
import {
  X,
  Printer,
  DollarSign,
  FileText,
  CheckCircle,
  Plus,
  Trash2,
  Sparkles,
  Zap
} from "lucide-react";

interface QuotePromptModalProps {
  job: CrmJob | null;
  isOpen: boolean;
  existingInvoiceCount: number;
  onClose: () => void;
  onSaveManualPrice: (jobId: string, price: number, note?: string) => void;
  onSaveFormalQuote: (jobId: string, quote: CrmInvoice, triggerPrint: boolean) => void;
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

  // Mode 1: Manual / On-Site Verbal Price State
  const [manualPrice, setManualPrice] = useState<string>("");
  const [manualNote, setManualNote] = useState<string>("Verbal quote given on site");

  // Mode 2: Formal Quotation State
  const [items, setItems] = useState<InvoiceItem[]>([]);
  const [includeGst, setIncludeGst] = useState<boolean>(true);
  const [subject, setSubject] = useState<string>("");
  const [quoteNotes, setQuoteNotes] = useState<string>("Payment strictly 14 days upon completion. Direct EFT or PayID.");

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

    // 2. Prepopulate formal line items
    const generatedItems: InvoiceItem[] = [];
    const mainDesc = `${job.storeys} Window Cleaning (Inside & Out) - ${job.packageType || "Detailed Clean"}`;
    generatedItems.push({
      id: `item_${Date.now()}_0`,
      description: mainDesc,
      qty: 1,
      rate: parseFloat(estimatedInitial),
      amount: parseFloat(estimatedInitial)
    });

    if (job.hasScreens) {
      generatedItems.push({
        id: `item_${Date.now()}_1`,
        description: "Flyscreens Detailed Wash & Frame Wipe",
        qty: 1,
        rate: 40,
        amount: 40
      });
    }

    if (job.interestedServices?.includes("Solar Panels")) {
      generatedItems.push({
        id: `item_${Date.now()}_2`,
        description: "Solar Panel Array Pure Water Clean (Up to 20 panels)",
        qty: 1,
        rate: 80,
        amount: 80
      });
    }

    if (job.interestedServices?.includes("Gutters & Eaves")) {
      generatedItems.push({
        id: `item_${Date.now()}_3`,
        description: "Gutter Clearance & Downpipe Flush",
        qty: 1,
        rate: 150,
        amount: 150
      });
    }

    if (job.interestedServices?.includes("Pressure Washing")) {
      generatedItems.push({
        id: `item_${Date.now()}_4`,
        description: "High-Pressure Surface Detailing",
        qty: 1,
        rate: 180,
        amount: 180
      });
    }

    setItems(generatedItems);
    setSubject(`Window Cleaning Quotation for ${job.address || job.customerName}`);
    setIncludeGst(true);
    setQuoteMode("manual");
  }, [job, isOpen]);

  if (!isOpen || !job) return null;

  // Totals calculations
  const subtotal = items.reduce((acc, i) => acc + (i.amount || 0), 0);
  const gst = includeGst ? Math.round(subtotal * 0.1 * 100) / 100 : 0;
  const total = includeGst ? Math.round((subtotal + gst) * 100) / 100 : subtotal;

  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: `item_${Date.now()}`,
      description: "Additional Detailing Service",
      qty: 1,
      rate: 100,
      amount: 100
    };
    setItems([...items, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const handleItemChange = (id: string, field: "description" | "qty" | "rate", val: any) => {
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

  const handleSaveManual = () => {
    const priceNum = parseFloat(manualPrice) || 0;
    if (priceNum <= 0) {
      alert("Please enter a valid quoted price.");
      return;
    }
    onSaveManualPrice(job.id, priceNum, manualNote.trim() || undefined);
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
      gst,
      total,
      includeGst,
      status: "sent",
      paymentDetails: DEFAULT_BANKING_DETAILS,
      notes: quoteNotes,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };

    onSaveFormalQuote(job.id, quote, triggerPrint);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-brand-navy text-white px-5 py-4 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
              <h3 className="font-bold text-base text-white">Quotation Workflow</h3>
            </div>
            <p className="text-xs text-slate-300">
              Moving <strong>{job.customerName}</strong> to Quote Sent stage
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
            <span>Formal Quotation (PDF)</span>
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

          {/* OPTION 2: FORMAL QUOTATION (PDF) */}
          {quoteMode === "formal" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Itemized Quote Lines
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Pre-populated based on {job.storeys} & services. Edit descriptions or rates.
                  </p>
                </div>

                {/* GST Toggle */}
                <label className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold cursor-pointer border border-slate-200 hover:bg-slate-200 transition-colors">
                  <input
                    type="checkbox"
                    checked={includeGst}
                    onChange={e => setIncludeGst(e.target.checked)}
                    className="w-4 h-4 text-brand-navy rounded border-slate-300"
                  />
                  <span>10% GST</span>
                </label>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                {items.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center gap-2 p-2 bg-slate-50 rounded-xl border border-slate-200 text-xs"
                  >
                    <input
                      type="text"
                      value={item.description}
                      onChange={e => handleItemChange(item.id, "description", e.target.value)}
                      placeholder="Service description..."
                      className="flex-1 bg-white text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 font-medium"
                    />
                    <div className="flex items-center gap-1">
                      <span className="text-slate-400 font-bold">$</span>
                      <input
                        type="number"
                        step="any"
                        value={item.rate}
                        onChange={e => handleItemChange(item.id, "rate", e.target.value)}
                        placeholder="Rate"
                        className="w-20 bg-white text-xs px-2 py-1.5 rounded-lg border border-slate-200 font-bold text-right"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={handleAddItem}
                  className="px-3 py-1.5 text-xs font-bold text-brand-navy border border-dashed border-slate-300 hover:border-brand-navy rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" /> Add Line
                </button>
              </div>

              {/* Totals Summary */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-slate-800">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST (10%):</span>
                  <span className="font-semibold text-slate-800">
                    {includeGst ? `$${gst.toFixed(2)}` : "GST Free / $0.00"}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-900 pt-1.5 border-t border-slate-200">
                  <span>Total Quotation:</span>
                  <span className="text-emerald-700">${total.toFixed(2)} AUD</span>
                </div>
              </div>
            </div>
          )}
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
                Save Quote Only
              </button>
              <button
                type="button"
                onClick={() => handleSaveFormal(true)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-action-gold hover:bg-amber-400 text-brand-navy shadow-sm flex items-center gap-1.5 transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Save & Print / PDF</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
