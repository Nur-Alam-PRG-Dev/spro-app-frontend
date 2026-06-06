'use client';

import React from 'react';
import { Calendar, CheckCircle2, BarChart3 } from 'lucide-react';
import HalfMetricsCard from './HalfMetricsCard';

export default function OverallSummaryView({
  overallSummary,
  fiscalYear,
  verifiedData,
  formatCurrency,
  formatNum
}) {
  return (
    <div className="space-y-6">
      {/* ─── Performance Intelligence Top Banner Card ─── */}
      <div className="relative overflow-hidden rounded-2xl bg-[#267043] text-white p-6 shadow-sm">
        <div className="space-y-2 max-w-2xl z-10 relative">
          <h2 className="text-xl font-bold tracking-tight">Half Summary Report</h2>
          <p className="text-xs text-emerald-100/90 leading-relaxed font-medium">
            Performance metrics updated as of Today, 14:30 PM
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold bg-emerald-950/40 text-emerald-350 border border-emerald-850/30 uppercase tracking-wider">
              ● Cloud Synchronized
            </span>
          </div>
        </div>

        {/* Visual Icon Decoration */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:block opacity-20">
          <BarChart3 size={72} className="text-white" />
        </div>
      </div>

      {/* ─── H1 and H2 Grid (Side by side on desktop, stacked on mobile) ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* 1st Half Metrics (AM Session) */}
        <HalfMetricsCard
          type="am"
          title="1st Half Metrics"
          period={overallSummary.firstHalf.period}
          heroLabel="Order Amount"
          heroAmount={overallSummary.firstHalf.orderAmount}
          heroTrend={overallSummary.firstHalf.orderAmountTrend}
          orderCount={overallSummary.firstHalf.orderCount}
          visitCount={overallSummary.firstHalf.visitCount}
          strikeRate={overallSummary.firstHalf.strikeRate}
          lpc={overallSummary.firstHalf.lpc}
          formatCurrency={formatCurrency}
          formatNum={formatNum}
        />

        {/* 2nd Half Metrics (PM Session) */}
        <HalfMetricsCard
          type="pm"
          title="2nd Half Metrics"
          period={overallSummary.secondHalf.period}
          heroLabel="Order Amount"
          heroAmount={overallSummary.secondHalf.totalVolume}
          heroTrend={overallSummary.secondHalf.volumeTrend}
          orderCount={overallSummary.secondHalf.orderCount}
          visitCount={overallSummary.secondHalf.visitCount}
          strikeRate={overallSummary.secondHalf.strikeRate}
          lpc={overallSummary.secondHalf.lpc}
          formatCurrency={formatCurrency}
          formatNum={formatNum}
        />
      </div>
    </div>
  );
}
