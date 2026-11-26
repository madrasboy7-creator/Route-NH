'use client';

import React, { useState, useEffect } from 'react';
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
  RefreshCw,
  Send,
  Navigation,
  Download,
  Eye,
  AlertCircle,
  Fuel,
} from 'lucide-react';
import RouteNHLogo from '@/components/RouteNHLogo';

export default function CustomerMobileDashboard() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'bookings' | 'track' | 'invoices' | 'support'>('home');
  const [showQuoteModal, setShowQuoteModal] = useState(false);
  const [showBookTruckModal, setShowBookTruckModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [showPodModal, setShowPodModal] = useState<any | null>(null);

  // New Booking state
  const [pickupCity, setPickupCity] = useState('Chennai');
  const [deliveryCity, setDeliveryCity] = useState('Bengaluru');
  const [cargoDesc, setCargoDesc] = useState('Automotive Precision Parts');
  const [cargoWeight, setCargoWeight] = useState('14500');
  const [vehicleCat, setVehicleCat] = useState('32ft MXL Container');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingSuccessMsg, setBookingSuccessMsg] = useState('');

  // Live Tracking state
  const [selectedTruck, setSelectedTruck] = useState<'Truck 01' | 'Truck 02'>('Truck 01');
  const [telemetry, setTelemetry] = useState<any>(null);
  const [telemetryLoading, setTelemetryLoading] = useState(false);
  const [tickSuccess, setTickSuccess] = useState(false);

  // Bookings & Invoices state
  const [bookingsList, setBookingsList] = useState<any[]>([]);
  const [invoicesList, setInvoicesList] = useState<any[]>([]);
  const [bookingFilter, setBookingFilter] = useState<'ALL' | 'ACTIVE' | 'COMPLETED'>('ALL');

  // Support ticket state
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('TRACKING');
  const [ticketDesc, setTicketDesc] = useState('');
  const [supportTickets, setSupportTickets] = useState<any[]>([
    {
      id: 1,
      subject: 'ETA verification for Pune to Gurugram shipment',
      category: 'TRACKING',
      status: 'RESOLVED',
      date: '2026-11-21',
      reply: 'Vehicle TN-01-AB-1234 cleared Udaipur toll plaza ahead of schedule. On track for on-time delivery.',
    },
  ]);

  // Load bookings and invoices
  const loadCustomerData = async () => {
    try {
      const [bRes, invRes] = await Promise.all([
        fetch('/api/v1/customer/bookings'),
        fetch('/api/v1/customer/invoices'),
      ]);
      if (bRes.ok) {
        const b = await bRes.json();
        if (b.success && b.data?.length > 0) setBookingsList(b.data);
      }
      if (invRes.ok) {
        const inv = await invRes.json();
        if (inv.success && inv.data?.length > 0) setInvoicesList(inv.data);
      }
    } catch (err) {
      console.warn('Fallback to local mock state if offline');
    }
  };

  // Fetch telemetry
  const fetchTelemetry = async (truck: 'Truck 01' | 'Truck 02') => {
    setTelemetryLoading(true);
    try {
      const res = await fetch(`/api/v1/gps/telemetry?truck=${encodeURIComponent(truck)}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const match = json.data.find((v: any) => v.truckIdentifier === truck);
          if (match && match.latestLocation) {
            setTelemetry(match.latestLocation);
          }
        }
      }
    } catch (err) {
      console.error('Failed to fetch telemetry', err);
    } finally {
      setTelemetryLoading(false);
    }
  };

  // Trigger simulated highway telemetry step
  const handleTriggerSimulatedStep = async () => {
    setTelemetryLoading(true);
    try {
      const res = await fetch(`/api/v1/gps/telemetry?tick=true&truck=${encodeURIComponent(selectedTruck)}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setTelemetry(json.data);
          setTickSuccess(true);
          setTimeout(() => setTickSuccess(false), 3000);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setTelemetryLoading(false);
    }
  };

  useEffect(() => {
    loadCustomerData();
    fetchTelemetry(selectedTruck);
  }, [selectedTruck]);

  // Handle new booking submission
  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingLoading(true);
    try {
      const res = await fetch('/api/v1/customer/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestedPickupDate: new Date().toISOString(),
          preferredDeliveryDate: new Date(Date.now() + 86400000 * 3).toISOString(),
          goodsDescription: cargoDesc,
          goodsCategory: 'AUTOMOTIVE',
          totalWeightKg: parseFloat(cargoWeight) || 12000,
          packageCount: 18,
          cargoValue: 1850000,
          requiredVehicleCategory: vehicleCat,
          stops: [
            {
              stopType: 'PICKUP',
              city: pickupCity,
              state: 'Tamil Nadu',
              addressLine1: `${pickupCity} Industrial Logistics Zone`,
              contactName: 'Consignor Desk',
              contactPhone: '+919876543210',
            },
            {
              stopType: 'DELIVERY',
              city: deliveryCity,
              state: 'Karnataka',
              addressLine1: `${deliveryCity} Central Receiving Hub`,
              contactName: 'Consignee Manager',
              contactPhone: '+919840112233',
            },
          ],
        }),
      });

      const json = await res.json();
      if (json.success) {
        setBookingSuccessMsg(`Booking ${json.data.bookingReference} confirmed! Operations will prepare quotation.`);
        loadCustomerData();
        setTimeout(() => {
          setShowBookTruckModal(false);
          setBookingSuccessMsg('');
        }, 2000);
      } else {
        alert(json.error || 'Failed to submit booking');
      }
    } catch (err: any) {
      alert(err.message);
    } finally {
      setBookingLoading(false);
    }
  };

  // Filter bookings
  const filteredBookings = bookingsList.filter((b) => {
    if (bookingFilter === 'ACTIVE') return b.bookingStatus === 'CONFIRMED' || b.bookingStatus === 'IN_TRANSIT' || b.bookingStatus === 'REQUESTED';
    if (bookingFilter === 'COMPLETED') return b.bookingStatus === 'COMPLETED' || b.bookingStatus === 'DELIVERED';
    return true;
  });

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
      {/* 2. MAIN CONTENT AREA (DYNAMIC BY TAB)                      */}
      {/* ========================================================= */}
      <main className="max-w-md mx-auto px-4 py-4 space-y-4">
        {/* TAB 1: HOME */}
        {activeTab === 'home' && (
          <div className="space-y-4">
            {/* Greeting Banner */}
            <div className="relative rounded-2xl overflow-hidden p-5 text-white shadow-md bg-gradient-to-r from-[#0B1B36] via-[#102A54] to-[#1E3A8A]">
              <div
                className="absolute inset-0 bg-cover bg-right opacity-35"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80')`,
                }}
              ></div>
              <div className="relative z-10">
                <span className="inline-block px-2 py-0.5 rounded-md bg-blue-500/30 text-[10px] font-bold tracking-wider uppercase mb-1.5 border border-blue-400/30">
                  Route NH Shipper Portal
                </span>
                <h2 className="text-xl font-extrabold tracking-tight leading-tight">
                  Good Morning,<br />
                  Priya Sharma!
                </h2>
                <p className="text-[11px] text-slate-200 mt-1 font-medium">Owned Fleet Logistics. Guaranteed High-Security Transit.</p>
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
                <span className="text-[11px] font-extrabold text-slate-800 leading-tight">Track Live</span>
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

            {/* Active Shipment Section */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-[#0B1B36] tracking-tight">Active Consignment</span>
                <button
                  onClick={() => setActiveTab('track')}
                  className="text-[11px] font-bold text-blue-600 hover:underline flex items-center"
                >
                  <span>Live Telemetry</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </button>
              </div>

              <div
                onClick={() => setActiveTab('track')}
                className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 bg-blue-50 text-blue-800 text-[10px] font-black rounded-md border border-blue-200">
                      Truck 01 (TN-01-AB-1234)
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>IN TRANSIT</span>
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-slate-400">RNH-BK-2026-0001</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-black">Origin</div>
                    <div className="font-extrabold text-slate-900">Pune Plant</div>
                  </div>
                  <div className="flex-1 mx-3 flex flex-col items-center">
                    <span className="text-[9px] font-mono text-blue-600 font-bold mb-1">NH 48 Corridor</span>
                    <div className="w-full h-1 bg-slate-100 rounded-full relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-2/3 bg-blue-600 rounded-full"></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 uppercase font-black">Destination</div>
                    <div className="font-extrabold text-slate-900">Gurugram Hub</div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <div className="text-slate-500">
                    Driver: <span className="font-bold text-slate-800">Ramesh Kumar Yadav</span>
                  </div>
                  <div className="font-bold text-emerald-600 flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>ETA: On Time</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Need a Quote Banner */}
            <div className="relative rounded-2xl overflow-hidden p-4 text-white shadow-sm bg-slate-900">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-45"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80')`,
                }}
              ></div>
              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-black">Need Freight Quotation?</h4>
                  <p className="text-[10px] text-slate-200 mt-0.5 max-w-[190px] leading-snug">
                    Transparent corridor rates with Route NH owned fleet assurance.
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

              <div className="space-y-2">
                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900">Shipment Delivered & POD Uploaded</div>
                    <div className="text-[11px] text-slate-500 font-medium">Consignment RNH-BK-2026-0001</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Signed POD ready in Documents tab</div>
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center space-x-3">
                  <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Fuel className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900">Truck 01 Toll Cleared</div>
                    <div className="text-[11px] text-slate-500 font-medium">Vellore Golden Fort Toll Plaza (NH 48)</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">Speed: 58 km/h • High Accuracy GPS</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MY BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-[#0B1B36]">Commercial Bookings</h3>
                <p className="text-[11px] text-slate-500">Track and manage your freight consignments</p>
              </div>
              <button
                onClick={() => setShowBookTruckModal(true)}
                className="px-3 py-1.5 bg-[#0B1B36] hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center space-x-1 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Booking</span>
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-1.5 p-1 bg-slate-200/60 rounded-xl text-[11px] font-bold">
              {(['ALL', 'ACTIVE', 'COMPLETED'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setBookingFilter(f)}
                  className={`flex-1 py-1.5 rounded-lg transition-all ${
                    bookingFilter === f ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {f === 'ALL' ? 'All Freight' : f === 'ACTIVE' ? 'Active' : 'Delivered'}
                </button>
              ))}
            </div>

            {/* Bookings List */}
            <div className="space-y-2.5">
              {filteredBookings.length === 0 ? (
                <div className="bg-white p-6 rounded-2xl text-center border border-slate-200">
                  <Box className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                  <div className="text-xs font-bold text-slate-600">No bookings found in this category</div>
                </div>
              ) : (
                filteredBookings.map((b) => {
                  const pickup = b.stops?.find((s: any) => s.stopType === 'PICKUP');
                  const delivery = b.stops?.find((s: any) => s.stopType === 'DELIVERY');
                  return (
                    <div
                      key={b.id}
                      className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2.5 hover:shadow-sm transition-shadow"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-xs font-black text-slate-900">{b.bookingReference}</span>
                        <span
                          className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                            b.bookingStatus === 'CONFIRMED' || b.bookingStatus === 'IN_TRANSIT'
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                              : b.bookingStatus === 'COMPLETED'
                              ? 'bg-blue-50 text-blue-700 border-blue-200'
                              : 'bg-amber-50 text-amber-700 border-amber-200'
                          }`}
                        >
                          {b.bookingStatus.replace('_', ' ')}
                        </span>
                      </div>

                      <div className="text-xs font-bold text-slate-800 flex items-center">
                        <span>{pickup?.city || 'Pune'}</span>
                        <ArrowRight className="w-3.5 h-3.5 mx-2 text-slate-400" />
                        <span>{delivery?.city || 'Gurugram'}</span>
                      </div>

                      <div className="text-[11px] text-slate-500 flex items-center justify-between">
                        <span>{b.goodsDescription}</span>
                        <span className="font-bold text-slate-700">{b.totalWeightKg.toLocaleString()} kg</span>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="text-[10px] text-slate-400">
                          Vehicle: <span className="font-bold text-slate-700">{b.requiredVehicleCategory}</span>
                        </span>
                        <button
                          onClick={() => setActiveTab('track')}
                          className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-[11px] font-bold hover:bg-blue-100 flex items-center space-x-1"
                        >
                          <Compass className="w-3 h-3" />
                          <span>Track Vehicle</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {/* TAB 3: LIVE GPS TRACKING */}
        {activeTab === 'track' && (
          <div className="space-y-4">
            {/* Header with Truck Selector */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Live Fleet Telemetry</span>
                <span className="text-sm font-black text-[#0B1B36]">Physical GPS Highway Tracker</span>
              </div>
              <div className="flex space-x-1 bg-slate-100 p-1 rounded-xl text-xs font-bold">
                <button
                  onClick={() => setSelectedTruck('Truck 01')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    selectedTruck === 'Truck 01' ? 'bg-[#0B1B36] text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Truck 01
                </button>
                <button
                  onClick={() => setSelectedTruck('Truck 02')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    selectedTruck === 'Truck 02' ? 'bg-[#0B1B36] text-white shadow-xs' : 'text-slate-600'
                  }`}
                >
                  Truck 02
                </button>
              </div>
            </div>

            {/* Truck Details & Telemetry Specs Card */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-black text-sm text-slate-900">{selectedTruck}</span>
                    <span className="font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {selectedTruck === 'Truck 01' ? 'TN-01-AB-1234' : 'TN-02-CD-5678'}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {selectedTruck === 'Truck 01' ? '32ft MXL Container (24 Ton)' : '20ft Multi-Axle Open (15 Ton)'}
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse"></span>
                    ONLINE
                  </span>
                  <div className="text-[9px] text-slate-400 mt-0.5">Battery: 98%</div>
                </div>
              </div>

              {/* Highway Corridor Map Visualizer */}
              <div className="relative h-48 w-full rounded-xl overflow-hidden bg-[#0A192F] border border-slate-700 p-3 flex flex-col justify-between text-white">
                {/* Simulated Road Graphic SVG */}
                <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 400 200" preserveAspectRatio="none">
                  <path
                    d="M 20 180 Q 150 40, 380 30"
                    fill="none"
                    stroke="#1E3A8A"
                    strokeWidth="24"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 20 180 Q 150 40, 380 30"
                    fill="none"
                    stroke="#0866D8"
                    strokeWidth="18"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 20 180 Q 150 40, 380 30"
                    fill="none"
                    stroke="#FFFFFF"
                    strokeWidth="2"
                    strokeDasharray="8 8"
                    strokeLinecap="round"
                  />
                  {/* Moving truck marker */}
                  <circle cx="210" cy="85" r="9" fill="#F97316" stroke="#FFFFFF" strokeWidth="2" />
                  <circle cx="210" cy="85" r="15" fill="#F97316" opacity="0.3" className="animate-ping" />
                </svg>

                <div className="relative z-10 flex items-center justify-between text-[11px]">
                  <span className="font-mono bg-black/60 px-2 py-0.5 rounded font-bold text-blue-300">
                    {selectedTruck === 'Truck 01' ? 'Corridor: NH 48 (Chennai ↔ Mumbai)' : 'Corridor: NH 44 (Delhi ↔ Bengaluru)'}
                  </span>
                  <span className="bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded text-[10px] font-bold flex items-center">
                    <Navigation className="w-3 h-3 mr-1" />
                    {telemetry?.speed ? `${telemetry.speed} km/h` : '58 km/h'}
                  </span>
                </div>

                <div className="relative z-10 bg-slate-900/90 backdrop-blur-xs p-2.5 rounded-lg border border-slate-700 text-xs">
                  <div className="flex items-center justify-between text-[10px] text-slate-300 mb-1">
                    <span>Current Coordinates</span>
                    <span className="font-mono text-emerald-400">
                      {telemetry?.latitude ? `${telemetry.latitude}° N, ${telemetry.longitude}° E` : '18.6298° N, 73.7997° E'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-slate-300">
                    <span>AIS-140 GPS Device</span>
                    <span className="font-mono text-blue-300 font-bold">
                      {selectedTruck === 'Truck 01' ? 'Teltonika FMB920' : 'Concox GT06N'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Informational Pill about Simulation / Hardware */}
              <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>
                    Hardware Ready • <span className="font-bold">Test Mode Highway Simulator Active</span>
                  </span>
                </div>
              </div>

              {/* Simulate Next Step Button */}
              <button
                onClick={handleTriggerSimulatedStep}
                disabled={telemetryLoading}
                className="w-full py-2.5 bg-[#0B1B36] hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center space-x-2 shadow-sm transition-all"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${telemetryLoading ? 'animate-spin' : ''}`} />
                <span>Simulate Next Highway Telemetry Step</span>
              </button>
              {tickSuccess && (
                <div className="text-center text-[10px] font-bold text-emerald-600 animate-fadeIn">
                  ✓ Telemetry advanced along {selectedTruck === 'Truck 01' ? 'NH 48' : 'NH 44'} corridor!
                </div>
              )}
            </div>

            {/* Assigned Driver Profile Card */}
            <div className="bg-white p-3.5 rounded-2xl border border-slate-200 shadow-xs flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-full bg-slate-100 overflow-hidden border border-slate-200">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                    alt="Driver"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-black text-slate-900">
                    {selectedTruck === 'Truck 01' ? 'Ramesh Kumar Yadav' : 'Suresh Gurjar'}
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">Commercial Driver • HMV Certified</div>
                  <div className="text-[10px] text-emerald-600 font-bold mt-0.5">Rating: 4.9 ★ (180+ trips)</div>
                </div>
              </div>

              <a
                href="tel:+919810066006"
                className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center hover:bg-emerald-100 transition-colors"
                aria-label="Call Driver"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}

        {/* TAB 4: INVOICES & POD */}
        {activeTab === 'invoices' && (
          <div className="space-y-3">
            <div>
              <h3 className="text-base font-extrabold text-[#0B1B36]">GST Invoices & Proof of Delivery</h3>
              <p className="text-[11px] text-slate-500">Tax compliance with 18% GST (SAC Code: 9965)</p>
            </div>

            {/* Invoices List */}
            <div className="space-y-3">
              {invoicesList.length === 0 ? (
                /* Pre-seeded demo invoice representation */
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono text-xs font-black text-slate-900">RNH-INV-2026-0001</span>
                      <div className="text-[10px] text-slate-400 mt-0.5">Issued: 23 Nov 2026</div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      PAID
                    </span>
                  </div>

                  <div className="text-xs space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div className="flex justify-between text-slate-600">
                      <span>Freight & Handling (Pune → Gurugram)</span>
                      <span>₹72,000.00</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Tolls & Green Tax</span>
                      <span>₹4,500.00</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>GST @ 18%</span>
                      <span>₹13,770.00</span>
                    </div>
                    <div className="pt-1.5 border-t border-slate-200 flex justify-between font-black text-slate-900">
                      <span>Grand Total</span>
                      <span className="text-[#0B1B36]">₹90,270.00</span>
                    </div>
                  </div>

                  <div className="flex space-x-2 pt-1">
                    <button
                      onClick={() =>
                        setShowPodModal({
                          type: 'POD',
                          ref: 'RNH-BK-2026-0001',
                          file: 'LorryReceipt_Pune_Gurugram_001.pdf',
                          verifiedBy: 'Rajesh Nair (Operations Manager)',
                        })
                      }
                      className="flex-1 py-2 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-xl text-xs font-bold flex items-center justify-center space-x-1 border border-blue-200"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Signed POD</span>
                    </button>
                    <button
                      onClick={() => alert('Downloading official GST Tax Invoice PDF')}
                      className="flex-1 py-2 bg-[#0B1B36] text-white hover:bg-slate-800 rounded-xl text-xs font-bold flex items-center justify-center space-x-1"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Tax Invoice</span>
                    </button>
                  </div>
                </div>
              ) : (
                invoicesList.map((inv) => (
                  <div key={inv.id} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-black text-slate-900">{inv.invoiceNumber}</span>
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {inv.invoiceStatus}
                      </span>
                    </div>
                    <div className="text-xs flex justify-between font-bold">
                      <span>Grand Total</span>
                      <span>₹{inv.grandTotal.toLocaleString()}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 5: SUPPORT */}
        {activeTab === 'support' && (
          <div className="space-y-3">
            <div>
              <h3 className="text-base font-extrabold text-[#0B1B36]">Customer Support & Helpdesk</h3>
              <p className="text-[11px] text-slate-500">Direct contact with Route NH Operations</p>
            </div>

            {/* Helpline Card */}
            <div className="bg-[#0B1B36] text-white p-4 rounded-2xl shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-300">24/7 Fleet Operations Desk</span>
                <span className="text-[9px] bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded">Toll Free</span>
              </div>
              <div className="text-lg font-black tracking-tight">+91 11 4050 9000</div>
              <div className="text-[11px] text-slate-300">operations@routenh.com</div>
            </div>

            {/* Raise New Ticket Card */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <h4 className="text-xs font-black text-slate-900">Create Support Ticket</h4>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!ticketSubject) return;
                  setSupportTickets([
                    {
                      id: Date.now(),
                      subject: ticketSubject,
                      category: ticketCategory,
                      status: 'OPEN',
                      date: new Date().toISOString().split('T')[0],
                      reply: 'Ticket acknowledged by Operations Desk. An executive is reviewing your request.',
                    },
                    ...supportTickets,
                  ]);
                  setTicketSubject('');
                  setTicketDesc('');
                  alert('Support ticket submitted successfully!');
                }}
                className="space-y-2.5 text-xs"
              >
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={ticketSubject}
                    onChange={(e) => setTicketSubject(e.target.value)}
                    placeholder="e.g. ETA update request"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Issue Category</label>
                  <select
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="TRACKING">Transit & Tracking</option>
                    <option value="DELAY">Schedule Delay</option>
                    <option value="POD">POD Copy Request</option>
                    <option value="BILLING">Billing & GST</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={ticketDesc}
                    onChange={(e) => setTicketDesc(e.target.value)}
                    placeholder="Provide details..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-[#0B1B36] hover:bg-slate-800 text-white rounded-lg font-bold flex items-center justify-center space-x-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Ticket</span>
                </button>
              </form>
            </div>

            {/* Tickets History */}
            <div className="space-y-2">
              <span className="text-xs font-black text-slate-900 block">Your Past Inquiries</span>
              {supportTickets.map((t) => (
                <div key={t.id} className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{t.subject}</span>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {t.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="font-bold text-blue-700">Route NH Desk:</span> {t.reply}
                  </p>
                  <div className="text-[9px] text-slate-400">{t.date}</div>
                </div>
              ))}
            </div>
          </div>
        )}
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
      {/* 4. SLIDE-OUT NAVIGATION DRAWER                            */}
      {/* ========================================================= */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            onClick={() => setDrawerOpen(false)}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          ></div>

          <div className="relative w-[300px] max-w-[85%] bg-white h-full shadow-2xl flex flex-col justify-between p-4 z-50 overflow-y-auto">
            <div className="space-y-5">
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
                    <div className="text-[11px] text-slate-500 font-medium">Tata Motors Parts Logistics</div>
                  </div>
                </div>
                <button onClick={() => setDrawerOpen(false)} className="text-slate-400 hover:text-slate-600 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>

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
                    className={`flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer ${
                      activeTab === 'home' ? 'bg-[#E0F2FE] text-[#0284C7]' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Home className="w-4 h-4" />
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
                    className={`flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                      activeTab === 'bookings' ? 'bg-[#E0F2FE] text-[#0284C7]' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Calendar className="w-4 h-4 text-slate-500" />
                    <span>My Bookings</span>
                  </div>

                  <div
                    onClick={() => {
                      setActiveTab('track');
                      setDrawerOpen(false);
                    }}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                      activeTab === 'track' ? 'bg-[#E0F2FE] text-[#0284C7]' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <MapPin className="w-4 h-4 text-slate-500" />
                    <span>Live GPS Telemetry</span>
                  </div>

                  <div
                    onClick={() => {
                      setActiveTab('invoices');
                      setDrawerOpen(false);
                    }}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                      activeTab === 'invoices' ? 'bg-[#E0F2FE] text-[#0284C7]' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <FileText className="w-4 h-4 text-slate-500" />
                    <span>Invoices & POD</span>
                  </div>

                  <div
                    onClick={() => {
                      setActiveTab('support');
                      setDrawerOpen(false);
                    }}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold cursor-pointer ${
                      activeTab === 'support' ? 'bg-[#E0F2FE] text-[#0284C7]' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <Headphones className="w-4 h-4 text-slate-500" />
                    <span>Operations Support</span>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2">
                  System
                </div>
                <div className="space-y-1">
                  <Link
                    href="/platform"
                    className="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold text-blue-700 hover:bg-blue-50 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-blue-700" />
                    <span>Platform Operations</span>
                  </Link>
                  <Link
                    href="/driver"
                    className="flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-semibold text-emerald-700 hover:bg-emerald-50 cursor-pointer"
                  >
                    <Truck className="w-4 h-4 text-emerald-700" />
                    <span>Driver Mobile View</span>
                  </Link>
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

            <div className="pt-4 border-t border-slate-100 flex flex-col items-center">
              <RouteNHLogo size="sm" theme="dark" showTagline={true} />
              <div className="text-[9px] text-slate-400 mt-1 font-mono">v1.2.0 • Production Ready</div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. MODAL: BOOK A COMMERCIAL TRUCK                         */}
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
            {bookingSuccessMsg ? (
              <div className="p-4 bg-emerald-50 text-emerald-800 rounded-xl text-center text-xs font-bold border border-emerald-200">
                {bookingSuccessMsg}
              </div>
            ) : (
              <form onSubmit={handleSubmitBooking} className="space-y-3 text-xs">
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
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Required Vehicle Body</label>
                  <select
                    value={vehicleCat}
                    onChange={(e) => setVehicleCat(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="32ft MXL Container">Truck 01 — 32ft MXL Container (24 Ton)</option>
                    <option value="20ft Multi-Axle Open">Truck 02 — 20ft Multi-Axle Open (15 Ton)</option>
                  </select>
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
                    disabled={bookingLoading}
                    className="px-4 py-1.5 bg-[#0B1B36] text-white font-bold rounded-lg shadow hover:bg-slate-800 disabled:opacity-50"
                  >
                    {bookingLoading ? 'Submitting...' : 'Confirm Request'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. MODAL: GET INSTANT QUOTE                               */}
      {/* ========================================================= */}
      {showQuoteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="font-extrabold text-sm text-[#0B1B36]">Corridor Freight Estimate</h3>
              <button onClick={() => setShowQuoteModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div className="font-bold text-slate-900">Route: Chennai → Bengaluru (345 km)</div>
                <div className="text-slate-500 text-[11px] mt-0.5">Vehicle: Truck 01 (32ft MXL Container)</div>
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
                  <span>GST (18% - SAC 9965)</span>
                  <span className="font-bold">₹5,814</span>
                </div>
                <div className="py-2 flex justify-between text-sm font-black text-[#0B1B36]">
                  <span>Total Amount</span>
                  <span className="text-[#F97316]">₹38,114</span>
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
                    setShowBookTruckModal(true);
                  }}
                  className="px-4 py-1.5 bg-[#F97316] text-white font-bold rounded-lg shadow"
                >
                  Proceed to Book
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. MODAL: VIEW PROOF OF DELIVERY (POD)                    */}
      {/* ========================================================= */}
      {showPodModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-4 shadow-2xl space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-[#0B1B36]">Signed Proof of Delivery (POD)</h3>
              <button onClick={() => setShowPodModal(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="bg-slate-100 rounded-xl p-3 text-center border border-slate-200">
              <div className="w-full h-40 bg-white rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center justify-center p-4">
                <CheckCircle className="w-10 h-10 text-emerald-600 mb-1" />
                <span className="text-xs font-bold text-slate-800">Physical POD Verified & Stamped</span>
                <span className="text-[10px] text-slate-400 mt-0.5">{showPodModal.file}</span>
                <span className="text-[9px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full mt-2 font-bold border border-emerald-200">
                  {showPodModal.verifiedBy}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                alert('Opening official signed POD copy');
                setShowPodModal(null);
              }}
              className="w-full py-2 bg-[#0B1B36] text-white rounded-xl text-xs font-bold"
            >
              Download Stamped Receipt
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 8. MODAL: NOTIFICATIONS                                   */}
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
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#0B1B36] text-white flex items-center justify-center flex-shrink-0">
                    <Bell className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-slate-900 leading-tight">
                      Truck 01 telemetry active on NH 48 corridor.
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
                      Delivery completed for RNH-BK-2026-0001.
                    </div>
                    <div className="text-[9px] text-slate-400 mt-0.5">Signed POD uploaded</div>
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
