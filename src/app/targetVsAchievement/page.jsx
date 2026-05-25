'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
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
  AlertTriangle,
  Search
} from 'lucide-react';

function TargetVsAchievementContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [selectedPeriod, setSelectedPeriod] = useState(targetData.periodOptions[0].value);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/targetVsAchievement')
      .then((res) => {
        if (!res.ok) throw new Error('API Error');
        return res.json();
      })
      .then((payload) => {
        setData(payload);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load targetVsAchievement API:', err);
        setData(targetData);
        setLoading(false);
      });
  }, []);

  const query = searchParams.get('q')?.toLowerCase() || '';
  const [searchVal, setSearchVal] = useState(query);

  // Synchronize state with URL search param changes
  useEffect(() => {
    setSearchVal(searchParams.get('q') || '');
  }, [searchParams]);

  const handleLocalSearch = (e) => {
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

  if (loading || !data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="w-12 h-12 rounded-full border-4 border-emerald-100 border-t-emerald-800 animate-spin" />
        <span className="text-sm font-bold text-[var(--color-text-muted)]">Loading metrics...</span>
      </div>
    );
  }

  const team = data.teamPerformance;
  const reps = data.salesReps;
  const logs = data.detailedLogs;

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

  const isLabelOverlap = Math.abs(team.achievedPct - team.expectedPct) < 14;

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10 px-4 sm:px-6 lg:px-8">
      {/* ─── Page Title Header (Desktop Only) ─── */}
      <div className="hidden lg:block">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[var(--color-text-main)] tracking-tight">
              Target vs. Achievement
            </h1>
            <p className="text-xs sm:text-sm text-[var(--color-text-muted)] font-medium mt-1">
              Real-time tracking of logistics performance metrics.
            </p>
          </div>
        </div>
      </div>

      {/* ─── Search & Period Selector bar ─── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        {/* Search Input Box */}
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-3.5 flex items-center pointer-events-none text-[var(--color-text-muted)]">
            <Search size={18} />
          </span>
          <input
            type="text"
            value={searchVal}
            onChange={handleLocalSearch}
            placeholder="Search representatives, IDs, status..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-white border border-[var(--color-border)] rounded-2xl outline-none focus:border-[var(--color-primary)] transition-colors text-[var(--color-text-main)] shadow-2xs font-semibold"
          />
        </div>

        {/* Period Selector Action */}
        <div className="relative shrink-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="w-full appearance-none flex items-center gap-2 pl-9 pr-9 py-2.5 text-xs sm:text-sm border border-[var(--color-border)] bg-white rounded-2xl font-bold text-[var(--color-text-main)] shadow-2xs outline-none cursor-pointer focus:border-[var(--color-primary)] transition-colors"
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
          <span className="absolute inset-y-0 right-3.5 flex items-center pointer-events-none text-[var(--color-text-muted)] font-bold text-[10px]">
            ▼
          </span>
        </div>
      </div>

      {/* ─── Team Performance Card ─── */}
      <Card className="p-5 sm:p-6" hoverable={false}>
        <div className="flex items-center justify-between pb-4 mb-5">
          <h3 className="font-bold text-base text-[var(--color-text-main)]">Team Performance</h3>
          <span className="bg-[#dcfce7] text-[#15803d] text-[10px] font-black tracking-wider px-2.5 py-0.5 rounded-full uppercase">
            {team.badge}
          </span>
        </div>

        {/* 3 Key Numbers grid */}
        <div className="grid grid-cols-3 divide-x divide-zinc-200">
          {/* Target */}
          <div className="pr-3 flex flex-col justify-between min-h-[64px]">
            <div className="text-[10px] font-black text-red-700 uppercase tracking-wider leading-tight">
              <div>TOTAL</div>
              <div>TARGET</div>
            </div>
            <h2 className="text-base sm:text-2xl font-black text-[#a61c1c] tracking-tight mt-1">
              {formatNum(team.totalTarget)}
            </h2>
          </div>

          {/* Expected */}
          <div className="px-3.5 flex flex-col justify-between min-h-[64px]">
            <div className="text-[10px] font-black text-[#d9a01c] uppercase tracking-wider leading-tight mt-auto">
              EXPECTED
            </div>
            <h2 className="text-base sm:text-2xl font-black text-[#d9a01c] tracking-tight mt-1">
              {formatNum(team.expected)}
            </h2>
          </div>

          {/* Achieved */}
          <div className="pl-3.5 flex flex-col justify-between min-h-[64px]">
            <div className="text-[10px] font-black text-[#22683e] uppercase tracking-wider leading-tight mt-auto">
              ACHIEVED
            </div>
            <h2 className="text-base sm:text-2xl font-black text-[#22683e] tracking-tight mt-1">
              {formatNum(team.achieved)}
            </h2>
          </div>
        </div>

        {/* Double-Progress Bar */}
        <div className="mt-8 space-y-2 pb-4">
          <div className="relative w-full h-3 bg-[#eedad5] rounded-full overflow-hidden flex">
            {/* Achieved green segment */}
            <div 
              style={{ width: `${team.achievedPct}%` }} 
              className="h-full bg-[#136336] rounded-l-full"
            />
            {/* Expected target overflow amber segment */}
            <div 
              style={{ width: `${team.expectedPct - team.achievedPct}%` }} 
              className="h-full bg-[#e0a01a]"
            />
          </div>
          
          {/* Progress Bar Indicators */}
          <div className="relative flex justify-between text-[10px] font-extrabold tracking-wide pt-1.5 text-zinc-400">
            <span>0%</span>
            
            {/* Dynamic offset elements */}
            <div className="absolute left-0 right-0 top-1.5 flex justify-between px-1 pointer-events-none">
              <span 
                style={{ left: `${team.achievedPct}%` }} 
                className="absolute -translate-x-1/2 text-[#136336] font-bold transition-all duration-300"
              >
                {team.achievedPct}% ACHIEVED
              </span>
              
              <span 
                style={{ left: `${team.expectedPct}%` }} 
                className={`absolute -translate-x-1/2 text-[#e0a01a] font-bold transition-all duration-300 ${
                  isLabelOverlap ? 'translate-y-3.5' : ''
                }`}
              >
                {team.expectedPct}% EXPECTED
              </span>
            </div>
            
            <span className="ml-auto">100%</span>
          </div>
        </div>

        {/* Gap Indicator notification box */}
        <div className="mt-8 bg-[#f4f4f5] border-l-[6px] border-[#136336] rounded-r-2xl rounded-l-md p-4 sm:p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 border border-zinc-200 shadow-sm">
            <TrendingDown className="text-[#136336]" size={22} />
          </div>
          <div>
            <h4 className="font-extrabold text-sm sm:text-base text-zinc-950">
              Achievement Gap: {formatNum(team.gap)}
            </h4>
            <p className="text-xs text-zinc-500 mt-1 font-semibold leading-relaxed">
              The team is currently <span className="font-bold">{Math.abs(team.gapPct)}% behind</span> the expected linear target for today.
            </p>
          </div>
        </div>
      </Card>

      {/* ─── Sales Representatives section ─── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-[var(--color-text-main)]">Sales Representatives</h3>
          <span className="text-xs font-bold text-[#8e8e93]">{filteredReps.length} Active Agents</span>
        </div>

        {/* Representative cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredReps.map((rep) => {
            const getAvatarBg = (color) => {
              switch (color) {
                case 'primary':
                case 'success':
                  return 'bg-[#22683e] text-white';
                case 'info':
                  return 'bg-[#0070c0] text-white';
                default:
                  return 'bg-zinc-600 text-white';
              }
            };

            return (
              <Card key={rep.id} className="p-5 flex flex-col justify-between" hoverable={true}>
                <div>
                  {/* Rep Header */}
                  <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3.5 mb-4">
                    <div className="flex items-center gap-3">
                      {/* Circle Initials Avatar */}
                      <div className={`w-12 h-12 rounded-xl ${getAvatarBg(rep.avatarColor)} flex items-center justify-center font-extrabold text-sm shadow-2xs`}>
                        {rep.initials}
                      </div>
                      <div>
                        <h4 className="font-extrabold text-sm text-[var(--color-text-main)] leading-none">{rep.name}</h4>
                        <span className="text-xs text-[var(--color-text-muted)] font-semibold mt-1.5 block">SR ID: {rep.id}</span>
                      </div>
                    </div>

                    {/* Status Indicator */}
                    <div className="text-right">
                      <span className="block text-[8px] font-black text-[#8e8e93] tracking-wide uppercase">Status</span>
                      <div className="flex items-center gap-1.5 mt-0.5 justify-end">
                        <span className={`w-2 h-2 rounded-full ${
                          rep.statusVariant === 'success' ? 'bg-[#22683e]' :
                          rep.statusVariant === 'warning' ? 'bg-amber-500' : 'bg-rose-500'
                        }`} />
                        <span className="text-xs font-bold text-[var(--color-text-main)]">{rep.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sub cards details */}
                  <div className="grid grid-cols-2 gap-3.5 mb-4">
                    {/* Today's Pulse */}
                    <div className="bg-[#f2f2f7]/50 border border-zinc-200 rounded-xl p-3 space-y-1.5">
                      <span className="block text-[8px] font-black text-[#8e8e93] tracking-wider uppercase">Today's Pulse</span>
                      <div className="flex justify-between items-start text-[10px] font-semibold text-zinc-500">
                        <div>
                          <span>Order:</span>
                          <div className="text-xs font-extrabold text-emerald-700 mt-0.5">
                            {formatNum(rep.todayPulse.order)}
                          </div>
                        </div>
                        <div className="text-right">
                          <span>Tgt:</span>
                          <div className="text-xs font-extrabold text-red-700 mt-0.5">
                            {formatNum(rep.todayPulse.target)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* MTD Progress */}
                    <div className="bg-[#f2f2f7]/50 border border-zinc-200 rounded-xl p-3 space-y-1.5">
                      <span className="block text-[8px] font-black text-[#8e8e93] tracking-wider uppercase">MTD Progress</span>
                      <div className="flex justify-between items-start text-[10px] font-semibold text-zinc-500">
                        <div>
                          <span>Ach:</span>
                          <div className="text-xs font-extrabold text-emerald-700 mt-0.5">
                            {formatNum(rep.mtdProgress.achieved)}
                          </div>
                        </div>
                        <div className="text-right">
                          <span>Exp:</span>
                          <div className="text-xs font-extrabold text-amber-500 mt-0.5">
                            {formatNum(rep.mtdProgress.expected)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress visual and notes */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    {/* Progress Bar Container */}
                    <div className="flex-1 h-2 bg-[#eedad5] rounded-full overflow-hidden flex">
                      <div 
                        style={{ width: `${rep.mtdProgress.pct}%` }} 
                        className="h-full bg-[#136336] rounded-l-full"
                      />
                      {!rep.mtdProgress.isAhead && (
                        <div 
                          style={{ width: '12%' }} 
                          className="h-full bg-[#e0a01a]"
                        />
                      )}
                    </div>
                    {/* Percentage text */}
                    <span className="text-xs sm:text-sm font-extrabold text-[#136336] shrink-0">
                      {rep.mtdProgress.pct}%
                    </span>
                  </div>

                  {/* Sub text status info */}
                  {rep.mtdProgress.isAhead && (
                    <div className="text-xs font-bold text-[#22683e]">
                      Ahead of Target: +{formatNum(rep.mtdProgress.gap)}
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
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
