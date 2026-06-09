import React from 'react';
import Card from '../ui/Card';
import { Target, Activity, CheckCircle2, TrendingUp } from 'lucide-react';

export default function FancyInfographic({ 
  amAmount, pmAmount, 
  amCount, pmCount, 
  amVisits, pmVisits,
  formatCurrency, formatNum 
}) {
  const totalAmount = amAmount + pmAmount || 1;
  const totalCount = amCount + pmCount || 1;
  const totalVisits = amVisits + pmVisits || 1;

  const amAmountPct = (amAmount / totalAmount) * 100;
  const pmAmountPct = (pmAmount / totalAmount) * 100;

  const amCountPct = (amCount / totalCount) * 100;
  const pmCountPct = (pmCount / totalCount) * 100;

  const amVisitsPct = (amVisits / totalVisits) * 100;
  const pmVisitsPct = (pmVisits / totalVisits) * 100;

  return (
    <Card className="p-5 sm:p-6 mb-6 overflow-hidden relative border border-zinc-200/60 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl bg-gradient-to-b from-white to-zinc-50">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-400/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-sky-400/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div className="relative z-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-[var(--color-text-main)] tracking-tight flex items-center gap-2">
              <Activity size={20} className="text-indigo-600" />
              Session Performance Breakdown
            </h2>
            <p className="text-xs sm:text-sm text-[var(--color-text-muted)] font-medium mt-1">
              Comparative analysis between 1st Half (AM) and 2nd Half (PM) outputs.
            </p>
          </div>
          <div className="flex items-center gap-4 bg-white/80 p-2 px-3 rounded-xl border border-zinc-100 shadow-2xs backdrop-blur-sm shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
              <span className="text-[10px] sm:text-xs font-bold text-zinc-600 uppercase tracking-wider">1st Half</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.5)]"></span>
              <span className="text-[10px] sm:text-xs font-bold text-zinc-600 uppercase tracking-wider">2nd Half</span>
            </div>
          </div>
        </div>

        {/* Breakdown Rows */}
        <div className="space-y-8">
          
          {/* Revenue Row */}
          <div className="relative">
            <div className="flex justify-between items-end mb-2">
              <div className="w-1/3 text-left">
                <span className="block text-xl sm:text-2xl font-black text-indigo-700 leading-none mb-1">{formatCurrency(amAmount)}</span>
                <span className="text-[10px] sm:text-xs font-bold text-indigo-600/70">{amAmountPct.toFixed(1)}%</span>
              </div>
              <div className="w-1/3 text-center flex flex-col items-center justify-end pb-1">
                <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-1">
                  <TrendingUp size={16} strokeWidth={3} />
                </div>
                <span className="text-[10px] sm:text-xs font-extrabold text-indigo-900 uppercase tracking-wider">Revenue</span>
              </div>
              <div className="w-1/3 text-right">
                <span className="block text-xl sm:text-2xl font-black text-sky-700 leading-none mb-1">{formatCurrency(pmAmount)}</span>
                <span className="text-[10px] sm:text-xs font-bold text-sky-600/70">{pmAmountPct.toFixed(1)}%</span>
              </div>
            </div>
            <div className="w-full h-3 sm:h-4 bg-zinc-100 rounded-full flex overflow-hidden shadow-inner border border-zinc-200/50">
              <div className="h-full bg-gradient-to-r from-indigo-400 to-indigo-500 relative transition-all duration-1000" style={{ width: `${amAmountPct}%` }}>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"></div>
              </div>
              <div className="h-full bg-gradient-to-l from-sky-400 to-sky-500 transition-all duration-1000" style={{ width: `${pmAmountPct}%` }}></div>
            </div>
          </div>

          {/* Orders Row */}
          <div className="relative">
            <div className="flex justify-between items-end mb-2">
              <div className="w-1/3 text-left">
                <span className="block text-xl sm:text-2xl font-black text-indigo-700 leading-none mb-1">{formatNum(amCount)}</span>
                <span className="text-[10px] sm:text-xs font-bold text-indigo-600/70">{amCountPct.toFixed(1)}%</span>
              </div>
              <div className="w-1/3 text-center flex flex-col items-center justify-end pb-1">
                <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mb-1">
                  <Target size={16} strokeWidth={3} />
                </div>
                <span className="text-[10px] sm:text-xs font-extrabold text-amber-900 uppercase tracking-wider">Orders</span>
              </div>
              <div className="w-1/3 text-right">
                <span className="block text-xl sm:text-2xl font-black text-sky-700 leading-none mb-1">{formatNum(pmCount)}</span>
                <span className="text-[10px] sm:text-xs font-bold text-sky-600/70">{pmCountPct.toFixed(1)}%</span>
              </div>
            </div>
            <div className="w-full h-3 sm:h-4 bg-zinc-100 rounded-full flex overflow-hidden shadow-inner border border-zinc-200/50">
              <div className="h-full bg-gradient-to-r from-indigo-400 to-indigo-500 relative transition-all duration-1000" style={{ width: `${amCountPct}%` }}>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"></div>
              </div>
              <div className="h-full bg-gradient-to-l from-sky-400 to-sky-500 transition-all duration-1000" style={{ width: `${pmCountPct}%` }}></div>
            </div>
          </div>

          {/* Visits Row */}
          <div className="relative">
            <div className="flex justify-between items-end mb-2">
              <div className="w-1/3 text-left">
                <span className="block text-xl sm:text-2xl font-black text-indigo-700 leading-none mb-1">{formatNum(amVisits)}</span>
                <span className="text-[10px] sm:text-xs font-bold text-indigo-600/70">{amVisitsPct.toFixed(1)}%</span>
              </div>
              <div className="w-1/3 text-center flex flex-col items-center justify-end pb-1">
                <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-1">
                  <CheckCircle2 size={16} strokeWidth={3} />
                </div>
                <span className="text-[10px] sm:text-xs font-extrabold text-purple-900 uppercase tracking-wider">Visits</span>
              </div>
              <div className="w-1/3 text-right">
                <span className="block text-xl sm:text-2xl font-black text-sky-700 leading-none mb-1">{formatNum(pmVisits)}</span>
                <span className="text-[10px] sm:text-xs font-bold text-sky-600/70">{pmVisitsPct.toFixed(1)}%</span>
              </div>
            </div>
            <div className="w-full h-3 sm:h-4 bg-zinc-100 rounded-full flex overflow-hidden shadow-inner border border-zinc-200/50">
              <div className="h-full bg-gradient-to-r from-indigo-400 to-indigo-500 relative transition-all duration-1000" style={{ width: `${amVisitsPct}%` }}>
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]"></div>
              </div>
              <div className="h-full bg-gradient-to-l from-sky-400 to-sky-500 transition-all duration-1000" style={{ width: `${pmVisitsPct}%` }}></div>
            </div>
          </div>

        </div>
      </div>
    </Card>
  );
}
