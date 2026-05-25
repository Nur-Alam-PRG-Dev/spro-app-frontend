'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import OverallSummaryView from '@/components/HalfSummary/OverallSummaryView';
import TeamWiseView from '@/components/HalfSummary/TeamWiseView';

function HalfSummaryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Selected tab: 'overall' or 'team'
  const initialTab = searchParams.get('tab') || 'overall';
  const [activeTab, setActiveTab] = useState(initialTab);
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedRep, setExpandedRep] = useState('SR-08'); // Expand Rahman Ali by default

  // Synchronize state when tab search parameter changes
  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && (tab === 'overall' || tab === 'team')) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // Fetch half summary metrics
  useEffect(() => {
    fetch('/api/halfSummary')
      .then((res) => {
        if (!res.ok) throw new Error('API Error');
        return res.json();
      })
      .then((payload) => {
        setData(payload);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load halfSummary API:', err);
        setLoading(false);
      });
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    const params = new URLSearchParams(searchParams);
    params.set('tab', tab);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const toggleRepExpand = (repId) => {
    setExpandedRep(expandedRep === repId ? null : repId);
  };

  // Helper to format currency (rupee)
  const formatCurrency = (val) => {
    if (val === undefined || val === null) return '';
    const str = Math.abs(val).toString();
    if (str.length <= 3) return val < 0 ? `-₹${str}` : `₹${str}`;
    const lastThree = str.substring(str.length - 3);
    const otherParts = str.substring(0, str.length - 3);
    const formatted = otherParts.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
    return val < 0 ? `-₹${formatted}` : `₹${formatted}`;
  };

  // Helper to format numbers with commas
  const formatNum = (val) => {
    if (val === undefined || val === null) return '';
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-emerald-100 border-t-emerald-800 animate-spin" />
        <span className="text-sm font-bold text-[var(--color-text-muted)]">Loading report metrics...</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <span className="text-sm font-bold text-red-650">Failed to load data. Please refresh the page.</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 px-4 sm:px-6 lg:px-8">
      {/* ─── Page Title and Tab Switcher Header ─── */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[var(--color-border)] pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[var(--color-text-main)] tracking-tight">
            Half Summary Report
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] font-medium mt-1">
            Performance metrics updated as of {data.lastUpdated}
          </p>
        </div>

        {/* Tab switch pills */}
        <div className="flex bg-zinc-100/80 p-1 rounded-xl self-start md:self-auto shadow-2xs border border-zinc-200/50">
          <button
            onClick={() => handleTabChange('overall')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'overall'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Overall Summary
          </button>
          <button
            onClick={() => handleTabChange('team')}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'team'
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'text-zinc-600 hover:text-zinc-900'
            }`}
          >
            Team Wise
          </button>
        </div>
      </div>

      {/* Render selected view */}
      {activeTab === 'overall' ? (
        <OverallSummaryView
          overallSummary={data.overallSummary}
          fiscalYear={data.fiscalYear}
          verifiedData={data.verifiedData}
          formatCurrency={formatCurrency}
          formatNum={formatNum}
        />
      ) : (
        <TeamWiseView
          teamWise={data.teamWise}
          expandedRep={expandedRep}
          toggleRepExpand={toggleRepExpand}
          formatCurrency={formatCurrency}
          formatNum={formatNum}
        />
      )}
    </div>
  );
}

export default function HalfSummaryPage() {
  return (
    <Suspense fallback={<div className="h-64 bg-zinc-50 border border-[var(--color-border)] rounded-2xl animate-pulse" />}>
      <HalfSummaryContent />
    </Suspense>
  );
}
