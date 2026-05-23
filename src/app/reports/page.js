'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ReportList from '@/components/Reports/ReportList';
import ReportStats from '@/components/Reports/ReportStats';
import QuickExport from '@/components/Reports/QuickExport';
import DataIntegrity from '@/components/Reports/DataIntegrity';
import { SlidersHorizontal, Plus, ChevronRight, Search } from 'lucide-react';

function ReportsPageContent() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchVal, setSearchVal] = useState(searchParams.get('q') || '');

  // Keep state in sync with URL parameters
  useEffect(() => {
    setSearchVal(searchParams.get('q') || '');
  }, [searchParams]);

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchVal(val);

    const params = new URLSearchParams(searchParams);
    if (val) {
      params.set('q', val);
    } else {
      params.delete('q');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

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

      {/* Mobile-only Search Bar (Mockup Image 2 layout) */}
      <div className="lg:hidden relative w-full mb-2">
        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-zinc-400">
          <Search size={18} />
        </span>
        <input
          type="text"
          value={searchVal}
          onChange={handleSearch}
          placeholder="Search reports..."
          className="w-full pl-10 pr-4 py-2 text-sm bg-white border border-[var(--color-border)] rounded-full outline-none focus:border-[var(--color-primary)] text-[var(--color-text-main)] shadow-sm"
        />
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

export default function ReportsPage() {
  return (
    <Suspense fallback={<div className="h-64 bg-zinc-50 border border-[var(--color-border)] rounded-2xl animate-pulse" />}>
      <ReportsPageContent />
    </Suspense>
  );
}
