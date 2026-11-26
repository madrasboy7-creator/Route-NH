# Route NH — Product Requirement Document (PRD)

## 1. Product Summary

**Route NH** is a road freight and logistics management platform engineered specifically for the Indian interstate commercial transportation ecosystem. Unlike traditional freight brokerage applications, Route NH operates an asset-backed transportation fleet consisting of high-capacity container and open-body commercial vehicles equipped with physical GPS tracking hardware.

The platform provides end-to-end operational visibility from booking quotation, vehicle dispatch, real-time highway telematics, electronic proof of delivery (e-POD), to GST invoicing.

---

## 2. User Roles & Personas

| Role | Primary User | Key Responsibilities | Access Route |
| :--- | :--- | :--- | :--- |
| **CUSTOMER** | Corporate Cargo Consignor / Shipper | Submits freight requests, reviews quotations, monitors live vehicle GPS, downloads verified PODs and GST invoices | `/customer` |
| **DRIVER** | Commercial Heavy Truck Driver | Views assigned trips, reports transit milestones (Loading, Dispatched, Delivered), uploads physical LR and signed POD photos | `/driver` |
| **DISPATCHER** | Fleet Allocation Executive | Monitors vehicle availability, assigns Truck 01 or Truck 02 to confirmed trips, pairs verified drivers | `/platform` |
| **OPERATIONS** | Logistics Operations Manager | Prepares freight quotations, verifies cargo specifications, audits uploaded delivery PODs | `/platform` |
| **FINANCE** | Billing & Accounts Executive | Generates GST-compliant tax invoices, logs customer payment receipts (NEFT/RTGS/UPI), reconciles fleet expenses | `/platform` |
| **ADMIN** | System Super Administrator | Configures corridor freight rates, manages user privileges, inspects system audit logs | `/admin` |

---

## 3. Business Invariants & Lifecycle States

### 3.1 Booking & Quotation Lifecycle
1. `REQUESTED`: Customer submits origin, destination, cargo category, weight, and preferred vehicle type.
2. `UNDER_REVIEW`: Operations reviews lane feasibility and pricing parameters.
3. `QUOTATION_SENT`: System compiles multi-component quotation (Base Freight, Toll, Green Tax, GST 18%).
4. `QUOTATION_ACCEPTED`: Customer accepts price. System automatically triggers Trip creation.
5. `CONFIRMED`: Operations confirms allocation readiness.

### 3.2 Trip Lifecycle & Milestones
1. `CREATED`: Trip record generated from confirmed booking.
2. `VEHICLE_ASSIGNED`: Truck 01 or Truck 02 assigned by dispatcher.
3. `DRIVER_ASSIGNED`: Verified commercial driver attached to trip assignment.
4. `AT_PICKUP`: Driver arrives at consignor warehouse.
5. `LOADING`: Cargo loading commenced.
6. `LOADED`: Consignment loaded; Driver uploads copy of Lorry Receipt (LR) and E-Way Bill.
7. `DISPATCHED`: Vehicle leaves pickup premises.
8. `IN_TRANSIT`: Live highway telemetry stream active via vehicle GPS device.
9. `AT_DESTINATION`: Vehicle arrives at consignee receiving bay.
10. `UNLOADING`: Consignee inspection and unloading in progress.
11. `DELIVERED`: Unloading completed; Driver obtains physical signed and stamped POD.
12. `POD_SUBMITTED`: Driver uploads high-resolution photo of stamped POD.
13. `COMPLETED`: Operations verifies POD legibility and approves trip closure.

---

## 4. Indian Regulatory Compliance

- **GST Compliance**: Automated freight invoices calculated with 18% GST (or 5% RCM where applicable), recording GSTIN, SAC Code 9965 (Goods transport services), Place of Supply, and State Code.
- **E-Way Bill Integration**: Capture of 12-digit E-Way Bill number, vehicle registration number binding, and validity period monitoring.
- **AIS-140 GPS Compliance**: Ingestion of emergency alerts, vehicle battery levels, speed telemetry, and tamper alarms from certified vehicle tracking devices.
