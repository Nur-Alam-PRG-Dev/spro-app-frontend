'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Card from '@/components/ui/Card';
import CompactDateFilter from '@/components/HalfSummary/CompactDateFilter';
import AmolnamaInfographic from '@/components/Reports/Amolnama/AmolnamaInfographic';
import SVPerformanceSummary from '@/components/Reports/Amolnama/SVPerformanceSummary';
import {
  ChevronRight,
  Calendar,
  SlidersHorizontal,
  ShoppingCart,
  Clock,
  ShoppingBag,
  Building2,
  ChevronDown,
  CalendarCheck,
  Clock9,
  Info,
  Search,
  RotateCcw
} from 'lucide-react';

function AmolnamaContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';

  // State management
  const [employeeSearch, setEmployeeSearch] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleClearFilters = () => {
    setEmployeeSearch('');
    setStartDate('');
    setEndDate('');
  };

  const dailySummary = [
    {
      title: 'Activity Day',
      value: '26',
      subText: 'Total Working Days',
      icon: Calendar,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-700'
    },
    {
      title: 'First Activity',
      value: '08:45 AM',
      subText: 'LAST: 06:12 PM',
      icon: Clock,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-700'
    },
    {
      title: 'Total Retail ACT',
      value: '124',
      subText: 'Orders processed today',
      icon: ShoppingCart,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-700'
    },
    {
      title: 'AVG Retail ACT',
      value: '124',
      subText: 'Orders processed today',
      icon: ShoppingCart,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-700'
    },
    {
      title: 'Other Activities',
      value: '124',
      subText: 'Orders processed today',
      icon: CalendarCheck,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-700'
    },
    {
      title: 'AVG TTS',
      value: '124',
      subText: 'Orders processed today',
      icon: Clock9,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-700'
    },
    {
      title: 'Daily TTS',
      value: '124',
      subText: 'Orders processed today',
      icon: Clock9,
      iconBg: 'bg-emerald-50',
      iconColor: 'text-emerald-700'
    },
  ];

  const currentStart = startDate || '2026-06-03';
  const currentEnd = endDate || '2026-06-06';

  const getPreviousPeriod = (startStr, endStr) => {
    if (!startStr || !endStr) {
      return { start: '2026-05-03', end: '2026-05-06' };
    }
    const s = new Date(startStr);
    const e = new Date(endStr);

    const prevStart = new Date(s.getFullYear(), s.getMonth() - 1, s.getDate());
    const prevEnd = new Date(e.getFullYear(), e.getMonth() - 1, e.getDate());

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    return {
      start: formatDate(prevStart),
      end: formatDate(prevEnd)
    };
  };

  const prevPeriod = getPreviousPeriod(currentStart, currentEnd);

  const getTooltipAlignment = (index, totalCols = 4) => {
    const colIndex = index % totalCols;
    if (colIndex === 0) {
      return 'left-0 origin-bottom-left';
    }
    if (colIndex === totalCols - 1) {
      return 'right-0 origin-bottom-right';
    }
    return 'left-1/2 -translate-x-1/2';
  };

  const getTooltipArrowAlignment = (index, totalCols = 4) => {
    const colIndex = index % totalCols;
    if (colIndex === 0) {
      return 'left-3';
    }
    if (colIndex === totalCols - 1) {
      return 'right-3';
    }
    return 'left-1/2 -translate-x-1/2';
  };

  const visitedSummaryMetrics = [
    {
      label: 'TOTAL OUTLETS',
      description: 'Total outlets for the supervisor and their team',
      value: '1420'
    },
    {
      label: 'TOTAL VISITS',
      description: 'Total outlet visits by selected staff including repeats',
      value: '520'
    },
    {
      label: 'UNIQUE VISITS',
      description: 'Unique outlets visited by the selected staff',
      value: '320'
    },
    {
      label: 'VISIT COVERAGE',
      description: 'Unique visit ÷ Total olt',
      value: '20.00%'
    },
    {
      label: 'NO. OF ORDERS',
      description: 'Total orders from visited outlets',
      value: '450'
    },
    {
      label: 'ORDER VALUE',
      description: 'Total order amount',
      value: '540000'
    },
    {
      label: 'DEL. AMOUNT',
      description: 'Total delivered amount',
      value: '340000'
    },
    {
      label: 'LPC',
      description: 'Lines per call',
      value: '12'
    }
  ];

  return (
    <div className="space-y-6 pb-10">
      {/* ─── Breadcrumbs ─── */}
      <div className="hidden lg:block">
        <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] font-semibold mb-2">
          <Link href="/" className="hover:text-[var(--color-text-main)] transition-colors">Dashboard</Link>
          <ChevronRight size={12} className="text-[var(--color-text-muted)]" />
          <Link href="/reports" className="hover:text-[var(--color-text-main)] transition-colors">Reports</Link>
          <ChevronRight size={12} className="text-[var(--color-text-muted)]" />
          <span className="text-[var(--color-text-main)] font-bold">Amolnama</span>
        </div>
      </div>

      {/* ─── Unified Header Row ─── */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-[var(--color-border)] pb-4">

        {/* Left Side: Title */}
        <div className="shrink-0">
          <h1 className="text-xl sm:text-2xl font-extrabold text-[var(--color-text-main)] tracking-tight leading-tight">
            Amolnama
          </h1>
          <p className="text-[10px] sm:text-xs text-[var(--color-text-muted)] font-medium mt-0.5">
            Daily operational intelligence report
          </p>
        </div>

        {/* Right Side: Filters & Actions */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-between lg:justify-end bg-transparent md:bg-white drop-shadow-xs md:drop-shadow-md p-2 rounded-xl w-full md:w-fit lg:w-auto z-40">
          {/* Minimal Date Range Selector */}
          <CompactDateFilter
            startDate={startDate}
            onStartDateChange={setStartDate}
            endDate={endDate}
            onEndDateChange={setEndDate}
          />

          {/* Action Buttons (Icons Only) */}
          <div className="flex items-center gap-1.5 shrink-0">
            {(startDate || endDate) && (
              <button
                onClick={handleClearFilters}
                className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 transition-colors shadow-2xs"
                title="Reset Filters"
              >
                <RotateCcw size={14} />
              </button>
            )}
            <button
              onClick={() => { }}
              className="w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-lg shadow-2xs transition-all bg-emerald-800 hover:bg-emerald-900 text-white hover:shadow-md cursor-pointer border border-emerald-900/50"
              title="Search"
            >
              <Search size={14} className="stroke-[2.5px]" />
            </button>
          </div>
        </div>
      </div>

      {/* ─── Daily Summary ─── */}
      <div className='-mt-3 lg:mt-0'>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-extrabold text-sm text-[var(--color-text-main)]">Daily Summary</h3>
          <button className="text-xs font-bold text-[var(--color-primary)] hover:underline">View Detailed</button>
        </div>

        <div className="flex lg:grid lg:grid-cols-4 xl:grid-cols-7 gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none snap-x">
          {dailySummary.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Card
                key={idx}
                className="p-3 flex items-center gap-2 min-w-[240px] lg:min-w-0 flex-1 snap-start"
                hoverable={true}
              >
                <div className={`w-11 h-11 rounded-2xl ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0 border border-black/5`}>
                  <Icon size={20} />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-[var(--color-text-muted)] tracking-wider uppercase leading-none mb-1">
                    {item.title}
                  </span>
                  <h2 className="text-xl font-black text-[var(--color-text-main)] tracking-tight leading-none mb-1.5">
                    {item.value}
                  </h2>
                  <span className="block text-[10px] text-[var(--color-text-muted)] font-semibold leading-none">
                    {item.subText}
                  </span>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* ─── Visited Summary ─── */}
      <div className='-mt-5 lg:mt-0'>
        {/* Visited Summary Header & Sub-header (Mobile only) */}
        <div className="block lg:hidden space-y-2 mb-3">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-[var(--color-text-main)]">Visited Summary</h3>
            <a href="#" className="text-xs font-bold text-[var(--color-primary)] hover:underline">
              View Detailed Log
            </a>
          </div>
          <span className="block text-[10px] font-black tracking-wider text-[var(--color-text-muted)] uppercase border-b border-[var(--color-border)] pb-2">
            Outlet Performance
          </span>
        </div>

        {/* Mobile metrics list: separate cards */}
        <div className="lg:hidden grid grid-cols-3 gap-1.5">
          {visitedSummaryMetrics.map((m, idx) => (
            <Card key={idx} className="p-2 flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300" >
              <span className="text-[8px] font-bold text-zinc-400 tracking-wider uppercase mb-1 block truncate">
                {m.label}
              </span>
              <span className="text-sm font-black tracking-tight text-[var(--color-text-main)]">
                {m.value}
              </span>
            </Card>
          ))}
          {/* Numeric Distribution (ND) Sub-Header (Mobile only) */}
          <div className="col-span-3 pt-2 pb-1">
            <span className="block text-[10px] font-black tracking-wider text-[var(--color-text-muted)] uppercase border-b border-[var(--color-border)] pb-2">
              Numeric Distribution (ND)
            </span>
          </div>

          {/* Current Period */}
          <div className="p-2 bg-white border border-[var(--color-border)] rounded-xl flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <span className="block text-[8px] font-black text-zinc-500 uppercase tracking-wider leading-none mb-0.5 truncate">
              Current Period
            </span>
            <span className="block text-[7px] font-semibold text-zinc-450 mb-1 leading-none">
              {currentStart}
            </span>
            <h4 className="text-xs font-black text-[var(--color-text-main)] leading-none mt-1">
              0 <span className="text-[9px] font-bold text-[var(--color-text-muted)]">Sites</span>
            </h4>
          </div>

          {/* Previous Period */}
          <div className="p-2 bg-white border border-[var(--color-border)] rounded-xl flex flex-col justify-between shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <span className="block text-[8px] font-black text-zinc-500 uppercase tracking-wider leading-none mb-0.5 truncate">
              Prev Period
            </span>
            <span className="block text-[7px] font-semibold text-zinc-450 mb-1 leading-none">
              {prevPeriod.start}
            </span>
            <h4 className="text-xs font-black text-[var(--color-text-main)] leading-none mt-1">
              0 <span className="text-[9px] font-bold text-[var(--color-text-muted)]">Sites</span>
            </h4>
          </div>

          {/* ND */}
          <div className="p-2 bg-white border border-[var(--color-border)] rounded-xl flex flex-col justify-between items-center text-center shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-wider leading-none mb-2 truncate">
              ND
            </span>
            <span className="text-sm font-black text-[var(--color-text-main)] leading-none">
              0
            </span>
          </div>
        </div>

        {/* Desktop Single Fancy Infographic View */}
        <div className="hidden lg:block mt-6">
          <AmolnamaInfographic
            metrics={visitedSummaryMetrics}
            currentStart={currentStart}
            currentEnd={currentEnd}
            prevStart={prevPeriod.start}
            prevEnd={prevPeriod.end}
          />
        </div>
      </div>

      {/* ─── SV Field Performance Summary ─── */}
      <SVPerformanceSummary searchQuery={employeeSearch || query} />
    </div>
  );
}

export default function AmolnamaPage() {
  return (
    <Suspense fallback={<div className="h-64 bg-zinc-50 border border-[var(--color-border)] rounded-2xl animate-pulse" />}>
      <AmolnamaContent />
    </Suspense>
  );
}
