# 01 — FR8 Screen Inventory

Comprehensive inventory of all 36 observed and audited surfaces in the FR8 application (`in.fr8.book`), ordered by navigation tree hierarchy and tab structure.

| Screen ID | Surface / Screen Name | Navigation Path / Trigger | View Type | Key Components | Primary Screenshot |
|---|---|---|---|---|---|
| **SCR-01** | My bookings (`Book` Tab) | Bottom Tab 1 (`Book`) | Main Tab Screen | Sticky header, `+ Book` pill button, Filter icon, Booking cards (`Allocated`, `Expired`), Confirm booking CTA | `001_initial.png` |
| **SCR-02** | Bookings Filter Modal | `SCR-01` -> Filter button | Full-Screen Dialog | Left tab rail (`Users`, `Truck type`), Checkbox list (21 truck types), Reset & Apply CTAs | `002_book_filter.png` |
| **SCR-03** | Booking Detail (Expired) | `SCR-01` -> Tap Expired card | Sub-Screen | Back button, Booking summary card, Red `Expired` pill, Sticky `Book` re-book CTA | `005_booking_card_tap.png` |
| **SCR-04** | Trip Detail (Allocated) | `SCR-01` -> Tap Allocated card | Sub-Screen | Vehicle/agent details, Traffic agent call card, Driver call card, Quick action `Chat`, `Show more` link | `006_booking_detail_allocated.png` |
| **SCR-05** | Trip Timeline Sheet | `SCR-04` / `SCR-11` -> `Show more` | Bottom Sheet | 10-stage horizontal stepper (`Confirmed` -> `Loading` -> `Intransit` -> `Delivered` -> `Closed`), TAT, km | `007_trip_detail_show_more.png` |
| **SCR-06** | Book Truck Form | `SCR-01` -> `+ Book` | Form Screen | 2x2 grid (`From`, `To`, `Material type`, `Ton`), 21 truck type chips in 3 categories (`Open`, `Closed`, `Trailer`), `Notes`, `Book` CTA | `008_book_truck_form.png` |
| **SCR-07** | City Search Overlay | `SCR-06` -> `From` / `To` | Search Dialog | Back arrow, Search input, Recent route history pairs, Alphabetical city radio list | `010_book_truck_from_picker.png` |
| **SCR-08** | Material Type Selector | `SCR-06` -> `Material type` | Selection Dialog | Search bar, 32 commodity radio options (`Auto Parts`, `FMCG`, `Industrial Goods`, `Others`, etc.) | `012_book_truck_material_type.png` |
| **SCR-09** | Tonnage Numeric Input | `SCR-06` -> `Ton(MT)` | Inline Numeric Input | Numeric keypad input, decimal support, validation rules | `013_book_truck_tonnage.png` |
| **SCR-10** | Trip List (`Trip` Tab) | Bottom Tab 2 (`Trip`) | Main Tab Screen | 3 sub-tabs (`Ongoing`, `POD Pending`, `POD Received`), Search icon, Filter icon, Trip cards | `014_trip_tab.png` |
| **SCR-11** | Trip Detail (Delivered) | `SCR-10` -> Tap Delivered card | Sub-Screen | Completed status, Route summary, Action row (`Payments`, `Documents`, `Tracking`, `Help`) | `016_trip_detail_delivered.png` |
| **SCR-12** | Payment Details Sheet | `SCR-11` -> `Payments` | Bottom Sheet | Advance payment, Balance payment, Detention charges, TDS, Total freight breakdown | `017_trip_payments.png` |
| **SCR-13** | Documents Sheet | `SCR-11` -> `Documents` | Bottom Sheet | Stamped POD copy, Lorry Receipt (LR), E-Way Bill viewer, download buttons | `018_trip_documents.png` |
| **SCR-14** | Live Highway Tracking | `SCR-11` -> `Tracking` | Map & Timeline Sub-Screen | Interactive route map, current GPS speed, Toll plaza passage timeline with timestamps | `019_trip_tracking.png` |
| **SCR-15** | Trip Help Selector | `SCR-11` -> `Help` | Issue Category Screen | Problem categories (`Delayed Delivery`, `POD Missing`, `Payment Discrepancy`, `Vehicle Breakdown`) | `021_trip_help.png` |
| **SCR-16** | Help Confirmation Sheet | `SCR-15` -> Select issue | Bottom Sheet | Issue acknowledgment, callback request, emergency dispatch helpline | `022_trip_help_payments_form.png` |
| **SCR-17** | Trip Search Overlay | `SCR-10` -> Search icon | Search Overlay | Filter trips by LR number, vehicle number, city, or date | `025_trip_search.png` |
| **SCR-18** | Trip Filter Modal | `SCR-10` -> Filter icon | Modal Dialog | Multi-filter by Users, Truck type, and Date Period (`Today`, `Last 7 Days`, `Custom`) | `026_trip_filter.png` |
| **SCR-19** | Custom Date Range Modal | `SCR-18` -> `Custom Date` | Calendar Dialog | From and To date selection with calendar grid | `028_trip_filter_custom_date.png` |
| **SCR-20** | Market Rates (`Rates` Tab) | Bottom Tab 3 (`Rates`) | Main Tab Screen | Corridor freight rate search (`From` -> `To`), recent lane rate trends, historical pricing | `029_rates_tab.png` |
| **SCR-21** | Past Rates Historical Sheet | `SCR-20` -> Tap lane | Bottom Sheet | Rate progression graph over past 90 days, historical trip count, average rate/ton | `032_rates_past_rates_detail.png` |
| **SCR-22** | Support Hub (`Support` Tab) | Bottom Tab 4 (`Support`) | Main Tab Screen | Sub-tabs: `Tickets` and `Chat`. Active tickets list, conversation history, new ticket trigger | `033_support_tab.png` |
| **SCR-23** | Account Hub (`Account` Tab) | Bottom Tab 5 (`Account`) | Main Tab Screen | User profile, Organization tax info, Users management, Balance, Help, Terms | `035_account_tab.png` |
| **SCR-24** | Notifications Inbox | `SCR-23` -> Bell icon | Modal Overlay | In-app alerts for dispatch, loading, delivery milestones, and payment receipts | `036_account_notifications.png` |
| **SCR-25** | Edit Profile Sheet | `SCR-23` -> Profile card | Bottom Sheet | Name, mobile number, email, language preference | `037_account_edit_profile.png` |
| **SCR-26** | Organization Tax Details | `SCR-23` -> Organization | Bottom Sheet | Company Name, GSTIN, PAN, Registered Billing Address, Verified state badge | `038_account_organization.png` |
| **SCR-27** | Users Management | `SCR-23` -> Users | Bottom Sheet | List of authorized sub-users, roles (`Admin`, `Dispatcher`), `+ Add user` CTA | `039_account_users.png` |
| **SCR-28** | Add User Form | `SCR-27` -> `+ Add user` | Form Screen | Name, Phone, Email, Role selector, permission checkboxes | `040_account_add_user.png` |
| **SCR-29** | Account Balance & Top-up | `SCR-23` -> Balance | Sub-Screen | Available balance, Virtual Account Number (VAN) for NEFT/RTGS, IFSC code | `041_account_balance.png` |
| **SCR-30** | My Payments List | `SCR-23` -> My payments | Sub-Screen | Incoming and reconciled payment transaction records | `042_account_my_payments.png` |
| **SCR-31** | Pending Payments List | `SCR-23` -> Pending payments | Sub-Screen | Outstanding invoices awaiting settlement, Due dates, Pay button | `043_account_pending_payments.png` |
| **SCR-32** | POD Tracking Lookup Form | `SCR-23` -> POD tracking | Input Sub-Screen | Direct search input for LR Number, Booking Reference, or Truck Registration | `044_account_pod_truck_tracking.png` |
| **SCR-33** | POD Tracking Results | `SCR-32` -> Submit lookup | Sub-Screen | Delivery status, receiver stamp preview, download verified POD button | `045_account_pod_truck_tracking_result.png` |
| **SCR-34** | Account Help / Call Sheet | `SCR-23` -> Help | Bottom Sheet | 24/7 Support line, account manager contact card, emergency WhatsApp support | `046_account_help.png` |
| **SCR-35** | Tutorial Videos Library | `SCR-23` -> Watch videos | Sub-Screen | Video guides on booking trucks, tracking consignments, and downloading PODs | `048_account_watch_video.png` |
| **SCR-36** | Terms & Conditions | `SCR-23` -> Terms | WebView Screen | Legal terms, privacy policy, carrier liability rules | `049_account_terms.png` |
