"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Paperclip, Image as ImageIcon, Smile, Mic, MoreVertical, Phone, Video, Search, CheckCheck } from "lucide-react";
import styles from "./ChatSystem.module.css";

const contacts = [
  { id: 1, name: "Michael Johnson", role: "Driver", avatar: "M", status: "online", unread: 2, lastMsg: "I'll be there in 15 mins." },
  { id: 2, name: "Global Electronics", role: "Shipper", avatar: "G", status: "offline", unread: 0, lastMsg: "Please confirm the dimensions." },
  { id: 3, type: "group", name: "Shipment #SHP-84920", members: "You, Global, Michael", avatar: "📦", status: "online", unread: 0, lastMsg: "Michael: Just picked up the load." },
  { id: 4, name: "Support Team", role: "Admin", avatar: "S", status: "online", unread: 0, lastMsg: "Your issue has been resolved." },
];

const initialMessages = [
  { id: 1, sender: "me", text: "Hey Michael, what's your ETA?", time: "10:30 AM", status: "read" },
  { id: 2, sender: "Michael Johnson", text: "Traffic is a bit heavy on I-95. I should be there around 11:15 AM.", time: "10:32 AM", status: "read" },
  { id: 3, sender: "me", text: "Understood. The loading dock is clear.", time: "10:33 AM", status: "read" },
  { id: 4, sender: "Michael Johnson", type: "voice", duration: "0:14", time: "10:35 AM", status: "read" },
  { id: 5, sender: "Michael Johnson", type: "image", url: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80", text: "Just pulled into the yard.", time: "11:10 AM", status: "unread" },
  { id: 6, sender: "Michael Johnson", text: "I'll be there in 15 mins.", time: "11:11 AM", status: "unread" },
];

export default function ChatSystem() {
  const [activeChat, setActiveChat] = useState(contacts[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const newMsg = {
      id: Date.now(),
      sender: "me",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: "sent"
    };
    
    setMessages([...messages, newMsg]);
    setInput("");
    
    // Simulate typing and response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: activeChat.name,
        text: "Got it! Thanks for the update.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: "delivered"
      }]);
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.chatWrapper}>
        
        {/* Sidebar */}
        <div className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h3>Messages</h3>
            <div className={styles.searchBox}>
              <Search size={16} className={styles.searchIcon} />
              <input type="text" placeholder="Search chats..." />
            </div>
          </div>
          
          <div className={styles.contactList}>
            {contacts.map(contact => (
              <div 
                key={contact.id} 
                className={`${styles.contactItem} ${activeChat.id === contact.id ? styles.activeContact : ''}`}
                onClick={() => setActiveChat(contact)}
              >
                <div className={styles.avatarWrapper}>
                  <div className={styles.avatar}>{contact.avatar}</div>
                  {contact.status === 'online' && <div className={styles.onlineDot} />}
                </div>
                <div className={styles.contactInfo}>
                  <div className={styles.contactTop}>
                    <h4>{contact.name}</h4>
                    <span className={styles.time}>11:11 AM</span>
                  </div>
                  <div className={styles.contactBottom}>
                    <p className={styles.lastMsg}>{contact.lastMsg}</p>
                    {contact.unread > 0 && <span className={styles.unreadBadge}>{contact.unread}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className={styles.mainChat}>
          <div className={styles.chatHeader}>
            <div className={styles.chatHeaderInfo}>
              <div className={styles.avatar}>{activeChat.avatar}</div>
              <div>
                <h3>{activeChat.name}</h3>
                <p>{activeChat.type === 'group' ? activeChat.members : activeChat.role}</p>
              </div>
            </div>
            <div className={styles.chatHeaderActions}>
              <button className={styles.iconBtn}><Phone size={20} /></button>
              <button className={styles.iconBtn}><Video size={20} /></button>
              <button className={styles.iconBtn}><MoreVertical size={20} /></button>
            </div>
          </div>

          <div className={styles.messageArea}>
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`${styles.messageWrapper} ${msg.sender === 'me' ? styles.msgRight : styles.msgLeft}`}
                >
                  {msg.sender !== 'me' && (
                    <div className={styles.msgAvatar}>{msg.sender.charAt(0)}</div>
                  )}
                  
                  <div className={styles.messageContent}>
                    {msg.type === 'image' && msg.url ? (
                      <div className={styles.msgImage}>
                        <img src={msg.url} alt="Attachment" />
                        {msg.text && <p className={styles.msgText}>{msg.text}</p>}
                      </div>
                    ) : msg.type === 'voice' ? (
                      <div className={`${styles.msgBubble} ${styles.voiceMsg}`}>
                        <button className={styles.playBtn}>▶</button>
                        <div className={styles.voiceWaveform} />
                        <span>{msg.duration}</span>
                      </div>
                    ) : (
                      <div className={`${styles.msgBubble} ${msg.sender === 'me' ? styles.bubblePrimary : styles.bubbleSecondary}`}>
                        <p>{msg.text}</p>
                      </div>
                    )}
                    
                    <div className={styles.msgMeta}>
                      <span>{msg.time}</span>
                      {msg.sender === 'me' && (
                        <CheckCheck size={14} className={msg.status === 'read' ? styles.readCheck : styles.sentCheck} />
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`${styles.messageWrapper} ${styles.msgLeft}`}
                >
                  <div className={styles.msgAvatar}>{activeChat.avatar}</div>
                  <div className={`${styles.msgBubble} ${styles.bubbleSecondary} ${styles.typingIndicator}`}>
                    <span /><span /><span />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className={styles.inputArea}>
            <button className={styles.attachBtn}><Paperclip size={20} /></button>
            <div className={styles.inputWrapper}>
              <input 
                type="text" 
                placeholder="Type your message..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button className={styles.insideIcon}><ImageIcon size={18} /></button>
              <button className={styles.insideIcon}><Smile size={18} /></button>
            </div>
            {input.trim() ? (
              <button className={styles.sendBtn} onClick={handleSend}><Send size={20} /></button>
            ) : (
              <button className={styles.voiceBtn}><Mic size={20} /></button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
