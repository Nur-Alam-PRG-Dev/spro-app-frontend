'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Card from '@/components/ui/Card';
import AmolnamaFilters from '@/components/Reports/AmolnamaFilters';
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
  Info
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
      value: '0'
    },
    {
      label: 'TOTAL VISITS',
      description: 'Total outlet visits by selected staff including repeats',
      value: '0'
    },
    {
      label: 'UNIQUE VISITS',
      description: 'Unique outlets visited by the selected staff',
      value: '0'
    },
    {
      label: 'VISIT COVERAGE',
      description: 'Unique visit ÷ Total olt',
      value: '0.00%'
    },
    {
      label: 'NO. OF ORDERS',
      description: 'Total orders from visited outlets',
      value: '0'
    },
    {
      label: 'ORDER VALUE',
      description: 'Total order amount',
      value: '0'
    },
    {
      label: 'DEL. AMOUNT',
      description: 'Total delivered amount',
      value: '0'
    },
    {
      label: 'LPC',
      description: 'Lines per call',
      value: '0'
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

      {/* ─── Header Section ─── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="hidden lg:block">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[var(--color-text-main)] tracking-tight">
            Amolnama
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] font-medium mt-1">
            Daily operational intelligence report
          </p>
        </div>
      </div>

      {/* ─── Search and Date Range Filters ─── */}
      <AmolnamaFilters
        employeeSearch={employeeSearch}
        onEmployeeSearchChange={setEmployeeSearch}
        startDate={startDate}
        onStartDateChange={setStartDate}
        endDate={endDate}
        onEndDateChange={setEndDate}
        onClearFilters={handleClearFilters}
      />

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
                className="p-5 flex items-center gap-4 min-w-[240px] lg:min-w-0 flex-1 snap-start"
                hoverable={true}
              >
                <div className={`w-11 h-11 rounded-2xl ${item.iconBg} ${item.iconColor} flex items-center justify-center shrink-0 border border-black/5`}>
                  <Icon size={20} />
                </div>
                <div>
                  <span className="block text-[10px] font-bold text-[var(--color-text-muted)] tracking-wider uppercase leading-none mb-1">
                    {item.title}
                  </span>
                  <h2 className="text-2xl font-black text-[var(--color-text-main)] tracking-tight leading-none mb-1.5">
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
            <Card key={idx} className="p-2 flex flex-col justify-between" hoverable={false}>
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
          <div className="p-2 bg-white border border-[var(--color-border)] rounded-xl flex flex-col justify-between">
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
          <div className="p-2 bg-white border border-[var(--color-border)] rounded-xl flex flex-col justify-between">
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
          <div className="p-2 bg-white border border-[var(--color-border)] rounded-xl flex flex-col justify-between items-center text-center">
            <span className="text-[8px] font-black text-zinc-500 uppercase tracking-wider leading-none mb-2 truncate">
              ND
            </span>
            <span className="text-sm font-black text-[var(--color-text-main)] leading-none">
              0
            </span>
          </div>
        </div>

        {/* Desktop Single Card View */}
        <Card className="hidden lg:block p-0 overflow-hidden" hoverable={false}>
          {/* Card Header */}
          <div className="px-6 py-4.5 border-b border-[var(--color-border)] flex items-center justify-between">
            <h3 className="font-extrabold text-base text-[var(--color-text-main)]">Visited Summary</h3>
            <a href="#" className="text-xs font-bold text-[var(--color-primary)] hover:underline">
              View Detailed Log
            </a>
          </div>

          {/* Outlet Performance Sub-Header */}
          <div className="px-6 py-3 bg-zinc-50/50 border-b border-[var(--color-border)]">
            <span className="text-xs font-black tracking-wider text-[var(--color-text-muted)] uppercase">
              Outlet Performance
            </span>
          </div>

          {/* 2x4 Metric Grid */}
          <div className="grid grid-cols-4 border-b border-[var(--color-border)]">
            {visitedSummaryMetrics.map((m, idx) => (
              <div
                key={idx}
                tabIndex={0}
                className={`p-5 border-r border-b border-[var(--color-border)] relative group focus:outline-none transition-colors hover:bg-zinc-50/50 ${(idx + 1) % 4 === 0 ? 'border-r-0' : ''
                  } ${idx >= 4 ? 'border-b-0' : ''}`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="block text-xs font-bold text-zinc-500 tracking-wider uppercase">
                    {m.label}
                  </span>
                  <Info size={12} className="text-zinc-400 group-hover:text-zinc-600 group-focus-within:text-zinc-600 shrink-0" />
                </div>
                <h3 className="text-2xl font-black tracking-tight text-[var(--color-text-main)]">
                  {m.value}
                </h3>

                {/* Tooltip bubble */}
                <div className={`absolute bottom-full mb-2 w-52 p-2.5 bg-zinc-900 text-[11px] text-white font-medium rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible pointer-events-none text-center normal-case leading-snug transition-all duration-200 z-50 ${getTooltipAlignment(idx, 4)}`}>
                  {m.description}
                  <div className={`absolute top-full border-4 border-transparent border-t-zinc-900 ${getTooltipArrowAlignment(idx, 4)}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Numeric Distribution (ND) Sub-Header */}
          <div className="px-6 py-3 bg-zinc-50/50 border-b border-[var(--color-border)]">
            <span className="text-xs font-black tracking-wider text-[var(--color-text-muted)] uppercase">
              Numeric Distribution (ND)
            </span>
          </div>

          {/* ND Column Grid */}
          <div className="grid grid-cols-3 divide-x divide-[var(--color-border)]">
            {/* Current Period */}
            <div className="p-6">
              <span className="block text-[10px] font-bold text-zinc-500 tracking-wider uppercase mb-1">
                Current Period
              </span>
              <span className="block text-xs font-semibold text-[var(--color-text-muted)] mb-2">
                {currentStart} &rarr; {currentEnd}
              </span>
              <h3 className="text-xl font-black text-[var(--color-text-main)]">
                0 <span className="text-xs font-bold text-[var(--color-text-muted)]">Unique Sites</span>
              </h3>
            </div>

            {/* Previous Period */}
            <div className="p-6">
              <span className="block text-[10px] font-bold text-zinc-500 tracking-wider uppercase mb-1">
                Previous Period
              </span>
              <span className="block text-xs font-semibold text-[var(--color-text-muted)] mb-2">
                {prevPeriod.start} &rarr; {prevPeriod.end}
              </span>
              <h3 className="text-xl font-black text-[var(--color-text-main)]">
                0 <span className="text-xs font-bold text-[var(--color-text-muted)]">Unique Sites</span>
              </h3>
            </div>

            {/* ND */}
            <div className="p-6 flex flex-col justify-center">
              <span className="block text-[10px] font-bold text-zinc-500 tracking-wider uppercase mb-1">
                ND
              </span>
              <h3 className="text-3xl font-black text-[var(--color-text-main)]">
                0
              </h3>
            </div>
          </div>
        </Card>
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
