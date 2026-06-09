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

  return (
    <div className="bg-white rounded-[12px] border border-[var(--color-border)] shadow-sm flex flex-col h-full overflow-hidden">
      <div className="p-3 border-b border-[var(--color-border)] flex items-center justify-between bg-zinc-50/50">
        <div>
          <h3 className="text-[13px] font-black text-zinc-800 tracking-tight leading-none">Top 10 Priority Outlets</h3>
          <p className="text-[9px] text-zinc-400 font-medium mt-0.5">Unvisited today — Sorted by highest avg order</p>
        </div>
        <div className="relative">
          <Search size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-6 pr-3 py-1 bg-white border border-zinc-200 rounded-md text-[9px] w-32 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-zinc-400">
            <MapPin size={28} className="mb-2 opacity-30" />
            <p className="text-[13px] font-semibold">
              {outlets.length === 0 ? 'All outlets visited today! 🎉' : 'No results found'}
            </p>
          </div>
        ) : (
          <table className="w-full text-[12px]">
            <thead className="bg-zinc-100/80 sticky top-0 z-10 backdrop-blur-sm">
              <tr>
                <th className="px-3 py-1.5 text-center text-[9px] font-bold text-zinc-500 uppercase tracking-wider w-8">SL</th>
                <th className="px-3 py-1.5 text-left text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Outlet Name</th>
                <th className="px-3 py-1.5 text-left text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Zone</th>
                <th className="px-3 py-1.5 text-left text-[9px] font-bold text-zinc-500 uppercase tracking-wider">SR Name</th>
                <th className="px-3 py-1.5 text-right text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Avg Order</th>
                <th className="px-3 py-1.5 text-center text-[9px] font-bold text-zinc-500 uppercase tracking-wider">Last Visit</th>
                <th className="px-3 py-1.5 text-center text-[9px] font-bold text-zinc-500 uppercase tracking-wider w-10">Loc</th>
                <th className="px-3 py-1.5 text-center text-[9px] font-bold text-zinc-500 uppercase tracking-wider w-10">Call</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filtered.map((outlet, i) => (
                <tr key={i} className="hover:bg-zinc-50/80 transition-colors group">
                  {/* SL */}
                  <td className="px-3 py-1.5 whitespace-nowrap text-center">
                    <span className="text-[10px] font-bold text-zinc-400">{i + 1}</span>
                  </td>
                  
                  {/* Outlet Name */}
                  <td className="px-3 py-1.5 whitespace-nowrap">
                    <div className="flex flex-col">
                      <p className="text-[11px] font-bold text-zinc-800 truncate max-w-[150px]">{outlet.site_name}</p>
                      <p className="text-[9px] text-zinc-400 font-medium">{outlet.site_code}</p>
                    </div>
                  </td>
                  
                  {/* Zone */}
                  <td className="px-3 py-1.5 whitespace-nowrap text-[10px] text-zinc-600 font-medium">
                    {outlet.zone_name}
                  </td>

                  {/* SR Name */}
                  <td className="px-3 py-1.5 whitespace-nowrap">
                    <p className="text-[10px] font-semibold text-zinc-700 truncate max-w-[120px]">{outlet.aemp_name}</p>
                  </td>
                  
                  {/* Avg Order */}
                  <td className="px-3 py-1.5 whitespace-nowrap text-[10px] text-emerald-700 font-black text-right">
                    ৳{parseFloat(outlet.avg_3_month_order || 0).toFixed(0)}
                  </td>
                  
                  {/* Last Visit */}
                  <td className="px-3 py-1.5 whitespace-nowrap text-[9px] text-zinc-500 font-medium text-center">
                    <span className="bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-600 border border-zinc-200">
                      {outlet.last_visit_date === 'NOT FOUND' ? 'Never' : outlet.last_visit_date}
                    </span>
                  </td>

                  {/* Location Icon */}
                  <td className="px-3 py-1.5 whitespace-nowrap text-center">
                    <a 
                      href={`https://maps.google.com/?q=${outlet.geo_lat},${outlet.geo_lon}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-orange-50 text-orange-600 hover:bg-orange-100 hover:scale-110 transition-all border border-orange-100 shadow-sm"
                      title="Open in Maps"
                    >
                      <Navigation size={11} strokeWidth={2.5} />
                    </a>
                  </td>

                  {/* Call Icon */}
                  <td className="px-3 py-1.5 whitespace-nowrap text-center">
                    <a 
                      href={`tel:${outlet.aemp_mob1}`}
                      className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 hover:scale-110 transition-all border border-blue-100 shadow-sm"
                      title={`Call ${outlet.aemp_name}`}
                    >
                      <Phone size={11} strokeWidth={2.5} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
