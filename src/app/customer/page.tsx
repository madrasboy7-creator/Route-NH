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
  Plus,
  X,
  Phone,
  Search,
  Check,
  Clock,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import RouteNHLogo from '@/components/RouteNHLogo';

export default function CustomerMobileDashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'bookings' | 'track' | 'invoices' | 'support'>('home');
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showBookTruckModal, setShowBookTruckModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

  // New Booking state
  const [pickupCity, setPickupCity] = useState('Chennai');
  const [deliveryCity, setDeliveryCity] = useState('Bengaluru');
  const [cargoDesc, setCargoDesc] = useState('Automotive Components');
  const [cargoWeight, setCargoWeight] = useState('14500');

  return (
    <div className="min-h-screen bg-[#F4F6F9] font-sans antialiased text-slate-800 pb-20 relative">
      {/* ========================================================= */}
      {/* 1. TOP APP BAR                                            */}
      {/* ========================================================= */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-100 px-4 py-2.5 flex items-center justify-between shadow-xs">
        <button
          onClick={() => setDrawerOpen(true)}
          className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link href="/" className="flex items-center">
          <RouteNHLogo size="sm" theme="dark" showTagline={false} />
        </Link>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setShowNotificationsModal(true)}
            className="p-1.5 rounded-full hover:bg-slate-100 relative text-slate-600 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-red-500 text-white text-[8px] font-bold flex items-center justify-center">
              2
            </span>
          </button>

          <button
            onClick={() => setDrawerOpen(true)}
            className="w-7 h-7 rounded-full overflow-hidden border border-slate-200 ring-2 ring-slate-100"
          >
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
              alt="Priya Sharma"
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. MAIN DASHBOARD CONTENT                                 */}
      {/* ========================================================= */}
      <main className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* Good Morning Greeting Card with Highway Truck Photo Background */}
        <div className="relative rounded-2xl overflow-hidden p-5 text-white shadow-md bg-gradient-to-r from-[#0B1B36] via-[#102A54] to-[#1E3A8A]">
          <div
            className="absolute inset-0 bg-cover bg-right opacity-35"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80')`,
            }}
          ></div>
          <div className="relative z-10">
            <h2 className="text-xl font-extrabold tracking-tight leading-tight">
              Good Morning,<br />
              Priya Sharma!
            </h2>
            <p className="text-[11px] text-slate-200 mt-1 font-medium">Moving Goods. Connecting Businesses.</p>
          </div>
        </div>

        {/* 4-Item Quick Action Grid */}
        <div className="grid grid-cols-4 gap-2.5">
          <button
            onClick={() => setShowBookTruckModal(true)}
            className="bg-white p-3 rounded-2xl shadow-xs border border-slate-100 flex flex-col items-center text-center hover:shadow transition-shadow"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-1.5 shadow-xs">
              <Box className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-extrabold text-slate-800 leading-tight">Book a Truck</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className="bg-white p-3 rounded-2xl shadow-xs border border-slate-100 flex flex-col items-center text-center hover:shadow transition-shadow"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-1.5 shadow-xs">
              <Calendar className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-extrabold text-slate-800 leading-tight">My Bookings</span>
          </button>

          <button
            onClick={() => setActiveTab('track')}
            className="bg-white p-3 rounded-2xl shadow-xs border border-slate-100 flex flex-col items-center text-center hover:shadow transition-shadow"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1.5 shadow-xs">
              <MapPin className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-extrabold text-slate-800 leading-tight">Track Shipment</span>
          </button>

          <button
            onClick={() => setActiveTab('invoices')}
            className="bg-white p-3 rounded-2xl shadow-xs border border-slate-100 flex flex-col items-center text-center hover:shadow transition-shadow"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-1.5 shadow-xs">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-extrabold text-slate-800 leading-tight">Invoices</span>
          </button>
        </div>

        {/* Your Shipments Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-[#0B1B36] tracking-tight">Your Shipments</span>
            <button
              onClick={() => setActiveTab('track')}
              className="text-[11px] font-bold text-blue-600 hover:underline flex items-center"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

          {/* Shipment Card from Reference Design */}
          <div
            onClick={() => setActiveTab('track')}
            className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0 border border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=200&q=80"
                  alt="Commercial White Truck"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-xs font-black text-slate-900">RNH-BKG-00124</span>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    In Transit
                  </span>
                </div>
                <div className="text-xs font-bold text-slate-800 mt-0.5 flex items-center">
                  <span>Chennai</span>
                  <span className="mx-1 text-slate-400">→</span>
                  <span>Bengaluru</span>
                </div>
                <div className="text-[10px] text-slate-400 font-medium mt-0.5">ETA: 10 Nov 2026, 06:00 PM</div>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
          </div>
        </div>

        {/* Need a Quote Banner with Container Yard Background */}
        <div className="relative rounded-2xl overflow-hidden p-4 text-white shadow-sm bg-slate-900">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-45"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80')`,
            }}
          ></div>
          <div className="relative z-10 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-black">Need a Quote?</h4>
              <p className="text-[10px] text-slate-200 mt-0.5 max-w-[170px] leading-snug">
                Get instant quotation for your shipment.
              </p>
            </div>
            <button
              onClick={() => setShowQuoteModal(true)}
              className="px-3.5 py-1.5 bg-[#F97316] hover:bg-[#EA580C] text-white rounded-lg text-xs font-bold shadow-md transition-colors"
            >
              Get Quote
            </button>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-[#0B1B36] tracking-tight">Recent Activity</span>
            <button
              onClick={() => setActiveTab('bookings')}
              className="text-[11px] font-bold text-blue-600 hover:underline flex items-center"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

          {/* Activity Item with Green Checkmark Circle */}
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <div className="text-xs font-extrabold text-slate-900">Shipment Delivered</div>
              <div className="text-[11px] text-slate-500 font-medium">RNH-SHP-00067</div>
              <div className="text-[10px] text-slate-400 mt-0.5">08 Nov 2026, 04:30 PM</div>
            </div>
          </div>
        </div>
      </main>

      {/* ========================================================= */}
      {/* 3. FIXED BOTTOM NAVIGATION BAR (5 TABS)                   */}
      {/* ========================================================= */}
      <nav className="fixed bottom-0 inset-x-0 h-16 bg-white border-t border-slate-100 px-4 flex items-center justify-around z-30 shadow-lg">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center text-[10px] font-bold transition-colors ${
            activeTab === 'home' ? 'text-[#F97316]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex flex-col items-center text-[10px] font-bold transition-colors ${
            activeTab === 'bookings' ? 'text-[#F97316]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Calendar className="w-5 h-5 mb-0.5" />
          <span>Bookings</span>
        </button>

        <button
          onClick={() => setActiveTab('track')}
          className={`flex flex-col items-center text-[10px] font-bold transition-colors ${
            activeTab === 'track' ? 'text-[#F97316]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span>Track</span>
        </button>

        <button
          onClick={() => setActiveTab('invoices')}
          className={`flex flex-col items-center text-[10px] font-bold transition-colors ${
            activeTab === 'invoices' ? 'text-[#F97316]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <FileText className="w-5 h-5 mb-0.5" />
          <span>Invoices</span>
        </button>

        <button
          onClick={() => setActiveTab('support')}
          className={`flex flex-col items-center text-[10px] font-bold transition-colors ${
            activeTab === 'support' ? 'text-[#F97316]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Headphones className="w-5 h-5 mb-0.5" />
          <span>Support</span>
        </button>
      </nav>

      {/* ========================================================= */}
      {/* 4. SLIDE-OUT NAVIGATION DRAWER (SCREEN 3)                 */}
      {/* ========================================================= */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop overlay */}
          <div
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          ></div>

          {/* Drawer Menu Body */}
          <div className="relative w-[300px] max-w-[85%] bg-white h-full shadow-2xl flex flex-col justify-between p-4 z-50 overflow-y-auto">
            <div className="space-y-5">
              {/* Profile Header */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 pt-1">
                <div className="flex items-center space-x-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-[#0B1B36]">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                      alt="Priya Sharma"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-black text-sm text-[#0B1B36]">Priya Sharma</div>
                    <div className="text-[11px] text-slate-500 font-medium">priyasharma@gmail.com</div>
                  </div>
                </div>
                <button onClick={() => setDrawerOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Customer Portal Links */}
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                  Customer Portal
                </div>
                <div className="space-y-1">
                  <div
                    onClick={() => {
                      setActiveTab('home');
                      setDrawerOpen(false);
                    }}
                    className="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold bg-[#E0F2FE] text-[#0284C7] cursor-pointer"
                  >
                    <Home className="w-4 h-4 text-[#0284C7]" />
                    <span>Dashboard</span>
                  </div>

                  <div
                    onClick={() => {
                      setShowBookTruckModal(true);
                      setDrawerOpen(false);
                    }}
                    className="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <Truck className="w-4 h-4 text-slate-500" />
                    <span>Book a Truck</span>
                  </div>

                  <div
                    onClick={() => {
                      setActiveTab('bookings');
                      setDrawerOpen(false);
                    }}
                    className="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span>My Bookings</span>
                  </div>

                  <div
                    onClick={() => {
                      setActiveTab('track');
                      setDrawerOpen(false);
                    }}
                    className="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <Box className="w-4 h-4 text-slate-500" />
                    <span>My Shipments</span>
                  </div>

                  <div
                    onClick={() => {
                      setActiveTab('track');
                      setDrawerOpen(false);
                    }}
                    className="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <span>Live Tracking</span>
                  </div>

                  <div
                    onClick={() => {
                      setActiveTab('invoices');
                      setDrawerOpen(false);
                    }}
                    className="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-slate-500" />
                    <span>Invoices</span>
                  </div>

                  <div
                    onClick={() => {
                      setActiveTab('invoices');
                      setDrawerOpen(false);
                    }}
                    className="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <CreditCard className="w-4 h-4 text-slate-500" />
                    <span>Payments</span>
                  </div>

                  <div
                    onClick={() => {
                      setActiveTab('support');
                      setDrawerOpen(false);
                    }}
                    className="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <Headphones className="w-4 h-4 text-slate-500" />
                    <span>Support</span>
                  </div>
                </div>
              </div>

              {/* Account Section */}
              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                  Account
                </div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer">
                    <User className="w-4 h-4 text-slate-500" />
                    <span>Profile</span>
                  </div>

                  <div
                    onClick={() => {
                      setShowNotificationsModal(true);
                      setDrawerOpen(false);
                    }}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <Bell className="w-4 h-4 text-slate-500" />
                      <span>Notifications</span>
                    </div>
                    <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                      2
                    </span>
                  </div>

                  <div className="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer">
                    <Settings className="w-4 h-4 text-slate-500" />
                    <span>Settings</span>
                  </div>

                  <Link
                    href="/login"
                    className="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 cursor-pointer"
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
              <div className="text-[9px] text-slate-400 mt-1 font-mono">v1.0.0</div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. MODAL: BOOK A TRUCK / REQUEST FREIGHT                  */}
      {/* ========================================================= */}
      {showBookTruckModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="font-extrabold text-sm text-[#0B1B36]">Book Commercial Truck</h3>
              <button onClick={() => setShowBookTruckModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setShowBookTruckModal(false);
                alert(`Booking submitted for ${pickupCity} to ${deliveryCity}!`);
              }}
              className="space-y-3 text-xs"
            >
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Pickup City</label>
                <input
                  type="text"
                  required
                  value={pickupCity}
                  onChange={(e) => setPickupCity(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Delivery Destination</label>
                <input
                  type="text"
                  required
                  value={deliveryCity}
                  onChange={(e) => setDeliveryCity(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Cargo Description</label>
                <input
                  type="text"
                  required
                  value={cargoDesc}
                  onChange={(e) => setCargoDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Cargo Weight (kg)</label>
                <input
                  type="number"
                  required
                  value={cargoWeight}
                  onChange={(e) => setCargoWeight(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowBookTruckModal(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded-lg text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-[#0B1B36] text-white font-bold rounded-lg shadow"
                >
                  Confirm Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. MODAL: GET QUOTE                                       */}
      {/* ========================================================= */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="font-extrabold text-sm text-[#0B1B36]">Instant Freight Quotation</h3>
              <button onClick={() => setShowQuoteModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-900">Route: Chennai → Bengaluru (345 km)</div>
                <div className="text-slate-500 text-[11px] mt-0.5">Vehicle: 32ft MXL Container (18,000 kg)</div>
              </div>
              <div className="divide-y divide-slate-100 text-slate-700">
                <div className="py-1.5 flex justify-between">
                  <span>Base Freight</span>
                  <span className="font-bold">₹28,500</span>
                </div>
                <div className="py-1.5 flex justify-between">
                  <span>Loading & Handling</span>
                  <span className="font-bold">₹2,000</span>
                </div>
                <div className="py-1.5 flex justify-between">
                  <span>NH Fastag Toll</span>
                  <span className="font-bold">₹1,800</span>
                </div>
                <div className="py-1.5 flex justify-between">
                  <span>GST (12%)</span>
                  <span className="font-bold">₹3,876</span>
                </div>
                <div className="py-2 flex justify-between text-sm font-black text-[#0B1B36]">
                  <span>Total Amount</span>
                  <span className="text-[#F97316]">₹36,176</span>
                </div>
              </div>
              <div className="pt-2 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowQuoteModal(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded-lg text-slate-600"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowQuoteModal(false);
                    alert('Quote accepted! Vehicle dispatch initiated.');
                  }}
                  className="px-4 py-1.5 bg-[#F97316] text-white font-bold rounded-lg shadow"
                >
                  Accept Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. MODAL: NOTIFICATIONS (SCREEN 4 NOTIFICATION CARD)      */}
      {/* ========================================================= */}
      {showNotificationsModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <h3 className="font-extrabold text-sm text-[#0B1B36]">Notifications</h3>
              <button onClick={() => setShowNotificationsModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-2">
              {/* Notification Item matching Screen 4 */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#0B1B36] text-white flex items-center justify-center flex-shrink-0">
                    <Bell className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-900 leading-tight">
                      Your shipment has been dispatched successfully.
                    </div>
                    <div className="text-[9px] text-slate-400 mt-0.5">2m ago</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-900 leading-tight">
                      Delivery completed for RNH-SHP-00067.
                    </div>
                    <div className="text-[9px] text-slate-400 mt-0.5">08 Nov, 04:30 PM</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
