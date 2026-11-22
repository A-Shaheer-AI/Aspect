"use client";

import React, { useState } from "react";
import { CrmJob } from "@/lib/crm/types";
import {
  X,
  Star,
  Send,
  MessageSquare,
  Mail,
  Copy,
  Check,
  Sparkles,
  ExternalLink
} from "lucide-react";

interface ReviewRequestModalProps {
  job: CrmJob | null;
  isOpen: boolean;
  onClose: () => void;
  onSendReview: (jobId: string, channel: "sms" | "email", message: string) => void;
}

export default function ReviewRequestModal({
  job,
  isOpen,
  onClose,
  onSendReview
}: ReviewRequestModalProps) {
  const [channel, setChannel] = useState<"sms" | "email">("sms");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const googleReviewLink = "https://g.page/r/aspect-window-cleaning/review";

  React.useEffect(() => {
    if (job) {
      const firstName = job.customerName.split(" ")[0] || "there";
      setMessage(
        `Hi ${firstName}, Ahmed here from Aspect Window Cleaning! Thank you for choosing us today — we hope your windows are crystal clear and let in all that beautiful Perth sunshine! ✨\n\nCould you please take 30 seconds to leave us a quick Google review? It helps our local team immensely:\n${googleReviewLink}\n\nThank you again, Ahmed | 0426 996 192`
      );
    }
  }, [job, isOpen]);

  if (!isOpen || !job) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = () => {
    setIsSending(true);

    // If SMS, also trigger native sms protocol for mobile convenience
    if (channel === "sms" && job.phone) {
      const cleanPhone = job.phone.replace(/\s+/g, "");
      const smsUrl = `sms:${cleanPhone}?body=${encodeURIComponent(message)}`;
      window.open(smsUrl, "_self");
    }

    setTimeout(() => {
      onSendReview(job.id, channel, message);
      setIsSending(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-brand-navy text-white px-5 py-4 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-400 fill-amber-400 animate-bounce" />
              <h3 className="font-bold text-base text-white">Google Review Outreach</h3>
            </div>
            <p className="text-xs text-slate-300">
              Send follow-up review request to <strong>{job.customerName}</strong>
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
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-3 text-xs text-amber-950 leading-relaxed">
            <span className="font-bold block mb-0.5">Automated Post-Service Review Flow:</span>
            Invoice generated & downloaded! Send a personalized Google review request text using your Telnyx virtual number or mobile SMS.
          </div>

          {/* Channel Selector */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setChannel("sms")}
              className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                channel === "sms"
                  ? "bg-amber-100/90 text-amber-950 border-amber-400 ring-2 ring-amber-300"
                  : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <MessageSquare className="w-4 h-4 text-amber-600" />
              <span>SMS to {job.phone}</span>
            </button>

            {job.email && (
              <button
                type="button"
                onClick={() => setChannel("email")}
                className={`flex-1 py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  channel === "email"
                    ? "bg-amber-100/90 text-amber-950 border-amber-400 ring-2 ring-amber-300"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                }`}
              >
                <Mail className="w-4 h-4 text-sky-600" />
                <span>Email Review Link</span>
              </button>
            )}
          </div>

          {/* Editable Message Box */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700">Review Message</label>
              <button
                type="button"
                onClick={handleCopy}
                className="text-[11px] font-semibold text-brand-navy hover:underline flex items-center gap-1"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? "Copied!" : "Copy Text"}</span>
              </button>
            </div>
            <textarea
              rows={6}
              value={message}
              onChange={e => setMessage(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-brand-navy font-sans"
            />
          </div>

          {/* Review Link Badge */}
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <span className="truncate text-[11px] font-mono">{googleReviewLink}</span>
            <a
              href={googleReviewLink}
              target="_blank"
              rel="noreferrer"
              className="text-brand-navy hover:underline text-[11px] font-bold flex items-center gap-0.5 ml-2 shrink-0"
            >
              <span>Test Link</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Skip for Now
          </button>
          <button
            type="button"
            onClick={handleSend}
            disabled={isSending}
            className="px-5 py-2.5 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-brand-navy rounded-xl shadow-sm flex items-center gap-1.5 transition-all font-black"
          >
            <Send className="w-4 h-4" />
            <span>{isSending ? "Sending..." : "Send Review Request"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
