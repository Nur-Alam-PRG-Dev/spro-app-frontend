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
