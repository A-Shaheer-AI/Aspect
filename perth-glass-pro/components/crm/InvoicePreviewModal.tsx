"use client";

import React, { useState } from "react";
import { CrmInvoice, InvoiceItem } from "@/lib/crm/types";
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
  Sparkles
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

  // Editable local state
  const [localInvoice, setLocalInvoice] = useState<CrmInvoice | null>(invoice);

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
      description: "Additional Window Cleaning Service",
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

  const handleItemChange = (id: string, field: "description" | "qty" | "rate", value: any) => {
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

  const recalculateTotals = (items: InvoiceItem[]) => {
    const subtotal = items.reduce((acc, i) => acc + (i.amount || 0), 0);
    const gst = Math.round(subtotal * 0.1 * 100) / 100;
    const total = Math.round((subtotal + gst) * 100) / 100;

    const updated: CrmInvoice = {
      ...localInvoice,
      items,
      subtotal,
      gst,
      total,
      updatedAt: new Date().toISOString()
    };
    setLocalInvoice(updated);
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

  const isQuote = localInvoice.type === "quote";

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

          <div className="flex items-center gap-2">
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

            {/* Edit / Save Toggle */}
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
              {isEditing ? "Done Editing" : "Edit Items"}
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

        {/* Invoice Printable Document Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 bg-white text-slate-900 print:overflow-visible print:p-6 print:m-0">
          <div className="max-w-3xl mx-auto space-y-8">
            {/* 1. Header: Branding & Document Title */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-slate-200 pb-6">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-navy text-amber-400 flex items-center justify-center font-black text-lg">
                    A
                  </div>
                  <h1 className="text-xl sm:text-2xl font-black text-brand-navy tracking-tight">
                    ASPECT WINDOW CLEANING
                  </h1>
                </div>
                <div className="text-xs text-slate-600 mt-2 space-y-0.5 leading-relaxed">
                  <p className="font-semibold text-slate-800">Aspect Window Cleaning Pty Ltd</p>
                  <p>183 Stirling Hwy, Nedlands WA 6009</p>
                  <p>ABN: 44 847 810 035</p>
                  <p>Email: info@aspectwindowcleaning.com.au</p>
                  <p>Web: aspectwindowcleaning.com.au</p>
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
                <p className="text-xs font-bold text-slate-800 leading-snug">
                  {localInvoice.subject || "Professional Window Cleaning & Exterior Detailing"}
                </p>
                <p className="text-[11px] text-slate-500 mt-2">
                  Completed using 0 PPM pure water reach and wash technology, detailed sills, tracks & frames.
                </p>
              </div>
            </div>

            {/* 3. Itemized Table */}
            <div>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-800 text-xs font-black uppercase text-slate-800 tracking-wider">
                    <th className="py-2.5 w-10 text-center">#</th>
                    <th className="py-2.5">Item & Description</th>
                    <th className="py-2.5 text-center w-16">Qty</th>
                    <th className="py-2.5 text-right w-24">Rate (ex GST)</th>
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
                          <input
                            type="text"
                            value={item.description}
                            onChange={e => handleItemChange(item.id, "description", e.target.value)}
                            className="w-full p-1.5 text-xs font-semibold rounded border border-slate-300"
                          />
                        ) : (
                          <span className="font-semibold text-slate-900 leading-relaxed block">
                            {item.description}
                          </span>
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

            {/* 4. Totals Breakdown & EFT Banking Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t-2 border-slate-200">
              {/* Payment Details (Master Template INV-000242) */}
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

              {/* Total Calculation */}
              <div className="space-y-2 self-start">
                <div className="flex justify-between text-xs text-slate-600 pb-1.5 border-b border-slate-100">
                  <span>Subtotal:</span>
                  <span className="font-semibold text-slate-800">${localInvoice.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-600 pb-1.5 border-b border-slate-100">
                  <span>GST (10%):</span>
                  <span className="font-semibold text-slate-800">${localInvoice.gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-900 pt-1 border-t-2 border-slate-800">
                  <span>Total (AUD):</span>
                  <span className="text-emerald-700 font-black">${localInvoice.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* 5. Footer Notes */}
            <div className="pt-4 border-t border-slate-200 text-center text-xs text-slate-500 space-y-1 leading-relaxed">
              <p className="font-medium text-slate-700">{localInvoice.notes || "Payment is strictly 14 days from invoice date. Thank you for choosing Aspect Window Cleaning!"}</p>
              <p className="text-[11px] text-slate-400">Aspect Window Cleaning • Nedlands, Western Australia • info@aspectwindowcleaning.com.au</p>
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
