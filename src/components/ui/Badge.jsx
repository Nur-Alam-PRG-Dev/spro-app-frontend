import React from 'react';

const Badge = ({ type = 'default', children, className = '' }) => {
  let styleClasses = '';
  switch (type) {
    case 'on':
      styleClasses = 'bg-[var(--color-badge-on-bg)] text-[var(--color-badge-on-text)] font-semibold text-[10px] sm:text-xs px-2 py-0.5 rounded-full uppercase tracking-wide';
      break;
    case 'target':
      styleClasses = 'bg-[var(--color-badge-target-bg)] text-[var(--color-badge-target-text)] font-semibold text-[10px] sm:text-xs px-2 py-0.5 rounded-full uppercase tracking-wide';
      break;
    case 'high':
      styleClasses = 'bg-[var(--color-badge-high-bg)] text-[var(--color-badge-high-text)] font-bold text-[10px] sm:text-xs px-2 py-0.5 rounded-md uppercase tracking-wide flex items-center gap-1';
      break;
    case 'warning':
      styleClasses = 'bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400 font-semibold text-[10px] sm:text-xs px-2 py-0.5 rounded-full uppercase tracking-wide';
      break;
    default:
      styleClasses = 'bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200 text-xs px-2 py-0.5 rounded-full font-medium';
  }

  return (
    <span className={`inline-flex items-center justify-center ${styleClasses} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;
