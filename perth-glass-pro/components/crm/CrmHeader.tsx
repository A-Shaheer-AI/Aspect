"use client";

import React, { useState } from "react";
import { Plus, Search, Download, Upload, SlidersHorizontal, Sparkles, Check, Database, RefreshCw, Globe, Smartphone } from "lucide-react";

interface CrmHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onNewJobClick: () => void;
  onManageStagesClick: () => void;
  onExportBackup: () => void;
  onImportBackup: (file: File) => void;
  onSyncWebsiteLeads?: () => void;
  isSyncingLeads?: boolean;
  syncedLeadsCount?: number;
}

export default function CrmHeader({
  searchQuery,
  onSearchChange,
  onNewJobClick,
  onManageStagesClick,
  onExportBackup,
  onImportBackup,
  onSyncWebsiteLeads,
  isSyncingLeads,
  syncedLeadsCount
}: CrmHeaderProps) {
  const [showBackupMenu, setShowBackupMenu] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImportBackup(file);
      setShowBackupMenu(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-brand-navy text-white border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Logo & Offline Status Badge */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center border border-amber-400/40 shadow-inner">
              <Sparkles className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-base tracking-tight leading-tight">Aspect CRM</h1>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Offline Ready
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">Perth Job Operations & AI Invoicing</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Dedicated Field Tech Portal */}
            <a
              href="/tech"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-indigo-950/70 hover:bg-indigo-900/80 text-indigo-300 text-xs font-semibold flex items-center gap-1.5 border border-indigo-500/40 transition-colors shadow-2xs"
              title="Open field technician portal (prices excluded)"
            >
              <Smartphone className="w-3.5 h-3.5 text-indigo-400" />
              <span className="hidden sm:inline">Tech Portal</span>
            </a>

            {/* Sync Website Leads */}
            {onSyncWebsiteLeads && (
              <button
                onClick={onSyncWebsiteLeads}
                disabled={isSyncingLeads}
                className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 border border-emerald-500/40 transition-colors disabled:opacity-50"
                title="Pull latest inquiries from website forms & live chat"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isSyncingLeads ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">Sync Web Leads</span>
                {syncedLeadsCount !== undefined && syncedLeadsCount > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full bg-emerald-500/30 text-emerald-200 text-[10px] font-black">
                    {syncedLeadsCount}
                  </span>
                )}
              </button>
            )}

            {/* Manage Stages */}
            <button
              onClick={onManageStagesClick}
              className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
              title="Manage Pipeline Stages"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Stages</span>
            </button>

            {/* Backup / Export Menu Toggle */}
            <div className="relative">
              <button
                onClick={() => setShowBackupMenu(!showBackupMenu)}
                className="p-2 sm:px-3 sm:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 transition-colors"
                title="Backup & Restore"
              >
                <Database className="w-4 h-4 text-sky-400" />
                <span className="hidden sm:inline">Backup</span>
              </button>

              {showBackupMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-200 py-1.5 text-slate-800 z-50 text-xs font-medium animate-in fade-in zoom-in-95">
                  <button
                    onClick={() => {
                      onExportBackup();
                      setShowBackupMenu(false);
                    }}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                  >
                    <Download className="w-3.5 h-3.5 text-emerald-600" />
                    Export Backup (JSON)
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full text-left px-3.5 py-2 hover:bg-slate-50 flex items-center gap-2 text-slate-700"
                  >
                    <Upload className="w-3.5 h-3.5 text-sky-600" />
                    Restore from File
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>
              )}
            </div>

            {/* + New Job Quick Button */}
            <button
              onClick={onNewJobClick}
              className="px-3.5 py-1.5 rounded-lg bg-action-gold hover:bg-amber-400 text-brand-navy font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>New Job</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-2.5">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              placeholder="Search by customer, street address, suburb, or phone..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900/80 rounded-xl text-xs text-white placeholder:text-slate-500 border border-slate-700/80 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-colors"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
