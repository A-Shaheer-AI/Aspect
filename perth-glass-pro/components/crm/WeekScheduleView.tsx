"use client";

import React, { useState } from "react";
import { CrmJob, CrmStage, Technician } from "@/lib/crm/types";
import { calculateNextDueDate } from "@/lib/crm/store";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Phone,
  CheckCircle2,
  User,
  Plus
} from "lucide-react";

interface WeekScheduleViewProps {
  jobs: CrmJob[];
  stages: CrmStage[];
  technicians: Technician[];
  onJobClick: (job: CrmJob) => void;
  onJobUpdate: (job: CrmJob) => void;
  onNewJobForDate: (dateStr: string) => void;
}

// Helpers for Week Date Math
function getStartOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0 is Sunday, 1 is Monday
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDateIso(date: Date): string {
  return date.toISOString().split("T")[0];
}

export default function WeekScheduleView({
  jobs,
  stages,
  technicians,
  onJobClick,
  onJobUpdate,
  onNewJobForDate
}: WeekScheduleViewProps) {
  const [currentWeekStart, setCurrentWeekStart] = useState<Date>(() => getStartOfWeek(new Date()));
  const [selectedTechId, setSelectedTechId] = useState<string>("all");

  const todayIso = new Date().toISOString().split("T")[0];

  // Generate 7 days (Monday to Sunday)
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const dayDate = addDays(currentWeekStart, i);
    const dayIso = formatDateIso(dayDate);
    const dayName = dayDate.toLocaleDateString("en-AU", { weekday: "short" });
    const dayNumber = dayDate.toLocaleDateString("en-AU", { day: "numeric", month: "short" });
    return {
      date: dayDate,
      iso: dayIso,
      name: dayName,
      label: dayNumber,
      isToday: dayIso === todayIso
    };
  });

  const weekEnd = addDays(currentWeekStart, 6);
  const weekLabel = `${currentWeekStart.toLocaleDateString("en-AU", { day: "numeric", month: "short" })} – ${weekEnd.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" })}`;

  const handlePrevWeek = () => setCurrentWeekStart(prev => addDays(prev, -7));
  const handleNextWeek = () => setCurrentWeekStart(prev => addDays(prev, 7));
  const handleCurrentWeek = () => setCurrentWeekStart(getStartOfWeek(new Date()));

  // Mark job as completed
  const handleMarkCompleted = (e: React.MouseEvent, job: CrmJob) => {
    e.stopPropagation();
    const completedStage = stages.find(s => s.name.toLowerCase().includes("completed")) || stages[stages.length - 1];
    const todayStr = new Date().toISOString().split("T")[0];

    const updatedJob: CrmJob = {
      ...job,
      stageId: completedStage?.id || job.stageId,
      lastCleanedDate: todayStr,
      nextDueDate: job.subscriptionFrequency !== "one_off" ? calculateNextDueDate(todayStr, job.subscriptionFrequency) : job.nextDueDate,
      updatedAt: new Date().toISOString()
    };

    onJobUpdate(updatedJob);
  };

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6 pb-24 max-w-7xl mx-auto w-full">
      {/* Schedule Top Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/90 flex flex-wrap items-center justify-between gap-3 mb-5">
        {/* Week Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrevWeek}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            title="Previous Week"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleCurrentWeek}
            className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-50 transition-colors"
          >
            This Week
          </button>
          <button
            onClick={handleNextWeek}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
            title="Next Week"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <span className="text-xs sm:text-sm font-extrabold text-brand-navy ml-1 sm:ml-2">
            {weekLabel}
          </span>
        </div>

        {/* Technician Filter */}
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-slate-400" />
          <select
            value={selectedTechId}
            onChange={e => setSelectedTechId(e.target.value)}
            className="text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none"
          >
            <option value="all">All Guys / Technicians</option>
            {technicians.map(t => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Week Grid (7 Columns on large screens, scrollable or stacked on mobile) */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3.5 items-start">
        {weekDays.map(day => {
          // Filter jobs for this day
          const dayJobs = jobs.filter(j => {
            if (j.scheduledDate !== day.iso) return false;
            if (selectedTechId !== "all" && j.assignedTechnicianId !== selectedTechId) return false;
            return true;
          });

          return (
            <div
              key={day.iso}
              className={`flex flex-col rounded-2xl bg-slate-50/80 border transition-all ${
                day.isToday
                  ? "border-amber-400 ring-2 ring-amber-400/30 bg-amber-50/20"
                  : "border-slate-200"
              }`}
            >
              {/* Day Header */}
              <div
                className={`p-3 rounded-t-2xl border-b flex items-center justify-between ${
                  day.isToday
                    ? "bg-amber-100/70 border-amber-300 text-amber-900"
                    : "bg-white border-slate-200 text-slate-800"
                }`}
              >
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider">{day.name}</span>
                  <div className="text-[11px] font-bold text-slate-500">{day.label}</div>
                </div>

                <div className="flex items-center gap-1">
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {dayJobs.length}
                  </span>
                  <button
                    onClick={() => onNewJobForDate(day.iso)}
                    className="p-1 rounded-md hover:bg-slate-200/70 text-slate-500 transition-colors"
                    title={`Add job for ${day.name}`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Day Jobs List */}
              <div className="p-2 space-y-2.5 min-h-[140px] md:min-h-[400px]">
                {dayJobs.map(job => {
                  const tech = technicians.find(t => t.id === job.assignedTechnicianId);
                  const isCompleted = stages.find(s => s.id === job.stageId)?.name.toLowerCase().includes("completed");

                  return (
                    <div
                      key={job.id}
                      onClick={() => onJobClick(job)}
                      className={`p-3 rounded-xl bg-white border shadow-xs hover:shadow-md cursor-pointer transition-all ${
                        isCompleted ? "border-emerald-200 bg-emerald-50/30 opacity-80" : "border-slate-200"
                      }`}
                    >
                      {/* Time Slot & Tech */}
                      <div className="flex items-center justify-between gap-1 text-[11px] font-bold text-sky-700 mb-1">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-sky-500" />
                          <span>{job.scheduledTimeSlot || "TBD"}</span>
                        </div>
                        {tech && (
                          <span
                            className="px-1.5 py-0.2 rounded-full text-[9px] font-extrabold text-white"
                            style={{ backgroundColor: tech.color }}
                          >
                            {tech.name.split(" ")[0]}
                          </span>
                        )}
                      </div>

                      {/* Customer Name & Price */}
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-xs text-slate-900 leading-snug line-clamp-1">
                          {job.customerName}
                        </h4>
                        {job.priceQuoted ? (
                          <span className="text-[11px] font-extrabold text-emerald-700">
                            ${job.priceQuoted}
                          </span>
                        ) : null}
                      </div>

                      {/* Address */}
                      <div className="flex items-center gap-1 text-slate-500 text-[10px] mt-1 line-clamp-1">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{job.address || job.suburb}</span>
                      </div>

                      {/* Quick Mark Completed Button */}
                      <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                        {job.phone ? (
                          <a
                            href={`tel:${job.phone}`}
                            onClick={e => e.stopPropagation()}
                            className="text-slate-400 hover:text-emerald-600 transition-colors p-1"
                            title="Call customer"
                          >
                            <Phone className="w-3 h-3" />
                          </a>
                        ) : <div />}

                        <button
                          type="button"
                          onClick={e => handleMarkCompleted(e, job)}
                          className={`text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1 transition-all ${
                            isCompleted
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                              : "bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200"
                          }`}
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          <span>{isCompleted ? "Done" : "Mark Done"}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}

                {dayJobs.length === 0 && (
                  <div
                    onClick={() => onNewJobForDate(day.iso)}
                    className="h-24 rounded-xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-white cursor-pointer transition-colors"
                  >
                    <span className="text-[11px] font-medium">Free slot</span>
                    <span className="text-[10px] text-slate-400">+ Add job</span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
