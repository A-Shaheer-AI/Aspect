"use client";

import React, { useState } from "react";
import { CrmJob, SubscriptionFrequency } from "@/lib/crm/types";
import { calculateNextDueDate } from "@/lib/crm/store";
import {
  RefreshCw,
  AlertCircle,
  Calendar,
  MessageSquare,
  Clock,
  MapPin,
  Phone,
  ShieldAlert,
  CheckCircle2,
  Sparkles
} from "lucide-react";

interface RecallsViewProps {
  jobs: CrmJob[];
  onJobClick: (job: CrmJob) => void;
  onJobUpdate: (job: CrmJob) => void;
}

const FREQUENCY_LABELS: Record<SubscriptionFrequency, string> = {
  one_off: "One-Off",
  monthly: "Monthly (4 wks)",
  bi_monthly: "Bi-Monthly (8 wks)",
  quarterly: "Quarterly (12 wks)",
  half_yearly: "Biannual (6 mos)",
  annual: "Annual (12 mos)"
};

export default function RecallsView({ jobs, onJobClick, onJobUpdate }: RecallsViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<"overdue" | "due_soon" | "upcoming" | "dnc">("overdue");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const today = new Date();
  const todayIso = today.toISOString().split("T")[0];
  const currentMonthPrefix = todayIso.substring(0, 7); // e.g. "2026-11"

  // Separate DNC customers
  const dncJobs = jobs.filter(j => j.doNotContact);
  const eligibleJobs = jobs.filter(j => !j.doNotContact && j.subscriptionFrequency !== "one_off" && j.nextDueDate);

  // Categorize
  const overdueJobs = eligibleJobs.filter(j => (j.nextDueDate || "") < todayIso);
  const dueSoonJobs = eligibleJobs.filter(
    j => (j.nextDueDate || "") >= todayIso && (j.nextDueDate || "").startsWith(currentMonthPrefix)
  );
  const upcomingJobs = eligibleJobs.filter(
    j => (j.nextDueDate || "") > todayIso && !(j.nextDueDate || "").startsWith(currentMonthPrefix)
  );

  const displayedJobs =
    activeSubTab === "overdue"
      ? overdueJobs
      : activeSubTab === "due_soon"
      ? dueSoonJobs
      : activeSubTab === "upcoming"
      ? upcomingJobs
      : dncJobs;

  const getSmsDraft = (job: CrmJob): string => {
    const firstName = job.customerName.split(" ")[0] || "there";
    const addressShort = job.address || job.suburb || "your property";
    return `Hi ${firstName}, Ahmed here from Aspect Window Cleaning! It's been a while since our last wash at ${addressShort}. We're scheduling in your area next week - would you like us to freshen up your windows? Let me know what day suits you best!`;
  };

  const handleCopySms = (job: CrmJob) => {
    const text = getSmsDraft(job);
    navigator.clipboard.writeText(text);
    setCopiedId(job.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleMarkCleanedToday = (job: CrmJob) => {
    const newLastClean = todayIso;
    const newNextDue = calculateNextDueDate(newLastClean, job.subscriptionFrequency);
    const updated: CrmJob = {
      ...job,
      lastCleanedDate: newLastClean,
      nextDueDate: newNextDue,
      updatedAt: new Date().toISOString()
    };
    onJobUpdate(updated);
  };

  const handleToggleDnc = (job: CrmJob) => {
    const updated: CrmJob = {
      ...job,
      doNotContact: !job.doNotContact,
      updatedAt: new Date().toISOString()
    };
    onJobUpdate(updated);
  };

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6 pb-24 max-w-5xl mx-auto w-full">
      {/* Recalls Engine Intro Banner */}
      <div className="bg-gradient-to-r from-brand-navy to-slate-900 rounded-2xl p-5 text-white shadow-md mb-5 border border-slate-800">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <RefreshCw className="w-5 h-5 text-amber-400" />
              <h2 className="font-extrabold text-base sm:text-lg">Subscription Recall & Re-engagement</h2>
            </div>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Track recurring window clean cycles, automatically compute due dates, and draft personalized 1-tap SMS messages to re-engage past clients. Customers marked DNC are protected from contact.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none text-xs">
        <button
          onClick={() => setActiveSubTab("overdue")}
          className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shrink-0 ${
            activeSubTab === "overdue"
              ? "bg-rose-500 text-white shadow-sm"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <AlertCircle className="w-4 h-4" />
          <span>Overdue Recalls</span>
          <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-xs">
            {overdueJobs.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab("due_soon")}
          className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shrink-0 ${
            activeSubTab === "due_soon"
              ? "bg-amber-500 text-brand-navy shadow-sm"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Due This Month</span>
          <span className="px-1.5 py-0.2 rounded-full bg-black/10 text-xs">
            {dueSoonJobs.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab("upcoming")}
          className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shrink-0 ${
            activeSubTab === "upcoming"
              ? "bg-brand-navy text-white shadow-sm"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Upcoming</span>
          <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-xs">
            {upcomingJobs.length}
          </span>
        </button>

        <button
          onClick={() => setActiveSubTab("dnc")}
          className={`px-3.5 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shrink-0 ${
            activeSubTab === "dnc"
              ? "bg-slate-800 text-rose-300 shadow-sm"
              : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
          }`}
        >
          <ShieldAlert className="w-4 h-4 text-rose-500" />
          <span>Do Not Contact</span>
          <span className="px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-800 text-xs">
            {dncJobs.length}
          </span>
        </button>
      </div>

      {/* Cards List */}
      <div className="space-y-3">
        {displayedJobs.map(job => {
          const smsText = getSmsDraft(job);
          const isOverdue = (job.nextDueDate || "") < todayIso;

          return (
            <div
              key={job.id}
              onClick={() => onJobClick(job)}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 shadow-xs hover:shadow-md cursor-pointer transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                {/* Customer Details */}
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                      {job.customerName}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                      {FREQUENCY_LABELS[job.subscriptionFrequency]}
                    </span>
                    {job.doNotContact && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 border border-rose-300 flex items-center gap-1">
                        <ShieldAlert className="w-3 h-3 text-rose-600" /> DNC
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{job.address}, {job.suburb}</span>
                  </div>

                  {job.phone && (
                    <div className="flex items-center gap-1.5 text-slate-600 text-xs mt-1">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{job.phone}</span>
                    </div>
                  )}

                  {/* Clean History */}
                  <div className="flex flex-wrap items-center gap-3 mt-3 text-xs">
                    <div className="text-slate-600">
                      <span className="text-slate-400 font-medium">Last Clean: </span>
                      <strong className="text-slate-800">{job.lastCleanedDate || "Not recorded"}</strong>
                    </div>

                    <div className="text-slate-600">
                      <span className="text-slate-400 font-medium">Next Due: </span>
                      <strong
                        className={
                          isOverdue && !job.doNotContact
                            ? "text-rose-600 font-extrabold"
                            : "text-amber-700 font-extrabold"
                        }
                      >
                        {job.nextDueDate || "TBD"}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div
                  className="flex sm:flex-col items-center sm:items-end gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100"
                  onClick={e => e.stopPropagation()}
                >
                  {!job.doNotContact && job.phone && (
                    <div className="flex items-center gap-1.5">
                      <a
                        href={`sms:${job.phone}?body=${encodeURIComponent(smsText)}`}
                        className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-brand-navy font-bold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Send 1-Tap SMS</span>
                      </a>
                      <button
                        onClick={() => handleCopySms(job)}
                        className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                        title="Copy SMS text to clipboard"
                      >
                        {copiedId === job.id ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleMarkCleanedToday(job)}
                      className="px-2.5 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 font-semibold text-xs flex items-center gap-1 transition-colors"
                      title="Mark as cleaned today and advance cycle"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="hidden sm:inline">Cleaned Today</span>
                    </button>

                    <button
                      onClick={() => handleToggleDnc(job)}
                      className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold border transition-colors ${
                        job.doNotContact
                          ? "bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200"
                          : "bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200"
                      }`}
                    >
                      {job.doNotContact ? "Unmark DNC" : "Mark DNC"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {displayedJobs.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 p-6">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2 opacity-80" />
            <h4 className="font-bold text-sm text-slate-800">All Caught Up!</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              {activeSubTab === "overdue"
                ? "No overdue customer recalls right now. Great job keeping on top of your customer schedule!"
                : activeSubTab === "due_soon"
                ? "No jobs due in the remainder of this month."
                : activeSubTab === "dnc"
                ? "No customers marked Do Not Contact."
                : "No upcoming recalls in this category."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
