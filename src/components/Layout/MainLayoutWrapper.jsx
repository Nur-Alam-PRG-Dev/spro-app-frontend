'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Header/Header";
import { MobileHeader, MobileTabBar } from "@/components/Mobile/MobileNav";

import { usePathname, useRouter } from 'next/navigation';

export default function MainLayoutWrapper({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const isLoginPage = pathname === '/login';

  useEffect(() => {
    // If we're already on the login page, no need for timeout
    if (isLoginPage) return;

    // Check if 24 hours have already passed since login
    const loginTime = localStorage.getItem('spro_login_time');
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
    
    if (loginTime && Date.now() - parseInt(loginTime) > TWENTY_FOUR_HOURS) {
      router.push('/login');
      return;
    }

    let timeoutId;

    const resetTimer = () => {
      clearTimeout(timeoutId);
      // Set timeout for 24 hours of inactivity
      timeoutId = setTimeout(() => {
        router.push('/login');
      }, TWENTY_FOUR_HOURS);
    };

    // Events that denote user activity
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];

    const setupListeners = () => {
      events.forEach(event => window.addEventListener(event, resetTimer));
    };

    const cleanupListeners = () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      clearTimeout(timeoutId);
    };

    // Initialize timer and listeners
    resetTimer();
    setupListeners();

    // Cleanup on unmount
    return cleanupListeners;
  }, [isLoginPage, router]);

  if (isLoginPage) {
    return (
      <div className="flex h-screen w-screen overflow-hidden bg-[var(--color-bg-main)]">
        <main className="flex-1 overflow-y-auto bg-[var(--color-bg-main)]">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[var(--color-bg-main)]">
      {/* Desktop Left Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Right Area Shell */}
      <div className="flex-1 flex flex-col h-full overflow-hidden transition-all duration-300">
        {/* Desktop Top Header & Mobile Header */}
        <Header toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <MobileHeader />

        {/* Main scrollable page content */}
        <main className="flex-1 overflow-y-auto px-4 py-5 md:p-6 bg-[var(--color-bg-main)] pb-24 lg:pb-6">
          {children}
        </main>
      </div>

      {/* Mobile Floating Bottom Bar */}
      <MobileTabBar />
    </div>
  );
}
