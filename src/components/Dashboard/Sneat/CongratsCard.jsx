import React from 'react';

export default function CongratsCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[var(--color-border)] p-6 relative overflow-hidden flex flex-col justify-between h-full">
      <div className="z-10 relative">
        <h2 className="text-[17px] font-bold text-zinc-800 tracking-tight">Congratulations Katie! 🎉</h2>
        <p className="text-[13px] text-zinc-500 font-medium mt-1">Best seller of the month</p>

        <div className="mt-6 mb-4">
          <h3 className="text-2xl font-extrabold text-[var(--color-primary)]">$42.8k</h3>
          <p className="text-[12px] font-bold text-zinc-600 mt-1 flex items-center gap-1">
            78% of target <span className="text-sm">🚀</span>
          </p>
        </div>

        <button className="bg-[var(--color-primary)]/10 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/20 px-4 py-2 rounded-lg text-[13px] font-bold transition-colors">
          View Sales
        </button>
      </div>

      <div className="absolute right-[-20px] bottom-[-20px] w-48 h-48 opacity-90 z-0">
        <img 
          src="/congrats_trophy.png" 
          alt="Trophy" 
          className="w-full h-full object-contain mix-blend-multiply" 
        />
      </div>
    </div>
  );
}
