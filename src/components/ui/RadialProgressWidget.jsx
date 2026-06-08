import React from 'react';

export default function RadialProgressWidget({
  percentage = 0,
  size = 56,
  strokeWidth = 5,
  color = '#6366f1',
  trackColor = '#f4f4f5'
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const clampedPercent = Math.min(100, Math.max(0, percentage));
  const strokeDashoffset = circumference - (clampedPercent / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
        />
        {/* Progress Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
        />
      </svg>
      {/* Percentage Text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-black text-[var(--color-text-main)]" style={{ fontSize: size * 0.28 }}>
          {Math.round(clampedPercent)}
          <span className="text-[0.6em] text-[var(--color-text-muted)]">%</span>
        </span>
      </div>
    </div>
  );
}
