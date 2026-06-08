const fs = require('fs');
const content = fs.readFileSync('src/app/uncoveredOutlet/page.jsx', 'utf-8');

const replacement = `const paginationControls = (
    <div className="flex flex-row items-center justify-between gap-4 mt-2 mb-4 w-full">
      {/* Active List Count Area */}
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50/80 rounded-full border border-emerald-100/50 backdrop-blur-sm shadow-sm shrink-0">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span className="text-[11px] font-extrabold text-emerald-800 tracking-wide">
          {filteredList.length} Outlets
        </span>
      </div>

      {/* Pagination Area */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0 bg-white/50 px-3 py-1.5 rounded-full border border-zinc-200/50 backdrop-blur-sm shadow-sm">
        <div className="hidden sm:flex items-center gap-1.5 text-[11px] font-semibold text-zinc-500">
          <span>Show</span>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="bg-transparent font-bold text-zinc-800 outline-none cursor-pointer hover:text-emerald-600 transition-colors"
          >
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>

        <div className="w-px h-4 bg-zinc-200 hidden sm:block"></div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="w-6 h-6 flex items-center justify-center rounded-full text-zinc-600 hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-[11px] font-bold text-zinc-800 min-w-[3rem] text-center">
            {currentPage} <span className="text-zinc-400 font-medium">/</span> {Math.ceil(filteredList.length / pageSize) || 1}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(Math.ceil(filteredList.length / pageSize), p + 1))}
            disabled={currentPage === Math.ceil(filteredList.length / pageSize) || filteredList.length === 0}
            className="w-6 h-6 flex items-center justify-center rounded-full text-zinc-600 hover:bg-emerald-50 hover:text-emerald-600 disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );`;

// We use regex to find the old paginationControls block and replace it
const regex = /const paginationControls = \([\s\S]*?\n  \);/m;
const newContent = content.replace(regex, replacement);

fs.writeFileSync('src/app/uncoveredOutlet/page.jsx', newContent);
