'use client';

import React from 'react';
import Card from '@/components/ui/Card';

export default function CoWorkReport() {
  return (
    <Card className="p-3.5 sm:p-6 overflow-hidden" hoverable={false}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4.5 mb-5">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-5 bg-[var(--color-primary)] rounded-full" />
          <h3 className="font-extrabold text-base text-[var(--color-text-main)]">
            Co-Work Report
          </h3>
        </div>
        <span className="text-[9px] font-black tracking-wider uppercase bg-[var(--color-primary-light)] text-[var(--color-primary)] px-3 py-1 rounded border border-[var(--color-primary-light-hover)] shadow-3xs">
          TEAM COLLABORATION
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-[var(--color-border)] rounded-2xl bg-white">
        <table className="w-full text-left border-collapse text-[10px] sm:text-xs">
          <thead>
            <tr className="bg-zinc-50 border-b border-[var(--color-border)] text-zinc-500 font-bold uppercase text-[8px] sm:text-[9px] tracking-wider whitespace-nowrap">
              <th className="px-2 py-2.5 sm:px-4 sm:py-3 text-center w-10 sm:w-12">SL</th>
              <th className="px-2 py-2.5 sm:px-4 sm:py-3">DATE</th>
              <th className="px-2 py-2.5 sm:px-4 sm:py-3">CO-WORKER NAME</th>
              <th className="px-2 py-2.5 sm:px-4 sm:py-3">STATUS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} className="text-center py-10 font-bold text-zinc-400 select-none">
                No co-work activity found
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  );
}
