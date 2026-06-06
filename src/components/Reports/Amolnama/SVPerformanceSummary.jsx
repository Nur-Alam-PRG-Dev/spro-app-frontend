'use client';

import React, { useState } from 'react';
import Card from '@/components/ui/Card';
import { ChevronDown } from 'lucide-react';
import PerformanceTable from './PerformanceTable';
import CoWorkReport from './CoWorkReport';
import TtsKpiCard from './TtsKpiCard';
import OutletActivityCard from './OutletActivityCard';
import LiveAreaCoverage from './LiveAreaCoverage';

export default function SVPerformanceSummary({ searchQuery = '' }) {
  const [activeSubTab, setActiveSubTab] = useState('Thana Wise');
  const [isMinimized, setIsMinimized] = useState(false);

  // Stats for the collapsed progress card view matching screenshot data
  const coverageDetails = {
    'Thana Wise': { label: 'Thana', visited: 12, pending: 48, total: 60 },
    'Zone Wise': { label: 'Zone', visited: 8, pending: 22, total: 30 },
    'District Wise': { label: 'District', visited: 3, pending: 7, total: 10 }
  };

  const coverage = coverageDetails[activeSubTab];
  const pct = Math.round((coverage.visited / coverage.total) * 100);

  if (isMinimized) {
    return (
      <div className="space-y-4">
        {/* Title Header for SV Field Performance Summary */}
        <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2.5">
          <h2 className="text-lg font-black text-[var(--color-text-main)] tracking-tight">
            SV Field Performance Summary
          </h2>
          <button
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-1.5 text-xs font-black text-[var(--color-primary)] hover:underline cursor-pointer bg-transparent border-0"
          >
            <span>Expand</span>
            <ChevronDown size={14} className="stroke-[2.5px]" />
          </button>
        </div>

        {/* Collapsed progress card strictly matching screenshot & project theme */}
        <Card className="max-w-md p-5 bg-white border border-[var(--color-border)] rounded-2xl" hoverable={false}>
          {/* Tab Switcher */}
          <div className="flex border-b border-[var(--color-border)] -mx-5 px-5 pb-0">
            {['Thana Wise', 'Zone Wise', 'District Wise'].map((tab) => {
              const isActive = activeSubTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveSubTab(tab)}
                  className={`pb-2.5 px-4 text-xs sm:text-sm font-extrabold border-b-2 transition-all cursor-pointer relative -mb-[2px] ${
                    isActive
                      ? 'border-[#267043] text-[#267043]'
                      : 'border-transparent text-zinc-400 hover:text-zinc-600'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {/* Counts and details */}
          <div className="space-y-4 mt-5">
            <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-zinc-800">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1e6b37]" />
                <span>Visited {coverage.label}</span>
              </div>
              <span className="font-extrabold text-zinc-900 text-sm sm:text-base">{coverage.visited}</span>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-zinc-800">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ae2727]" />
                <span>Pending {coverage.label}</span>
              </div>
              <span className="font-extrabold text-zinc-900 text-sm sm:text-base">{coverage.pending}</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-5 pt-1">
            <div className="w-full h-2.5 bg-zinc-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#267043] rounded-full transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Title Header for SV Field Performance Summary */}
      <div className="border-b border-[var(--color-border)] pb-2.5">
        <h2 className="text-lg font-black text-[var(--color-text-main)] tracking-tight">
          SV Field Performance Summary
        </h2>
      </div>

      {/* ─── Centered Sub-Tab Switcher ─── */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 bg-zinc-100 rounded-2xl border border-[var(--color-border)] shadow-3xs">
          {['Thana Wise', 'Zone Wise', 'District Wise'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                activeSubTab === tab
                  ? 'bg-[var(--color-primary)] text-white shadow-xs'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] bg-transparent'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ─── Main Grid Layout (2/3 Left, 1/3 Right) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Pane (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          <PerformanceTable 
            activeSubTab={activeSubTab} 
            searchQuery={searchQuery} 
            onMinimize={() => setIsMinimized(true)} 
          />
          <CoWorkReport />
        </div>

        {/* Right Pane (1/3 width) */}
        <div className="lg:col-span-1 space-y-6">
          <TtsKpiCard />
          <OutletActivityCard />
          <LiveAreaCoverage />
        </div>
      </div>
    </div>
  );
}

