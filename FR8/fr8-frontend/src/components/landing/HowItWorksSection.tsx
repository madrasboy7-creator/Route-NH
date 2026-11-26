"use client";

import { motion } from "framer-motion";
import styles from "./HowItWorks.module.css";
import { Search, CheckCircle, Truck, PackageCheck } from "lucide-react";

const steps = [
  {
    icon: <Search size={40} />,
    title: "Post Your Load",
    description: "Enter your pickup, drop-off details, and cargo type. Get instant price estimates."
  },
  {
    icon: <CheckCircle size={40} />,
    title: "Carrier Acceptance",
    description: "Verified carriers in your area instantly receive notifications and accept the load."
  },
  {
    icon: <Truck size={40} />,
    title: "Live Tracking",
    description: "Track your freight in real-time on our interactive map from pickup to delivery."
  },
  {
    icon: <PackageCheck size={40} />,
    title: "Proof of Delivery",
    description: "Digital PODs and automated invoicing complete the seamless process."
  }
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className={styles.howItWorks}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2>How It Works</h2>
          <p>Four simple steps to digitize your logistics and supply chain.</p>
        </div>
        
        <div className={styles.stepsContainer}>
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className={styles.stepCard}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className={styles.iconContainer}>
                {step.icon}
                {index < steps.length - 1 && (
                  <div className={styles.connector} />
                )}
              </div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
