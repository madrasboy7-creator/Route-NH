"use client";

import { motion } from "framer-motion";
import { Package, Truck, CheckCircle, TrendingUp, ArrowUpRight } from "lucide-react";
import styles from "./ShipperDashboard.module.css";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DataWrapper from "@/components/DataWrapper";

const chartData = [
  { name: 'Jan', spend: 4000 },
  { name: 'Feb', spend: 3000 },
  { name: 'Mar', spend: 2000 },
  { name: 'Apr', spend: 2780 },
  { name: 'May', spend: 1890 },
  { name: 'Jun', spend: 2390 },
  { name: 'Jul', spend: 3490 },
];

const recentActivity = [
  { id: "SHP-10023", status: "In Transit", location: "Chicago, IL", time: "2 hours ago", type: "Full Truckload" },
  { id: "SHP-10022", status: "Delivered", location: "New York, NY", time: "5 hours ago", type: "LTL" },
  { id: "SHP-10021", status: "Pending Pickup", location: "Los Angeles, CA", time: "1 day ago", type: "Refrigerated" },
];

export default function ShipperDashboard() {
  return (
    <DataWrapper skeletonType="dashboard">
      <div className={styles.dashboardContainer}>
        {/* Stats Grid */}
      <div className={styles.statsGrid}>
        <motion.div 
          className={styles.statCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.statHeader}>
            <div className={styles.statIcon} style={{ background: 'var(--primary-100)', color: 'var(--primary-600)' }}>
              <Truck size={24} />
            </div>
            <span className={styles.statTrend}><ArrowUpRight size={16} /> 12%</span>
          </div>
          <div className={styles.statValue}>24</div>
          <div className={styles.statLabel}>Active Shipments</div>
        </motion.div>

        <motion.div 
          className={styles.statCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className={styles.statHeader}>
            <div className={styles.statIcon} style={{ background: '#dcfce7', color: '#16a34a' }}>
              <CheckCircle size={24} />
            </div>
            <span className={styles.statTrend}><ArrowUpRight size={16} /> 8%</span>
          </div>
          <div className={styles.statValue}>1,284</div>
          <div className={styles.statLabel}>Completed Deliveries</div>
        </motion.div>

        <motion.div 
          className={styles.statCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className={styles.statHeader}>
            <div className={styles.statIcon} style={{ background: 'rgba(249, 115, 22, 0.1)', color: 'var(--accent-500)' }}>
              <Package size={24} />
            </div>
          </div>
          <div className={styles.statValue}>5</div>
          <div className={styles.statLabel}>Pending Orders</div>
        </motion.div>

        <motion.div 
          className={styles.statCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className={styles.statHeader}>
            <div className={styles.statIcon} style={{ background: '#f3e8ff', color: '#9333ea' }}>
              <TrendingUp size={24} />
            </div>
          </div>
          <div className={styles.statValue}>$42.5k</div>
          <div className={styles.statLabel}>Monthly Spending</div>
        </motion.div>
      </div>

      <div className={styles.contentGrid}>
        {/* Chart Area */}
        <motion.div 
          className={styles.chartCard}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <div className={styles.cardHeader}>
            <h3>Freight Spend Analytics</h3>
            <select className={styles.dateFilter}>
              <option>Last 7 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSpend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary-500)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary-500)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-gray)' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-gray)' }} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-lg)' }}
                  itemStyle={{ color: 'var(--primary-600)', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="spend" stroke="var(--primary-500)" strokeWidth={3} fillOpacity={1} fill="url(#colorSpend)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div 
          className={styles.activityCard}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <div className={styles.cardHeader}>
            <h3>Recent Activity</h3>
            <button className="btn btn-outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>View All</button>
          </div>
          <div className={styles.activityList}>
            {recentActivity.map((item, index) => (
              <div key={index} className={styles.activityItem}>
                <div className={styles.activityIcon}>
                  <Truck size={18} />
                </div>
                <div className={styles.activityDetails}>
                  <div className={styles.activityTitle}>
                    <strong>{item.id}</strong> - {item.type}
                  </div>
                  <div className={styles.activityMeta}>
                    <span className={`${styles.status} ${styles[item.status.replace(' ', '')]}`}>{item.status}</span>
                    <span>• {item.location}</span>
                    <span className={styles.time}>{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      </div>
    </DataWrapper>
  );
}
