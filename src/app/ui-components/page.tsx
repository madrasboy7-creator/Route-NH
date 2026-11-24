'use client';

import React from 'react';
import Link from 'next/link';
import { Search, Calendar, Check, Bell, ChevronRight, Box } from 'lucide-react';

export default function UIComponentsPage() {
  return (
    <div className="min-h-screen bg-[#F4F6F9] py-8 px-4 flex justify-center">
      <div className="w-full max-w-[370px] bg-slate-50 rounded-[40px] shadow-2xl border-[8px] border-[#0F172A] overflow-hidden flex flex-col">
        {/* Status bar */}
        <div className="h-8 px-6 pt-2 flex items-center justify-between text-xs font-semibold text-slate-800 bg-white">
          <span>9:41</span>
          <div className="w-20 h-3.5 bg-slate-900 rounded-full mx-auto -mt-1"></div>
          <div className="flex items-center space-x-1 text-[10px]">
            <span>5G</span>
            <div className="w-4 h-2.5 border border-slate-700 rounded-sm p-0.5">
              <div className="w-full h-full bg-slate-800"></div>
            </div>
          </div>
        </div>

        {/* Header */}
        <div className="px-4 py-2 bg-white border-b border-slate-100 flex items-center space-x-2">
          <Link href="/" className="text-slate-600 font-bold">&lt;</Link>
          <span className="font-extrabold text-sm text-[#0B1B36]">UI Components</span>
        </div>

        {/* Body */}
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
  );
}
