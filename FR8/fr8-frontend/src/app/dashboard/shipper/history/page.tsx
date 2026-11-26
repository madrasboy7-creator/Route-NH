"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Download, Package, Calendar, MapPin, Truck, ChevronRight } from "lucide-react";
import styles from "./History.module.css";
import { shipments as initialShipments } from "../../../../data/mockData";

export default function HistoryPage() {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filteredShipments = initialShipments.filter(s => {
    const matchesFilter = filter === "All" || s.status === filter || (filter === "In Progress" && s.status === "In Transit");
    const matchesSearch = s.id.toLowerCase().includes(search.toLowerCase()) || 
                          s.origin.toLowerCase().includes(search.toLowerCase()) || 
                          s.destination.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>Shipment History</h2>
          <p>View and manage your past and current freight shipments.</p>
        </div>
        <div className={styles.actions}>
          <button className="btn btn-outline">
            <Download size={18} /> Export CSV
          </button>
        </div>
      </div>

      <div className={styles.filtersBar}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search by ID, Origin, or Destination..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className={styles.filterTabs}>
          {["All", "In Progress", "Delivered", "Completed", "Cancelled"].map(tab => (
            <button 
              key={tab}
              className={`${styles.tabBtn} ${filter === tab ? styles.activeTab : ""}`}
              onClick={() => setFilter(tab)}
            >
              {tab}
            </button>
          ))}
          <button className={styles.advancedFilter}>
            <Filter size={18} /> Filters
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        <AnimatePresence>
          {filteredShipments.map((shipment, index) => (
            <motion.div 
              key={shipment.id}
              className={styles.card}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.cardHeader}>
                <span className={styles.id}>#{shipment.id}</span>
                <span className={`${styles.badge} ${styles[shipment.status.replace(" ", "")]}`}>
                  {shipment.status}
                </span>
              </div>
              <div className={styles.route}>
                <div className={styles.location}>
                  <MapPin size={16} />
                  <div>
                    <p className={styles.locName}>{shipment.origin}</p>
                    <span className={styles.locLabel}>Origin</span>
                  </div>
                </div>
                <div className={styles.routeLine} />
                <div className={styles.location}>
                  <MapPin size={16} />
                  <div>
                    <p className={styles.locName}>{shipment.destination}</p>
                    <span className={styles.locLabel}>Destination</span>
                  </div>
                </div>
              </div>
              <div className={styles.details}>
                <div className={styles.detailItem}>
                  <Calendar size={14} />
                  <span>{new Date(shipment.createdDate).toLocaleDateString()}</span>
                </div>
                <div className={styles.detailItem}>
                  <Package size={14} />
                  <span>{shipment.type}</span>
                </div>
                <div className={styles.detailItem}>
                  <DollarSign size={14} />
                  <span>${shipment.price}</span>
                </div>
              </div>
              <div className={styles.cardFooter}>
                <div className={styles.driverInfo}>
                  <div className={styles.avatarMini}>{shipment.driver.charAt(0)}</div>
                  <span>Driver: {shipment.driver}</span>
                </div>
                <button className={styles.viewBtn}>
                  Details <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {filteredShipments.length === 0 && (
          <div className={styles.emptyState}>
            <Package size={48} color="var(--text-light)" />
            <h3>No shipments found</h3>
            <p>Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
