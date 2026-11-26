"use client";

import { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import Topbar from "@/components/dashboard/Topbar";
import PageTransition from "@/components/PageTransition";
import { AnimatePresence } from "framer-motion";
import styles from "./DashboardLayout.module.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className={styles.layout}>
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className={`${styles.mainContent} ${!sidebarOpen ? styles.expanded : ""}`}>
        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className={styles.pageContent}>
          <AnimatePresence mode="wait">
            <PageTransition>
              {children}
            </PageTransition>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
