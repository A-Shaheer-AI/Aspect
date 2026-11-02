"use client";

import React, { useState } from "react";
import { CrmJob, CrmStage, Technician } from "@/lib/crm/types";
import JobCard from "./JobCard";
import { Plus, SlidersHorizontal, Layers } from "lucide-react";

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
}

const STAGE_COLOR_MAP: Record<string, { bg: string; text: string; border: string; dot: string }> = {
  blue: { bg: "bg-blue-50", text: "text-blue-900", border: "border-blue-200", dot: "bg-blue-500" },
  purple: { bg: "bg-purple-50", text: "text-purple-900", border: "border-purple-200", dot: "bg-purple-500" },
  amber: { bg: "bg-amber-50", text: "text-amber-900", border: "border-amber-200", dot: "bg-amber-500" },
  cyan: { bg: "bg-cyan-50", text: "text-cyan-900", border: "border-cyan-200", dot: "bg-cyan-500" },
  indigo: { bg: "bg-indigo-50", text: "text-indigo-900", border: "border-indigo-200", dot: "bg-indigo-500" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-900", border: "border-emerald-200", dot: "bg-emerald-500" },
  green: { bg: "bg-green-50", text: "text-green-900", border: "border-green-200", dot: "bg-green-500" },
  rose: { bg: "bg-rose-50", text: "text-rose-900", border: "border-rose-200", dot: "bg-rose-500" },
  slate: { bg: "bg-slate-50", text: "text-slate-900", border: "border-slate-200", dot: "bg-slate-500" }
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
  onManageStagesClick
}: KanbanBoardProps) {
  const [activeDropStageId, setActiveDropStageId] = useState<string | null>(null);

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
    // Only clear if leaving the column boundary
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

  const sortedStages = [...stages].sort((a, b) => a.order - b.order);

  return (
    <div className="flex-1 overflow-x-auto p-4 sm:p-6 pb-24 scrollbar-thin">
      <div className="flex items-start gap-4 min-w-max">
        {sortedStages.map((stage, sIdx) => {
          const stageJobs = filteredJobs.filter(j => j.stageId === stage.id);
          const totalValue = stageJobs.reduce((acc, j) => acc + (j.priceQuoted || 0), 0);
          const colors = STAGE_COLOR_MAP[stage.color] || STAGE_COLOR_MAP.blue;
          const isOver = activeDropStageId === stage.id;
          const nextStage = sIdx < sortedStages.length - 1 ? sortedStages[sIdx + 1] : null;

          return (
            <div
              key={stage.id}
              onDragOver={e => handleDragOver(e, stage.id)}
              onDragLeave={e => handleDragLeave(e, stage.id)}
              onDrop={e => handleDrop(e, stage.id)}
              className={`w-72 sm:w-80 flex flex-col rounded-2xl bg-slate-100/90 border transition-all duration-200 select-none ${
                isOver
                  ? "border-amber-400 ring-2 ring-amber-400/50 bg-amber-50/40"
                  : "border-slate-200/80 shadow-xs"
              }`}
            >
              {/* Column Header */}
              <div className="p-3.5 border-b border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${colors.dot}`} />
                  <h3 className="font-extrabold text-xs sm:text-sm text-slate-800 tracking-tight">
                    {stage.name}
                  </h3>
                  <span className="text-[11px] font-bold px-1.5 py-0.5 rounded-full bg-slate-200/80 text-slate-700">
                    {stageJobs.length}
                  </span>
                </div>

                {/* Stage Monetary Total */}
                {totalValue > 0 && (
                  <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                    ${totalValue.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Cards Container */}
              <div className="p-2.5 flex-1 min-h-[450px] max-h-[calc(100vh-210px)] overflow-y-auto space-y-2.5 scrollbar-thin">
                {stageJobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    technicians={technicians}
                    nextStage={nextStage}
                    onClick={() => onJobClick(job)}
                    onDragStart={handleDragStart}
                    onAdvanceStage={onAdvanceStage}
                  />
                ))}

                {stageJobs.length === 0 && (
                  <div
                    onClick={() => onNewJobInStage(stage.id)}
                    className="h-28 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center text-slate-400 hover:text-slate-600 hover:border-slate-400 hover:bg-white/50 cursor-pointer transition-colors"
                  >
                    <Plus className="w-5 h-5 mb-1 opacity-60" />
                    <span className="text-xs font-semibold">Drop job or tap to add</span>
                  </div>
                )}
              </div>

              {/* Column Footer: Quick Add */}
              <div className="p-2 border-t border-slate-200/80 bg-slate-50/70 rounded-b-2xl">
                <button
                  type="button"
                  onClick={() => onNewJobInStage(stage.id)}
                  className="w-full py-1.5 px-3 rounded-xl text-xs font-bold text-slate-600 hover:text-brand-navy hover:bg-white flex items-center justify-center gap-1.5 transition-colors border border-transparent hover:border-slate-200"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Job to {stage.name}</span>
                </button>
              </div>
            </div>
          );
        })}

        {/* Manage / Add Custom Stage Box */}
        <div
          onClick={onManageStagesClick}
          className="w-72 sm:w-80 h-36 rounded-2xl border-2 border-dashed border-slate-300 hover:border-amber-400 hover:bg-amber-50/30 flex flex-col items-center justify-center text-slate-400 hover:text-amber-800 cursor-pointer transition-all duration-200 shrink-0 group select-none"
        >
          <div className="w-10 h-10 rounded-full bg-slate-200 group-hover:bg-amber-200 flex items-center justify-center mb-2 transition-colors">
            <SlidersHorizontal className="w-5 h-5 text-slate-500 group-hover:text-amber-800" />
          </div>
          <span className="text-xs font-bold">Customize Stages</span>
          <span className="text-[11px] text-slate-400 group-hover:text-amber-700/80">Add, rename or recolor</span>
        </div>
      </div>
    </div>
  );
}
