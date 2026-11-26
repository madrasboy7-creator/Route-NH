"use client";

import { motion } from "framer-motion";
import { Download, TrendingUp, Truck, Users, Activity, Filter, Calendar } from "lucide-react";
import styles from "./Reports.module.css";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const revenueData = [
  { month: 'Jan', revenue: 45000, trips: 120 },
  { month: 'Feb', revenue: 52000, trips: 145 },
  { month: 'Mar', revenue: 48000, trips: 130 },
  { month: 'Apr', revenue: 61000, trips: 180 },
  { month: 'May', revenue: 59000, trips: 175 },
  { month: 'Jun', revenue: 75000, trips: 220 },
  { month: 'Jul', revenue: 82000, trips: 250 },
];

const performanceData = [
  { driver: 'M. Johnson', rating: 4.9, onTime: 98, trips: 45 },
  { driver: 'S. Williams', rating: 4.8, onTime: 95, trips: 38 },
  { driver: 'J. Smith', rating: 4.7, onTime: 92, trips: 42 },
  { driver: 'A. Taylor', rating: 4.9, onTime: 99, trips: 50 },
  { driver: 'R. Davis', rating: 4.6, onTime: 88, trips: 35 },
];

const fleetUtilization = [
  { name: 'Active', value: 65, color: '#16a34a' },
  { name: 'Maintenance', value: 15, color: '#f59e0b' },
  { name: 'Idle', value: 20, color: '#94a3b8' },
];

export default function ReportsPage() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>Reports & Analytics</h2>
          <p>Comprehensive data on platform performance, revenue, and utilization.</p>
        </div>
        <div className={styles.headerActions}>
          <div className={styles.dateFilter}>
            <Calendar size={18} className={styles.actionIcon} />
            <select>
              <option>Last 6 Months</option>
              <option>Year to Date</option>
              <option>Custom Range</option>
            </select>
          </div>
          <button className="btn btn-primary">
            <Download size={18} /> Download Full Report
          </button>
        </div>
      </div>

      <div className={styles.kpiGrid}>
        <motion.div className={styles.kpiCard} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className={styles.kpiHeader}>
            <div className={styles.kpiIconWrapper} style={{ background: '#dcfce7', color: '#16a34a' }}>
              <TrendingUp size={24} />
            </div>
            <button className={styles.downloadBtn} title="Download CSV"><Download size={14} /></button>
          </div>
          <h3>$422,000</h3>
          <p>Total Revenue</p>
          <span className={styles.positive}>+15.2% vs previous period</span>
        </motion.div>

        <motion.div className={styles.kpiCard} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div className={styles.kpiHeader}>
            <div className={styles.kpiIconWrapper} style={{ background: 'var(--primary-100)', color: 'var(--primary-600)' }}>
              <Truck size={24} />
            </div>
            <button className={styles.downloadBtn} title="Download CSV"><Download size={14} /></button>
          </div>
          <h3>1,045</h3>
          <p>Total Trips Completed</p>
          <span className={styles.positive}>+8.4% vs previous period</span>
        </motion.div>

        <motion.div className={styles.kpiCard} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div className={styles.kpiHeader}>
            <div className={styles.kpiIconWrapper} style={{ background: '#fef9c3', color: '#ca8a04' }}>
              <Users size={24} />
            </div>
            <button className={styles.downloadBtn} title="Download CSV"><Download size={14} /></button>
          </div>
          <h3>4.82</h3>
          <p>Avg Driver Rating</p>
          <span className={styles.positive}>+0.12 vs previous period</span>
        </motion.div>

        <motion.div className={styles.kpiCard} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className={styles.kpiHeader}>
            <div className={styles.kpiIconWrapper} style={{ background: '#f3e8ff', color: '#9333ea' }}>
              <Activity size={24} />
            </div>
            <button className={styles.downloadBtn} title="Download CSV"><Download size={14} /></button>
          </div>
          <h3>78%</h3>
          <p>Fleet Utilization Rate</p>
          <span className={styles.negative}>-2.5% vs previous period</span>
        </motion.div>
      </div>

      <div className={styles.mainGrid}>
        {/* Revenue & Trips Chart */}
        <motion.div className={styles.chartCard} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          <div className={styles.cardHeader}>
            <h3>Monthly Growth (Revenue vs Trips)</h3>
            <div className={styles.cardActions}>
              <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}><Filter size={14} /> Filter</button>
              <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}><Download size={14} /> Export</button>
            </div>
          </div>
          <div className={styles.chartWrapper}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary-500)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary-500)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-gray)', fontSize: 12 }} />
                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-gray)', fontSize: 12 }} tickFormatter={val => `$${val/1000}k`} />
                <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-gray)', fontSize: 12 }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="var(--primary-500)" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Area yAxisId="right" type="monotone" dataKey="trips" stroke="#16a34a" strokeWidth={2} fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Fleet Utilization */}
        <motion.div className={styles.chartCard} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
          <div className={styles.cardHeader}>
            <h3>Fleet Utilization</h3>
            <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}><Download size={14} /> Export</button>
          </div>
          <div className={styles.chartWrapper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={fleetUtilization}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {fleetUtilization.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className={styles.pieLegend}>
            {fleetUtilization.map(item => (
              <div key={item.name} className={styles.legendItem}>
                <div className={styles.legendColor} style={{ background: item.color }} />
                <span>{item.name} ({item.value}%)</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Driver Performance */}
        <motion.div className={styles.fullWidthCard} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <div className={styles.cardHeader}>
            <h3>Driver Performance Leaderboard</h3>
            <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}><Download size={14} /> Export CSV</button>
          </div>
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Driver</th>
                  <th>Rating</th>
                  <th>On-Time %</th>
                  <th>Trips Completed</th>
                  <th>Performance Score</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.map((driver, idx) => (
                  <tr key={idx}>
                    <td className={styles.driverNameCell}>
                      <div className={styles.avatarMini}>{driver.driver.charAt(0)}</div>
                      <strong>{driver.driver}</strong>
                    </td>
                    <td><span className={styles.ratingBadge}>⭐️ {driver.rating}</span></td>
                    <td>
                      <div className={styles.progressCell}>
                        <span>{driver.onTime}%</span>
                        <div className={styles.progressBar}><div className={styles.progressFill} style={{ width: `${driver.onTime}%`, background: driver.onTime > 90 ? '#16a34a' : '#ea580c' }} /></div>
                      </div>
                    </td>
                    <td>{driver.trips}</td>
                    <td>
                      <span className={`${styles.scoreBadge} ${driver.onTime > 90 ? styles.excellent : styles.good}`}>
                        {driver.onTime > 90 ? 'Excellent' : 'Good'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
