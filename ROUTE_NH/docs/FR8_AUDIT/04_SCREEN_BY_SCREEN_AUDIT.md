# 04 — Screen-by-Screen Audit

> **Device Reference**: `1272 x 2772` px at `450 dpi` (`density = 2.8125`). Measurements in `px` are extracted from `android layout` bounds; `dp` values are `px / 2.8125`; values marked *(estimate)* are visually estimated from screenshots.
> **Observation Legend**: `OBSERVED` | `PARTIALLY OBSERVED` | `NOT VERIFIED` | `INFERRED`

---

## SCR-01 — My bookings (`Book` Tab)
- **Screen ID / Name**: `SCR-01` — My bookings
- **Parent Screen / Route**: Root Bottom Navigation (`Book` tab, index 1)
- **Screenshot**: `001_initial.png`
- **Purpose**: Lists open/allocated/expired truck booking requests for the customer organization, with quick creation (`+ Book`), filtering, and booking confirmation.
- **Role / Access**: Authenticated Customer (Admin / Sub-user) — `OBSERVED`
- **Top-to-Bottom Layout**:
  1. System Status Bar (`0–144 px` / `~51 dp`)
  2. Sticky Top App Bar (`144–304 px` / `56.9 dp` height, `#FFFFFF` bg, `1 px` `#E5E7EF` bottom border): Title `"My bookings"` (left), `"+ Book"` outline pill button (`[908,169][1127,276]`, `78 x 38 dp`), Filter icon button (`[1136,169][1240,276]`, `37 x 38 dp`)
  3. Scrollable Card List on `#F2F4FD` canvas (`19–1251 px` width = `~7 dp` outer margin + card padding):
     - **Allocated Card (`[19,324][1251,830]`, `180 dp` height)**: `#15309639 | TN20CQ6185 (SXL)` | `Others | 9 Ton | 482 KM` | Right status `"Allocated"` | Green origin dot + `Mappedu`, Orange destination dot + `Vijayawada`, Right freight `₹39,800` | Divider | Full-width secondary CTA button `[truck icon] Confirm booking` (`[56,700][1215,804]`, `37 dp` height)
     - **Expired Card (`[19,847][1251,1212]`, `130 dp` height)**: `#15272934 | 20 FEET CLOSED` | Right user `"<REDACTED_USER>"` | `FMCG | 7 Ton | 515 KM` | Right red pill `[clock] Expired` (`#FEF2F2` bg) | Origin `Chennai` -> Dest `Coimbatore`
  4. Persistent Bottom Navigation Bar (`2478–2638 px` / `56.9 dp` height, `#FFFFFF` bg): `Book` (active `#0067FA`), `Trip`, `Rates`, `Support`, `Account`
- **Visual Measurements**: Card radius `~12 dp` *(estimate)*; outer card horizontal margin `19 px` (`~7 dp`); internal card horizontal padding `37 px` (`~13 dp`); card gap `17 px` (`6 dp`).
- **Interactions**: `+ Book` -> `SCR-06` (`OBSERVED`); Filter icon -> `SCR-02` (`OBSERVED`); Expired card tap -> `SCR-03` (`OBSERVED`); Allocated card body tap -> `SCR-04` (`OBSERVED`); `Confirm booking` -> `NOT VERIFIED` (Phase 10 safety rule).

---

## SCR-02 — My bookings Filter Modal
- **Screen ID / Name**: `SCR-02` — Filter (Bookings)
- **Parent Screen / Route**: `SCR-01` -> Filter icon (`AlertDialog id=radix-_r_0_`)
- **Screenshots**: `002_book_filter.png`, `003_book_filter_trucktype.png`, `004_book_filter_trucktype_bottom.png`
- **Purpose**: Multi-select filtering of booking requests by organization User or Truck type.
- **Top-to-Bottom Layout**:
  1. Modal Header (`144–284 px`): `"Filter"` title (left), Close `"X"` button (`[1181,189][1229,234]`)
  2. Two-Pane Body (`284–2447 px`):
     - Left Rail (`0–360 px` / `128 dp` width): Category tabs `"Users"` (`[0,284][360,385]`), `"Truck type"` (`[0,380][360,484]`). Active tab has `#0067FA` text and right-edge blue indicator bar.
     - Right Scrollable Pane (`360–1272 px`): Checkbox list items (`47 x 48 px` / `~17 dp` checkbox + label). `Users` lists 3 org users (`<USER> - <PHONE>`). `Truck type` lists 21 truck types from `32 Feet Single Axle` to `40 Feet Low Bed`.
  3. Sticky Footer (`2447–2638 px`): `"Reset"` outline button (`[67,2489][621,2593]`) and `"Apply"` primary button (`[652,2489][1206,2593]`, disabled `#7F97B7` when unchanged).
- **Functional Status**: Opening, tab switching, scrolling to bottom (`40 Feet Low Bed`), and closing `OBSERVED`; applying active filter results `NOT VERIFIED`.

---

## SCR-03 — Booking detail (Expired Booking)
- **Screen ID / Name**: `SCR-03` — Booking detail
- **Parent Screen / Route**: `SCR-01` -> Tap Expired card
- **Screenshot**: `005_booking_card_tap.png`
- **Purpose**: Displays read-only summary of an expired booking and offers one-tap re-booking.
- **Top-to-Bottom Layout**:
  1. Header (`144–304 px`): Back arrow (`[30,169][135,276]`), Title `"Booking detail"`
  2. Summary Card: `#15272934 | 20 Feet Closed`, right user name (redacted), `FMCG | 7 Ton | 515 KM`, `Expired` red pill, `Chennai` -> `Coimbatore`
  3. Sticky Bottom CTA (`[30,2500][1240,2616]`, `41 dp` height, `#002F70` navy): `[refresh icon] Book`
- **Functional Status**: Card navigation and layout `OBSERVED`; tapping bottom `Book` re-book CTA `INFERRED` (pre-fills `SCR-06`).

---

## SCR-04 — Trip detail (Allocated Booking)
- **Screen ID / Name**: `SCR-04` — Trip detail (Allocated)
- **Parent Screen / Route**: `SCR-01` -> Tap Allocated card
- **Screenshot**: `006_booking_detail_allocated.png`
- **Purpose**: Displays truck allocation details, traffic agent and driver contacts, milestone summary trigger, chat shortcut, and final booking confirmation CTA.
- **Top-to-Bottom Layout**:
  1. Header: Back button, Title `"Trip detail"`
  2. Top Trip Summary Card: `#15309639 | TN20CQ6185 | (SXL)`, right agent name (redacted), `- | Others | 9 Ton`, right status `"Allocated"`, `Mappedu` -> `Vijayawada`, `₹39,800`, clickable `"Show more"` link (`[1015,594][1215,650]`)
  3. Contacts Card:
     - `Traffic agent`: Avatar icon, Name (redacted), languages `"Tamil, Urdu"`, Call icon button (`[1099,779][1203,886]`)
     - `Driver`: Truck-driver icon, Phone number (redacted), Call icon button (`[1099,999][1203,1103]`)
  4. Section Heading: `"Quick actions"`
  5. Quick Actions Card: `"Chat"` row with speech bubble icon & right chevron (`[22,1246][1248,1432]`)
  6. Sticky Bottom CTA: `"Confirm booking"` (`[19,2500][1251,2616]`, `#002F70` navy)
- **Interactions**: `Show more` -> `SCR-05` (`OBSERVED`); `Chat` -> `SCR-22` (`OBSERVED`); Call buttons -> Android Dialer (`INFERRED`); `Confirm booking` -> `NOT VERIFIED` (Phase 10).

---

## SCR-05 — Trip Timeline Bottom Sheet (`Show more`)
- **Screen ID / Name**: `SCR-05` — Trip Timeline Sheet
- **Parent Screen / Route**: `SCR-04` or `SCR-11` -> `Show more` (`AlertDialog id=radix-_r_f_`)
- **Screenshots**: `007_trip_detail_show_more.png`, `050_trip_delivered_timeline.png`
- **Purpose**: Displays full origin/destination hub names, TAT (`TAT 1d` / `TAT 27d`), total km, and horizontal 10-stage milestone stepper.
- **Top-to-Bottom Layout**:
  1. Drag handle pill (`~40 dp` width, `#E2E8F0` *(estimate)*)
  2. Trip summary header (ID, vehicle, type, agent, status)
  3. Full route rows (`Mappedu - Chennai` -> `Vijayawada - Vijayawada` / `Tuticorn - Tirunelveli`)
  4. Inner bordered timeline card (`[78,2228][1192,2469]`): Top row `"<Status> | TAT <N>d"` (left) and `"<N>km"` (right); horizontal scrollable stepper with 10 nodes & timestamps: `Confirmed` -> `Loading` -> `Intransit` -> `Unloading` -> `Delivered` -> `PODVerified` -> `Invoiced` -> `POD Disp` -> `Paid` -> `Closed`.
- **Functional Status**: Verified on both Allocated (`Confirmed` only) and Delivered (`Confirmed` through `PODVerified` timestamps populated) states (`OBSERVED`).

---

## SCR-06 — Book truck Form (`+ Book`)
- **Screen ID / Name**: `SCR-06` — Book truck
- **Parent Screen / Route**: `SCR-01` -> `+ Book`
- **Screenshots**: `008_book_truck_form.png`, `009_book_truck_form_bottom.png`
- **Purpose**: Single-page freight booking request form with route, material, weight, truck body/size chip selector, and requirements notes.
- **Top-to-Bottom Layout**:
  1. Header: Back button, Title `"Book truck"`
  2. Top 2x2 Grid Card: `From` (`Mappedu`) | `To` (`Vijayawada`) | `Material type` (`Others` with dropdown chevron) | `Ton(MT)` (`9`)
  3. Truck Type Selector Card (`21` pill chips grouped into 3 icon-prefixed sections):
     - `Open` (9 chips): `17 Feet Open`, `20 Feet Open`, `22 Feet Open`, `24 Feet Open`, `10 Whl Open`, `12 Whl Open`, `14 Whl Open`, `16 Whl Open`, `18 Whl Open`
     - `Closed` (8 chips): `32 Feet Single Axle` (selected default `#0067FA` fill / white text), `32 Feet Single Axle High Cube`, `32 Feet Multi Axle`, `32 Feet Multi Axle High Cube`, `32 Feet Triple Axle`, `20 Feet Closed`, `22 Feet Closed`, `24 Feet Closed`
     - `Trailer` (4 chips): `20 Feet Flat Bed`, `40 Feet Flat Bed`, `40 Feet Semi Bed`, `40 Feet Low Bed`
  4. `Notes` Card: Label `"Notes"`, text input (`"Enter other requirements"`, `[182,2382][1203,2484]`)
  5. Sticky/Bottom Primary CTA: `"Book"` (`#002F70` navy, `[67,2616][1203,2638]` at scroll top -> full-width `~42 dp` height when scrolled)
- **Note on Pre-fill**: Form pre-filled with user's most recent booking (`Mappedu -> Vijayawada`, `Others`, `9`, `32 Feet Single Axle`) (`OBSERVED`).

---

## SCR-07 — City Search Overlay (`From` / `To`)
- **Screen ID / Name**: `SCR-07` — City Search Overlay
- **Parent Screen / Route**: `SCR-06` -> `From` (observed) / `To` (inferred) (`AlertDialog id=radix-_r_l_`)
- **Screenshots**: `010_book_truck_from_picker.png`, `011_book_truck_from_search.png`
- **Purpose**: Searchable source/destination city picker with recent route pairs.
- **Layout**: Back arrow (`[22,163][126,270]`), rounded `#0067FA`-focused search input (`"Enter source city"` with green dot icon & clear `X` button when non-empty), `Recent` section (clickable route history pairs like `Chennai -> Coimbatore`), and `City` / `Cities` section (`"Search City minimum 4 character"` helper -> radio list of `"City, State"` matches with pin icons on right).
- **Functional Status**: Typing `"Chen"` dynamically filtered `Recent` and displayed 4 matching cities (`OBSERVED`).

---

## SCR-08 — Material type Selector Overlay
- **Screen ID / Name**: `SCR-08` — Material type Selector
- **Parent Screen / Route**: `SCR-06` -> `Material type` (`AlertDialog id=radix-_r_r_`)
- **Screenshot**: `012_book_truck_material_type.png`
- **Purpose**: Searchable radio list of **32** freight commodity categories.
- **Layout**: Back arrow, `"Enter material type"` focused input, scrollable `RadioGroup` (`Agriculture`, `Alcoholic Beverage`, `Auto Parts`, `Bags`, `Beverages`, `Bundle / Rolls`, `Carton Box`, `Carton box / FMCG`, `Drum/barrel`, `Electronic Goods`, `Empty Bottle`, `Empty Cylinder`, `Engineering materials`, `FMCG`, `Footwears`, `Furniture`, `Garment bundle`, `Glass`, `Hardware (Door / Windows)`, `Hardware (Pipes / Tiles)`, `Industrial Goods`, `Kitchenware`, `Medicine`, `Milk Products`, `Packaging Materials`, `Paint`, `Pallet / Panel`, `Paper Bundle`, `Parcel`, `Plywood`, `Sack (Jute/Plastic)`, `Scrap`, `Solid Sheets`, `Textiles`, `Tyre`, `Waste Cloths`, `Waste Material`, `Others`).

---

## SCR-09 — Tonnage Inline Numeric Input
- **Screen ID / Name**: `SCR-09` — Ton(MT) Input State
- **Parent Screen / Route**: `SCR-06` -> `Ton(MT)`
- **Screenshot**: `013_book_truck_tonnage.png`
- **Purpose**: Inline numeric entry for cargo weight in metric tons; activates `#0067FA` label highlight and Android numeric keypad (`Number keyboard`).

---

## SCR-10 — Trip List (`Trip` Tab)
- **Screen ID / Name**: `SCR-10` — Trip List
- **Parent Screen / Route**: Root Bottom Navigation (`Trip` tab, index 2)
- **Screenshots**: `014_trip_tab.png`, `015_trip_pod_pending.png`, `023_trip_tabs_scrolled.png`, `024_trip_pod_received.png`
- **Purpose**: Manages confirmed trips across 3 lifecycle stages (`Ongoing`, `POD Pending`, `POD Received`) with search and multi-criteria filtering.
- **Top-to-Bottom Layout**:
  1. Sticky Top Bar: Horizontal scrollable sub-tabs (`Ongoing`, `2 POD Pending`, `12 POD Received`) with `#0067FA` underline & count badges, plus `Toggle search` icon (`[1023,169][1127,276]`) and Filter icon (`[1136,169][1240,276]`).
  2. Tab Body:
     - `Ongoing`: Empty state card `"No trips found"` (`[509,1044][762,1100]`)
     - `POD Pending`: Trip cards displaying `#ID | TruckNo | (Type)`, `Date | Material | Weight`, `Delivered` status, route & freight, plus 3-column footer `PAYABLE | PAYMENT | BALANCE`
     - `POD Received`: Trip cards displaying `Invoiced` or `Closed` status (with intermediate stop count badge e.g. `1` on multi-point trips like `#14597279`)
  3. Persistent Bottom Nav (`Trip` active).

---

## SCR-11 — Trip detail (Delivered Trip)
- **Screen ID / Name**: `SCR-11` — Trip detail (Delivered)
- **Parent Screen / Route**: `SCR-10` -> Tap Trip Card (`#14720260`)
- **Screenshot**: `016_trip_detail_delivered.png`
- **Purpose**: Hub for post-dispatch trip operations: timeline, payments, documents, live/toll tracking, issue reporting, and balance settlement.
- **Layout**: Header (`Go back`, `"Trip detail"`), Summary card (`Show more`), `"Quick actions"` card with 4 rows (`Payments`, `Documents: Invoice, E LR, POD`, `Tracking: Chinthamani Toll Plaza | 02-Nov 12:15 | Ontime`, `Help`), and sticky `#002F70` CTA `"Pay ₹3850"`.

---

## SCR-12 — Payment details Bottom Sheet
- **Screen ID / Name**: `SCR-12` — Payment details
- **Parent Screen / Route**: `SCR-11` -> `Payments` (`AlertDialog id=radix-_r_2f_`)
- **Screenshot**: `017_trip_payments.png`
- **Purpose**: Itemized trip billing breakdown (`Freight`, `Unloading Charges`, `Unloading Halting`), payment transaction history (payment method, reference, date, amount), summary box (`PAYABLE`, `PAID`, `BALANCE`), and `"Pay ₹3850"` CTA. *(Note: UI showed a discrepancy between sheet balance `₹9050` and CTA `Pay ₹3850`, directly observed in `017_trip_payments.png`.)*

---

## SCR-13 — Documents Bottom Sheet
- **Screen ID / Name**: `SCR-13` — Documents
- **Parent Screen / Route**: `SCR-11` -> `Documents` (`AlertDialog id=radix-_r_2i_`)
- **Screenshot**: `018_trip_documents.png`
- **Purpose**: Document hub for trip paperwork across 4 groups:
  1. `Loading Memo`: View details button + PDF button
  2. `LR` (`1 Files`): Existing PDF file row with Eye icon; `Auto E-LR` (Edit pencil + PDF); `Manual E-LR` (`+` add icon); `E-way Bill` (PDF icon)
  3. `POD` (`1 Files`): Uploaded POD PDF file row with Eye icon
  4. `Invoice`: Billing Address summary + PDF icon

---

## SCR-14 — Tracking Screen
- **Screen ID / Name**: `SCR-14` — Tracking
- **Parent Screen / Route**: `SCR-11` -> `Tracking`
- **Screenshots**: `019_trip_tracking.png`, `020_trip_tracking_bottom.png`
- **Purpose**: Full route map, trip progress bar, ETA, driver phone, E-way bill expiry, last FASTag/GPS toll checkpoint, and reverse-chronological toll plaza timeline.
- **Layout**:
  1. Header: Back arrow, `"Tracking"`, green circular Share button (`[1147,174][1240,270]`)
  2. Embedded Route Map (`45–1226 x 346–1021 px` / `~240 dp` height) with origin green flag, polyline, and interactive blue toll pins
  3. Route Progress Card: `Mappedu -> Tuticorn`, `"On time"`, `"ETA: 03-Nov-26"`, `"Total : 595 km"`, `"Remaining: 0 km"`, blue progress bar with truck marker, `"Start : 01-Nov-26"`, `"End : 05-Nov-26"`
  4. Driver & E-way Card: Clickable Driver phone + `E-way expiry: 03-Nov-26`
  5. Truck & Last Tracked Card: `Truck No: TN37DM2598`, `Status: Delivered`, `Last location: Vandiyur Toll Plaza`, `Last tracked: 26-Nov 14:39`
  6. Scrollable Toll Checkpoint Timeline Card: Red flag destination (`Tuticorn Reached on 02-Nov 14:56`) -> 11 toll plaza timestamps (`Chinthamani`, `Elliyarpathy`, `Chittampatti`, `Boothakudi`, `Samayapuram`, `Thirumandurai`, `Sengurichi`, `Vikkravandi`, `Athur`) -> Green flag origin (`Mappedu Started on 31-Oct 14:52`).

---

## SCR-15 — Trip Help Issue Type Selector
- **Screen ID / Name**: `SCR-15` — Help
- **Parent Screen / Route**: `SCR-11` -> `Help`
- **Screenshot**: `021_trip_help.png`
- **Purpose**: Structured trip issue picker (`"What do you need help with?"` / `"Pick an issue type to raise a support ticket."`) with 3 options: `Payments`, `Delivery`, `POD`.

---

## SCR-16 — Get Help Confirmation Bottom Sheet
- **Screen ID / Name**: `SCR-16` — Get Help
- **Parent Screen / Route**: `SCR-15` -> Tap issue type (`Payments`) (`AlertDialog id=radix-_r_2o_`)
- **Screenshot**: `022_trip_help_payments_form.png`
- **Purpose**: Confirms selected trip card + issue statement (`"I have an issue with Payments"`) + callback expectation copy + `"Request call back"` `#002F70` button.

---

## SCR-17 — Trip Inline Search Bar
- **Screen ID / Name**: `SCR-17` — Trip Inline Search
- **Parent Screen / Route**: `SCR-10` -> `Toggle search`
- **Screenshot**: `025_trip_search.png`
- **Purpose**: Floating rounded search overlay (`[348,295][1113,397]`) with `"Search trip id, truck or city"` placeholder and auto-opened QWERTY keyboard.

---

## SCR-18 — Trip Filter Modal
- **Screen ID / Name**: `SCR-18` — Filter (Trips)
- **Parent Screen / Route**: `SCR-10` -> Filter icon (`AlertDialog id=radix-_r_2r_`)
- **Screenshots**: `026_trip_filter.png`, `027_trip_filter_period.png`
- **Purpose**: Extends `SCR-02` with a 3rd left-rail tab `"Period"` (`Last Week`, `Last Month`, `Last Three Month`, `Custom Range`).

---

## SCR-19 — Custom Date Range Picker Modal
- **Screen ID / Name**: `SCR-19` — Select Date Range
- **Parent Screen / Route**: `SCR-18` -> `Custom Range`
- **Screenshot**: `028_trip_filter_custom_date.png`
- **Purpose**: Modal calendar (`Start Date: -`, `End Date: -`, `«`, `<`, `November 2026`, `>`, `»`, MON–SUN grid, today highlighted in yellow, disabled/enabled `"Select"` button, `"X"` close).

---

## SCR-20 — Instant Market Rates (`Rates` Tab)
- **Screen ID / Name**: `SCR-20` — Book Trucks & Get Instant Rates
- **Parent Screen / Route**: Root Bottom Navigation (`Rates` tab, index 3)
- **Screenshots**: `029_rates_tab.png`, `030_rates_past_rates.png`, `031_rates_bottom.png`
- **Purpose**: Displays live estimated market freight prices and ranges for 8 truck categories on any selected city corridor.
- **Top-to-Bottom Layout**:
  1. Title: `"Book Trucks & Get Instant Rates"` (centered)
  2. Dual City Card: `FROM` (`Chennai`, green pin) / `TO` (`Bangalore`, orange pin) + circular `Swap cities` (`⇅`) button on right
  3. Corridor Subheader: `"Chennai to Bangalore Transportation Service"` + pill `"~352 km"`
  4. Scrollable Rate Cards (8 truck classes from `32 ft Container Truck (MXL)` up to `16 Tyre Truck`): body/tonnage caption, truck name, `"Past Rates →"` link, price range (muted), headline rate (`₹32,300`).

---

## SCR-21 — Past Rates Historical Chart & Trips Sheet
- **Screen ID / Name**: `SCR-21` — Past Rates
- **Parent Screen / Route**: `SCR-20` -> `Past Rates →`
- **Screenshot**: `032_rates_past_rates_detail.png`
- **Purpose**: Shows selected truck rate header + `"Book Truck →"` `#0067FA` CTA, 6-month daily/weekly rate trend line chart (`Jun 26`–`Nov 26`, Y-axis `₹0K`–`₹38K`), recent historical trips list, and `"View 367 more trips ↓"` button.

---

## SCR-22 — Support Conversations (`Support` Tab)
- **Screen ID / Name**: `SCR-22` — Support
- **Parent Screen / Route**: Root Bottom Navigation (`Support` tab, index 4) or `SCR-04 -> Chat`
- **Screenshots**: `033_support_tab.png`, `034_support_chat_filter.png`
- **Purpose**: Unified inbox for support tickets and trip chats.
- **Layout**: Search box (`"Search for trip id, cardcodes or truck no"` in `Tickets`; `"Search"` in `Chat`), pill toggles (`Tickets` | `Chat`), empty state `# No conversations found`, and `Tickets`-only bottom pagination bar (`100 | 250 | 500 | 1000`, `0 of 0`).

---

## SCR-23 — Account Hub (`Account` Tab)
- **Screen ID / Name**: `SCR-23` — Account
- **Parent Screen / Route**: Root Bottom Navigation (`Account` tab, index 5)
- **Screenshots**: `035_account_tab.png`, `047_account_bottom.png`
- **Purpose**: Sticky user/account header + vertical settings/module list + branded footer (`FR8 BOOK`, `Version: 2.0.122`, `Terms & conditions`).
- **Menu Order**: `Organization` -> `Users` -> `Account balance (+ Add money)` -> `FR8 Coins (₹ 98)` -> `My payments` -> `Pending payments` -> `POD/Truck tracking` -> `Watch video` -> `Help` -> `Logout` -> `Delete account`.

---

## SCR-24 — Notifications Inbox (`Inbox by Novu`)
- **Screen ID / Name**: `SCR-24` — Notifications Inbox
- **Parent Screen / Route**: `SCR-23` -> Notification Bell (`[1125,228][1229,332]`)
- **Screenshot**: `036_account_notifications.png`
- **Purpose**: Full-screen notification feed powered by Novu (`AlertDialog id=radix-_r_3c_`, `novu-root-...`), with back button, `"Search notifications..."`, preferences gear icon, empty state `"Quiet for now. Check back later."`, and `"Inbox by Novu"` footer.

---

## SCR-25 — Rename Profile Bottom Sheet
- **Screen ID / Name**: `SCR-25` — Rename
- **Parent Screen / Route**: `SCR-23` -> Profile Name/Pencil (`[19,174][320,248]`)
- **Screenshot**: `037_account_edit_profile.png`
- **Purpose**: Bottom sheet to edit display name (`EditText`, `Cancel`, `Save`).

---

## SCR-26 — Organization Tax Details Bottom Sheet
- **Screen ID / Name**: `SCR-26` — Organization
- **Parent Screen / Route**: `SCR-23` -> `Organization` row
- **Screenshot**: `038_account_organization.png`
- **Purpose**: Displays corporate entity legal name, `PAN`, and `GSTIN` in a two-column read-only bottom sheet.

---

## SCR-27 — Users Management Bottom Sheet
- **Screen ID / Name**: `SCR-27` — Users
- **Parent Screen / Route**: `SCR-23` -> `Users` row
- **Screenshot**: `039_account_users.png`
- **Purpose**: Lists authorized organization users with edit name pencil, `Admin` role pill badge (no delete button on Admin row), delete trash icon on sub-users, and `+ Add user` button.

---

## SCR-28 — Add user Form
- **Screen ID / Name**: `SCR-28` — Add user
- **Parent Screen / Route**: `SCR-27` -> `+ Add user`
- **Screenshot**: `040_account_add_user.png`
- **Purpose**: Full screen form with `Name` (`Enter name`), `Mobile number` (`Enter mobile number`), and sticky bottom `"Add User"` CTA.

---

## SCR-29 — Account balance / Bank Top-up Screen
- **Screen ID / Name**: `SCR-29` — Account balance
- **Parent Screen / Route**: `SCR-23` -> `Account balance` / `+ Add money`
- **Screenshot**: `041_account_balance.png`
- **Purpose**: Shows current wallet balance (`₹0`), corporate virtual/collection bank account details (`FR8 INDIA PRIVATE LIMITED`, `ACC NO`, `BANK`, `BRANCH`, `IFSC`, `Share` button), and 2-step NEFT/RTGS top-up guide.

---

## SCR-30 — My payments
- **Screen ID / Name**: `SCR-30` — My payments
- **Parent Screen / Route**: `SCR-23` -> `My payments`
- **Screenshot**: `042_account_my_payments.png`
- **Purpose**: Lists incoming payments/credits to the customer account; currently displays empty state `"No incoming payments found"`.

---

## SCR-31 — Pending payments
- **Screen ID / Name**: `SCR-31` — Pending payments
- **Parent Screen / Route**: `SCR-23` -> `Pending payments`
- **Screenshot**: `043_account_pending_payments.png`
- **Purpose**: Lists all trips with unpaid balances (`₹42654` header total), a header `"Download"` export action, and clickable-looking trip cards showing pending amount per trip.

---

## SCR-32 & SCR-33 — POD/Truck tracking (Input & Results)
- **Screen IDs / Names**: `SCR-32` (Input Form) -> `SCR-33` (Results)
- **Parent Screen / Route**: `SCR-23` -> `POD/Truck tracking`
- **Screenshots**: `044_account_pod_truck_tracking.png`, `045_account_pod_truck_tracking_result.png`
- **Purpose**: Bulk lookup of POD delivery status by pasting/typing one or multiple truck numbers (auto-extracts unique truck numbers).
- **Results Screen (`SCR-33`)**: Header Download/Export icon (`[1136,169][1240,276]`), `"Showing results for"` + truck chip (`TN37DM2598`), view toggle (`Table view` / `Card view` — note tapping `Switch to table view` triggered `"Open with Sheets"` resolver on device), and grouped trip cards showing `TN37DM2598 (SXL)`, `1 trips`, `#ID | Date`, route, `POD Exp. delivery`, and `Last status: Collection pending`.

---

## SCR-34 — Account Help / Support Call Bottom Sheet
- **Screen ID / Name**: `SCR-34` — Support (Account)
- **Parent Screen / Route**: `SCR-23` -> `Help`
- **Screenshot**: `046_account_help.png`
- **Purpose**: Quick sales & support callback sheet (`"Customer sale and support"` + `[phone] Call` link).

---

## SCR-35 — Watch videos Tutorial Library
- **Screen ID / Name**: `SCR-35` — Watch videos
- **Parent Screen / Route**: `SCR-23` -> `Watch video`
- **Screenshot**: `048_account_watch_video.png`
- **Purpose**: Vertical list of **7** illustrated onboarding/how-to video cards covering booking, confirmation, payments, live rates, tracking, POD status, and E-LR generation.

---

## SCR-36 — Terms and Conditions WebView
- **Screen ID / Name**: `SCR-36` — TERMS AND CONDITIONS
- **Parent Screen / Route**: `SCR-23` -> `Terms & conditions`
- **Screenshot**: `049_account_terms.png`
- **Purpose**: Embedded `fr8.in` customer Terms & Conditions page with `Book Truck` / `Find Load` top tabs, `← Back to FR8`, legal text (`Last updated April 2026`), footer links, and floating green WhatsApp chat button (`id=waBtn`).
