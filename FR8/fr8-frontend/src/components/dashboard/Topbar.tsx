"use client";

import { Search, Menu, User, ChevronDown } from "lucide-react";
import styles from "./Topbar.module.css";
import { usePathname } from "next/navigation";
import NotificationCenter from "./NotificationCenter";

interface TopbarProps {
  toggleSidebar: () => void;
}

export default function Topbar({ toggleSidebar }: TopbarProps) {
  const pathname = usePathname();
  
  // Create a readable title from pathname
  const pathParts = pathname.split("/").filter(Boolean);
  let title = "Dashboard";
  
  if (pathParts.length > 2) {
    const lastPart = pathParts[pathParts.length - 1];
    title = lastPart.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  } else if (pathParts.length === 2) {
    const role = pathParts[1];
    title = `${role.charAt(0).toUpperCase() + role.slice(1)} Overview`;
  }

  return (
    <header className={styles.topbar}>
      <div className={styles.left}>
        <button onClick={toggleSidebar} className={styles.menuBtn}>
          <Menu size={24} />
        </button>
        <h1 className={styles.pageTitle}>{title}</h1>
      </div>

      <div className={styles.right}>
        <div className={styles.searchBar}>
          <Search size={18} className={styles.searchIcon} />
          <input type="text" placeholder="Search shipments, IDs..." />
        </div>

        <NotificationCenter />

        <div className={styles.profile}>
          <div className={styles.avatar}>
            <User size={20} />
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>John Doe</span>
            <span className={styles.userRole}>Shipper</span>
          </div>
          <ChevronDown size={16} className={styles.chevron} />
        </div>
      </div>
    </header>
  );
}
