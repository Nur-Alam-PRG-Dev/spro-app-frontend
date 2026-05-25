import React from 'react';
import Card from '@/components/ui/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function HalfMetricsCard({
  title,
  period,
  sessionLabel,
  sessionBadgeType,
  heroLabel,
  heroAmount,
  heroTrend,
  targetAchievement,
  orderCount,
  orderCountTrend,
  visitCount,
  visitCountTrend,
  productivity,
  productivityLabel,
  strikeRate,
  strikeRateLabel,
  lpc,
  lpcLabel,
  formatCurrency,
  formatNum
}) {
  return (
    <Card className="p-5 sm:p-6" hoverable={false}>
      <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-3 mb-5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-6 bg-emerald-700 rounded-full" />
          <h3 className="font-extrabold text-base text-[var(--color-text-main)]">{title}</h3>
          <span className="text-xs text-[var(--color-text-muted)] font-medium">({period})</span>
        </div>
        <span className={`text-[10px] font-black tracking-wide px-2.5 py-1 rounded-full uppercase border ${
          sessionBadgeType === 'am'
            ? 'bg-emerald-50 text-emerald-800 border-emerald-100'
            : 'bg-zinc-100 text-zinc-800 border-zinc-200'
        }`}>
          {sessionLabel}
        </span>
      </div>

      {/* Hero card */}
      <div className="bg-[#fcfdfe] border border-[var(--color-border)] rounded-2xl p-5 mb-5 space-y-2">
        <span className="block text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">
          {heroLabel}
        </span>
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl sm:text-3xl font-black text-emerald-800 tracking-tight">
            {formatCurrency(heroAmount)}
          </h2>
          <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
            <TrendingUp size={12} className="stroke-[2.5px]" />
            {heroTrend}%
          </span>
        </div>

        <div className="space-y-1.5 pt-3">
          <div className="flex justify-between text-[10px] font-extrabold text-[var(--color-text-muted)]">
            <span>Target Achievement</span>
            <span className="text-emerald-800">{targetAchievement}%</span>
          </div>
          <div className="w-full h-2.5 bg-zinc-100 rounded-full overflow-hidden">
            <div
              style={{ width: `${targetAchievement}%` }}
              className="h-full bg-emerald-700 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Grid of stats */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-white border border-[var(--color-border)] rounded-2xl p-4 flex flex-col justify-between min-h-[92px]">
          <span className="block text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase">Order Count</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-black text-[var(--color-text-main)]">{formatNum(orderCount)}</span>
            <span className="text-xs font-bold text-emerald-700">+{orderCountTrend}%</span>
          </div>
        </div>

        <div className="bg-white border border-[var(--color-border)] rounded-2xl p-4 flex flex-col justify-between min-h-[92px]">
          <span className="block text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase">Visit Count</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-black text-[var(--color-text-main)]">{formatNum(visitCount)}</span>
            <span className={`text-xs font-bold ${visitCountTrend > 0 ? 'text-emerald-700' : 'text-rose-600'}`}>
              {visitCountTrend > 0 ? `+${visitCountTrend}%` : `${visitCountTrend}%`}
            </span>
          </div>
        </div>

        <div className="bg-white border border-[var(--color-border)] rounded-2xl p-4 flex flex-col justify-between min-h-[92px]">
          <span className="block text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase">Productivity %</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-black text-[var(--color-text-main)]">{productivity}%</span>
            <span className="text-[10px] font-black px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 uppercase tracking-wider">{productivityLabel}</span>
          </div>
        </div>

        <div className="bg-white border border-[var(--color-border)] rounded-2xl p-4 flex flex-col justify-between min-h-[92px]">
          <span className="block text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase">Strike Rate</span>
          <div className="flex items-center justify-between mt-2">
            <span className="text-lg font-black text-[var(--color-text-main)]">{strikeRate}%</span>
            <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider ${
              strikeRateLabel === 'Exceeding' ? 'bg-emerald-800 text-white' : 'bg-zinc-100 text-zinc-800'
            }`}>{strikeRateLabel}</span>
          </div>
        </div>
      </div>

      {/* LPC indicator */}
      <div className="border border-[var(--color-border)] rounded-2xl p-4 space-y-3">
        <div className="flex justify-between items-center text-[10px] font-extrabold text-[var(--color-text-muted)]">
          <span>LPC (Lines Per Call)</span>
          <span className={`px-2 py-0.5 rounded font-black ${
            lpcLabel === 'High' ? 'bg-emerald-800 text-white' : 'bg-zinc-100 text-zinc-800'
          }`}>{lpcLabel}</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-black text-[var(--color-text-main)]">{lpc}</span>
          <div className="flex-1 relative py-2">
            <div className="h-1.5 w-full bg-zinc-100 rounded-full" />
            <div
              style={{ left: `${(lpc / 5.0) * 100}%` }}
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-emerald-800 border-2 border-white shadow-sm -ml-2"
            />
            <div
              style={{ width: `${(lpc / 5.0) * 100}%` }}
              className="absolute top-1/2 -translate-y-1/2 h-1.5 bg-emerald-800 rounded-full pointer-events-none"
            />
          </div>
        </div>
      </div>
    </Card>
  );
}
