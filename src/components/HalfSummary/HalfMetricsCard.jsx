'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import {
  TrendingUp,
  ShoppingBag
} from 'lucide-react';

export default function HalfMetricsCard({
  type = 'am', // 'am' or 'pm'
  title,
  period,
  heroLabel,
  heroAmount,
  heroTrend,
  orderCount,
  visitCount,
  strikeRate,
  lpc,
  formatCurrency,
  formatNum
}) {
  // Productive and Non-Productive Outlet Calculations
  const productive = Math.round(visitCount * (strikeRate / 100));
  const nonProductive = Math.max(0, visitCount - productive);

  const isAM = type === 'am';

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-2">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-5 bg-[#267043] rounded-full" />
          <h3 className="font-extrabold text-base text-[var(--color-text-main)]">{title}</h3>
        </div>
        <span className={`text-[10px] font-black tracking-wide px-2.5 py-1 rounded-full uppercase font-bold ${
          isAM 
            ? 'bg-[#e1f5fe] text-[#0288d1]' 
            : 'bg-[#f1f1f1] text-[#616161] border border-zinc-200'
        }`}>
          {isAM ? 'AM Session' : 'PM Session'}
        </span>
      </div>

      {/* Hero Card: Order Amount / Total Volume */}
      <Card className="p-5" hoverable={false}>
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">
            <ShoppingBag size={14} className="text-[var(--color-text-muted)]" />
            <span>{heroLabel}</span>
          </div>
          <div className="flex items-baseline justify-between">
            <h2 className="text-3xl font-black text-emerald-800 tracking-tight">
              {formatCurrency(heroAmount)}
            </h2>
            <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
              <TrendingUp size={12} className="stroke-[2.5px]" />
              {heroTrend}%
            </span>
          </div>
        </div>
      </Card>

      {/* 6-Column Compact Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {/* Order Count */}
        <div className="bg-white border border-[var(--color-border)] rounded-2xl p-4 flex flex-col justify-between min-h-[88px]">
          <span className="block text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">Order Count</span>
          <span className="text-xl font-black text-[var(--color-text-main)] mt-2">
            {formatNum(orderCount)}
          </span>
        </div>

        {/* Visit Count */}
        <div className="bg-white border border-[var(--color-border)] rounded-2xl p-4 flex flex-col justify-between min-h-[88px]">
          <span className="block text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">Visit Count</span>
          <span className="text-xl font-black text-[#136336] mt-2">
            {formatNum(visitCount)}
          </span>
        </div>

        {/* Prod. Outlets */}
        <div className="bg-white border border-[var(--color-border)] rounded-2xl p-4 flex flex-col justify-between min-h-[88px]">
          <span className="block text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">Prod. Outlets</span>
          <span className="text-xl font-black text-[var(--color-text-main)] mt-2">
            {formatNum(productive)}
          </span>
        </div>

        {/* Non-Prod. */}
        <div className="bg-white border border-[var(--color-border)] rounded-2xl p-4 flex flex-col justify-between min-h-[88px]">
          <span className="block text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">Non-Prod.</span>
          <span className="text-xl font-black text-[#a61c1c] mt-2">
            {formatNum(nonProductive)}
          </span>
        </div>

        {/* LPC */}
        <div className="bg-white border border-[var(--color-border)] rounded-2xl p-4 flex flex-col justify-between min-h-[88px]">
          <span className="block text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">LPC</span>
          <span className="text-xl font-black text-[var(--color-text-main)] mt-2">
            {lpc}
          </span>
        </div>

        {/* Strike Rate */}
        <div className="bg-white border border-[var(--color-border)] rounded-2xl p-4 flex flex-col justify-between min-h-[88px]">
          <span className="block text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">Strike Rate</span>
          <span className="text-xl font-black text-[#136336] mt-2">
            {strikeRate}%
          </span>
        </div>
      </div>

      {/* Promo banner card */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 flex items-center justify-between shadow-2xs">
        <div className="space-y-1 z-10 max-w-[70%]">
          <p className="text-sm font-extrabold text-zinc-950 leading-snug">
            Real-time visibility into your team&apos;s efficiency.
          </p>
        </div>
        
        {/* Decorative Floating Labels */}
        <div className="flex gap-1.5 items-center opacity-70">
          <div className="flex flex-col items-center bg-zinc-50 border border-zinc-150 p-1.5 rounded-lg shadow-3xs">
            <span className="text-[8px] font-bold text-zinc-400">Around Me</span>
          </div>
          <div className="flex flex-col items-center bg-zinc-50 border border-zinc-150 p-1.5 rounded-lg shadow-3xs">
            <span className="text-[8px] font-bold text-zinc-400">Location</span>
          </div>
        </div>
      </div>
    </div>
  );
}
