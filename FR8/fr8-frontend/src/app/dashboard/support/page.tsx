"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, MessageSquare, PhoneCall, Ticket, ChevronDown, ChevronUp, Send, Paperclip } from "lucide-react";
import styles from "./Support.module.css";

const faqs = [
  { q: "How do I track my shipment in real-time?", a: "You can track your shipment by navigating to the 'Tracking' tab in your dashboard. Ensure you have the Booking ID handy." },
  { q: "What happens if my driver is delayed?", a: "In case of a delay, our system automatically updates the ETA. You will also receive an animated notification alerting you to the change in schedule." },
  { q: "How are payments processed?", a: "Payments are processed securely through our platform. Once a shipment is marked 'Delivered', the agreed amount is automatically deposited into the carrier's wallet." },
  { q: "Can I change a delivery address after booking?", a: "Address changes can be requested if the shipment status is 'Pending'. Once 'In Transit', you must contact Support to initiate a reroute." },
];

const tickets = [
  { id: "T-8921", subject: "Discrepancy in invoice amount", status: "Open", date: "Today, 10:30 AM" },
  { id: "T-8910", subject: "Update carrier insurance document", status: "Resolved", date: "Oct 20, 2023" },
  { id: "T-8905", subject: "App freezing on load board", status: "In Progress", date: "Oct 18, 2023" },
];

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState("faq");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [chatMsg, setChatMsg] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { sender: "agent", text: "Hi there! I'm Sarah from FR8 Support. How can I help you today?" }
  ]);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleChatSend = () => {
    if (!chatMsg.trim()) return;
    setChatHistory([...chatHistory, { sender: "me", text: chatMsg }]);
    setChatMsg("");
    
    setTimeout(() => {
      setChatHistory(prev => [...prev, { sender: "agent", text: "Thanks for reaching out! Let me check on that for you right now." }]);
    }, 1500);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Customer Support</h2>
        <p>Get help, find answers, and contact our support team.</p>
      </div>

      <div className={styles.navTabs}>
        <button className={`${styles.tabBtn} ${activeTab === 'faq' ? styles.activeTab : ''}`} onClick={() => setActiveTab('faq')}>
          <HelpCircle size={18} /> FAQs
        </button>
        <button className={`${styles.tabBtn} ${activeTab === 'tickets' ? styles.activeTab : ''}`} onClick={() => setActiveTab('tickets')}>
          <Ticket size={18} /> My Tickets
        </button>
        <button className={`${styles.tabBtn} ${activeTab === 'livechat' ? styles.activeTab : ''}`} onClick={() => setActiveTab('livechat')}>
          <MessageSquare size={18} /> Live Chat
        </button>
        <button className={`${styles.tabBtn} ${activeTab === 'contact' ? styles.activeTab : ''}`} onClick={() => setActiveTab('contact')}>
          <PhoneCall size={18} /> Contact Us
        </button>
      </div>

      <div className={styles.contentArea}>
        <AnimatePresence mode="wait">
          
          {activeTab === 'faq' && (
            <motion.div 
              key="faq"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={styles.faqSection}
            >
              <h3>Frequently Asked Questions</h3>
              <div className={styles.faqList}>
                {faqs.map((faq, index) => (
                  <div key={index} className={`${styles.faqItem} ${openFaq === index ? styles.faqOpen : ''}`}>
                    <button className={styles.faqQuestion} onClick={() => toggleFaq(index)}>
                      {faq.q}
                      {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    <AnimatePresence>
                      {openFaq === index && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className={styles.faqAnswerWrapper}
                        >
                          <div className={styles.faqAnswer}>{faq.a}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'tickets' && (
            <motion.div 
              key="tickets"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={styles.ticketSection}
            >
              <div className={styles.sectionHeader}>
                <h3>My Support Tickets</h3>
                <button className="btn btn-primary">Create New Ticket</button>
              </div>
              <div className={styles.ticketList}>
                {tickets.map(ticket => (
                  <div key={ticket.id} className={styles.ticketCard}>
                    <div className={styles.ticketInfo}>
                      <h4>{ticket.subject}</h4>
                      <span>ID: {ticket.id} • {ticket.date}</span>
                    </div>
                    <div className={styles.ticketStatus}>
                      <span className={`${styles.statusBadge} ${styles[ticket.status.replace(" ", "")]}`}>
                        {ticket.status}
                      </span>
                      <button className="btn btn-outline" style={{ padding: '0.25rem 0.75rem' }}>View</button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'livechat' && (
            <motion.div 
              key="livechat"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={styles.chatSection}
            >
              <div className={styles.chatBox}>
                <div className={styles.chatHeader}>
                  <div className={styles.agentInfo}>
                    <div className={styles.agentAvatar}>S</div>
                    <div>
                      <h4>Sarah (Support Agent)</h4>
                      <span>Online • Replies typically in 2 mins</span>
                    </div>
                  </div>
                </div>
                <div className={styles.chatHistory}>
                  {chatHistory.map((msg, idx) => (
                    <div key={idx} className={`${styles.chatMsg} ${msg.sender === 'me' ? styles.msgRight : styles.msgLeft}`}>
                      <div className={styles.bubble}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.chatInputArea}>
                  <button className={styles.attachBtn}><Paperclip size={20} /></button>
                  <input 
                    type="text" 
                    placeholder="Type your message..." 
                    value={chatMsg}
                    onChange={(e) => setChatMsg(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
                  />
                  <button className={styles.sendBtn} onClick={handleChatSend}><Send size={20} /></button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'contact' && (
            <motion.div 
              key="contact"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={styles.contactSection}
            >
              <div className={styles.contactGrid}>
                <div className={styles.contactCard}>
                  <div className={styles.contactIconWrapper}><PhoneCall size={32} /></div>
                  <h3>Call Support</h3>
                  <p>Available 24/7 for urgent shipment issues.</p>
                  <a href="tel:1-800-FR8-HELP" className={styles.contactLink}>1-800-FR8-HELP</a>
                </div>
                
                <div className={styles.contactCard}>
                  <div className={styles.contactIconWrapper}><MessageSquare size={32} /></div>
                  <h3>Email Us</h3>
                  <p>For general inquiries and billing questions.</p>
                  <a href="mailto:support@fr8.com" className={styles.contactLink}>support@fr8.com</a>
                </div>
              </div>

              <div className={styles.feedbackForm}>
                <h3>Submit Feedback</h3>
                <p>We are constantly looking to improve. Let us know how we're doing.</p>
                <div className={styles.formGroup}>
                  <label>Subject</label>
                  <input type="text" placeholder="Briefly describe your feedback" />
                </div>
                <div className={styles.formGroup}>
                  <label>Message</label>
                  <textarea rows={4} placeholder="Tell us what you think..." />
                </div>
                <button className="btn btn-primary">Submit Feedback</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
