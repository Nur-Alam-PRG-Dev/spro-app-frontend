'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import { ShoppingCart } from 'lucide-react';

export default function OutletActivityCard() {
  return (
    <Card className="p-3.5 sm:p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center gap-2 border-b border-[var(--color-border)] pb-4 mb-4">
        <span className="w-1.5 h-5 bg-[var(--color-primary)] rounded-full" />
        <div className="flex items-center gap-1.5">
          <ShoppingCart size={16} className="text-[var(--color-primary)] stroke-[2.5px]" />
          <h3 className="font-extrabold text-sm sm:text-base text-[var(--color-text-main)]">
            Outlet Activity
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="bg-zinc-50/50 border border-[var(--color-border)] rounded-xl p-2 sm:p-3 flex flex-col justify-center min-h-[64px] sm:min-h-[72px]">
          <span className="text-[8px] sm:text-[9px] font-bold text-zinc-400 tracking-wider uppercase truncate">CREATED</span>
          <span className="text-base sm:text-xl font-black text-[var(--color-primary)] mt-1.5 leading-none">0</span>
        </div>
        <div className="bg-zinc-50/50 border border-[var(--color-border)] rounded-xl p-2 sm:p-3 flex flex-col justify-center min-h-[64px] sm:min-h-[72px]">
          <span className="text-[8px] sm:text-[9px] font-bold text-zinc-400 tracking-wider uppercase truncate">UPDATED</span>
          <span className="text-base sm:text-xl font-black text-emerald-600 mt-1.5 leading-none">0</span>
        </div>
        <div className="bg-zinc-50/50 border border-[var(--color-border)] rounded-xl p-2 sm:p-3 flex flex-col justify-center min-h-[64px] sm:min-h-[72px]">
          <span className="text-[8px] sm:text-[9px] font-bold text-zinc-400 tracking-wider uppercase truncate">DELETED</span>
          <span className="text-base sm:text-xl font-black text-rose-600 mt-1.5 leading-none">0</span>
        </div>
      </div>
    </Card>
  );
}
