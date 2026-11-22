"use client";

import React, { useState, useEffect } from "react";
import { CrmJob, SubscriptionVisit, SubscriptionFrequency } from "@/lib/crm/types";
import { generateYearlySubscriptionSchedule } from "@/lib/crm/store";
import {
  X,
  Printer,
  Calendar,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  Clock,
  Phone,
  MapPin,
  Send,
  RefreshCw,
  Info,
  HeartHandshake,
  Download
} from "lucide-react";

interface SubscriptionScheduleModalProps {
  job: CrmJob | null;
  isOpen: boolean;
  onClose: () => void;
  onSaveSchedule: (jobId: string, schedule: SubscriptionVisit[]) => void;
  onSendAdvanceNotice?: (jobId: string, message: string) => void;
}

const FREQUENCY_NAMES: Record<SubscriptionFrequency, string> = {
  one_off: "One-Off Service",
  monthly: "VIP Monthly Care (12 Visits/Year)",
  bi_monthly: "VIP Bi-Monthly Care (6 Visits/Year)",
  quarterly: "VIP Quarterly Care (4 Visits/Year)",
  half_yearly: "VIP 6-Monthly Care Plan (2 Visits/Year)",
  annual: "VIP Annual Glazing Service (1 Visit/Year)"
};

export default function SubscriptionScheduleModal({
  job,
  isOpen,
  onClose,
  onSaveSchedule,
  onSendAdvanceNotice
}: SubscriptionScheduleModalProps) {
  const [schedule, setSchedule] = useState<SubscriptionVisit[]>([]);
  const [frequency, setFrequency] = useState<SubscriptionFrequency>("half_yearly");
  const [startDate, setStartDate] = useState<string>("");
  const [copiedNoticeVisit, setCopiedNoticeVisit] = useState<number | null>(null);

  useEffect(() => {
    if (!job) return;

    const freq = job.subscriptionFrequency === "one_off" ? "half_yearly" : job.subscriptionFrequency;
    setFrequency(freq);

    const baseStart = job.lastCleanedDate || job.scheduledDate || new Date().toISOString().split("T")[0];
    setStartDate(baseStart);

    if (job.subscriptionYearlyPlan && job.subscriptionYearlyPlan.length > 0) {
      setSchedule(job.subscriptionYearlyPlan);
    } else {
      const generated = generateYearlySubscriptionSchedule(baseStart, freq);
      setSchedule(generated);
    }
  }, [job, isOpen]);

  if (!isOpen || !job) return null;

  const handleRegenerate = (newFreq?: SubscriptionFrequency, newStart?: string) => {
    const f = newFreq || frequency;
    const s = newStart || startDate;
    const generated = generateYearlySubscriptionSchedule(s, f);
    setSchedule(generated);
    onSaveSchedule(job.id, generated);
  };

  const handleToggleVisitCompleted = (visitNum: number) => {
    const updated = schedule.map(v =>
      v.visitNumber === visitNum ? { ...v, completed: !v.completed } : v
    );
    setSchedule(updated);
    onSaveSchedule(job.id, updated);
  };

  const handlePrint = () => {
    window.print();
  };

  const getAdvanceNoticeText = (visit: SubscriptionVisit): string => {
    const firstName = job.customerName.split(" ")[0] || "Valued Customer";
    return `Hi ${firstName}, this is Ahmed from Aspect Window Cleaning! Just a friendly advance notice that your VIP Care Plan visit is scheduled for next week (${visit.weekLabel}). As part of our service, we can attend anytime within that week and will confirm with you 24 hours prior to our arrival. Please reply if this week still suits or if you need any adjustments!`;
  };

  const handleDispatchNotice = (visit: SubscriptionVisit) => {
    const text = getAdvanceNoticeText(visit);
    if (onSendAdvanceNotice) {
      onSendAdvanceNotice(job.id, text);
    }
    // Also copy to clipboard for convenience
    navigator.clipboard.writeText(text);
    setCopiedNoticeVisit(visit.visitNumber);
    setTimeout(() => setCopiedNoticeVisit(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[94vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header - Hidden on Print */}
        <div className="print:hidden bg-brand-navy text-white px-5 py-3.5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm sm:text-base text-white">
                VIP Care Plan & Fridge Schedule
              </h3>
              <p className="text-[11px] text-slate-300">
                Printable yearly schedule for {job.customerName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-brand-navy font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Schedule Controls - Hidden on Print */}
        <div className="print:hidden bg-slate-50 border-b border-slate-200 p-3 sm:px-5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 flex-wrap">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase block mb-0.5">
                Care Plan Frequency
              </label>
              <select
                value={frequency}
                onChange={e => {
                  const val = e.target.value as SubscriptionFrequency;
                  setFrequency(val);
                  handleRegenerate(val, startDate);
                }}
                className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-semibold text-slate-800"
              >
                <option value="half_yearly">Every 6 Months (Biannual - 2 Visits)</option>
                <option value="quarterly">Every 12 Weeks (Quarterly - 4 Visits)</option>
                <option value="bi_monthly">Every 8 Weeks (Bi-Monthly - 6 Visits)</option>
                <option value="monthly">Every 4 Weeks (Monthly - 12 Visits)</option>
                <option value="annual">Annual Clean (1 Visit)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase block mb-0.5">
                Starting Cycle Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={e => {
                  setStartDate(e.target.value);
                  handleRegenerate(frequency, e.target.value);
                }}
                className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs font-medium text-slate-800"
              />
            </div>
          </div>

          <button
            onClick={() => handleRegenerate()}
            className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold flex items-center gap-1.5 transition-colors self-end"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Recalculate Weeks</span>
          </button>
        </div>

        {/* PRINTABLE FRIDGE SCHEDULE DOCUMENT */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 bg-white print:p-0 print:overflow-visible">
          <div className="max-w-2xl mx-auto border-2 border-brand-navy rounded-2xl p-6 sm:p-8 shadow-xs print:border-2 print:shadow-none print:max-w-none print:w-full print:rounded-none">
            {/* Top Brand Banner */}
            <div className="flex items-start justify-between border-b-2 border-slate-200 pb-5 mb-5">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-brand-navy flex items-center justify-center text-amber-400 font-black text-sm">
                    A
                  </div>
                  <h1 className="font-extrabold text-xl text-brand-navy tracking-tight">
                    ASPECT WINDOW CLEANING
                  </h1>
                </div>
                <p className="text-xs font-semibold text-slate-500 mt-0.5 tracking-wide uppercase">
                  VIP Recurring Care Plan &bull; Yearly Schedule
                </p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Aspect Perth &bull; Mobile: 0426 996 192 &bull; info@aspectwindowcleaning.com.au
                </p>
              </div>

              <div className="text-right">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-black bg-amber-400/20 text-brand-navy border border-amber-400/40">
                  {FREQUENCY_NAMES[frequency] || "VIP Care Plan"}
                </span>
                <p className="text-[11px] text-slate-500 mt-1.5 font-medium">
                  Year of {new Date().getFullYear()} / {new Date().getFullYear() + 1}
                </p>
              </div>
            </div>

            {/* Member Details */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">
                  VIP Client Name
                </span>
                <strong className="text-slate-900 text-sm font-extrabold">
                  {job.customerName}
                </strong>
                <div className="flex items-center gap-1.5 text-slate-600 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{job.address}, {job.suburb} WA</span>
                </div>
              </div>

              <div>
                <span className="text-slate-400 text-[10px] uppercase font-bold block">
                  Direct Contact & Support
                </span>
                <strong className="text-slate-900 font-semibold">{job.phone}</strong>
                {job.packageType && (
                  <p className="text-slate-600 mt-1">
                    Care Package: <strong className="text-brand-navy">{job.packageType}</strong>
                  </p>
                )}
              </div>
            </div>

            {/* THE COMMITMENT / ARRIVAL POLICY CALLOUT */}
            <div className="bg-amber-500/10 border-2 border-amber-400/60 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-2.5">
                <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-800 leading-relaxed">
                  <h4 className="font-extrabold text-brand-navy mb-1 text-sm">
                    Our VIP Flexible Arrival Commitment
                  </h4>
                  <p className="font-medium text-slate-700">
                    &ldquo;We will come <strong>anytime within your designated target week</strong>. Our team will send you an SMS confirmation <strong>one day prior to our arrival</strong> within that week so you are fully prepared.&rdquo;
                  </p>
                  <p className="text-[11px] text-slate-500 mt-1.5">
                    ✨ <em>You do not need to wait home all week. External pure-water washing can proceed smoothly once side gates are unlocked.</em>
                  </p>
                </div>
              </div>
            </div>

            {/* SCHEDULE CARDS */}
            <div className="space-y-3 mb-6">
              <h4 className="font-extrabold text-sm text-slate-900 flex items-center justify-between">
                <span>Scheduled Target Cleaning Weeks</span>
                <span className="text-[11px] font-normal text-slate-500">
                  {schedule.length} scheduled visits
                </span>
              </h4>

              {schedule.map(visit => (
                <div
                  key={visit.visitNumber}
                  className={`rounded-xl p-3.5 border transition-all ${
                    visit.completed
                      ? "bg-emerald-50/70 border-emerald-300"
                      : "bg-white border-slate-300 hover:border-slate-400"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shrink-0 ${
                          visit.completed
                            ? "bg-emerald-600 text-white"
                            : "bg-brand-navy text-amber-400"
                        }`}
                      >
                        {visit.completed ? "✓" : `#${visit.visitNumber}`}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h5 className="font-black text-slate-900 text-sm">
                            {visit.weekLabel}
                          </h5>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                            {visit.targetMonth}
                          </span>
                        </div>

                        <p className="text-xs text-slate-600 mt-1 font-medium">
                          🌿 <strong>Seasonal Detailing:</strong> {visit.seasonalTheme}
                        </p>
                      </div>
                    </div>

                    {/* Right Action / Status on Card */}
                    <div className="flex items-center gap-2 self-center shrink-0">
                      <button
                        type="button"
                        onClick={() => handleToggleVisitCompleted(visit.visitNumber)}
                        className={`print:hidden px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-colors ${
                          visit.completed
                            ? "bg-emerald-600 text-white border-emerald-600"
                            : "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
                        }`}
                      >
                        {visit.completed ? "Completed ✓" : "Mark Done"}
                      </button>

                      {/* 1-Week Advance Notice Trigger Button */}
                      {!visit.completed && (
                        <button
                          type="button"
                          onClick={() => handleDispatchNotice(visit)}
                          className="print:hidden px-2.5 py-1 rounded-lg text-[11px] font-bold bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1 transition-colors"
                          title="Send 1-Week Advance Notice SMS to customer"
                        >
                          <Send className="w-3 h-3 text-amber-600" />
                          <span>
                            {copiedNoticeVisit === visit.visitNumber ? "Notice Sent! ✓" : "Send 1-Wk Notice"}
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Fridge Callout Footer */}
            <div className="border-t-2 border-dashed border-slate-300 pt-4 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                <span>🧲 Stick this schedule on your fridge for quick reference!</span>
              </div>
              <p className="text-[10px] text-slate-400 mt-2">
                Need to reschedule a week? Simply reply to any SMS or call Ahmed on 0426 996 192.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions - Hidden on Print */}
        <div className="print:hidden bg-slate-100 px-5 py-3 border-t border-slate-200 flex items-center justify-between text-xs">
          <p className="text-slate-500">
            Changes auto-saved to client profile
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-slate-700 font-bold hover:bg-slate-200 transition-colors"
            >
              Done
            </button>
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-brand-navy hover:bg-slate-800 text-white font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Printer className="w-4 h-4 text-amber-400" />
              <span>Print Fridge Card</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
