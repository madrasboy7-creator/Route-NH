"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, AlertTriangle, CheckCircle, Clock, Wrench, Search, Plus, Filter, ShieldCheck, MapPin } from "lucide-react";
import styles from "./Vehicles.module.css";
import { trucks } from "../../../../data/mockData";

export default function VehicleManagement() {
  // Mapping mock data into the required format for this UI
  const [vehicles, setVehicles] = useState(trucks.map(t => ({
    ...t,
    name: `${t.make} ${t.model}`,
    plate: t.plateNumber,
    alerts: t.status === 'Maintenance' ? ['Routine service required'] : (t.insuranceExpiry < new Date().toISOString() ? ['Insurance expiring soon'] : [])
  })));
  
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);

  const filteredVehicles = vehicles.filter(v => {
    const matchesFilter = filter === "All" || v.status === filter;
    const matchesSearch = v.name.toLowerCase().includes(search.toLowerCase()) || v.plate.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>Vehicle Fleet</h2>
          <p>Manage and monitor your trucks, maintenance schedules, and capacity.</p>
        </div>
        <button className="btn btn-primary"><Plus size={18} /> Add Vehicle</button>
      </div>

      <div className={styles.toolbar}>
        <div className={styles.searchBox}>
          <Search size={18} className={styles.searchIcon} />
          <input 
            type="text" 
            placeholder="Search by name or plate..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className={styles.filterTabs}>
          {["All", "Available", "In Transit", "Maintenance"].map(tab => (
            <button 
              key={tab}
              className={`${styles.tabBtn} ${filter === tab ? styles.activeTab : ""}`}
              onClick={() => setFilter(tab)}
            >
              {tab}
            </button>
          ))}
          <button className="btn btn-outline" style={{ marginLeft: '1rem', padding: '0.5rem 1rem' }}><Filter size={18} /> Advanced</button>
        </div>
      </div>

      <div className={styles.grid}>
        <AnimatePresence>
          {filteredVehicles.map(vehicle => (
            <motion.div 
              key={vehicle.id}
              className={styles.card}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={() => setSelectedVehicle(vehicle)}
            >
              <div className={styles.cardHeader}>
                <div className={styles.vTitle}>
                  <h3>{vehicle.name}</h3>
                  <span className={styles.vPlate}>{vehicle.plate}</span>
                </div>
                <span className={`${styles.statusBadge} ${styles[vehicle.status.replace(" ", "")]}`}>
                  {vehicle.status}
                </span>
              </div>

              <div className={styles.vImage}>
                <Truck size={48} color="var(--primary-300)" />
                <span className={styles.vType}>{vehicle.type}</span>
              </div>

              <div className={styles.detailsGrid}>
                <div className={styles.detailItem}>
                  <span className={styles.dLabel}>Capacity</span>
                  <span className={styles.dValue}>{vehicle.capacity}</span>
                </div>
                <div className={styles.detailItem}>
                  <span className={styles.dLabel}>Location</span>
                  <span className={styles.dValue}><MapPin size={14} style={{ display: 'inline', verticalAlign: 'text-bottom' }}/> {vehicle.location}</span>
                </div>
              </div>

              {vehicle.alerts.length > 0 && (
                <div className={styles.alertsArea}>
                  <AlertTriangle size={14} />
                  <span>{vehicle.alerts.length} Alert{vehicle.alerts.length > 1 ? 's' : ''} Active</span>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Side Panel for Vehicle Details */}
      <AnimatePresence>
        {selectedVehicle && (
          <>
            <motion.div 
              className={styles.overlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedVehicle(null)}
            />
            <motion.div 
              className={styles.sidePanel}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className={styles.panelHeader}>
                <div>
                  <h2>{selectedVehicle.name}</h2>
                  <p>{selectedVehicle.plate}</p>
                </div>
                <button className={styles.closeBtn} onClick={() => setSelectedVehicle(null)}>✕</button>
              </div>

              <div className={styles.panelBody}>
                {selectedVehicle.alerts.length > 0 && (
                  <div className={styles.alertBox}>
                    <h4><AlertTriangle size={18} /> Active Alerts</h4>
                    <ul>
                      {selectedVehicle.alerts.map((alert: string, i: number) => (
                        <li key={i}>{alert}</li>
                      ))}
                    </ul>
                    {selectedVehicle.status === 'Maintenance' && (
                      <button className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }}>Mark Service Complete</button>
                    )}
                  </div>
                )}

                <div className={styles.infoSection}>
                  <h3>Specifications</h3>
                  <div className={styles.infoRow}><span>Type</span><strong>{selectedVehicle.type}</strong></div>
                  <div className={styles.infoRow}><span>Capacity</span><strong>{selectedVehicle.capacity}</strong></div>
                  <div className={styles.infoRow}><span>Current Location</span><strong>{selectedVehicle.location}</strong></div>
                </div>

                <div className={styles.infoSection}>
                  <h3>Maintenance & Compliance</h3>
                  <div className={styles.infoRow}>
                    <span>Insurance</span>
                    <strong className={selectedVehicle.alerts.some((a:string)=>a.includes('Insurance')) ? styles.textWarning : styles.textSuccess}>
                      <ShieldCheck size={16} /> {new Date(selectedVehicle.insuranceExpiry).toLocaleDateString()}
                    </strong>
                  </div>
                  <div className={styles.infoRow}>
                    <span>Last Service</span>
                    <strong><Clock size={16} /> {new Date(selectedVehicle.lastService).toLocaleDateString()}</strong>
                  </div>
                </div>

                <div className={styles.infoSection}>
                  <h3>Service History</h3>
                  <div className={styles.timeline}>
                    <div className={styles.timelineItem}>
                      <div className={styles.timelineDot} />
                      <div className={styles.timelineContent}>
                        <h4>Oil Change & Tire Rotation</h4>
                        <p>Completed 2 months ago at 145,000 mi</p>
                      </div>
                    </div>
                    <div className={styles.timelineItem}>
                      <div className={styles.timelineDot} />
                      <div className={styles.timelineContent}>
                        <h4>Brake Inspection</h4>
                        <p>Completed 6 months ago at 110,000 mi</p>
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-outline" style={{ width: '100%', marginTop: '1rem' }}>View Full History</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
