'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search, Bell, History, Grid } from 'lucide-react';

const HeaderContent = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchVal, setSearchVal] = useState(searchParams.get('q') || '');

  // Synchronize state with URL search param changes
  useEffect(() => {
    setSearchVal(searchParams.get('q') || '');
  }, [searchParams]);

  const tabs = [
    { name: 'Dashboard', path: '/' },
    { name: 'Inventory', path: '#' },
    { name: 'Logistics', path: '#' },
    { name: 'Analytics', path: '/reports' },
  ];

  const handleSearch = (e) => {
    const val = e.target.value;
    setSearchVal(val);

    const params = new URLSearchParams(searchParams);
    if (val) {
      params.set('q', val);
    } else {
      params.delete('q');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <header className="h-16 border-b border-[var(--color-border)] bg-[var(--color-card-bg)] px-8 flex items-center justify-between sticky top-0 z-20 hidden lg:flex">
      {/* Search Input Container */}
      <div className="relative w-80">
        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-[var(--color-text-muted)]">
          <Search size={18} />
        </span>
        <input
          type="text"
          value={searchVal}
          onChange={handleSearch}
          placeholder={
            pathname === '/reports' ? "Search reports..." :
            pathname === '/uncoveredOutlet' ? "Search outlets, orders, SRs..." :
            "Search logistics data..."
          }
          className="w-full pl-10 pr-4 py-2 text-sm bg-zinc-50 border border-[var(--color-border)] rounded-full outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all text-[var(--color-text-main)]"
        />
      </div>

      {/* Right Header Navigation & Actions */}
      <div className="flex items-center gap-8">
        {/* Navigation Tabs */}
        <nav className="flex items-center gap-6">
          {tabs.map((tab) => {
            const isActive =
              (tab.path === '/' && pathname === '/') ||
              (tab.path === '/reports' && pathname === '/reports');
            return (
              <a
                key={tab.name}
                href={tab.path}
                className={`text-sm font-semibold relative py-5 ${
                  isActive
                    ? 'text-[var(--color-primary)] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[var(--color-primary)]'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
                } transition-colors`}
              >
                {tab.name}
              </a>
            );
          })}
        </nav>

        {/* Action Icons Panel */}
        <div className="flex items-center gap-4 text-[var(--color-text-muted)]">
          <button className="p-2 hover:bg-zinc-100 rounded-full hover:text-[var(--color-text-main)] transition-colors relative">
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button className="p-2 hover:bg-zinc-100 rounded-full hover:text-[var(--color-text-main)] transition-colors">
            <History size={20} />
          </button>

          <button className="p-2 hover:bg-zinc-100 rounded-full hover:text-[var(--color-text-main)] transition-colors">
            <Grid size={20} />
          </button>
        </div>

        <div className="h-6 w-px bg-[var(--color-border)]"></div>

        {/* User Profile avatar */}
        <div className="flex items-center gap-3 select-none">
          <div className="text-right flex flex-col">
            <h4 className="text-xs sm:text-sm font-bold text-[var(--color-text-main)] leading-tight">Admin Console</h4>
            <span className="text-[10px] text-[var(--color-text-muted)] font-bold leading-normal">SPRO</span>
            <span className="text-[9px] text-[var(--color-text-muted)] font-medium leading-none">Logistics</span>
          </div>
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[var(--color-border)] shadow-sm bg-zinc-200">
            <img
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              alt="User profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

const Header = () => {
  return (
    <React.Suspense fallback={<div className="h-16 bg-[var(--color-card-bg)] border-b border-[var(--color-border)] hidden lg:block" />}>
      <HeaderContent />
    </React.Suspense>
  );
};

export default Header;
