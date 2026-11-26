"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Truck, LayoutDashboard, Package, Map, History, Wallet, Settings, 
  Menu, Users, FileText, ChevronLeft, ChevronRight, BarChart2, MessageSquare, HelpCircle
} from "lucide-react";
import styles from "./Sidebar.module.css";
import { motion } from "framer-motion";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const pathname = usePathname();
  
  // Determine role based on pathname
  const role = pathname.split("/")[2] || "shipper"; // default to shipper

  const getLinks = () => {
    const baseLinks = (() => {
      switch(role) {
        case "shipper":
          return [
            { name: "Dashboard", href: "/dashboard/shipper", icon: <LayoutDashboard size={20} /> },
            { name: "Create Shipment", href: "/dashboard/shipper/create-shipment", icon: <Package size={20} /> },
            { name: "Tracking", href: "/dashboard/shipper/tracking", icon: <Map size={20} /> },
            { name: "History", href: "/dashboard/shipper/history", icon: <History size={20} /> },
            { name: "Billing", href: "/dashboard/shipper/billing", icon: <Wallet size={20} /> },
          ];
        case "driver":
          return [
            { name: "Dashboard", href: "/dashboard/driver", icon: <LayoutDashboard size={20} /> },
            { name: "Available Loads", href: "/dashboard/driver/loads", icon: <Package size={20} /> },
            { name: "Trip History", href: "/dashboard/driver/history", icon: <History size={20} /> },
            { name: "Earnings", href: "/dashboard/driver/earnings", icon: <Wallet size={20} /> },
          ];
        case "admin":
          return [
            { name: "Dashboard", href: "/dashboard/admin", icon: <LayoutDashboard size={20} /> },
            { name: "Users", href: "/dashboard/admin/users", icon: <Users size={20} /> },
            { name: "Shipments", href: "/dashboard/admin/shipments", icon: <Package size={20} /> },
          ];
        default:
          return [
            { name: "Dashboard", href: `/dashboard/${role}`, icon: <LayoutDashboard size={20} /> },
          ];
      }
    })();

    // Add global shared features
    return [
      ...baseLinks,
      { name: "Reports", href: "/dashboard/reports", icon: <BarChart2 size={20} /> },
      { name: "Messages", href: "/dashboard/chat", icon: <MessageSquare size={20} /> },
      { name: "Documents", href: "/dashboard/documents", icon: <FileText size={20} /> },
      { name: "Vehicles", href: "/dashboard/vehicles", icon: <Truck size={20} /> },
      { name: "Support", href: "/dashboard/support", icon: <HelpCircle size={20} /> },
    ];
  };

  const links = getLinks();

  return (
    <motion.aside 
      className={`${styles.sidebar} ${!isOpen ? styles.collapsed : ""}`}
      initial={false}
      animate={{ width: isOpen ? 280 : 80 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.header}>
        {isOpen ? (
          <Link href="/" className={styles.logo}>
            <Truck size={32} color="var(--primary-600)" />
            <span>FR8</span>
          </Link>
        ) : (
          <Link href="/" className={styles.logoCollapsed}>
            <Truck size={32} color="var(--primary-600)" />
          </Link>
        )}
      </div>

      <nav className={styles.nav}>
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.name} 
              href={link.href}
              className={`${styles.navItem} ${isActive ? styles.active : ""}`}
              title={!isOpen ? link.name : ""}
            >
              <span className={styles.icon}>{link.icon}</span>
              {isOpen && <span className={styles.label}>{link.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className={styles.footer}>
        <Link href={`/dashboard/${role}/settings`} className={styles.navItem} title={!isOpen ? "Settings" : ""}>
          <span className={styles.icon}><Settings size={20} /></span>
          {isOpen && <span className={styles.label}>Settings</span>}
        </Link>
      </div>
    </motion.aside>
  );
}
