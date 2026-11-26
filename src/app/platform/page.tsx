'use client';

import React, { useState, useEffect } from 'react';
import {
  Truck,
  Package,
  FileText,
  UserCheck,
  Navigation,
  FileCheck2,
  DollarSign,
  BarChart3,
  Search,
  Filter,
  CheckCircle,
  AlertTriangle,
  Clock,
  Plus,
  X,
  ChevronRight,
  Shield,
  FilePlus2,
  Layers,
  MapPin,
  Calendar,
  RefreshCw,
} from 'lucide-react';

export default function PlatformPortal() {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'bookings' | 'quotes' | 'fleet' | 'drivers' | 'dispatch' | 'documents' | 'reports'
  >('overview');

  const [stats, setStats] = useState<any>({});
  const [bookings, setBookings] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [drivers, setDrivers] = useState<any[]>([]);
  const [trips, setTrips] = useState<any[]>([]);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modals
  const [quoteModalBooking, setQuoteModalBooking] = useState<any | null>(null);
  const [quoteBaseFreight, setQuoteBaseFreight] = useState('65000');
  const [quoteLoading, setQuoteLoading] = useState('2000');
  const [quoteUnloading, setQuoteUnloading] = useState('2500');
  const [quoteToll, setQuoteToll] = useState('3500');

  const [dispatchModalTrip, setDispatchModalTrip] = useState<any | null>(null);
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [dispatchNotes, setDispatchNotes] = useState('');

  const [addVehicleModal, setAddVehicleModal] = useState(false);
  const [vehicleReg, setVehicleReg] = useState('');
  const [vehicleCat, setVehicleCat] = useState('32ft MXL Container');
  const [vehicleCap, setVehicleCap] = useState('18000');

  const [notificationMsg, setNotificationMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadData = async () => {
    setLoading(true);
    try {
      const [dashRes, bRes, vRes, dRes, tRes, docRes] = await Promise.all([
        fetch('/api/v1/operations/dashboard'),
        fetch('/api/v1/operations/bookings'),
        fetch('/api/v1/operations/vehicles'),
        fetch('/api/v1/operations/drivers'),
        fetch('/api/v1/operations/trips'),
        fetch('/api/v1/operations/documents'),
      ]);

      if (dashRes.ok) {
        const d = await dashRes.json();
        if (d.success) setStats(d.data.stats || {});
      }
      if (bRes.ok) {
        const b = await bRes.json();
        if (b.success) setBookings(b.data || []);
      }
      if (vRes.ok) {
        const v = await vRes.json();
        if (v.success) setVehicles(v.data || []);
      }
      if (dRes.ok) {
        const drv = await dRes.json();
        if (drv.success) setDrivers(drv.data || []);
      }
      if (tRes.ok) {
        const t = await tRes.json();
        if (t.success) setTrips(t.data || []);
      }
      if (docRes.ok) {
        const docs = await docRes.json();
        if (docs.success) setDocuments(docs.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle Prepare & Send Quotation
  const handleSendQuotation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!quoteModalBooking) return;
    try {
      const base = parseFloat(quoteBaseFreight || '0');
      const load = parseFloat(quoteLoading || '0');
      const unload = parseFloat(quoteUnloading || '0');
      const toll = parseFloat(quoteToll || '0');

      const payload = {
        bookingId: quoteModalBooking.id,
        baseFreight: base,
        charges: [
          { chargeType: 'LOADING', description: 'Loading & Forklift Assistance', amount: load, taxable: true, taxRate: 12.0 },
          { chargeType: 'UNLOADING', description: 'Destination Dock Unloading', amount: unload, taxable: true, taxRate: 12.0 },
          { chargeType: 'TOLL', description: 'NH Fastag Electronic Toll', amount: toll, taxable: false, taxRate: 0.0 },
        ],
        validDays: 7,
      };

      const res = await fetch('/api/v1/operations/quotations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        setNotificationMsg({ type: 'success', text: `Quotation ${json.data.quotationReference} generated and dispatched to customer!` });
        setQuoteModalBooking(null);
        loadData();
      } else {
        setNotificationMsg({ type: 'error', text: json.error || 'Failed to create quotation' });
      }
    } catch (err: any) {
      setNotificationMsg({ type: 'error', text: err.message });
    }
  };

  // Handle Trip Dispatch & Vehicle Allocation
  const handleConfirmDispatch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!dispatchModalTrip) return;
    try {
      const payload = {
        tripId: dispatchModalTrip.id,
        vehicleId: selectedVehicleId,
        driverId: selectedDriverId,
        notes: dispatchNotes,
      };

      const res = await fetch('/api/v1/operations/trips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success) {
        setNotificationMsg({ type: 'success', text: `Trip ${dispatchModalTrip.tripReference} assigned and dispatched successfully!` });
        setDispatchModalTrip(null);
        setSelectedVehicleId('');
        setSelectedDriverId('');
        setDispatchNotes('');
        loadData();
      } else {
        setNotificationMsg({ type: 'error', text: json.error || 'Failed to assign trip' });
      }
    } catch (err: any) {
      setNotificationMsg({ type: 'error', text: err.message });
    }
  };

  // Handle Document Verification
  const handleVerifyDocument = async (documentId: number, status: 'VERIFIED' | 'REJECTED') => {
    try {
      const res = await fetch('/api/v1/operations/documents', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ documentId, status }),
      });
      const json = await res.json();
      if (json.success) {
        setNotificationMsg({ type: 'success', text: `Document ${status.toLowerCase()} successfully!` });
        loadData();
      }
    } catch (err: any) {
      setNotificationMsg({ type: 'error', text: err.message });
    }
  };

  // Handle Add Vehicle
  const handleAddVehicle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/operations/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          registrationNumber: vehicleReg,
          vehicleCategory: vehicleCat,
          capacityKg: vehicleCap,
          bodyType: 'CONTAINER',
        }),
      });
      const json = await res.json();
      if (json.success) {
        setNotificationMsg({ type: 'success', text: `Vehicle ${json.data.registrationNumber} registered in fleet!` });
        setAddVehicleModal(false);
        setVehicleReg('');
        loadData();
      } else {
        setNotificationMsg({ type: 'error', text: json.error || 'Registration failed' });
      }
    } catch (err: any) {
      setNotificationMsg({ type: 'error', text: err.message });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Platform Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-100 text-orange-800">
              PORTAL 2: /platform
            </span>
            <span className="text-xs text-slate-500 font-medium">Operations Desk: Rajesh Nair</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1">Route NH Operations & Dispatch Hub</h1>
          <p className="text-sm text-slate-600">
            Real-time management of freight bookings, rate quotations, fleet allocation, driver dispatch, and shipment telemetry.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={loadData}
            className="p-2.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-600 transition-colors"
            title="Refresh Operational State"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setAddVehicleModal(true)}
            className="flex items-center space-x-2 px-4 py-2.5 bg-navy-900 hover:bg-navy-800 text-white font-semibold text-sm rounded-lg shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Vehicle to Fleet</span>
          </button>
        </div>
      </div>

      {/* Notification banner */}
      {notificationMsg && (
        <div
          className={`p-4 rounded-xl mb-6 text-sm flex items-center justify-between shadow-sm ${
            notificationMsg.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              : 'bg-red-50 text-red-800 border border-red-200'
          }`}
        >
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span>{notificationMsg.text}</span>
          </div>
          <button onClick={() => setNotificationMsg(null)}>
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      )}

      {/* High Density Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 mb-8">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">New Requests</div>
          <div className="text-2xl font-black text-blue-600 mt-1">{stats.newBookingRequests ?? 0}</div>
          <div className="text-[10px] text-slate-400">Awaiting review</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Awaiting Quotes</div>
          <div className="text-2xl font-black text-orange-600 mt-1">{stats.bookingsAwaitingQuotes ?? 0}</div>
          <div className="text-[10px] text-slate-400">Pricing needed</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Confirmed Trips</div>
          <div className="text-2xl font-black text-emerald-600 mt-1">{stats.confirmedBookings ?? 0}</div>
          <div className="text-[10px] text-slate-400">Ready to dispatch</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Vehicles Available</div>
          <div className="text-2xl font-black text-slate-800 mt-1">{stats.vehiclesAvailable ?? 0}</div>
          <div className="text-[10px] text-emerald-600 font-semibold">{stats.vehiclesOnTrip ?? 0} currently on trip</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Drivers Available</div>
          <div className="text-2xl font-black text-slate-800 mt-1">{stats.driversAvailable ?? 0}</div>
          <div className="text-[10px] text-blue-600 font-semibold">{stats.driversOnTrip ?? 0} on road</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-[11px] font-semibold text-slate-500 uppercase">Pending PODs</div>
          <div className="text-2xl font-black text-purple-600 mt-1">{stats.pendingPodUploads ?? 0}</div>
          <div className="text-[10px] text-slate-400">Awaiting verification</div>
        </div>
      </div>

      {/* Operations Navigation Tabs */}
      <div className="flex border-b border-slate-200 space-x-6 mb-6 overflow-x-auto text-sm font-semibold">
        {[
          { id: 'overview', label: 'Operations Overview' },
          { id: 'bookings', label: 'Bookings & Quotations', count: bookings.length },
          { id: 'dispatch', label: 'Trip Dispatch Center', count: trips.length },
          { id: 'fleet', label: 'Fleet & Vehicles', count: vehicles.length },
          { id: 'drivers', label: 'Driver Roster', count: drivers.length },
          { id: 'documents', label: 'Document Verification', count: documents.filter((d) => d.documentStatus === 'PENDING_VERIFICATION').length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 whitespace-nowrap flex items-center space-x-2 border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-orange-500 text-orange-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && tab.count > 0 && (
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Active shipments summary */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="font-bold text-slate-900">Active Shipments on National Highways</h3>
                <span className="text-xs font-semibold text-orange-600">Real-time GPS Monitoring</span>
              </div>
              <div className="space-y-4">
                {trips.slice(0, 4).map((t) => {
                  const assign = t.assignments?.find((a: any) => a.assignmentStatus === 'ACTIVE');
                  const origin = t.booking?.stops?.[0]?.city || 'Origin';
                  const dest = t.booking?.stops?.[1]?.city || 'Dest';
                  return (
                    <div key={t.id} className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-900">{t.tripReference}</div>
                        <div className="text-slate-600 mt-0.5">
                          {origin} → {dest} • {t.booking?.goodsDescription}
                        </div>
                        <div className="text-slate-400 text-[10px] mt-0.5">
                          Vehicle: <span className="font-semibold text-slate-700">{assign?.vehicle?.registrationNumber || 'Not assigned'}</span> • Driver:{' '}
                          <span className="font-semibold text-slate-700">{assign?.driver?.user?.fullName || 'Not assigned'}</span>
                        </div>
                      </div>
                      <span className="badge badge-info">{t.tripStatus.replace('_', ' ')}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions & Booking Queue */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                <h3 className="font-bold text-slate-900">Booking Quotation Queue</h3>
                <span className="text-xs text-slate-500">Requires Ops Action</span>
              </div>
              <div className="space-y-3">
                {bookings
                  .filter((b) => b.bookingStatus === 'REQUESTED' || b.bookingStatus === 'UNDER_REVIEW')
                  .slice(0, 4)
                  .map((b) => (
                    <div key={b.id} className="p-3 bg-orange-50/50 rounded-lg border border-orange-100 flex items-center justify-between text-xs">
                      <div>
                        <div className="font-bold text-slate-900">{b.bookingReference}</div>
                        <div className="text-slate-600">
                          {b.customer?.companyName || 'Corporate Shipper'} • {b.totalWeightKg} kg ({b.goodsCategory})
                        </div>
                      </div>
                      <button
                        onClick={() => setQuoteModalBooking(b)}
                        className="px-3 py-1.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded shadow-sm text-xs"
                      >
                        Prepare Quote
                      </button>
                    </div>
                  ))}
                {bookings.filter((b) => b.bookingStatus === 'REQUESTED' || b.bookingStatus === 'UNDER_REVIEW').length === 0 && (
                  <div className="text-center py-8 text-xs text-slate-400">All customer booking requests have been quoted!</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: BOOKINGS & QUOTATIONS */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">All Customer Booking Requests</h3>
            <span className="text-xs text-slate-500">{bookings.length} total records</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="p-3">Reference</th>
                  <th className="p-3">Customer</th>
                  <th className="p-3">Route (Origin → Dest)</th>
                  <th className="p-3">Cargo Spec</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {bookings.map((b) => {
                  const pCity = b.stops?.find((s: any) => s.stopType === 'PICKUP')?.city || 'Origin';
                  const dCity = b.stops?.find((s: any) => s.stopType === 'DELIVERY')?.city || 'Destination';
                  return (
                    <tr key={b.id} className="hover:bg-slate-50">
                      <td className="p-3 font-mono font-bold text-slate-900">{b.bookingReference}</td>
                      <td className="p-3">
                        <div className="font-semibold text-slate-800">{b.customer?.companyName || 'Customer'}</div>
                        <div className="text-[10px] text-slate-400">{b.customer?.user?.email}</div>
                      </td>
                      <td className="p-3">
                        <div className="font-medium text-slate-900">{pCity} → {dCity}</div>
                        <div className="text-[10px] text-slate-400">{new Date(b.requestedPickupDate).toLocaleDateString()}</div>
                      </td>
                      <td className="p-3">
                        <div>{b.goodsDescription}</div>
                        <div className="text-[10px] text-slate-400 font-semibold">{b.totalWeightKg} kg • {b.requiredVehicleCategory}</div>
                      </td>
                      <td className="p-3">
                        <span className={`badge ${b.bookingStatus === 'CONFIRMED' ? 'badge-success' : b.bookingStatus === 'QUOTATION_SENT' ? 'badge-warning' : 'badge-info'}`}>
                          {b.bookingStatus.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-3 text-right">
                        {(b.bookingStatus === 'REQUESTED' || b.bookingStatus === 'UNDER_REVIEW') && (
                          <button
                            onClick={() => setQuoteModalBooking(b)}
                            className="px-3 py-1 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded text-[11px]"
                          >
                            Prepare Quote
                          </button>
                        )}
                        {b.bookingStatus === 'CONFIRMED' && (
                          <button
                            onClick={() => {
                              const t = trips.find((tr) => tr.bookingId === b.id);
                              if (t) setDispatchModalTrip(t);
                            }}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-[11px]"
                          >
                            Dispatch Vehicle
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: DISPATCH CENTER */}
      {activeTab === 'dispatch' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Trip & Dispatch Roster</h3>
              <span className="text-xs text-slate-500">Live operational shipments</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                  <tr>
                    <th className="p-3">Trip Ref</th>
                    <th className="p-3">Booking</th>
                    <th className="p-3">Route</th>
                    <th className="p-3">Allocated Vehicle</th>
                    <th className="p-3">Assigned Driver</th>
                    <th className="p-3">Trip Status</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {trips.map((t) => {
                    const assign = t.assignments?.find((a: any) => a.assignmentStatus === 'ACTIVE');
                    const pCity = t.booking?.stops?.[0]?.city || 'Origin';
                    const dCity = t.booking?.stops?.[1]?.city || 'Destination';
                    return (
                      <tr key={t.id} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-slate-900">{t.tripReference}</td>
                        <td className="p-3 font-mono text-slate-600">{t.booking?.bookingReference}</td>
                        <td className="p-3 font-medium">{pCity} → {dCity}</td>
                        <td className="p-3">
                          {assign?.vehicle ? (
                            <span className="font-semibold text-slate-900">{assign.vehicle.registrationNumber}</span>
                          ) : (
                            <span className="text-amber-600 font-semibold">Awaiting Vehicle</span>
                          )}
                        </td>
                        <td className="p-3">
                          {assign?.driver ? (
                            <span className="font-semibold text-slate-900">{assign.driver.user.fullName}</span>
                          ) : (
                            <span className="text-amber-600 font-semibold">Awaiting Driver</span>
                          )}
                        </td>
                        <td className="p-3">
                          <span className="badge badge-info">{t.tripStatus.replace('_', ' ')}</span>
                        </td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => setDispatchModalTrip(t)}
                            className="px-2.5 py-1 bg-navy-900 hover:bg-navy-800 text-white rounded text-[11px] font-semibold"
                          >
                            {assign ? 'Reassign' : 'Allocate'}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: FLEET & VEHICLES */}
      {activeTab === 'fleet' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900">Owned Fleet & Physical AIS-140 GPS Devices</h3>
              <p className="text-xs text-slate-500">Real-time status for Route NH owned and operated transport fleet</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-blue-50 text-blue-700 rounded-md border border-blue-200">
              {vehicles.length} Active Vehicles
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="p-3">Fleet Unit</th>
                  <th className="p-3">Registration</th>
                  <th className="p-3">Category & Body</th>
                  <th className="p-3">Payload Capacity</th>
                  <th className="p-3">GPS Tracker Status</th>
                  <th className="p-3">Vehicle Status</th>
                  <th className="p-3 text-right">Highway Telemetry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {vehicles.map((v) => (
                  <tr key={v.id} className="hover:bg-slate-50">
                    <td className="p-3 font-bold text-slate-900">
                      {v.truckIdentifier || (v.id === 1 ? 'Truck 01' : v.id === 2 ? 'Truck 02' : 'Fleet Unit')}
                    </td>
                    <td className="p-3 font-mono font-bold text-blue-700">{v.registrationNumber}</td>
                    <td className="p-3">
                      <div className="font-semibold text-slate-800">{v.vehicleCategory}</div>
                      <div className="text-[10px] text-slate-400">{v.bodyType}</div>
                    </td>
                    <td className="p-3 font-semibold text-slate-800">{v.capacityKg.toLocaleString()} kg</td>
                    <td className="p-3">
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1 animate-pulse"></span>
                        ONLINE (AIS-140)
                      </span>
                    </td>
                    <td className="p-3">
                      <span className={`badge ${v.vehicleStatus === 'AVAILABLE' ? 'badge-success' : v.vehicleStatus === 'ON_TRIP' ? 'badge-info' : 'badge-warning'}`}>
                        {v.vehicleStatus}
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={async () => {
                          const truck = v.id === 2 ? 'Truck 02' : 'Truck 01';
                          try {
                            const res = await fetch(`/api/v1/gps/telemetry?tick=true&truck=${encodeURIComponent(truck)}`);
                            const json = await res.json();
                            if (json.success) {
                              setNotificationMsg({ type: 'success', text: `Advanced simulated telemetry for ${truck} along highway corridor!` });
                              setTimeout(() => setNotificationMsg(null), 3000);
                            }
                          } catch (e: any) {
                            alert(e.message);
                          }
                        }}
                        className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-white rounded text-[11px] font-bold"
                      >
                        Simulate Step
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: DRIVERS */}
      {activeTab === 'drivers' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Commercial Driver Roster</h3>
            <span className="text-xs text-slate-500">{drivers.length} commercial drivers</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="p-3">Driver Code</th>
                  <th className="p-3">Driver Name</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Driving Licence No</th>
                  <th className="p-3">Licence Expiry</th>
                  <th className="p-3">Duty Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {drivers.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-900">{d.driverCode}</td>
                    <td className="p-3 font-semibold text-slate-800">{d.user.fullName}</td>
                    <td className="p-3">{d.user.phone}</td>
                    <td className="p-3 font-mono">{d.licenceNumber}</td>
                    <td className="p-3">{new Date(d.licenceExpiry).toLocaleDateString()}</td>
                    <td className="p-3">
                      <span className={`badge ${d.driverStatus === 'AVAILABLE' ? 'badge-success' : d.driverStatus === 'ON_TRIP' ? 'badge-info' : 'badge-neutral'}`}>
                        {d.driverStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 6: DOCUMENT VERIFICATION */}
      {activeTab === 'documents' && (
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">Shipment Documents (LR, POD, Loading Photos)</h3>
              <span className="text-xs text-slate-500">{documents.length} files</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                  <tr>
                    <th className="p-3">Document Type</th>
                    <th className="p-3">File Name</th>
                    <th className="p-3">Booking Ref</th>
                    <th className="p-3">Uploaded By</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Verification Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {documents.map((doc) => (
                    <tr key={doc.id} className="hover:bg-slate-50">
                      <td className="p-3">
                        <span className="font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                          {doc.documentType}
                        </span>
                      </td>
                      <td className="p-3 font-medium text-slate-900">{doc.originalFileName}</td>
                      <td className="p-3 font-mono text-slate-600">{doc.booking?.bookingReference}</td>
                      <td className="p-3">{doc.uploader?.fullName || 'Driver'}</td>
                      <td className="p-3">
                        <span className={`badge ${doc.documentStatus === 'VERIFIED' ? 'badge-success' : doc.documentStatus === 'PENDING_VERIFICATION' ? 'badge-warning' : 'badge-danger'}`}>
                          {doc.documentStatus.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-2">
                        {doc.documentStatus === 'PENDING_VERIFICATION' && (
                          <>
                            <button
                              onClick={() => handleVerifyDocument(doc.id, 'VERIFIED')}
                              className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded text-[11px]"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleVerifyDocument(doc.id, 'REJECTED')}
                              className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded text-[11px]"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Prepare Quotation */}
      {quoteModalBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="font-bold text-slate-900">Prepare Freight Quotation</h3>
                <p className="text-xs text-slate-500">Booking {quoteModalBooking.bookingReference}</p>
              </div>
              <button onClick={() => setQuoteModalBooking(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSendQuotation} className="space-y-4">
              <div className="bg-slate-50 p-3 rounded-lg text-xs space-y-1">
                <div>Customer: <span className="font-semibold">{quoteModalBooking.customer?.companyName}</span></div>
                <div>Cargo: <span className="font-semibold">{quoteModalBooking.goodsDescription}</span> ({quoteModalBooking.totalWeightKg} kg)</div>
                <div>Vehicle: <span className="font-semibold">{quoteModalBooking.requiredVehicleCategory}</span></div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Base Freight Rate (INR ₹) *</label>
                <input
                  type="number"
                  required
                  value={quoteBaseFreight}
                  onChange={(e) => setQuoteBaseFreight(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Loading (₹)</label>
                  <input
                    type="number"
                    value={quoteLoading}
                    onChange={(e) => setQuoteLoading(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Unloading (₹)</label>
                  <input
                    type="number"
                    value={quoteUnloading}
                    onChange={(e) => setQuoteUnloading(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">Toll (₹)</label>
                  <input
                    type="number"
                    value={quoteToll}
                    onChange={(e) => setQuoteToll(e.target.value)}
                    className="w-full px-2 py-1.5 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setQuoteModalBooking(null)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded shadow-sm"
                >
                  Dispatch Quotation to Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Dispatch Vehicle & Driver Assignment */}
      {dispatchModalTrip && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="font-bold text-slate-900">Allocate Vehicle & Driver</h3>
                <p className="text-xs text-slate-500">Trip {dispatchModalTrip.tripReference}</p>
              </div>
              <button onClick={() => setDispatchModalTrip(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmDispatch} className="space-y-4">
              <div className="bg-slate-50 p-3 rounded-lg text-xs space-y-1">
                <div>Booking Cargo: <span className="font-semibold">{dispatchModalTrip.booking?.goodsDescription}</span></div>
                <div>Required Weight: <span className="font-semibold">{dispatchModalTrip.booking?.totalWeightKg} kg</span></div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Select Available Vehicle *</label>
                <select
                  required
                  value={selectedVehicleId}
                  onChange={(e) => setSelectedVehicleId(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  <option value="">-- Choose compliant vehicle --</option>
                  {vehicles
                    .filter((v) => v.vehicleStatus === 'AVAILABLE')
                    .map((v) => (
                      <option key={v.id} value={v.id}>
                        {v.registrationNumber} ({v.vehicleCategory} - {v.capacityKg} kg capacity)
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Select Verified Driver *</label>
                <select
                  required
                  value={selectedDriverId}
                  onChange={(e) => setSelectedDriverId(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  <option value="">-- Choose verified driver --</option>
                  {drivers
                    .filter((d) => d.driverStatus === 'AVAILABLE')
                    .map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.user.fullName} ({d.licenceNumber} - {d.licenceType})
                      </option>
                    ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Dispatch Instructions / Route Notes</label>
                <input
                  type="text"
                  placeholder="e.g. Mandatory stop at Vadodara checkpoint. Fastag activated."
                  value={dispatchNotes}
                  onChange={(e) => setDispatchNotes(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setDispatchModalTrip(null)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded shadow-sm"
                >
                  Confirm Allocation & Dispatch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Add Vehicle */}
      {addVehicleModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900">Register Vehicle in Route NH Fleet</h3>
              <button onClick={() => setAddVehicleModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddVehicle} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Registration Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. DL-01-AX-9911"
                  value={vehicleReg}
                  onChange={(e) => setVehicleReg(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none uppercase"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Vehicle Category</label>
                <select
                  value={vehicleCat}
                  onChange={(e) => setVehicleCat(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                >
                  <option value="32ft MXL Container">32ft MXL Multi-Axle Container</option>
                  <option value="20ft Multi-Axle">20ft Multi-Axle Truck</option>
                  <option value="24ft Taurus">24ft Taurus Heavy Hauler</option>
                  <option value="14ft Open">14ft Light Commercial Truck</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Payload Capacity (kg) *</label>
                <input
                  type="number"
                  required
                  value={vehicleCap}
                  onChange={(e) => setVehicleCap(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setAddVehicleModal(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 bg-navy-900 hover:bg-navy-800 text-white text-xs font-bold rounded shadow-sm"
                >
                  Register Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
