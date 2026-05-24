'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Menu, Search, Home, FileText, Users, User, Settings, HelpCircle, Download, X, Grid } from 'lucide-react';

const MobileHeaderContent = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [searchVal, setSearchVal] = useState(searchParams.get('q') || '');

  const menuItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'Team', href: '#', icon: Users },
    { name: 'Profile', href: '#', icon: User },
    { name: 'Settings', href: '#', icon: Settings },
    { name: 'Support', href: '#', icon: HelpCircle },
  ];

  // Synchronize state with URL search param changes
  useEffect(() => {
    setSearchVal(searchParams.get('q') || '');
  }, [searchParams]);

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

  const isAmolnama = pathname === '/amolnama';

  return (
    <>
      <header className="lg:hidden flex items-center justify-between gap-3 px-4 h-14 bg-[#267043] text-white sticky top-0 z-30 shadow-sm w-full">
        {/* Left Side Hamburger */}
        <button
          onClick={() => setIsOpen(true)}
          className="p-1.5 hover:bg-[#1f5734] rounded-lg transition-colors shrink-0"
        >
          <Menu size={22} />
        </button>

        {isAmolnama ? (
          <>
            <span className="font-extrabold tracking-wider text-base uppercase mr-auto ml-2">AMOLNAMA</span>
            <button className="p-1.5 hover:bg-[#1f5734] rounded-lg transition-colors shrink-0">
              <Grid size={22} />
            </button>
          </>
        ) : (
          <>
            {/* Persistent Search Field in Mobile Header */}
            <div className="flex-1 relative">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-white/70">
                <Search size={16} />
              </span>
              <input
                type="text"
                value={searchVal}
                onChange={handleSearch}
                placeholder={
                  pathname === '/reports' ? "Search reports..." :
                  pathname.startsWith('/targetVs') ? "Search reps..." :
                  "Search data..."
                }
                className="w-full pl-9 pr-3 py-1.5 text-xs bg-white/10 border border-white/20 rounded-full outline-none focus:bg-white focus:text-[var(--color-text-main)] placeholder-white/80 transition-all text-white font-medium"
              />
            </div>

            {/* Right User Avatar */}
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/50 bg-white/20 flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </>
        )}
      </header>

      {/* Drawer Overlay Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Navigation Drawer Content */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-72 bg-[var(--color-sidebar-bg)] text-white z-50 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-350 ease-out flex flex-col shadow-2xl lg:hidden`}
      >
        <div className="p-5 border-b border-[var(--color-sidebar-hover)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center font-bold text-[var(--color-sidebar-bg)] text-lg">
              S
            </div>
            <div>
              <h2 className="font-extrabold text-base tracking-wide">SPRO MOBILE</h2>
              <p className="text-[9px] text-[var(--color-sidebar-text-muted)] leading-none font-medium">Logistics Intelligence</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 hover:bg-[var(--color-sidebar-hover)] rounded-full text-[var(--color-sidebar-text-muted)] hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Items inside drawer */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-[var(--color-sidebar-active)] text-white border-l-4 border-emerald-400'
                    : 'text-[var(--color-sidebar-text-muted)] hover:bg-[var(--color-sidebar-hover)] hover:text-white'
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Drawer Footer download action */}
        <div className="p-4 border-t border-[var(--color-sidebar-hover)]">
          <button className="w-full flex items-center justify-center gap-2 bg-[#86efac] hover:bg-[#6ee7b7] text-[#004b23] py-2.5 px-4 rounded-xl text-sm font-bold shadow-md transition-colors cursor-pointer">
            <Download size={16} />
            Download Reports
          </button>
        </div>
      </div>
    </>
  );
};

export const MobileHeader = () => {
  return (
    <React.Suspense fallback={<header className="lg:hidden flex items-center justify-between px-4 h-14 bg-[#267043] text-white sticky top-0 z-30 shadow-sm w-full animate-pulse" />}>
      <MobileHeaderContent />
    </React.Suspense>
  );
};

export const MobileTabBar = () => {
  const pathname = usePathname();

  const tabItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'Team', href: '#', icon: Users },
    { name: 'Profile', href: '#', icon: User },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-[var(--color-card-bg)] border-t border-[var(--color-border)] flex items-center justify-around px-2 z-30 shadow-lg">
      {tabItems.map((tab) => {
        const Icon = tab.icon;
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.name}
            href={tab.href}
            className={`flex flex-col items-center justify-center flex-1 py-2 text-[10px] font-semibold transition-colors ${
              isActive
                ? 'text-[#267043] dark:text-emerald-400'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
            }`}
          >
            <Icon size={20} className={isActive ? 'stroke-[2.5px]' : 'stroke-[1.8px]'} />
            <span className="mt-1">{tab.name}</span>
          </Link>
        );
      })}
    </div>
  );
};
