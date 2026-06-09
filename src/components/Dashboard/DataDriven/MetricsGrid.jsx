'use client';
import React from 'react';
import { DollarSign, MapPin, CheckCircle, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

export default function MetricsGrid({ totalRevenue, totalVisits, productiveVisits, unvisitedCount, avgDailyRevenue, growthRate }) {
  const prodRate = totalVisits > 0 ? ((productiveVisits / totalVisits) * 100).toFixed(1) : 0;
  const formattedRevenue = totalRevenue >= 1000 ? `$${(totalRevenue / 1000).toFixed(1)}k` : `$${(totalRevenue || 0).toFixed(0)}`;
  const formattedAvgRev = avgDailyRevenue >= 1000 ? `$${(avgDailyRevenue / 1000).toFixed(1)}k` : `$${(avgDailyRevenue || 0).toFixed(0)}`;
  const isPositiveGrowth = (growthRate || 0) >= 0;

  const cards = [
    {
      label: 'Total Revenue Today',
      value: formattedRevenue,
      sub: `Avg/day ${formattedAvgRev}`,
      icon: <DollarSign size={18} className="text-emerald-600" />,
      iconBg: 'bg-emerald-50',
      badge: growthRate != null ? (
        <span className={`flex items-center gap-0.5 text-[11px] font-bold ${isPositiveGrowth ? 'text-emerald-600' : 'text-rose-500'}`}>
          {isPositiveGrowth ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {isPositiveGrowth ? '+' : ''}{growthRate?.toFixed(1)}%
        </span>
      ) : null,
    },
    {
      label: 'Total Visits Today',
      value: (totalVisits || 0).toLocaleString(),
      sub: `${productiveVisits || 0} productive`,
      icon: <MapPin size={18} className="text-blue-600" />,
      iconBg: 'bg-blue-50',
      badge: null,
    },
    {
      label: 'Productive Rate Today',
      value: `${prodRate}%`,
      sub: `${totalVisits - productiveVisits || 0} unproductive`,
      icon: <CheckCircle size={18} className="text-indigo-600" />,
      iconBg: 'bg-indigo-50',
      badge: null,
    },
    {
      label: 'Unvisited Today',
      value: (unvisitedCount || 0).toLocaleString(),
      sub: 'Outlets pending visit',
      icon: <AlertTriangle size={18} className="text-amber-600" />,
      iconBg: 'bg-amber-50',
      badge: null,
    },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 h-full">
      {cards.map((card, i) => (
        <div
          key={i}
          className="bg-white rounded-[16px] border border-[var(--color-border)] shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition-shadow duration-200 group"
        >
          <div className="flex items-center justify-between mb-3">
            <div className={`w-9 h-9 rounded-xl ${card.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
              {card.icon}
            </div>
            {card.badge}
          </div>
          <div>
            <p className="text-[11px] text-zinc-500 font-semibold uppercase tracking-wide mb-1">{card.label}</p>
            <h3 className="text-xl font-black text-zinc-800 tracking-tight leading-none">{card.value}</h3>
            <p className="text-[11px] text-zinc-400 font-medium mt-1">{card.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
