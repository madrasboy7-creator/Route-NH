import Link from 'next/link';
import ShowcaseView from '@/components/ShowcaseView';
import { Truck, Building2, Navigation, ShieldCheck, ArrowRight, Smartphone } from 'lucide-react';
import { prisma } from '@/lib/prisma';

export const revalidate = 0;

export default async function HomePage() {
  const [totalBookings, totalVehicles, totalDrivers, activeTrips] = await Promise.all([
    prisma.booking.count(),
    prisma.vehicle.count(),
    prisma.driver.count(),
    prisma.trip.count({
      where: {
        tripStatus: {
          in: ['CREATED', 'VEHICLE_ASSIGNED', 'DRIVER_ASSIGNED', 'AT_PICKUP', 'LOADING', 'LOADED', 'IN_TRANSIT'],
        },
      },
    }),
  ]);

  return (
    <div className="min-h-screen bg-[#F4F6F9]">
      {/* 1. Exact Showcase Presentation from User Mockup */}
      <ShowcaseView />

      {/* 2. Direct Portal Access Bar */}
      <div className="max-w-[1440px] mx-auto px-4 pb-16">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600">Unified Platform</span>
              <h3 className="text-xl font-black text-slate-900 mt-0.5">Explore Full-Screen Independent Portals</h3>
              <p className="text-xs text-slate-500">
                Connected to centralized SQLite/MySQL database with real-time GPS telemetry & state machines.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Backend & Database Online</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/customer"
              className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all group bg-slate-50 hover:bg-white"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  Shipper
                </span>
              </div>
              <div className="font-bold text-sm text-slate-900 group-hover:text-blue-600 flex items-center justify-between">
                <span>Customer Portal</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-slate-500 mt-1">Bookings, Quotes, Live Route Map & Invoices</p>
            </Link>

            <Link
              href="/platform"
              className="p-4 rounded-xl border border-slate-200 hover:border-orange-500 hover:shadow-md transition-all group bg-slate-50 hover:bg-white"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                  <Truck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-50 text-orange-700 border border-orange-200">
                  Operations
                </span>
              </div>
              <div className="font-bold text-sm text-slate-900 group-hover:text-orange-600 flex items-center justify-between">
                <span>Route NH Hub</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-slate-500 mt-1">Pricing, Fleet Dispatch, Driver Allocation & PODs</p>
            </Link>

            <Link
              href="/driver"
              className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all group bg-slate-50 hover:bg-white"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Navigation className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Driver
                </span>
              </div>
              <div className="font-bold text-sm text-slate-900 group-hover:text-emerald-600 flex items-center justify-between">
                <span>Driver Console</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-slate-500 mt-1">Status Transitions, GPS Telemetry & POD Upload</p>
            </Link>

            <Link
              href="/admin"
              className="p-4 rounded-xl border border-slate-200 hover:border-purple-500 hover:shadow-md transition-all group bg-slate-50 hover:bg-white"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                  Super Admin
                </span>
              </div>
              <div className="font-bold text-sm text-slate-900 group-hover:text-purple-600 flex items-center justify-between">
                <span>Admin Governance</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-xs text-slate-500 mt-1">Staff Permissions, Route Rates & Audit Logs</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
