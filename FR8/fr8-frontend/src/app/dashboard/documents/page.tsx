"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, FileText, Download, Eye, MoreVertical, Search, Filter, ShieldCheck, FileSpreadsheet, X, FileBadge } from "lucide-react";
import styles from "./Documents.module.css";

const documentList = [
  { id: "DOC-001", name: "Invoice_SHP84920.pdf", type: "Invoice", date: "Oct 24, 2023", size: "2.4 MB", status: "Verified" },
  { id: "DOC-002", name: "EWay_Bill_84920.pdf", type: "E-way Bill", date: "Oct 24, 2023", size: "1.1 MB", status: "Verified" },
  { id: "DOC-003", name: "Commercial_Insurance_2023.pdf", type: "Insurance", date: "Jan 15, 2023", size: "5.6 MB", status: "Expiring Soon" },
  { id: "DOC-004", name: "Driver_License_MJ.jpg", type: "License", date: "Mar 10, 2022", size: "3.2 MB", status: "Verified" },
  { id: "DOC-005", name: "Vehicle_Reg_TX8492.pdf", type: "Vehicle Doc", date: "May 05, 2023", size: "1.8 MB", status: "Pending" },
];

export default function DocumentCenter() {
  const [docs, setDocs] = useState(documentList);
  const [filter, setFilter] = useState("All");
  const [previewDoc, setPreviewDoc] = useState<any>(null);
  const [isDragging, setIsDragging] = useState(false);

  const filteredDocs = filter === "All" ? docs : docs.filter(d => d.type === filter);

  const getDocIcon = (type: string) => {
    switch(type) {
      case 'Invoice': return <FileSpreadsheet size={24} className={styles.iconBlue} />;
      case 'E-way Bill': return <FileText size={24} className={styles.iconPurple} />;
      case 'Insurance': return <ShieldCheck size={24} className={styles.iconGreen} />;
      case 'License': return <FileBadge size={24} className={styles.iconOrange} />;
      default: return <FileText size={24} className={styles.iconGray} />;
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Simulate upload
    const newDoc = {
      id: `DOC-00${docs.length + 1}`,
      name: "Uploaded_Document_New.pdf",
      type: "Other",
      date: "Just now",
      size: "1.5 MB",
      status: "Pending"
    };
    setDocs([newDoc, ...docs]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>Document Center</h2>
          <p>Securely manage and preview your freight documents.</p>
        </div>
      </div>

      <div className={styles.mainGrid}>
        {/* Upload Zone */}
        <div className={styles.sideCol}>
          <div 
            className={`${styles.uploadZone} ${isDragging ? styles.dragging : ''}`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <div className={styles.uploadIconWrapper}>
              <UploadCloud size={48} />
            </div>
            <h3>Upload Documents</h3>
            <p>Drag and drop files here, or click to browse.</p>
            <span className={styles.uploadHint}>Supports PDF, JPG, PNG (Max 10MB)</span>
            <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Browse Files</button>
          </div>

          <div className={styles.storageCard}>
            <h3>Storage Usage</h3>
            <div className={styles.storageBar}>
              <div className={styles.storageFill} style={{ width: '65%' }} />
            </div>
            <div className={styles.storageInfo}>
              <span>6.5 GB Used</span>
              <span>10 GB Total</span>
            </div>
          </div>
        </div>

        {/* Document List */}
        <div className={styles.listCol}>
          <div className={styles.toolbar}>
            <div className={styles.searchBox}>
              <Search size={18} className={styles.searchIcon} />
              <input type="text" placeholder="Search documents..." />
            </div>
            
            <div className={styles.filterTabs}>
              {["All", "Invoice", "E-way Bill", "Insurance", "License", "Vehicle Doc"].map(tab => (
                <button 
                  key={tab}
                  className={`${styles.tabBtn} ${filter === tab ? styles.activeTab : ""}`}
                  onClick={() => setFilter(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.docGrid}>
            <AnimatePresence>
              {filteredDocs.map((doc) => (
                <motion.div 
                  key={doc.id}
                  className={styles.docCard}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={styles.docIconArea}>
                    {getDocIcon(doc.type)}
                  </div>
                  <div className={styles.docInfo}>
                    <h4 title={doc.name}>{doc.name}</h4>
                    <div className={styles.docMeta}>
                      <span>{doc.size}</span>
                      <span className={styles.dot}>•</span>
                      <span>{doc.date}</span>
                    </div>
                    <span className={`${styles.statusBadge} ${styles[doc.status.replace(" ", "")]}`}>
                      {doc.status}
                    </span>
                  </div>
                  <div className={styles.docActions}>
                    <button className={styles.iconBtn} onClick={() => setPreviewDoc(doc)} title="Preview">
                      <Eye size={18} />
                    </button>
                    <button className={styles.iconBtn} title="Download">
                      <Download size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewDoc && (
          <>
            <motion.div 
              className={styles.modalOverlay}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewDoc(null)}
            />
            <motion.div 
              className={styles.previewModal}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <div className={styles.modalHeader}>
                <div className={styles.modalHeaderInfo}>
                  {getDocIcon(previewDoc.type)}
                  <div>
                    <h3>{previewDoc.name}</h3>
                    <span>{previewDoc.type} • {previewDoc.size}</span>
                  </div>
                </div>
                <div className={styles.modalHeaderActions}>
                  <button className="btn btn-primary" style={{ padding: '0.5rem 1rem' }}>
                    <Download size={16} /> Download
                  </button>
                  <button className={styles.closeBtn} onClick={() => setPreviewDoc(null)}>
                    <X size={24} />
                  </button>
                </div>
              </div>
              <div className={styles.modalBody}>
                {/* Mocking a document preview with a skeleton or image */}
                <div className={styles.mockDocument}>
                  <div className={styles.mockDocHeader}>
                    <h2>FR8 LOGISTICS</h2>
                    <div>INVOICE #2938</div>
                  </div>
                  <div className={styles.mockDocLines}>
                    <div className={styles.line} />
                    <div className={styles.line} style={{ width: '80%' }} />
                    <div className={styles.line} style={{ width: '90%' }} />
                    <div className={styles.line} style={{ width: '60%' }} />
                    <br /><br />
                    <div className={styles.line} />
                    <div className={styles.line} style={{ width: '80%' }} />
                    <div className={styles.line} style={{ width: '90%' }} />
                    <div className={styles.line} style={{ width: '60%' }} />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
