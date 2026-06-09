'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import { MapPin } from 'lucide-react';

const keyLocations = [
  { name: 'AL BERAIMI SUPERMARKET', time: 'Last visited at 20:59' },
  { name: 'AL SAWAIH GROCERY', time: 'Last visited at 20:38' },
  { name: 'AJLOON RESTAURANT', time: 'Last visited at 20:34' },
];

export default function LiveAreaCoverage() {
  return (
    <Card className="p-0 overflow-hidden flex flex-col" hoverable={false}>
      <div className="px-5 py-4 border-b border-[var(--color-border)] flex items-center justify-between bg-white">
        <h3 className="font-extrabold text-sm sm:text-base text-[var(--color-text-main)]">
          Live Area Coverage
        </h3>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[9px] font-black bg-emerald-50 text-emerald-600 border border-emerald-100 uppercase tracking-wider animate-pulse">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          Live
        </span>
      </div>

      {/* Map Frame Display */}
      <div className="relative aspect-[4/3] bg-zinc-950 overflow-hidden flex items-center justify-center border-b border-[var(--color-border)]">
        {/* Map Image */}
        <img
          src="/map_desktop.png"
          alt="Area Coverage map"
          className="w-full h-full object-cover"
        />

        {/* Custom Leaflet Controls */}
        <div className="absolute top-3 left-3 flex flex-col bg-white border border-zinc-200/80 rounded-lg shadow-sm overflow-hidden z-10 select-none">
          <button className="w-7 h-7 flex items-center justify-center font-bold text-zinc-700 hover:bg-zinc-100 border-b border-zinc-150 cursor-pointer active:bg-zinc-200 leading-none text-sm">+</button>
          <button className="w-7 h-7 flex items-center justify-center font-bold text-zinc-700 hover:bg-zinc-100 cursor-pointer active:bg-zinc-200 leading-none text-sm">−</button>
        </div>

        {/* Pulsing Target Marker */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-9 h-9 rounded-full bg-[var(--color-primary)]/25 animate-ping" />
            <MapPin size={30} className="text-[var(--color-primary)] drop-shadow-md relative z-10 stroke-[2.5px]" />
          </div>
        </div>

        {/* Leaflet Attribution */}
        <div className="absolute bottom-1 right-2 text-[8px] font-medium text-zinc-400 bg-white/80 dark:bg-zinc-900/85 px-1 rounded-sm select-none z-10 leading-tight">
          © Leaflet | © OpenStreetMap contributors
        </div>
      </div>

      {/* Key Locations Listing (Nested within side container/card) */}
      <div className="p-3.5 sm:p-5 space-y-4 bg-white">
        <div className="flex items-center justify-between text-[10px] font-black tracking-wider uppercase text-zinc-400 border-b border-[var(--color-border)] pb-2.5">
          <div className="flex items-center gap-1.5">
            <MapPin size={12} className="text-rose-500 stroke-[2px]" />
            <span>Key Locations</span>
          </div>
          <span className="text-[var(--color-primary)] font-black cursor-pointer hover:underline">
            LAST THREE VISITED SITE
          </span>
        </div>

        {/* List */}
        <div className="space-y-2 sm:space-y-3">
          {keyLocations.map((loc, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 sm:gap-3.5 p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-zinc-50/50 border border-[var(--color-border)] hover:bg-zinc-50 transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 shadow-xs shadow-emerald-500/30" />
              <div className="min-w-0 flex-1">
                <h4 className="font-extrabold text-[10px] sm:text-xs text-zinc-950 uppercase tracking-wide truncate">
                  {loc.name}
                </h4>
                <p className="text-[8px] sm:text-[9px] text-zinc-400 font-semibold mt-0.5 leading-none">
                  {loc.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
