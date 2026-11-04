"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  CrmJob,
  Technician,
  JobPhoto
} from "@/lib/crm/types";
import {
  DEFAULT_TECHNICIANS,
  INITIAL_SEED_JOBS
} from "@/lib/crm/store";
import {
  MapPin,
  Phone,
  Clock,
  Play,
  Square,
  CheckCircle,
  ExternalLink,
  ShieldAlert,
  Camera,
  Layers,
  Sparkles,
  AlertTriangle,
  ChevronRight,
  Info,
  Calendar,
  CheckSquare,
  Square as SquareIcon,
  RefreshCw,
  Home,
  Trash2
} from "lucide-react";
import Link from "next/link";

const STORAGE_KEYS = {
  JOBS: "aspect_crm_jobs"
};

export default function TechPortalPage() {
  const [jobs, setJobs] = useState<CrmJob[]>([]);
  const [selectedTechId, setSelectedTechId] = useState<string>("tech_josh");
  const [isHydrated, setIsHydrated] = useState(false);
  const [activeJobId, setActiveJobId] = useState<string | null>(null);

  // Photo capture state for active job
  const [photoTag, setPhotoTag] = useState<"before" | "after" | "hazard">("before");
  const [photoCaption, setPhotoCaption] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Live timer tick
  const [nowTimestamp, setNowTimestamp] = useState<number>(Date.now());

  useEffect(() => {
    const timer = setInterval(() => setNowTimestamp(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 1. Load jobs from localStorage
  useEffect(() => {
    try {
      const storedJobs = localStorage.getItem(STORAGE_KEYS.JOBS);
      if (storedJobs) {
        setJobs(JSON.parse(storedJobs));
      } else {
        setJobs(INITIAL_SEED_JOBS);
      }
    } catch (e) {
      console.error("Failed to load jobs in Tech Portal:", e);
      setJobs(INITIAL_SEED_JOBS);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // 2. Persist jobs whenever updated
  const saveJobs = (newJobs: CrmJob[]) => {
    setJobs(newJobs);
    try {
      localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(newJobs));
    } catch (e) {
      console.error("Failed to save jobs in Tech Portal:", e);
    }
  };

  // Clock In handler: records arrival and moves job to in progress
  const handleClockIn = (jobId: string) => {
    const nowIso = new Date().toISOString();
    const updated = jobs.map(j => {
      if (j.id !== jobId) return j;
      return {
        ...j,
        stageId: "stage_in_progress",
        clockInTime: nowIso,
        clockOutTime: undefined,
        actualDurationMinutes: undefined,
        updatedAt: nowIso
      };
    });
    saveJobs(updated);
  };

  // Clock Out handler: marks completed and calculates actual duration
  const handleClockOut = (jobId: string) => {
    const nowIso = new Date().toISOString();
    const updated = jobs.map(j => {
      if (j.id !== jobId) return j;
      const startTime = j.clockInTime ? new Date(j.clockInTime).getTime() : Date.now();
      const durationMins = Math.max(1, Math.round((Date.now() - startTime) / (1000 * 60)));
      return {
        ...j,
        stageId: "stage_completed",
        clockOutTime: nowIso,
        actualDurationMinutes: durationMins,
        updatedAt: nowIso
      };
    });
    saveJobs(updated);
  };

  // Add Photo handler
  const handleAddPhoto = (jobId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const newPhoto: JobPhoto = {
        id: `photo_tech_${Date.now()}`,
        dataUrl: reader.result as string,
        caption: photoCaption.trim() || `${photoTag.toUpperCase()} Photo`,
        tag: photoTag,
        createdAt: new Date().toISOString()
      };

      const updated = jobs.map(j => {
        if (j.id !== jobId) return j;
        return {
          ...j,
          photos: [newPhoto, ...(j.photos || [])],
          updatedAt: new Date().toISOString()
        };
      });

      saveJobs(updated);
      setPhotoCaption("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    };
    reader.readAsDataURL(file);
  };

  // Delete Photo
  const handleDeletePhoto = (jobId: string, photoId: string) => {
    const updated = jobs.map(j => {
      if (j.id !== jobId) return j;
      return {
        ...j,
        photos: (j.photos || []).filter(p => p.id !== photoId),
        updatedAt: new Date().toISOString()
      };
    });
    saveJobs(updated);
  };

  // Filter jobs for selected technician that are booked or in progress (plus completed today)
  const techJobs = jobs.filter(j => {
    if (selectedTechId !== "all" && j.assignedTechnicianId !== selectedTechId) {
      return false;
    }
    return (
      j.stageId === "stage_booked" ||
      j.stageId === "stage_in_progress" ||
      j.stageId === "stage_completed"
    );
  });

  const selectedTech = DEFAULT_TECHNICIANS.find(t => t.id === selectedTechId) || DEFAULT_TECHNICIANS[1];

  const formatElapsed = (startTimeIso: string) => {
    const diff = Math.max(0, Math.floor((nowTimestamp - new Date(startTimeIso).getTime()) / 1000));
    const h = Math.floor(diff / 3600);
    const m = Math.floor((diff % 3600) / 60);
    const s = diff % 60;
    if (h > 0) {
      return `${h}h ${m}m ${s < 10 ? "0" : ""}${s}s`;
    }
    return `${m}m ${s < 10 ? "0" : ""}${s}s`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Mobile Bar */}
      <header className="sticky top-0 z-30 bg-slate-900 border-b border-slate-800 px-4 py-3 shadow-md">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-brand-navy flex items-center justify-center font-black text-sm shadow-sm">
              ⚡
            </div>
            <div>
              <h1 className="font-extrabold text-sm tracking-tight text-white flex items-center gap-2">
                Aspect Field Ops
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Tech Portal
                </span>
              </h1>
              <p className="text-[11px] text-slate-400">Zero-Financial Field Job Execution</p>
            </div>
          </div>

          <Link
            href="/crm"
            className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CRM Office</span>
          </Link>
        </div>
      </header>

      {/* Technician Switcher Bar */}
      <div className="bg-slate-900/80 border-b border-slate-800/80 px-4 py-2.5">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold text-slate-400 shrink-0">Operator:</span>
          <div className="flex items-center gap-1.5 shrink-0">
            {DEFAULT_TECHNICIANS.map(t => {
              const isSelected = selectedTechId === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelectedTechId(t.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-amber-400 text-slate-950 shadow-xs"
                      : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
                  <span>{t.name.split(" ")[0]}</span>
                </button>
              );
            })}
            <button
              onClick={() => setSelectedTechId("all")}
              className={`px-3 py-1 rounded-xl text-xs font-extrabold transition-all ${
                selectedTechId === "all"
                  ? "bg-amber-400 text-slate-950 shadow-xs"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700"
              }`}
            >
              All Techs
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-2xl w-full mx-auto p-3 sm:p-5 space-y-4 pb-20">
        {/* Active Dispatches Banner */}
        <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Active Run Sheet
            </span>
            <h2 className="text-base font-extrabold text-white mt-0.5">
              {techJobs.length} Assigned Dispatch{techJobs.length === 1 ? "" : "es"}
            </h2>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            🔒 Prices Hidden
          </span>
        </div>

        {/* Jobs List */}
        {techJobs.length === 0 ? (
          <div className="bg-slate-900 rounded-2xl p-10 border border-dashed border-slate-800 text-center space-y-2">
            <p className="text-sm font-semibold text-slate-400">No active dispatches assigned to {selectedTech?.name || "you"}.</p>
            <p className="text-xs text-slate-500">Check with Ahmed / Office dispatch for upcoming bookings.</p>
          </div>
        ) : (
          techJobs.map(job => {
            const isClockedIn = Boolean(job.clockInTime && !job.clockOutTime);
            const isCompleted = Boolean(job.clockOutTime);
            const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${job.address}, ${job.suburb} WA`)}`;
            const isExpanded = activeJobId === job.id || isClockedIn;

            return (
              <div
                key={job.id}
                className={`bg-slate-900 rounded-2xl border transition-all duration-200 overflow-hidden shadow-md ${
                  isClockedIn
                    ? "border-emerald-500 ring-2 ring-emerald-500/30"
                    : isCompleted
                    ? "border-slate-800 opacity-90"
                    : "border-slate-800 hover:border-slate-700"
                }`}
              >
                {/* Job Card Header */}
                <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-900/50">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        {isClockedIn && (
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        )}
                        <h3 className="font-black text-base sm:text-lg text-white">
                          {job.customerName}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {job.storeys} • {job.packageType || "Detailed Clean"}
                      </p>
                    </div>

                    {/* Status Pill */}
                    <div>
                      {isClockedIn ? (
                        <span className="px-2.5 py-1 rounded-full text-xs font-black bg-emerald-500 text-slate-950 flex items-center gap-1 shadow-xs animate-pulse">
                          <Clock className="w-3.5 h-3.5" />
                          <span>ON SITE</span>
                        </span>
                      ) : isCompleted ? (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-800 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>COMPLETED</span>
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>SCHEDULED</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Scheduled Slot */}
                  {job.scheduledTimeSlot && (
                    <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mt-2.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Arrival Window: {job.scheduledTimeSlot}</span>
                    </div>
                  )}

                  {/* Address */}
                  <div className="flex items-center gap-1.5 text-slate-300 text-xs sm:text-sm mt-2 font-medium">
                    <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{job.address}, {job.suburb}</span>
                  </div>

                  {/* 1-Tap Google Maps & Click-to-Call Action Buttons */}
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <a
                      href={mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-98 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>Open in Maps</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>

                    {job.phone ? (
                      <a
                        href={`tel:${job.phone}`}
                        className="py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-xs transition-all"
                      >
                        <Phone className="w-4 h-4" />
                        <span>Call Customer</span>
                      </a>
                    ) : (
                      <button
                        disabled
                        className="py-2.5 px-3 rounded-xl bg-slate-800 text-slate-500 font-bold text-xs flex items-center justify-center gap-2 cursor-not-allowed"
                      >
                        <Phone className="w-4 h-4" />
                        <span>No Phone</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Clock-In / Live Arrival Timer & Clock-Out Section */}
                <div className="p-4 bg-slate-900/90 border-b border-slate-800">
                  {isClockedIn ? (
                    <div className="bg-emerald-950/60 border border-emerald-500/40 rounded-xl p-3.5 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-black uppercase text-emerald-400 tracking-wider block">
                            Live Elapsed On Site
                          </span>
                          <span className="text-xl sm:text-2xl font-mono font-black text-emerald-300">
                            ⏱️ {formatElapsed(job.clockInTime!)}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400">
                          Est: ~{job.estimatedHours || 2.0} hrs
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleClockOut(job.id)}
                        className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                      >
                        <Square className="w-4 h-4 fill-white" />
                        <span>✅ Complete Job / Clock Out</span>
                      </button>
                    </div>
                  ) : isCompleted ? (
                    <div className="bg-slate-800/60 rounded-xl p-3 flex items-center justify-between text-xs text-slate-300">
                      <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                        <CheckCircle className="w-4 h-4" />
                        Clean Completed
                      </span>
                      {job.actualDurationMinutes && (
                        <span className="font-semibold text-slate-400">
                          Total Time: {Math.floor(job.actualDurationMinutes / 60)}h {job.actualDurationMinutes % 60}m
                        </span>
                      )}
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleClockIn(job.id)}
                      className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-black text-sm flex items-center justify-center gap-2 shadow-md transition-all"
                    >
                      <Play className="w-4 h-4 fill-white" />
                      <span>🚗 We Have Arrived / Clock In</span>
                    </button>
                  )}
                </div>

                {/* Scope & Property Access Details */}
                <div className="p-4 sm:p-5 space-y-4">
                  {/* Gate Codes & Hazards Alert */}
                  {job.notes && job.notes.length > 0 && (
                    <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-3 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-black text-amber-300">
                        <ShieldAlert className="w-4 h-4 text-amber-400" />
                        <span>Site Access & Hazards:</span>
                      </div>
                      <div className="space-y-1 pl-5">
                        {job.notes.map(note => (
                          <p key={note.id} className="text-xs text-amber-100/90 font-medium">
                            • {note.text}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Work Scope Checklist */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckSquare className="w-3.5 h-3.5 text-amber-400" />
                      <span>Standard Glazing Scope Checklist</span>
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-300">
                      <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>External Glass (Pure Water Wash)</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Internal Glass & Squeegee Detail</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Flyscreens Cleaned & Re-seated</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Sliding Door Tracks Detailed</span>
                      </div>
                      <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/60 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>Window Sills & External Frames Wiped</span>
                      </div>
                      {job.interestedServices?.includes("Solar Panels") && (
                        <div className="p-2 rounded-lg bg-amber-950/60 border border-amber-600/60 text-amber-200 flex items-center gap-2 font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span>Solar Panel Array Wash</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Before & After Photo Capture Section */}
                  <div className="pt-2 border-t border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-black text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                        <Camera className="w-3.5 h-3.5 text-sky-400" />
                        <span>Site Photos ({job.photos?.length || 0})</span>
                      </h4>
                      <span className="text-[10px] text-slate-500">Attach Before, After & Hazards</span>
                    </div>

                    {/* Camera / Upload Controls */}
                    <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/80 space-y-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-400">Tag:</span>
                        {(["before", "after", "hazard"] as const).map(tag => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => setPhotoTag(tag)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-extrabold uppercase transition-all ${
                              photoTag === tag
                                ? tag === "before"
                                  ? "bg-amber-400 text-slate-950"
                                  : tag === "after"
                                  ? "bg-emerald-400 text-slate-950"
                                  : "bg-rose-500 text-white"
                                : "bg-slate-700 text-slate-300"
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={photoCaption}
                          onChange={e => setPhotoCaption(e.target.value)}
                          placeholder="Optional notes (e.g. Broken latch or scratched glass)..."
                          className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400"
                        />
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3.5 py-1.5 rounded-xl bg-sky-500 hover:bg-sky-400 active:scale-95 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-sm transition-all"
                        >
                          <Camera className="w-3.5 h-3.5" />
                          <span>Take Photo</span>
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          capture="environment"
                          onChange={e => handleAddPhoto(job.id, e)}
                          className="hidden"
                        />
                      </div>
                    </div>

                    {/* Photo Thumbnails */}
                    {job.photos && job.photos.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {job.photos.map(p => (
                          <div
                            key={p.id}
                            className="relative group rounded-xl overflow-hidden border border-slate-700 bg-slate-800 aspect-video"
                          >
                            <img
                              src={p.dataUrl}
                              alt={p.caption}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex flex-col justify-end p-2">
                              <span
                                className={`self-start text-[9px] font-black uppercase px-1.5 py-0.2 rounded-md ${
                                  p.tag === "before"
                                    ? "bg-amber-400 text-slate-950"
                                    : p.tag === "after"
                                    ? "bg-emerald-400 text-slate-950"
                                    : "bg-rose-500 text-white"
                                }`}
                              >
                                {p.tag}
                              </span>
                              <p className="text-[10px] text-white font-medium truncate mt-0.5">
                                {p.caption}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDeletePhoto(job.id, p.id)}
                              className="absolute top-1.5 right-1.5 p-1 rounded-md bg-rose-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Delete photo"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </main>
    </div>
  );
}
