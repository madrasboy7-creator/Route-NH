"use client";

import { motion } from "framer-motion";
import { Users, Truck, Package, DollarSign, Activity, TrendingUp, AlertCircle, ShieldAlert } from "lucide-react";
import styles from "./AdminOverview.module.css";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import DataWrapper from "@/components/DataWrapper";

const revenueData = [
  { name: 'Jan', revenue: 45000, profit: 12000 },
  { name: 'Feb', revenue: 52000, profit: 14500 },
  { name: 'Mar', revenue: 48000, profit: 13000 },
  { name: 'Apr', revenue: 61000, profit: 18000 },
  { name: 'May', revenue: 59000, profit: 17500 },
  { name: 'Jun', revenue: 75000, profit: 22000 },
  { name: 'Jul', revenue: 82000, profit: 25000 },
];

const systemLogs = [
  { id: 1, type: "error", msg: "Payment Gateway Timeout", time: "2 mins ago" },
  { id: 2, type: "warning", msg: "High server load detected", time: "15 mins ago" },
  { id: 3, type: "info", msg: "New Carrier 'Swift Transport' onboarded", time: "1 hour ago" },
  { id: 4, type: "info", msg: "System backup completed", time: "3 hours ago" },
];

export default function AdminOverviewPage() {
  return (
    <DataWrapper skeletonType="dashboard">
      <div className={styles.container}>
      <div className={styles.header}>
        <h2>System Overview</h2>
        <div className={styles.dateFilter}>
          <select>
            <option>Last 30 Days</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>
        </div>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#dcfce7', color: '#16a34a' }}>
            <DollarSign size={24} />
          </div>
          <div className={styles.statInfo}>
            <p>Total Revenue</p>
            <h3>$422,000</h3>
            <span className={styles.positive}>+15.2% vs last month</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: 'var(--primary-100)', color: 'var(--primary-600)' }}>
            <Users size={24} />
          </div>
          <div className={styles.statInfo}>
            <p>Active Users</p>
            <h3>12,450</h3>
            <span className={styles.positive}>+4.8% vs last month</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#fef9c3', color: '#ca8a04' }}>
            <Truck size={24} />
          </div>
          <div className={styles.statInfo}>
            <p>Registered Carriers</p>
            <h3>845</h3>
            <span className={styles.positive}>+12 new this week</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statIcon} style={{ background: '#f3e8ff', color: '#9333ea' }}>
            <Package size={24} />
          </div>
          <div className={styles.statInfo}>
            <p>Shipments (MTD)</p>
            <h3>4,821</h3>
            <span className={styles.negative}>-2.1% vs last month</span>
          </div>
        </div>
      </div>

      <div className={styles.mainGrid}>
        {/* Revenue Chart */}
        <div className={styles.chartCard}>
          <div className={styles.cardHeader}>
            <h3>Revenue & Profit Growth</h3>
            <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}>View Report</button>
          </div>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary-500)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary-500)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProf" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-gray)', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-gray)', fontSize: 12 }} tickFormatter={val => `$${val/1000}k`} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                <Area type="monotone" dataKey="revenue" stroke="var(--primary-500)" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="profit" stroke="#16a34a" strokeWidth={2} fillOpacity={1} fill="url(#colorProf)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Volume Bar Chart */}
        <div className={styles.chartCard}>
          <div className={styles.cardHeader}>
            <h3>Shipment Volume by Region</h3>
          </div>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'North', val: 4000 },
                { name: 'South', val: 3000 },
                { name: 'East', val: 2000 },
                { name: 'West', val: 2780 },
                { name: 'Midwest', val: 1890 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-gray)', fontSize: 12 }} />
                <Tooltip cursor={{ fill: 'var(--bg-main)' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                <Bar dataKey="val" fill="var(--accent-500)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className={styles.bottomGrid}>
        {/* Heat Map Mockup */}
        <div className={styles.heatMapCard}>
          <h3>Live Operations Heat Map</h3>
          <div className={styles.mapMockup}>
            <div className={styles.mapOverlay} />
            <div className={styles.heatSpot} style={{ top: '30%', left: '70%', width: '100px', height: '100px', background: 'radial-gradient(circle, rgba(239,68,68,0.6) 0%, transparent 70%)' }} />
            <div className={styles.heatSpot} style={{ top: '60%', left: '40%', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(249,115,22,0.6) 0%, transparent 70%)' }} />
            <div className={styles.heatSpot} style={{ top: '40%', left: '20%', width: '80px', height: '80px', background: 'radial-gradient(circle, rgba(59,130,246,0.6) 0%, transparent 70%)' }} />
            <div className={styles.mapLabel}>High Activity Zones</div>
          </div>
        </div>

        {/* System Logs */}
        <div className={styles.logsCard}>
          <h3>System Logs & Alerts</h3>
          <div className={styles.logList}>
            {systemLogs.map(log => (
              <div key={log.id} className={styles.logItem}>
                <div className={`${styles.logIcon} ${styles[log.type]}`}>
                  {log.type === 'error' ? <ShieldAlert size={16} /> : 
                   log.type === 'warning' ? <AlertCircle size={16} /> : 
                   <Activity size={16} />}
                </div>
                <div className={styles.logContent}>
                  <p>{log.msg}</p>
                  <span>{log.time}</span>
                </div>
              </div>
            ))}
          </div>
          <button className={styles.viewAllLogs}>View All System Logs</button>
        </div>
      </div>
    </DataWrapper>
  );
}
