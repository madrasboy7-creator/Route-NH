"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Package, Truck, Navigation, AlertCircle, CheckCircle, DollarSign, X } from "lucide-react";
import styles from "./NotificationCenter.module.css";

const notificationsList = [
  { id: 1, type: "booking", title: "Booking Created", desc: "Shipment #SHP-84920 has been created successfully.", time: "2 mins ago", read: false },
  { id: 2, type: "assigned", title: "Driver Assigned", desc: "Michael Johnson has been assigned to #SHP-84918.", time: "15 mins ago", read: false },
  { id: 3, type: "started", title: "Trip Started", desc: "Shipment #SHP-84918 is now in transit.", time: "1 hour ago", read: true },
  { id: 4, type: "delayed", title: "Shipment Delayed", desc: "#SHP-84917 is delayed due to weather conditions.", time: "3 hours ago", read: true },
  { id: 5, type: "delivered", title: "Shipment Delivered", desc: "#SHP-84900 has been successfully delivered.", time: "1 day ago", read: true },
  { id: 6, type: "payment", title: "Payment Completed", desc: "Invoice #INV-2938 has been paid ($1,250).", time: "2 days ago", read: true },
];

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(notificationsList);
  
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: string) => {
    switch(type) {
      case 'booking': return <Package size={16} className={styles.iconBlue} />;
      case 'assigned': return <Truck size={16} className={styles.iconPurple} />;
      case 'started': return <Navigation size={16} className={styles.iconIndigo} />;
      case 'delayed': return <AlertCircle size={16} className={styles.iconOrange} />;
      case 'delivered': return <CheckCircle size={16} className={styles.iconGreen} />;
      case 'payment': return <DollarSign size={16} className={styles.iconGreen} />;
      default: return <Bell size={16} />;
    }
  };

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const removeNotification = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className={styles.container}>
      <button 
        className={styles.triggerBtn} 
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className={styles.badge}>
            <motion.span 
              key={unreadCount}
              initial={{ scale: 0.5 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring" }}
            >
              {unreadCount}
            </motion.span>
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              className={styles.overlay} 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setIsOpen(false)}
            />
            <motion.div 
              className={styles.dropdown}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.header}>
                <h3>Notifications</h3>
                <button className={styles.markReadBtn} onClick={markAllRead}>Mark all as read</button>
              </div>
              
              <div className={styles.list}>
                {notifications.length > 0 ? (
                  notifications.map((notif) => (
                    <motion.div 
                      key={notif.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`${styles.item} ${notif.read ? styles.read : ''}`}
                    >
                      <div className={styles.itemIcon}>
                        {getIcon(notif.type)}
                      </div>
                      <div className={styles.itemContent}>
                        <h4>{notif.title}</h4>
                        <p>{notif.desc}</p>
                        <span>{notif.time}</span>
                      </div>
                      <button className={styles.closeBtn} onClick={(e) => removeNotification(e, notif.id)}>
                        <X size={14} />
                      </button>
                    </motion.div>
                  ))
                ) : (
                  <div className={styles.empty}>
                    <Bell size={32} />
                    <p>No notifications</p>
                  </div>
                )}
              </div>
              
              <div className={styles.footer}>
                <button>View All Activity</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
