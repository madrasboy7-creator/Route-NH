# 03 — Complete Navigation Tree

Discovered navigation hierarchy of `in.fr8.book` (`v2.0.122`), verified directly on the connected Motorola Edge 70 Fusion.

```text
ROOT (in.fr8.book/.MainActivity — Authenticated Bottom Navigation Shell)
│
├── [Tab 1] Book (SCR-01: My bookings)
│   ├── Header Action: + Book ───────────────────────────► SCR-06: Book truck Form
│   │   ├── Field: From ─────────────────────────────────► SCR-07: City Search Overlay (Source)
│   │   ├── Field: To ───────────────────────────────────► SCR-07: City Search Overlay (Destination, INFERRED)
│   │   ├── Field: Material type ────────────────────────► SCR-08: Material type Selector Overlay
│   │   ├── Field: Ton(MT) ──────────────────────────────► SCR-09: Inline Numeric Input + Number Keyboard
│   │   ├── Chips: Open / Closed / Trailer (21 types) ───► Inline selection state
│   │   ├── Field: Notes ────────────────────────────────► Inline text input
│   │   └── CTA: Book ───────────────────────────────────► Submit booking request (NOT VERIFIED - Phase 10)
│   ├── Header Action: Filter Icon ──────────────────────► SCR-02: Filter Modal
│   │   ├── Left Tab: Users ─────────────────────────────► User multi-select checkboxes
│   │   ├── Left Tab: Truck type ────────────────────────► 21 Truck type checkboxes (scrollable)
│   │   └── Actions: Reset | Apply | Close (X)
│   ├── Booking Card (Expired, e.g. #15272934) ──────────► SCR-03: Booking detail (Expired)
│   │   └── Sticky CTA: Book ────────────────────────────► Re-book flow (SCR-06, INFERRED)
│   └── Booking Card (Allocated, e.g. #15309639) ────────► SCR-04: Trip detail (Allocated)
│       ├── Link: Show more ─────────────────────────────► SCR-05: 10-Stage Milestone Timeline Sheet
│       ├── Call Icon (Traffic Agent) ───────────────────► System Dialer (INFERRED)
│       ├── Call Icon (Driver) ──────────────────────────► System Dialer (INFERRED)
│       ├── Quick Action: Chat ──────────────────────────► Switches to [Tab 4] Support (SCR-22)
│       ├── Inline Card CTA: Confirm booking (from SCR-01) ► Order confirmation / payment (NOT VERIFIED)
│       └── Sticky CTA: Confirm booking ─────────────────► Order confirmation / payment (NOT VERIFIED)
│
├── [Tab 2] Trip (SCR-10: Trip List)
│   ├── Top Sub-Tab 1: Ongoing ──────────────────────────► Ongoing trips list (Empty: "No trips found")
│   ├── Top Sub-Tab 2: POD Pending (badge: 2) ───────────► Delivered trips awaiting POD (with PAYABLE/PAYMENT/BALANCE)
│   ├── Top Sub-Tab 3: POD Received (badge: 12) ─────────► Completed trips (Invoiced / Closed)
│   ├── Header Action: Toggle search ────────────────────► SCR-17: Inline Search ("Search trip id, truck or city")
│   ├── Header Action: Filter Icon ──────────────────────► SCR-18: Trip Filter Modal
│   │   ├── Left Tab: Users ─────────────────────────────► User multi-select checkboxes
│   │   ├── Left Tab: Truck type ────────────────────────► 21 Truck type checkboxes
│   │   └── Left Tab: Period ────────────────────────────► Radio options (Last Week / Last Month / Last 3 Months / Custom Range)
│   │       └── Custom Range ────────────────────────────► SCR-19: Select Date Range Calendar Modal
│   └── Trip Card (e.g. #14720260 Delivered) ────────────► SCR-11: Trip detail (Delivered)
│       ├── Link: Show more ─────────────────────────────► SCR-05: 10-Stage Milestone Timeline Sheet (populated timestamps)
│       ├── Quick Action: Payments ──────────────────────► SCR-12: Payment details Bottom Sheet
│       │   └── Sticky CTA: Pay ₹3850 ───────────────────► Payment flow (NOT VERIFIED - Phase 10)
│       ├── Quick Action: Documents ─────────────────────► SCR-13: Documents Bottom Sheet
│       │   ├── Loading Memo (View / PDF) ───────────────► NOT VERIFIED
│       │   ├── LR (Existing PDF Eye / Auto E-LR Edit & PDF / Manual E-LR + / E-way Bill PDF) ► NOT VERIFIED
│       │   ├── POD (Existing PDF Eye) ──────────────────► NOT VERIFIED
│       │   └── Invoice (Billing Address + PDF) ─────────► NOT VERIFIED
│       ├── Quick Action: Tracking ──────────────────────► SCR-14: Tracking Screen
│       │   ├── Header Share Icon ───────────────────────► Share tracking link (INFERRED)
│       │   ├── Interactive Route Map + Toll Pins ───────► Map zoom/pin inspection
│       │   ├── Driver Phone Link ───────────────────────► System Dialer (INFERRED)
│       │   └── Toll Plaza Checkpoint Timeline (scrollable)
│       ├── Quick Action: Help ──────────────────────────► SCR-15: Help Issue Type Selector
│       │   ├── Option: Payments ────────────────────────► SCR-16: Get Help Sheet ("Request call back")
│       │   ├── Option: Delivery ────────────────────────► SCR-16 variant (INFERRED)
│       │   └── Option: POD ─────────────────────────────► SCR-16 variant (INFERRED)
│       └── Sticky CTA: Pay ₹3850 ───────────────────────► Payment flow (NOT VERIFIED - Phase 10)
│
├── [Tab 3] Rates (SCR-20: Book Trucks & Get Instant Rates)
│   ├── Field: FROM City (`Chennai`) ────────────────────► SCR-U3: Select City Dialog (`cpPanel`, PARTIALLY OBSERVED)
│   ├── Button: Swap cities (⇅) ─────────────────────────► Swaps FROM and TO cities (NOT VERIFIED)
│   ├── Field: TO City (`Bangalore`) ────────────────────► SCR-U3: Select City Dialog (`cpPanel`, PARTIALLY OBSERVED)
│   └── Truck Rate Cards (8 visible truck categories)
│       └── Link: Past Rates → ──────────────────────────► SCR-21: Past Rates Sheet (6-month chart + historical trips)
│           ├── CTA: Book Truck → ───────────────────────► Booking flow (SCR-06, INFERRED)
│           └── CTA: View 367 more trips ↓ ──────────────► Pagination / full list (NOT VERIFIED)
│
├── [Tab 4] Support (SCR-22: Support Conversations)
│   ├── Search Bar (`Search for trip id, cardcodes or truck no` / `Search`)
│   ├── Filter Pill: Tickets ────────────────────────────► Support tickets list + page size (`100 | 250 | 500 | 1000`) & `0 of 0`
│   └── Filter Pill: Chat ───────────────────────────────► Active chat threads list (Empty: "No conversations found")
│
└── [Tab 5] Account (SCR-23: Account Hub)
    ├── Header: Profile Name + Edit Pencil (`ZOVIAL ✎`) ─► SCR-25: Rename Bottom Sheet (`Cancel` / `Save`)
    ├── Header: Notification Bell Icon ──────────────────► SCR-24: Novu Inbox (`Search notifications...`, Settings gear)
    ├── Row: Organization ───────────────────────────────► SCR-26: Organization Bottom Sheet (`PAN`, `GSTIN`)
    ├── Row: Users ──────────────────────────────────────► SCR-27: Users Management Bottom Sheet
    │   ├── Button: + Add user ──────────────────────────► SCR-28: Add user Form (`Name`, `Mobile number`, `Add User`)
    │   ├── Button: User Name Edit Pencil ───────────────► Rename user (INFERRED)
    │   └── Button: User Trash Icon ─────────────────────► Delete user (NOT VERIFIED - Phase 10)
    ├── Row: Account balance (`+ Add money`) ────────────► SCR-29: Bank Details & Top-up Instructions (`Share` button)
    ├── Row: FR8 Coins (`₹ 98`) ─────────────────────────► Non-navigable informational row (OBSERVED)
    ├── Row: My payments (`₹ 0`) ────────────────────────► SCR-30: My payments (Empty: "No incoming payments found")
    ├── Row: Pending payments (`₹ 42654`) ───────────────► SCR-31: Pending payments List (`Download` button + trip cards)
    ├── Row: POD/Truck tracking ─────────────────────────► SCR-32: Multi-Truck Input Form (`Track` button)
    │   └── Submit: Track ───────────────────────────────► SCR-33: POD/Truck tracking Results
    │       ├── Header: Download / Export icon ──────────► Android file-viewer chooser ("Open with Sheets", OBSERVED)
    │       ├── Truck Chip (`TN37DM2598`) ───────────────► Edit/filter truck (INFERRED)
    │       ├── Toggle: Table View / Card View
    │       └── Trip Row Card ───────────────────────────► Trip detail (INFERRED)
    ├── Row: Watch video (`How to book truck?`) ─────────► SCR-35: Watch videos Library (7 tutorial guides)
    ├── Row: Help ───────────────────────────────────────► SCR-34: Support Bottom Sheet (`Customer sale and support` + `Call`)
    ├── Row: Logout ─────────────────────────────────────► Logout flow (NOT VERIFIED - Phase 10)
    ├── Row: Delete account ─────────────────────────────► Account deletion (NOT VERIFIED - Phase 10)
    └── Footer Link: Terms & conditions ─────────────────► SCR-36: Terms & Conditions WebView (`fr8.in` + WhatsApp FAB)
```
