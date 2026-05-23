'use client';

import React from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';

const LearningMaterials = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#17562f] via-[#21683c] to-zinc-400 dark:to-zinc-800 p-5 sm:p-6 rounded-2xl flex items-center justify-between text-white shadow-sm hover:opacity-95 transition-opacity cursor-pointer">
      <div className="flex items-center gap-4">
        {/* Banner Left Icon Container */}
        <div className="w-12 h-12 shrink-0 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
          <BookOpen size={24} className="text-emerald-300" />
        </div>
        
        {/* Banner Text Content */}
        <div>
          <h3 className="font-bold text-sm sm:text-base leading-tight">Learning Materials</h3>
          <p className="text-xs text-emerald-100/90 mt-1 max-w-xl font-medium">
            Access our full library of logistics optimization guides and fleet management manuals.
          </p>
        </div>
      </div>

      {/* Right side Arrow navigation */}
      <div className="text-emerald-100 hover:text-white transition-colors pl-4">
        <ChevronRight size={24} />
      </div>
    </div>
  );
};

export default LearningMaterials;
