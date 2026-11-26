"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Package, Truck, UserCog, Briefcase, Map, ArrowRight } from "lucide-react";
import styles from "./RoleSelection.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";

const roles = [
  {
    id: "shipper",
    title: "Shipper",
    description: "Post loads, track shipments, and manage payments.",
    icon: <Package size={48} />,
    color: "var(--primary-600)",
    path: "/dashboard/shipper"
  },
  {
    id: "carrier",
    title: "Carrier",
    description: "Find loads, manage drivers, and track fleet earnings.",
    icon: <Briefcase size={48} />,
    color: "var(--accent-500)",
    path: "/dashboard/carrier"
  },
  {
    id: "driver",
    title: "Driver",
    description: "View assigned trips, update statuses, and navigate.",
    icon: <Truck size={48} />,
    color: "#10b981",
    path: "/dashboard/driver"
  },
  {
    id: "dispatcher",
    title: "Dispatcher",
    description: "Assign loads, monitor fleet operations in real-time.",
    icon: <Map size={48} />,
    color: "#8b5cf6",
    path: "/dashboard/dispatcher"
  },
  {
    id: "admin",
    title: "Administrator",
    description: "System overview, user management, and analytics.",
    icon: <UserCog size={48} />,
    color: "#f43f5e",
    path: "/dashboard/admin"
  }
];

export default function RoleSelectionPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleSelectRole = (role: typeof roles[0]) => {
    setSelectedRole(role.id);
    setIsNavigating(true);
    
    // Simulate navigation delay for animation
    setTimeout(() => {
      router.push(role.path);
    }, 800);
  };

  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.shape1} />
        <div className={styles.shape2} />
      </div>

      <div className={`container ${styles.content}`}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>Select Your Role</h1>
          <p>Choose how you want to use the FR8 platform today.</p>
        </motion.div>

        <div className={styles.grid}>
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              className={`${styles.card} ${selectedRole === role.id ? styles.selected : ''} ${isNavigating && selectedRole !== role.id ? styles.faded : ''}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={!isNavigating ? { y: -10, scale: 1.02 } : {}}
              onClick={() => !isNavigating && handleSelectRole(role)}
            >
              <div 
                className={styles.iconWrapper}
                style={{ color: role.color, backgroundColor: `${role.color}15` }}
              >
                {role.icon}
              </div>
              <h3>{role.title}</h3>
              <p>{role.description}</p>
              
              <div className={styles.cardAction}>
                <span>Continue as {role.title}</span>
                <ArrowRight size={20} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
