'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User, Lock, ArrowRight, Eye, EyeOff, ShieldAlert } from 'lucide-react';
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
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg-main)] p-4 relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--color-primary-light)] rounded-full blur-[100px] opacity-70 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#dcf0e5] rounded-full blur-[120px] opacity-60 pointer-events-none" />

      <div className="w-full max-w-md z-10">
        {/* Logo / Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-primary)] shadow-lg mb-4">
            <span className="text-2xl font-black text-white tracking-tighter">SPRO</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--color-text-main)] tracking-tight mb-2">
            Welcome Back
          </h1>
          <p className="text-sm font-semibold text-[var(--color-text-muted)]">
            Sign in to access your operational dashboard
          </p>
        </div>

        <Card className="p-6 md:p-8 shadow-2xl border-white/50 backdrop-blur-xl bg-white/90" hoverable={false}>
          {error && (
            <div className="mb-6 p-3 sm:p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3 animate-in slide-in-from-top-2 fade-in duration-300">
              <ShieldAlert className="text-rose-500 shrink-0 mt-0.5" size={18} />
              <p className="text-xs sm:text-sm font-bold text-rose-700 leading-tight">
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Staff ID Input */}
            <div className="space-y-1.5">
              <label className="block text-[10px] sm:text-xs font-black text-[var(--color-text-muted)] tracking-wider uppercase">
                Staff ID
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-[var(--color-primary)] transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  value={staffId}
                  onChange={(e) => setStaffId(e.target.value)}
                  placeholder="e.g. 567203"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-50/50 border border-[var(--color-border)] rounded-xl outline-none focus:bg-white focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 transition-all text-sm font-bold text-[var(--color-text-main)] placeholder:font-medium placeholder:text-zinc-400"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label className="block text-[10px] sm:text-xs font-black text-[var(--color-text-muted)] tracking-wider uppercase">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 group-focus-within:text-[var(--color-primary)] transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-12 py-3 bg-zinc-50/50 border border-[var(--color-border)] rounded-xl outline-none focus:bg-white focus:border-[var(--color-primary)] focus:ring-4 focus:ring-[var(--color-primary)]/10 transition-all text-sm font-bold text-[var(--color-text-main)] placeholder:font-medium placeholder:text-zinc-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-zinc-600 focus:outline-none transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full group relative flex items-center justify-center gap-2 bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] active:scale-[0.98] text-white py-3.5 rounded-xl font-extrabold text-sm transition-all duration-200 overflow-hidden mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </button>
          </form>
        </Card>

        {/* Footer */}
        <p className="text-center mt-8 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
          SPRO Logistics Intelligence &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
}
