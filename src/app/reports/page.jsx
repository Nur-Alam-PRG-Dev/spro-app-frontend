'use client';

import React from 'react';
import ReportList from '@/components/Reports/ReportList';
import ReportStats from '@/components/Reports/ReportStats';
import QuickExport from '@/components/Reports/QuickExport';
import DataIntegrity from '@/components/Reports/DataIntegrity';
import { SlidersHorizontal, Plus, ChevronRight } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Breadcrumb & Header Title Section */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] font-semibold mb-2">
          <a href="/" className="hover:text-[var(--color-text-main)] transition-colors">Dashboard</a>
          <ChevronRight size={12} className="text-[var(--color-text-muted)]" />
          <span className="text-[var(--color-text-main)]">Web Reports</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[var(--color-text-main)] tracking-tight">
              Web Reports
            </h1>
            <p className="text-xs sm:text-sm text-[var(--color-text-muted)] font-medium mt-1">
              Manage and track your operational KPIs across multiple sectors.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2.5">
            {/* Filter View button */}
            <button className="flex items-center gap-2 px-3.5 py-2 text-xs sm:text-sm bg-white dark:bg-zinc-900 border border-[var(--color-border)] rounded-xl font-bold text-[var(--color-text-main)] shadow-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
              <SlidersHorizontal size={16} className="text-[var(--color-text-muted)]" />
              <span>Filter View</span>
            </button>

            {/* + New Report button */}
            <button className="flex items-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-colors">
              <Plus size={16} />
              <span>New Report</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main split content area */}
      <div className="flex flex-col lg:flex-row items-start gap-6 mt-6">
        {/* Left Column: List table */}
        <div className="w-full lg:flex-1">
          <ReportList />
        </div>

        {/* Right Column: Stats, exports, integrity */}
        <div className="w-full lg:w-80 space-y-6 shrink-0">
          <ReportStats />
          <QuickExport />
          <DataIntegrity />
        </div>
      </div>
    </div>
  );
}
