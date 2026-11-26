"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Package, Truck, ShieldCheck } from "lucide-react";
import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.heroContainer}`}>
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className={styles.title}>
            Smart Logistics, <br />
            <span className={styles.highlight}>Simplified.</span>
          </h1>
          <p className={styles.subtitle}>
            The premium freight management platform connecting shippers, carriers, and drivers with real-time tracking, transparent pricing, and seamless operations.
          </p>
          <div className={styles.actions}>
            <Link href="/auth/signup?role=shipper" className="btn btn-primary">
              Ship with FR8 <ArrowRight size={18} />
            </Link>
            <Link href="/auth/signup?role=carrier" className="btn btn-outline">
              Become a Carrier
            </Link>
          </div>
          <div className={styles.stats}>
            <div className={styles.statItem}>
              <Package className={styles.statIcon} />
              <div>
                <strong>10M+</strong>
                <span>Shipments</span>
              </div>
            </div>
            <div className={styles.statItem}>
              <Truck className={styles.statIcon} />
              <div>
                <strong>50k+</strong>
                <span>Carriers</span>
              </div>
            </div>
            <div className={styles.statItem}>
              <ShieldCheck className={styles.statIcon} />
              <div>
                <strong>100%</strong>
                <span>Insured</span>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div 
          className={styles.graphic}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className={styles.illustrationCard}>
            <div className={styles.animatedTruck}>
              <Truck size={120} color="var(--primary-600)" />
              <motion.div 
                className={styles.speedLines}
                animate={{ x: [-20, 20], opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
              />
            </div>
            <div className={styles.statusCard}>
              <div className={styles.statusDot} />
              <span>In Transit - On Time</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
