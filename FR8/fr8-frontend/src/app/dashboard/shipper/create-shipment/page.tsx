"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Clock, ArrowRight, ArrowLeft, Package, Truck, DollarSign, CheckCircle } from "lucide-react";
import styles from "./CreateShipment.module.css";

const steps = [
  { id: 1, title: "Route & Time", icon: <MapPin size={20} /> },
  { id: 2, title: "Cargo Details", icon: <Package size={20} /> },
  { id: 3, title: "Vehicle Selection", icon: <Truck size={20} /> },
  { id: 4, title: "Price Estimate", icon: <DollarSign size={20} /> },
  { id: 5, title: "Confirmation", icon: <CheckCircle size={20} /> },
];

const vehicles = [
  { id: 'v1', name: 'Mini Truck', capacity: '750 kg', price: 150, eta: '30 mins', img: '🚚' },
  { id: 'v2', name: 'Pickup', capacity: '1.5 Tons', price: 200, eta: '45 mins', img: '🛻' },
  { id: 'v3', name: 'LCV', capacity: '3.5 Tons', price: 350, eta: '1 hr', img: '🚛' },
  { id: 'v4', name: 'Container', capacity: '10 Tons', price: 800, eta: '2 hrs', img: '📦' },
  { id: 'v5', name: 'Trailer', capacity: '20 Tons', price: 1500, eta: '3 hrs', img: '🚚' },
  { id: 'v6', name: 'Refrigerated', capacity: '5 Tons', price: 600, eta: '1.5 hrs', img: '❄️' },
  { id: 'v7', name: 'Flatbed', capacity: '15 Tons', price: 1200, eta: '2 hrs', img: '🏗️' },
  { id: 'v8', name: 'Tanker', capacity: '20k L', price: 1800, eta: '4 hrs', img: '🛢️' }
];

export default function CreateShipmentWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    pickup: "",
    dropoff: "",
    date: "",
    time: "",
    weight: "",
    dimensions: "",
    goodsType: "",
    fragile: false,
    hazardous: false,
    tempControlled: false,
    insurance: false,
    vehicle: null as string | null,
  });

  const [isBooking, setIsBooking] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const handleNext = () => {
    if (currentStep < 5) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleBook = () => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      setBookingId("FR8-" + Math.floor(100000 + Math.random() * 900000));
      setCurrentStep(5);
    }, 2000);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div 
            className={styles.stepContent}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h3>Route & Scheduling</h3>
            <div className={styles.mapMockup}>
              <div className={styles.mapPins}>
                <div className={styles.pinPickup}><MapPin size={24} /></div>
                <div className={styles.routeLine} />
                <div className={styles.pinDrop}><MapPin size={24} /></div>
              </div>
              <div className={styles.mapOverlay}>Interactive Map View</div>
            </div>
            
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label>Pickup Location</label>
                <div className={styles.inputWrapper}>
                  <MapPin className={styles.inputIcon} size={18} color="var(--primary-500)" />
                  <input type="text" placeholder="Search pickup address..." defaultValue="123 Logistics Way, Chicago, IL" />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label>Drop-off Location</label>
                <div className={styles.inputWrapper}>
                  <MapPin className={styles.inputIcon} size={18} color="var(--accent-500)" />
                  <input type="text" placeholder="Search destination..." defaultValue="456 Commerce Blvd, New York, NY" />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label>Pickup Date</label>
                <div className={styles.inputWrapper}>
                  <Calendar className={styles.inputIcon} size={18} />
                  <input type="date" />
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label>Pickup Time</label>
                <div className={styles.inputWrapper}>
                  <Clock className={styles.inputIcon} size={18} />
                  <input type="time" />
                </div>
              </div>
            </div>
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div 
            className={styles.stepContent}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h3>Cargo Details</h3>
            <div className={styles.formGrid}>
              <div className={styles.inputGroup}>
                <label>Total Weight (kg/tons)</label>
                <input type="text" placeholder="e.g. 5000 kg" />
              </div>
              <div className={styles.inputGroup}>
                <label>Dimensions (L x W x H)</label>
                <input type="text" placeholder="e.g. 10 x 5 x 6 ft" />
              </div>
              <div className={styles.inputGroup}>
                <label>Goods Type</label>
                <select>
                  <option>Electronics</option>
                  <option>FMCG</option>
                  <option>Textiles</option>
                  <option>Machinery</option>
                  <option>Perishables</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <h4 className={styles.sectionTitle}>Special Handling</h4>
            <div className={styles.checkboxGrid}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" /> 
                <div className={styles.checkboxCustom} />
                Fragile
              </label>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" /> 
                <div className={styles.checkboxCustom} />
                Hazardous Material
              </label>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" /> 
                <div className={styles.checkboxCustom} />
                Temperature Controlled
              </label>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" /> 
                <div className={styles.checkboxCustom} />
                Require Insurance (+5% fee)
              </label>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div 
            className={styles.stepContent}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h3>Select Vehicle</h3>
            <div className={styles.vehicleGrid}>
              {vehicles.map(v => (
                <motion.div 
                  key={v.id}
                  className={`${styles.vehicleCard} ${formData.vehicle === v.id ? styles.selectedVehicle : ''}`}
                  onClick={() => setFormData({...formData, vehicle: v.id})}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <div className={styles.vehicleImg}>{v.img}</div>
                  <h4>{v.name}</h4>
                  <p>Capacity: {v.capacity}</p>
                  <div className={styles.vehicleMeta}>
                    <span className={styles.vPrice}>${v.price}</span>
                    <span className={styles.vEta}>ETA: {v.eta}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div 
            className={styles.stepContent}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <h3>Price Estimation</h3>
            <div className={styles.receiptCard}>
              <div className={styles.receiptHeader}>
                <h4>Shipment Quote</h4>
                <span>Valid for 15 mins</span>
              </div>
              
              <div className={styles.receiptLine}>
                <span>Base Fare (790 miles)</span>
                <span>$850.00</span>
              </div>
              <div className={styles.receiptLine}>
                <span>Fuel Surcharge</span>
                <span>$125.50</span>
              </div>
              <div className={styles.receiptLine}>
                <span>Insurance (Premium)</span>
                <span>$45.00</span>
              </div>
              <div className={styles.receiptLine}>
                <span>Taxes & Fees</span>
                <span>$68.25</span>
              </div>
              
              <div className={styles.divider} />
              
              <div className={styles.receiptTotal}>
                <span>Total Cost</span>
                <motion.span 
                  initial={{ scale: 0.5, color: 'var(--text-dark)' }}
                  animate={{ scale: 1, color: 'var(--primary-600)' }}
                  transition={{ type: "spring", stiffness: 300, delay: 0.2 }}
                >
                  $1,088.75
                </motion.span>
              </div>
            </div>
          </motion.div>
        );

      case 5:
        return (
          <motion.div 
            className={styles.successContent}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring" }}
          >
            <div className={styles.successIconWrapper}>
              <CheckCircle size={64} className={styles.successIcon} />
              <motion.div 
                className={styles.pulseRing}
                animate={{ scale: [1, 1.5, 2], opacity: [0.5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </div>
            <h2>Booking Confirmed!</h2>
            <p>Your shipment has been successfully booked and is now pending carrier assignment.</p>
            <div className={styles.bookingIdCard}>
              <span>Booking ID:</span>
              <strong>{bookingId}</strong>
            </div>
            <div className={styles.successActions}>
              <button className="btn btn-primary">Track Shipment</button>
              <button className="btn btn-outline">Back to Dashboard</button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={styles.wizardContainer}>
      {/* Progress Tracker */}
      <div className={styles.progressTracker}>
        {steps.map((step, index) => (
          <div key={step.id} className={styles.progressStep}>
            <div className={`${styles.stepIcon} ${currentStep === step.id ? styles.activeStep : ''} ${currentStep > step.id ? styles.completedStep : ''}`}>
              {step.icon}
            </div>
            <span className={styles.stepLabel}>{step.title}</span>
            {index < steps.length - 1 && (
              <div className={`${styles.stepLine} ${currentStep > step.id ? styles.completedLine : ''}`} />
            )}
          </div>
        ))}
      </div>

      {/* Main Form Area */}
      <div className={styles.wizardCard}>
        <AnimatePresence mode="wait">
          {renderStepContent()}
        </AnimatePresence>

        {currentStep < 5 && (
          <div className={styles.wizardFooter}>
            <button 
              className={`btn btn-outline ${currentStep === 1 ? styles.hidden : ''}`}
              onClick={handlePrev}
            >
              <ArrowLeft size={18} /> Back
            </button>

            {currentStep < 4 ? (
              <button className="btn btn-primary" onClick={handleNext}>
                Continue <ArrowRight size={18} />
              </button>
            ) : (
              <button className="btn btn-accent" onClick={handleBook} disabled={isBooking}>
                {isBooking ? "Confirming..." : "Confirm & Book"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
