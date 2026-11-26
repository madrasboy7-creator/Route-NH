"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, MoreVertical, MapPin, Truck, Package, X, AlertCircle, Navigation, UserPlus } from "lucide-react";
import styles from "./ShipmentManagement.module.css";
import { shipments } from "../../../../data/mockData";

export default function AdminShipmentManagement() {
  const [localShipments, setLocalShipments] = useState(shipments.slice(0, 50)); // Taking first 50 for admin
  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [modal, setModal] = useState<{ isOpen: boolean; type: string; shipmentId: string | null }>({ isOpen: false, type: '', shipmentId: null });

  const filteredShipments = localShipments.filter(s => 
    s.id.toLowerCase().includes(search.toLowerCase()) || 
    s.shipperName.toLowerCase().includes(search.toLowerCase()) ||
    s.origin.toLowerCase().includes(search.toLowerCase()) ||
    s.destination.toLowerCase().includes(search.toLowerCase())
  );

  const handleAction = (shipmentId: string, action: string) => {
    setActiveMenu(null);
    if (action === 'cancel' || action === 'assign') {
      setModal({ isOpen: true, type: action, shipmentId });
    }
  };

  const confirmAction = () => {
    if (modal.shipmentId) {
      if (modal.type === 'cancel') {
        setLocalShipments(localShipments.map(s => s.id === modal.shipmentId ? { ...s, status: 'Cancelled' } : s));
      } else if (modal.type === 'assign') {
        setLocalShipments(localShipments.map(s => s.id === modal.shipmentId ? { ...s, status: 'In Transit', truckPlate: 'Assigned', driver: 'New Driver' } : s));
      }
    }
    setModal({ isOpen: false, type: '', shipmentId: null });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>Shipment Management</h2>
          <p>Monitor, track, and manage all platform shipments.</p>
        </div>
        <button className="btn btn-primary">Create Manual Shipment</button>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search ID, Shipper, or Location..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className={styles.filters}>
            <button className="btn btn-outline"><Filter size={18} /> Advanced Filters</button>
            <select className={styles.select}>
              <option>All Statuses</option>
              <option>In Transit</option>
              <option>Pending Assignment</option>
              <option>Delayed</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID & Type</th>
                <th>Shipper</th>
                <th>Route (Origin → Dest)</th>
                <th>Carrier / Driver</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredShipments.map((shipment) => (
                <tr key={shipment.id}>
                  <td>
                    <div className={styles.idGroup}>
                      <span className={styles.shipmentId}>{shipment.id}</span>
                      <span className={styles.shipmentType}>{shipment.type}</span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.shipperInfo}>
                      <span className={styles.shipperName}>{shipment.shipperName}</span>
                      <span className={styles.createdDate}>{new Date(shipment.createdDate).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.routeInfo}>
                      <span>{shipment.origin.split(',')[0]}</span>
                      <Navigation size={12} className={styles.routeIcon} />
                      <span>{shipment.destination.split(',')[0]}</span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.carrierInfo}>
                      <div className={styles.carrierName}><Truck size={14} /> {shipment.truckPlate}</div>
                      <div className={styles.driverName}>{shipment.driver}</div>
                    </div>
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${styles[shipment.status.replace(" ", "")]}`}>
                      {shipment.status}
                    </span>
                  </td>
                  <td className={styles.actionsCell}>
                    <div className={styles.menuContainer}>
                      <button 
                        className={styles.iconBtn} 
                        onClick={() => setActiveMenu(activeMenu === shipment.id ? null : shipment.id)}
                      >
                        <MoreVertical size={18} />
                      </button>
                      
                      {activeMenu === shipment.id && (
                        <div className={styles.dropdownMenu}>
                          <button onClick={() => setActiveMenu(null)}><Package size={16} /> View Details</button>
                          
                          {shipment.status === 'Pending Assignment' && (
                            <button onClick={() => handleAction(shipment.id, 'assign')} className={styles.textPrimary}>
                              <UserPlus size={16} /> Assign Driver/Carrier
                            </button>
                          )}
                          
                          {shipment.status !== 'Cancelled' && shipment.status !== 'Delivered' && (
                            <>
                              <div className={styles.menuDivider} />
                              <button onClick={() => handleAction(shipment.id, 'cancel')} className={styles.textDanger}>
                                <X size={16} /> Cancel Shipment
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className={styles.pagination}>
          <span>Showing 1 to {filteredShipments.length} of {localShipments.length} entries</span>
          <div className={styles.pageControls}>
            <button disabled>Prev</button>
            <button className={styles.activePage}>1</button>
            <button>2</button>
            <button>Next</button>
          </div>
        </div>
      </div>

      {/* Action Modal */}
      <AnimatePresence>
        {modal.isOpen && (
          <>
            <motion.div 
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setModal({ isOpen: false, type: '', shipmentId: null })}
            />
            <motion.div 
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <div className={styles.modalHeader}>
                <h3>{modal.type === 'cancel' ? 'Cancel Shipment' : 'Assign Driver/Carrier'}</h3>
                <button onClick={() => setModal({ isOpen: false, type: '', shipmentId: null })}><X size={20} /></button>
              </div>
              <div className={styles.modalBody}>
                {modal.type === 'cancel' ? (
                  <>
                    <div className={styles.modalIconWrapper} style={{ background: '#fee2e2', color: '#dc2626' }}>
                      <AlertCircle size={32} />
                    </div>
                    <h4>Are you sure?</h4>
                    <p>You are about to cancel shipment <strong>{modal.shipmentId}</strong>. This action cannot be undone.</p>
                  </>
                ) : (
                  <div className={styles.assignForm}>
                    <p>Assigning resources to <strong>{modal.shipmentId}</strong></p>
                    <div className={styles.inputGroup}>
                      <label>Select Carrier</label>
                      <select>
                        <option>Swift Freight</option>
                        <option>Texas Haul</option>
                        <option>NW Transport</option>
                      </select>
                    </div>
                    <div className={styles.inputGroup}>
                      <label>Select Driver</label>
                      <select>
                        <option>M. Johnson</option>
                        <option>S. Williams</option>
                        <option>J. Smith</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.modalFooter}>
                <button className="btn btn-outline" onClick={() => setModal({ isOpen: false, type: '', shipmentId: null })}>Close</button>
                <button 
                  className={`btn ${modal.type === 'cancel' ? styles.btnDanger : 'btn-primary'}`} 
                  onClick={confirmAction}
                >
                  Confirm Action
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
