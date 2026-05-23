'use client';

import React from 'react';
import LearningMaterials from '@/components/Dashboard/LearningMaterials';
import CardGrid from '@/components/Dashboard/CardGrid';
import EfficiencyChart from '@/components/Dashboard/EfficiencyChart';
import ActivityLog from '@/components/Dashboard/ActivityLog';
import { Calendar, Plus } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative space-y-6 max-w-7xl mx-auto pb-10">
      {/* Page Header Title Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[var(--color-text-main)] tracking-tight">
            Executive Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] font-medium mt-1">
            Real-time oversight for SPRO Global Logistics.
          </p>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2.5">
          {/* Custom Date Range Indicator */}
          <button className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm bg-white dark:bg-zinc-900 border border-[var(--color-border)] rounded-xl font-bold text-[var(--color-text-main)] shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
            <Calendar size={16} className="text-[var(--color-text-muted)]" />
            <span>Oct 24 - Oct 30, 2023</span>
          </button>

          {/* New Entry Button */}
          <button className="flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-colors">
            <Plus size={16} />
            <span>New Entry</span>
          </button>
        </div>
      </div>

      {/* Learning Materials Banner */}
      <LearningMaterials />

      {/* Core Grid Options */}
      <CardGrid />

      {/* Charts & Split Timeline Log */}
      <div className="flex flex-col lg:flex-row gap-6 mt-8">
        <EfficiencyChart />
        <ActivityLog />
      </div>

      {/* Floating Add Action Button (Mobile/Tablet accessibility) */}
      <button className="fixed bottom-20 right-6 lg:bottom-8 lg:right-8 w-14 h-14 bg-[#0a5c36] hover:bg-[#074629] text-white rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-105 z-30">
        <Plus size={28} />
      </button>
    </div>
  );
}
