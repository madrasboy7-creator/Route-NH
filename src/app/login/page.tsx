'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Phone, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import RouteNHLogo from '@/components/RouteNHLogo';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Default to Priya Sharma credentials if left empty
    const targetEmail = email.trim() || 'priyasharma@gmail.com';
    const targetPassword = password.trim() || 'priya143';

    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: targetEmail, password: targetPassword }),
      });

      const json = await res.json();
      if (json.success) {
        const role = json.data?.user?.role;
        if (role === 'CUSTOMER') router.push('/customer');
        else if (role === 'OPERATIONS' || role === 'DISPATCHER') router.push('/platform');
        else if (role === 'DRIVER') router.push('/driver');
        else if (role === 'ADMIN') router.push('/admin');
        else router.push('/customer');
      } else {
        setError(json.error || 'Invalid email or password');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check network connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'priyasharma@gmail.com', password: 'priya143' }),
      });
      const json = await res.json();
      if (json.success) {
        router.push('/customer');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white sm:bg-[#F4F6F9] sm:py-6 flex flex-col justify-center items-center">
      {/* Container: 100% full screen on mobile, phone-frame on desktop */}
      <div className="w-full sm:max-w-[380px] min-h-screen sm:min-h-0 sm:h-[780px] bg-white sm:rounded-[44px] sm:shadow-2xl sm:border-[8px] sm:border-[#0F172A] flex flex-col justify-between relative select-none">
        
        {/* Desktop-only simulated status bar */}
        <div className="hidden sm:flex h-8 px-6 pt-2 items-center justify-between text-xs font-semibold text-slate-800 bg-white/95 backdrop-blur z-30">
          <span>9:41</span>
          <div className="w-20 h-3.5 bg-slate-900 rounded-full mx-auto -mt-1"></div>
          <div className="flex items-center space-x-1 text-[10px]">
            <span>5G</span>
            <div className="w-4 h-2.5 border border-slate-700 rounded-sm p-0.5">
              <div className="w-full h-full bg-slate-800"></div>
            </div>
          </div>
        </div>

        {/* Top Hero Section: Highway Truck with Logo Overlaid on Sky */}
        <div className="relative w-full h-[250px] sm:h-[290px] overflow-hidden bg-sky-200 flex-shrink-0">
          {/* Truck highway photo */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=85')`,
            }}
          ></div>

          {/* Soft bright gradient over sky to ensure Route NH logo has optimal contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/20 to-transparent h-28 pointer-events-none"></div>

          {/* Route NH Brand Logo placed over the sky at the top */}
          <div className="relative z-20 pt-8 sm:pt-4 px-6 flex justify-center">
            <RouteNHLogo size="sm" theme="dark" showTagline={true} />
          </div>
        </div>

        {/* White Curved Sheet Rising Upward over the Highway Image */}
        <div className="flex-1 bg-white -mt-10 rounded-t-[38px] px-6 pt-5 pb-0 shadow-[0_-12px_30px_rgba(0,0,0,0.08)] flex flex-col justify-between z-10 relative">
          <div className="pt-1">
            <h1 className="text-[23px] font-black text-[#0B1B36] tracking-tight">Welcome Back!</h1>
            <p className="text-xs text-slate-500 font-medium mt-0.5 mb-4">Sign in to continue</p>

            {error && (
              <div className="p-2.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center space-x-2 mb-3 animate-fadeIn">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-3">
              {/* Phone / Email input */}
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Phone / Email"
                  className="w-full pl-10 pr-3 py-3 text-xs bg-white border border-slate-200 rounded-xl focus:border-[#0B1B36] focus:ring-1 focus:ring-[#0B1B36] font-medium text-slate-800 transition-all placeholder:text-slate-400"
                />
              </div>

              {/* Password input */}
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full pl-10 pr-10 py-3 text-xs bg-white border border-slate-200 rounded-xl focus:border-[#0B1B36] focus:ring-1 focus:ring-[#0B1B36] font-medium text-slate-800 transition-all placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {passwordVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
              </div>

              {/* Forgot Password Link */}
              <div className="text-right">
                <button
                  type="button"
                  className="text-xs font-semibold text-[#F97316] hover:text-orange-600 transition-colors"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Primary Sign In Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#0B1B36] hover:bg-[#122442] active:bg-[#071122] text-white text-center rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all disabled:opacity-70 mt-1"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            {/* "or" Divider */}
            <div className="flex items-center my-3">
              <div className="flex-1 h-[1px] bg-slate-200"></div>
              <span className="px-3 text-[11px] text-slate-400 font-medium">or</span>
              <div className="flex-1 h-[1px] bg-slate-200"></div>
            </div>

            {/* Google Sign In Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full py-2.5 bg-white border border-slate-200 hover:bg-slate-50 active:bg-slate-100 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center space-x-2.5 shadow-2xs transition-colors"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Footer with Sign Up & Exact Bottom Orange/Navy Dynamic Swoosh */}
          <div className="mt-3">
            <div className="text-center text-xs text-slate-500 font-medium mb-3">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => router.push('/customer')}
                className="font-bold text-[#F97316] hover:underline"
              >
                Sign Up
              </button>
            </div>

            {/* Exact Bottom Orange & Navy Sweeping Curve glued to the bottom edge */}
            <div className="w-full h-11 relative overflow-hidden -mx-6 px-0 mb-0">
              <svg
                viewBox="0 0 375 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full block"
                preserveAspectRatio="none"
              >
                {/* Deep navy bottom-right underlay */}
                <path
                  d="M100 42H375V14C315 24 220 34 100 42Z"
                  fill="#0B1B36"
                />
                {/* Orange dynamic sweeping ribbon */}
                <path
                  d="M0 42C35 28 95 14 200 15C280 16 340 10 375 4V14C330 20 260 25 180 23C95 21 35 32 0 42Z"
                  fill="#F97316"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
