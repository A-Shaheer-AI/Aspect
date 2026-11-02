"use client";

import React from "react";
import { LayoutGrid, CalendarDays, RefreshCw, Receipt, Users } from "lucide-react";
import { CrmActiveTab } from "@/lib/crm/types";

interface CrmNavigationProps {
  activeTab: CrmActiveTab;
  onTabChange: (tab: CrmActiveTab) => void;
  overdueRecallsCount: number;
  activeJobsCount: number;
}

export default function CrmNavigation({
  activeTab,
  onTabChange,
  overdueRecallsCount,
  activeJobsCount
}: CrmNavigationProps) {
  const navItems: Array<{
    id: CrmActiveTab;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
    badgeColor?: string;
  }> = [
    {
      id: "pipeline",
      label: "Pipeline",
      icon: LayoutGrid,
      badge: activeJobsCount > 0 ? activeJobsCount : undefined,
      badgeColor: "bg-amber-500 text-brand-navy"
    },
    {
      id: "schedule",
      label: "Schedule",
      icon: CalendarDays
    },
    {
      id: "recalls",
      label: "Recalls",
      icon: RefreshCw,
      badge: overdueRecallsCount > 0 ? overdueRecallsCount : undefined,
      badgeColor: "bg-rose-500 text-white animate-pulse"
    },
    {
      id: "invoices",
      label: "AI Invoicing",
      icon: Receipt
    },
    {
      id: "customers",
      label: "Customers",
      icon: Users
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-[0_-4px_25px_rgba(0,0,0,0.06)] pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <div className="max-w-md sm:max-w-xl mx-auto px-2 flex justify-around items-center">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`relative flex flex-col items-center justify-center py-2 px-3 rounded-xl transition-all duration-200 select-none ${
                isActive ? "text-brand-navy font-bold scale-105" : "text-slate-400 hover:text-slate-600 font-medium"
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? "text-amber-500 stroke-[2.5]" : ""}`} />
                {item.badge !== undefined && (
                  <span
                    className={`absolute -top-1.5 -right-2 px-1.5 py-0.2 rounded-full text-[9px] font-extrabold ${
                      item.badgeColor || "bg-amber-500 text-brand-navy"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1 tracking-tight ${isActive ? "text-brand-navy" : "text-slate-500"}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="w-4 h-0.5 bg-amber-500 rounded-full mt-0.5 animate-in fade-in" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
