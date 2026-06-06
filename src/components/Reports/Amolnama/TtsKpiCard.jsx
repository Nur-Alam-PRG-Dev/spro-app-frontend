'use client';

import React from 'react';
import Card from '@/components/ui/Card';

const ttsKpiData = [
  { duration: '0 - 1 minute', count: 3 },
  { duration: '1 - 2 minutes', count: 24 },
  { duration: '2 - 5 minutes', count: 43 },
  { duration: '5 - 10 minutes', count: 9 },
];

export default function TtsKpiCard() {
  return (
    <Card className="p-6" hoverable={false}>
      <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-5 bg-[var(--color-primary)] rounded-full" />
          <h3 className="font-extrabold text-sm sm:text-base text-[var(--color-text-main)]">
            TTS KPI
          </h3>
        </div>
        <span className="text-[9px] font-black tracking-wider uppercase text-[var(--color-primary)] bg-[var(--color-primary-light)] px-2 py-1 border border-[var(--color-primary-light-hover)] rounded shadow-3xs">
          Time Spent Distribution
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="text-zinc-500 font-black text-[9px] tracking-wider uppercase border-b border-zinc-150 pb-2">
              <th className="py-2.5">DURATION</th>
              <th className="py-2.5 text-right">NO. OF OUTLETS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 font-semibold text-zinc-700">
            {ttsKpiData.map((row, idx) => (
              <tr key={idx} className="hover:bg-zinc-50/50">
                <td className="py-2.5 font-bold text-zinc-800">{row.duration}</td>
                <td className="py-2.5 text-right text-zinc-900 font-black">{row.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
