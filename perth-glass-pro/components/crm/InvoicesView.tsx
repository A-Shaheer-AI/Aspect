"use client";

import React, { useState } from "react";
import { CrmInvoice, InvoiceItem } from "@/lib/crm/types";
import { parseInvoicePrompt, buildInvoiceFromParsed } from "@/lib/crm/ai-invoice-parser";
import { DEFAULT_BANKING_DETAILS } from "@/lib/crm/store";
import {
  Sparkles,
  Plus,
  Search,
  FileText,
  Printer,
  CheckCircle,
  Clock,
  ArrowRight,
  Send,
  Building,
  DollarSign
} from "lucide-react";

interface InvoicesViewProps {
  invoices: CrmInvoice[];
  onSelectInvoice: (invoice: CrmInvoice) => void;
  onSaveInvoice: (invoice: CrmInvoice) => void;
  onConvertToInvoice: (quote: CrmInvoice) => void;
}

const EXAMPLE_PROMPTS = [
  "Make an invoice for Caroline at 17 Brown Crescent: Double storey inside and out $340 + 16 solar panels $80",
  "Quote for ESM Strata at 88 Broadway: Commercial multi-storey facade wash $1200 + high balcony glass $350",
  "Invoice for City Toyota: Showroom exterior wash $450 + internal partitions $180"
];

export default function InvoicesView({
  invoices,
  onSelectInvoice,
  onSaveInvoice,
  onConvertToInvoice
}: InvoicesViewProps) {
  const [aiPrompt, setAiPrompt] = useState("");
  const [filterType, setFilterType] = useState<"all" | "invoice" | "quote">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "draft" | "sent" | "paid">("all");
  const [searchQuery, setSearchQuery] = useState("");

  const handleAiGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;

    // Parse natural language prompt
    const parsed = parseInvoicePrompt(aiPrompt);
    const existingCount = invoices.length + 242; // Continue from INV-000242
    const newDoc = buildInvoiceFromParsed(parsed, existingCount);

    onSaveInvoice(newDoc);
    onSelectInvoice(newDoc);
    setAiPrompt("");
  };

  const handleCreateBlank = (type: "invoice" | "quote") => {
    const existingCount = invoices.length + 242;
    const prefix = type === "quote" ? "QUO" : "INV";
    const formattedId = `${prefix}-${String(existingCount).padStart(6, "0")}`;
    const todayStr = new Date().toISOString().split("T")[0];

    const due = new Date();
    due.setDate(due.getDate() + 14);
    const dueStr = due.toISOString().split("T")[0];

    const blankDoc: CrmInvoice = {
      id: formattedId,
      type,
      clientName: "New Client",
      clientAddress: "Perth WA",
      subject: type === "quote" ? "Quotation for Window Cleaning" : "Tax Invoice for Window Cleaning",
      issueDate: todayStr,
      dueDate: dueStr,
      items: [
        {
          id: `item_${Date.now()}`,
          description: "Residential Window Cleaning (Inside & Out)",
          qty: 1,
          rate: 280.00,
          amount: 280.00
        }
      ],
      subtotal: 254.55,
      gst: 25.45,
      total: 280.00,
      status: "draft",
      paymentDetails: DEFAULT_BANKING_DETAILS,
      notes: "Payment is strictly 14 days from invoice date. Direct EFT or PayID.",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    onSaveInvoice(blankDoc);
    onSelectInvoice(blankDoc);
  };

  const filteredInvoices = invoices.filter(inv => {
    if (filterType !== "all" && inv.type !== filterType) return false;
    if (filterStatus !== "all" && inv.status !== filterStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        inv.id.toLowerCase().includes(q) ||
        inv.clientName.toLowerCase().includes(q) ||
        inv.clientAddress.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const totalRevenue = invoices
    .filter(i => i.type === "invoice" && i.status === "paid")
    .reduce((acc, i) => acc + i.total, 0);

  const pendingRevenue = invoices
    .filter(i => i.type === "invoice" && i.status !== "paid")
    .reduce((acc, i) => acc + i.total, 0);

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6 pb-24 max-w-5xl mx-auto w-full">
      {/* AI Invoice Bar Header */}
      <div className="bg-gradient-to-r from-brand-navy to-slate-900 rounded-2xl p-5 text-white shadow-md mb-6 border border-slate-800">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h2 className="font-extrabold text-base sm:text-lg">AI Prompt Invoicing & Quoting</h2>
        </div>
        <p className="text-xs text-slate-300 mb-4 max-w-2xl leading-relaxed">
          Type or speak naturally to generate a complete Tax Invoice or Quote matching master template <strong># INV-000242</strong> with 10% GST math, itemized breakdowns, and EFT banking details.
        </p>

        {/* AI Prompt Input Bar */}
        <form onSubmit={handleAiGenerate} className="flex gap-2">
          <input
            type="text"
            value={aiPrompt}
            onChange={e => setAiPrompt(e.target.value)}
            placeholder="e.g. Invoice for Caroline at 17 Brown Crescent: Double storey inside and out $340 + 16 solar panels $80"
            className="flex-1 bg-slate-800/90 border border-slate-700 text-xs text-white placeholder:text-slate-400 px-4 py-3 rounded-xl focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all shadow-inner"
          />
          <button
            type="submit"
            disabled={!aiPrompt.trim()}
            className="px-5 py-3 rounded-xl bg-action-gold hover:bg-amber-400 text-brand-navy font-bold text-xs flex items-center gap-2 shadow-sm disabled:opacity-40 transition-all shrink-0 active:scale-95"
          >
            <Sparkles className="w-4 h-4 fill-brand-navy" />
            <span className="hidden sm:inline">Generate Document</span>
            <span className="sm:hidden">Generate</span>
          </button>
        </form>

        {/* Example Prompt Chips */}
        <div className="flex flex-wrap items-center gap-1.5 mt-3 text-[11px]">
          <span className="text-slate-400 font-semibold mr-1">Quick Prompts:</span>
          {EXAMPLE_PROMPTS.map((prompt, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setAiPrompt(prompt)}
              className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700/80 transition-colors truncate max-w-xs text-left"
            >
              {prompt.split(":")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Financial Summary & Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Paid Invoices</span>
          <span className="text-base sm:text-lg font-black text-emerald-700 block mt-0.5">
            ${totalRevenue.toLocaleString()}
          </span>
        </div>
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/90 shadow-xs">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pending Invoices</span>
          <span className="text-base sm:text-lg font-black text-amber-600 block mt-0.5">
            ${pendingRevenue.toLocaleString()}
          </span>
        </div>
        <div className="col-span-2 flex items-center justify-end gap-2">
          <button
            onClick={() => handleCreateBlank("quote")}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold shadow-xs transition-colors"
          >
            + Blank Quote
          </button>
          <button
            onClick={() => handleCreateBlank("invoice")}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-brand-navy hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition-colors"
          >
            + Blank Invoice
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200/90 shadow-xs flex flex-wrap items-center justify-between gap-3 mb-4 text-xs">
        {/* Document Type Filter */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setFilterType("all")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              filterType === "all" ? "bg-brand-navy text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            All ({invoices.length})
          </button>
          <button
            onClick={() => setFilterType("invoice")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              filterType === "invoice" ? "bg-brand-navy text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Invoices
          </button>
          <button
            onClick={() => setFilterType("quote")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-colors ${
              filterType === "quote" ? "bg-brand-navy text-white" : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            Quotes
          </button>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1.5">
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value as any)}
            className="bg-slate-50 text-slate-700 font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 focus:outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="draft">Draft</option>
            <option value="sent">Sent</option>
            <option value="paid">Paid</option>
          </select>
        </div>
      </div>

      {/* Invoices List */}
      <div className="space-y-3">
        {filteredInvoices.map(doc => {
          const isQuote = doc.type === "quote";

          return (
            <div
              key={doc.id}
              onClick={() => onSelectInvoice(doc)}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:shadow-md cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isQuote ? "bg-purple-100 text-purple-700" : "bg-emerald-100 text-emerald-700"
                  }`}
                >
                  <FileText className="w-5 h-5" />
                </div>

                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-xs sm:text-sm text-slate-900">{doc.id}</span>
                    <span
                      className={`text-[10px] font-extrabold px-2 py-0.5 rounded-md uppercase ${
                        isQuote ? "bg-purple-50 text-purple-800 border border-purple-200" : "bg-blue-50 text-blue-800 border border-blue-200"
                      }`}
                    >
                      {isQuote ? "Quotation" : "Tax Invoice"}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase ${
                        doc.status === "paid"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : doc.status === "sent"
                          ? "bg-sky-50 text-sky-800 border border-sky-200"
                          : "bg-amber-50 text-amber-800 border border-amber-200"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </div>

                  <h4 className="font-bold text-xs sm:text-sm text-slate-800 mt-1">{doc.clientName}</h4>
                  <p className="text-[11px] text-slate-500">{doc.clientAddress}</p>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2">
                    <span>Issued: {doc.issueDate}</span>
                    <span>Due: {doc.dueDate}</span>
                    <span>{doc.items.length} line items</span>
                  </div>
                </div>
              </div>

              {/* Amount & Quick Preview Button */}
              <div
                className="flex items-center sm:flex-col sm:items-end justify-between pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-100"
                onClick={e => e.stopPropagation()}
              >
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block font-medium">Total AUD</span>
                  <span className="text-base sm:text-lg font-black text-slate-900">${doc.total.toFixed(2)}</span>
                </div>

                <div className="flex items-center gap-1.5 mt-2">
                  {isQuote && onConvertToInvoice && (
                    <button
                      onClick={() => onConvertToInvoice(doc)}
                      className="px-2.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition-colors"
                      title="Convert to Tax Invoice"
                    >
                      Convert
                    </button>
                  )}

                  <button
                    onClick={() => onSelectInvoice(doc)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <Printer className="w-3.5 h-3.5" /> View / Print
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {filteredInvoices.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 p-6">
            <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h4 className="font-bold text-sm text-slate-800">No Invoices or Quotes Found</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Use the AI prompt bar above to instantly generate an invoice, or create one manually.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
