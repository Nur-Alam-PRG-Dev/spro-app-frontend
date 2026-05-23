'use client';

import React from 'react';
import Card from '@/components/ui/Card';

const ActivityLog = () => {
  const activities = [
    {
      title: 'Order #8842 Shipped',
      subtitle: 'Central Hub • 2 mins ago',
      color: 'bg-emerald-500',
    },
    {
      title: 'Stock Alert: Warehouse B',
      subtitle: 'Low inventory for SKU-990 • 15 mins ago',
      color: 'bg-amber-500',
    },
    {
      title: 'New Driver Onboarded',
      subtitle: 'Regional Team • 1 hr ago',
      color: 'bg-blue-500',
    },
    {
      title: 'Monthly Report Generated',
      subtitle: 'System Automated • 3 hrs ago',
      color: 'bg-emerald-500',
    },
  ];

  return (
    <Card className="w-full lg:w-80 p-5 sm:p-6 flex flex-col justify-between" hoverable={false}>
      {/* Title */}
      <div>
        <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-main)]">Real-time Activity</h3>
        
        {/* Timeline Log List */}
        <div className="mt-5 space-y-4">
          {activities.map((act, idx) => (
            <div key={idx} className="flex gap-3 items-start">
              {/* Colored Indicator Dot with Pulse effect */}
              <div className="mt-1.5 relative flex shrink-0 justify-center items-center">
                <span className={`w-2.5 h-2.5 rounded-full ${act.color}`}></span>
                <span className={`absolute inline-flex w-3.5 h-3.5 rounded-full ${act.color} opacity-20 animate-ping`}></span>
              </div>
              
              {/* Activity Details */}
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-[var(--color-text-main)] leading-tight">
                  {act.title}
                </h4>
                <p className="text-[10px] sm:text-xs text-[var(--color-text-muted)] font-medium mt-0.5 leading-tight">
                  {act.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-6 border-t border-[var(--color-border)] pt-4">
        <button className="w-full py-2 bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-800/50 border border-[var(--color-border)] rounded-xl text-xs sm:text-sm font-bold text-[var(--color-text-main)] transition-colors">
          View All Logs
        </button>
      </div>
    </Card>
  );
};

export default ActivityLog;
