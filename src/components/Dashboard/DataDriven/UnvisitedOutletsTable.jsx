'use client';
import React, { useState } from 'react';
import { MapPin, Search, Phone, Navigation } from 'lucide-react';

export default function UnvisitedOutletsTable({ outlets = [] }) {
  const [search, setSearch] = useState('');

  // 1. Sort by highest Avg Order first (Top Priority)
  const sortedOutlets = [...outlets].sort((a, b) => {
    return parseFloat(b.avg_3_month_order || 0) - parseFloat(a.avg_3_month_order || 0);
  });

  // 2. Filter by search term and take top 10
  const filtered = sortedOutlets
    .filter(o => {
      const q = search.toLowerCase();
      return (
        (o.site_name || o.name || '').toLowerCase().includes(q) ||
        (o.zone_name || o.area || '').toLowerCase().includes(q) ||
        (o.aemp_name || '').toLowerCase().includes(q)
      );
    })
    .slice(0, 10);

  const topOutlets = filtered.map(o => ({
    ...o,
    outlet_name: o.site_name || o.name,
    outlet_code: o.site_code
  }));

  return (
    <div className="bg-gradient-to-br from-[#1e3a8a] to-[#172554] rounded-[12px] border border-blue-800/50 shadow-[0_8px_20px_rgba(30,58,138,0.3)] p-3 flex flex-col h-full overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '12px 12px' }} />
      
      {/* Header Section */}
      <div className="flex items-center justify-between mb-3 border-b border-blue-900/50 pb-2 relative z-10">
        <div>
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center border border-white/20">
              <MapPin size={12} className="text-blue-300" />
            </div>
            <h3 className="text-[14px] font-black text-white tracking-tight leading-none">Priority Outlets</h3>
          </div>
          <p className="text-[10px] text-blue-200/70 font-medium mt-1">Top unvisited stores by historical value</p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-blue-300" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-6 pr-3 py-1 bg-white/10 border border-white/10 rounded-md text-[9px] w-32 text-white placeholder:text-blue-200/50 focus:outline-none focus:border-blue-400 focus:bg-white/20"
            />
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="flex-1 overflow-auto rounded-lg border border-white/10 bg-black/10 relative z-10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="px-2 py-2 text-[9px] font-bold text-blue-200 uppercase tracking-wider sticky top-0 bg-[#1e3a8a] z-10">#</th>
              <th className="px-2 py-2 text-[9px] font-bold text-blue-200 uppercase tracking-wider sticky top-0 bg-[#1e3a8a] z-10">Outlet Info</th>
              <th className="px-2 py-2 text-[9px] font-bold text-blue-200 uppercase tracking-wider sticky top-0 bg-[#1e3a8a] z-10">Area / SR</th>
              <th className="px-2 py-2 text-[9px] font-bold text-blue-200 uppercase tracking-wider sticky top-0 bg-[#1e3a8a] z-10 text-right">Avg Order</th>
              <th className="px-2 py-2 text-[9px] font-bold text-blue-200 uppercase tracking-wider sticky top-0 bg-[#1e3a8a] z-10 text-center">Last Visit</th>
              <th className="px-2 py-2 text-[9px] font-bold text-blue-200 uppercase tracking-wider sticky top-0 bg-[#1e3a8a] z-10 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {topOutlets.map((outlet, i) => (
              <tr key={i} className="hover:bg-white/5 transition-colors group">
                <td className="px-2 py-1.5 text-[10px] font-black text-blue-200/50 w-6">
                  {i + 1}
                </td>
                <td className="px-2 py-1.5">
                  <p className="text-[11px] font-bold text-white truncate max-w-[150px] group-hover:text-blue-300 transition-colors">
                    {outlet.outlet_name}
                  </p>
                  <p className="text-[9px] text-blue-200/60 font-semibold">{outlet.outlet_code}</p>
                </td>
                <td className="px-2 py-1.5">
                  <p className="text-[10px] font-bold text-blue-100 truncate max-w-[120px]">{outlet.zone_name}</p>
                  <p className="text-[10px] font-semibold text-blue-200/70 truncate max-w-[120px]">{outlet.aemp_name}</p>
                </td>
                <td className="px-2 py-1.5 text-right">
                  <span className="text-[11px] font-black text-emerald-300 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                    ৳{parseFloat(outlet.avg_3_month_order || 0).toLocaleString()}
                  </span>
                </td>
                <td className="px-2 py-1.5 text-center">
                  <span className="text-[10px] font-semibold text-rose-300 bg-rose-500/10 px-1.5 py-0.5 rounded border border-rose-500/20">
                    {outlet.last_visit_date === 'NOT FOUND' ? 'Never' : outlet.last_visit_date}
                  </span>
                </td>
                <td className="px-2 py-1.5 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    <a 
                      href={`https://maps.google.com/?q=${outlet.geo_lat},${outlet.geo_lon}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-white/10 text-orange-400 hover:bg-orange-500 hover:text-white hover:scale-110 transition-all border border-white/20 shadow-sm"
                      title="Open in Maps"
                    >
                      <Navigation size={11} strokeWidth={2.5} />
                    </a>
                    <a 
                      href={`tel:${outlet.aemp_mob1}`}
                      className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-white/10 text-emerald-400 hover:bg-emerald-500 hover:text-white hover:scale-110 transition-all border border-white/20 shadow-sm"
                      title={`Call ${outlet.aemp_name}`}
                    >
                      <Phone size={11} strokeWidth={2.5} />
                    </a>
                  </div>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
  );
}
