"use client";

import { motion } from "framer-motion";
import { Wallet, Star, Navigation, MapPin, Truck, CheckCircle, Clock, Navigation2, Fuel } from "lucide-react";
import styles from "./DriverDashboard.module.css";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

const earningsData = [
  { day: 'Mon', amount: 240 },
  { day: 'Tue', amount: 139 },
  { day: 'Wed', amount: 980 },
  { day: 'Thu', amount: 390 },
  { day: 'Fri', amount: 480 },
  { day: 'Sat', amount: 380 },
  { day: 'Sun', amount: 430 },
];

export default function DriverDashboard() {
  return (
    <div className={styles.container}>
      <div className={styles.kpiGrid}>
        <motion.div 
          className={styles.kpiCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.kpiHeader}>
            <div className={styles.kpiIconWrapper} style={{ background: '#dcfce7', color: '#16a34a' }}>
              <Wallet size={24} />
            </div>
            <span className={styles.kpiBadge}>This Week</span>
          </div>
          <h3>$3,039.00</h3>
          <p>Wallet Balance</p>
        </motion.div>

        <motion.div 
          className={styles.kpiCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className={styles.kpiHeader}>
            <div className={styles.kpiIconWrapper} style={{ background: '#fef9c3', color: '#ca8a04' }}>
              <Star size={24} />
            </div>
            <span className={styles.kpiBadge}>Top 5%</span>
          </div>
          <h3>4.95</h3>
          <p>Driver Rating (128 Trips)</p>
        </motion.div>

        <motion.div 
          className={styles.kpiCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className={styles.kpiHeader}>
            <div className={styles.kpiIconWrapper} style={{ background: 'var(--primary-100)', color: 'var(--primary-600)' }}>
              <CheckCircle size={24} />
            </div>
          </div>
          <h3>12</h3>
          <p>Completed Deliveries (This Month)</p>
        </motion.div>

        <motion.div 
          className={styles.kpiCard}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <div className={styles.kpiHeader}>
            <div className={styles.kpiIconWrapper} style={{ background: '#f3e8ff', color: '#9333ea' }}>
              <Fuel size={24} />
            </div>
          </div>
          <h3>8.4 MPG</h3>
          <p>Fuel Efficiency Avg</p>
        </motion.div>
      </div>

      <div className={styles.mainGrid}>
        {/* Active Trip Navigation Card */}
        <motion.div 
          className={styles.activeTripCard}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <div className={styles.activeTripHeader}>
            <div className={styles.liveIndicator}>
              <div className={styles.liveDot} /> LIVE TRIP
            </div>
            <h3>FR8-847291</h3>
          </div>

          <div className={styles.tripRoute}>
            <div className={styles.routeItem}>
              <div className={styles.routeIcon}><MapPin size={20} color="var(--text-light)" /></div>
              <div>
                <p>Origin</p>
                <strong>Chicago, IL</strong>
              </div>
            </div>
            <div className={styles.routeConnector} />
            <div className={styles.routeItem}>
              <div className={styles.routeIcon}><Navigation2 size={20} color="var(--primary-600)" /></div>
              <div>
                <p>Destination</p>
                <strong>New York, NY</strong>
              </div>
            </div>
          </div>

          <div className={styles.tripMetrics}>
            <div className={styles.metric}>
              <span>ETA</span>
              <strong>4:30 PM</strong>
            </div>
            <div className={styles.metric}>
              <span>Remaining</span>
              <strong>142 mi</strong>
            </div>
            <div className={styles.metric}>
              <span>Status</span>
              <strong className="text-primary">On Schedule</strong>
            </div>
          </div>

          <button className={`btn btn-primary ${styles.navBtn}`}>
            <Navigation size={20} /> Open Navigation
          </button>
        </motion.div>

        <div className={styles.sideCol}>
          {/* Earnings Chart */}
          <motion.div 
            className={styles.chartCard}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <h3>Weekly Earnings</h3>
            <div className={styles.chartWrapper}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={earningsData}>
                  <defs>
                    <linearGradient id="colorEarn" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#16a34a" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#16a34a" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'var(--text-gray)' }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: 'var(--shadow-md)' }} />
                  <Area type="monotone" dataKey="amount" stroke="#16a34a" strokeWidth={3} fillOpacity={1} fill="url(#colorEarn)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Upcoming Trips */}
          <motion.div 
            className={styles.upcomingCard}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <h3>Upcoming Trips</h3>
            <div className={styles.tripList}>
              <div className={styles.tripListItem}>
                <div className={styles.tripListIcon}><Truck size={20} /></div>
                <div className={styles.tripListInfo}>
                  <strong>Newark, NJ → Boston, MA</strong>
                  <span>Tomorrow, 8:00 AM • FTL</span>
                </div>
              </div>
              <div className={styles.tripListItem}>
                <div className={styles.tripListIcon}><Truck size={20} /></div>
                <div className={styles.tripListInfo}>
                  <strong>Boston, MA → Philadelphia, PA</strong>
                  <span>Oct 27, 2:00 PM • LTL</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
