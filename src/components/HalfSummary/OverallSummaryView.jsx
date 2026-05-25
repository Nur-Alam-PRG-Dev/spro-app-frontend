import React from 'react';
import Card from '@/components/ui/Card';
import { Calendar, CheckCircle2, BarChart3, Download } from 'lucide-react';
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
      {/* Performance Intelligence banner card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-900 to-emerald-800 text-white p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="space-y-3 max-w-2xl z-10">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight">Performance Intelligence</h2>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Comprehensive analysis of logistics and sales trajectories for H1 and H2. Gain actionable insights from granular KPI tracking.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold bg-emerald-950/40 text-emerald-300 border border-emerald-800/40">
              <Calendar size={12} />
              {fiscalYear}
            </span>
            {verifiedData && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold bg-emerald-950/40 text-emerald-300 border border-emerald-800/40">
                <CheckCircle2 size={12} />
                Verified Data
              </span>
            )}
          </div>
        </div>

        {/* Visual Icon Decoration */}
        <div className="hidden lg:block z-10 pr-4">
          <div className="w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10 backdrop-blur-md">
            <BarChart3 size={40} className="text-emerald-300" />
          </div>
        </div>

        {/* Abstract Background pattern */}
        <div className="absolute right-0 bottom-0 top-0 w-1/3 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Half metrics columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1st Half Metrics Card */}
        <HalfMetricsCard
          title="1st Half Metrics"
          period={overallSummary.firstHalf.period}
          sessionLabel="AM Session Analysis"
          sessionBadgeType="am"
          heroLabel="Order Amount"
          heroAmount={overallSummary.firstHalf.orderAmount}
          heroTrend={overallSummary.firstHalf.orderAmountTrend}
          targetAchievement={overallSummary.firstHalf.targetAchievement}
          orderCount={overallSummary.firstHalf.orderCount}
          orderCountTrend={overallSummary.firstHalf.orderCountTrend}
          visitCount={overallSummary.firstHalf.visitCount}
          visitCountTrend={overallSummary.firstHalf.visitCountTrend}
          productivity={overallSummary.firstHalf.productivity}
          productivityLabel={overallSummary.firstHalf.productivityLabel}
          strikeRate={overallSummary.firstHalf.strikeRate}
          strikeRateLabel={overallSummary.firstHalf.strikeRateLabel}
          lpc={overallSummary.firstHalf.lpc}
          lpcLabel={overallSummary.firstHalf.lpcLabel}
          formatCurrency={formatCurrency}
          formatNum={formatNum}
        />

        {/* 2nd Half Metrics Card */}
        <HalfMetricsCard
          title="2nd Half Metrics"
          period={overallSummary.secondHalf.period}
          sessionLabel="PM Session Analysis"
          sessionBadgeType="pm"
          heroLabel="Total Volume"
          heroAmount={overallSummary.secondHalf.totalVolume}
          heroTrend={overallSummary.secondHalf.volumeTrend}
          targetAchievement={overallSummary.secondHalf.targetAchievement}
          orderCount={overallSummary.secondHalf.orderCount}
          orderCountTrend={overallSummary.secondHalf.orderCountTrend}
          visitCount={overallSummary.secondHalf.visitCount}
          visitCountTrend={overallSummary.secondHalf.visitCountTrend}
          productivity={overallSummary.secondHalf.productivity}
          productivityLabel={overallSummary.secondHalf.productivityLabel}
          strikeRate={overallSummary.secondHalf.strikeRate}
          strikeRateLabel={overallSummary.secondHalf.strikeRateLabel}
          lpc={overallSummary.secondHalf.lpc}
          lpcLabel={overallSummary.secondHalf.lpcLabel}
          formatCurrency={formatCurrency}
          formatNum={formatNum}
        />
      </div>

      {/* Quarterly Comparison Drilldown Table */}
      <Card className="p-0 overflow-hidden" hoverable={false}>
        <div className="px-6 py-5 border-b border-[var(--color-border)] flex items-center justify-between flex-wrap gap-3">
          <h3 className="font-extrabold text-sm sm:text-base text-[var(--color-text-main)]">
            Quarterly Comparison Drilldown
          </h3>
          <button className="flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-700 text-white py-1.5 px-3 rounded-lg text-xs font-bold transition-colors shadow-2xs cursor-pointer">
            <Download size={14} />
            <span>Export CSV</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-zinc-50 border-b border-[var(--color-border)] text-[var(--color-text-muted)] font-black uppercase text-[10px] tracking-wider">
                <th className="px-6 py-4">Metric</th>
                <th className="px-6 py-4">Q1 Actual</th>
                <th className="px-6 py-4">Q2 Actual</th>
                <th className="px-6 py-4">Growth %</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {overallSummary.drilldown.map((row, idx) => {
                const isCurrency = row.metric.includes('Sales Amount');
                const isPct = row.metric.includes('Rate');

                return (
                  <tr key={idx} className="hover:bg-zinc-50/50 transition-colors font-semibold text-[var(--color-text-main)]">
                    <td className="px-6 py-4.5 font-extrabold">{row.metric}</td>
                    <td className="px-6 py-4.5">
                      {isCurrency ? formatCurrency(row.q1Actual) : isPct ? `${row.q1Actual}%` : formatNum(row.q1Actual)}
                    </td>
                    <td className="px-6 py-4.5">
                      {isCurrency ? formatCurrency(row.q2Actual) : isPct ? `${row.q2Actual}%` : formatNum(row.q2Actual)}
                    </td>
                    <td className={`px-6 py-4.5 font-black ${row.growth > 0 ? 'text-emerald-700' : 'text-red-600'}`}>
                      {row.growth > 0 ? `+${row.growth}%` : `${row.growth}%`}
                    </td>
                    <td className="px-6 py-4.5">
                      <span className={`inline-flex items-center justify-center font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wide border ${
                        row.status === 'On Track' ? 'bg-emerald-50 text-emerald-800 border-emerald-100' :
                        row.status === 'Exceeding' ? 'bg-sky-50 text-sky-850 border-sky-100' :
                        'bg-rose-50 text-rose-800 border-rose-100'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
