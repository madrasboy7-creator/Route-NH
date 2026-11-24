# Route NH – Complete Road Transportation Management Platform

> **"Moving Goods. Connecting Businesses."**

An enterprise-grade, production-ready Full Truck Load (FTL) road logistics management platform for India. Route NH connects four independent portals through a unified relational database, business logic layer, and real-time GPS telemetry.

---

## The Four Portals

| Portal | Route | Primary Persona | Purpose |
| :--- | :--- | :--- | :--- |
| **Customer Portal** | `/customer` | Shippers & Corporate Clients | Request commercial transport, accept quotations, track shipments in real-time with route maps, and access GST invoices. |
| **Route NH Platform** | `/platform` | Operations & Dispatch Team | Review incoming bookings, prepare freight quotes with itemized charges, allocate compliant vehicles and verified drivers, and verify PODs. |
| **Driver Portal** | `/driver` | Commercial Truck Drivers | Mobile-first trip companion: advance milestone lifecycle (Pickup, Loading, Transit, POD), transmit live GPS coordinates, and launch navigation. |
| **Admin Portal** | `/admin` | Super Administrator | System governance, corridor route rate pricing, staff account management, and immutable audit logs. |

---

## 1-Click Demo Login Personas

For seamless evaluation, quick demo credentials are pre-seeded:

- **Customer**: `customer@tatamotors.com` / `password123` (Sunil Mittal, Tata Motors Parts)
- **Operations**: `operations@routenh.com` / `password123` (Rajesh Nair, Operations Manager)
- **Driver**: `driver.ramesh@routenh.com` / `password123` (Ramesh Kumar Yadav, Vehicle DL-01-AB-4589)
- **Super Admin**: `admin@routenh.com` / `password123` (Vikramaditya Singhania)

Use the **"Persona Switcher"** in the top navigation bar to switch between roles with 1 click!

---

## Getting Started

### Prerequisites
- Node.js v18+ (tested on Node v24.15.0)
- npm v10+

### Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Initialize Database & Seed Realistic Logistics Data**:
   ```bash
   npx prisma db push
   node prisma/seed.js
   ```

3. **Run Automated Test Suite**:
   ```bash
   node test/e2e-workflow.test.js
   ```

4. **Start the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Android Studio & Connected Phone Integration

The project includes a dedicated Android application in `C:\Users\ceofi\AndroidStudioProjects\RouteNH` connected to your phone (**Motorola Edge 70 Fusion**) over ADB:

1. **Forward server port to connected phone**:
   ```powershell
   & "C:\Users\ceofi\AppData\Local\Android\Sdk\platform-tools\adb.exe" reverse tcp:3000 tcp:3000
   ```
2. **Build and install on phone**:
   ```powershell
   Set-Location "C:\Users\ceofi\AndroidStudioProjects\RouteNH"
   .\gradlew.bat installDebug
   ```

The Android app will open directly on your phone with native GPS telemetry streaming and mobile portal access.
