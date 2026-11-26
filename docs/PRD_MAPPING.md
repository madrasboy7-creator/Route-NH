# Route NH — Screen & Workflow Audit Mapping (FR8 to Route NH)

This document establishes the 1:1 mapping between the audited FR8 screen inventory and the Route NH production application implementation.

---

## 1. Authentication & Onboarding

| Audited FR8 Screen | Audited Path | Route NH Production Route | Implementation Details |
| :--- | :--- | :--- | :--- |
| Splash Screen | Initial Native Launch | `/splash` & Native Compose `RouteNHSplashScreen` | Six-stage sequential vector animation reproducing the official Route NH R-road-NH emblem |
| Role Selection | `/auth/role-selection` | `/login` (Unified Role Selector) | Card-based selector switching between Customer, Driver, Operations, and Admin with demo login auto-fill |
| User Login | `/auth/login` | `/login` & `/api/v1/auth/login` | Secure JWT authentication with phone/email credentials, password visibility toggle, and error toasts |
| Shipper Registration | `/auth/signup` | `/login?tab=register` & `/api/v1/auth/register` | Business registration capturing Company Name, GSTIN, PAN, Billing Address, and Contact Details |

---

## 2. Customer / Shipper Experience

| Audited FR8 Screen | Audited Path | Route NH Production Route | Implementation Details |
| :--- | :--- | :--- | :--- |
| Shipper Dashboard | `/dashboard/shipper` | `/customer` (Overview Tab) | Active shipments summary, quick booking launcher, expenditure metrics, and recent activity feed |
| Create Shipment | `/dashboard/shipper/create-shipment` | `/customer` (New Booking Tab) | Multi-stop booking form: Origin & Destination, Cargo Category, Package Count, Total Weight (kg), Vehicle Type selector |
| Active Shipment Tracking | `/dashboard/shipper/tracking` | `/customer` (Tracking Tab) | Live interactive highway map, current vehicle telemetry, trip milestone progress tracker, driver contact pill |
| Shipment History | `/dashboard/shipper/history` | `/customer` (Bookings Tab) | Filterable data table of past and active shipments with status badges, LR links, and quotation history |
| Documents & Invoices | `/dashboard/documents` | `/customer` (Invoices & POD Tab) | Tabbed document viewer for verified Lorry Receipts (LR), Signed PODs, and downloadable GST Tax Invoices |
| Support System | `/dashboard/support` | `/customer` (Support Tab) | Ticket creation and conversational messaging module for transit delays, billing issues, or damaged goods |

---

## 3. Driver Mobile Experience

| Audited FR8 Screen | Audited Path | Route NH Production Route | Implementation Details |
| :--- | :--- | :--- | :--- |
| Driver Dashboard | `/dashboard/driver` | `/driver` (Home Tab) | High-contrast mobile interface displaying current assigned vehicle, trip summary, and quick action bar |
| Active Trip Console | `/dashboard/driver/active-trip` | `/driver` (Active Trip Tab) | One-tap sequential trip milestone progress buttons (`AT_PICKUP` -> `LOADING` -> `DISPATCHED` -> `DELIVERED`) |
| Available Trips / Loads | `/dashboard/driver/available-trips` | `/driver` (Trips Tab) | Schedule of upcoming trips assigned by Route NH fleet dispatch |
| Trip History | `/dashboard/driver/history` | `/driver` (History Tab) | Log of completed trips, total distance covered, and performance score |
| POD & LR Upload | Mobile Camera / File Picker | `/driver` (Document Upload Modal) | Direct camera/gallery capture to upload signed physical delivery notes and stamped consignee receipts |

---

## 4. Admin & Fleet Operations Experience

| Audited FR8 Screen | Audited Path | Route NH Production Route | Implementation Details |
| :--- | :--- | :--- | :--- |
| Admin Overview | `/dashboard/admin` | `/platform` & `/admin` | Fleet KPI cards (Active Trucks, In Transit, Monthly Revenue, On-Time Rate), revenue chart, and fleet status breakdown |
| Shipment Management | `/dashboard/admin/shipments` | `/platform` (Bookings Tab) | Master operational grid: Quotation preparation, booking verification, and customer communication |
| Fleet & Vehicles | `/dashboard/vehicles` | `/platform` (Fleet Tab) | Live telematics and status monitoring for owned fleet (**Truck 01** and **Truck 02**), insurance & fitness expiry alerts |
| Dispatch & Trip Assign | Fleet Operations Console | `/platform` (Dispatch Tab) | Vehicle and driver allocation modal with conflict-prevention guards |
| User Management | `/dashboard/admin/users` | `/admin` (User Accounts Tab) | Granular role assignment, account status suspension/activation, and verification badge toggle |
| Pricing & Corridor Rates | Super Admin Pricing Tab | `/admin` (Pricing Tab) | Base freight rate, per-km rate, and minimum charge configuration across Indian highway routes |
| Audit Logs | System Security Monitor | `/admin` (Audit Logs Tab) | Immutable record of system changes, authentication events, dispatch allocations, and pricing adjustments |
