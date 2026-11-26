"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Truck, Mail, Lock, User, ArrowRight, Building } from "lucide-react";
import styles from "../Auth.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push("/auth/role-selection");
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authBackground}>
        <div className={styles.shape1} />
        <div className={styles.shape2} />
      </div>
      
      <motion.div 
        className={styles.authCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.authHeader}>
          <Link href="/" className={styles.logo}>
            <Truck size={36} color="var(--primary-600)" />
            <span>FR8</span>
          </Link>
          <h2>Create an Account</h2>
          <p>Join the next generation freight platform.</p>
        </div>

        <form onSubmit={handleSignup} className={styles.authForm}>
          <div className={styles.inputGroup}>
            <label>Full Name</label>
            <div className={styles.inputWrapper}>
              <User className={styles.inputIcon} size={20} />
              <input 
                type="text" 
                name="name"
                placeholder="John Doe" 
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Company Name (Optional)</label>
            <div className={styles.inputWrapper}>
              <Building className={styles.inputIcon} size={20} />
              <input 
                type="text" 
                name="company"
                placeholder="Logistics Corp" 
                value={formData.company}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <div className={styles.inputWrapper}>
              <Mail className={styles.inputIcon} size={20} />
              <input 
                type="email" 
                name="email"
                placeholder="Enter your email" 
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          
          <div className={styles.inputGroup}>
            <label>Password</label>
            <div className={styles.inputWrapper}>
              <Lock className={styles.inputIcon} size={20} />
              <input 
                type="password" 
                name="password"
                placeholder="Create a password" 
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className={`btn btn-primary ${styles.submitBtn}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className={styles.loader}></span>
            ) : (
              <>Create Account <ArrowRight size={18} /></>
            )}
          </button>
        </form>

        <div className={styles.authFooter}>
          <p>Already have an account? <Link href="/auth/login">Sign In</Link></p>
        </div>
      </motion.div>
    </div>
  );
}
