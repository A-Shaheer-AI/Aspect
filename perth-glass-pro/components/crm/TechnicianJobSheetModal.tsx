"use client";

import React, { useState, useEffect } from "react";
import { CrmJob, Technician } from "@/lib/crm/types";
import {
  X,
  MapPin,
  Phone,
  MessageSquare,
  Clock,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Play,
  Square,
  ExternalLink,
  ShieldAlert,
  Sparkles,
  Camera,
  Layers,
  FileCheck
} from "lucide-react";

interface TechnicianJobSheetModalProps {
  job: CrmJob | null;
  technicians: Technician[];
  isOpen: boolean;
  onClose: () => void;
  onClockIn: (jobId: string) => void;
  onClockOut: (jobId: string) => void;
}

export default function TechnicianJobSheetModal({
  job,
  technicians,
  isOpen,
  onClose,
  onClockIn,
  onClockOut
}: TechnicianJobSheetModalProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  // Live timer tick when clocked in
  useEffect(() => {
    if (!job?.clockInTime || job?.clockOutTime) {
      setElapsedSeconds(0);
      return;
    }

    const startTime = new Date(job.clockInTime).getTime();

    const updateTimer = () => {
      const now = Date.now();
      const diff = Math.max(0, Math.floor((now - startTime) / 1000));
      setElapsedSeconds(diff);
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [job?.clockInTime, job?.clockOutTime]);

  if (!isOpen || !job) return null;

  const tech = technicians.find(t => t.id === job.assignedTechnicianId);
  const isClockedIn = Boolean(job.clockInTime && !job.clockOutTime);
  const isCompleted = Boolean(job.clockOutTime);

  // Format elapsed time (HH:MM:SS)
  const formatElapsed = (sec: number) => {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  };

  const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${job.address}, ${job.suburb} WA`)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/75 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[94vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-brand-navy text-white px-5 py-4 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h3 className="font-bold text-base text-white">Technician Field Job Sheet</h3>
            </div>
            <p className="text-xs text-slate-300">
              Work order for <strong>{job.customerName}</strong> ({job.suburb})
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Technician Notice Banner (Owner Privacy) */}
        <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
          <span className="font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            Field Operator View
          </span>
          <span className="text-slate-400 italic">Financial pricing hidden</span>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {/* 1. Timer / Clock-In Control Hero */}
          <div className="bg-gradient-to-br from-slate-900 to-brand-navy text-white p-4 sm:p-5 rounded-2xl shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs uppercase font-extrabold tracking-wider text-amber-400 block">
                  Field Job Status
                </span>
                <span className="text-lg font-black">
                  {isClockedIn ? "Job In Progress (On Site)" : isCompleted ? "Job Completed" : "Booked / Ready for Arrival"}
                </span>
              </div>

              {isClockedIn && (
                <div className="text-right">
                  <span className="text-[10px] text-slate-300 block">Elapsed On Site</span>
                  <span className="text-xl sm:text-2xl font-mono font-black text-emerald-400 animate-pulse">
                    {formatElapsed(elapsedSeconds)}
                  </span>
                </div>
              )}
            </div>

            {/* Estimated Duration vs Actual */}
            <div className="flex items-center gap-3 text-xs text-slate-300 pt-1 border-t border-slate-800">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Estimated: <strong>{job.estimatedHours || 2.0} hrs</strong>
              </span>
              {job.clockInTime && (
                <span className="flex items-center gap-1">
                  Arrived: {new Date(job.clockInTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              )}
              {job.actualDurationMinutes && (
                <span className="text-emerald-300 font-bold">
                  Total Duration: {Math.floor(job.actualDurationMinutes / 60)}h {job.actualDurationMinutes % 60}m
                </span>
              )}
            </div>

            {/* Primary Action Button */}
            {!isClockedIn && !isCompleted && (
              <button
                type="button"
                onClick={() => onClockIn(job.id)}
                className="w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:scale-98 text-brand-navy font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Play className="w-5 h-5 fill-current" />
                <span>🚗 We Have Arrived / Clock In & Start Work</span>
              </button>
            )}

            {isClockedIn && (
              <button
                type="button"
                onClick={() => onClockOut(job.id)}
                className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-98 text-brand-navy font-black text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <Square className="w-5 h-5 fill-current" />
                <span>✅ Job Completed / Clock Out</span>
              </button>
            )}

            {isCompleted && (
              <div className="py-2.5 px-3 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Job completed on site! Ready for invoice generation.</span>
              </div>
            )}
          </div>

          {/* 2. Location & Quick Contact */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Site Location</span>
                <h4 className="font-bold text-sm text-slate-900">{job.address}, {job.suburb}</h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  {job.customerName} • {job.propertyType} ({job.storeys})
                </p>
              </div>

              <a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="px-3 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Directions</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
            </div>

            {/* Quick Call / Text Actions */}
            <div className="flex gap-2 pt-1">
              <a
                href={`tel:${job.phone}`}
                className="flex-1 py-2 px-3 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600" />
                <span>Call Customer</span>
              </a>
              <a
                href={`sms:${job.phone}`}
                className="flex-1 py-2 px-3 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-sky-600" />
                <span>SMS Customer</span>
              </a>
            </div>
          </div>

          {/* 3. Scope of Work (From Quotation - NO PRICES) */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-xs text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>Scope of Work Checklist</span>
              </h4>
              <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                Package: {job.packageType || "Detailed Clean"}
              </span>
            </div>

            {/* Work Items List */}
            {job.workItems && job.workItems.length > 0 ? (
              <div className="space-y-2.5">
                {job.workItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <h5 className="font-bold text-xs text-slate-900">{item.heading || "Cleaning Service"}</h5>
                      {item.qty && item.qty > 1 && (
                        <span className="text-[10px] text-slate-500 font-semibold">(Qty: {item.qty})</span>
                      )}
                    </div>
                    <p className="text-xs text-slate-600 pl-7 whitespace-pre-wrap">{item.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                <p className="font-bold text-slate-900">{job.storeys} Full Glazing Clean</p>
                <p className="text-slate-600">
                  {job.packageType === "Basic Wash"
                    ? "Basic wash: frames wiped, cobwebs removed, streak-free pure water finish."
                    : "Detailed clean: razor scrape paint/mineral spots, deep track sand removal, frame wash, flyscreen clean."}
                </p>
                {job.hasScreens && (
                  <p className="text-emerald-700 font-medium">✓ Flyscreens included (wash and wipe).</p>
                )}
              </div>
            )}
          </div>

          {/* 4. Critical Gate Access Codes & Hazards */}
          {job.notes && job.notes.length > 0 && (
            <div className="bg-amber-50/80 p-4 rounded-xl border border-amber-200 space-y-2">
              <h4 className="font-black text-xs text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>Access Codes & Site Hazards</span>
              </h4>
              <div className="space-y-1.5">
                {job.notes.map(note => (
                  <div key={note.id} className="text-xs text-amber-900 font-medium bg-white/70 p-2 rounded-lg border border-amber-200/60">
                    {note.text}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Before Photos */}
          {job.photos && job.photos.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-bold text-xs text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-slate-500" />
                <span>Site Reference Photos ({job.photos.length})</span>
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {job.photos.map(p => (
                  <div key={p.id} className="rounded-xl overflow-hidden border border-slate-200 aspect-4/3 relative">
                    <img src={p.dataUrl} alt={p.caption} className="w-full h-full object-cover" />
                    <div className="absolute bottom-0 inset-x-0 bg-black/60 text-white p-1 text-[10px] truncate">
                      {p.caption || p.tag}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Assigned: <strong>{tech ? tech.name : "Team"}</strong>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-200 rounded-xl transition-colors"
          >
            Close Sheet
          </button>
        </div>
      </div>
    </div>
  );
}
