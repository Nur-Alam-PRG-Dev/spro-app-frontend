'use client';

import React, { useState } from 'react';
import Card from '@/components/ui/Card';
import { ChevronUp, ChevronDown, MapPin, CheckCircle2, AlertTriangle } from 'lucide-react';

const thanaData = [
  { sl: 1, name: '2020-KHALIDIYA', totalShops: 757, visitedShops: '1 (0%)', visitedCount: 1, avgDuration: '00:08:24', visitDays: '1 Days', nonAssigned: true },
  { sl: 2, name: '9060-DIBBA SOUTH', totalShops: 0, visitedShops: '1 (0%)', visitedCount: 1, avgDuration: '00:02:01', visitDays: '1 Days', nonAssigned: true },
  { sl: 3, name: '9090-MADAM', totalShops: 186, visitedShops: '1 (1%)', visitedCount: 1, avgDuration: '00:01:08', visitDays: '1 Days', nonAssigned: true },
  { sl: 4, name: '9050-BIDIYA', totalShops: 181, visitedShops: '2 (1%)', visitedCount: 2, avgDuration: '00:01:38', visitDays: '1 Days', nonAssigned: true },
  { sl: 5, name: '9083-DIBBA BAZAR', totalShops: 347, visitedShops: '2 (1%)', visitedCount: 2, avgDuration: '00:05:24', visitDays: '1 Days', nonAssigned: true },
  { sl: 6, name: '9086-DAHID CITY NEW', totalShops: 148, visitedShops: '3 (2%)', visitedCount: 3, avgDuration: '00:02:08', visitDays: '1 Days', nonAssigned: true },
  { sl: 7, name: '9020-KALBA', totalShops: 216, visitedShops: '8 (4%)', visitedCount: 8, avgDuration: '00:03:20', visitDays: '1 Days', nonAssigned: true },
  { sl: 8, name: 'FUJAIRAH CITY', totalShops: 375, visitedShops: '11 (3%)', visitedCount: 11, avgDuration: '00:03:15', visitDays: '3 Days', nonAssigned: true },
  { sl: 9, name: 'AI SIJI & TOUBAN', totalShops: 409, visitedShops: '14 (3%)', visitedCount: 14, avgDuration: '00:03:42', visitDays: '2 Days', nonAssigned: true },
  { sl: 10, name: '90100-MASAFI', totalShops: 361, visitedShops: '28 (8%)', visitedCount: 28, avgDuration: '00:03:28', visitDays: '2 Days', nonAssigned: true },
];

const zoneData = [
  { sl: 1, name: '2050-Sharjah City', totalShops: 605, visitedShops: '71 (12%)', visitedCount: 71, avgDuration: '3m 5s / shop', visitDays: '3 Days', nonAssigned: false },
];

const districtData = [
  { sl: 1, name: 'Dubai Ind', totalShops: 2162, visitedShops: '1 (0%)', visitedCount: 1, avgDuration: '00:01:08', visitDays: '1 Days', nonAssigned: true },
  { sl: 2, name: 'Abu Dhabi', totalShops: 3005, visitedShops: '1 (0%)', visitedCount: 1, avgDuration: '00:08:24', visitDays: '1 Days', nonAssigned: true },
  { sl: 3, name: 'Fujairah', totalShops: 2336, visitedShops: '69 (3%)', visitedCount: 69, avgDuration: '00:03:23', visitDays: '3 Days', nonAssigned: true },
];

export default function PerformanceTable({ activeSubTab, searchQuery = '' }) {
  const [isTableMinimized, setIsTableMinimized] = useState(false);

  const getSubTabData = () => {
    switch (activeSubTab) {
      case 'Zone Wise':
        return {
          title: 'Zone Performance Summary',
          totalLabel: 'TOTAL ZONES',
          visitedLabel: 'VISITED ZONES',
          pendingLabel: 'PENDING ZONES',
          totalCount: 1,
          visitedCount: 1,
          pendingCount: 0,
          nameHeader: 'ZONE NAME',
          visitedHeader: 'SHOPS VISITED',
          daysHeader: 'NUMBER OF DAYS',
          data: zoneData,
        };
      case 'District Wise':
        return {
          title: 'District Performance Summary',
          totalLabel: 'TOTAL DISTRICTS',
          visitedLabel: 'VISITED DISTRICTS',
          pendingLabel: 'PENDING DISTRICTS',
          totalCount: 3,
          visitedCount: 3,
          pendingCount: 0,
          nameHeader: 'DISTRICT NAME',
          visitedHeader: 'VISITED SHOPS',
          daysHeader: 'NUMBER OF DAYS',
          data: districtData,
        };
      case 'Thana Wise':
      default:
        return {
          title: 'Thana Performance Summary',
          totalLabel: 'TOTAL THANAS',
          visitedLabel: 'VISITED THANAS',
          pendingLabel: 'PENDING THANAS',
          totalCount: 10,
          visitedCount: 10,
          pendingCount: 0,
          nameHeader: 'THANA NAME',
          visitedHeader: 'VISITED SHOPS',
          daysHeader: 'NUMBER OF VISIT DAYS',
          data: thanaData,
        };
    }
  };

  const currentSummary = getSubTabData();

  const filteredTableData = currentSummary.data.filter((item) => {
    if (!searchQuery) return true;
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <Card className="p-3.5 sm:p-6 overflow-hidden" hoverable={false}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4.5 mb-5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-5 bg-[var(--color-primary)] rounded-full" />
          <h3 className="font-extrabold text-base text-[var(--color-text-main)]">
            {currentSummary.title}
          </h3>
        </div>
        <button
          onClick={() => setIsTableMinimized(!isTableMinimized)}
          className="flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] hover:underline cursor-pointer bg-transparent border-0"
        >
          <span>{isTableMinimized ? 'Expand' : 'Minimize'}</span>
          {isTableMinimized ? (
            <ChevronDown
              size={14}
              className="stroke-[2.5px]"
            />
          ) : (
            <ChevronUp
              size={14}
              className="stroke-[2.5px]"
            />
          )}
        </button>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Hero Metrics cards */}
        <div className="grid grid-cols-3 gap-1.5 sm:gap-4">
          {/* Total Card */}
          <div className="flex items-center gap-1.5 sm:gap-4 bg-zinc-50/50 border border-[var(--color-border)] rounded-xl sm:rounded-2xl p-2 sm:p-4.5">
            <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-[var(--color-primary-light)] text-[var(--color-primary)] flex items-center justify-center border border-[var(--color-primary-light-hover)] shrink-0">
              <MapPin size={12} className="sm:hidden stroke-[2.5px]" />
              <MapPin size={20} className="hidden sm:block stroke-[2.5px]" />
            </div>
            <div className="min-w-0">
              <span className="block text-[8px] sm:text-[10px] font-black text-zinc-400 tracking-wider uppercase leading-none truncate">
                {currentSummary.totalLabel}
              </span>
              <h2 className="text-sm sm:text-2xl font-black text-[var(--color-text-main)] mt-1 sm:mt-1.5 leading-none">
                {currentSummary.totalCount}
              </h2>
            </div>
          </div>

          {/* Visited Card */}
          <div className="flex items-center gap-1.5 sm:gap-4 bg-zinc-50/50 border border-[var(--color-border)] rounded-xl sm:rounded-2xl p-2 sm:p-4.5">
            <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shrink-0">
              <CheckCircle2 size={12} className="sm:hidden stroke-[2.5px]" />
              <CheckCircle2 size={20} className="hidden sm:block stroke-[2.5px]" />
            </div>
            <div className="min-w-0">
              <span className="block text-[8px] sm:text-[10px] font-black text-zinc-400 tracking-wider uppercase leading-none truncate">
                {currentSummary.visitedLabel}
              </span>
              <h2 className="text-sm sm:text-2xl font-black text-indigo-600 mt-1 sm:mt-1.5 leading-none underline decoration-indigo-500/40 decoration-2 underline-offset-4">
                {currentSummary.visitedCount}
              </h2>
            </div>
          </div>

          {/* Pending Card */}
          <div className="flex items-center gap-1.5 sm:gap-4 bg-zinc-50/50 border border-[var(--color-border)] rounded-xl sm:rounded-2xl p-2 sm:p-4.5">
            <div className="w-6 h-6 sm:w-10 sm:h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-100 shrink-0">
              <AlertTriangle size={12} className="sm:hidden stroke-[2.5px]" />
              <AlertTriangle size={20} className="hidden sm:block stroke-[2.5px]" />
            </div>
            <div className="min-w-0">
              <span className="block text-[8px] sm:text-[10px] font-black text-zinc-400 tracking-wider uppercase leading-none truncate">
                {currentSummary.pendingLabel}
              </span>
              <h2 className="text-sm sm:text-2xl font-black text-rose-600 mt-1 sm:mt-1.5 leading-none">
                {currentSummary.pendingCount}
              </h2>
            </div>
          </div>
        </div>

        {/* Table */}
        {!isTableMinimized && (
          <div className="overflow-x-auto border border-[var(--color-border)] rounded-2xl bg-white">
            <table className="w-full text-left border-collapse text-[10px] sm:text-xs">
              <thead>
                <tr className="bg-zinc-50 border-b border-[var(--color-border)] text-zinc-500 font-bold uppercase text-[8px] sm:text-[9px] tracking-wider whitespace-nowrap">
                  <th className="px-1.5 py-2 sm:px-4 sm:py-3 text-center w-8 sm:w-12">SL</th>
                  <th className="px-1.5 py-2 sm:px-4 sm:py-3">{currentSummary.nameHeader}</th>
                  <th className="px-1.5 py-2 sm:px-4 sm:py-3 text-right">TOTAL SHOPS</th>
                  <th className="px-1.5 py-2 sm:px-4 sm:py-3 text-right">{currentSummary.visitedHeader}</th>
                  <th className="px-1.5 py-2 sm:px-4 sm:py-3 text-right">AVG SHOP DURATION</th>
                  <th className="px-1.5 py-2 sm:px-4 sm:py-3 text-right">{currentSummary.daysHeader}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                {filteredTableData.length > 0 ? (
                  filteredTableData.map((row) => {
                    const isHighVisited = row.visitedCount >= 3;
                    return (
                      <tr
                        key={row.sl}
                        className={`transition-colors font-medium text-[var(--color-text-main)] hover:bg-zinc-50/60 ${isHighVisited ? 'bg-indigo-50/30' : ''
                          }`}
                      >
                        <td className="px-1.5 py-2 sm:px-4 sm:py-3 text-center font-bold text-zinc-900 w-8 sm:w-12">
                          {row.sl}
                        </td>
                        <td className="px-1.5 py-2 sm:px-4 sm:py-3 font-extrabold">
                          <div className="flex items-center gap-1.5 sm:gap-2">
                            <span className="whitespace-nowrap">{row.name}</span>
                            {row.nonAssigned && (
                              <span className="bg-rose-50 text-rose-600 border border-rose-100 rounded px-1.5 py-0.5 font-bold text-[8px] uppercase tracking-wide shrink-0 whitespace-nowrap">
                                NON-ASSIGNED
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-1.5 py-2 sm:px-4 sm:py-3 text-right font-semibold text-zinc-600">
                          {row.totalShops}
                        </td>
                        <td className="px-1.5 py-2 sm:px-4 sm:py-3 text-right font-bold text-zinc-800 whitespace-nowrap">
                          {row.visitedShops}
                        </td>
                        <td className="px-1.5 py-2 sm:px-4 sm:py-3 text-right font-semibold text-zinc-600 whitespace-nowrap">
                          {row.avgDuration}
                        </td>
                        <td className="px-1.5 py-2 sm:px-4 sm:py-3 text-right font-semibold text-zinc-600 whitespace-nowrap">
                          {row.visitDays}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-8 text-xs font-semibold text-[var(--color-text-muted)]">
                      No matching records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Card>
  );
}
