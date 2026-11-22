"use client";

import React, { useState } from "react";
import { CrmStage } from "@/lib/crm/types";
import { X, Plus, Trash2, ArrowLeft, ArrowRight, Check } from "lucide-react";

interface ManageStagesModalProps {
  stages: CrmStage[];
  isOpen: boolean;
  onClose: () => void;
  onUpdateStages: (stages: CrmStage[]) => void;
}

const AVAILABLE_COLORS = [
  { name: "blue", hex: "#3b82f6", label: "Blue" },
  { name: "purple", hex: "#a855f7", label: "Purple" },
  { name: "amber", hex: "#f59e0b", label: "Gold / Amber" },
  { name: "cyan", hex: "#06b6d4", label: "Cyan" },
  { name: "indigo", hex: "#6366f1", label: "Indigo" },
  { name: "emerald", hex: "#10b981", label: "Emerald" },
  { name: "rose", hex: "#f43f5e", label: "Rose" },
  { name: "slate", hex: "#64748b", label: "Slate" }
];

export default function ManageStagesModal({
  stages,
  isOpen,
  onClose,
  onUpdateStages
}: ManageStagesModalProps) {
  const [localStages, setLocalStages] = useState<CrmStage[]>(stages);
  const [newStageName, setNewStageName] = useState("");
  const [newStageColor, setNewStageColor] = useState("blue");

  if (!isOpen) return null;

  const handleAddStage = () => {
    if (!newStageName.trim()) return;
    const newStage: CrmStage = {
      id: `stage_${Date.now()}`,
      name: newStageName.trim(),
      color: newStageColor,
      order: localStages.length + 1
    };
    const updated = [...localStages, newStage];
    setLocalStages(updated);
    setNewStageName("");
  };

  const handleNameChange = (id: string, name: string) => {
    setLocalStages(prev => prev.map(s => s.id === id ? { ...s, name } : s));
  };

  const handleColorChange = (id: string, color: string) => {
    setLocalStages(prev => prev.map(s => s.id === id ? { ...s, color } : s));
  };

  const handleDeleteStage = (id: string) => {
    if (localStages.length <= 1) {
      alert("You must keep at least one stage in the pipeline.");
      return;
    }
    const updated = localStages.filter(s => s.id !== id);
    setLocalStages(updated);
  };

  const handleMove = (index: number, direction: "up" | "down") => {
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= localStages.length) return;

    const copy = [...localStages];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;

    const reordered = copy.map((s, i) => ({ ...s, order: i + 1 }));
    setLocalStages(reordered);
  };

  const handleSave = () => {
    onUpdateStages(localStages);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden border border-slate-200 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-brand-navy text-white px-5 py-4 flex items-center justify-between border-b border-slate-800">
          <div>
            <h3 className="font-bold text-base text-white">Customize Pipeline Stages</h3>
            <p className="text-xs text-slate-300">Add, rename, recolor, or remove your workflow stages</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stages List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {localStages.map((stage, idx) => (
            <div
              key={stage.id}
              className="flex items-center gap-2.5 p-2.5 bg-slate-50 rounded-xl border border-slate-200"
            >
              {/* Order Buttons */}
              <div className="flex flex-col gap-0.5">
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleMove(idx, "up")}
                  className="text-slate-400 hover:text-slate-700 disabled:opacity-30 p-0.5"
                  title="Move stage left/up"
                >
                  <ArrowLeft className="w-3.5 h-3.5 rotate-90" />
                </button>
                <button
                  type="button"
                  disabled={idx === localStages.length - 1}
                  onClick={() => handleMove(idx, "down")}
                  className="text-slate-400 hover:text-slate-700 disabled:opacity-30 p-0.5"
                  title="Move stage right/down"
                >
                  <ArrowRight className="w-3.5 h-3.5 rotate-90" />
                </button>
              </div>

              {/* Stage Name Input */}
              <input
                type="text"
                value={stage.name}
                onChange={e => handleNameChange(stage.id, e.target.value)}
                className="flex-1 bg-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-slate-200 text-slate-900 focus:outline-none focus:border-brand-navy"
              />

              {/* Color Selector */}
              <select
                value={stage.color}
                onChange={e => handleColorChange(stage.id, e.target.value)}
                className="bg-white text-xs font-medium px-2 py-1.5 rounded-lg border border-slate-200 text-slate-700 focus:outline-none"
              >
                {AVAILABLE_COLORS.map(c => (
                  <option key={c.name} value={c.name}>
                    {c.label}
                  </option>
                ))}
              </select>

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => handleDeleteStage(stage.id)}
                className="text-rose-500 hover:text-rose-700 hover:bg-rose-50 p-1.5 rounded-lg transition-colors"
                title="Delete stage"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* Add New Stage Box */}
          <div className="pt-3 border-t border-slate-200">
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              + Add New Custom Stage
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={newStageName}
                onChange={e => setNewStageName(e.target.value)}
                placeholder="e.g. Awaiting Deposit, Site Visit Needed..."
                className="flex-1 bg-slate-50 text-xs px-3 py-2 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:bg-white focus:border-brand-navy"
              />
              <select
                value={newStageColor}
                onChange={e => setNewStageColor(e.target.value)}
                className="bg-slate-50 text-xs px-2.5 py-2 rounded-xl border border-slate-200 text-slate-700 focus:outline-none"
              >
                {AVAILABLE_COLORS.map(c => (
                  <option key={c.name} value={c.name}>
                    {c.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleAddStage}
                disabled={!newStageName.trim()}
                className="px-3.5 py-2 rounded-xl bg-brand-navy text-white text-xs font-bold hover:bg-slate-800 disabled:opacity-40 transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2.5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-action-gold hover:bg-amber-400 text-brand-navy shadow-sm transition-all"
          >
            Save Pipeline Changes
          </button>
        </div>
      </div>
    </div>
  );
}
