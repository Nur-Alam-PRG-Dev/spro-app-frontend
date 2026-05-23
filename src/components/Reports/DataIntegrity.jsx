'use client';

import React from 'react';
import Card from '@/components/ui/Card';

const DataIntegrity = () => {
  return (
    <Card className="p-5 sm:p-6" hoverable={false}>
      <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-main)] mb-4">Data Integrity</h3>

      <div className="flex items-center gap-4">
        {/* Large Visual Grade badge */}
        <div className="w-14 h-14 rounded-full border-4 border-[var(--color-badge-on-text)] flex items-center justify-center shrink-0 shadow-sm bg-emerald-50/50 dark:bg-emerald-950/10">
          <span className="text-lg font-black text-[var(--color-badge-on-text)]">A+</span>
        </div>

        {/* Sync Text description details */}
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-[var(--color-text-main)] leading-snug">
            Systems Synchronized
          </h4>
          <p className="text-[10px] sm:text-xs text-[var(--color-text-muted)] font-medium mt-0.5 leading-normal">
            Last sync: 12 minutes ago from Regional Node 4.
          </p>
        </div>
      </div>
    </Card>
  );
};

export default DataIntegrity;
