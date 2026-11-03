"use client";

import React, { useState, useEffect } from "react";
import { CrmJob, CrmStage, Technician } from "@/lib/crm/types";
import {
  MapPin,
  Calendar,
  Clock,
  Image as ImageIcon,
  MessageSquare,
  ShieldAlert,
  ArrowRight,
  Bot,
  Phone,
  Play,
  Square,
  CheckCircle,
  Receipt,
  Star,
  FileCheck,
  User,
  AlertCircle,
  Globe,
  Send,
  Printer
} from "lucide-react";

interface JobCardProps {
  job: CrmJob;
  technicians: Technician[];
  nextStage?: CrmStage | null;
  technicianViewMode?: boolean;
  onClick: () => void;
  onDragStart: (e: React.DragEvent, jobId: string) => void;
  onAdvanceStage?: (job: CrmJob) => void;
  onOpenTechSheet?: (job: CrmJob) => void;
  onToggleAutoFollowUp?: (jobId: string, enabled: boolean) => void;
  onTriggerFollowUpSms?: (job: CrmJob) => void;
  onOpenFridgeSchedule?: (job: CrmJob) => void;
  onSendAdvanceNotice?: (job: CrmJob) => void;
}

export default function JobCard({
  job,
  technicians,
  nextStage,
  technicianViewMode = false,
  onClick,
  onDragStart,
  onAdvanceStage,
  onOpenTechSheet,
  onToggleAutoFollowUp,
  onTriggerFollowUpSms,
  onOpenFridgeSchedule,
  onSendAdvanceNotice
}: JobCardProps) {
  const [elapsedSec, setElapsedSec] = useState<number>(0);

  // Live timer tick when clocked in
  useEffect(() => {
    if (!job.clockInTime || job.clockOutTime) {
      setElapsedSec(0);
      return;
    }

    const start = new Date(job.clockInTime).getTime();
    const tick = () => {
      setElapsedSec(Math.max(0, Math.floor((Date.now() - start) / 1000)));
    };
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [job.clockInTime, job.clockOutTime]);

  const tech = technicians.find(t => t.id === job.assignedTechnicianId);
  const isClockedIn = Boolean(job.clockInTime && !job.clockOutTime);
  const isFollowUpDue = Boolean(
    job.stageId === "stage_quoted" &&
    job.autoFollowUpEnabled &&
    job.followUpDueDate &&
    new Date(job.followUpDueDate).getTime() <= Date.now() &&
    !job.followUpSent
  );

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    const h = Math.floor(m / 60);
    if (h > 0) {
      return `${h}h ${m % 60}m`;
    }
    return `${m}m ${s < 10 ? "0" : ""}${s}s`;
  };

  // Determine button styling and text based on stage
  const getActionConfig = () => {
    if (job.stageId === "stage_new") {
      return {
        label: "Log Contact →",
        bg: "bg-purple-50 hover:bg-purple-100 text-purple-900 border-purple-200",
        icon: MessageSquare
      };
    }
    if (job.stageId === "stage_contacted") {
      return {
        label: "Create Quotation →",
        bg: "bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200",
        icon: ArrowRight
      };
    }
    if (job.stageId === "stage_quoted") {
      return {
        label: "📅 Book & Schedule →",
        bg: "bg-cyan-50 hover:bg-cyan-100 text-cyan-900 border-cyan-200",
        icon: Calendar
      };
    }
    if (job.stageId === "stage_booked") {
      return {
        label: "🚗 We Have Arrived / Clock In →",
        bg: "bg-emerald-600 hover:bg-emerald-500 text-white font-black shadow-xs",
        icon: Play
      };
    }
    if (job.stageId === "stage_in_progress") {
      return {
        label: "✅ Complete Job / Clock Out →",
        bg: "bg-indigo-600 hover:bg-indigo-500 text-white font-black shadow-xs",
        icon: Square
      };
    }
    if (job.stageId === "stage_completed") {
      return {
        label: "📄 Generate Tax Invoice →",
        bg: "bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border-emerald-300 font-bold",
        icon: Receipt
      };
    }
    if (job.stageId === "stage_invoiced") {
      if (job.reviewRequested) {
        return {
          label: "⭐ Review Request Sent",
          bg: "bg-slate-100 text-slate-500 border-slate-200 cursor-default",
          icon: CheckCircle
        };
      }
      return {
        label: "⭐ Send Review Text →",
        bg: "bg-amber-500/10 hover:bg-amber-500/20 text-brand-navy border-amber-300 font-bold",
        icon: Star
      };
    }

    return {
      label: nextStage ? `Move to ${nextStage.name} →` : "Advance →",
      bg: "bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200",
      icon: ArrowRight
    };
  };

  const action = getActionConfig();
  const ActionIcon = action.icon;

  return (
    <div
      draggable
      onDragStart={e => onDragStart(e, job.id)}
      onClick={onClick}
      className={`group bg-white rounded-2xl p-3.5 sm:p-4 shadow-xs border border-slate-200/90 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer active:scale-[0.99] select-none ${
        job.doNotContact ? "border-l-4 border-l-rose-500" : ""
      }`}
    >
      {/* Top Header: Customer Name & Quoted Price (Hidden in Tech Mode) */}
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm leading-tight line-clamp-1 group-hover:text-brand-navy">
          {job.customerName}
        </h4>

        {!technicianViewMode && job.priceQuoted ? (
          <span className="shrink-0 text-xs font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/80">
            ${job.priceQuoted}
          </span>
        ) : null}
      </div>

      {/* Address */}
      <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-1.5 line-clamp-1">
        <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
        <span className="truncate">{job.address}, {job.suburb}</span>
      </div>

      {/* Contact Method Badge / Live Timer Badge */}
      <div className="flex flex-wrap items-center gap-1.5 mt-2.5">
        {/* Contact Method Tag */}
        {job.contactedBy && (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-900 border border-purple-200">
            {job.contactMethod === "ai_sms" ? (
              <Bot className="w-3 h-3 text-purple-600" />
            ) : (
              <Phone className="w-3 h-3 text-purple-600" />
            )}
            <span>{job.contactedBy}</span>
          </span>
        )}

        {/* Web Lead Tag */}
        {job.leadSource === "website_form" && (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            <Globe className="w-3 h-3 text-emerald-600" />
            <span>Web Lead</span>
          </span>
        )}

        {/* Live Running Timer Badge */}
        {isClockedIn && (
          <span className="inline-flex items-center gap-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 animate-pulse">
            <Clock className="w-3 h-3 text-emerald-700" />
            <span>⏱️ In Progress: {formatTimer(elapsedSec)}</span>
          </span>
        )}

        {/* Actual Duration if completed */}
        {job.actualDurationMinutes && !isClockedIn && (
          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            <span>{Math.floor(job.actualDurationMinutes / 60)}h {job.actualDurationMinutes % 60}m</span>
          </span>
        )}

        {/* Review Sent Badge */}
        {job.reviewRequested && (
          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
            <Star className="w-3 h-3 text-amber-600 fill-amber-500" />
            <span>Review Sent</span>
          </span>
        )}

        {job.doNotContact && (
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 border border-rose-300 flex items-center gap-0.5">
            <ShieldAlert className="w-3 h-3 text-rose-600" />
            DNC
          </span>
        )}
      </div>

      {/* Scope Badges */}
      <div className="flex flex-wrap items-center gap-1 mt-2">
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
          {job.storeys}
        </span>
        {job.packageType && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
            {job.packageType}
          </span>
        )}
        {job.estimatedHours && (
          <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
            ~{job.estimatedHours}h
          </span>
        )}
      </div>

      {/* Scheduled Time & Technician */}
      {job.scheduledDate && (
        <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
          <div className="flex items-center gap-1 text-sky-700 font-bold">
            <Calendar className="w-3 h-3 text-sky-500" />
            <span>{job.scheduledDate}</span>
          </div>
          {job.scheduledTimeSlot && (
            <div className="flex items-center gap-1 text-slate-500">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>{job.scheduledTimeSlot}</span>
            </div>
          )}
        </div>
      )}

      {/* Footer: Technician & Counts */}
      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
        <div className="flex items-center gap-2">
          {job.conversationTrail && job.conversationTrail.length > 0 && (
            <span className="flex items-center gap-0.5 text-purple-700 font-medium bg-purple-50 px-1.5 py-0.5 rounded">
              <MessageSquare className="w-3 h-3 text-purple-600" />
              {job.conversationTrail.length}
            </span>
          )}
          {job.photos && job.photos.length > 0 && (
            <span className="flex items-center gap-0.5 text-slate-500">
              <ImageIcon className="w-3 h-3 text-slate-400" />
              {job.photos.length}
            </span>
          )}
          {job.notes && job.notes.length > 0 && (
            <span className="flex items-center gap-0.5 text-slate-500">
              <FileCheck className="w-3 h-3 text-slate-400" />
              {job.notes.length}
            </span>
          )}
        </div>

        {tech ? (
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-semibold text-white shadow-xs"
            style={{ backgroundColor: tech.color }}
          >
            {tech.name}
          </span>
        ) : (
          <span className="text-[10px] text-slate-400 italic">Unassigned</span>
        )}
      </div>

      {/* Quote Follow-Up Alert & Disableable Toggle */}
      {job.stageId === "stage_quoted" && (
        <div className="mt-2.5 pt-2 border-t border-slate-100" onClick={e => e.stopPropagation()}>
          {isFollowUpDue ? (
            <div className="p-2 rounded-xl bg-rose-50 border border-rose-300 flex items-center justify-between text-[11px] animate-pulse">
              <div className="flex items-center gap-1.5 text-rose-800 font-bold">
                <AlertCircle className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                <span>2-Day Follow-Up Due!</span>
              </div>
              {onTriggerFollowUpSms && (
                <button
                  type="button"
                  onClick={() => onTriggerFollowUpSms(job)}
                  className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-[10px] shadow-xs flex items-center gap-1 transition-all"
                >
                  <Send className="w-2.5 h-2.5" />
                  <span>Send SMS</span>
                </button>
              )}
            </div>
          ) : job.followUpSent ? (
            <div className="flex items-center justify-between text-[10px] text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-200">
              <span className="flex items-center gap-1 font-bold">
                <CheckCircle className="w-3 h-3 text-emerald-600" /> 2-Day Follow-Up Sent
              </span>
              <span className="text-[9px] text-emerald-600 font-medium">Awaiting reply</span>
            </div>
          ) : (
            <div className="flex items-center justify-between text-[10px] text-slate-500 px-0.5">
              <span className="flex items-center gap-1 font-semibold text-amber-800">
                <Clock className="w-3 h-3 text-amber-600" />
                <span>2-Day Follow-Up: <strong>{job.autoFollowUpEnabled ? "ON" : "OFF"}</strong></span>
              </span>
              {onToggleAutoFollowUp && (
                <button
                  type="button"
                  onClick={() => onToggleAutoFollowUp(job.id, !job.autoFollowUpEnabled)}
                  className="text-[9px] font-bold px-1.5 py-0.5 rounded text-brand-navy hover:bg-slate-100 border border-slate-200"
                >
                  {job.autoFollowUpEnabled ? "Turn Off" : "Enable"}
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Subscription Care Plan & Fridge Card Button */}
      {job.subscriptionFrequency !== "one_off" && (
        <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between gap-1 text-[10px]" onClick={e => e.stopPropagation()}>
          <span className="font-extrabold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
            VIP {job.subscriptionFrequency === "half_yearly" ? "6-Monthly" : job.subscriptionFrequency === "quarterly" ? "Quarterly" : "Recurring"}
          </span>

          <div className="flex items-center gap-1">
            {onOpenFridgeSchedule && (
              <button
                type="button"
                onClick={() => onOpenFridgeSchedule(job)}
                className="px-2 py-0.5 rounded-md bg-amber-50 hover:bg-amber-100 text-brand-navy font-bold border border-amber-300 flex items-center gap-1 transition-colors"
                title="View & Print Fridge Schedule"
              >
                <Printer className="w-2.5 h-2.5 text-amber-600" />
                <span>Fridge Plan</span>
              </button>
            )}

            {onSendAdvanceNotice && !job.advanceNoticeSent && (
              <button
                type="button"
                onClick={() => onSendAdvanceNotice(job)}
                className="px-2 py-0.5 rounded-md bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold border border-sky-200 flex items-center gap-1 transition-colors"
                title="Send 1-Week Advance Notice SMS"
              >
                <Send className="w-2.5 h-2.5 text-sky-600" />
                <span>1-Wk Notice</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Phase Transition Action Prompt */}
      {onAdvanceStage && (
        <div className="mt-2.5 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={e => {
              e.stopPropagation();
              onAdvanceStage(job);
            }}
            className={`w-full py-2 px-3 rounded-xl border text-[11px] flex items-center justify-between transition-all active:scale-98 ${action.bg}`}
          >
            <span className="truncate">{action.label}</span>
            <ActionIcon className="w-3.5 h-3.5 shrink-0 ml-1 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      )}
    </div>
  );
}
