'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, ShieldAlert, Sparkles } from 'lucide-react';
import Card from '@/components/ui/Card';

export default function LoginPage() {
  const router = useRouter();
  const [staffId, setStaffId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: staffId, password, hris_status: 0 })
      });

      const resData = await response.json();

      if (!response.ok) {
        setError(resData.error || 'Invalid Staff ID or Password.');
        setIsLoading(false);
        return;
      }

      if (resData.status === 'success' && resData.data) {
        // Store user and baseImageUrl in localStorage
        localStorage.setItem('spro_user', JSON.stringify(resData.data));
        localStorage.setItem('baseImageUrl', resData.baseImageUrl || '');

        // Also set login timestamp for 24hr timeout
        localStorage.setItem('spro_login_time', Date.now().toString());

        router.push('/');
      } else {
        setError('Unexpected response from server.');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred during login. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[100dvh] flex bg-white font-sans overflow-hidden">

      {/* Left Panel - Illustration */}
      <div className="hidden lg:flex flex-1 items-center justify-center bg-[#f3f2f7] relative overflow-hidden">
        
        {/* SPRO Logo Top Left */}
        <div className="absolute top-8 left-8 flex items-center gap-2 z-20">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center shadow-md">
            <Sparkles size={16} className="text-white" />
          </div>
          <span className="text-2xl font-black text-zinc-800 tracking-tight">SPRO</span>
        </div>

        {/* Vector Illustration */}
        <div className="relative w-full max-w-2xl px-12 z-10 flex items-center justify-center">
          <img 
            src="/avater.jpg" 
            alt="Login Illustration"
            className="w-full h-auto object-contain"
          />
        </div>
        
      </div>

      {/* Right Panel - Login Form */}
      <div className="w-full lg:w-[450px] xl:w-[500px] flex px-8 sm:px-12 py-10 bg-white shadow-[-10px_0_30px_rgba(0,0,0,0.03)] z-20 overflow-y-auto">
        <div className="w-full max-w-sm m-auto">
          
          {/* Mobile Logo (Visible only on small screens) */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center shadow-md">
              <Sparkles size={16} className="text-white" />
            </div>
            <span className="text-2xl font-black text-zinc-800 tracking-tight">SPRO</span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-zinc-800 mb-2 tracking-tight flex items-center gap-2">
              Welcome to SPRO! <span className="text-2xl">👋</span>
            </h1>
            <p className="text-[13px] text-zinc-500 font-medium">
              Please sign-in to your account and start the adventure
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-rose-50/80 border border-rose-100 rounded-lg flex items-start gap-2.5 animate-in slide-in-from-top-2 fade-in duration-300">
              <ShieldAlert className="text-rose-500 shrink-0 mt-0.5" size={16} />
              <p className="text-xs font-semibold text-rose-700 leading-tight">
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Staff ID Input (Styled like Email) */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-zinc-600 uppercase tracking-wide">
                Staff ID
              </label>
              <input
                type="text"
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                placeholder="e.g. 567203"
                className="w-full px-3.5 py-2.5 bg-white border border-zinc-200 rounded-[8px] outline-none focus:border-[var(--color-primary)] focus:ring-[3px] focus:ring-[var(--color-primary)]/10 transition-all text-[13px] font-medium text-zinc-800 placeholder:text-zinc-300"
                required
              />
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-semibold text-zinc-600 uppercase tracking-wide">
                  Password
                </label>
                <a href="#" className="text-[11px] font-medium text-[var(--color-primary)] hover:underline transition-colors">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                  className="w-full pl-3.5 pr-10 py-2.5 bg-white border border-zinc-200 rounded-[8px] outline-none focus:border-[var(--color-primary)] focus:ring-[3px] focus:ring-[var(--color-primary)]/10 transition-all text-[13px] font-medium text-zinc-800 placeholder:text-zinc-300 placeholder:text-[8px] tracking-widest"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-zinc-600 focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff size={16} strokeWidth={1.5} /> : <Eye size={16} strokeWidth={1.5} />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 pt-1 pb-2">
              <input 
                type="checkbox" 
                id="remember" 
                className="w-3.5 h-3.5 rounded-sm border-zinc-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
              />
              <label htmlFor="remember" className="text-[12px] font-medium text-zinc-600 select-none cursor-pointer">
                Remember me
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] active:scale-[0.98] text-white py-2.5 rounded-[8px] font-semibold text-[13px] transition-all duration-200 shadow-[0_4px_14px_rgba(0,0,0,0.1)] disabled:opacity-70 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Logging in...
                </span>
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Footer Link */}
          <div className="mt-6 text-center text-[13px] text-zinc-500 font-medium flex items-center justify-center gap-1.5">
            <span>New on our platform?</span>
            <a href="#" className="text-[var(--color-primary)] hover:underline font-bold transition-colors">
              Create an account
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
