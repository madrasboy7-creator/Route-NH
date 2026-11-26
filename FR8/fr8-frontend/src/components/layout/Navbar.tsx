"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Truck } from "lucide-react";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <motion.nav 
      className={styles.navbar}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <Truck size={32} color="var(--primary-600)" />
          <span>FR8</span>
        </Link>
        <div className={styles.navLinks}>
          <Link href="#features">Features</Link>
          <Link href="#how-it-works">How It Works</Link>
          <Link href="#pricing">Pricing</Link>
        </div>
        <div className={styles.navActions}>
          <Link href="/auth/login" className="btn btn-outline">Login</Link>
          <Link href="/auth/signup" className="btn btn-primary">Sign Up</Link>
        </div>
      </div>
    </motion.nav>
  );
}
