'use client';

import React from 'react';
import Card from '@/components/ui/Card';

const ReportStats = () => {
  return (
    <Card 
      className="bg-[var(--color-primary)] text-white p-6 border-0 relative overflow-hidden" 
      hoverable={true}
      padded={false}
    >
      {/* Decorative Wave Watermark background */}
      <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none w-48 h-24">
        <svg viewBox="0 0 100 50" className="w-full h-full">
          <path d="M0,40 Q25,20 50,40 T100,40 L100,50 L0,50 Z" fill="white" />
        </svg>
      </div>

      <h3 className="text-xs sm:text-sm font-semibold text-emerald-100/90 tracking-wide uppercase">Report Generation</h3>

      {/* Main Stats Value */}
      <div className="flex items-baseline gap-2 mt-4">
        <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">98.4%</span>
        <span className="text-xs font-bold text-emerald-300 bg-white/10 px-2 py-0.5 rounded-full">
          +2.1%
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-emerald-100/80 mt-2 font-medium leading-relaxed max-w-[240px]">
        Uptime for automated logistics report processing system.
      </p>

      {/* Footer Info details & progress bar */}
      <div className="mt-8 border-t border-white/10 pt-4">
        <div className="flex items-center justify-between text-xs font-semibold text-emerald-100/90 mb-2">
          <span>Next Auto-Run</span>
          <span className="font-bold">14:00 PM</span>
        </div>
        
        {/* Progress Bar Container */}
        <div className="w-full h-2 bg-emerald-950 rounded-full overflow-hidden">
          <div className="w-4/5 h-full bg-emerald-400 rounded-full"></div>
        </div>
      </div>
    </Card>
  );
};

export default ReportStats;
