# 02 — Complete Screen Inventory

Screens are listed in actual inspection order, including primary screens, sub-screens, bottom sheets, full-screen overlays, and unverified pre-auth / irreversible gates.

| Order | Screen ID | Screen / Surface Name | Type | Parent Screen | Access Status | Primary Screenshot |
|---|---|---|---|---|---|---|
| 1 | `SCR-01` | My bookings (`Book` Tab) | Primary Tab Screen | Root Shell | **OBSERVED** | `001_initial.png` |
| 2 | `SCR-02` | My bookings Filter Modal | Full-Screen Modal (`Users` & `Truck type`) | `SCR-01` | **OBSERVED** | `002_book_filter.png`, `003_book_filter_trucktype.png`, `004_book_filter_trucktype_bottom.png` |
| 3 | `SCR-03` | Booking detail (Expired Booking) | Sub-Screen | `SCR-01` | **OBSERVED** | `005_booking_card_tap.png` |
| 4 | `SCR-04` | Trip detail (Allocated Booking) | Sub-Screen | `SCR-01` | **OBSERVED** | `006_booking_detail_allocated.png` |
| 5 | `SCR-05` | Trip Timeline Bottom Sheet (`Show more`) | Bottom Sheet | `SCR-04` / `SCR-11` | **OBSERVED** | `007_trip_detail_show_more.png`, `050_trip_delivered_timeline.png` |
| 6 | `SCR-06` | Book truck Form (`+ Book`) | Sub-Screen / Form | `SCR-01` / `SCR-03` / `SCR-19` | **OBSERVED** | `008_book_truck_form.png`, `009_book_truck_form_bottom.png` |
| 7 | `SCR-07` | Source / Destination City Search Overlay (`From` / `To`) | Full-Screen Search Dialog | `SCR-06` | **OBSERVED** | `010_book_truck_from_picker.png`, `011_book_truck_from_search.png` |
| 8 | `SCR-08` | Material type Selector Overlay | Full-Screen Search & Radio Dialog | `SCR-06` | **OBSERVED** | `012_book_truck_material_type.png` |
| 9 | `SCR-09` | Tonnage Inline Numeric Input (`Ton(MT)`) | Inline Numeric Input + Number Keyboard | `SCR-06` | **OBSERVED** | `013_book_truck_tonnage.png` |
| 10 | `SCR-10` | Trip List (`Trip` Tab — `Ongoing`, `POD Pending`, `POD Received`) | Primary Tab Screen (3 Sub-Tabs) | Root Shell | **OBSERVED** | `014_trip_tab.png`, `015_trip_pod_pending.png`, `023_trip_tabs_scrolled.png`, `024_trip_pod_received.png` |
| 11 | `SCR-11` | Trip detail (Delivered / Completed Trip) | Sub-Screen | `SCR-10` | **OBSERVED** | `016_trip_detail_delivered.png` |
| 12 | `SCR-12` | Payment details Bottom Sheet | Bottom Sheet | `SCR-11` | **OBSERVED** | `017_trip_payments.png` |
| 13 | `SCR-13` | Documents Bottom Sheet | Bottom Sheet | `SCR-11` | **OBSERVED** | `018_trip_documents.png` |
| 14 | `SCR-14` | Live / Toll Route Tracking Screen | Sub-Screen (Map + Progress + Toll Timeline) | `SCR-11` | **OBSERVED** | `019_trip_tracking.png`, `020_trip_tracking_bottom.png` |
| 15 | `SCR-15` | Trip Help Issue Type Selector (`Help`) | Sub-Screen | `SCR-11` | **OBSERVED** | `021_trip_help.png` |
| 16 | `SCR-16` | Get Help Confirmation Bottom Sheet | Bottom Sheet | `SCR-15` | **OBSERVED** | `022_trip_help_payments_form.png` |
| 17 | `SCR-17` | Trip Inline Search Bar | Floating Search Overlay | `SCR-10` | **OBSERVED** | `025_trip_search.png` |
| 18 | `SCR-18` | Trip Filter Modal (`Users`, `Truck type`, `Period`) | Full-Screen Modal | `SCR-10` | **OBSERVED** | `026_trip_filter.png`, `027_trip_filter_period.png` |
| 19 | `SCR-19` | Custom Date Range Picker Modal | Calendar Modal Dialog | `SCR-18` | **OBSERVED** | `028_trip_filter_custom_date.png` |
| 20 | `SCR-20` | Instant Market Rates (`Rates` Tab) | Primary Tab Screen | Root Shell | **OBSERVED** | `029_rates_tab.png`, `030_rates_past_rates.png`, `031_rates_bottom.png` |
| 21 | `SCR-21` | Past Rates Historical Chart & Trips Bottom Sheet | Bottom Sheet | `SCR-20` | **OBSERVED** | `032_rates_past_rates_detail.png` |
| 22 | `SCR-22` | Support Conversations (`Support` Tab — `Tickets` & `Chat`) | Primary Tab Screen | Root Shell / `SCR-04` | **OBSERVED** | `033_support_tab.png`, `034_support_chat_filter.png` |
| 23 | `SCR-23` | Account Hub (`Account` Tab) | Primary Tab Screen | Root Shell | **OBSERVED** | `035_account_tab.png`, `047_account_bottom.png` |
| 24 | `SCR-24` | Notifications Inbox (`Inbox by Novu`) | Full-Screen Modal | `SCR-23` | **OBSERVED** | `036_account_notifications.png` |
| 25 | `SCR-25` | Rename Profile Bottom Sheet | Bottom Sheet | `SCR-23` | **OBSERVED** | `037_account_edit_profile.png` |
| 26 | `SCR-26` | Organization Tax Details Bottom Sheet | Bottom Sheet | `SCR-23` | **OBSERVED** | `038_account_organization.png` |
| 27 | `SCR-27` | Users Management Bottom Sheet | Bottom Sheet | `SCR-23` | **OBSERVED** | `039_account_users.png` |
| 28 | `SCR-28` | Add user Form | Sub-Screen / Form | `SCR-27` | **OBSERVED** | `040_account_add_user.png` |
| 29 | `SCR-29` | Account balance / Top-up Bank Details | Sub-Screen | `SCR-23` | **OBSERVED** | `041_account_balance.png` |
| 30 | `SCR-30` | My payments (Incoming Payments) | Sub-Screen | `SCR-23` | **OBSERVED** | `042_account_my_payments.png` |
| 31 | `SCR-31` | Pending payments List | Sub-Screen | `SCR-23` | **OBSERVED** | `043_account_pending_payments.png` |
| 32 | `SCR-32` | POD/Truck tracking Input Form | Sub-Screen / Form | `SCR-23` | **OBSERVED** | `044_account_pod_truck_tracking.png` |
| 33 | `SCR-33` | POD/Truck tracking Results | Sub-Screen | `SCR-32` | **OBSERVED** | `045_account_pod_truck_tracking_result.png` |
| 34 | `SCR-34` | Account Help / Support Call Bottom Sheet | Bottom Sheet | `SCR-23` | **OBSERVED** | `046_account_help.png` |
| 35 | `SCR-35` | Watch videos Tutorial Library | Sub-Screen | `SCR-23` | **OBSERVED** | `048_account_watch_video.png` |
| 36 | `SCR-36` | Terms and Conditions WebView (`fr8.in`) | In-App Web Page | `SCR-23` | **OBSERVED** | `049_account_terms.png` |
| 37 | `SCR-U1` | Splash / Welcome / Login / OTP / Onboarding | Pre-Authentication Flow | App Cold Start (unauthenticated) | **NOT VERIFIED** (Active session present; logout skipped per Phase 10) | — |
| 38 | `SCR-U2` | Payment Gateway / Checkout Sheet (`Confirm booking` / `Pay ₹3850`) | Transactional Flow | `SCR-01` / `SCR-04` / `SCR-11` / `SCR-12` | **NOT VERIFIED** (Financial/order confirmation skipped per Phase 10) | — |
| 39 | `SCR-U3` | Rates City Picker (`cpPanel` — `Select City`) | Search Dialog (present in DOM) | `SCR-20` | **PARTIALLY OBSERVED** (Detected in layout DOM as hidden `AlertDialog id=cpPanel`; not interactively opened) | — |
| 40 | `SCR-U4` | Document Viewers / Auto E-LR Editor / Manual E-LR Upload | Sub-Modals / External Viewers | `SCR-13` | **NOT VERIFIED** | — |
| 41 | `SCR-U5` | Account Logout / Delete Account Confirmation | Account Action | `SCR-23` | **NOT VERIFIED** (Irreversible / session-terminating per Phase 10) | — |

### Summary Counts
- **Discovered & Inspected Screens / Overlays**: **36** (`SCR-01` through `SCR-36`)
- **Primary Bottom-Tab Screens**: **5** (`Book`, `Trip`, `Rates`, `Support`, `Account`)
- **Additional Inaccessible / Safety-Skipped Surfaces**: **5** grouped areas (`SCR-U1` through `SCR-U5`)
