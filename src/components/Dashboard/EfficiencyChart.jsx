'use client';

import React, { useState } from 'react';
import Card from '@/components/ui/Card';

const EfficiencyChart = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Custom mock data representing efficiency values (%)
  const dataPoints = [72, 85, 64, 78, 92, 80, 95];

  // Map data to SVG coordinates (width: 500, height: 180)
  // X coordinates spaced evenly
  const xCoords = [35, 110, 185, 260, 335, 410, 485];
  // Y coordinates inverted (0 is top, 180 is bottom)
  // Let 100% map to Y=20, 0% map to Y=160
  const getY = (val) => 160 - ((val - 50) / 50) * 120;
  const yCoords = dataPoints.map(val => getY(val));

  // Build the SVG path string
  let linePath = `M ${xCoords[0]} ${yCoords[0]}`;
  for (let i = 1; i < xCoords.length; i++) {
    linePath += ` L ${xCoords[i]} ${yCoords[i]}`;
  }

  // Build the filled area path string (extends to bottom)
  const areaPath = `${linePath} L ${xCoords[xCoords.length - 1]} 160 L ${xCoords[0]} 160 Z`;

  return (
    <Card className="flex-1 min-w-[280px] p-5 sm:p-6" hoverable={false}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-main)]">Operational Efficiency</h3>
          <p className="text-[11px] text-[var(--color-text-muted)] font-medium mt-0.5">Weekly performance tracking against targets.</p>
        </div>
        <span className="text-[10px] sm:text-xs font-semibold px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-[var(--color-text-muted)] rounded-md border border-[var(--color-border)]">
          Last 7 Days
        </span>
      </div>

      {/* SVG Line Graph wrapper */}
      <div className="relative w-full h-48 sm:h-52">
        <svg viewBox="0 0 520 180" className="w-full h-full overflow-visible" preserveAspectRatio="none">
          <defs>
            {/* Area under the line gradient */}
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.00" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="35" y1="40" x2="485" y2="40" className="stroke-zinc-100 dark:stroke-zinc-800/80 stroke-1" strokeDasharray="3 3" />
          <line x1="35" y1="100" x2="485" y2="100" className="stroke-zinc-100 dark:stroke-zinc-800/80 stroke-1" strokeDasharray="3 3" />
          <line x1="35" y1="160" x2="485" y2="160" className="stroke-zinc-200 dark:stroke-zinc-800 stroke-1" />

          {/* Filled Area */}
          <path d={areaPath} fill="url(#chartGradient)" />

          {/* Graph Line */}
          <path
            d={linePath}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data Nodes & Hotspots */}
          {dataPoints.map((val, idx) => (
            <g key={idx}>
              {/* Highlight Circle on hover */}
              <circle
                cx={xCoords[idx]}
                cy={yCoords[idx]}
                r={hoveredIndex === idx ? 8 : 4}
                className="fill-[var(--color-primary)] stroke-white dark:stroke-zinc-900 transition-all duration-200"
                strokeWidth={hoveredIndex === idx ? 3 : 1.5}
              />
              
              {/* Invisible touch target */}
              <circle
                cx={xCoords[idx]}
                cy={yCoords[idx]}
                r="18"
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            </g>
          ))}
        </svg>

        {/* Dynamic Tooltip on Hover */}
        {hoveredIndex !== null && (
          <div 
            style={{ 
              left: `${(xCoords[hoveredIndex] / 520) * 100}%`,
              top: `${(yCoords[hoveredIndex] / 180) * 100 - 35}%`
            }} 
            className="absolute transform -translate-x-1/2 bg-[var(--color-primary)] text-white text-[10px] font-bold py-1 px-2 rounded shadow-md pointer-events-none transition-all duration-150 animate-bounce"
          >
            {dataPoints[hoveredIndex]}%
          </div>
        )}
      </div>

      {/* X Axis Labels */}
      <div className="flex justify-between px-3 mt-1.5 border-t border-[var(--color-border)] pt-3">
        {days.map((day, idx) => (
          <span 
            key={day} 
            className={`text-xs font-semibold ${
              hoveredIndex === idx 
                ? 'text-[var(--color-primary)] font-bold scale-105' 
                : 'text-[var(--color-text-muted)]'
            } transition-all`}
          >
            {day}
          </span>
        ))}
      </div>
    </Card>
  );
};

export default EfficiencyChart;
