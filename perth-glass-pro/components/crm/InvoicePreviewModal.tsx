"use client";

import React, { useState } from "react";
import { CrmInvoice, InvoiceItem, CustomDocumentSection } from "@/lib/crm/types";
import { DEFAULT_TERMS_AND_CONDITIONS } from "@/lib/crm/store";
import {
  X,
  Printer,
  Download,
  CheckCircle,
  FileText,
  Trash2,
  Plus,
  Send,
  Building,
  CreditCard,
  Sparkles,
  Tag,
  MessageSquare,
  ScrollText,
  Layers
} from "lucide-react";

interface InvoicePreviewModalProps {
  invoice: CrmInvoice | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: CrmInvoice) => void;
  onDelete?: (id: string) => void;
  onConvertToInvoice?: (quote: CrmInvoice) => void;
}

export default function InvoicePreviewModal({
  invoice,
  isOpen,
  onClose,
  onSave,
  onDelete,
  onConvertToInvoice
}: InvoicePreviewModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [localInvoice, setLocalInvoice] = useState<CrmInvoice | null>(invoice);

  // Edit sub-panels
  const [activeEditSection, setActiveEditSection] = useState<"items" | "discount" | "note" | "terms" | "custom">("items");

  React.useEffect(() => {
    setLocalInvoice(invoice);
    setIsEditing(false);
  }, [invoice, isOpen]);

  if (!isOpen || !localInvoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: `item_${Date.now()}`,
      heading: "Additional Window Cleaning Service",
      description: "Custom glass detailing or secondary glazing treatment.",
      qty: 1,
      rate: 100,
      amount: 100
    };
    const newItems = [...localInvoice.items, newItem];
    recalculateTotals(newItems);
  };

  const handleRemoveItem = (id: string) => {
    const newItems = localInvoice.items.filter(i => i.id !== id);
    recalculateTotals(newItems);
  };

  const handleItemChange = (
    id: string,
    field: "heading" | "description" | "qty" | "rate",
    value: any
  ) => {
    const newItems = localInvoice.items.map(item => {
      if (item.id !== id) return item;
      const updated = { ...item, [field]: value };
      if (field === "qty" || field === "rate") {
        const qty = field === "qty" ? parseFloat(value) || 0 : item.qty;
        const rate = field === "rate" ? parseFloat(value) || 0 : item.rate;
        updated.amount = Math.round(qty * rate * 100) / 100;
      }
      return updated;
    });
    recalculateTotals(newItems);
  };

  const recalculateTotals = (
    items: InvoiceItem[],
    withGst?: boolean,
    discountVal?: number,
    discountTyp?: "fixed" | "percentage",
    discountLbl?: string
  ) => {
    const isGst = withGst !== undefined ? withGst : (localInvoice.includeGst ?? true);
    const dVal = discountVal !== undefined ? discountVal : (localInvoice.discountValue || 0);
    const dType = discountTyp !== undefined ? discountTyp : (localInvoice.discountType || "fixed");
    const dLabel = discountLbl !== undefined ? discountLbl : localInvoice.discountLabel;

    const itemsSum = items.reduce((acc, i) => acc + (i.amount || 0), 0);
    
    let discountAmount = 0;
    if (dVal > 0) {
      if (dType === "percentage") {
        discountAmount = Math.round((itemsSum * (dVal / 100)) * 100) / 100;
      } else {
        discountAmount = Math.min(itemsSum, dVal);
      }
    }

    const discountedSubtotal = Math.max(0, itemsSum - discountAmount);
    const subtotal = isGst ? Math.round((discountedSubtotal / 1.1) * 100) / 100 : discountedSubtotal;
    const gst = isGst ? Math.round((discountedSubtotal - subtotal) * 100) / 100 : 0;
    const total = discountedSubtotal;

    const updated: CrmInvoice = {
      ...localInvoice,
      items,
      subtotal,
      discountType: dVal > 0 ? dType : undefined,
      discountValue: dVal > 0 ? dVal : undefined,
      discountLabel: dVal > 0 ? dLabel : undefined,
      discountAmount: dVal > 0 ? discountAmount : undefined,
      gst,
      total,
      includeGst: isGst,
      updatedAt: new Date().toISOString()
    };
    setLocalInvoice(updated);
  };

  const handleToggleGst = (checked: boolean) => {
    recalculateTotals(localInvoice.items, checked);
  };

  const handleSaveInvoice = () => {
    if (localInvoice) {
      onSave(localInvoice);
      setIsEditing(false);
    }
  };

  const handleStatusChange = (status: "draft" | "sent" | "paid") => {
    if (localInvoice) {
      const updated = { ...localInvoice, status, updatedAt: new Date().toISOString() };
      setLocalInvoice(updated);
      onSave(updated);
    }
  };

  // Custom Sections
  const handleAddCustomSection = () => {
    const newSection: CustomDocumentSection = {
      id: `sec_${Date.now()}`,
      title: "Special Property Access & Instructions",
      content: "Please ensure all windows are firmly latched. External water taps will be connected to pure water filtration equipment."
    };
    const updated = {
      ...localInvoice,
      customSections: [...(localInvoice.customSections || []), newSection],
      updatedAt: new Date().toISOString()
    };
    setLocalInvoice(updated);
  };

  const handleRemoveCustomSection = (id: string) => {
    const updated = {
      ...localInvoice,
      customSections: (localInvoice.customSections || []).filter(s => s.id !== id),
      updatedAt: new Date().toISOString()
    };
    setLocalInvoice(updated);
  };

  const handleCustomSectionChange = (id: string, field: "title" | "content", val: string) => {
    const updated = {
      ...localInvoice,
      customSections: (localInvoice.customSections || []).map(s => (s.id === id ? { ...s, [field]: val } : s)),
      updatedAt: new Date().toISOString()
    };
    setLocalInvoice(updated);
  };

  const isQuote = localInvoice.type === "quote";
  const biz = localInvoice.businessDetails || {
    name: "Aspect Window Cleaning",
    tradingName: "Aspect Window Cleaning Pty Ltd",
    address: "183 Stirling Hwy, Nedlands WA 6009",
    abn: "44 847 810 035",
    email: "info@aspectwindowcleaning.com.au",
    phone: "0426 996 192",
    website: "aspectwindowcleaning.com.au",
    insuranceInfo: "Fully Insured • $20 Million Public Liability Coverage"
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white print:static">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] flex flex-col overflow-hidden border border-slate-200 print:max-h-none print:shadow-none print:border-none print:w-full print:rounded-none">
        {/* Modal Top Actions (Hidden in Print) */}
        <div className="bg-brand-navy text-white px-5 py-3.5 flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-sm text-white">
              {isQuote ? "Quotation Preview" : "Tax Invoice Preview"} ({localInvoice.id})
            </h3>
            <span
              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                localInvoice.status === "paid"
                  ? "bg-emerald-500 text-white"
                  : localInvoice.status === "sent"
                  ? "bg-sky-500 text-white"
                  : "bg-amber-500 text-brand-navy"
              }`}
            >
              {localInvoice.status}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Convert Quote to Invoice */}
            {isQuote && onConvertToInvoice && (
              <button
                onClick={() => onConvertToInvoice(localInvoice)}
                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" /> Convert to Tax Invoice
              </button>
            )}

            {/* Status Selector */}
            <select
              value={localInvoice.status}
              onChange={e => handleStatusChange(e.target.value as any)}
              className="bg-slate-800 text-slate-200 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-700 focus:outline-none"
            >
              <option value="draft">Status: Draft</option>
              <option value="sent">Status: Sent</option>
              <option value="paid">Status: Paid</option>
            </select>

            {/* GST Optional Toggle */}
            <label className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-semibold cursor-pointer border border-slate-700 hover:bg-slate-700 transition-colors">
              <input
                type="checkbox"
                checked={localInvoice.includeGst ?? true}
                onChange={e => handleToggleGst(e.target.checked)}
                className="w-3.5 h-3.5 text-amber-500 rounded border-slate-600 focus:ring-0"
              />
              <span>10% GST</span>
            </label>

            {/* Edit / Done Toggle */}
            <button
              onClick={() => {
                if (isEditing) {
                  handleSaveInvoice();
                } else {
                  setIsEditing(true);
                }
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-colors"
            >
              {isEditing ? "Save Edits" : "Edit Document"}
            </button>

            {/* Print / PDF Button */}
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-action-gold hover:bg-amber-400 text-brand-navy font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Printer className="w-3.5 h-3.5" /> Print / PDF
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Editing Toolbar Ribbon (Visible ONLY when isEditing is active) */}
        {isEditing && (
          <div className="bg-slate-100 px-5 py-2.5 border-b border-slate-300 flex flex-wrap items-center justify-between gap-2 text-xs print:hidden">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-700">Add / Customize:</span>
              <button
                type="button"
                onClick={handleAddItem}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-300 font-bold hover:bg-slate-50 text-brand-navy flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" /> Service Line
              </button>
              <button
                type="button"
                onClick={() => {
                  const currentVal = localInvoice.discountValue || 30;
                  recalculateTotals(localInvoice.items, undefined, currentVal > 0 ? 0 : 30, "fixed", "Discount");
                }}
                className={`px-2.5 py-1 rounded-lg border font-bold flex items-center gap-1 ${
                  localInvoice.discountValue
                    ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                    : "bg-white border-slate-300 text-slate-700"
                }`}
              >
                <Tag className="w-3.5 h-3.5" /> {localInvoice.discountValue ? "Edit Discount" : "+ Discount"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setLocalInvoice({
                    ...localInvoice,
                    customerNote: localInvoice.customerNote ? "" : "Thank you for reaching out! We look forward to working with you."
                  });
                }}
                className={`px-2.5 py-1 rounded-lg border font-bold flex items-center gap-1 ${
                  localInvoice.customerNote
                    ? "bg-sky-100 text-sky-900 border-sky-300"
                    : "bg-white border-slate-300 text-slate-700"
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" /> {localInvoice.customerNote ? "Edit Note" : "+ Customer Note"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setLocalInvoice({
                    ...localInvoice,
                    termsAndConditions: localInvoice.termsAndConditions ? "" : DEFAULT_TERMS_AND_CONDITIONS
                  });
                }}
                className={`px-2.5 py-1 rounded-lg border font-bold flex items-center gap-1 ${
                  localInvoice.termsAndConditions
                    ? "bg-purple-100 text-purple-900 border-purple-300"
                    : "bg-white border-slate-300 text-slate-700"
                }`}
              >
                <ScrollText className="w-3.5 h-3.5" /> {localInvoice.termsAndConditions ? "Edit Terms" : "+ Terms"}
              </button>
              <button
                type="button"
                onClick={handleAddCustomSection}
                className="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-900 border border-indigo-300 font-bold hover:bg-indigo-200 flex items-center gap-1"
              >
                <Layers className="w-3.5 h-3.5" /> + Custom Block
              </button>
            </div>

            <button
              type="button"
              onClick={handleSaveInvoice}
              className="px-3.5 py-1 rounded-lg bg-action-gold text-brand-navy font-black shadow-xs hover:bg-amber-400"
            >
              Done Editing
            </button>
          </div>
        )}

        {/* Invoice Printable Document Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white text-slate-900 print:overflow-visible print:p-6 print:m-0">
          <div className="max-w-3xl mx-auto space-y-6">
            {/* 1. Header: Branding & Document Title */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-slate-200 pb-6">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-navy text-amber-400 flex items-center justify-center font-black text-lg">
                    A
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black text-brand-navy tracking-tight">
                    {biz.name.toUpperCase()}
                  </h1>
                </div>
                <div className="text-xs text-slate-600 mt-2 space-y-0.5 leading-relaxed">
                  <p className="font-semibold text-slate-800">{biz.tradingName || biz.name}</p>
                  <p>{biz.address}</p>
                  <p>ABN: {biz.abn}</p>
                  <p>Email: {biz.email} {biz.phone && `• Ph: ${biz.phone}`}</p>
                  {biz.insuranceInfo && (
                    <p className="font-semibold text-emerald-800 text-[11px] pt-1">
                      🛡️ {biz.insuranceInfo}
                    </p>
                  )}
                </div>
              </div>

              <div className="sm:text-right">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 uppercase">
                  {isQuote ? "QUOTATION" : "TAX INVOICE"}
                </h2>
                <div className="mt-3 text-xs space-y-1">
                  <div className="flex justify-between sm:justify-end gap-3">
                    <span className="text-slate-500 font-semibold">{isQuote ? "Quote #" : "Invoice #"}:</span>
                    <strong className="text-slate-900 font-bold">{localInvoice.id}</strong>
                  </div>
                  <div className="flex justify-between sm:justify-end gap-3">
                    <span className="text-slate-500 font-semibold">Issue Date:</span>
                    <span className="text-slate-800">{localInvoice.issueDate}</span>
                  </div>
                  <div className="flex justify-between sm:justify-end gap-3">
                    <span className="text-slate-500 font-semibold">Due Date:</span>
                    <span className="text-slate-800 font-bold">{localInvoice.dueDate}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. Bill To & Property Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50/80 p-5 rounded-2xl border border-slate-200">
              <div>
                <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider block mb-1.5">
                  BILL TO
                </span>
                <h3 className="text-sm font-black text-slate-900">{localInvoice.clientName}</h3>
                <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">{localInvoice.clientAddress}</p>
                {localInvoice.clientPhone && (
                  <p className="text-xs text-slate-600 mt-1">Phone: {localInvoice.clientPhone}</p>
                )}
                {localInvoice.clientEmail && (
                  <p className="text-xs text-slate-600">Email: {localInvoice.clientEmail}</p>
                )}
              </div>

              <div className="sm:border-l sm:border-slate-200 sm:pl-6">
                <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider block mb-1.5">
                  SERVICE SCOPE & SUBJECT
                </span>
                {isEditing ? (
                  <input
                    type="text"
                    value={localInvoice.subject || ""}
                    onChange={e => setLocalInvoice({ ...localInvoice, subject: e.target.value })}
                    className="w-full text-xs font-bold p-1 rounded border border-slate-300"
                  />
                ) : (
                  <p className="text-xs font-bold text-slate-800 leading-snug">
                    {localInvoice.subject || "Professional Window Cleaning & Exterior Detailing"}
                  </p>
                )}
                <p className="text-[11px] text-slate-500 mt-2">
                  Completed using 0 PPM pure water reach and wash technology, detailed sills, tracks & frames.
                </p>
              </div>
            </div>

            {/* 3. Customer Note Banner (If present or in edit mode) */}
            {localInvoice.customerNote && (
              <div className="bg-sky-50/70 p-4 rounded-xl border border-sky-200 text-xs text-sky-950 space-y-1">
                <span className="font-extrabold text-sky-900 block">Personal Note from Aspect:</span>
                {isEditing ? (
                  <textarea
                    rows={2}
                    value={localInvoice.customerNote}
                    onChange={e => setLocalInvoice({ ...localInvoice, customerNote: e.target.value })}
                    className="w-full text-xs p-1.5 rounded border border-sky-300 bg-white"
                  />
                ) : (
                  <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{localInvoice.customerNote}</p>
                )}
              </div>
            )}

            {/* 4. Itemized Table with HEADING AND DESCRIPTION */}
            <div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-800 text-xs font-black uppercase text-slate-800 tracking-wider">
                    <th className="py-2.5 w-10 text-center">#</th>
                    <th className="py-2.5">Item & Description</th>
                    <th className="py-2.5 text-center w-16">Qty</th>
                    <th className="py-2.5 text-right w-24">
                      {localInvoice.includeGst ?? true ? "Rate (ex GST)" : "Rate (AUD)"}
                    </th>
                    <th className="py-2.5 text-right w-24">Amount (AUD)</th>
                    {isEditing && <th className="py-2.5 w-10 text-center print:hidden"></th>}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs">
                  {localInvoice.items.map((item, idx) => (
                    <tr key={item.id} className="align-top hover:bg-slate-50/50">
                      <td className="py-3 text-center text-slate-400 font-semibold">{idx + 1}</td>
                      <td className="py-3 pr-2">
                        {isEditing ? (
                          <div className="space-y-1.5">
                            <input
                              type="text"
                              value={item.heading || ""}
                              onChange={e => handleItemChange(item.id, "heading", e.target.value)}
                              placeholder="Item Heading (e.g. Double Storey Glazing)..."
                              className="w-full p-1.5 text-xs font-black rounded border border-slate-300"
                            />
                            <textarea
                              rows={2}
                              value={item.description}
                              onChange={e => handleItemChange(item.id, "description", e.target.value)}
                              placeholder="Detailed scope / description..."
                              className="w-full p-1.5 text-xs rounded border border-slate-300 text-slate-700"
                            />
                          </div>
                        ) : (
                          <div>
                            {item.heading && (
                              <span className="font-extrabold text-slate-900 block leading-tight text-xs">
                                {item.heading}
                              </span>
                            )}
                            <span className={`text-slate-600 leading-relaxed block ${item.heading ? "text-[11px] mt-0.5" : "text-xs font-medium"}`}>
                              {item.description}
                            </span>
                          </div>
                        )}
                      </td>
                      <td className="py-3 text-center">
                        {isEditing ? (
                          <input
                            type="number"
                            value={item.qty}
                            onChange={e => handleItemChange(item.id, "qty", e.target.value)}
                            className="w-14 p-1 text-center text-xs rounded border border-slate-300"
                          />
                        ) : (
                          <span className="text-slate-700">{item.qty}</span>
                        )}
                      </td>
                      <td className="py-3 text-right">
                        {isEditing ? (
                          <input
                            type="number"
                            step="any"
                            value={item.rate}
                            onChange={e => handleItemChange(item.id, "rate", e.target.value)}
                            className="w-20 p-1 text-right text-xs rounded border border-slate-300"
                          />
                        ) : (
                          <span className="text-slate-700">${item.rate.toFixed(2)}</span>
                        )}
                      </td>
                      <td className="py-3 text-right font-bold text-slate-900">
                        ${item.amount.toFixed(2)}
                      </td>
                      {isEditing && (
                        <td className="py-3 text-center print:hidden">
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(item.id)}
                            className="text-rose-500 hover:text-rose-700 p-1"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>

              {isEditing && (
                <div className="mt-3 print:hidden">
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="px-3 py-1.5 rounded-lg border border-dashed border-slate-300 hover:border-brand-navy text-xs font-bold text-brand-navy flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Line Item
                  </button>
                </div>
              )}
            </div>

            {/* 5. Custom Sections Anywhere (Site Safety, Access Codes, Protocols) */}
            {localInvoice.customSections && localInvoice.customSections.length > 0 && (
              <div className="space-y-3 pt-2 border-t border-slate-200">
                {localInvoice.customSections.map(sec => (
                  <div key={sec.id} className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1.5">
                    {isEditing ? (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                          <input
                            type="text"
                            value={sec.title}
                            onChange={e => handleCustomSectionChange(sec.id, "title", e.target.value)}
                            className="w-2/3 p-1 font-bold text-xs rounded border border-slate-300"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveCustomSection(sec.id)}
                            className="text-rose-600 text-xs hover:underline print:hidden"
                          >
                            Remove Section
                          </button>
                        </div>
                        <textarea
                          rows={2}
                          value={sec.content}
                          onChange={e => handleCustomSectionChange(sec.id, "content", e.target.value)}
                          className="w-full p-1 text-xs rounded border border-slate-300 text-slate-700"
                        />
                      </div>
                    ) : (
                      <>
                        <h4 className="font-black text-slate-900 uppercase tracking-wider text-[11px]">{sec.title}</h4>
                        <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{sec.content}</p>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* 6. Totals Breakdown, Discount & EFT Banking Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t-2 border-slate-200">
              {/* Payment Details (Master Template INV-000242) */}
              {(localInvoice.showPaymentDetails !== false) ? (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-black text-brand-navy uppercase tracking-wider">
                    <CreditCard className="w-4 h-4 text-amber-500" />
                    <span>Direct EFT Payment Details</span>
                  </div>
                  <div className="text-xs space-y-1 text-slate-700">
                    <p><strong className="text-slate-900">Bank:</strong> {localInvoice.paymentDetails.bankName}</p>
                    <p><strong className="text-slate-900">Account Name:</strong> {localInvoice.paymentDetails.accountName}</p>
                    <p><strong className="text-slate-900">BSB:</strong> {localInvoice.paymentDetails.bsb}</p>
                    <p><strong className="text-slate-900">Account Number:</strong> {localInvoice.paymentDetails.accountNumber}</p>
                    <p><strong className="text-slate-900">PayID:</strong> {localInvoice.paymentDetails.payId}</p>
                    <p className="text-[11px] text-slate-500 pt-1">
                      Please use <strong>{localInvoice.id}</strong> as payment reference.
                    </p>
                  </div>
                </div>
              ) : <div />}

              {/* Total Calculation with Discount */}
              <div className="space-y-2 self-start">
                <div className="flex justify-between text-xs text-slate-600 pb-1.5 border-b border-slate-100">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-slate-800">${localInvoice.subtotal.toFixed(2)}</span>
                </div>

                {localInvoice.discountAmount && localInvoice.discountAmount > 0 ? (
                  <div className="flex justify-between text-xs text-emerald-700 font-semibold pb-1.5 border-b border-slate-100">
                    <span>Discount ({localInvoice.discountLabel || "Special Discount"}):</span>
                    <span>-${localInvoice.discountAmount.toFixed(2)}</span>
                  </div>
                ) : null}

                {(localInvoice.includeGst ?? true) ? (
                  <div className="flex justify-between text-xs text-slate-600 pb-1.5 border-b border-slate-100">
                    <span>GST (10%):</span>
                    <span className="font-semibold text-slate-800">${localInvoice.gst.toFixed(2)}</span>
                  </div>
                ) : (
                  <div className="flex justify-between text-xs text-slate-500 pb-1.5 border-b border-slate-100">
                    <span>GST:</span>
                    <span className="font-semibold text-slate-500 italic">GST Free / $0.00</span>
                  </div>
                )}

                <div className="flex justify-between text-base font-black text-slate-900 pt-1 border-t-2 border-slate-800">
                  <span>Total (AUD):</span>
                  <span className="text-emerald-700 font-black">${localInvoice.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* 7. Terms & Conditions Block */}
            {localInvoice.termsAndConditions && (
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">Terms & Conditions</h4>
                {isEditing ? (
                  <textarea
                    rows={4}
                    value={localInvoice.termsAndConditions}
                    onChange={e => setLocalInvoice({ ...localInvoice, termsAndConditions: e.target.value })}
                    className="w-full text-[11px] p-2 rounded border border-slate-300 font-mono"
                  />
                ) : (
                  <p className="text-[11px] text-slate-600 whitespace-pre-wrap leading-relaxed font-mono">
                    {localInvoice.termsAndConditions}
                  </p>
                )}
              </div>
            )}

            {/* 8. Footer Notes */}
            <div className="pt-4 border-t border-slate-200 text-center text-xs text-slate-500 space-y-1 leading-relaxed">
              <p className="font-medium text-slate-700">
                {localInvoice.notes || "Payment is strictly 14 days from invoice date. Thank you for choosing Aspect Window Cleaning!"}
              </p>
              <p className="text-[11px] text-slate-400">
                {biz.name} • Nedlands, Western Australia • {biz.email}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer (Hidden in Print) */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between print:hidden">
          {onDelete ? (
            <button
              onClick={() => {
                if (confirm(`Delete ${localInvoice.id}?`)) {
                  onDelete(localInvoice.id);
                  onClose();
                }
              }}
              className="text-xs font-bold text-rose-600 hover:text-rose-800 flex items-center gap-1 p-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          ) : <div />}

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handlePrint}
              className="px-5 py-2 rounded-xl text-xs font-bold bg-action-gold hover:bg-amber-400 text-brand-navy shadow-xs flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-3.5 h-3.5" /> Print / Save as PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
