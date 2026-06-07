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
        <span className={`text-[10px] font-black tracking-wide px-2.5 py-1 rounded-full uppercase font-bold ${isAM
          ? 'bg-[#e1f5fe] text-[#0288d1]'
          : 'bg-[#f1f1f1] text-[#616161] border border-zinc-200'
          }`}>
          {isAM ? 'AM Session' : 'PM Session'}
        </span>
      </div>

      <Card className="p-4 sm:p-5" hoverable={false}>
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">
            <ShoppingBag size={14} className="text-[var(--color-text-muted)]" />
            <span>{heroLabel}</span>
          </div>

          <div className="flex items-center justify-between">
            <h2 className="text-2xl sm:text-3xl font-black text-emerald-800 tracking-tight">
              {formatCurrency(heroAmount)}
            </h2>

            {/* Circular Progress for Trend */}
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end">
                <span className={`text-[11px] sm:text-xs font-black ${heroTrend > 0 ? 'text-emerald-600' : heroTrend < 0 ? 'text-rose-600' : 'text-zinc-500'}`}>
                  {heroTrend > 0 ? '+' : heroTrend < 0 ? '-' : ''}{Math.abs(heroTrend)}%
                </span>
                <span className="text-[8px] font-extrabold text-zinc-400 uppercase tracking-widest">
                  Change
                </span>
              </div>

              <div className="relative flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Background Circle */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    className="stroke-zinc-100"
                    strokeWidth="3.5"
                  />
                  {/* Progress Circle */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    className={heroTrend > 0 ? "stroke-emerald-500" : heroTrend < 0 ? "stroke-rose-500" : "stroke-zinc-400"}
                    strokeWidth="3.5"
                    strokeDasharray={2 * Math.PI * 14}
                    strokeDashoffset={(2 * Math.PI * 14) - ((Math.min(100, Math.abs(heroTrend))) / 100) * (2 * Math.PI * 14)}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                  />
                </svg>
                {/* Center Icon */}
                <div className={`absolute inset-0 flex items-center justify-center ${heroTrend > 0 ? 'text-emerald-600' : heroTrend < 0 ? 'text-rose-600' : 'text-zinc-500'}`}>
                  <TrendingUp size={12} className={`stroke-[3px] ${heroTrend < 0 ? 'rotate-180' : ''}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 6-Column Compact Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {/* Order Count */}
        <div className="bg-white border border-[var(--color-border)] rounded-xl p-3 flex flex-col justify-between min-h-[76px] relative overflow-hidden">
          <span className="block text-[9px] sm:text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">Order Count</span>
          <span className="text-lg sm:text-xl font-black text-[var(--color-text-main)] mt-1">
            {formatNum(orderCount)}
          </span>
        </div>

        {/* Visit Count */}
        <div className="bg-white border border-[var(--color-border)] rounded-xl p-3 flex flex-col justify-between min-h-[76px] relative overflow-hidden">
          <span className="block text-[9px] sm:text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">Visit Count</span>
          <span className="text-lg sm:text-xl font-black text-[#136336] mt-1">
            {formatNum(visitCount)}
          </span>
        </div>

        {/* Prod. Outlets */}
        <div className="bg-white border border-[var(--color-border)] rounded-xl p-3 flex flex-col justify-between min-h-[76px] relative overflow-hidden">
          <span className="block text-[9px] sm:text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">Prod. Outlets</span>
          <div className="mt-1 space-y-1.5">
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-black text-[var(--color-text-main)] leading-none">{formatNum(productive)}</span>
              <span className="text-[9px] font-bold text-zinc-400">/ {formatNum(visitCount)}</span>
            </div>
            <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(productive / (visitCount || 1)) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Non-Prod. */}
        <div className="bg-white border border-[var(--color-border)] rounded-xl p-3 flex flex-col justify-between min-h-[76px] relative overflow-hidden">
          <span className="block text-[9px] sm:text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">Non-Prod.</span>
          <div className="mt-1 space-y-1.5">
            <div className="flex items-baseline gap-1">
              <span className="text-lg sm:text-xl font-black text-[#a61c1c] leading-none">{formatNum(nonProductive)}</span>
              <span className="text-[9px] font-bold text-zinc-400">/ {formatNum(visitCount)}</span>
            </div>
            <div className="w-full h-1 bg-zinc-100 rounded-full overflow-hidden">
              <div className="bg-rose-500 h-full rounded-full" style={{ width: `${(nonProductive / (visitCount || 1)) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* LPC */}
        <div className="bg-white border border-[var(--color-border)] rounded-xl p-3 flex flex-col justify-between min-h-[76px] relative overflow-hidden">
          <span className="block text-[9px] sm:text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">LPC</span>
          <span className="text-lg sm:text-xl font-black text-[var(--color-text-main)] mt-1">
            {lpc}
          </span>
        </div>

        {/* Strike Rate */}
        <div className="bg-white border border-[var(--color-border)] rounded-xl p-3 flex flex-col justify-between min-h-[76px] relative overflow-hidden">
          <span className="block text-[9px] sm:text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-wider">Strike Rate</span>
          <div className="mt-1 space-y-1.5">
            <span className="text-lg sm:text-xl font-black text-[#136336] leading-none block">
              {strikeRate}%
            </span>
            <div className="w-full h-1 bg-emerald-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full"
                style={{ width: `${Math.min(100, Math.max(0, strikeRate))}%` }}
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
