# 07 — Replication Task List

Task list for replicating the FR8 user interface, screen structure, and interactions into the Route NH customer mobile application:

## Task Breakdown

### 1. Global Shell & Navigation
- [x] Restructure bottom navigation into 5 exact FR8 tabs: `Book`, `Trip`, `Rates`, `Support`, `Account`.
- [x] Standardize sticky white top app bar (`#FFFFFF`, `1px #E5E7EF` bottom border) with left-aligned screen title.
- [x] Set global canvas background to `#F2F4FD`.
- [x] Apply `#0067FA` primary accent and `#002F70` deep navy button styling.

### 2. Tab 1: Book (`My bookings` — SCR-01 to SCR-09)
- [x] Top bar: Title `"My bookings"`, `"+ Book"` outline pill button, and filter icon button.
- [x] Booking card: `#ID | Truck Type`, `<Commodity> | <Weight> Ton | <Dist> KM`, green/orange route dots, `₹Amount`, and `Confirm booking` secondary button.
- [x] Full-screen Filter Modal (`SCR-02`): Left rail (`Users`, `Truck type`), 21 truck type checkboxes, Reset & Apply buttons.
- [x] Full-screen `Book truck` form (`SCR-06`): 2x2 grid (`From`, `To`, `Material type`, `Ton`), 21 truck type chips in 3 categorized sections (`Open`, `Closed`, `Trailer`), `Notes`, sticky `#002F70` `Book` button.
- [x] Search overlays: City picker (`SCR-07`) and 32-commodity material type selector (`SCR-08`).

### 3. Tab 2: Trip (`Trip` — SCR-10 to SCR-19)
- [x] Header: Title `"Trip"`, search icon, filter icon.
- [x] 3 Sub-tabs: `Ongoing`, `POD Pending`, `POD Received`.
- [x] Trip Card: Vehicle reg/type, status pill, route, 4 action buttons: `Payments`, `Documents`, `Tracking`, `Help`.
- [x] 10-stage horizontal timeline bottom sheet (`SCR-05`): `Confirmed` -> `Loading` -> `Intransit` -> `Unloading` -> `Delivered` -> `PODVerified` -> `Invoiced` -> `POD Disp` -> `Paid` -> `Closed`.
- [x] Payment details bottom sheet (`SCR-12`).
- [x] Documents bottom sheet (`SCR-13`) for LR, POD, and E-Way Bill viewing.
- [x] Live Toll Tracking sub-screen (`SCR-14`) with route map, telemetry speed, and toll plaza timeline.
- [x] Trip Help issue category selector (`SCR-15`).

### 4. Tab 3: Rates (`Instant Market Rates` — SCR-20 to SCR-21)
- [x] Highway corridor rate search (`From` -> `To`).
- [x] Instant market rate estimation card with base freight, toll, and GST breakdown.
- [x] Past Rates historical trend sheet (`SCR-21`).

### 5. Tab 4: Support (`Support Conversations` — SCR-22)
- [x] Sub-tabs: `Tickets` and `Chat`.
- [x] Ticket status filters (`All`, `Open`, `Resolved`).
- [x] Interactive conversational support messaging.

### 6. Tab 5: Account (`Account Hub` — SCR-23 to SCR-36)
- [x] Profile header card (Priya Sharma, Tata Motors Parts Logistics).
- [x] Notifications inbox modal (`SCR-24`).
- [x] Organization tax details bottom sheet (`SCR-26`).
- [x] Users management bottom sheet (`SCR-27`) with `+ Add user` form (`SCR-28`).
- [x] Account balance & virtual bank account top-up details (`SCR-29`).
- [x] Direct POD & truck tracking lookup form (`SCR-32`) and result screen (`SCR-33`).
- [x] 24/7 Operations helpline sheet (`SCR-34`).
- [x] Tutorial videos library (`SCR-35`) and Terms & Conditions webview (`SCR-36`).
