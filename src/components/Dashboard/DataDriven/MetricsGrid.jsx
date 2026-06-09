'use client';
import React from 'react';
import { DollarSign, MapPin, CheckCircle, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

export default function MetricsGrid({ totalRevenue, totalVisits, productiveVisits, unvisitedCount, avgDailyRevenue, growthRate }) {
  const prodRate = totalVisits > 0 ? ((productiveVisits / totalVisits) * 100).toFixed(1) : 0;
  const formattedRevenue = totalRevenue >= 1000 ? `৳${(totalRevenue / 1000).toFixed(1)}k` : `৳${(totalRevenue || 0).toFixed(0)}`;
  const formattedAvgRev = avgDailyRevenue >= 1000 ? `৳${(avgDailyRevenue / 1000).toFixed(1)}k` : `৳${(avgDailyRevenue || 0).toFixed(0)}`;
  const isPositiveGrowth = (growthRate || 0) >= 0;

  const cards = [
    {
      label: 'Revenue Today',
      value: formattedRevenue,
      sub: `Avg/day ${formattedAvgRev}`,
      icon: <DollarSign size={20} className="text-white" />,
      bgClass: 'bg-gradient-to-br from-[#047857] to-[#004b23] text-white',
      subClass: 'text-emerald-100',
      badge: growthRate != null ? (
        <span className="flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-white/20 text-white backdrop-blur-sm">
          {isPositiveGrowth ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {isPositiveGrowth ? '+' : ''}{growthRate?.toFixed(1)}%
        </span>
      ) : null,
    },
    {
      label: 'Visits Today',
      value: (totalVisits || 0).toLocaleString(),
      sub: `${productiveVisits || 0} productive`,
      icon: <MapPin size={20} className="text-white" />,
      bgClass: 'bg-gradient-to-br from-[#2563eb] to-[#1e3a8a] text-white',
      subClass: 'text-blue-100',
      badge: null,
    },
    {
      label: 'Productive Rate',
      value: `${prodRate}%`,
      sub: `${totalVisits - productiveVisits || 0} unproductive`,
      icon: <CheckCircle size={20} className="text-white" />,
      bgClass: 'bg-gradient-to-br from-[#4f46e5] to-[#312e81] text-white',
      subClass: 'text-indigo-100',
      badge: null,
    },
    {
      label: 'Unvisited Outlets',
      value: (unvisitedCount || 0).toLocaleString(),
      sub: 'Pending visits',
      icon: <AlertTriangle size={20} className="text-white" />,
      bgClass: 'bg-gradient-to-br from-[#d97706] to-[#78350f] text-white',
      subClass: 'text-amber-100',
      badge: null,
    },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 h-full">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`relative rounded-[16px] overflow-hidden shadow-sm p-4 flex flex-col justify-between hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group ${card.bgClass}`}
        >
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }} />
          {/* Large Background Icon Glow */}
          <div className="absolute -bottom-6 -right-6 opacity-10 transform group-hover:scale-125 transition-transform duration-500">
            {React.cloneElement(card.icon, { size: 100 })}
          </div>

          <div className="relative z-10 flex items-start justify-between mb-3">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner group-hover:scale-110 transition-transform duration-300">
              {card.icon}
            </div>
            {card.badge}
          </div>
          <div className="relative z-10 mt-auto">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-80 mb-0.5">{card.label}</p>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight leading-none mb-1">{card.value}</h3>
            <p className={`text-[10px] sm:text-[11px] font-medium ${card.subClass}`}>{card.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
