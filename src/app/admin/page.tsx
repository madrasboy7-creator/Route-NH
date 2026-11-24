'use client';

import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Users,
  Settings,
  DollarSign,
  History,
  TrendingUp,
  Building2,
  Truck,
  CheckCircle,
  AlertTriangle,
  Plus,
  X,
  Search,
  Filter,
  RefreshCw,
  Save,
} from 'lucide-react';

export default function AdminPortal() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'pricing' | 'audit' | 'settings'>('dashboard');

  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [rates, setRates] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  // Modals
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPhone, setNewUserPhone] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('password123');
  const [newUserRoleId, setNewUserRoleId] = useState('2');

  const [showAddRateModal, setShowAddRateModal] = useState(false);
  const [sourceCity, setSourceCity] = useState('');
  const [destCity, setDestCity] = useState('');
  const [rateCat, setRateCat] = useState('32ft MXL Container');
  const [baseRate, setBaseRate] = useState('');
  const [perKmRate, setPerKmRate] = useState('52');

  const [notificationMsg, setNotificationMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [uRes, pRes, aRes, sRes] = await Promise.all([
        fetch('/api/v1/admin/users'),
        fetch('/api/v1/admin/pricing'),
        fetch('/api/v1/admin/audit-logs'),
        fetch('/api/v1/admin/settings'),
      ]);

      if (uRes.ok) {
        const u = await uRes.json();
        if (u.success) {
          setUsers(u.data.users || []);
          setRoles(u.data.roles || []);
        }
      }
      if (pRes.ok) {
        const p = await pRes.json();
        if (p.success) setRates(p.data || []);
      }
      if (aRes.ok) {
        const a = await aRes.json();
        if (a.success) setAuditLogs(a.data || []);
      }
      if (sRes.ok) {
        const s = await sRes.json();
        if (s.success) setSettings(s.data || {});
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  // Handle Add Staff User
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/admin/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: newUserName,
          email: newUserEmail,
          phone: newUserPhone,
          password: newUserPassword,
          roleId: newUserRoleId,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setNotificationMsg({ type: 'success', text: `Staff account ${json.data.fullName} created successfully!` });
        setShowAddUserModal(false);
        setNewUserName('');
        setNewUserEmail('');
        setNewUserPhone('');
        loadAdminData();
      } else {
        setNotificationMsg({ type: 'error', text: json.error || 'Failed to create user' });
      }
    } catch (err: any) {
      setNotificationMsg({ type: 'error', text: err.message });
    }
  };

  // Handle Add Route Rate
  const handleAddRate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/admin/pricing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sourceCity,
          destinationCity: destCity,
          vehicleCategory: rateCat,
          baseRate,
          perKmRate,
        }),
      });

      const json = await res.json();
      if (json.success) {
        setNotificationMsg({ type: 'success', text: 'Route freight rate added!' });
        setShowAddRateModal(false);
        setSourceCity('');
        setDestCity('');
        setBaseRate('');
        loadAdminData();
      } else {
        setNotificationMsg({ type: 'error', text: json.error || 'Failed to add rate' });
      }
    } catch (err: any) {
      setNotificationMsg({ type: 'error', text: err.message });
    }
  };

  // Handle Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      const json = await res.json();
      if (json.success) {
        setNotificationMsg({ type: 'success', text: 'Business settings saved successfully!' });
      }
    } catch (err: any) {
      setNotificationMsg({ type: 'error', text: err.message });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Admin Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-100 text-purple-800">
              PORTAL 4: /admin
            </span>
            <span className="text-xs text-slate-500 font-medium">Super Administrator: Vikramaditya Singhania</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-1">Super Administrator Control Center</h1>
          <p className="text-sm text-slate-600">
            System governance, staff user authorization, route tariff configuration, and enterprise audit logging.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={loadAdminData}
            className="p-2.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-slate-600 transition-colors"
            title="Refresh Admin State"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setShowAddUserModal(true)}
            className="flex items-center space-x-2 px-4 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-semibold text-sm rounded-lg shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create Staff Account</span>
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

      {/* Tabs */}
      <div className="flex border-b border-slate-200 space-x-6 mb-6 overflow-x-auto text-sm font-semibold">
        {[
          { id: 'dashboard', label: 'Executive Dashboard' },
          { id: 'users', label: 'User & Staff Management', count: users.length },
          { id: 'pricing', label: 'Corridor Route Rates', count: rates.length },
          { id: 'audit', label: 'Audit Trail Logs', count: auditLogs.length },
          { id: 'settings', label: 'Business & Tax Settings' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-3 whitespace-nowrap flex items-center space-x-2 border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-purple-600 text-purple-700'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== undefined && tab.count > 0 && (
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${
                  activeTab === tab.id ? 'bg-purple-100 text-purple-700' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: EXECUTIVE DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 uppercase">Registered Users</div>
              <div className="text-2xl font-black text-slate-900 mt-1">{users.length}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Across all 4 portals</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 uppercase">Active Corridors</div>
              <div className="text-2xl font-black text-purple-700 mt-1">{rates.length}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Configured route rates</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 uppercase">Audit Log Events</div>
              <div className="text-2xl font-black text-blue-600 mt-1">{auditLogs.length}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Immutable record trail</div>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <div className="text-xs font-semibold text-slate-500 uppercase">Platform Status</div>
              <div className="text-2xl font-black text-emerald-600 mt-1">OPERATIONAL</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Relational DB Healthy</div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: USER & STAFF MANAGEMENT */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">All User Accounts & Permissions</h3>
            <span className="text-xs text-slate-500">{users.length} total users</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="p-3">User ID</th>
                  <th className="p-3">Full Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-slate-900">{u.publicId.slice(0, 8)}...</td>
                    <td className="p-3 font-semibold text-slate-900">{u.fullName}</td>
                    <td className="p-3 text-slate-600">{u.email}</td>
                    <td className="p-3">{u.phone}</td>
                    <td className="p-3">
                      <span className="font-semibold px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-800">
                        {u.role?.name}
                      </span>
                    </td>
                    <td className="p-3">
                      <span className="badge badge-success">{u.accountStatus}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CORRIDOR ROUTE RATES */}
      {activeTab === 'pricing' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-900">Configured Highway Freight Corridors</h3>
            <button
              onClick={() => setShowAddRateModal(true)}
              className="px-3 py-1.5 bg-purple-700 hover:bg-purple-800 text-white rounded text-xs font-bold flex items-center space-x-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Corridor Rate</span>
            </button>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="p-3">Origin City</th>
                  <th className="p-3">Destination City</th>
                  <th className="p-3">Vehicle Category</th>
                  <th className="p-3">Base Freight (₹)</th>
                  <th className="p-3">Per KM Rate (₹)</th>
                  <th className="p-3">Est. Transit Hours</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {rates.map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="p-3 font-semibold text-slate-900">{r.sourceCity}</td>
                    <td className="p-3 font-semibold text-slate-900">{r.destinationCity}</td>
                    <td className="p-3">{r.vehicleCategory}</td>
                    <td className="p-3 font-bold text-slate-900">₹{r.baseRate.toLocaleString()}</td>
                    <td className="p-3">₹{r.perKmRate} / km</td>
                    <td className="p-3">{r.estimatedHours} hrs</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="font-bold text-slate-900">Platform Security & Operational Audit Trail</h3>
            <span className="text-xs text-slate-500">Immutable logging of all business changes</span>
          </div>
          <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100 sticky top-0">
                <tr>
                  <th className="p-3">Timestamp</th>
                  <th className="p-3">Action</th>
                  <th className="p-3">Actor</th>
                  <th className="p-3">Entity Type</th>
                  <th className="p-3">Entity ID</th>
                  <th className="p-3">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {auditLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="p-3 text-[11px] text-slate-500">
                      {new Date(log.createdAt).toLocaleString()}
                    </td>
                    <td className="p-3">
                      <span className="font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                        {log.action}
                      </span>
                    </td>
                    <td className="p-3 font-medium text-slate-800">{log.actor?.fullName || 'System'}</td>
                    <td className="p-3 font-semibold text-slate-700">{log.entityType}</td>
                    <td className="p-3 font-mono text-slate-500">{log.entityId}</td>
                    <td className="p-3 font-mono text-slate-400">{log.ipAddress}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: BUSINESS & TAX SETTINGS */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveSettings} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4 max-w-2xl">
          <h3 className="font-bold text-slate-900 mb-2">Corporate Profile & Tax Configuration</h3>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Company Legal Name</label>
            <input
              type="text"
              value={settings.company_name || ''}
              onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">GSTIN Number</label>
              <input
                type="text"
                value={settings.gstin || ''}
                onChange={(e) => setSettings({ ...settings, gstin: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none uppercase"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">PAN Number</label>
              <input
                type="text"
                value={settings.pan || ''}
                onChange={(e) => setSettings({ ...settings, pan: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none uppercase"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Corporate Office Address</label>
            <input
              type="text"
              value={settings.corporate_address || ''}
              onChange={(e) => setSettings({ ...settings, corporate_address: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">24/7 Operations Helpline</label>
            <input
              type="text"
              value={settings.toll_free_support || ''}
              onChange={(e) => setSettings({ ...settings, toll_free_support: e.target.value })}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
            />
          </div>
          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-lg shadow-sm flex items-center space-x-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save System Settings</span>
            </button>
          </div>
        </form>
      )}

      {/* MODAL: Add User */}
      {showAddUserModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900">Create Staff User Account</h3>
              <button onClick={() => setShowAddUserModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddUser} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={(e) => setNewUserEmail(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Phone *</label>
                <input
                  type="tel"
                  required
                  value={newUserPhone}
                  onChange={(e) => setNewUserPhone(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Operational Role *</label>
                <select
                  value={newUserRoleId}
                  onChange={(e) => setNewUserRoleId(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:outline-none"
                >
                  <option value="2">Operations Manager (Booking & Quotes)</option>
                  <option value="3">Dispatcher (Fleet & Driver Allocation)</option>
                  <option value="6">Finance Executive (Billing & Invoices)</option>
                  <option value="1">Super Administrator</option>
                </select>
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddUserModal(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded shadow-sm"
                >
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Add Rate */}
      {showAddRateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900">Add Corridor Route Rate</h3>
              <button onClick={() => setShowAddRateModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddRate} className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Origin City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Pune"
                    value={sourceCity}
                    onChange={(e) => setSourceCity(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Destination City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gurugram"
                    value={destCity}
                    onChange={(e) => setDestCity(e.target.value)}
                    className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Vehicle Category</label>
                <select
                  value={rateCat}
                  onChange={(e) => setRateCat(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                >
                  <option value="32ft MXL Container">32ft MXL Container</option>
                  <option value="20ft Multi-Axle">20ft Multi-Axle</option>
                  <option value="24ft Taurus">24ft Taurus</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Base Freight Rate (₹) *</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 68000"
                  value={baseRate}
                  onChange={(e) => setBaseRate(e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-600"
                />
              </div>
              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setShowAddRateModal(false)}
                  className="px-3 py-1.5 border border-slate-300 rounded text-xs font-semibold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-1.5 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded shadow-sm"
                >
                  Save Rate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
