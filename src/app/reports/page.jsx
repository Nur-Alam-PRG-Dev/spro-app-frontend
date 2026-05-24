'use client';

import React, { useState, useEffect, Suspense } from 'react';
import ReportList from '@/components/Reports/ReportList';
import { ChevronRight, Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function ReportsContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchVal, setSearchVal] = useState(searchParams.get('q') || '');

  // Sync search state with URL query param changes
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

          {/* Search option in content header */}
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[var(--color-text-muted)]">
              <Search size={16} />
            </span>
            <input
              type="text"
              value={searchVal}
              onChange={handleSearch}
              placeholder="Search reports..."
              className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-[var(--color-border)] rounded-xl outline-none focus:border-[var(--color-primary)] transition-all text-[var(--color-text-main)] font-semibold shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="mt-6">
        <ReportList />
      </div>
    </div>
  );
}

export default function ReportsPage() {
  return (
    <Suspense fallback={<div className="h-64 bg-zinc-50 border border-[var(--color-border)] rounded-2xl animate-pulse" />}>
      <ReportsContent />
    </Suspense>
  );
}
