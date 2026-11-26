"use client";

import { useState, useEffect, ReactNode } from "react";
import Skeleton from "@/components/ui/Skeleton";
import { motion } from "framer-motion";

interface DataWrapperProps {
  children: ReactNode;
  skeletonType?: 'dashboard' | 'table' | 'cards' | 'default';
}

export default function DataWrapper({ children, skeletonType = 'default' }: DataWrapperProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // Simulate network latency
    return () => clearTimeout(timer);
  }, []);

  if (!loading) {
    return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{children}</motion.div>;
  }

  // Render Skeletons based on type
  if (skeletonType === 'dashboard') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Skeleton width="200px" height="2rem" />
            <Skeleton width="300px" height="1rem" style={{ marginTop: '0.5rem' }} />
          </div>
          <Skeleton width="120px" height="2.5rem" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          {[1,2,3,4].map(i => <Skeleton key={i} height="120px" borderRadius="16px" />)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
          <Skeleton height="350px" borderRadius="16px" />
          <Skeleton height="350px" borderRadius="16px" />
        </div>
      </div>
    );
  }

  if (skeletonType === 'table') {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Skeleton width="250px" height="2rem" />
          <Skeleton width="150px" height="2.5rem" />
        </div>
        <div style={{ background: 'white', padding: '1rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Skeleton width="200px" height="2.5rem" />
            <Skeleton width="100px" height="2.5rem" />
          </div>
          <Skeleton height="3rem" />
          {[1,2,3,4,5,6].map(i => <Skeleton key={i} height="4rem" />)}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <Skeleton height="3rem" />
      <Skeleton height="10rem" />
      <Skeleton height="5rem" />
    </div>
  );
}
