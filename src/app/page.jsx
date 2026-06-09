'use client';

import React from 'react';
import LearningMaterials from '@/components/Dashboard/LearningMaterials';
import CardGrid from '@/components/Dashboard/CardGrid';
import EfficiencyChart from '@/components/Dashboard/EfficiencyChart';
import ActivityLog from '@/components/Dashboard/ActivityLog';
import { Calendar, Plus } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative space-y-6 pb-10">
      {/* Page Header Title Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[var(--color-text-main)] tracking-tight">
            Executive Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] font-medium mt-1">
            Real-time oversight for SPRO Global Logistics.
          </p>
        </div>
      </div>

    </div>
  );
}
