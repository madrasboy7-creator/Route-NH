"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, Globe, Moon, Bell, Shield, LogOut, ShieldAlert, CheckCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styles from "./Settings.module.css";
import { useRouter } from "next/navigation";

// Validation Schemas
const profileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone must be at least 10 digits"),
  company: z.string().optional(),
});

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [toast, setToast] = useState<{ show: boolean, msg: string }>({ show: false, msg: "" });
  const router = useRouter();

  const showToast = (msg: string) => {
    setToast({ show: true, msg });
    setTimeout(() => setToast({ show: false, msg: "" }), 3000);
  };

  // Forms
  const { register: registerProfile, handleSubmit: handleProfileSubmit, formState: { errors: profileErrors } } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { fullName: "Admin User", email: "admin@fr8.com", phone: "+1 (555) 123-4567", company: "FR8 Logistics" }
  });

  const { register: registerPassword, handleSubmit: handlePasswordSubmit, formState: { errors: passwordErrors }, reset: resetPassword } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema)
  });

  const onProfileSave = (data: ProfileFormValues) => {
    console.log("Profile updated:", data);
    showToast("Profile settings saved successfully.");
  };

  const onPasswordSave = (data: PasswordFormValues) => {
    console.log("Password updated:", data);
    showToast("Password updated successfully.");
    resetPassword();
  };

  const tabs = [
    { id: "profile", icon: <User size={18} />, label: "Profile" },
    { id: "security", icon: <Lock size={18} />, label: "Password & Security" },
    { id: "preferences", icon: <Globe size={18} />, label: "Preferences" },
    { id: "notifications", icon: <Bell size={18} />, label: "Notifications" },
    { id: "privacy", icon: <Shield size={18} />, label: "Privacy" },
  ];

  return (
    <div className={styles.container}>
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.show && (
          <motion.div 
            className={styles.toast}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            <CheckCircle size={20} />
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>

      <div className={styles.header}>
        <h2>Account Settings</h2>
        <p>Manage your account settings and preferences.</p>
      </div>

      <div className={styles.layout}>
        {/* Sidebar Tabs */}
        <div className={styles.sidebar}>
          <nav className={styles.navMenu}>
            {tabs.map((tab) => (
              <button 
                key={tab.id}
                className={`${styles.navItem} ${activeTab === tab.id ? styles.activeTab : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
            <div className={styles.divider} />
            <button className={`${styles.navItem} ${styles.logoutBtn}`} onClick={() => router.push('/')}>
              <LogOut size={18} /> Logout
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className={styles.content}>
          <AnimatePresence mode="wait">
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div 
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className={styles.tabSection}
              >
                <div className={styles.sectionHeader}>
                  <h3>Profile Information</h3>
                  <p>Update your personal details and public profile.</p>
                </div>

                <form onSubmit={handleProfileSubmit(onProfileSave)} className={styles.form}>
                  <div className={styles.avatarSection}>
                    <div className={styles.avatarLarge}>AU</div>
                    <div>
                      <button type="button" className="btn btn-outline" style={{ marginBottom: '0.5rem' }}>Change Avatar</button>
                      <p className={styles.helpText}>JPG, GIF or PNG. 1MB max.</p>
                    </div>
                  </div>

                  <div className={styles.inputGrid}>
                    <div className={styles.formGroup}>
                      <label>Full Name</label>
                      <input type="text" {...registerProfile("fullName")} className={profileErrors.fullName ? styles.inputError : ''} />
                      {profileErrors.fullName && <span className={styles.errorMsg}>{profileErrors.fullName.message}</span>}
                    </div>

                    <div className={styles.formGroup}>
                      <label>Email Address</label>
                      <input type="email" {...registerProfile("email")} className={profileErrors.email ? styles.inputError : ''} />
                      {profileErrors.email && <span className={styles.errorMsg}>{profileErrors.email.message}</span>}
                    </div>

                    <div className={styles.formGroup}>
                      <label>Phone Number</label>
                      <input type="text" {...registerProfile("phone")} className={profileErrors.phone ? styles.inputError : ''} />
                      {profileErrors.phone && <span className={styles.errorMsg}>{profileErrors.phone.message}</span>}
                    </div>

                    <div className={styles.formGroup}>
                      <label>Company / Organization</label>
                      <input type="text" {...registerProfile("company")} />
                    </div>
                  </div>

                  <div className={styles.formActions}>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <motion.div 
                key="security"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className={styles.tabSection}
              >
                <div className={styles.sectionHeader}>
                  <h3>Change Password</h3>
                  <p>Ensure your account is using a long, random password to stay secure.</p>
                </div>

                <form onSubmit={handlePasswordSubmit(onPasswordSave)} className={styles.form}>
                  <div className={styles.formGroup}>
                    <label>Current Password</label>
                    <input type="password" {...registerPassword("currentPassword")} className={passwordErrors.currentPassword ? styles.inputError : ''} />
                    {passwordErrors.currentPassword && <span className={styles.errorMsg}>{passwordErrors.currentPassword.message}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label>New Password</label>
                    <input type="password" {...registerPassword("newPassword")} className={passwordErrors.newPassword ? styles.inputError : ''} />
                    {passwordErrors.newPassword && <span className={styles.errorMsg}>{passwordErrors.newPassword.message}</span>}
                  </div>

                  <div className={styles.formGroup}>
                    <label>Confirm New Password</label>
                    <input type="password" {...registerPassword("confirmPassword")} className={passwordErrors.confirmPassword ? styles.inputError : ''} />
                    {passwordErrors.confirmPassword && <span className={styles.errorMsg}>{passwordErrors.confirmPassword.message}</span>}
                  </div>

                  <div className={styles.formActions}>
                    <button type="submit" className="btn btn-primary">Update Password</button>
                  </div>
                </form>

                <div className={styles.divider} style={{ margin: '2rem 0' }} />

                <div className={styles.sectionHeader}>
                  <h3>Two-Factor Authentication</h3>
                  <p>Add additional security to your account using two factor authentication.</p>
                </div>
                <div className={styles.alertBox}>
                  <ShieldAlert size={24} className={styles.alertIcon} />
                  <div>
                    <h4>2FA is not enabled</h4>
                    <p>Two-factor authentication adds an extra layer of security to your account.</p>
                  </div>
                  <button className="btn btn-outline">Enable 2FA</button>
                </div>
              </motion.div>
            )}

            {/* Preferences Tab */}
            {activeTab === 'preferences' && (
              <motion.div 
                key="preferences"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className={styles.tabSection}
              >
                <div className={styles.sectionHeader}>
                  <h3>Global Preferences</h3>
                  <p>Customize your dashboard experience.</p>
                </div>

                <div className={styles.prefGrid}>
                  <div className={styles.prefCard}>
                    <div className={styles.prefIcon}><Moon size={24} /></div>
                    <div className={styles.prefInfo}>
                      <h4>Theme Appearance</h4>
                      <p>Select your preferred theme.</p>
                      <select defaultValue="light" className={styles.select}>
                        <option value="light">Light Mode</option>
                        <option value="dark">Dark Mode</option>
                        <option value="system">System Default</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.prefCard}>
                    <div className={styles.prefIcon}><Globe size={24} /></div>
                    <div className={styles.prefInfo}>
                      <h4>Language & Region</h4>
                      <p>Set your dashboard language.</p>
                      <select defaultValue="en-US" className={styles.select}>
                        <option value="en-US">English (US)</option>
                        <option value="es-ES">Español (ES)</option>
                        <option value="fr-FR">Français (FR)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <motion.div 
                key="notifications"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className={styles.tabSection}
              >
                <div className={styles.sectionHeader}>
                  <h3>Notification Preferences</h3>
                  <p>Choose what events you want to be notified about.</p>
                </div>
                
                <div className={styles.toggleList}>
                  {[
                    { title: "New Shipments", desc: "Notify me when a new shipment is created." },
                    { title: "Driver Assignments", desc: "Notify me when a driver is assigned to a load." },
                    { title: "Status Updates", desc: "Get real-time alerts when shipment status changes." },
                    { title: "Payments & Invoices", desc: "Receive alerts for new invoices and paid bills." },
                    { title: "Marketing Emails", desc: "Receive news, special offers, and platform updates." },
                  ].map((item, i) => (
                    <div key={i} className={styles.toggleItem}>
                      <div className={styles.toggleInfo}>
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                      </div>
                      <label className={styles.switch}>
                        <input type="checkbox" defaultChecked={i !== 4} />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  ))}
                </div>
                <div className={styles.formActions} style={{ marginTop: '1.5rem' }}>
                  <button className="btn btn-primary" onClick={() => showToast("Preferences updated.")}>Save Preferences</button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
