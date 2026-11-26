# 05 — Screen Difference Report: FR8 vs Current Route NH

Comprehensive component-by-component audit comparing the actual scanned FR8 application (`in.fr8.book`) against the current Route NH implementation.

---

## 1. Global Shell & Navigation Framework

| Component | FR8 Actual Behavior | Route NH Current Behavior | Required Route NH Correction |
|---|---|---|---|
| **Bottom Navigation Tabs** | 5 Distinct Tabs: `Book`, `Trip`, `Rates`, `Support`, `Account` | Had custom tabs: `Home`, `Bookings`, `Track`, `Invoices`, `Support` | **CRITICAL**: Reorganize bottom navigation into the exact 5 FR8 tabs: `Book`, `Trip`, `Rates`, `Support`, `Account`. |
| **Top App Bar** | Sticky white bar (`#FFFFFF`, `56.9dp` height), bottom border `1px #E5E7EF`. Displays Screen Title (left), context action pills (right) | Header had dark/light hybrid styling with Route NH logo emblem in center | Standardize to sticky white bar with title on left and context actions on right (matching FR8). |
| **Canvas Background** | `#F2F4FD` (distinct light blue-tinted cool grey) | `#F4F6F9` (neutral slate grey) | Change canvas background color across mobile app to `#F2F4FD`. |
| **Primary Accent Color** | `#0067FA` (pure electric blue for active tabs, selected chips, focus rings) | `#2563EB` / `#0866D8` | Standardize active states and primary accents to `#0067FA`. |
| **Primary CTA Buttons** | `#002F70` (deep corporate navy for `Book`, `Confirm booking`) | `#0B1B36` / `#F97316` | Standardize primary full-width action buttons to `#002F70` with rounded `8dp` radius. |

---

## 2. Screen SCR-01 — My bookings (`Book` Tab)

| Component | FR8 Actual | Route NH Current | Required Correction |
|---|---|---|---|
| **Top App Bar** | Left: `"My bookings"`, Right: `"+ Book"` outline pill button + Filter funnel icon | Had greeting card and "Book a Truck" grid icon | Implement top bar with `"My bookings"` title, `"+ Book"` outline pill (`[+ Book]`), and filter icon. |
| **Booking Cards Structure** | Header `#ID \| Truck Type`, status badge (`Allocated`, `Expired`), commodity sub-line, route dots (Green origin / Orange destination), freight amount | Card showed vehicle photo, ETA, arrow, without freight breakdown or quick CTA | Replicate FR8 card layout: `#ID \| <Type>`, `<Commodity> \| <Weight> Ton \| <Dist> KM`, Green origin dot, Orange dest dot, `₹Amount` on right, and bottom CTA button. |
| **Filter Modal (SCR-02)** | Left rail tabs (`Users`, `Truck type`), right multi-select checkbox list with 21 truck categories, sticky `Reset` and `Apply` footer | Generic popup dialog with basic inputs | Build the 2-pane filter modal with `Users` and `Truck type` categories, 21 truck checkboxes, and `Reset` / `Apply` actions. |
| **Book Truck Form (SCR-06)** | 2x2 grid (`From`, `To`, `Material type`, `Ton`), 21 truck type chips in 3 categories (`Open`, `Closed`, `Trailer`), `Notes`, sticky `Book` button | Simple 4-field modal | Replicate complete form with 2x2 grid, 3 categorized chip sections (`Open`, `Closed`, `Trailer`), `Notes` input, and sticky `#002F70` `Book` button. |

---

## 3. Screen SCR-10 — Trip List (`Trip` Tab)

| Component | FR8 Actual | Route NH Current | Required Correction |
|---|---|---|---|
| **Sub-Tabs** | 3 horizontal pill sub-tabs: `Ongoing`, `POD Pending`, `POD Received` | No sub-tabs (single view) | Implement the 3 sub-tabs with active blue indicator and item counters. |
| **Top Bar Actions** | Title `"Trip"`, Search icon button, Filter icon button | Basic header | Add search overlay trigger (`SCR-17`) and filter modal trigger (`SCR-18`). |
| **Trip Card** | `#ID \| Vehicle Reg (Type)`, status badge, origin/dest, `"Show more"` link opening 10-stage timeline sheet (`SCR-05`), 4 action buttons: `Payments`, `Documents`, `Tracking`, `Help` | Card only had track button | Implement the 4 action buttons (`Payments`, `Documents`, `Tracking`, `Help`) and `"Show more"` timeline sheet trigger. |
| **Timeline Sheet (SCR-05)** | 10-stage horizontal stepper: `Confirmed` -> `Loading` -> `Intransit` -> `Unloading` -> `Delivered` -> `PODVerified` -> `Invoiced` -> `POD Disp` -> `Paid` -> `Closed` with timestamps | 5-stage vertical timeline | Implement the 10-stage horizontal stepper bottom sheet with TAT and km badges. |
| **Live Tracking (SCR-14)** | Map header with route, truck speed badge, toll plaza milestone timeline with timestamps | Embedded SVG road in home tab | Build dedicated tracking sub-screen with live map, vehicle telemetry, and toll plaza passage timeline. |

---

## 4. Screen SCR-20 — Instant Market Rates (`Rates` Tab)

| Component | FR8 Actual | Route NH Current | Required Correction |
|---|---|---|---|
| **Rates Tab Presence** | Dedicated 3rd bottom tab for instant highway freight rates | Was only a modal popup | Build full-screen `Rates` tab with corridor rate selector (`From` -> `To`), current market rate cards, and historical price trend sheet. |
| **Historical Rates Sheet (SCR-21)** | Past rates progression graph and historical trip details | None | Implement past rates bottom sheet with interactive rate trends. |

---

## 5. Screen SCR-22 — Support Conversations (`Support` Tab)

| Component | FR8 Actual | Route NH Current | Required Correction |
|---|---|---|---|
| **Sub-Tabs** | `Tickets` and `Chat` tabs | Single ticket form and list | Implement `Tickets` and `Chat` sub-tabs with active filters (`All`, `Open`, `Resolved`). |

---

## 6. Screen SCR-23 — Account Hub (`Account` Tab)

| Component | FR8 Actual | Route NH Current | Required Correction |
|---|---|---|---|
| **Account Tab Presence** | Dedicated 5th bottom tab with 10 structured management options | Hidden inside slide-out hamburger drawer | Implement dedicated `Account` tab with profile card, organization tax details, users management, balance top-up, and helpdesk links. |
| **Users Management (SCR-27)** | Bottom sheet listing sub-users with roles and `+ Add user` form | Not available in mobile view | Implement `Users` management sheet and `Add user` form. |
| **POD Tracking Lookup (SCR-32)** | Standalone search by LR/Booking # returning verified POD receipt | Only inside invoices tab | Implement direct POD tracking input and result screen. |
