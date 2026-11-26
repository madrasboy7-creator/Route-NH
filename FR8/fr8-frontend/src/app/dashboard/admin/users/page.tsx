"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, MoreVertical, Edit2, Trash2, ShieldOff, CheckCircle, UserPlus, FileText } from "lucide-react";
import styles from "./Users.module.css";
import { drivers } from "../../../../data/mockData";

export default function AdminUsersPage() {
  // Mapping the generated drivers to users structure
  const [users, setUsers] = useState(drivers.slice(0, 30).map(d => ({
    id: d.id.split('-')[0],
    name: d.name,
    email: `${d.name.split(' ')[0].toLowerCase()}@example.com`,
    role: "Driver",
    status: d.status === "Available" || d.status === "In Transit" ? "Active" : "Suspended",
    joined: new Date(d.joinedDate).toLocaleDateString()
  })));

  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const toggleStatus = (id: string) => {
    setUsers(users.map(u => {
      if (u.id === id) {
        return { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' };
      }
      return u;
    }));
    setActiveMenu(null);
  };

  const deleteUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
    setActiveMenu(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>User Management</h2>
          <p>Manage platform users, roles, and access controls.</p>
        </div>
        <button className="btn btn-primary"><UserPlus size={18} /> Add User</button>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Search size={18} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search by name, email, or ID..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className={styles.filters}>
            <button className="btn btn-outline"><Filter size={18} /> Filter</button>
            <button className="btn btn-outline"><FileText size={18} /> Export</button>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User</th>
                <th>Contact Info</th>
                <th>Role</th>
                <th>Joined Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {filteredUsers.map((user) => (
                  <motion.tr 
                    key={user.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td>
                      <div className={styles.userInfo}>
                        <div className={styles.avatar}>{user.name.charAt(0)}</div>
                        <div className={styles.userName}>
                          <strong>{user.name}</strong>
                          <span>ID: {user.id}</span>
                        </div>
                      </div>
                    </td>
                    <td><span className={styles.textGray}>{user.email}</span></td>
                    <td><span className={styles.roleBadge}>{user.role}</span></td>
                    <td><span className={styles.textGray}>{user.joined}</span></td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[user.status]}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className={styles.actionsCell}>
                      <div className={styles.menuContainer}>
                        <button 
                          className={styles.iconBtn} 
                          onClick={() => setActiveMenu(activeMenu === user.id ? null : user.id)}
                        >
                          <MoreVertical size={18} />
                        </button>
                        
                        {activeMenu === user.id && (
                          <div className={styles.dropdownMenu}>
                            <button onClick={() => setActiveMenu(null)}><Edit2 size={16} /> Edit Profile</button>
                            {user.status === 'Active' ? (
                              <button onClick={() => toggleStatus(user.id)} className={styles.textWarning}>
                                <ShieldOff size={16} /> Suspend User
                              </button>
                            ) : (
                              <button onClick={() => toggleStatus(user.id)} className={styles.textSuccess}>
                                <CheckCircle size={16} /> Activate User
                              </button>
                            )}
                            <div className={styles.menuDivider} />
                            <button onClick={() => deleteUser(user.id)} className={styles.textDanger}>
                              <Trash2 size={16} /> Delete User
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        
        <div className={styles.pagination}>
          <span>Showing 1 to {filteredUsers.length} of {users.length} entries</span>
          <div className={styles.pageControls}>
            <button disabled>Prev</button>
            <button className={styles.activePage}>1</button>
            <button>2</button>
            <button>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
