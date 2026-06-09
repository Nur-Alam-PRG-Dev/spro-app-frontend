import React from 'react';

export default function PageSpinner({ message = "Loading...", subMessage = "Please wait a moment" }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-300">
      <div className="relative flex items-center justify-center w-16 h-16 mb-4">
        <div className="absolute inset-0 border-4 border-zinc-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-[var(--color-primary)] rounded-full border-t-transparent animate-spin"></div>
        <div className="absolute inset-2 border-4 border-emerald-200 rounded-full border-b-transparent animate-[spin_1.5s_reverse_infinite]"></div>
      </div>
      <h3 className="text-sm font-extrabold text-zinc-700 tracking-wider uppercase">{message}</h3>
      {subMessage && (
        <p className="text-xs font-semibold text-zinc-400 mt-1">{subMessage}</p>
      )}
    </div>
  );
}
