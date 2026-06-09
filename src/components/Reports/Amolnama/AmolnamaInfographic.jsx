import React from 'react';
import Card from '@/components/ui/Card';
import { Users, MapPin, Activity, ShoppingCart, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function AmolnamaInfographic({ metrics, currentStart, currentEnd, prevStart, prevEnd }) {
  // Safe extraction of metrics assuming order matches visitedSummaryMetrics array
  const totalOutlets = metrics[0]?.value || '0';
  const totalVisits = metrics[1]?.value || '0';
  const uniqueVisits = metrics[2]?.value || '0';
  const visitCoverage = metrics[3]?.value || '0%';
  const noOfOrders = metrics[4]?.value || '0';
  const orderValue = metrics[5]?.value || '0';
  const delAmount = metrics[6]?.value || '0';
  const lpc = metrics[7]?.value || '0';

  return (
    <Card className="p-5 sm:p-6 overflow-hidden relative shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 rounded-2xl bg-white border border-[var(--color-border)]">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <div className="relative z-10 flex flex-col lg:flex-row gap-8">
        
        {/* Left Side: Main KPI Dashboard */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-xl text-[var(--color-text-main)] flex items-center gap-2 tracking-tight">
              <Activity className="text-emerald-600" size={24} />
              Visited Summary
            </h3>
            <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Live Performance
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {/* KPI 1 */}
            <div className="bg-white border border-zinc-200 rounded-xl p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all">
              <MapPin size={20} className="text-indigo-600 mb-2" />
              <span className="text-3xl font-black text-[var(--color-text-main)] leading-none mb-1">{totalVisits}</span>
              <span className="text-[9px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Total Visits</span>
            </div>

            {/* KPI 2 */}
            <div className="bg-white border border-zinc-200 rounded-xl p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all">
              <Users size={20} className="text-sky-600 mb-2" />
              <span className="text-3xl font-black text-[var(--color-text-main)] leading-none mb-1">{uniqueVisits}</span>
              <span className="text-[9px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Unique Visits</span>
            </div>

            {/* KPI 3 */}
            <div className="bg-white border border-zinc-200 rounded-xl p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all">
              <ShoppingCart size={20} className="text-emerald-600 mb-2" />
              <span className="text-3xl font-black text-[var(--color-text-main)] leading-none mb-1">{noOfOrders}</span>
              <span className="text-[9px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Total Orders</span>
            </div>

            {/* KPI 4 */}
            <div className="bg-white border border-zinc-200 rounded-xl p-4 flex flex-col items-center text-center shadow-sm hover:shadow-md transition-all">
              <TrendingUp size={20} className="text-amber-500 mb-2" />
              <span className="text-3xl font-black text-emerald-700 leading-none mb-1">{visitCoverage}</span>
              <span className="text-[9px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Coverage</span>
            </div>
          </div>

          <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200">
                <span className="text-emerald-700 font-black">$</span>
              </div>
              <div>
                <span className="block text-[10px] font-bold text-emerald-800/70 uppercase tracking-wider mb-0.5">Total Order Value</span>
                <span className="block text-2xl font-black text-emerald-900 leading-none">{orderValue}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-0.5">LPC</span>
              <span className="block text-xl font-black text-[var(--color-text-main)] leading-none">{lpc}</span>
            </div>
          </div>
        </div>

        {/* Right Side: Numeric Distribution */}
        <div className="w-full lg:w-72 bg-zinc-50 border border-zinc-200 rounded-2xl p-5 flex flex-col relative overflow-hidden shadow-sm">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          
          <h4 className="font-extrabold text-sm text-[var(--color-text-main)] uppercase tracking-widest mb-6 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-purple-600" />
            Numeric Dist.
          </h4>

          <div className="flex-1 flex flex-col justify-center items-center text-center relative mb-8">
            <div className="absolute inset-0 bg-purple-100/50 blur-[40px] rounded-full"></div>
            <span className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-2 relative z-10">Current ND</span>
            <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-purple-700 to-indigo-600 relative z-10 filter drop-shadow-sm">
              0
            </span>
          </div>

          <div className="space-y-3 relative z-10">
            <div className="flex justify-between items-center bg-white rounded-lg p-2.5 border border-zinc-200 shadow-sm">
              <div>
                <span className="block text-[9px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-0.5">Current Period</span>
                <span className="block text-[10px] font-medium text-[var(--color-text-main)]">{currentStart} &rarr; {currentEnd}</span>
              </div>
              <span className="text-sm font-black text-zinc-800">0 <span className="text-[9px] text-[var(--color-text-muted)]">sites</span></span>
            </div>
            <div className="flex justify-between items-center bg-white rounded-lg p-2.5 border border-zinc-200 shadow-sm">
              <div>
                <span className="block text-[9px] font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-0.5">Prev Period</span>
                <span className="block text-[10px] font-medium text-[var(--color-text-main)]">{prevStart} &rarr; {prevEnd}</span>
              </div>
              <span className="text-sm font-black text-zinc-800">0 <span className="text-[9px] text-[var(--color-text-muted)]">sites</span></span>
            </div>
          </div>
        </div>

      </div>
    </Card>
  );
}
