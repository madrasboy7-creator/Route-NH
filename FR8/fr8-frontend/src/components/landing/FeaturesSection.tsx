"use client";

import { motion } from "framer-motion";
import { Activity, Shield, Clock, Map, CreditCard, Headphones } from "lucide-react";
import styles from "./FeaturesSection.module.css";

const features = [
  {
    icon: <Activity size={32} />,
    title: "Real-time Tracking",
    description: "Monitor your shipments live on an interactive map with predictive ETAs."
  },
  {
    icon: <Shield size={32} />,
    title: "Verified Network",
    description: "Every carrier and driver is thoroughly vetted to ensure maximum reliability and safety."
  },
  {
    icon: <Clock size={32} />,
    title: "Instant Booking",
    description: "Get instant quotes and book trucks in seconds, completely eliminating manual negotiations."
  },
  {
    icon: <Map size={32} />,
    title: "Smart Routing",
    description: "Optimize delivery routes automatically to save fuel, time, and reduce carbon emissions."
  },
  {
    icon: <CreditCard size={32} />,
    title: "Fast Payments",
    description: "Automated invoicing and quick payments ensure carriers get paid within 48 hours."
  },
  {
    icon: <Headphones size={32} />,
    title: "24/7 Support",
    description: "Our dedicated logistics experts are available around the clock to assist you."
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className={styles.featuresSection}>
      <div className={`container ${styles.container}`}>
        <div className={styles.header}>
          <h2>Why Choose <span className="text-primary">FR8</span></h2>
          <p>We provide a comprehensive suite of tools designed to make freight management seamless and efficient.</p>
        </div>
        
        <div className={styles.grid}>
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className={styles.card}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className={styles.iconWrapper}>
                {feature.icon}
              </div>
              <h3 className={styles.cardTitle}>{feature.title}</h3>
              <p className={styles.cardDescription}>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
