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


      {/* ─── H1 and H2 Grid (Side by side on desktop, stacked on mobile) ─── */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_auto_1fr] gap-6 xl:gap-8 items-stretch">
        {/* 1st Half Metrics (AM Session) */}
        <div className="w-full">
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
        </div>

        {/* Visual Separator */}
        <div className="hidden xl:flex items-center justify-center">
          <div className="w-px h-[90%] bg-zinc-200 shadow-sm rounded-full"></div>
        </div>
        <div className="xl:hidden w-full flex items-center justify-center px-4">
          <div className="h-px w-full bg-zinc-200 shadow-sm rounded-full"></div>
        </div>

        {/* 2nd Half Metrics (PM Session) */}
        <div className="w-full">
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
    </div>
  );
}
