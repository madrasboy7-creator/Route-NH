"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, DollarSign, Package, Calendar, Search, Filter, AlertTriangle, Truck } from "lucide-react";
import styles from "./Loads.module.css";
import { shipments } from "../../../../data/mockData";

export default function AvailableLoadsPage() {
  const [localShipments, setLocalShipments] = useState(shipments.filter(s => s.status === 'Pending Assignment').slice(0, 30));
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredLoads = localShipments.filter(l => 
    l.origin.toLowerCase().includes(search.toLowerCase()) || 
    l.destination.toLowerCase().includes(search.toLowerCase())
  );

  const handleAction = (id: string, action: 'accept' | 'reject') => {
    setLocalShipments(localShipments.filter(l => l.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>Available Loads</h2>
          <p>Find and accept your next trip.</p>
        </div>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search by city, state..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className={styles.filterTabs}>
          {["All", "Local", "Regional", "Long Haul"].map(tab => (
            <button 
              key={tab}
              className={`${styles.tabBtn} ${filter === tab ? styles.activeTab : ""}`}
              onClick={() => setFilter(tab)}
            >
              {tab}
            </button>
          ))}
          <button className="btn btn-outline" style={{ marginLeft: '1rem' }}><Filter size={18} /> Filters</button>
        </div>
      </div>

      <div className={styles.grid}>
        <AnimatePresence>
          {filteredLoads.map((load) => (
            <motion.div 
              key={load.id}
              className={styles.card}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.payout}>
                  <DollarSign size={20} />
                  <span>{load.price}</span>
                </div>
                <span className={styles.distance}>Est. 340 miles</span>
              </div>

              <div className={styles.route}>
                <div className={styles.location}>
                  <MapPin size={18} color="var(--primary-600)" />
                  <div>
                    <p className={styles.locName}>{load.origin}</p>
                    <p className={styles.locTime}>{new Date(load.pickupDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className={styles.routeLine} />
                <div className={styles.location}>
                  <MapPin size={18} color="var(--accent-500)" />
                  <div>
                    <p className={styles.locName}>{load.destination}</p>
                    <p className={styles.locTime}>{new Date(load.deliveryDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Commodity</span>
                  <strong className={styles.value}><Package size={14} /> General Freight</strong>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Weight</span>
                  <strong className={styles.value}>{load.weight}</strong>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Equipment</span>
                  <strong className={styles.value}><Truck size={14} /> {load.type}</strong>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.label}>Rate / Mile</span>
                  <strong className={styles.value}>${(load.price / 340).toFixed(2)}</strong>
                </div>
              </div>

              <div className={styles.cardFooter}>
                <button className="btn btn-outline" onClick={() => handleAction(load.id, 'reject')}>Reject</button>
                <button className="btn btn-primary" onClick={() => handleAction(load.id, 'accept')}>Accept Load</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {filteredLoads.length === 0 && (
          <div className={styles.emptyState}>
            <AlertTriangle size={48} color="var(--text-light)" />
            <h3>No loads found</h3>
            <p>Try adjusting your search filters or check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
}
