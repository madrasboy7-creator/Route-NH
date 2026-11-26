'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Truck,
  TrendingUp,
  Headphones,
  User,
  Plus,
  Filter,
  Search,
  ChevronRight,
  X,
  Check,
  CheckCircle,
  Clock,
  ArrowRight,
  Phone,
  ShieldCheck,
  Eye,
  Download,
  RefreshCw,
  AlertCircle,
  MapPin,
  Building2,
  Users as UsersIcon,
  CreditCard,
  Video,
  MessageSquare,
  Send,
  Calendar,
  ChevronDown,
  Navigation,
} from 'lucide-react';
import RouteNHLogo from '@/components/RouteNHLogo';

export default function RouteNHReplicatedApp() {
  // Main Navigation: 5 FR8 Tabs
  const [activeTab, setActiveTab] = useState<'book' | 'trip' | 'rates' | 'support' | 'account'>('book');

  // Sub-tabs
  const [tripSubTab, setTripSubTab] = useState<'ongoing' | 'pod_pending' | 'pod_received'>('ongoing');
  const [supportSubTab, setSupportSubTab] = useState<'tickets' | 'chat'>('tickets');

  // Modals & Sheets
  const [showBookFilter, setShowBookFilter] = useState(false);
  const [filterActiveTab, setFilterActiveTab] = useState<'users' | 'truck_type'>('truck_type');
  const [selectedTruckTypes, setSelectedTruckTypes] = useState<string[]>(['32 Feet Multi Axle']);

  const [showBookModal, setShowBookModal] = useState(false);
  const [showCityPicker, setShowCityPicker] = useState<'from' | 'to' | null>(null);
  const [showMaterialPicker, setShowMaterialPicker] = useState(false);
  const [showTimelineSheet, setShowTimelineSheet] = useState(false);
  const [showPaymentSheet, setShowPaymentSheet] = useState(false);
  const [showDocumentsSheet, setShowDocumentsSheet] = useState(false);
  const [showTrackingScreen, setShowTrackingScreen] = useState(false);
  const [showTripHelpSheet, setShowTripHelpSheet] = useState(false);
  const [showOrgSheet, setShowOrgSheet] = useState(false);
  const [showUsersSheet, setShowUsersSheet] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showBalanceSheet, setShowBalanceSheet] = useState(false);
  const [showPodTrackingSheet, setShowPodTrackingSheet] = useState(false);
  const [showAccountHelpSheet, setShowAccountHelpSheet] = useState(false);

  // Form states
  const [fromCity, setFromCity] = useState('Mappedu - Chennai');
  const [toCity, setToCity] = useState('Vijayawada - Andhra Pradesh');
  const [materialType, setMaterialType] = useState('Automotive Precision Parts');
  const [tonnage, setTonnage] = useState('14.5');
  const [selectedBodyType, setSelectedBodyType] = useState('32 Feet Multi Axle');
  const [notes, setNotes] = useState('');
  const [citySearchTerm, setCitySearchTerm] = useState('');
  const [materialSearchTerm, setMaterialSearchTerm] = useState('');

  // Telemetry & simulator state
  const [telemetry, setTelemetry] = useState<any>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Rates tab states
  const [rateFrom, setRateFrom] = useState('Chennai');
  const [rateTo, setRateTo] = useState('Bengaluru');
  const [rateTonnage, setRateTonnage] = useState('18');

  // Support ticket form
  const [newTicketSubject, setNewTicketSubject] = useState('');
  const [newTicketCategory, setNewTicketCategory] = useState('Tracking & Delay');
  const [ticketList, setTicketList] = useState<any[]>([
    {
      id: 'TKT-88912',
      subject: 'ETA verification for Pune to Gurugram consignment',
      category: 'Tracking',
      status: 'OPEN',
      date: '26 Nov 2026, 02:30 PM',
      reply: 'Vehicle TN-01-AB-1234 cleared Udaipur toll plaza ahead of schedule. On track for on-time delivery.',
    },
    {
      id: 'TKT-88741',
      subject: 'E-POD stamped copy download verification',
      category: 'POD Request',
      status: 'RESOLVED',
      date: '24 Nov 2026, 11:15 AM',
      reply: 'Consignee stamped copy uploaded and verified by Operations desk. Available in Documents tab.',
    },
  ]);

  // Fetch telemetry
  const fetchTelemetry = async () => {
    try {
      const res = await fetch('/api/v1/gps/telemetry?truck=Truck%2001');
      if (res.ok) {
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data[0]?.latestLocation) {
          setTelemetry(json.data[0].latestLocation);
        }
      }
    } catch {
      // offline fallback
    }
  };

  useEffect(() => {
    fetchTelemetry();
  }, []);

  const handleSimulateStep = async () => {
    setIsSimulating(true);
    try {
      const res = await fetch('/api/v1/gps/telemetry?tick=true&truck=Truck%2001');
      if (res.ok) {
        const json = await res.json();
        if (json.success) {
          setTelemetry(json.data);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsSimulating(false);
    }
  };

  // 21 Truck Types categorized
  const truckCategories = {
    Open: [
      '17 Feet Open',
      '20 Feet Open',
      '22 Feet Open',
      '24 Feet Open',
      '10 Whl Open',
      '12 Whl Open',
      '14 Whl Open',
      '16 Whl Open',
      '18 Whl Open',
    ],
    Closed: [
      '32 Feet Single Axle',
      '32 Feet Single Axle High Cube',
      '32 Feet Multi Axle',
      '32 Feet Multi Axle High Cube',
      '32 Feet Triple Axle',
      '20 Feet Closed',
      '22 Feet Closed',
      '24 Feet Closed',
    ],
    Trailer: ['20 Feet Flat Bed', '40 Feet Flat Bed', '40 Feet Semi Bed', '40 Feet Low Bed'],
  };

  const citiesList = [
    'Chennai, Tamil Nadu',
    'Bengaluru, Karnataka',
    'Pune, Maharashtra',
    'Mumbai, Maharashtra',
    'Gurugram, Haryana',
    'Delhi NCR, Delhi',
    'Vijayawada, Andhra Pradesh',
    'Hyderabad, Telangana',
    'Kolkata, West Bengal',
    'Coimbatore, Tamil Nadu',
    'Ahmedabad, Gujarat',
  ];

  const commodities = [
    'Agriculture',
    'Auto Parts',
    'Automotive Precision Parts',
    'Bags',
    'Beverages',
    'Carton Box / FMCG',
    'Electronic Goods',
    'Engineering materials',
    'FMCG',
    'Hardware (Door / Windows)',
    'Industrial Goods',
    'Packaging Materials',
    'Plywood',
    'Textiles',
    'Others',
  ];

  return (
    <div className="min-h-screen bg-[#F2F4FD] font-sans antialiased text-slate-800 pb-20 relative selection:bg-blue-100">
      {/* ========================================================= */}
      {/* 1. STICKY TOP APP BAR (56.9dp height, #FFFFFF, 1px border)*/}
      {/* ========================================================= */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E5E7EF] h-14 px-4 flex items-center justify-between shadow-xs">
        {/* Left: Screen Title */}
        <div className="flex items-center space-x-2">
          <span className="text-base font-extrabold text-[#0B1B36] tracking-tight">
            {activeTab === 'book' && 'My bookings'}
            {activeTab === 'trip' && 'Trip'}
            {activeTab === 'rates' && 'Instant Rates'}
            {activeTab === 'support' && 'Support'}
            {activeTab === 'account' && 'Account'}
          </span>
        </div>

        {/* Right context actions */}
        <div className="flex items-center space-x-2">
          {activeTab === 'book' && (
            <>
              <button
                onClick={() => setShowBookModal(true)}
                className="px-3 py-1 rounded-full border border-[#0067FA] text-[#0067FA] hover:bg-blue-50 text-xs font-bold flex items-center space-x-1 transition-colors shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Book</span>
              </button>

              <button
                onClick={() => setShowBookFilter(true)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
                aria-label="Filter Bookings"
              >
                <Filter className="w-4 h-4 text-slate-700" />
              </button>
            </>
          )}

          {activeTab === 'trip' && (
            <>
              <button
                onClick={() => alert('Search trips by LR, Vehicle or City')}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <Search className="w-4 h-4 text-slate-700" />
              </button>
              <button
                onClick={() => setShowBookFilter(true)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <Filter className="w-4 h-4 text-slate-700" />
              </button>
            </>
          )}

          {activeTab === 'rates' && (
            <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-bold">
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-[#0067FA] font-bold">
                Owned Fleet
              </span>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="w-7 h-7 rounded-full bg-[#0067FA] text-white flex items-center justify-center font-bold text-xs">
              PS
            </div>
          )}
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. TAB BODY (5 TABS ON #F2F4FD CANVAS)                     */}
      {/* ========================================================= */}
      <main className="max-w-md mx-auto px-3.5 py-3 space-y-3">
        {/* ======================================================= */}
        {/* TAB 1: BOOK (SCR-01 MY BOOKINGS)                        */}
        {/* ======================================================= */}
        {activeTab === 'book' && (
          <div className="space-y-3">
            {/* Card 1: Allocated Booking Card matching SCR-01 */}
            <div
              onClick={() => setShowTimelineSheet(true)}
              className="bg-white rounded-xl p-3.5 border border-[#E2E8F0] shadow-xs space-y-2.5 hover:shadow-sm transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-slate-900">
                  #15309639 <span className="text-slate-300 mx-1">|</span> TN-01-AB-1234 (SXL)
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#0067FA] border border-blue-100">
                  Allocated
                </span>
              </div>

              <div className="text-[11px] text-slate-500 font-medium">
                Automotive Precision Parts <span className="text-slate-300 mx-1">•</span> 14.5 Ton{' '}
                <span className="text-slate-300 mx-1">•</span> 482 KM
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                    <span className="font-bold text-slate-900">Mappedu - Chennai</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 flex-shrink-0"></span>
                    <span className="font-bold text-slate-900">Vijayawada Hub</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-extrabold text-[#0B1B36]">₹39,800</div>
                  <div className="text-[9px] text-slate-400">Total Freight</div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert('Booking #15309639 confirmed! Vehicle dispatch initiated.');
                  }}
                  className="w-full py-2 bg-white border border-[#002F70] text-[#002F70] hover:bg-slate-50 font-bold rounded-lg text-xs flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Confirm booking</span>
                </button>
              </div>
            </div>

            {/* Card 2: In-Transit Trip Card */}
            <div
              onClick={() => setShowTimelineSheet(true)}
              className="bg-white rounded-xl p-3.5 border border-[#E2E8F0] shadow-xs space-y-2.5 hover:shadow-sm transition-shadow cursor-pointer"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-slate-900">
                  #15309640 <span className="text-slate-300 mx-1">|</span> TN-02-CD-5678 (20ft Open)
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 flex items-center space-x-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Intransit</span>
                </span>
              </div>

              <div className="text-[11px] text-slate-500 font-medium">
                Industrial Raw Materials <span className="text-slate-300 mx-1">•</span> 12.0 Ton{' '}
                <span className="text-slate-300 mx-1">•</span> 345 KM
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0"></span>
                    <span className="font-bold text-slate-900">Chennai Port Terminal</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 flex-shrink-0"></span>
                    <span className="font-bold text-slate-900">Bengaluru Nelamangala</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-extrabold text-[#0B1B36]">₹28,500</div>
                  <div className="text-[9px] text-slate-400">Total Freight</div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowTrackingScreen(true);
                  }}
                  className="w-full py-2 bg-blue-50 text-[#0067FA] hover:bg-blue-100 font-bold rounded-lg text-xs flex items-center justify-center space-x-1.5 transition-colors border border-blue-200"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Track Live GPS & Tolls</span>
                </button>
              </div>
            </div>

            {/* Card 3: Expired Card matching SCR-03 */}
            <div className="bg-white rounded-xl p-3.5 border border-[#E2E8F0] shadow-xs space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-mono font-bold text-slate-900">
                  #15272934 <span className="text-slate-300 mx-1">|</span> 20 FEET CLOSED
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-600 border border-red-100 flex items-center space-x-1">
                  <Clock className="w-3 h-3 mr-0.5" />
                  <span>Expired</span>
                </span>
              </div>

              <div className="text-[11px] text-slate-500 font-medium">
                FMCG Goods <span className="text-slate-300 mx-1">•</span> 7 Ton{' '}
                <span className="text-slate-300 mx-1">•</span> 515 KM
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400 flex-shrink-0"></span>
                    <span className="font-medium text-slate-700">Chennai</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400 flex-shrink-0"></span>
                    <span className="font-medium text-slate-700">Coimbatore</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowBookModal(true)}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold flex items-center space-x-1"
                >
                  <RefreshCw className="w-3 h-3 mr-1" />
                  <span>Re-book</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* TAB 2: TRIP (SCR-10 TRIP LIST)                          */}
        {/* ======================================================= */}
        {activeTab === 'trip' && (
          <div className="space-y-3">
            {/* 3 Sub-tabs matching SCR-10 */}
            <div className="flex space-x-1 bg-white p-1 rounded-xl border border-slate-200 text-xs font-bold shadow-xs">
              <button
                onClick={() => setTripSubTab('ongoing')}
                className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
                  tripSubTab === 'ongoing' ? 'bg-[#0067FA] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Ongoing (1)
              </button>
              <button
                onClick={() => setTripSubTab('pod_pending')}
                className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
                  tripSubTab === 'pod_pending'
                    ? 'bg-[#0067FA] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                POD Pending (1)
              </button>
              <button
                onClick={() => setTripSubTab('pod_received')}
                className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
                  tripSubTab === 'pod_received'
                    ? 'bg-[#0067FA] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                POD Received (1)
              </button>
            </div>

            {/* Trip Cards */}
            <div className="space-y-3">
              <div className="bg-white rounded-xl p-3.5 border border-[#E2E8F0] shadow-xs space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono font-bold text-slate-900">
                    #RNH-TR-2026-0001 <span className="text-slate-300 mx-1">|</span> TN-01-AB-1234
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    {tripSubTab === 'ongoing'
                      ? 'Intransit'
                      : tripSubTab === 'pod_pending'
                      ? 'Delivered'
                      : 'POD Verified'}
                  </span>
                </div>

                <div className="text-xs font-bold text-slate-900 flex items-center justify-between">
                  <span>Pune Pimpri Plant Gate 4 → Gurugram Warehouse 9</span>
                  <button
                    onClick={() => setShowTimelineSheet(true)}
                    className="text-[#0067FA] hover:underline text-[11px] font-bold"
                  >
                    Show more
                  </button>
                </div>

                {/* 4 Action Buttons matching SCR-11 */}
                <div className="grid grid-cols-4 gap-2 pt-1 border-t border-slate-100">
                  <button
                    onClick={() => setShowPaymentSheet(true)}
                    className="py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-[11px] font-bold text-slate-700 flex flex-col items-center border border-slate-200"
                  >
                    <CreditCard className="w-3.5 h-3.5 mb-1 text-slate-600" />
                    <span>Payments</span>
                  </button>

                  <button
                    onClick={() => setShowDocumentsSheet(true)}
                    className="py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-[11px] font-bold text-slate-700 flex flex-col items-center border border-slate-200"
                  >
                    <FileText className="w-3.5 h-3.5 mb-1 text-slate-600" />
                    <span>Documents</span>
                  </button>

                  <button
                    onClick={() => setShowTrackingScreen(true)}
                    className="py-1.5 bg-blue-50 hover:bg-blue-100 rounded-lg text-[11px] font-bold text-[#0067FA] flex flex-col items-center border border-blue-200"
                  >
                    <Navigation className="w-3.5 h-3.5 mb-1 text-[#0067FA]" />
                    <span>Tracking</span>
                  </button>

                  <button
                    onClick={() => setShowTripHelpSheet(true)}
                    className="py-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg text-[11px] font-bold text-slate-700 flex flex-col items-center border border-slate-200"
                  >
                    <Headphones className="w-3.5 h-3.5 mb-1 text-slate-600" />
                    <span>Help</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* TAB 3: RATES (SCR-20 INSTANT MARKET RATES)              */}
        {/* ======================================================= */}
        {activeTab === 'rates' && (
          <div className="space-y-3">
            <div className="bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-xs space-y-3">
              <h3 className="font-extrabold text-sm text-[#0B1B36]">Corridor Rate Calculator</h3>
              <p className="text-[11px] text-slate-500">Transparent freight rates for Route NH owned vehicle fleet</p>

              <div className="space-y-2 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Source City (From)</label>
                  <input
                    type="text"
                    value={rateFrom}
                    onChange={(e) => setRateFrom(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Destination City (To)</label>
                  <input
                    type="text"
                    value={rateTo}
                    onChange={(e) => setRateTo(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Tonnage (MT)</label>
                  <input
                    type="number"
                    value={rateTonnage}
                    onChange={(e) => setRateTonnage(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              {/* Rate Breakdown Card */}
              <div className="bg-[#F2F4FD] p-3 rounded-xl border border-blue-100 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Base Freight (345 km)</span>
                  <span className="font-bold text-slate-900">₹28,500</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Loading & Handling</span>
                  <span className="font-bold text-slate-900">₹2,000</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Fastag National Highway Toll</span>
                  <span className="font-bold text-slate-900">₹1,800</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>GST (18% SAC 9965)</span>
                  <span className="font-bold text-slate-900">₹5,814</span>
                </div>
                <div className="pt-1.5 border-t border-slate-300 flex justify-between font-black text-sm text-[#0B1B36]">
                  <span>Estimated Total</span>
                  <span className="text-[#0067FA]">₹38,114</span>
                </div>
              </div>

              <button
                onClick={() => {
                  setFromCity(rateFrom);
                  setToCity(rateTo);
                  setShowBookModal(true);
                }}
                className="w-full py-2.5 bg-[#002F70] text-white font-bold rounded-lg text-xs shadow hover:bg-slate-800 transition-colors"
              >
                Book at this Rate
              </button>
            </div>
          </div>
        )}

        {/* ======================================================= */}
        {/* TAB 4: SUPPORT (SCR-22 TICKETS & CHAT)                   */}
        {/* ======================================================= */}
        {activeTab === 'support' && (
          <div className="space-y-3">
            <div className="flex space-x-1 bg-white p-1 rounded-xl border border-slate-200 text-xs font-bold shadow-xs">
              <button
                onClick={() => setSupportSubTab('tickets')}
                className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
                  supportSubTab === 'tickets' ? 'bg-[#0067FA] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Tickets ({ticketList.length})
              </button>
              <button
                onClick={() => setSupportSubTab('chat')}
                className={`flex-1 py-1.5 rounded-lg text-center transition-all ${
                  supportSubTab === 'chat' ? 'bg-[#0067FA] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Live Chat
              </button>
            </div>

            {supportSubTab === 'tickets' && (
              <div className="space-y-3">
                {/* Raise Ticket Form */}
                <div className="bg-white rounded-xl p-3.5 border border-[#E2E8F0] shadow-xs space-y-2 text-xs">
                  <h4 className="font-bold text-slate-900">Raise New Ticket</h4>
                  <input
                    type="text"
                    placeholder="Subject (e.g. ETA update request)"
                    value={newTicketSubject}
                    onChange={(e) => setNewTicketSubject(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                  <select
                    value={newTicketCategory}
                    onChange={(e) => setNewTicketCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="Tracking & Delay">Tracking & Transit Delay</option>
                    <option value="POD Request">POD & LR Copy Request</option>
                    <option value="Billing & GST">Billing & GST Invoice</option>
                    <option value="Vehicle Issue">Vehicle Breakdown or Issue</option>
                  </select>
                  <button
                    onClick={() => {
                      if (!newTicketSubject) return;
                      setTicketList([
                        {
                          id: `TKT-${Math.floor(10000 + Math.random() * 90000)}`,
                          subject: newTicketSubject,
                          category: newTicketCategory,
                          status: 'OPEN',
                          date: 'Just now',
                          reply: 'Ticket acknowledged by Route NH Operations Desk. An executive is reviewing.',
                        },
                        ...ticketList,
                      ]);
                      setNewTicketSubject('');
                      alert('Support ticket created!');
                    }}
                    className="w-full py-2 bg-[#002F70] text-white font-bold rounded-lg text-xs"
                  >
                    Submit Support Ticket
                  </button>
                </div>

                {/* Ticket Cards */}
                {ticketList.map((t) => (
                  <div key={t.id} className="bg-white rounded-xl p-3.5 border border-[#E2E8F0] shadow-xs space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-slate-900">{t.id}</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          t.status === 'OPEN'
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        }`}
                      >
                        {t.status}
                      </span>
                    </div>
                    <div className="font-extrabold text-slate-800">{t.subject}</div>
                    <div className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-100">
                      <span className="font-bold text-blue-700">Operations Desk:</span> {t.reply}
                    </div>
                    <div className="text-[10px] text-slate-400">{t.date}</div>
                  </div>
                ))}
              </div>
            )}

            {supportSubTab === 'chat' && (
              <div className="bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-xs space-y-3 text-xs">
                <div className="bg-[#F2F4FD] p-3 rounded-lg border border-blue-100 flex items-center justify-between">
                  <div>
                    <div className="font-bold text-slate-900">Traffic Controller (Chennai)</div>
                    <div className="text-[10px] text-slate-500">Route NH Central Fleet Management</div>
                  </div>
                  <a
                    href="tel:+911140509000"
                    className="px-2.5 py-1 bg-emerald-600 text-white rounded font-bold text-[10px] flex items-center space-x-1"
                  >
                    <Phone className="w-3 h-3" />
                    <span>Call Desk</span>
                  </a>
                </div>

                <div className="h-48 overflow-y-auto space-y-2 p-2 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="bg-white p-2.5 rounded-lg border border-slate-200 max-w-[85%] text-slate-700">
                    Hello Priya! Your shipment #15309639 has cleared Krishnagiri and is proceeding on NH 48 corridor as scheduled.
                  </div>
                </div>

                <div className="flex space-x-1.5">
                  <input
                    type="text"
                    placeholder="Type message to Operations Desk..."
                    className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                  <button className="px-3 py-2 bg-[#0067FA] text-white rounded-lg font-bold">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ======================================================= */}
        {/* TAB 5: ACCOUNT (SCR-23 ACCOUNT HUB)                     */}
        {/* ======================================================= */}
        {activeTab === 'account' && (
          <div className="space-y-3">
            {/* Profile Card matching SCR-23 */}
            <div className="bg-white rounded-xl p-4 border border-[#E2E8F0] shadow-xs flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-[#0067FA] text-white flex items-center justify-center font-extrabold text-base">
                  PS
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-[#0B1B36]">Priya Sharma</h3>
                  <div className="text-[11px] text-slate-500">Tata Motors Parts Distribution Division</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">+91 98765 43210</div>
                </div>
              </div>
            </div>

            {/* Menu List matching SCR-23 */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs divide-y divide-slate-100 text-xs">
              <div
                onClick={() => setShowOrgSheet(true)}
                className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <Building2 className="w-4 h-4 text-slate-500" />
                  <span className="font-bold text-slate-800">Organization details</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <div
                onClick={() => setShowUsersSheet(true)}
                className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <UsersIcon className="w-4 h-4 text-slate-500" />
                  <span className="font-bold text-slate-800">Users management</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <div
                onClick={() => setShowBalanceSheet(true)}
                className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <CreditCard className="w-4 h-4 text-slate-500" />
                  <span className="font-bold text-slate-800">Account balance & Top-up</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <div
                onClick={() => setShowPodTrackingSheet(true)}
                className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <Search className="w-4 h-4 text-slate-500" />
                  <span className="font-bold text-slate-800">POD & Truck tracking lookup</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <div
                onClick={() => setShowAccountHelpSheet(true)}
                className="p-3.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <Headphones className="w-4 h-4 text-slate-500" />
                  <span className="font-bold text-slate-800">Help & 24/7 Operations call</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </div>

              <Link
                href="/login"
                className="p-3.5 flex items-center justify-between hover:bg-red-50 text-red-600 font-bold cursor-pointer"
              >
                <div className="flex items-center space-x-3">
                  <X className="w-4 h-4 text-red-600" />
                  <span>Logout</span>
                </div>
                <ChevronRight className="w-4 h-4 text-red-400" />
              </Link>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================= */}
      {/* 3. PERSISTENT 5-TAB BOTTOM NAVIGATION BAR                 */}
      {/* ========================================================= */}
      <nav className="fixed bottom-0 inset-x-0 h-14 bg-white border-t border-[#E5E7EF] flex items-center justify-around z-30 shadow-lg">
        <button
          onClick={() => setActiveTab('book')}
          className={`flex flex-col items-center text-[10px] font-bold transition-colors ${
            activeTab === 'book' ? 'text-[#0067FA]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <FileText className="w-4 h-4 mb-0.5" />
          <span>Book</span>
        </button>

        <button
          onClick={() => setActiveTab('trip')}
          className={`flex flex-col items-center text-[10px] font-bold transition-colors ${
            activeTab === 'trip' ? 'text-[#0067FA]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Truck className="w-4 h-4 mb-0.5" />
          <span>Trip</span>
        </button>

        <button
          onClick={() => setActiveTab('rates')}
          className={`flex flex-col items-center text-[10px] font-bold transition-colors ${
            activeTab === 'rates' ? 'text-[#0067FA]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <TrendingUp className="w-4 h-4 mb-0.5" />
          <span>Rates</span>
        </button>

        <button
          onClick={() => setActiveTab('support')}
          className={`flex flex-col items-center text-[10px] font-bold transition-colors ${
            activeTab === 'support' ? 'text-[#0067FA]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <Headphones className="w-4 h-4 mb-0.5" />
          <span>Support</span>
        </button>

        <button
          onClick={() => setActiveTab('account')}
          className={`flex flex-col items-center text-[10px] font-bold transition-colors ${
            activeTab === 'account' ? 'text-[#0067FA]' : 'text-slate-400 hover:text-slate-600'
          }`}
        >
          <User className="w-4 h-4 mb-0.5" />
          <span>Account</span>
        </button>
      </nav>

      {/* ========================================================= */}
      {/* 4. MODAL: BOOK TRUCK FORM (SCR-06)                        */}
      {/* ========================================================= */}
      {showBookModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex flex-col justify-end">
          <div className="bg-white rounded-t-2xl max-h-[90vh] overflow-y-auto p-4 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-[#0B1B36]">Book truck</h3>
              <button onClick={() => setShowBookModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 2x2 Grid matching SCR-06 */}
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <div
                onClick={() => setShowCityPicker('from')}
                className="bg-[#F2F4FD] p-2.5 rounded-lg border border-blue-100 cursor-pointer"
              >
                <div className="text-[10px] text-slate-400 font-bold uppercase">From</div>
                <div className="font-bold text-slate-900 truncate mt-0.5">{fromCity}</div>
              </div>

              <div
                onClick={() => setShowCityPicker('to')}
                className="bg-[#F2F4FD] p-2.5 rounded-lg border border-blue-100 cursor-pointer"
              >
                <div className="text-[10px] text-slate-400 font-bold uppercase">To</div>
                <div className="font-bold text-slate-900 truncate mt-0.5">{toCity}</div>
              </div>

              <div
                onClick={() => setShowMaterialPicker(true)}
                className="bg-[#F2F4FD] p-2.5 rounded-lg border border-blue-100 cursor-pointer"
              >
                <div className="text-[10px] text-slate-400 font-bold uppercase">Material type</div>
                <div className="font-bold text-slate-900 truncate mt-0.5 flex items-center justify-between">
                  <span>{materialType}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </div>
              </div>

              <div className="bg-[#F2F4FD] p-2.5 rounded-lg border border-blue-100">
                <div className="text-[10px] text-slate-400 font-bold uppercase">Ton(MT)</div>
                <input
                  type="number"
                  value={tonnage}
                  onChange={(e) => setTonnage(e.target.value)}
                  className="w-full bg-transparent font-bold text-slate-900 text-xs focus:outline-none mt-0.5"
                />
              </div>
            </div>

            {/* Categorized Truck Type Chips matching SCR-06 */}
            <div className="space-y-3 text-xs">
              <div className="font-extrabold text-slate-900 text-xs">Select Truck type</div>

              {/* Open body */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-500">Open Body Trucks</div>
                <div className="flex flex-wrap gap-1.5">
                  {truckCategories.Open.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedBodyType(type)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                        selectedBodyType === type
                          ? 'bg-[#0067FA] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Closed Container */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-500">Closed Container Trucks</div>
                <div className="flex flex-wrap gap-1.5">
                  {truckCategories.Closed.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedBodyType(type)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                        selectedBodyType === type
                          ? 'bg-[#0067FA] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trailers */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-bold text-slate-500">Trailer & Flat Bed</div>
                <div className="flex flex-wrap gap-1.5">
                  {truckCategories.Trailer.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setSelectedBodyType(type)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold transition-all ${
                        selectedBodyType === type
                          ? 'bg-[#0067FA] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Notes Input */}
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">Notes</label>
              <input
                type="text"
                placeholder="Enter other requirements..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
              />
            </div>

            {/* Sticky Bottom CTA */}
            <button
              onClick={() => {
                alert(`Booking submitted for ${selectedBodyType} from ${fromCity} to ${toCity}!`);
                setShowBookModal(false);
              }}
              className="w-full py-3 bg-[#002F70] text-white font-extrabold rounded-xl text-xs shadow-md hover:bg-slate-800 transition-colors"
            >
              Book
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 5. MODAL: CITY SEARCH OVERLAY (SCR-07)                    */}
      {/* ========================================================= */}
      {showCityPicker && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          <div className="p-3 border-b border-slate-200 flex items-center space-x-2">
            <button onClick={() => setShowCityPicker(null)} className="p-1">
              <ArrowRight className="w-5 h-5 rotate-180 text-slate-700" />
            </button>
            <input
              type="text"
              autoFocus
              placeholder={`Enter ${showCityPicker === 'from' ? 'source' : 'destination'} city...`}
              value={citySearchTerm}
              onChange={(e) => setCitySearchTerm(e.target.value)}
              className="flex-1 px-3 py-1.5 border border-[#0067FA] rounded-lg text-xs focus:outline-none"
            />
          </div>

          <div className="p-4 flex-1 overflow-y-auto space-y-3 text-xs">
            <div className="font-extrabold text-slate-400 text-[10px] uppercase">Major Transport Hubs</div>
            <div className="divide-y divide-slate-100">
              {citiesList
                .filter((c) => c.toLowerCase().includes(citySearchTerm.toLowerCase()))
                .map((city) => (
                  <div
                    key={city}
                    onClick={() => {
                      if (showCityPicker === 'from') setFromCity(city);
                      else setToCity(city);
                      setShowCityPicker(null);
                      setCitySearchTerm('');
                    }}
                    className="py-2.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer"
                  >
                    <span className="font-bold text-slate-800">{city}</span>
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 6. MODAL: MATERIAL TYPE SELECTOR (SCR-08)                 */}
      {/* ========================================================= */}
      {showMaterialPicker && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          <div className="p-3 border-b border-slate-200 flex items-center space-x-2">
            <button onClick={() => setShowMaterialPicker(false)} className="p-1">
              <ArrowRight className="w-5 h-5 rotate-180 text-slate-700" />
            </button>
            <input
              type="text"
              autoFocus
              placeholder="Enter material type..."
              value={materialSearchTerm}
              onChange={(e) => setMaterialSearchTerm(e.target.value)}
              className="flex-1 px-3 py-1.5 border border-[#0067FA] rounded-lg text-xs focus:outline-none"
            />
          </div>

          <div className="p-4 flex-1 overflow-y-auto divide-y divide-slate-100 text-xs">
            {commodities
              .filter((c) => c.toLowerCase().includes(materialSearchTerm.toLowerCase()))
              .map((c) => (
                <div
                  key={c}
                  onClick={() => {
                    setMaterialType(c);
                    setShowMaterialPicker(false);
                    setMaterialSearchTerm('');
                  }}
                  className="py-2.5 flex items-center justify-between hover:bg-slate-50 cursor-pointer"
                >
                  <span className="font-bold text-slate-800">{c}</span>
                  {materialType === c && <Check className="w-4 h-4 text-[#0067FA]" />}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 7. BOTTOM SHEET: TRIP TIMELINE (SCR-05)                   */}
      {/* ========================================================= */}
      {showTimelineSheet && (
        <div className="fixed inset-0 z-50 bg-black/60 flex flex-col justify-end">
          <div className="bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto p-4 space-y-3 shadow-2xl">
            <div className="w-10 h-1 bg-slate-300 rounded-full mx-auto mb-1"></div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-[#0B1B36]">Trip Timeline & Milestones</h3>
              <button onClick={() => setShowTimelineSheet(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#F2F4FD] p-3 rounded-xl border border-blue-100 text-xs space-y-1">
              <div className="flex justify-between font-bold text-slate-900">
                <span>TAT: 1d 18h (Ahead of Schedule)</span>
                <span>482 KM</span>
              </div>
              <div className="text-[11px] text-slate-500">Vehicle: Truck 01 (TN-01-AB-1234)</div>
            </div>

            {/* 10-Stage Horizontal/Vertical Stepper matching SCR-05 */}
            <div className="space-y-2 text-xs py-2">
              {[
                { title: 'Confirmed', time: '20 Nov 2026, 11:00 AM', done: true },
                { title: 'Loading', time: '20 Nov 2026, 02:30 PM', done: true },
                { title: 'Intransit', time: '21 Nov 2026, 06:15 AM', done: true },
                { title: 'Unloading', time: '22 Nov 2026, 04:00 PM', done: true },
                { title: 'Delivered', time: '22 Nov 2026, 05:45 PM', done: true },
                { title: 'POD Verified', time: '23 Nov 2026, 10:30 AM', done: true },
                { title: 'Invoiced', time: '23 Nov 2026, 02:00 PM', done: true },
                { title: 'POD Disp', time: 'Pending Dispatch', done: false },
                { title: 'Paid', time: 'Pending', done: false },
                { title: 'Closed', time: 'Pending', done: false },
              ].map((step, idx) => (
                <div key={step.title} className="flex items-start space-x-3">
                  <div
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 ${
                      step.done ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-500'
                    }`}
                  >
                    {step.done ? '✓' : idx + 1}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">{step.title}</div>
                    <div className="text-[10px] text-slate-400">{step.time}</div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowTimelineSheet(false)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 8. SUB-SCREEN: LIVE TRACKING (SCR-14)                     */}
      {/* ========================================================= */}
      {showTrackingScreen && (
        <div className="fixed inset-0 z-50 bg-[#F2F4FD] flex flex-col">
          <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
            <button onClick={() => setShowTrackingScreen(false)} className="flex items-center space-x-2">
              <ArrowRight className="w-5 h-5 rotate-180 text-slate-800" />
              <span className="font-extrabold text-sm text-[#0B1B36]">Live Highway Tracking</span>
            </button>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>LIVE GPS</span>
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {/* Map visualizer */}
            <div className="h-44 w-full rounded-xl overflow-hidden bg-[#0A192F] relative p-3 flex flex-col justify-between text-white">
              <svg className="absolute inset-0 w-full h-full opacity-60" viewBox="0 0 400 200" preserveAspectRatio="none">
                <path d="M 20 180 Q 150 40, 380 30" fill="none" stroke="#1E3A8A" strokeWidth="24" strokeLinecap="round" />
                <path d="M 20 180 Q 150 40, 380 30" fill="none" stroke="#0067FA" strokeWidth="18" strokeLinecap="round" />
                <path
                  d="M 20 180 Q 150 40, 380 30"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeDasharray="8 8"
                  strokeLinecap="round"
                />
                <circle cx="210" cy="85" r="9" fill="#0067FA" stroke="#FFFFFF" strokeWidth="2" />
                <circle cx="210" cy="85" r="16" fill="#0067FA" opacity="0.3" className="animate-ping" />
              </svg>

              <div className="relative z-10 flex items-center justify-between text-[11px]">
                <span className="font-mono bg-black/70 px-2 py-0.5 rounded font-bold text-blue-300">
                  Corridor: NH 48 (Chennai ↔ Mumbai)
                </span>
                <span className="bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded text-[10px] font-bold">
                  Speed: {telemetry?.speed ? `${telemetry.speed} km/h` : '58.5 km/h'}
                </span>
              </div>

              <div className="relative z-10 bg-slate-900/90 p-2 rounded text-[10px] flex justify-between font-mono">
                <span>Truck 01 (AIS-140 GPS)</span>
                <span className="text-emerald-400">
                  {telemetry?.latitude ? `${telemetry.latitude}°N, ${telemetry.longitude}°E` : '18.6298°N, 73.7997°E'}
                </span>
              </div>
            </div>

            {/* Toll Plaza Timeline matching SCR-14 */}
            <div className="bg-white rounded-xl p-3.5 border border-[#E2E8F0] shadow-xs space-y-2 text-xs">
              <div className="font-bold text-slate-900">National Highway Toll Passages</div>
              <div className="space-y-2 divide-y divide-slate-100">
                <div className="pt-1.5 flex justify-between">
                  <span className="font-medium text-slate-700">Sriperumbudur Toll Plaza</span>
                  <span className="text-emerald-600 font-bold">Cleared (02:15 PM)</span>
                </div>
                <div className="pt-1.5 flex justify-between">
                  <span className="font-medium text-slate-700">Vellore Golden Fort Toll Plaza</span>
                  <span className="text-emerald-600 font-bold">Cleared (05:40 PM)</span>
                </div>
                <div className="pt-1.5 flex justify-between">
                  <span className="font-medium text-slate-700">Krishnagiri Junction Toll</span>
                  <span className="text-blue-600 font-bold">Approaching (~45m)</span>
                </div>
              </div>
            </div>

            {/* Advance Telemetry Step */}
            <button
              onClick={handleSimulateStep}
              disabled={isSimulating}
              className="w-full py-2.5 bg-[#002F70] text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? 'animate-spin' : ''}`} />
              <span>Advance Simulated Highway Telemetry</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 9. BOTTOM SHEET: PAYMENT DETAILS (SCR-12)                 */}
      {/* ========================================================= */}
      {showPaymentSheet && (
        <div className="fixed inset-0 z-50 bg-black/60 flex flex-col justify-end">
          <div className="bg-white rounded-t-2xl p-4 space-y-3 shadow-2xl text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-[#0B1B36]">Payment details</h3>
              <button onClick={() => setShowPaymentSheet(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="space-y-2 divide-y divide-slate-100">
              <div className="flex justify-between py-1">
                <span className="text-slate-600">Base Freight</span>
                <span className="font-bold">₹34,000</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-600">Advance Paid (Driver Fuel/Enroute)</span>
                <span className="font-bold text-emerald-600">-₹20,000</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-600">Tolls & Green Tax</span>
                <span className="font-bold">₹1,800</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-600">GST (18%)</span>
                <span className="font-bold">₹4,000</span>
              </div>
              <div className="flex justify-between pt-2 font-black text-sm text-[#0B1B36]">
                <span>Balance Payable upon POD</span>
                <span className="text-[#0067FA]">₹19,800</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 10. BOTTOM SHEET: DOCUMENTS (SCR-13)                      */}
      {/* ========================================================= */}
      {showDocumentsSheet && (
        <div className="fixed inset-0 z-50 bg-black/60 flex flex-col justify-end">
          <div className="bg-white rounded-t-2xl p-4 space-y-3 shadow-2xl text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-[#0B1B36]">Consignment Documents</h3>
              <button onClick={() => setShowDocumentsSheet(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="space-y-2">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Signed & Stamped POD</div>
                  <div className="text-[10px] text-slate-400">Verified by Rajesh Nair (Ops Manager)</div>
                </div>
                <button
                  onClick={() => alert('Downloading official Stamped Delivery Receipt PDF')}
                  className="px-3 py-1 bg-[#002F70] text-white rounded font-bold text-[10px]"
                >
                  Download
                </button>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Official Lorry Receipt (LR)</div>
                  <div className="text-[10px] text-slate-400">RNH-LR-2026-0001.pdf</div>
                </div>
                <button
                  onClick={() => alert('Downloading Lorry Receipt')}
                  className="px-3 py-1 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded font-bold text-[10px]"
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 11. BOTTOM SHEET: ORGANIZATION DETAILS (SCR-26)           */}
      {/* ========================================================= */}
      {showOrgSheet && (
        <div className="fixed inset-0 z-50 bg-black/60 flex flex-col justify-end">
          <div className="bg-white rounded-t-2xl p-4 space-y-3 shadow-2xl text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-[#0B1B36]">Organization Tax Details</h3>
              <button onClick={() => setShowOrgSheet(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="space-y-2 divide-y divide-slate-100">
              <div className="py-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Company Name</span>
                <span className="font-bold text-slate-900">Tata Motors Parts Distribution Division</span>
              </div>
              <div className="py-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">GSTIN</span>
                <span className="font-mono font-bold text-slate-900">27AAACT2727Q1ZW</span>
              </div>
              <div className="py-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">PAN</span>
                <span className="font-mono font-bold text-slate-900">AAACT2727Q</span>
              </div>
              <div className="py-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Registered Billing Address</span>
                <span className="text-slate-700">Tata Motors Plant, Gate No. 4, Pimpri Logistics Hub, Pune 411018</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 12. BOTTOM SHEET: USERS MANAGEMENT (SCR-27)               */}
      {/* ========================================================= */}
      {showUsersSheet && (
        <div className="fixed inset-0 z-50 bg-black/60 flex flex-col justify-end">
          <div className="bg-white rounded-t-2xl p-4 space-y-3 shadow-2xl text-xs max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-[#0B1B36]">Organization Users</h3>
              <button onClick={() => setShowUsersSheet(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Priya Sharma</div>
                  <div className="text-[10px] text-slate-500">priyasharma@gmail.com • +91 98765 43210</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-[#0067FA]">Admin</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Rohan Deshmukh</div>
                  <div className="text-[10px] text-slate-500">rohan.plant@tatamotors.com • +91 98220 11223</div>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">Dispatcher</span>
              </div>
            </div>

            <button
              onClick={() => {
                alert('Add User modal opened');
              }}
              className="w-full py-2.5 bg-[#002F70] text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Sub-User</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 13. BOTTOM SHEET: ACCOUNT BALANCE / VIRTUAL ACCT (SCR-29) */}
      {/* ========================================================= */}
      {showBalanceSheet && (
        <div className="fixed inset-0 z-50 bg-black/60 flex flex-col justify-end">
          <div className="bg-white rounded-t-2xl p-4 space-y-3 shadow-2xl text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-[#0B1B36]">Virtual Account for NEFT/RTGS</h3>
              <button onClick={() => setShowBalanceSheet(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="space-y-2 divide-y divide-slate-100">
              <div className="py-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Bank Name</span>
                <span className="font-bold text-slate-900">HDFC Bank Limited (Corporate Freight Banking)</span>
              </div>
              <div className="py-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Virtual Account Number</span>
                <span className="font-mono font-bold text-blue-700 text-sm">RNHVAN00192831</span>
              </div>
              <div className="py-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">IFSC Code</span>
                <span className="font-mono font-bold text-slate-900">HDFC0000060</span>
              </div>
              <div className="py-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">Beneficiary Name</span>
                <span className="font-bold text-slate-900">Route NH Transport Private Limited</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 14. BOTTOM SHEET: 24/7 HELPDESK CALL (SCR-34)             */}
      {/* ========================================================= */}
      {showAccountHelpSheet && (
        <div className="fixed inset-0 z-50 bg-black/60 flex flex-col justify-end">
          <div className="bg-white rounded-t-2xl p-4 space-y-3 shadow-2xl text-xs">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="font-extrabold text-sm text-[#0B1B36]">Route NH Operations Helpline</h3>
              <button onClick={() => setShowAccountHelpSheet(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <div className="bg-[#F2F4FD] p-3 rounded-xl border border-blue-100 space-y-1">
              <div className="font-extrabold text-slate-900 text-sm">24/7 Traffic Control Room</div>
              <div className="text-slate-600 text-xs">Direct escalation for highway delays, breakdowns, and POD</div>
            </div>
            <a
              href="tel:+911140509000"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-xs flex items-center justify-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 11 4050 9000</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
