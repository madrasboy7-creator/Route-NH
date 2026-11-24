'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Menu,
  Bell,
  Box,
  Calendar,
  MapPin,
  FileText,
  ChevronRight,
  CheckCircle,
  Truck,
  Compass,
  Headphones,
  Home,
  User,
  Settings,
  LogOut,
  CreditCard,
  Search,
  Check,
  X,
  Phone,
  Lock,
  Eye,
  EyeOff,
  Clock,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
} from 'lucide-react';
import RouteNHLogo from './RouteNHLogo';

export default function ShowcaseView() {
  const [activePortal, setActivePortal] = useState<'customer' | 'driver' | 'crm'>('customer');
  const [activeTab, setActiveTab] = useState<'home' | 'bookings' | 'track' | 'invoices' | 'support'>('home');
  const [showDrawer, setShowDrawer] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Sign in form state
  const [loginIdentifier, setLoginIdentifier] = useState('priyasharma@gmail.com');
  const [loginPassword, setLoginPassword] = useState('priya143');

  return (
    <div className="w-full bg-[#F4F6F9] min-h-screen py-8 px-4 sm:px-6 lg:px-8 font-sans antialiased text-slate-800">
      {/* Top Banner Header matching the reference screenshot */}
      <div className="max-w-[1440px] mx-auto mb-8 bg-white/80 backdrop-blur rounded-2xl p-6 shadow-sm border border-slate-200/80">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo & Slogan */}
          <div className="flex items-center space-x-6">
            <RouteNHLogo size="lg" theme="dark" showTagline={true} />
            <div className="hidden lg:block h-10 w-[1px] bg-slate-300"></div>
            <div className="hidden lg:block">
              <h2 className="text-xl font-bold text-[#0B1B36] tracking-tight">
                Mobile UI – Common, Driver, Customer & CRM
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                A unified, professional and intuitive experience across all portals
              </p>
            </div>
          </div>

          {/* Portal Legend & Selector */}
          <div className="flex items-center space-x-3 bg-slate-50 p-2 rounded-xl border border-slate-200 self-start md:self-auto">
            <button
              onClick={() => setActivePortal('customer')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activePortal === 'customer'
                  ? 'bg-white shadow text-[#0B1B36]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#0B1B36]"></span>
              <span>Customer</span>
            </button>

            <button
              onClick={() => setActivePortal('driver')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activePortal === 'driver'
                  ? 'bg-white shadow text-[#0D9488]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#0D9488]"></span>
              <span>Driver</span>
            </button>

            <button
              onClick={() => setActivePortal('crm')}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activePortal === 'crm'
                  ? 'bg-white shadow text-[#F97316]'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]"></span>
              <span>CRM / Ops</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Phone Mockup Screens Side-by-Side */}
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 justify-items-center">
        
        {/* ========================================================= */}
        {/* PHONE 1: SIGN IN / WELCOME BACK SCREEN                    */}
        {/* ========================================================= */}
        <div className="w-[320px] sm:w-[335px] h-[700px] bg-white rounded-[44px] shadow-2xl border-[8px] border-[#0F172A] overflow-hidden flex flex-col relative select-none">
          {/* iOS Status Bar */}
          <div className="h-9 px-6 pt-2 flex items-center justify-between text-xs font-semibold text-slate-800 z-20">
            <span>9:41</span>
            <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto -mt-1"></div>
            <div className="flex items-center space-x-1 text-[10px]">
              <span>5G</span>
              <div className="w-4 h-2.5 border border-slate-700 rounded-sm p-0.5">
                <div className="w-full h-full bg-slate-800"></div>
              </div>
            </div>
          </div>

          {/* Top Brand Banner */}
          <div className="px-5 pt-1 pb-3 flex justify-center">
            <RouteNHLogo size="sm" theme="dark" showTagline={true} />
          </div>

          {/* Hero Image Container */}
          <div className="relative h-44 w-full overflow-hidden bg-gradient-to-b from-sky-400 to-sky-600">
            {/* Realistic Highway Truck Graphics */}
            <div className="absolute inset-0 bg-cover bg-center" style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80')`,
            }}></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          </div>

          {/* White Bottom Curved Card */}
          <div className="flex-1 bg-white -mt-6 rounded-t-[32px] px-6 pt-5 pb-6 shadow-lg flex flex-col justify-between z-10 relative">
            <div>
              <h3 className="text-xl font-extrabold text-[#0B1B36]">Welcome Back!</h3>
              <p className="text-xs text-slate-500 mt-0.5 mb-4">Sign in to continue</p>

              {/* Form Inputs */}
              <div className="space-y-3">
                {/* Phone / Email input */}
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="Phone / Email"
                    className="w-full pl-10 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B1B36] font-medium"
                  />
                </div>

                {/* Password input */}
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={passwordVisible ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#0B1B36] font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setPasswordVisible(!passwordVisible)}
                    className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {passwordVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Forgot Password */}
                <div className="text-right">
                  <button className="text-[11px] font-semibold text-[#F97316] hover:underline">
                    Forgot Password?
                  </button>
                </div>

                {/* Primary Button */}
                <Link
                  href="/customer"
                  className="block w-full py-2.5 bg-[#0B1B36] hover:bg-[#152B4D] text-white text-center rounded-xl text-xs font-bold shadow-md transition-colors"
                >
                  Sign In
                </Link>

                {/* or Divider */}
                <div className="flex items-center my-2">
                  <div className="flex-1 h-[1px] bg-slate-200"></div>
                  <span className="px-2 text-[10px] text-slate-400 font-medium">or</span>
                  <div className="flex-1 h-[1px] bg-slate-200"></div>
                </div>

                {/* Google Sign In */}
                <button
                  type="button"
                  className="w-full py-2 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center space-x-2 transition-colors"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
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
            </div>

            {/* Bottom Footer & Decorative Curve */}
            <div>
              <div className="text-center text-[11px] text-slate-500 mt-2">
                Don't have an account?{' '}
                <span className="font-bold text-[#F97316] cursor-pointer hover:underline">Sign Up</span>
              </div>
              {/* Exact Bottom Orange Wave Accent */}
              <div className="w-full h-6 mt-3 relative overflow-hidden -mx-6 px-0 -mb-6">
                <svg
                  viewBox="0 0 375 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full block"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M0 28H375V14C320 24 220 28 160 19C100 10 40 17 0 28Z"
                    fill="#0B1B36"
                  />
                  <path
                    d="M0 28L0 10C60 7 130 0 200 5C270 10 330 21 375 14V19C330 24 270 15 200 10C130 5 60 14 0 28Z"
                    fill="#F97316"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PHONE 2: COMMON / CUSTOMER DASHBOARD SCREEN               */}
        {/* ========================================================= */}
        <div className="w-[320px] sm:w-[335px] h-[700px] bg-slate-50 rounded-[44px] shadow-2xl border-[8px] border-[#0F172A] overflow-hidden flex flex-col relative select-none">
          {/* iOS Status Bar */}
          <div className="h-8 px-6 pt-2 flex items-center justify-between text-xs font-semibold text-slate-800 bg-white">
            <span>9:41</span>
            <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto -mt-1"></div>
            <div className="flex items-center space-x-1 text-[10px]">
              <span>5G</span>
              <div className="w-4 h-2.5 border border-slate-700 rounded-sm p-0.5">
                <div className="w-full h-full bg-slate-800"></div>
              </div>
            </div>
          </div>

          {/* App Bar */}
          <div className="px-4 py-2 bg-white border-b border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setShowDrawer(true)}
              className="p-1 rounded-lg text-slate-700 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <RouteNHLogo size="sm" theme="dark" showTagline={false} />
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Bell className="w-4 h-4 text-slate-600" />
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-red-500 text-white text-[8px] font-bold flex items-center justify-center">
                  2
                </span>
              </div>
              <div className="w-7 h-7 rounded-full overflow-hidden border border-slate-200">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                  alt="Priya Sharma"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Scrollable Dashboard Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-20">
            {/* Good Morning Greeting Card with Truck Background */}
            <div className="relative rounded-2xl overflow-hidden p-4 text-white shadow-md bg-gradient-to-r from-[#0B1B36] to-[#1E3A8A]">
              <div
                className="absolute inset-0 bg-cover bg-right opacity-30"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=600&q=80')`,
                }}
              ></div>
              <div className="relative z-10">
                <h3 className="text-base font-extrabold leading-tight">Good Morning,<br />Priya Sharma!</h3>
                <p className="text-[10px] text-slate-200 mt-1 font-medium">Moving Goods. Connecting Businesses.</p>
              </div>
            </div>

            {/* 4-Item Quick Action Grid */}
            <div className="grid grid-cols-4 gap-2">
              <Link href="/customer" className="bg-white p-2.5 rounded-xl shadow-xs border border-slate-100 flex flex-col items-center text-center hover:shadow transition-shadow">
                <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center mb-1">
                  <Box className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-slate-800 leading-tight">Book a Truck</span>
              </Link>

              <Link href="/customer" className="bg-white p-2.5 rounded-xl shadow-xs border border-slate-100 flex flex-col items-center text-center hover:shadow transition-shadow">
                <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center mb-1">
                  <Calendar className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-slate-800 leading-tight">My Bookings</span>
              </Link>

              <Link href="/customer" className="bg-white p-2.5 rounded-xl shadow-xs border border-slate-100 flex flex-col items-center text-center hover:shadow transition-shadow">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-slate-800 leading-tight">Track Shipment</span>
              </Link>

              <Link href="/customer" className="bg-white p-2.5 rounded-xl shadow-xs border border-slate-100 flex flex-col items-center text-center hover:shadow transition-shadow">
                <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center mb-1">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-slate-800 leading-tight">Invoices</span>
              </Link>
            </div>

            {/* Your Shipments Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-[#0B1B36]">Your Shipments</span>
                <Link href="/customer" className="text-[11px] font-bold text-blue-600 hover:underline flex items-center">
                  <span>View All</span>
                  <ChevronRight className="w-3 h-3 ml-0.5" />
                </Link>
              </div>

              {/* Shipment Card */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                    <img
                      src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=200&q=80"
                      alt="Truck"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[11px] font-extrabold text-slate-900">RNH-BKG-00124</span>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        In Transit
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-slate-700 mt-0.5">Chennai → Bengaluru</div>
                    <div className="text-[9px] text-slate-400 mt-0.5">ETA: 10 Nov 2026, 06:00 PM</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
              </div>
            </div>

            {/* Need a Quote Banner with Container Yard Background */}
            <div className="relative rounded-2xl overflow-hidden p-4 text-white shadow-sm bg-slate-900">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-40"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80')`,
                }}
              ></div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-black">Need a Quote?</h4>
                  <p className="text-[10px] text-slate-200 mt-0.5 max-w-[160px]">
                    Get instant quotation for your shipment.
                  </p>
                </div>
                <Link
                  href="/customer"
                  className="px-3 py-1.5 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-lg text-[10px] font-bold shadow transition-colors"
                >
                  Get Quote
                </Link>
              </div>
            </div>

            {/* Recent Activity Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-extrabold text-[#0B1B36]">Recent Activity</span>
                <Link href="/customer" className="text-[11px] font-bold text-blue-600 hover:underline flex items-center">
                  <span>View All</span>
                  <ChevronRight className="w-3 h-3 ml-0.5" />
                </Link>
              </div>

              {/* Activity Item */}
              <div className="bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-extrabold text-slate-900">Shipment Delivered</div>
                  <div className="text-[10px] text-slate-500">RNH-SHP-00067</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">08 Nov 2026, 04:30 PM</div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Tab Bar (5 icons) */}
          <div className="h-14 bg-white border-t border-slate-100 px-4 flex items-center justify-around absolute bottom-0 inset-x-0 z-10">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex flex-col items-center text-[10px] font-bold ${
                activeTab === 'home' ? 'text-[#F97316]' : 'text-slate-400'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>

            <button
              onClick={() => setActiveTab('bookings')}
              className={`flex flex-col items-center text-[10px] font-bold ${
                activeTab === 'bookings' ? 'text-[#F97316]' : 'text-slate-400'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Bookings</span>
            </button>

            <button
              onClick={() => setActiveTab('track')}
              className={`flex flex-col items-center text-[10px] font-bold ${
                activeTab === 'track' ? 'text-[#F97316]' : 'text-slate-400'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Track</span>
            </button>

            <button
              onClick={() => setActiveTab('invoices')}
              className={`flex flex-col items-center text-[10px] font-bold ${
                activeTab === 'invoices' ? 'text-[#F97316]' : 'text-slate-400'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Invoices</span>
            </button>

            <button
              onClick={() => setActiveTab('support')}
              className={`flex flex-col items-center text-[10px] font-bold ${
                activeTab === 'support' ? 'text-[#F97316]' : 'text-slate-400'
              }`}
            >
              <Headphones className="w-4 h-4" />
              <span>Support</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PHONE 3: SLIDE-OUT NAVIGATION DRAWER SCREEN               */}
        {/* ========================================================= */}
        <div className="w-[320px] sm:w-[335px] h-[700px] bg-slate-900/60 rounded-[44px] shadow-2xl border-[8px] border-[#0F172A] overflow-hidden flex flex-col relative select-none">
          {/* iOS Status Bar */}
          <div className="h-8 px-6 pt-2 flex items-center justify-between text-xs font-semibold text-slate-800 bg-white z-20">
            <span>9:41</span>
            <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto -mt-1"></div>
            <div className="flex items-center space-x-1 text-[10px]">
              <span>5G</span>
              <div className="w-4 h-2.5 border border-slate-700 rounded-sm p-0.5">
                <div className="w-full h-full bg-slate-800"></div>
              </div>
            </div>
          </div>

          {/* Drawer Menu Body (takes ~88% width) */}
          <div className="w-[88%] h-full bg-white shadow-2xl flex flex-col justify-between py-4 px-4 z-10 overflow-y-auto">
            <div className="space-y-4">
              {/* User Profile Header in Drawer */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#0B1B36]">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                      alt="Priya Sharma"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-extrabold text-xs text-[#0B1B36]">Priya Sharma</div>
                    <div className="text-[10px] text-slate-500">priya@routenh.com</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              {/* Customer Portal Section */}
              <div>
                <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
                  Customer Portal
                </div>
                <div className="space-y-1">
                  <Link
                    href="/customer"
                    className="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold bg-[#E0F2FE] text-[#0284C7]"
                  >
                    <Home className="w-4 h-4 text-[#0284C7]" />
                    <span>Dashboard</span>
                  </Link>

                  <Link
                    href="/customer"
                    className="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <Truck className="w-4 h-4 text-slate-500" />
                    <span>Book a Truck</span>
                  </Link>

                  <Link
                    href="/customer"
                    className="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span>My Bookings</span>
                  </Link>

                  <Link
                    href="/customer"
                    className="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <Box className="w-4 h-4 text-slate-500" />
                    <span>My Shipments</span>
                  </Link>

                  <Link
                    href="/customer"
                    className="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <span>Live Tracking</span>
                  </Link>

                  <Link
                    href="/customer"
                    className="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <FileText className="w-4 h-4 text-slate-500" />
                    <span>Invoices</span>
                  </Link>

                  <Link
                    href="/customer"
                    className="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <CreditCard className="w-4 h-4 text-slate-500" />
                    <span>Payments</span>
                  </Link>

                  <Link
                    href="/customer"
                    className="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50"
                  >
                    <Headphones className="w-4 h-4 text-slate-500" />
                    <span>Support</span>
                  </Link>
                </div>
              </div>

              {/* Account Section */}
              <div>
                <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2">
                  Account
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer">
                    <User className="w-4 h-4 text-slate-500" />
                    <span>Profile</span>
                  </div>

                  <div className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer">
                    <div className="flex items-center space-x-3">
                      <Bell className="w-4 h-4 text-slate-500" />
                      <span>Notifications</span>
                    </div>
                    <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                      2
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer">
                    <Settings className="w-4 h-4 text-slate-500" />
                    <span>Settings</span>
                  </div>

                  <Link
                    href="/login"
                    className="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium text-red-600 hover:bg-red-50 cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-red-600" />
                    <span>Logout</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Drawer Footer */}
            <div className="pt-4 border-t border-slate-100 flex flex-col items-center">
              <RouteNHLogo size="sm" theme="dark" showTagline={true} />
              <div className="text-[9px] text-slate-400 mt-1">v1.0.0</div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PHONE 4: UI COMPONENTS & DESIGN SYSTEM SHEET             */}
        {/* ========================================================= */}
        <div className="w-[320px] sm:w-[335px] h-[700px] bg-slate-50 rounded-[44px] shadow-2xl border-[8px] border-[#0F172A] overflow-hidden flex flex-col relative select-none">
          {/* iOS Status Bar */}
          <div className="h-8 px-6 pt-2 flex items-center justify-between text-xs font-semibold text-slate-800 bg-white">
            <span>9:41</span>
            <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto -mt-1"></div>
            <div className="flex items-center space-x-1 text-[10px]">
              <span>5G</span>
              <div className="w-4 h-2.5 border border-slate-700 rounded-sm p-0.5">
                <div className="w-full h-full bg-slate-800"></div>
              </div>
            </div>
          </div>

          {/* Component Header */}
          <div className="px-4 py-2 bg-white border-b border-slate-100 flex items-center space-x-2">
            <span className="text-slate-600 font-bold">&lt;</span>
            <span className="font-extrabold text-sm text-[#0B1B36]">UI Components</span>
          </div>

          {/* Scrollable Component Catalog */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {/* Buttons */}
            <div>
              <div className="font-extrabold text-[11px] text-slate-700 mb-2">Buttons</div>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <button className="w-full py-2 bg-[#0B1B36] text-white rounded-xl font-bold text-xs shadow-xs">
                    Primary Button
                  </button>
                  <button className="w-full py-2 bg-[#F97316] text-white rounded-xl font-bold text-xs shadow-xs">
                    Action Button
                  </button>
                </div>
                <button className="w-full py-2 bg-white border border-slate-300 text-slate-800 rounded-xl font-bold text-xs hover:bg-slate-50">
                  Outlined Button
                </button>
              </div>
            </div>

            {/* Inputs & Search */}
            <div>
              <div className="font-extrabold text-[11px] text-slate-700 mb-2">Inputs & Search</div>
              <div className="space-y-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search shipments..."
                    className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none"
                    readOnly
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Select Date"
                    className="w-full pl-3 pr-9 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none"
                    readOnly
                  />
                  <Calendar className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
                </div>
              </div>
            </div>

            {/* Status Badges */}
            <div>
              <div className="font-extrabold text-[11px] text-slate-700 mb-2">Status Badges</div>
              <div className="grid grid-cols-2 gap-2">
                <div className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-bold text-[10px] flex items-center justify-center space-x-1">
                  <Check className="w-3 h-3" />
                  <span>REQUESTED</span>
                </div>
                <div className="px-2.5 py-1 bg-blue-50 text-blue-700 border border-blue-200 rounded-full font-bold text-[10px] flex items-center justify-center space-x-1">
                  <span className="w-2 h-2 rounded-full border border-blue-700"></span>
                  <span>CONFIRMED</span>
                </div>
                <div className="px-2.5 py-1 bg-orange-50 text-orange-700 border border-orange-200 rounded-full font-bold text-[10px] flex items-center justify-center space-x-1">
                  <span className="w-2 h-2 rounded-full border border-orange-700"></span>
                  <span>IN_TRANSIT</span>
                </div>
                <div className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full font-bold text-[10px] flex items-center justify-center space-x-1">
                  <Check className="w-3 h-3" />
                  <span>DELIVERED</span>
                </div>
              </div>
            </div>

            {/* Confirm Action Dialog Card */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs text-center">
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-1">
                <Check className="w-4 h-4" />
              </div>
              <div className="font-extrabold text-xs text-slate-900">Confirm Action?</div>
              <p className="text-[10px] text-slate-500 mt-0.5 mb-3">Are you sure you want to proceed?</p>
              <div className="grid grid-cols-2 gap-2">
                <button className="py-1.5 border border-slate-300 rounded-xl text-slate-700 font-bold text-[11px]">
                  Cancel
                </button>
                <button className="py-1.5 bg-[#F97316] text-white rounded-xl font-bold text-[11px]">
                  Confirm
                </button>
              </div>
            </div>

            {/* Notification Alert */}
            <div className="bg-white p-2.5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 rounded-full bg-[#0B1B36] text-white flex items-center justify-center flex-shrink-0">
                  <Bell className="w-3 h-3" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-800 leading-tight">
                    Your shipment has been dispatched successfully.
                  </div>
                  <div className="text-[9px] text-slate-400">2m ago</div>
                </div>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
            </div>

            {/* Empty & Loading States */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Empty State</div>
                <Box className="w-5 h-5 text-slate-300 mx-auto" />
                <div className="text-[10px] font-extrabold text-slate-800 mt-0.5">No bookings yet</div>
                <button className="mt-1.5 px-2 py-0.5 bg-[#F97316] text-white rounded text-[9px] font-bold">
                  Book Now
                </button>
              </div>

              <div className="bg-white p-2.5 rounded-xl border border-slate-200 text-center">
                <div className="text-[9px] font-bold text-slate-400 uppercase mb-1">Loading State</div>
                <div className="space-y-1.5 mt-2">
                  <div className="h-2 bg-slate-200 rounded-full w-3/4 mx-auto animate-pulse"></div>
                  <div className="h-2 bg-slate-100 rounded-full w-1/2 mx-auto animate-pulse"></div>
                  <div className="w-4 h-4 border-2 border-slate-300 border-t-[#0B1B36] rounded-full animate-spin mx-auto mt-2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
