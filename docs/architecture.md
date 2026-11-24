# Route NH Platform - Technical Architecture Document

## 1. System Overview

Route NH is a centralized, production-grade road transportation and logistics management platform engineered for commercial road freight in India. The platform integrates four distinct portals connected to a single normalized relational database:

1. **Customer Portal** (`/customer`): Commercial booking management, quotation review, live GPS shipment tracking, and GST invoicing.
2. **Route NH Platform** (`/platform`): Operations and dispatch hub managing customer bookings, quotation preparation, vehicle allocation, driver assignment, and document verification.
3. **Driver Portal** (`/driver`): Mobile-first application for assigned drivers to execute trip lifecycle events, upload LR and signed PODs, and transmit real-time GPS coordinates.
4. **Admin Portal** (`/admin`): Super administrator governance covering user and role permissions, corridor freight pricing policies, and immutable system audit logs.

```
                          ┌───────────────────────────┐
                          │   Physical Mobile Device  │
                          │ (Motorola Edge 70 Fusion) │
                          └─────────────┬─────────────┘
                                        │ (ADB Reverse TCP:3000)
                                        ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        Route NH Central Server                         │
├───────────────┬────────────────────────┬───────────────┬───────────────┤
│ Customer      │ Operations & Dispatch  │ Driver App    │ Super Admin   │
│ Portal        │ Platform               │ Console       │ Portal        │
│ (/customer)   │ (/platform)            │ (/driver)     │ (/admin)      │
└───────┬───────┴───────────┬────────────┴───────┬───────┴───────┬───────┘
        │                   │                    │               │
        └───────────────────┼────────────────────┴───────────────┘
                            ▼
              ┌───────────────────────────┐
              │  Unified REST API (/api)  │
              │  Role & Permission Guards │
              └─────────────┬─────────────┘
                            ▼
              ┌───────────────────────────┐
              │ Normalized Relational DB │
              │ (Prisma ORM - 30 Entities)│
              └───────────────────────────┘
```

## 2. Technology Stack

- **Frontend & Full-Stack Core**: Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, Lucide Icons.
- **Relational ORM & Database Layer**: Prisma ORM with 30 fully normalized models, cascading foreign keys, indexes, and decimal precision. Supported in both SQLite (local development) and MySQL 8 (production enterprise).
- **Authentication & Security**: JSON Web Tokens (JWT), bcrypt password hashing, HTTP-only cookie support, and granular role-permission authorization.
- **Mobile Integration**: Android Studio Jetpack Compose + Android WebView bridge with native GPS telemetry broadcast and camera support.
- **Hardware Connection**: ADB Reverse tunnel (`adb reverse tcp:3000 tcp:3000`) enabling physical Android devices to communicate directly with localhost.

## 3. Real-Time Telemetry & Tracking

During active journeys, the driver device transmits periodic GPS coordinates (`latitude`, `longitude`, `speed`, `accuracyMeters`, `heading`) to `/api/v1/driver/trips/:id/location`. These points are recorded immutably in `tracking_locations` and rendered dynamically on the customer and operations monitoring consoles.
