"use client";

import React, { useState, useRef } from "react";
import { CrmJob, CrmStage, Technician } from "@/lib/crm/types";
import JobCard from "./JobCard";
import {
  Plus,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  LayoutList,
  Columns,
  Layers,
  Sparkles
} from "lucide-react";

interface KanbanBoardProps {
  stages: CrmStage[];
  jobs: CrmJob[];
  technicians: Technician[];
  searchQuery: string;
  onJobClick: (job: CrmJob) => void;
  onJobMove: (jobId: string, targetStageId: string) => void;
  onAdvanceStage?: (job: CrmJob) => void;
  onNewJobInStage: (stageId: string) => void;
  onManageStagesClick: () => void;
  onOpenTechSheet?: (job: CrmJob) => void;
  onToggleAutoFollowUp?: (jobId: string, enabled: boolean) => void;
  onTriggerFollowUpSms?: (job: CrmJob) => void;
  onOpenFridgeSchedule?: (job: CrmJob) => void;
  onSendAdvanceNotice?: (job: CrmJob) => void;
}

const STAGE_COLOR_MAP: Record<string, { bg: string; text: string; border: string; dot: string; pill: string }> = {
  blue: { bg: "bg-blue-50/70", text: "text-blue-900", border: "border-blue-200", dot: "bg-blue-500", pill: "bg-blue-100 text-blue-900 border-blue-300" },
  purple: { bg: "bg-purple-50/70", text: "text-purple-900", border: "border-purple-200", dot: "bg-purple-500", pill: "bg-purple-100 text-purple-900 border-purple-300" },
  amber: { bg: "bg-amber-50/70", text: "text-amber-900", border: "border-amber-200", dot: "bg-amber-500", pill: "bg-amber-100 text-amber-900 border-amber-300" },
  cyan: { bg: "bg-cyan-50/70", text: "text-cyan-900", border: "border-cyan-200", dot: "bg-cyan-500", pill: "bg-cyan-100 text-cyan-900 border-cyan-300" },
  indigo: { bg: "bg-indigo-50/70", text: "text-indigo-900", border: "border-indigo-200", dot: "bg-indigo-500", pill: "bg-indigo-100 text-indigo-900 border-indigo-300" },
  emerald: { bg: "bg-emerald-50/70", text: "text-emerald-900", border: "border-emerald-200", dot: "bg-emerald-500", pill: "bg-emerald-100 text-emerald-900 border-emerald-300" },
  green: { bg: "bg-green-50/70", text: "text-green-900", border: "border-green-200", dot: "bg-green-500", pill: "bg-green-100 text-green-900 border-green-300" },
  rose: { bg: "bg-rose-50/70", text: "text-rose-900", border: "border-rose-200", dot: "bg-rose-500", pill: "bg-rose-100 text-rose-900 border-rose-300" },
  slate: { bg: "bg-slate-50/70", text: "text-slate-900", border: "border-slate-200", dot: "bg-slate-500", pill: "bg-slate-100 text-slate-900 border-slate-300" }
};

export default function KanbanBoard({
  stages,
  jobs,
  technicians,
  searchQuery,
  onJobClick,
  onJobMove,
  onAdvanceStage,
  onNewJobInStage,
  onManageStagesClick,
  onOpenTechSheet,
  onToggleAutoFollowUp,
  onTriggerFollowUpSms,
  onOpenFridgeSchedule,
  onSendAdvanceNotice
}: KanbanBoardProps) {
  const [activeDropStageId, setActiveDropStageId] = useState<string | null>(null);
  const [technicianViewMode, setTechnicianViewMode] = useState(false);
  const [selectedMobileStageId, setSelectedMobileStageId] = useState<string>(stages[0]?.id || "stage_new");
  const [mobileViewMode, setMobileViewMode] = useState<"single" | "columns">("single");

  const boardContainerRef = useRef<HTMLDivElement>(null);

  // Filter jobs by search query
  const filteredJobs = jobs.filter(job => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      job.customerName?.toLowerCase().includes(q) ||
      job.address?.toLowerCase().includes(q) ||
      job.suburb?.toLowerCase().includes(q) ||
      job.phone?.toLowerCase().includes(q) ||
      job.email?.toLowerCase().includes(q)
    );
  });

  const sortedStages = [...stages].sort((a, b) => a.order - b.order);

  // Drag & drop handlers
  const handleDragStart = (e: React.DragEvent, jobId: string) => {
    e.dataTransfer.setData("text/plain", jobId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    if (activeDropStageId !== stageId) {
      setActiveDropStageId(stageId);
    }
  };

  const handleDragLeave = (e: React.DragEvent, stageId: string) => {
    if (activeDropStageId === stageId) {
      setActiveDropStageId(null);
    }
  };

  const handleDrop = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    setActiveDropStageId(null);
    const jobId = e.dataTransfer.getData("text/plain");
    if (jobId) {
      onJobMove(jobId, stageId);
    }
  };

  // Scroll controls for desktop
  const handleScrollLeft = () => {
    if (boardContainerRef.current) {
      boardContainerRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const handleScrollRight = () => {
    if (boardContainerRef.current) {
      boardContainerRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  const scrollToStage = (stageId: string) => {
    const el = document.getElementById(`kanban-col-${stageId}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-slate-100/70">
      {/* 1. TOP PIPELINE CONTROL BAR (Desktop & Mobile) */}
      <div className="bg-white border-b border-slate-200/90 px-3 sm:px-6 py-2.5 flex items-center justify-between gap-2 shadow-xs shrink-0 z-20">
        {/* Desktop: Stage Jump Pills with Left/Right Scroll Arrows */}
        <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto py-0.5 no-scrollbar flex-1 mr-2">
          <button
            type="button"
            onClick={handleScrollLeft}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0"
            title="Scroll stages left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {sortedStages.map(stage => {
            const stageJobs = filteredJobs.filter(j => j.stageId === stage.id);
            const colors = STAGE_COLOR_MAP[stage.color] || STAGE_COLOR_MAP.blue;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => scrollToStage(stage.id)}
                className="px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200/80 flex items-center gap-1.5 shrink-0 transition-all hover:border-slate-300"
              >
                <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                <span>{stage.name}</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 font-extrabold">
                  {stageJobs.length}
                </span>
              </button>
            );
          })}

          <button
            type="button"
            onClick={handleScrollRight}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0"
            title="Scroll stages right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile: Stage Selector Pills Bar */}
        <div className="flex sm:hidden items-center gap-1.5 overflow-x-auto py-1 flex-1 no-scrollbar">
          {sortedStages.map(stage => {
            const isSelected = selectedMobileStageId === stage.id;
            const stageJobs = filteredJobs.filter(j => j.stageId === stage.id);
            const colors = STAGE_COLOR_MAP[stage.color] || STAGE_COLOR_MAP.blue;
            return (
              <button
                key={stage.id}
                type="button"
                onClick={() => setSelectedMobileStageId(stage.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all ${
                  isSelected
                    ? "bg-brand-navy text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${colors.dot}`} />
                <span>{stage.name}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${
                    isSelected ? "bg-amber-400 text-brand-navy" : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {stageJobs.length}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right Utility Controls: Tech Mode Toggle & Mobile View Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Mobile view layout toggle */}
          <div className="flex sm:hidden bg-slate-100 p-0.5 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => setMobileViewMode("single")}
              className={`p-1 rounded ${mobileViewMode === "single" ? "bg-white text-brand-navy shadow-xs" : "text-slate-400"}`}
              title="Single stage feed"
            >
              <LayoutList className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setMobileViewMode("columns")}
              className={`p-1 rounded ${mobileViewMode === "columns" ? "bg-white text-brand-navy shadow-xs" : "text-slate-400"}`}
              title="Horizontal columns"
            >
              <Columns className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Technician Mode (Hide Prices) Toggle */}
          <button
            type="button"
            onClick={() => setTechnicianViewMode(!technicianViewMode)}
            className={`px-2.5 py-1 sm:px-3 sm:py-1 rounded-xl text-xs font-bold border flex items-center gap-1.5 transition-colors ${
              technicianViewMode
                ? "bg-amber-100 text-amber-950 border-amber-300"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
            }`}
            title="Hide prices for technician view on site"
          >
            {technicianViewMode ? <EyeOff className="w-3.5 h-3.5 text-amber-700" /> : <Eye className="w-3.5 h-3.5 text-slate-400" />}
            <span className="hidden sm:inline">{technicianViewMode ? "Tech View (Prices Hidden)" : "Owner View"}</span>
          </button>
        </div>
      </div>

      {/* 2. MOBILE SINGLE-STAGE FEED (Optimized for Mobile) */}
      <div className={`sm:hidden flex-1 p-3 pb-24 overflow-y-auto space-y-3 ${mobileViewMode === "single" ? "block" : "hidden"}`}>
        {(() => {
          const activeStage = stages.find(s => s.id === selectedMobileStageId) || stages[0];
          const activeJobs = filteredJobs.filter(j => j.stageId === activeStage?.id);
          const totalVal = activeJobs.reduce((acc, j) => acc + (j.priceQuoted || 0), 0);
          const colors = STAGE_COLOR_MAP[activeStage?.color || "blue"] || STAGE_COLOR_MAP.blue;

          return (
            <div className="space-y-3">
              {/* Active Stage Header Card */}
              <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${colors.dot}`} />
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900">{activeStage?.name}</h3>
                    <p className="text-[11px] text-slate-400">{activeJobs.length} active jobs in this phase</p>
                  </div>
                </div>

                {!technicianViewMode && totalVal > 0 && (
                  <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    ${totalVal.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Cards List */}
              {activeJobs.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 border border-dashed border-slate-300 text-center space-y-2">
                  <p className="text-xs text-slate-400 font-medium">No jobs currently in {activeStage?.name}.</p>
                  <button
                    type="button"
                    onClick={() => onNewJobInStage(activeStage.id)}
                    className="px-3 py-1.5 rounded-xl bg-amber-400 text-brand-navy font-bold text-xs inline-flex items-center gap-1 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Job Here
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {activeJobs.map(job => {
                    const currentIdx = sortedStages.findIndex(s => s.id === job.stageId);
                    const nextStage = currentIdx < sortedStages.length - 1 ? sortedStages[currentIdx + 1] : null;
                    return (
                      <JobCard
                        key={job.id}
                        job={job}
                        technicians={technicians}
                        nextStage={nextStage}
                        technicianViewMode={technicianViewMode}
                        onClick={() => onJobClick(job)}
                        onDragStart={handleDragStart}
                        onAdvanceStage={onAdvanceStage}
                        onOpenTechSheet={onOpenTechSheet}
                        onToggleAutoFollowUp={onToggleAutoFollowUp}
                        onTriggerFollowUpSms={onTriggerFollowUpSms}
                        onOpenFridgeSchedule={onOpenFridgeSchedule}
                        onSendAdvanceNotice={onSendAdvanceNotice}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          );
        })()}
      </div>

      {/* 3. DESKTOP / HORIZONTAL KANBAN COLUMNS (Visible desktop scrollbar + Snap on mobile) */}
      <div
        ref={boardContainerRef}
        className={`flex-1 overflow-x-auto p-3 sm:p-5 pb-24 h-[calc(100vh-140px)] ${
          mobileViewMode === "columns" ? "flex" : "hidden sm:flex"
        } [&::-webkit-scrollbar]:h-3 [&::-webkit-scrollbar-track]:bg-slate-200/90 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-400 hover:[&::-webkit-scrollbar-thumb]:bg-slate-600 [&::-webkit-scrollbar-thumb]:rounded-full`}
      >
        <div className="flex items-start gap-3.5 min-w-max pb-3">
          {sortedStages.map((stage, sIdx) => {
            const stageJobs = filteredJobs.filter(j => j.stageId === stage.id);
            const totalValue = stageJobs.reduce((acc, j) => acc + (j.priceQuoted || 0), 0);
            const colors = STAGE_COLOR_MAP[stage.color] || STAGE_COLOR_MAP.blue;
            const isOver = activeDropStageId === stage.id;
            const nextStage = sIdx < sortedStages.length - 1 ? sortedStages[sIdx + 1] : null;

            return (
              <div
                id={`kanban-col-${stage.id}`}
                key={stage.id}
                onDragOver={e => handleDragOver(e, stage.id)}
                onDragLeave={e => handleDragLeave(e, stage.id)}
                onDrop={e => handleDrop(e, stage.id)}
                className={`w-72 sm:w-80 flex flex-col rounded-2xl bg-white border transition-all duration-200 select-none shadow-xs ${
                  isOver
                    ? "border-amber-400 ring-2 ring-amber-400/50 bg-amber-50/40"
                    : "border-slate-200/90"
                }`}
              >
                {/* Column Header */}
                <div className="p-3.5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80 rounded-t-2xl">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${colors.dot}`} />
                    <h3 className="font-extrabold text-xs sm:text-sm text-slate-800 tracking-tight">
                      {stage.name}
                    </h3>
                    <span className="text-[11px] font-extrabold px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700">
                      {stageJobs.length}
                    </span>
                  </div>

                  {/* Stage Monetary Total (Hidden in tech mode) */}
                  {!technicianViewMode && totalValue > 0 && (
                    <span className="text-[11px] font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/80">
                      ${totalValue.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Cards Container with vertical scrollbar */}
                <div className="p-2.5 flex-1 min-h-[460px] max-h-[calc(100vh-230px)] overflow-y-auto space-y-2.5 scrollbar-thin">
                  {stageJobs.map(job => (
                    <JobCard
                      key={job.id}
                      job={job}
                      technicians={technicians}
                      nextStage={nextStage}
                      technicianViewMode={technicianViewMode}
                      onClick={() => onJobClick(job)}
                      onDragStart={handleDragStart}
                      onAdvanceStage={onAdvanceStage}
                      onOpenTechSheet={onOpenTechSheet}
                      onToggleAutoFollowUp={onToggleAutoFollowUp}
                      onTriggerFollowUpSms={onTriggerFollowUpSms}
                      onOpenFridgeSchedule={onOpenFridgeSchedule}
                      onSendAdvanceNotice={onSendAdvanceNotice}
                    />
                  ))}

                  {stageJobs.length === 0 && (
                    <div className="h-32 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center p-3 text-center">
                      <span className="text-xs text-slate-400">Empty phase</span>
                      <button
                        type="button"
                        onClick={() => onNewJobInStage(stage.id)}
                        className="text-[11px] text-brand-navy font-bold hover:underline mt-1 flex items-center gap-0.5"
                      >
                        <Plus className="w-3 h-3" /> Add Lead
                      </button>
                    </div>
                  )}
                </div>

                {/* Column Quick Add Footer */}
                <div className="p-2 border-t border-slate-100 bg-slate-50/50 rounded-b-2xl">
                  <button
                    type="button"
                    onClick={() => onNewJobInStage(stage.id)}
                    className="w-full py-1.5 px-2 rounded-xl text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100/80 flex items-center justify-center gap-1 transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>New card</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
