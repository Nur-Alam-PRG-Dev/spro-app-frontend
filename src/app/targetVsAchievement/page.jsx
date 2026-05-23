'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import targetData from '@/dummyData/targetVsAchievement.json';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { 
  ChevronRight, 
  Calendar, 
  Filter, 
  Download, 
  TrendingDown, 
  TrendingUp,
  MoreVertical, 
  Plus, 
  AlertTriangle
} from 'lucide-react';

function TargetVsAchievementContent() {
  const searchParams = useSearchParams();
  const [selectedPeriod, setSelectedPeriod] = useState(targetData.periodOptions[0].value);

  const query = searchParams.get('q')?.toLowerCase() || '';

  const team = targetData.teamPerformance;
  const reps = targetData.salesReps;
  const logs = targetData.detailedLogs;

  // Filter representatives by search term
  const filteredReps = reps.filter(rep => 
    rep.name.toLowerCase().includes(query) ||
    rep.id.toLowerCase().includes(query) ||
    rep.status.toLowerCase().includes(query)
  );

  // Filter logs by search term
  const filteredLogs = logs.filter(log => 
    log.region.toLowerCase().includes(query) ||
    log.manager.toLowerCase().includes(query)
  );

  // Formatting helpers
  const formatNum = (val) => {
    if (val === undefined || val === null) return '';
    // Format to Indian numbering system (e.g. 10,00,000)
    const str = Math.abs(val).toString();
    if (str.length <= 3) return val < 0 ? `-${str}` : str;
    const lastThree = str.substring(str.length - 3);
    const otherParts = str.substring(0, str.length - 3);
    const formatted = otherParts.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
    return val < 0 ? `-${formatted}` : formatted;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Breadcrumb & Page Header Title */}
      <div>
        <div className="flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] font-semibold mb-2">
          <a href="/" className="hover:text-[var(--color-text-main)] transition-colors">Dashboard</a>
          <ChevronRight size={12} className="text-[var(--color-text-muted)]" />
          <a href="/reports" className="hover:text-[var(--color-text-main)] transition-colors">Reports</a>
          <ChevronRight size={12} className="text-[var(--color-text-muted)]" />
          <span className="text-[var(--color-text-main)]">Target vs. Achievement</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[var(--color-text-main)] tracking-tight">
              Target vs. Achievement
            </h1>
            <p className="text-xs sm:text-sm text-[var(--color-text-muted)] font-medium mt-1">
              Real-time tracking of logistics performance metrics.
            </p>
          </div>

          {/* Period Selector Action */}
          <div className="relative">
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="appearance-none flex items-center gap-2 pl-9 pr-8 py-2 text-xs sm:text-sm bg-white dark:bg-zinc-900 border border-[var(--color-border)] rounded-xl font-bold text-[var(--color-text-main)] shadow-sm outline-none cursor-pointer focus:border-[var(--color-primary)] transition-colors"
            >
              {targetData.periodOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[var(--color-text-muted)]">
              <Calendar size={16} />
            </span>
            <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-[var(--color-text-muted)] font-bold text-[10px]">
              ▼
            </span>
          </div>
        </div>
      </div>



      {/* ─── Team Performance Card ─── */}
      <Card className="p-5 sm:p-6" hoverable={false}>
        <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4 mb-5">
          <div className="flex items-center gap-3">
            <h3 className="font-extrabold text-sm sm:text-base text-[var(--color-text-main)]">Team Performance</h3>
            <Badge type="target">{team.badge}</Badge>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold text-[var(--color-text-muted)]">
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-zinc-50 rounded-lg transition-colors border border-[var(--color-border)] bg-white shadow-2xs">
              <Filter size={14} />
              <span>Filter</span>
            </button>
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 hover:bg-zinc-50 rounded-lg transition-colors border border-[var(--color-border)] bg-white shadow-2xs">
              <Download size={14} />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* 3 Key Numbers grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Target */}
          <div className="space-y-1.5">
            <span className="block text-[10px] font-black text-red-500 tracking-wider uppercase">Total Target</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-red-700 tracking-tight">
              {formatNum(team.totalTarget)}
            </h2>
          </div>

          {/* Expected */}
          <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-[var(--color-border)] pt-4 md:pt-0 md:pl-6">
            <span className="block text-[10px] font-black text-amber-500 tracking-wider uppercase">Expected</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-amber-600 tracking-tight">
              {formatNum(team.expected)}
            </h2>
          </div>

          {/* Achieved */}
          <div className="space-y-1.5 border-t md:border-t-0 md:border-l border-[var(--color-border)] pt-4 md:pt-0 md:pl-6">
            <span className="block text-[10px] font-black text-emerald-500 tracking-wider uppercase">Achieved</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-emerald-700 tracking-tight">
              {formatNum(team.achieved)}
            </h2>
          </div>
        </div>

        {/* Double-Progress Bar */}
        <div className="mt-8 space-y-2">
          <div className="relative w-full h-3 bg-zinc-100 rounded-full overflow-hidden shadow-inner flex">
            {/* Achieved green segment */}
            <div 
              style={{ width: `${team.achievedPct}%` }} 
              className="h-full bg-emerald-600 rounded-l-full"
            />
            {/* Expected target overflow amber segment */}
            <div 
              style={{ width: `${team.expectedPct - team.achievedPct}%` }} 
              className="h-full bg-amber-400"
            />
          </div>
          
          {/* Progress Bar Indicators */}
          <div className="relative flex justify-between text-[10px] font-extrabold tracking-wide pt-1.5">
            <span className="text-[var(--color-text-muted)]">0%</span>
            
            {/* Dynamic offset elements */}
            <div className="absolute left-0 right-0 top-1.5 flex justify-between px-1 pointer-events-none">
              <span 
                style={{ left: `${team.achievedPct}%` }} 
                className="absolute -translate-x-1/2 text-emerald-600 font-bold"
              >
                {team.achievedPct}% ACHIEVED
              </span>
              
              <span 
                style={{ left: `${team.expectedPct}%` }} 
                className="absolute -translate-x-1/2 text-amber-600 font-bold"
              >
                {team.expectedPct}% EXPECTED
              </span>
            </div>
            
            <span className="text-[var(--color-text-muted)] ml-auto">100%</span>
          </div>
        </div>

        {/* Gap Indicator notification box */}
        <div className="mt-8 bg-rose-50/50 border border-rose-100 rounded-2xl p-4 sm:p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center shrink-0 border border-rose-200">
            <TrendingDown className="text-rose-600" size={20} />
          </div>
          <div>
            <h4 className="font-extrabold text-xs sm:text-sm text-rose-950">
              Achievement Gap: {formatNum(team.gap)}
            </h4>
            <p className="text-[11px] sm:text-xs text-rose-800 mt-1 font-semibold leading-relaxed">
              The team is currently <span className="text-rose-600 font-black">{Math.abs(team.gapPct)}% behind</span> the expected linear target for today. Immediate intervention recommended for pending orders.
            </p>
          </div>
        </div>
      </Card>

      {/* ─── Sales Representatives section ─── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-sm sm:text-base text-[var(--color-text-main)]">Sales Representatives</h3>
          <span className="text-xs font-semibold text-[var(--color-text-muted)]">{filteredReps.length} Active Agents</span>
        </div>

        {/* Representative cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredReps.map((rep) => (
            <Card key={rep.id} className="p-5 flex flex-col justify-between" hoverable={true}>
              <div>
                {/* Rep Header */}
                <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3.5 mb-4">
                  <div className="flex items-center gap-3">
                    {/* Circle Initials Avatar */}
                    <div className="w-10 h-10 rounded-xl bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center font-extrabold text-sm border border-emerald-100 shadow-2xs">
                      {rep.initials}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-xs sm:text-sm text-[var(--color-text-main)] leading-none">{rep.name}</h4>
                      <span className="text-[10px] text-[var(--color-text-muted)] font-semibold mt-1 block">SR ID: {rep.id}</span>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="text-right flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${
                      rep.statusVariant === 'success' ? 'bg-emerald-500' :
                      rep.statusVariant === 'warning' ? 'bg-amber-500' : 'bg-rose-500'
                    }`} />
                    <span className="text-[10px] sm:text-xs font-bold text-[var(--color-text-main)]">{rep.status}</span>
                  </div>
                </div>

                {/* Sub cards details */}
                <div className="grid grid-cols-2 gap-3.5 mb-4">
                  {/* Today's Pulse */}
                  <div className="bg-zinc-50 border border-[var(--color-border)] rounded-xl p-3 space-y-1">
                    <span className="block text-[8px] font-black text-[var(--color-text-muted)] tracking-wider uppercase">Today's Pulse</span>
                    <div className="flex flex-wrap items-baseline gap-1">
                      <span className={`text-xs sm:text-sm font-extrabold ${rep.todayPulse.order < rep.todayPulse.target ? 'text-red-600' : 'text-emerald-700'}`}>
                        {formatNum(rep.todayPulse.order)}
                      </span>
                      <span className="text-[10px] text-[var(--color-text-muted)] font-bold">/</span>
                      <span className="text-[10px] text-[var(--color-text-muted)] font-bold">{formatNum(rep.todayPulse.target)}</span>
                    </div>
                  </div>

                  {/* MTD Progress */}
                  <div className="bg-zinc-50 border border-[var(--color-border)] rounded-xl p-3 space-y-1">
                    <span className="block text-[8px] font-black text-[var(--color-text-muted)] tracking-wider uppercase">MTD Progress</span>
                    <div className="flex flex-wrap items-baseline gap-1">
                      <span className="text-xs sm:text-sm font-extrabold text-emerald-700">
                        {formatNum(rep.mtdProgress.achieved)}
                      </span>
                      <span className="text-[10px] text-[var(--color-text-muted)] font-bold">/</span>
                      <span className="text-[10px] text-[var(--color-text-muted)] font-bold">{formatNum(rep.mtdProgress.expected)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress visual and notes */}
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden flex">
                    <div 
                      style={{ width: `${rep.mtdProgress.pct}%` }} 
                      className={`h-full ${rep.mtdProgress.isAhead ? 'bg-emerald-600' : 'bg-emerald-600'}`}
                    />
                    {!rep.mtdProgress.isAhead && (
                      <div 
                        style={{ width: '12%' }} 
                        className="h-full bg-amber-400"
                      />
                    )}
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-[var(--color-text-muted)]">Progress</span>
                    <span className="text-[var(--color-text-main)]">{rep.mtdProgress.pct}%</span>
                  </div>
                </div>

                {/* Sub text status info */}
                {rep.mtdProgress.isAhead ? (
                  <div className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
                    <TrendingUp size={12} />
                    <span>Ahead of Target: +{formatNum(rep.mtdProgress.gap)}</span>
                  </div>
                ) : (
                  <div className="text-[10px] font-bold text-red-600 flex items-center gap-1">
                    <TrendingDown size={12} />
                    <span>Behind Target: {formatNum(rep.mtdProgress.gap)}</span>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* ─── Detailed Logs Section ─── */}
      <Card className="p-0 overflow-hidden" hoverable={false}>
        {/* Section Header */}
        <div className="px-6 py-5 border-b border-[var(--color-border)] flex items-center justify-between">
          <h3 className="font-extrabold text-sm sm:text-base text-[var(--color-text-main)]">Detailed Logs</h3>
          <button className="flex items-center gap-1.5 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white py-1.5 px-3 rounded-lg text-xs font-bold transition-colors shadow-2xs">
            <Plus size={14} />
            <span>Log Entry</span>
          </button>
        </div>

        {/* Table of Detailed Logs */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-zinc-50 border-b border-[var(--color-border)] text-[var(--color-text-muted)] font-black uppercase text-[10px] tracking-wider">
                <th className="px-6 py-4">Region</th>
                <th className="px-6 py-4">Manager</th>
                <th className="px-6 py-4">Achievement</th>
                <th className="px-6 py-4">Gap</th>
                <th className="px-6 py-4">Efficiency</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-zinc-50/50 transition-colors font-semibold text-[var(--color-text-main)]">
                  <td className="px-6 py-4 font-extrabold">{log.region}</td>
                  <td className="px-6 py-4 text-[var(--color-text-muted)]">{log.manager}</td>
                  <td className="px-6 py-4 font-extrabold">{formatNum(log.achievement)}</td>
                  <td className={`px-6 py-4 font-black ${log.gap < 0 ? 'text-red-600' : 'text-emerald-700'}`}>
                    {log.gap > 0 ? `+${formatNum(log.gap)}` : formatNum(log.gap)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {/* Linear progress bar */}
                      <div className="w-24 h-2 bg-zinc-100 rounded-full overflow-hidden shrink-0">
                        <div 
                          style={{ width: `${Math.min(log.efficiencyPct, 100)}%` }} 
                          className={`h-full ${log.efficiencyVariant === 'success' ? 'bg-emerald-600' : 'bg-red-500'}`}
                        />
                      </div>
                      <span className="font-extrabold text-[var(--color-text-main)]">{log.efficiencyPct}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1.5 hover:bg-zinc-100 rounded text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] transition-colors">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Floating Add Action Button (Mobile/Tablet accessibility) */}
      <button className="fixed bottom-20 right-6 lg:hidden w-14 h-14 bg-[#0a5c36] hover:bg-[#074629] text-white rounded-full flex items-center justify-center shadow-xl transition-transform hover:scale-105 z-30">
        <Plus size={28} />
      </button>
    </div>
  );
}

export default function TargetVsAchievementPage() {
  return (
    <Suspense fallback={<div className="h-64 bg-zinc-50 border border-[var(--color-border)] rounded-2xl animate-pulse" />}>
      <TargetVsAchievementContent />
    </Suspense>
  );
}
