'use client';
import React, { useState } from 'react';
import { MapPin, ChevronRight, Search } from 'lucide-react';

export default function UnvisitedOutletsTable({ outlets = [] }) {
  const [search, setSearch] = useState('');

  const filtered = outlets
    .filter(o => {
      const q = search.toLowerCase();
      return (
        (o.outlet_name || o.name || '').toLowerCase().includes(q) ||
        (o.route_name || o.area || '').toLowerCase().includes(q) ||
        (o.aemp_name || '').toLowerCase().includes(q)
      );
    })
    .slice(0, 10);

  return (
    <div className="bg-white rounded-[20px] border border-[var(--color-border)] shadow-sm flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[var(--color-border)]">
        <div>
          <h3 className="text-[15px] font-bold text-zinc-800 tracking-tight">Unvisited Outlets</h3>
          <p className="text-[12px] text-zinc-400 font-medium mt-0.5">Today — {outlets.length} total</p>
        </div>
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..."
            className="pl-8 pr-3 py-1.5 text-[12px] bg-zinc-50 border border-[var(--color-border)] rounded-full outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all w-36"
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
            <thead>
              <tr className="text-zinc-400 font-bold uppercase text-[10px] tracking-wider border-b border-zinc-100">
                <th className="text-left px-6 py-3">#</th>
                <th className="text-left px-3 py-3">Outlet</th>
                <th className="text-left px-3 py-3 hidden md:table-cell">Area / Route</th>
                <th className="text-left px-3 py-3 hidden lg:table-cell">SR</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((outlet, i) => {
                const name = outlet.outlet_name || outlet.name || `Outlet #${i + 1}`;
                const area = outlet.route_name || outlet.area || '—';
                const sr = outlet.aemp_name || '—';
                return (
                  <tr
                    key={i}
                    className="border-b border-zinc-50 hover:bg-[var(--color-primary)]/[0.03] transition-colors group cursor-default"
                  >
                    <td className="px-6 py-3 text-zinc-400 font-bold">{i + 1}</td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                          <MapPin size={12} className="text-amber-500" />
                        </div>
                        <span className="font-semibold text-zinc-700 leading-tight line-clamp-1">{name}</span>
                      </div>
                    </td>
                    <td className="px-3 py-3 text-zinc-500 hidden md:table-cell">{area}</td>
                    <td className="px-3 py-3 text-zinc-500 hidden lg:table-cell">{sr}</td>
                    <td className="px-4 py-3">
                      <ChevronRight size={14} className="text-zinc-300 group-hover:text-[var(--color-primary)] group-hover:translate-x-0.5 transition-all" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
