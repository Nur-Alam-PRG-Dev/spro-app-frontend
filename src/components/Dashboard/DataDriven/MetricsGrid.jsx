'use client';
import React from 'react';
import { DollarSign, MapPin, CheckCircle, AlertTriangle, TrendingUp, TrendingDown } from 'lucide-react';

export default function MetricsGrid({ totalRevenue, totalVisits, productiveVisits, unvisitedCount, avgDailyRevenue, growthRate }) {
  const prodRate = totalVisits > 0 ? ((productiveVisits / totalVisits) * 100).toFixed(1) : 0;
  const formattedRevenue = totalRevenue >= 1000 ? `৳${(totalRevenue / 1000).toFixed(1)}k` : `৳${(totalRevenue || 0).toFixed(0)}`;
  const formattedAvgRev = avgDailyRevenue >= 1000 ? `৳${(avgDailyRevenue / 1000).toFixed(1)}k` : `৳${(avgDailyRevenue || 0).toFixed(0)}`;
  const isPositiveGrowth = (growthRate || 0) >= 0;

  const metrics = [
    {
      label: 'Revenue',
      value: formattedRevenue,
      sub: `Avg ৳${avgDailyRevenue?.toFixed(0)}`,
      icon: <DollarSign size={16} className="text-white" />,
      trend: growthRate != null ? (
        <span className="flex items-center gap-0.5 text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-white/20 text-white backdrop-blur-sm">
          {isPositiveGrowth ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
          {isPositiveGrowth ? '+' : ''}{growthRate?.toFixed(1)}%
        </span>
      ) : null,
      bgClass: 'bg-gradient-to-br from-[#047857] to-[#004b23]', // Deep Emerald
      shadowClass: 'hover:shadow-[0_8px_20px_rgba(4,120,87,0.4)]',
    },
    {
      label: 'Visits',
      value: (totalVisits || 0).toLocaleString(),
      sub: `${productiveVisits || 0} productive`,
      icon: <MapPin size={16} className="text-white" />,
      trend: null,
      bgClass: 'bg-gradient-to-br from-[#2563eb] to-[#1e3a8a]', // Deep Blue
      shadowClass: 'hover:shadow-[0_8px_20px_rgba(37,99,235,0.4)]',
    },
    {
      label: 'Productive Rate',
      value: `${prodRate}%`,
      sub: `${totalVisits - productiveVisits || 0} unproductive`,
      icon: <CheckCircle size={16} className="text-white" />,
      trend: null,
      bgClass: 'bg-gradient-to-br from-[#4f46e5] to-[#312e81]', // Deep Indigo
      shadowClass: 'hover:shadow-[0_8px_20px_rgba(79,70,229,0.4)]',
    },
    {
      label: 'Unvisited',
      value: (unvisitedCount || 0).toLocaleString(),
      sub: 'Pending visits',
      icon: <AlertTriangle size={16} className="text-white" />,
      trend: null,
      bgClass: 'bg-gradient-to-br from-[#d97706] to-[#78350f]', // Deep Amber
      shadowClass: 'hover:shadow-[0_8px_20px_rgba(217,119,6,0.4)]',
    },
  ];

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-2 h-full">
      {metrics.map((m, i) => (
        <div 
          key={i} 
          className={`relative rounded-[12px] p-3 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1 group cursor-default ${m.bgClass} ${m.shadowClass}`}
        >
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '12px 12px' }} />
          
          {/* Watermark Icon */}
          <div className="absolute -bottom-4 -right-4 opacity-10 transform group-hover:scale-125 transition-transform duration-500">
             {React.cloneElement(m.icon, { size: 70 })}
          </div>

          <div className="relative z-10 flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center backdrop-blur-md shadow-inner group-hover:scale-110 transition-transform duration-300">
                {m.icon}
              </div>
              <span className="text-[10px] font-bold text-white/90 uppercase tracking-widest">{m.label}</span>
            </div>
            {m.trend}
          </div>
          
          <div className="relative z-10 flex flex-col justify-end mt-auto">
            <h4 className="text-2xl font-black text-white leading-none tracking-tight mb-0.5">{m.value}</h4>
            <span className="text-[10px] text-white/70 font-medium leading-none">{m.sub}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
