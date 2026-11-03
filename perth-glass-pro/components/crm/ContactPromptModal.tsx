"use client";

import React, { useState } from "react";
import { CrmJob, ConversationMessage } from "@/lib/crm/types";
import {
  X,
  Bot,
  Phone,
  MessageSquare,
  Globe,
  Mail,
  Send,
  User,
  ArrowRight,
  Sparkles
} from "lucide-react";

interface ContactPromptModalProps {
  job: CrmJob | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirmContact: (
    jobId: string,
    method: "ai_sms" | "ai_livechat" | "manual_phone" | "manual_sms" | "email",
    contactedBy: string,
    initialMessage?: string
  ) => void;
}

export default function ContactPromptModal({
  job,
  isOpen,
  onClose,
  onConfirmContact
}: ContactPromptModalProps) {
  const [method, setMethod] = useState<"ai_sms" | "ai_livechat" | "manual_phone" | "manual_sms" | "email">("ai_sms");
  const [contactedBy, setContactedBy] = useState("Fazal AI (SMS)");
  const [messageText, setMessageText] = useState(
    "Hi, thanks for reaching out to Aspect Window Cleaning! Would you prefer a quick phone call or chatting over text to get you a quick quote?"
  );

  React.useEffect(() => {
    if (job) {
      if (job.contactMethod) {
        setMethod(job.contactMethod);
        setContactedBy(job.contactedBy || "Fazal AI (SMS)");
      } else {
        setMethod("ai_sms");
        setContactedBy("Fazal AI (SMS)");
      }
    }
  }, [job, isOpen]);

  if (!isOpen || !job) return null;

  const handleSelectMethod = (
    m: "ai_sms" | "ai_livechat" | "manual_phone" | "manual_sms" | "email",
    person: string,
    defaultMsg: string
  ) => {
    setMethod(m);
    setContactedBy(person);
    setMessageText(defaultMsg);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmContact(job.id, method, contactedBy, messageText.trim() || undefined);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-brand-navy text-white px-5 py-4 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
              <h3 className="font-bold text-base text-white">Log Customer Contact</h3>
            </div>
            <p className="text-xs text-slate-300">
              Moving <strong>{job.customerName}</strong> ({job.address || job.suburb}) to <strong>Contacted</strong>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="bg-purple-50/70 border border-purple-200 rounded-xl p-3 text-xs text-purple-950 leading-relaxed">
            <span className="font-bold block mb-0.5">Specify How Contact Occurred:</span>
            Record whether Fazal AI contacted the lead automatically after the 1–2 minute buffer or if Ahmed or staff reached out manually.
          </div>

          {/* Contact Method Selector Grid */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">Contact Method & Agent *</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {/* Option 1: Fazal AI SMS */}
              <button
                type="button"
                onClick={() =>
                  handleSelectMethod(
                    "ai_sms",
                    "Fazal AI (SMS)",
                    `Hi ${job.customerName.split(" ")[0]}, thanks for reaching out! Would you prefer a quick phone call so we can grab all the necessary details, or would you prefer to chat over text? Regards, Aspect Window Cleaning, Fazal.`
                  )
                }
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                  method === "ai_sms"
                    ? "bg-purple-100/80 border-purple-400 ring-2 ring-purple-300 text-purple-950 font-semibold"
                    : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-purple-200 text-purple-800 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold block">Automatic AI (Fazal SMS)</span>
                  <span className="text-[10px] text-slate-500 font-normal">Sent text after 1-2 min buffer</span>
                </div>
              </button>

              {/* Option 2: Phone Call */}
              <button
                type="button"
                onClick={() =>
                  handleSelectMethod(
                    "manual_phone",
                    "Ahmed (Phone)",
                    "Called customer over phone. Discussed property layout and requested inspection/photos."
                  )
                }
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                  method === "manual_phone"
                    ? "bg-purple-100/80 border-purple-400 ring-2 ring-purple-300 text-purple-950 font-semibold"
                    : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold block">Phone Call (Ahmed)</span>
                  <span className="text-[10px] text-slate-500 font-normal">Spoke directly over phone</span>
                </div>
              </button>

              {/* Option 3: Manual SMS */}
              <button
                type="button"
                onClick={() =>
                  handleSelectMethod(
                    "manual_sms",
                    "Ahmed (SMS)",
                    `Hi ${job.customerName.split(" ")[0]}, Ahmed here from Aspect Window Cleaning. Happy to help with your windows! How many storeys is the house?`
                  )
                }
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                  method === "manual_sms"
                    ? "bg-purple-100/80 border-purple-400 ring-2 ring-purple-300 text-purple-950 font-semibold"
                    : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold block">Manual SMS (Owner)</span>
                  <span className="text-[10px] text-slate-500 font-normal">Direct text from Ahmed</span>
                </div>
              </button>

              {/* Option 4: Website Live Chat */}
              <button
                type="button"
                onClick={() =>
                  handleSelectMethod(
                    "ai_livechat",
                    "Website Live Chat",
                    "Customer messaged via live chat widget on website. Details captured."
                  )
                }
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                  method === "ai_livechat"
                    ? "bg-purple-100/80 border-purple-400 ring-2 ring-purple-300 text-purple-950 font-semibold"
                    : "bg-white border-slate-200 hover:bg-slate-50 text-slate-700"
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold block">Website Live Chat</span>
                  <span className="text-[10px] text-slate-500 font-normal">Visitor interacted with widget</span>
                </div>
              </button>
            </div>
          </div>

          {/* Contacted By Custom Field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Contacted By (Name / System)</label>
            <input
              type="text"
              required
              value={contactedBy}
              onChange={e => setContactedBy(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white font-medium"
            />
          </div>

          {/* Message / Transcript Record */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Initial Message / Call Notes (Logged to Conversation Trail)
            </label>
            <textarea
              rows={3}
              value={messageText}
              onChange={e => setMessageText(e.target.value)}
              placeholder="Enter message sent or brief call notes..."
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-brand-navy"
            />
          </div>

          {/* Existing Trail Preview if any */}
          {job.conversationTrail && job.conversationTrail.length > 0 && (
            <div className="pt-2 border-t border-slate-200">
              <span className="text-[11px] font-bold text-slate-600 block mb-1.5">
                Existing Conversation ({job.conversationTrail.length} messages)
              </span>
              <div className="max-h-36 overflow-y-auto space-y-1.5 p-2.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                {job.conversationTrail.map((msg, i) => (
                  <div
                    key={msg.id || i}
                    className={`p-2 rounded-lg ${
                      msg.sender === "customer"
                        ? "bg-white border border-slate-200 text-slate-800"
                        : "bg-purple-50 border border-purple-200 text-purple-950 ml-4"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-0.5">
                      <span className="font-bold">{msg.senderName || (msg.sender === "customer" ? job.customerName : "Aspect")}</span>
                      <span>{new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                    </div>
                    <p className="text-xs">{msg.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
            >
              <span>Confirm & Move to Contacted</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
