'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Menu, Search, Home, FileText, Users, User, Settings, HelpCircle, Download, X, Grid, ArrowLeft, MoreVertical, LogOut } from 'lucide-react';

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

  /* eslint-disable react-hooks/set-state-in-effect */
  // Synchronize state with URL search param changes
  useEffect(() => {
    const currentQ = searchParams.get('q') || '';
    if (searchVal !== currentQ) {
      setSearchVal(currentQ);
    }
  }, [searchParams, searchVal]);
  /* eslint-enable react-hooks/set-state-in-effect */

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
  const isUncovered = pathname === '/uncoveredOutlet';
  const isTargetVs = pathname === '/targetVsAchievement';
  const isHalfSummary = pathname === '/halfSummary';

  const [user, setUser] = useState(null);
  const [baseImageUrl, setBaseImageUrl] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('spro_user');
    const storedBaseUrl = localStorage.getItem('baseImageUrl');
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedBaseUrl) setBaseImageUrl(storedBaseUrl);
  }, []);

  const designation = user ? (user.role_id === 1 ? 'SR' : 'SV') : 'Logistics';
  const fallbackAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.aemp_name || 'User')}&background=047857&color=fff&size=128`;
  const avatarUrl = user && user.aemp_pimg ? `${baseImageUrl}${user.aemp_pimg}` : fallbackAvatar;

  const handleLogout = () => {
    localStorage.removeItem('spro_user');
    localStorage.removeItem('baseImageUrl');
    localStorage.removeItem('spro_login_time');
    router.push('/login');
    setIsOpen(false);
  };

  return (
    <>
      <header className="lg:hidden flex items-center justify-between gap-3 px-4 h-14 bg-[#267043] text-white sticky top-0 z-30 shadow-sm w-full">
        {isUncovered ? (
          <>
            <Link href="/reports" className="p-1.5 hover:bg-[#1f5734] rounded-lg transition-colors shrink-0 text-white">
              <ArrowLeft size={22} />
            </Link>
            <span className="font-extrabold text-base tracking-normal mr-auto ml-1.5">Uncovered Outlets</span>
            <div className="flex items-center gap-1">
              <button className="p-1.5 hover:bg-[#1f5734] rounded-lg transition-colors shrink-0">
                <Search size={22} />
              </button>
              <button className="p-1.5 hover:bg-[#1f5734] rounded-lg transition-colors shrink-0">
                <MoreVertical size={22} />
              </button>
            </div>
          </>
        ) : isTargetVs ? (
          <>
            <Link href="/reports" className="p-1.5 hover:bg-[#1f5734] rounded-lg transition-colors shrink-0 text-white">
              <ArrowLeft size={22} />
            </Link>
            <span className="font-extrabold text-base tracking-normal mr-auto ml-1.5">Target vs. Achievement</span>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/50 bg-white/20 flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
              <img
                src={avatarUrl}
                alt="avatar"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'; }}
              />
            </div>
          </>
        ) : isHalfSummary ? (
          <>
            <Link href="/reports" className="p-1.5 hover:bg-[#1f5734] rounded-lg transition-colors shrink-0 text-white">
              <ArrowLeft size={22} />
            </Link>
            <span className="font-extrabold text-base tracking-normal mr-auto ml-1.5">Half Summary Report</span>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-white/50 bg-white/20 flex items-center justify-center text-xs font-bold shrink-0 shadow-sm">
              <img
                src={avatarUrl}
                alt="avatar"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = 'https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp'; }}
              />
            </div>
          </>
        ) : (
          <>
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
                    src={avatarUrl}
                    alt="avatar"
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = fallbackAvatar; }}
                  />
                </div>
              </>
            )}
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
        <div className="p-5 border-b border-[var(--color-sidebar-hover)] flex flex-col relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 p-1.5 hover:bg-[var(--color-sidebar-hover)] rounded-full text-[var(--color-sidebar-text-muted)] hover:text-white"
          >
            <X size={20} />
          </button>
          
          <div className="flex flex-col items-center mt-2 mb-4">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-[var(--color-sidebar-hover)] shadow-md bg-white/10 mb-3">
              <img
                src={avatarUrl}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = fallbackAvatar; }}
              />
            </div>
            <h2 className="font-extrabold text-lg tracking-tight text-white text-center leading-tight">
              {user ? user.aemp_name : 'Admin Console'}
            </h2>
            <p className="text-xs text-emerald-400 font-bold mt-1">
              {user ? user.aemp_usnm : 'SPRO'} <span className="text-[var(--color-sidebar-text-muted)] px-1">•</span> {designation}
            </p>
            {user && (user.aemp_mob1 || user.aemp_dtsm) && (
              <p className="text-[11px] text-[var(--color-sidebar-text-muted)] font-medium mt-1.5">
                {user.aemp_mob1 || user.aemp_dtsm}
              </p>
            )}
          </div>
        </div>

        {/* Navigation Items inside drawer */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href) || (item.href === '/reports' && ['/halfSummary', '/targetVsAchievement', '/uncoveredOutlet'].includes(pathname));
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

        {/* Drawer Footer actions */}
        <div className="p-4 border-t border-[var(--color-sidebar-hover)] space-y-3 shrink-0">
          <button className="w-full flex items-center justify-center gap-2 bg-[#86efac] hover:bg-[#6ee7b7] text-[#004b23] py-2.5 px-4 rounded-xl text-sm font-bold shadow-md transition-colors cursor-pointer">
            <Download size={16} />
            Download Reports
          </button>
          <button 
            onClick={handleLogout} 
            className="w-full flex items-center justify-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 py-2.5 px-4 rounded-xl text-sm font-bold transition-colors cursor-pointer border border-rose-500/20"
          >
            <LogOut size={16} />
            Logout
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
        const isActive = tab.href === '/'
          ? pathname === '/'
          : pathname.startsWith(tab.href) || (tab.href === '/reports' && ['/halfSummary', '/targetVsAchievement', '/uncoveredOutlet'].includes(pathname));
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
