"use client";

import React, { useState } from "react";
import { CrmJob, Technician } from "@/lib/crm/types";
import {
  X,
  Calendar,
  Clock,
  User,
  ArrowRight,
  CheckCircle,
  Sparkles
} from "lucide-react";

interface BookingPromptModalProps {
  job: CrmJob | null;
  technicians: Technician[];
  isOpen: boolean;
  onClose: () => void;
  onConfirmBooking: (
    jobId: string,
    scheduledDate: string,
    scheduledTimeSlot: string,
    assignedTechnicianId: string,
    estimatedHours: number
  ) => void;
}

export default function BookingPromptModal({
  job,
  technicians,
  isOpen,
  onClose,
  onConfirmBooking
}: BookingPromptModalProps) {
  const [scheduledDate, setScheduledDate] = useState("");
  const [scheduledTimeSlot, setScheduledTimeSlot] = useState("08:30 - 11:30 AM");
  const [assignedTechnicianId, setAssignedTechnicianId] = useState("");
  const [estimatedHours, setEstimatedHours] = useState<number>(2.5);

  React.useEffect(() => {
    if (job) {
      // Default to job's current date or tomorrow
      if (job.scheduledDate) {
        setScheduledDate(job.scheduledDate);
      } else {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        setScheduledDate(tomorrow.toISOString().split("T")[0]);
      }

      setScheduledTimeSlot(job.scheduledTimeSlot || "08:30 - 11:30 AM");
      setAssignedTechnicianId(job.assignedTechnicianId || technicians[0]?.id || "");
      
      // Default estimated time based on storeys
      if (job.estimatedHours) {
        setEstimatedHours(job.estimatedHours);
      } else if (job.storeys === "Double Storey") {
        setEstimatedHours(3.0);
      } else if (job.storeys === "Multi Storey") {
        setEstimatedHours(5.0);
      } else {
        setEstimatedHours(1.5);
      }
    }
  }, [job, technicians, isOpen]);

  if (!isOpen || !job) return null;

  const handleQuickDate = (daysAhead: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysAhead);
    setScheduledDate(d.toISOString().split("T")[0]);
  };

  const handleQuickNextDayOfWeek = (targetDay: number) => {
    // 0 = Sunday, 1 = Monday, 6 = Saturday
    const d = new Date();
    const currentDay = d.getDay();
    let diff = targetDay - currentDay;
    if (diff <= 0) diff += 7;
    d.setDate(d.getDate() + diff);
    setScheduledDate(d.toISOString().split("T")[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scheduledDate) {
      alert("Please choose a booking date.");
      return;
    }
    onConfirmBooking(
      job.id,
      scheduledDate,
      scheduledTimeSlot,
      assignedTechnicianId,
      estimatedHours
    );
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden border border-slate-200">
        {/* Header */}
        <div className="bg-brand-navy text-white px-5 py-4 flex items-center justify-between border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <h3 className="font-bold text-base text-white">Book Job & Schedule Dispatch</h3>
            </div>
            <p className="text-xs text-slate-300">
              Booking <strong>{job.customerName}</strong> ({job.address || job.suburb})
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="bg-cyan-50/70 border border-cyan-200 rounded-xl p-3 text-xs text-cyan-950 leading-relaxed">
            <span className="font-bold block mb-0.5">Scheduling Confirmation:</span>
            Pick the service booking date. This will immediately place the job onto the <strong>Week&apos;s Schedule</strong> view for your team.
          </div>

          {/* 1. Booking Date */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700">
              Booking Date *
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-cyan-600 absolute left-3 top-3" />
              <input
                type="date"
                required
                value={scheduledDate}
                onChange={e => setScheduledDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm font-bold text-slate-900 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-brand-navy"
              />
            </div>

            {/* Quick Date Presets */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => handleQuickDate(0)}
                className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-100 hover:bg-cyan-100 text-slate-700 hover:text-cyan-900 transition-colors"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => handleQuickDate(1)}
                className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-100 hover:bg-cyan-100 text-slate-700 hover:text-cyan-900 transition-colors"
              >
                Tomorrow
              </button>
              <button
                type="button"
                onClick={() => handleQuickNextDayOfWeek(6)}
                className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-100 hover:bg-cyan-100 text-slate-700 hover:text-cyan-900 transition-colors"
              >
                This Saturday
              </button>
              <button
                type="button"
                onClick={() => handleQuickNextDayOfWeek(1)}
                className="px-2.5 py-1 text-[11px] font-semibold rounded-lg bg-slate-100 hover:bg-cyan-100 text-slate-700 hover:text-cyan-900 transition-colors"
              >
                Next Monday
              </button>
            </div>
          </div>

          {/* 2. Scheduled Time Window */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">
              Time Window Slot
            </label>
            <div className="relative">
              <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={scheduledTimeSlot}
                onChange={e => setScheduledTimeSlot(e.target.value)}
                placeholder="e.g. 08:30 - 11:30 AM"
                className="w-full pl-9 pr-3 py-2 text-xs font-semibold rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:border-brand-navy"
              />
            </div>
            {/* Quick Slot Presets */}
            <div className="flex flex-wrap gap-1.5">
              {["08:00 - 11:00 AM", "11:30 - 02:30 PM", "03:00 - 05:30 PM", "All Day"].map(slot => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setScheduledTimeSlot(slot)}
                  className={`px-2 py-0.5 rounded text-[10px] font-medium transition-colors ${
                    scheduledTimeSlot === slot
                      ? "bg-cyan-600 text-white font-bold"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Assigned Guy / Technician */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Assigned Technician
              </label>
              <select
                value={assignedTechnicianId}
                onChange={e => setAssignedTechnicianId(e.target.value)}
                className="w-full text-xs font-semibold px-3 py-2 rounded-xl border border-slate-200 bg-white"
              >
                <option value="">-- Unassigned --</option>
                {technicians.map(t => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Estimated Time (Hours)
              </label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                max="12"
                value={estimatedHours}
                onChange={e => setEstimatedHours(parseFloat(e.target.value) || 2.0)}
                className="w-full text-xs font-black px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800"
              />
            </div>
          </div>

          {/* Job Summary Banner */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
            <div className="flex justify-between text-slate-600">
              <span>Customer:</span>
              <span className="font-bold text-slate-900">{job.customerName}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Address:</span>
              <span className="font-semibold text-slate-800">{job.address}, {job.suburb}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Property:</span>
              <span className="font-semibold text-slate-800">{job.storeys} • {job.packageType || "Standard Clean"}</span>
            </div>
          </div>

          {/* Footer Buttons */}
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
              className="px-5 py-2.5 text-xs font-bold bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl shadow-sm flex items-center gap-1.5 transition-all"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Confirm Booking & Schedule</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
