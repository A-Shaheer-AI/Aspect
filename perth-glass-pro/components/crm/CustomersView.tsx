"use client";

import React, { useState } from "react";
import { CrmJob, Technician } from "@/lib/crm/types";
import {
  Users,
  Search,
  Phone,
  MessageSquare,
  MapPin,
  ShieldAlert,
  Calendar,
  UserPlus,
  Trash2,
  Check,
  Building,
  Briefcase
} from "lucide-react";

interface CustomersViewProps {
  jobs: CrmJob[];
  technicians: Technician[];
  onJobClick: (job: CrmJob) => void;
  onJobUpdate: (job: CrmJob) => void;
  onUpdateTechnicians: (technicians: Technician[]) => void;
}

const TECH_COLORS = [
  "#f59e0b", // Amber
  "#3b82f6", // Blue
  "#10b981", // Emerald
  "#8b5cf6", // Purple
  "#ec4899", // Pink
  "#06b6d4", // Cyan
  "#f97316"  // Orange
];

export default function CustomersView({
  jobs,
  technicians,
  onJobClick,
  onJobUpdate,
  onUpdateTechnicians
}: CustomersViewProps) {
  const [activeTab, setActiveTab] = useState<"customers" | "team">("customers");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDncOnly, setFilterDncOnly] = useState(false);

  // New Technician form state
  const [newTechName, setNewTechName] = useState("");
  const [newTechPhone, setNewTechPhone] = useState("");
  const [newTechColor, setNewTechColor] = useState(TECH_COLORS[0]);

  const handleToggleDnc = (job: CrmJob) => {
    const updated: CrmJob = {
      ...job,
      doNotContact: !job.doNotContact,
      updatedAt: new Date().toISOString()
    };
    onJobUpdate(updated);
  };

  const handleAddTechnician = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTechName.trim()) return;

    const newTech: Technician = {
      id: `tech_${Date.now()}`,
      name: newTechName.trim(),
      phone: newTechPhone.trim() || "0400 000 000",
      color: newTechColor
    };

    onUpdateTechnicians([...technicians, newTech]);
    setNewTechName("");
    setNewTechPhone("");
  };

  const handleDeleteTechnician = (id: string) => {
    if (technicians.length <= 1) {
      alert("Must keep at least one technician.");
      return;
    }
    if (confirm("Delete this technician?")) {
      onUpdateTechnicians(technicians.filter(t => t.id !== id));
    }
  };

  const filteredJobs = jobs.filter(job => {
    if (filterDncOnly && !job.doNotContact) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        job.customerName?.toLowerCase().includes(q) ||
        job.address?.toLowerCase().includes(q) ||
        job.suburb?.toLowerCase().includes(q) ||
        job.phone?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6 pb-24 max-w-5xl mx-auto w-full">
      {/* Header Tabs */}
      <div className="flex items-center justify-between gap-3 mb-5 border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("customers")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "customers"
                ? "bg-brand-navy text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Customers Directory ({jobs.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("team")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "team"
                ? "bg-brand-navy text-white shadow-xs"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Team & Technicians ({technicians.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: CUSTOMERS DIRECTORY */}
      {activeTab === "customers" && (
        <div className="space-y-4">
          {/* Search & DNC Filter Strip */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search customers by name, address, or phone..."
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:border-brand-navy"
              />
            </div>

            <label className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={filterDncOnly}
                onChange={e => setFilterDncOnly(e.target.checked)}
                className="w-4 h-4 text-rose-600 rounded border-slate-300"
              />
              <span className="flex items-center gap-1 text-rose-600">
                <ShieldAlert className="w-3.5 h-3.5" /> DNC Only
              </span>
            </label>
          </div>

          {/* Customer Cards */}
          <div className="space-y-3">
            {filteredJobs.map(job => (
              <div
                key={job.id}
                onClick={() => onJobClick(job)}
                className={`bg-white rounded-2xl p-4 sm:p-5 border shadow-xs hover:shadow-md cursor-pointer transition-all ${
                  job.doNotContact ? "border-rose-300 bg-rose-50/20" : "border-slate-200"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900">
                        {job.customerName}
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                        {job.propertyType}
                      </span>
                      {job.doNotContact && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 border border-rose-300 flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3 text-rose-600" /> Do Not Contact
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-500 text-xs mt-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{job.address}, {job.suburb}</span>
                    </div>

                    {job.phone && (
                      <div className="flex items-center gap-1.5 text-slate-600 text-xs mt-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{job.phone}</span>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-2.5">
                      <span>Storeys: <strong>{job.storeys}</strong></span>
                      <span>Subscription: <strong className="capitalize">{job.subscriptionFrequency.replace("_", " ")}</strong></span>
                      {job.nextDueDate && (
                        <span>Next Due: <strong className="text-amber-800">{job.nextDueDate}</strong></span>
                      )}
                    </div>
                  </div>

                  {/* Actions Strip */}
                  <div
                    className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100"
                    onClick={e => e.stopPropagation()}
                  >
                    {job.phone && (
                      <>
                        <a
                          href={`tel:${job.phone}`}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-700 transition-colors"
                          title="Call customer"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                        <a
                          href={`sms:${job.phone}`}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-sky-50 text-slate-600 hover:text-sky-700 transition-colors"
                          title="Send SMS"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </a>
                      </>
                    )}

                    <button
                      onClick={() => handleToggleDnc(job)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                        job.doNotContact
                          ? "bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100"
                          : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
                      }`}
                    >
                      {job.doNotContact ? "DNC Active" : "Toggle DNC"}
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredJobs.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 p-6">
                <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                <h4 className="font-bold text-sm text-slate-800">No Customers Found</h4>
                <p className="text-xs text-slate-400 mt-1">Try adjusting your search query.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: TEAM & TECHNICIANS */}
      {activeTab === "team" && (
        <div className="space-y-5">
          {/* Add Technician Box */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
            <h3 className="font-bold text-sm text-slate-900 mb-2 flex items-center gap-1.5">
              <UserPlus className="w-4 h-4 text-amber-500" />
              <span>Add Team Member / Guy</span>
            </h3>
            <form onSubmit={handleAddTechnician} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Name</label>
                <input
                  type="text"
                  required
                  value={newTechName}
                  onChange={e => setNewTechName(e.target.value)}
                  placeholder="e.g. Luke (Tech)"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Phone</label>
                <input
                  type="tel"
                  value={newTechPhone}
                  onChange={e => setNewTechPhone(e.target.value)}
                  placeholder="0400 123 456"
                  className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Color Tag</label>
                <div className="flex items-center gap-1.5 pt-1">
                  {TECH_COLORS.map(c => (
                    <button
                      type="button"
                      key={c}
                      onClick={() => setNewTechColor(c)}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        newTechColor === c ? "scale-110 border-slate-800" : "border-transparent"
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  disabled={!newTechName.trim()}
                  className="w-full py-2 bg-brand-navy hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs disabled:opacity-40 transition-colors"
                >
                  + Add Member
                </button>
              </div>
            </form>
          </div>

          {/* Current Team List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {technicians.map(tech => {
              const assignedCount = jobs.filter(j => j.assignedTechnicianId === tech.id).length;

              return (
                <div
                  key={tech.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-xs"
                      style={{ backgroundColor: tech.color }}
                    >
                      {tech.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs sm:text-sm text-slate-900">{tech.name}</h4>
                      <p className="text-[11px] text-slate-500">{tech.phone}</p>
                      <span className="text-[10px] font-bold text-slate-400 mt-0.5 block">
                        {assignedCount} jobs assigned
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteTechnician(tech.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Remove member"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
