# Route NH — Comprehensive Development Plan

## 1. Architectural Strategy

Route NH is engineered with a modular, full-stack monorepo architecture leveraging Next.js 14 App Router, React 18, TypeScript, Tailwind CSS, and Prisma ORM.

```
                              ┌───────────────────────────────────┐
                              │     Physical Fleet (Trucks)       │
                              │  - Truck 01 (32ft MXL Container)  │
                              │  - Truck 02 (20ft Open Body)      │
                              │  AIS-140 Physical GPS Trackers    │
                              └─────────────────┬─────────────────┘
                                                │ (Cellular / GPRS)
                                                ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        Route NH Central Server                         │
│                                                                        │
│   ┌──────────────────────────────┐    ┌────────────────────────────┐   │
│   │   GPS Telemetry Ingestion    │    │   High-Fidelity Telemetry  │   │
│   │   (/api/v1/gps/telemetry)    │    │   Simulator (Dev/Test)     │   │
│   └──────────────┬───────────────┘    └──────────────┬─────────────┘   │
│                  │                                   │                 │
│                  ▼                                   ▼                 │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │               Relational Storage (Prisma ORM)                  │   │
│   │        TrackingLocation, Vehicle, GpsDevice, Trips             │   │
│   └──────────────────────────────┬─────────────────────────────────┘   │
│                                  ▼                                     │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                   Unified App Router Portals                   │   │
│   │   - Customer Portal (/customer)                                │   │
│   │   - Platform Operations Hub (/platform)                        │   │
│   │   - Driver Mobile Console (/driver)                            │   │
│   │   - Super Administrator Dashboard (/admin)                     │   │
│   └────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Implementation Phases & Milestones

### Phase 0: Audit & Mapping
- Reverse engineer FR8 audited UI components, mock models, form fields, and workflows.
- Create mapping document (`PRD_MAPPING.md`) linking FR8 screens to Route NH routes.

### Phase 1: Brand Identity & Vector Splash Screen
- Reconstruct official Route NH road-integrated emblem with navy blue (#103B82), electric blue (#0866D8), and dark charcoal highway (#33363C).
- Six-stage sequential launch animation:
  1. Fade In glow (0–800ms)
  2. Curved highway draw (800–1800ms)
  3. Navy R silhouette formation (1800–2800ms)
  4. Electric blue NH reveal (2800–3700ms)
  5. Logo lockup with "ROUTE NH" wordmark (3700–4600ms)
  6. Ready to launch with tagline & progress pulse (4600–5500ms)

### Phase 2: Architecture & Security Setup
- Role-based Access Control (RBAC) supporting 6 roles: `ADMIN`, `OPERATIONS`, `DISPATCHER`, `CUSTOMER`, `DRIVER`, `FINANCE`.
- JWT authentication with HTTP-only cookies and Bearer token fallback.
- Granular permission matrix preventing unauthorized trip assignments, quotation editing, or document access.

### Phase 3: Database & Initial Fleet
- Normalized schema with 31 models covering customers, vehicles, GPS devices, drivers, bookings, quotations, trips, telemetry, documents, invoices, payments, and audit logs.
- Dedicated seeding of Route NH's owned fleet:
  - **Truck 01**: 32ft MXL Container, 24T payload, `TN-01-AB-1234`, Teltonika FMB920 GPS.
  - **Truck 02**: 20ft Open Body, 15T payload, `TN-02-CD-5678`, Concox GT06N GPS.

### Phase 4: Centralized REST API
- `/api/v1/auth/*`: Registration, login, current session, password reset.
- `/api/v1/customer/*`: Bookings, quotations, shipment tracking, invoices, support.
- `/api/v1/driver/*`: Active trip, status transitions, GPS pinging, POD upload.
- `/api/v1/operations/*`: Fleet monitor, quotation management, dispatching.
- `/api/v1/admin/*`: System settings, user permissions, corridor pricing, audit logs.

### Phase 5: GPS Integration & Highway Corridor Simulator
- Support Traccar webhook format, OsmAnd HTTP GET protocol, and Teltonika/Concox raw telemetry.
- Standalone highway telemetry simulator animating Truck 01 and Truck 02 along NH 48 and NH 44 with speed, heading, and distance calculations.

### Phase 6 to 10: Portals, POD & Invoicing
- Full-featured customer, driver, operations, and admin portals.
- Digital document pipeline with cryptographic hash check and verification workflow.
- GST compliance with HSN/SAC codes, reverse charge mechanism (RCM) checks, and downloadable PDF receipts.

### Phase 11 & 12: Android Integration, Verification & Deployment
- Production Android APK compilation via AGP 9.5.2 & OpenJDK 25.
- Continuous Git pushes to GitHub repository.
- Zero-downtime deployment on Render.
