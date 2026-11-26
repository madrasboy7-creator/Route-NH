import { motion } from 'framer-motion';
import styles from './Skeleton.module.css';

interface SkeletonProps {
  width?: string;
  height?: string;
  borderRadius?: string;
  className?: string;
}

export default function Skeleton({ width = '100%', height = '1rem', borderRadius = '4px', className = '' }: SkeletonProps) {
  return (
    <motion.div
      className={`${styles.skeleton} ${className}`}
      style={{ width, height, borderRadius }}
      animate={{ opacity: [0.5, 0.8, 0.5] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
    />
  );
}
