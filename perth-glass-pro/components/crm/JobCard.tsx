"use client";

import React from "react";
import { CrmJob, Technician } from "@/lib/crm/types";
import { MapPin, Calendar, Clock, Image as ImageIcon, MessageSquare, ShieldAlert, Sparkles, DollarSign } from "lucide-react";

interface JobCardProps {
  job: CrmJob;
  technicians: Technician[];
  onClick: () => void;
  onDragStart: (e: React.DragEvent, jobId: string) => void;
}

export default function JobCard({ job, technicians, onClick, onDragStart }: JobCardProps) {
  const tech = technicians.find(t => t.id === job.assignedTechnicianId);

  return (
    <div
      draggable
      onDragStart={e => onDragStart(e, job.id)}
      onClick={onClick}
      className={`group bg-white rounded-xl p-3.5 shadow-sm border border-slate-200/90 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer active:scale-[0.98] select-none ${
        job.doNotContact ? "border-l-4 border-l-rose-500" : ""
      }`}
    >
      {/* Top Header: Customer Name & Price */}
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-tight line-clamp-1 group-hover:text-brand-navy">
          {job.customerName}
        </h4>
        {job.priceQuoted ? (
          <span className="shrink-0 text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60 flex items-center">
            ${job.priceQuoted}
          </span>
        ) : null}
      </div>

      {/* Address */}
      <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-1.5 line-clamp-1">
        <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
        <span className="truncate">{job.address}, {job.suburb}</span>
      </div>

      {/* Scope Badges */}
      <div className="flex flex-wrap items-center gap-1 mt-2.5">
        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
          {job.storeys}
        </span>
        {job.packageType && (
          <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
            {job.packageType}
          </span>
        )}
        {job.doNotContact && (
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 border border-rose-300 flex items-center gap-0.5">
            <ShieldAlert className="w-3 h-3 text-rose-600" />
            DNC
          </span>
        )}
      </div>

      {/* Scheduled Time & Technician */}
      {job.scheduledDate && (
        <div className="flex items-center gap-2 mt-2.5 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
          <div className="flex items-center gap-1 text-sky-700 font-medium">
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

      {/* Bottom Footer: Technician & Photos/Notes count */}
      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100 text-[10px] text-slate-400">
        <div className="flex items-center gap-2">
          {job.photos && job.photos.length > 0 && (
            <span className="flex items-center gap-0.5 text-slate-500">
              <ImageIcon className="w-3 h-3 text-slate-400" />
              {job.photos.length}
            </span>
          )}
          {job.notes && job.notes.length > 0 && (
            <span className="flex items-center gap-0.5 text-slate-500">
              <MessageSquare className="w-3 h-3 text-slate-400" />
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
    </div>
  );
}
