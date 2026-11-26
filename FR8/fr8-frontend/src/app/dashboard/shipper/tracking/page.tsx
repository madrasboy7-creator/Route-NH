"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation, Clock, Activity, Truck, User, Phone, CheckCircle, Navigation2 } from "lucide-react";
import styles from "./Tracking.module.css";

export default function TrackingPage() {
  const [progress, setProgress] = useState(65);
  const [speed, setSpeed] = useState(55);

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => Math.min(p + 0.5, 100));
      setSpeed(s => s + (Math.random() * 4 - 2));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      {/* Map Section */}
      <div className={styles.mapContainer}>
        <div className={styles.mapMockup}>
          {/* Simulated Route */}
          <svg className={styles.routeSvg} viewBox="0 0 1000 400" preserveAspectRatio="none">
            <path 
              d="M 100 300 Q 250 350, 400 200 T 700 150 T 900 100" 
              fill="none" 
              stroke="var(--primary-200)" 
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray="10 10"
            />
            <motion.path 
              d="M 100 300 Q 250 350, 400 200 T 700 150 T 900 100" 
              fill="none" 
              stroke="var(--primary-600)" 
              strokeWidth="6"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ duration: 0.5, ease: "linear" }}
            />
          </svg>
          
          {/* Pick Up Pin */}
          <div className={styles.mapPin} style={{ left: '100px', top: '300px' }}>
            <MapPin size={28} color="var(--primary-600)" />
            <div className={styles.pinLabel}>Chicago, IL</div>
          </div>

          {/* Drop Off Pin */}
          <div className={styles.mapPin} style={{ left: '900px', top: '100px' }}>
            <MapPin size={28} color="var(--accent-500)" />
            <div className={styles.pinLabel}>New York, NY</div>
          </div>

          {/* Moving Truck */}
          <motion.div 
            className={styles.movingTruck}
            animate={{
              left: `${100 + (800 * progress / 100)}px`,
              top: `${300 - (200 * progress / 100)}px`, // Simplified curve approx
            }}
            transition={{ duration: 0.5, ease: "linear" }}
          >
            <div className={styles.truckIconBg}>
              <Navigation2 size={24} color="white" style={{ transform: 'rotate(45deg)' }} />
            </div>
            <div className={styles.radarPing} />
          </motion.div>
        </div>
      </div>

      <div className={styles.contentGrid}>
        {/* Trip Info Card */}
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <div>
              <h3>Shipment #FR8-847291</h3>
              <span className={styles.statusBadge}>In Transit</span>
            </div>
            <button className="btn btn-outline">Download POD</button>
          </div>

          <div className={styles.metricsGrid}>
            <div className={styles.metric}>
              <div className={styles.metricIcon}><Clock size={20} /></div>
              <div>
                <p>ETA</p>
                <strong>Today, 4:30 PM</strong>
              </div>
            </div>
            <div className={styles.metric}>
              <div className={styles.metricIcon}><Navigation size={20} /></div>
              <div>
                <p>Remaining</p>
                <strong>142 miles</strong>
              </div>
            </div>
            <div className={styles.metric}>
              <div className={styles.metricIcon}><Activity size={20} /></div>
              <div>
                <p>Current Speed</p>
                <strong>{speed.toFixed(0)} mph</strong>
              </div>
            </div>
          </div>

          <div className={styles.progressBar}>
            <div className={styles.progressHeader}>
              <span>Trip Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className={styles.progressTrack}>
              <motion.div 
                className={styles.progressFill}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>

        {/* Driver & Vehicle Card */}
        <div className={styles.driverCard}>
          <h3>Driver & Vehicle Details</h3>
          
          <div className={styles.driverProfile}>
            <div className={styles.avatar}>
              <img src="https://i.pravatar.cc/150?img=11" alt="Driver" />
            </div>
            <div className={styles.driverInfo}>
              <h4>Michael Johnson</h4>
              <p>⭐️ 4.9 (124 trips)</p>
            </div>
            <button className={styles.callBtn}>
              <Phone size={20} />
            </button>
          </div>

          <div className={styles.divider} />

          <div className={styles.vehicleInfo}>
            <div className={styles.vIcon}>
              <Truck size={32} color="var(--primary-600)" />
            </div>
            <div>
              <h4>Volvo VNL 860 (Refrigerated)</h4>
              <p>License Plate: <strong>TX-8492K</strong></p>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className={styles.timelineCard}>
          <h3>Tracking Timeline</h3>
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineIcon}><CheckCircle size={16} /></div>
              <div className={styles.timelineContent}>
                <h4>In Transit - Passed Cleveland, OH</h4>
                <p>Today, 10:15 AM</p>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineIcon}><CheckCircle size={16} /></div>
              <div className={styles.timelineContent}>
                <h4>In Transit - Passed Toledo, OH</h4>
                <p>Today, 8:30 AM</p>
              </div>
            </div>
            <div className={styles.timelineItem}>
              <div className={styles.timelineIcon}><CheckCircle size={16} /></div>
              <div className={styles.timelineContent}>
                <h4>Picked Up - Chicago, IL</h4>
                <p>Yesterday, 11:45 PM</p>
              </div>
            </div>
            <div className={`${styles.timelineItem} ${styles.timelinePending}`}>
              <div className={styles.timelineIcon}><div className={styles.dot} /></div>
              <div className={styles.timelineContent}>
                <h4>Delivery - New York, NY</h4>
                <p>Estimated Today, 4:30 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
