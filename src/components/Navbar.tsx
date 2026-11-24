'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Truck,
  Building2,
  Navigation,
  ShieldCheck,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  RefreshCw,
  CheckCircle,
} from 'lucide-react';

interface CurrentUser {
  id: number;
  fullName: string;
  email: string;
  role: string;
  customer?: any;
  driver?: any;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === '/splash') {
    return null;
  }
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showPersonaMenu, setShowPersonaMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fetchSession = async () => {
    try {
      const res = await fetch('/api/v1/auth/me');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setCurrentUser(json.data);
        }
      }
    } catch {
      // not logged in
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await fetch('/api/v1/notifications');
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setNotifications(json.data);
        }
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchSession();
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 20000);
    return () => clearInterval(interval);
  }, [pathname]);

  const switchPersona = async (email: string, targetPath: string) => {
    try {
      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: 'password123' }),
      });
      if (res.ok) {
        setShowPersonaMenu(false);
        await fetchSession();
        await fetchNotifications();
        router.push(targetPath);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const unreadCount = notifications.filter((n) => !n.readAt).length;

  const markAllRead = async () => {
    try {
      await fetch('/api/v1/notifications', { method: 'PATCH' });
      setNotifications((prev) => prev.map((n) => ({ ...n, readAt: new Date() })));
    } catch {
      // ignore
    }
  };

  const navLinks = [
    { name: 'Customer', href: '/customer', icon: Building2, desc: 'Shipper Bookings' },
    { name: 'Route NH Platform', href: '/platform', icon: Truck, desc: 'Operations & Dispatch' },
    { name: 'Driver App', href: '/driver', icon: Navigation, desc: 'Trip & GPS Console' },
    { name: 'Admin', href: '/admin', icon: ShieldCheck, desc: 'System & Pricing' },
  ];

  const isMobileLayoutPage = pathname === '/customer' || pathname === '/login' || pathname === '/ui-components';

  return (
    <header className={`sticky top-0 z-50 bg-navy-900 border-b border-navy-800 text-white shadow-md ${isMobileLayoutPage ? 'hidden md:block' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 rounded-lg bg-orange-500 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:bg-orange-600 transition-colors">
                NH
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-wider text-white flex items-center">
                  ROUTE <span className="text-orange-400 ml-1">NH</span>
                </span>
                <span className="text-[10px] text-slate-300 tracking-tight font-medium hidden sm:inline">
                  Moving Goods. Connecting Businesses.
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links (Portals) */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-orange-500 text-white shadow-sm'
                      : 'text-slate-200 hover:text-white hover:bg-navy-800'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right side controls */}
          <div className="flex items-center space-x-3">
            {/* Quick Persona Switcher */}
            <div className="relative">
              <button
                onClick={() => setShowPersonaMenu(!showPersonaMenu)}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium bg-navy-800 hover:bg-navy-700 text-slate-200 border border-navy-700 transition-colors"
                title="Switch active role demo user"
              >
                <RefreshCw className="w-3.5 h-3.5 text-orange-400" />
                <span className="hidden lg:inline">Persona:</span>
                <span className="font-semibold text-white">
                  {currentUser ? currentUser.role : 'Select Role'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {showPersonaMenu && (
                <div className="absolute right-0 mt-2 w-72 bg-white text-slate-900 rounded-lg shadow-2xl border border-slate-200 py-2 z-50">
                  <div className="px-3 py-1.5 border-b border-slate-100 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Quick Persona Switcher (Demo)
                  </div>
                  <button
                    onClick={() => switchPersona('customer@tatamotors.com', '/customer')}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-slate-800">Sunil Mittal</div>
                      <div className="text-xs text-slate-500">Tata Motors Parts (Customer)</div>
                    </div>
                    {currentUser?.role === 'CUSTOMER' && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                  </button>
                  <button
                    onClick={() => switchPersona('operations@routenh.com', '/platform')}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-slate-800">Rajesh Nair</div>
                      <div className="text-xs text-slate-500">Operations Manager (Platform)</div>
                    </div>
                    {currentUser?.role === 'OPERATIONS' && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                  </button>
                  <button
                    onClick={() => switchPersona('driver.ramesh@routenh.com', '/driver')}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-slate-800">Ramesh Kumar Yadav</div>
                      <div className="text-xs text-slate-500">Commercial Driver (DL-01-AB-4589)</div>
                    </div>
                    {currentUser?.role === 'DRIVER' && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                  </button>
                  <button
                    onClick={() => switchPersona('admin@routenh.com', '/admin')}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-slate-50 flex items-center justify-between"
                  >
                    <div>
                      <div className="font-semibold text-slate-800">Vikram Singhania</div>
                      <div className="text-xs text-slate-500">Super Administrator (All Access)</div>
                    </div>
                    {currentUser?.role === 'ADMIN' && <CheckCircle className="w-4 h-4 text-emerald-600" />}
                  </button>
                </div>
              )}
            </div>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  if (!showNotifications && unreadCount > 0) markAllRead();
                }}
                className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-navy-800 transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-orange-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white text-slate-900 rounded-lg shadow-2xl border border-slate-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                    <span className="font-semibold text-sm text-slate-800">Notifications</span>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="text-xs text-orange-600 hover:underline"
                      >
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-500">
                        No notifications yet
                      </div>
                    ) : (
                      notifications.slice(0, 8).map((n) => (
                        <div
                          key={n.id}
                          className={`p-3 text-xs hover:bg-slate-50 transition-colors ${
                            !n.readAt ? 'bg-orange-50/50' : ''
                          }`}
                        >
                          <div className="font-semibold text-slate-900 mb-0.5">{n.title}</div>
                          <div className="text-slate-600 leading-relaxed">{n.message}</div>
                          <div className="text-[10px] text-slate-400 mt-1">
                            {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-slate-300 hover:text-white hover:bg-navy-800"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-950 border-t border-navy-800 px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium ${
                  isActive ? 'bg-orange-500 text-white' : 'text-slate-200 hover:bg-navy-800'
                }`}
              >
                <Icon className="w-5 h-5 text-orange-400" />
                <div>
                  <div>{link.name}</div>
                  <div className="text-xs text-slate-400">{link.desc}</div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
