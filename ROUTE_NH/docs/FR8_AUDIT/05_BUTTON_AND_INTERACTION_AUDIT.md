# 05 — Button and Interaction Audit

Every discovered interactive element across `in.fr8.book` (`v2.0.122`), documented in inspection order. Uninspected destructive/transactional actions are explicitly marked `NOT VERIFIED`.

---

## Global Bottom Navigation (`SCR-01`, `SCR-10`, `SCR-20`, `SCR-22`, `SCR-23`)

- **ELEMENT**: Bottom Nav — Book
  - **TYPE**: Bottom Navigation Button
  - **SCREEN**: Global Shell (`SCR-01`..`SCR-23`)
  - **VISIBLE LABEL**: `Book`
  - **ACTION**: Tap (`[144, 2558]`)
  - **RESULT**: Switches root tab to `My bookings`
  - **DESTINATION**: `SCR-01`
  - **INPUT REQUIRED**: None
  - **VALIDATION**: None
  - **SCREENSHOT**: `001_initial.png`
  - **NOTES**: Active state turns icon and text `#0067FA`.

- **ELEMENT**: Bottom Nav — Trip
  - **TYPE**: Bottom Navigation Button
  - **SCREEN**: Global Shell
  - **VISIBLE LABEL**: `Trip`
  - **ACTION**: Tap (`[389, 2558]`)
  - **RESULT**: Switches root tab to `Trip` list (`Ongoing` default)
  - **DESTINATION**: `SCR-10`
  - **INPUT REQUIRED**: None
  - **VALIDATION**: None
  - **SCREENSHOT**: `014_trip_tab.png`
  - **NOTES**: —

- **ELEMENT**: Bottom Nav — Rates
  - **TYPE**: Bottom Navigation Button
  - **SCREEN**: Global Shell
  - **VISIBLE LABEL**: `Rates`
  - **ACTION**: Tap (`[635, 2558]`)
  - **RESULT**: Switches root tab to Instant Market Rates
  - **DESTINATION**: `SCR-20`
  - **INPUT REQUIRED**: None
  - **VALIDATION**: None
  - **SCREENSHOT**: `029_rates_tab.png`
  - **NOTES**: —

- **ELEMENT**: Bottom Nav — Support
  - **TYPE**: Bottom Navigation Button
  - **SCREEN**: Global Shell
  - **VISIBLE LABEL**: `Support`
  - **ACTION**: Tap (`[881, 2558]`)
  - **RESULT**: Switches root tab to `Support` (`Tickets` / `Chat`)
  - **DESTINATION**: `SCR-22`
  - **INPUT REQUIRED**: None
  - **VALIDATION**: None
  - **SCREENSHOT**: `033_support_tab.png`
  - **NOTES**: —

- **ELEMENT**: Bottom Nav — Account
  - **TYPE**: Bottom Navigation Button
  - **SCREEN**: Global Shell
  - **VISIBLE LABEL**: `Account`
  - **ACTION**: Tap (`[1126, 2558]`)
  - **RESULT**: Switches root tab to `Account` hub
  - **DESTINATION**: `SCR-23`
  - **INPUT REQUIRED**: None
  - **VALIDATION**: None
  - **SCREENSHOT**: `035_account_tab.png`
  - **NOTES**: —

---

## Book Module (`SCR-01` through `SCR-09`)

- **ELEMENT**: New Booking Button
  - **TYPE**: Header Outline Pill Button
  - **SCREEN**: `SCR-01` (My bookings)
  - **VISIBLE LABEL**: `+ Book`
  - **ACTION**: Tap (`[1017, 222]`)
  - **RESULT**: Opens `Book truck` creation form
  - **DESTINATION**: `SCR-06`
  - **INPUT REQUIRED**: None
  - **VALIDATION**: None
  - **SCREENSHOT**: `008_book_truck_form.png`
  - **NOTES**: Pre-fills last route/material/weight/truck type.

- **ELEMENT**: Bookings Filter Button
  - **TYPE**: Header Icon Button
  - **SCREEN**: `SCR-01` (My bookings)
  - **VISIBLE LABEL**: Sliders icon
  - **ACTION**: Tap (`[1188, 222]`)
  - **RESULT**: Opens full-screen Filter modal (`Users`, `Truck type`)
  - **DESTINATION**: `SCR-02`
  - **INPUT REQUIRED**: None
  - **VALIDATION**: None
  - **SCREENSHOT**: `002_book_filter.png`
  - **NOTES**: —

- **ELEMENT**: Booking Filter Tabs / Checkboxes / Reset / Apply / Close
  - **TYPE**: Modal Controls
  - **SCREEN**: `SCR-02`
  - **VISIBLE LABEL**: `Users`, `Truck type`, checkboxes, `Reset`, `Apply`, `X`
  - **ACTION**: Tap (`[180,334]`, `[180,432]`, `[1205,211]`)
  - **RESULT**: Switches filter pane; `X` closes modal; `Apply` is disabled until selection changes
  - **DESTINATION**: `SCR-01` (on close)
  - **INPUT REQUIRED**: Optional checkbox selection
  - **VALIDATION**: `Apply` enabled only when filter state is dirty (`INFERRED` from disabled grey styling `#7F97B7`)
  - **SCREENSHOT**: `002_book_filter.png`, `003_book_filter_trucktype.png`
  - **NOTES**: `Apply` and `Reset` execution `NOT VERIFIED`.

- **ELEMENT**: Expired Booking Card
  - **TYPE**: Clickable Card
  - **SCREEN**: `SCR-01`
  - **VISIBLE LABEL**: `#15272934 | 20 FEET CLOSED ... Expired`
  - **ACTION**: Tap (`[400, 1000]`)
  - **RESULT**: Opens `Booking detail` view
  - **DESTINATION**: `SCR-03`
  - **INPUT REQUIRED**: None
  - **VALIDATION**: None
  - **SCREENSHOT**: `005_booking_card_tap.png`
  - **NOTES**: —

- **ELEMENT**: Re-Book Sticky Button (Expired Detail)
  - **TYPE**: Primary Navy Button
  - **SCREEN**: `SCR-03`
  - **VISIBLE LABEL**: `Book`
  - **ACTION**: NOT VERIFIED
  - **RESULT**: Likely opens `Book truck` (`SCR-06`) pre-filled with that expired booking's route (`INFERRED`)
  - **DESTINATION**: `SCR-06` (`INFERRED`)
  - **INPUT REQUIRED**: None
  - **VALIDATION**: None
  - **SCREENSHOT**: `005_booking_card_tap.png`
  - **NOTES**: Marked `NOT VERIFIED` to avoid triggering booking flow inadvertently.

- **ELEMENT**: Allocated Booking Card
  - **TYPE**: Clickable Card
  - **SCREEN**: `SCR-01`
  - **VISIBLE LABEL**: `#15309639 | TN20CQ6185 (SXL) ... Allocated`
  - **ACTION**: Tap card body (`[400, 440]`)
  - **RESULT**: Opens `Trip detail` for the allocated booking
  - **DESTINATION**: `SCR-04`
  - **INPUT REQUIRED**: None
  - **VALIDATION**: None
  - **SCREENSHOT**: `006_booking_detail_allocated.png`
  - **NOTES**: —

- **ELEMENT**: Confirm booking (Card & Sticky Detail CTA)
  - **TYPE**: Outline Button (`SCR-01`) / Solid Navy Button (`SCR-04`)
  - **SCREEN**: `SCR-01`, `SCR-04`
  - **VISIBLE LABEL**: `Confirm booking`
  - **ACTION**: NOT VERIFIED (Skipped per Phase 10 Safe Inspection Rules)
  - **RESULT**: `NOT VERIFIED` — likely confirms allocation / advances to payment
  - **DESTINATION**: `SCR-U2` (`INFERRED`)
  - **INPUT REQUIRED**: None (`NOT VERIFIED`)
  - **VALIDATION**: `NOT VERIFIED`
  - **SCREENSHOT**: `001_initial.png`, `006_booking_detail_allocated.png`
  - **NOTES**: Excluded to prevent confirming a real freight order.

- **ELEMENT**: Show more Link
  - **TYPE**: Text Button
  - **SCREEN**: `SCR-04`, `SCR-11`
  - **VISIBLE LABEL**: `Show more`
  - **ACTION**: Tap (`[1115, 622]`)
  - **RESULT**: Opens 10-stage Trip Milestone Timeline bottom sheet
  - **DESTINATION**: `SCR-05`
  - **INPUT REQUIRED**: None
  - **VALIDATION**: None
  - **SCREENSHOT**: `007_trip_detail_show_more.png`, `050_trip_delivered_timeline.png`
  - **NOTES**: —

- **ELEMENT**: Call Traffic Agent / Call Driver Icons
  - **TYPE**: Icon Button / Phone Link
  - **SCREEN**: `SCR-04`, `SCR-14`
  - **VISIBLE LABEL**: Phone icon / `+91...`
  - **ACTION**: NOT VERIFIED
  - **RESULT**: Opens Android Phone Dialer (`tel:` intent, `INFERRED`)
  - **DESTINATION**: External System Dialer (`INFERRED`)
  - **INPUT REQUIRED**: None
  - **VALIDATION**: None
  - **SCREENSHOT**: `006_booking_detail_allocated.png`, `019_trip_tracking.png`
  - **NOTES**: Skipped per Phase 10 (avoid placing/initiating calls to real contacts).

- **ELEMENT**: Quick Action — Chat
  - **TYPE**: List Row Button
  - **SCREEN**: `SCR-04`
  - **VISIBLE LABEL**: `Chat`
  - **ACTION**: Tap (`[635, 1339]`)
  - **RESULT**: Navigates to the `Support` tab (`SCR-22`)
  - **DESTINATION**: `SCR-22`
  - **INPUT REQUIRED**: None
  - **VALIDATION**: None
  - **SCREENSHOT**: `033_support_tab.png`
  - **NOTES**: Confirmed twice via direct tap.

- **ELEMENT**: Book truck — `From` / `To` / `Material type` / `Ton(MT)` / Truck Chips / `Book`
  - **TYPE**: Form Controls
  - **SCREEN**: `SCR-06`
  - **VISIBLE LABEL**: `From`, `To`, `Material type`, `Ton(MT)`, 21 truck chips, `Book`
  - **ACTION**: Tapped `From` (`[330,435]`), `Material type` (`[330,672]`), `Ton(MT)` (`[941,672]`); `Book` submit skipped
  - **RESULT**: Opens `SCR-07` (`From`), `SCR-08` (`Material type`), `SCR-09` (Number keyboard); `Book` submit `NOT VERIFIED`
  - **DESTINATION**: `SCR-07`, `SCR-08`, `SCR-09`
  - **INPUT REQUIRED**: City (>=4 chars for city search), Material selection, Tonnage number, Truck chip
  - **VALIDATION**: City search requires minimum 4 characters (`"Search City minimum 4 character"` observed in layout).
  - **SCREENSHOT**: `008_book_truck_form.png` – `013_book_truck_tonnage.png`
  - **NOTES**: `To` city picker behavior `INFERRED` identical to `From`.

---

## Trip Module (`SCR-10` through `SCR-19`)

- **ELEMENT**: Trip Sub-Tabs (`Ongoing`, `POD Pending`, `POD Received`)
  - **TYPE**: Scrollable Horizontal Tab Strip
  - **SCREEN**: `SCR-10`
  - **VISIBLE LABEL**: `Ongoing`, `2 POD Pending`, `12 POD Received`
  - **ACTION**: Tap (`[157,221]`, `[489,221]`, `[797,221]`)
  - **RESULT**: Filters trip list by status bucket; displays count badges on POD Pending and POD Received
  - **DESTINATION**: `SCR-10` (filtered view)
  - **INPUT REQUIRED**: None
  - **VALIDATION**: None
  - **SCREENSHOT**: `014_trip_tab.png`, `015_trip_pod_pending.png`, `024_trip_pod_received.png`
  - **NOTES**: —

- **ELEMENT**: Toggle search Icon
  - **TYPE**: Header Icon Button
  - **SCREEN**: `SCR-10`
  - **VISIBLE LABEL**: Magnifier icon (`desc="Toggle search"`)
  - **ACTION**: Tap (`[1075, 222]`)
  - **RESULT**: Toggles floating search input (`"Search trip id, truck or city"`) and opens QWERTY keyboard
  - **DESTINATION**: `SCR-17`
  - **INPUT REQUIRED**: Search query string
  - **VALIDATION**: None
  - **SCREENSHOT**: `025_trip_search.png`
  - **NOTES**: —

- **ELEMENT**: Trip Filter Icon & `Period` / `Custom Range`
  - **TYPE**: Header Icon Button + Modal Controls
  - **SCREEN**: `SCR-10`, `SCR-18`, `SCR-19`
  - **VISIBLE LABEL**: Filter sliders -> `Period` -> `Custom Range`
  - **ACTION**: Tap (`[1188,222]`, `[180,528]`, `[800,918]`)
  - **RESULT**: Opens Trip Filter modal; `Custom Range` opens `Select Date Range` calendar modal (`SCR-19`)
  - **DESTINATION**: `SCR-18` -> `SCR-19`
  - **INPUT REQUIRED**: Start & End dates in calendar
  - **VALIDATION**: `Select` button disabled until range selected (`INFERRED`)
  - **SCREENSHOT**: `026_trip_filter.png`, `027_trip_filter_period.png`, `028_trip_filter_custom_date.png`
  - **NOTES**: —

- **ELEMENT**: Quick Action — `Payments`
  - **TYPE**: List Row Button
  - **SCREEN**: `SCR-11`
  - **VISIBLE LABEL**: `Payments`
  - **ACTION**: Tap (`[635, 877]`)
  - **RESULT**: Opens `Payment details` bottom sheet
  - **DESTINATION**: `SCR-12`
  - **INPUT REQUIRED**: None
  - **VALIDATION**: None
  - **SCREENSHOT**: `017_trip_payments.png`
  - **NOTES**: —

- **ELEMENT**: Quick Action — `Documents`
  - **TYPE**: List Row Button
  - **SCREEN**: `SCR-11`
  - **VISIBLE LABEL**: `Documents` (`Invoice, E LR, POD`)
  - **ACTION**: Tap (`[635, 1067]`)
  - **RESULT**: Opens `Documents` bottom sheet with Loading Memo, LR, Auto E-LR, Manual E-LR, E-way Bill, POD, Invoice
  - **DESTINATION**: `SCR-13`
  - **INPUT REQUIRED**: None
  - **VALIDATION**: None
  - **SCREENSHOT**: `018_trip_documents.png`
  - **NOTES**: Individual document view/edit/upload sub-buttons `NOT VERIFIED`.

- **ELEMENT**: Quick Action — `Tracking`
  - **TYPE**: List Row Button
  - **SCREEN**: `SCR-11`
  - **VISIBLE LABEL**: `Tracking` (`Chinthamani Toll Plaza | 02-Nov 12:15 | Ontime`)
  - **ACTION**: Tap (`[635, 1264]`)
  - **RESULT**: Opens full `Tracking` screen with map, progress bar, and toll checkpoints
  - **DESTINATION**: `SCR-14`
  - **INPUT REQUIRED**: None
  - **VALIDATION**: None
  - **SCREENSHOT**: `019_trip_tracking.png`, `020_trip_tracking_bottom.png`
  - **NOTES**: Map pin tap & top-right green Share button `NOT VERIFIED`.

- **ELEMENT**: Quick Action — `Help` -> Issue Type (`Payments`)
  - **TYPE**: List Row Button -> Option Row
  - **SCREEN**: `SCR-11` -> `SCR-15`
  - **VISIBLE LABEL**: `Help` -> `Payments` (`Delivery`, `POD`)
  - **ACTION**: Tap (`[635,1452]`, `[635,602]`)
  - **RESULT**: Navigates to `Help` issue picker, then opens `Get Help` bottom sheet
  - **DESTINATION**: `SCR-15` -> `SCR-16`
  - **INPUT REQUIRED**: None
  - **VALIDATION**: None
  - **SCREENSHOT**: `021_trip_help.png`, `022_trip_help_payments_form.png`
  - **NOTES**: `Request call back` button `NOT VERIFIED` per Phase 10 (avoid triggering real support callbacks).

- **ELEMENT**: `Pay ₹3850` CTA
  - **TYPE**: Primary Navy Button
  - **SCREEN**: `SCR-11`, `SCR-12`
  - **VISIBLE LABEL**: `Pay ₹3850`
  - **ACTION**: NOT VERIFIED (Skipped per Phase 10 Financial Rule)
  - **RESULT**: `NOT VERIFIED`
  - **DESTINATION**: `SCR-U2` (`INFERRED`)
  - **INPUT REQUIRED**: Payment gateway interaction (`INFERRED`)
  - **VALIDATION**: `NOT VERIFIED`
  - **SCREENSHOT**: `016_trip_detail_delivered.png`, `017_trip_payments.png`
  - **NOTES**: —

---

## Rates & Support Modules (`SCR-20` through `SCR-22`)

- **ELEMENT**: `Past Rates →` Link
  - **TYPE**: Card Link Button
  - **SCREEN**: `SCR-20` (Rates)
  - **VISIBLE LABEL**: `Past Rates →`
  - **ACTION**: Tap (`[176, 399]` on focused card)
  - **RESULT**: Opens `Past Rates` bottom sheet with 6-month trend line chart and historical trips
  - **DESTINATION**: `SCR-21`
  - **INPUT REQUIRED**: None
  - **VALIDATION**: None
  - **SCREENSHOT**: `032_rates_past_rates_detail.png`
  - **NOTES**: First tap highlights card (`030_rates_past_rates.png`); tapping `Past Rates` opens `SCR-21`. `FROM`/`TO` (`cpPanel`), `Swap cities`, `Book Truck →`, and `View 367 more trips ↓` were `NOT VERIFIED` interactively.

- **ELEMENT**: Support Filter Pills (`Tickets`, `Chat`) & Page Size (`100`..`1000`)
  - **TYPE**: Pill Toggle Buttons / Pagination Buttons
  - **SCREEN**: `SCR-22`
  - **VISIBLE LABEL**: `Tickets`, `Chat`, `100`, `250`, `500`, `1000`
  - **ACTION**: Tap `Chat` (`[309, 391]`)
  - **RESULT**: Switches view to `Chat` mode (hides pagination bar and updates search placeholder to `"Search"`)
  - **DESTINATION**: `SCR-22` (`Chat` view)
  - **INPUT REQUIRED**: None
  - **VALIDATION**: None
  - **SCREENSHOT**: `033_support_tab.png`, `034_support_chat_filter.png`
  - **NOTES**: Pagination buttons `NOT VERIFIED` with 0 records.

---

## Account Module (`SCR-23` through `SCR-36`)

- **ELEMENT**: Profile Name & Edit Pencil
  - **TYPE**: Header Button
  - **SCREEN**: `SCR-23`
  - **VISIBLE LABEL**: `<Profile Name> ✎`
  - **ACTION**: Tap (`[169, 211]`)
  - **RESULT**: Opens `Rename` bottom sheet (`Cancel` / `Save`)
  - **DESTINATION**: `SCR-25`
  - **INPUT REQUIRED**: Name text
  - **VALIDATION**: `NOT VERIFIED` (`Cancel` tapped; `Save` skipped per Phase 10)
  - **SCREENSHOT**: `037_account_edit_profile.png`
  - **NOTES**: —

- **ELEMENT**: Notification Bell Icon
  - **TYPE**: Header Icon Button
  - **SCREEN**: `SCR-23`
  - **VISIBLE LABEL**: Bell icon
  - **ACTION**: Tap (`[1177, 280]`)
  - **RESULT**: Opens full-screen `Inbox by Novu` notification center
  - **DESTINATION**: `SCR-24`
  - **INPUT REQUIRED**: None
  - **VALIDATION**: None
  - **SCREENSHOT**: `036_account_notifications.png`
  - **NOTES**: Notification Settings gear `[1177, 226]` `NOT VERIFIED`.

- **ELEMENT**: `Organization` Row
  - **TYPE**: Settings Row Button
  - **SCREEN**: `SCR-23`
  - **VISIBLE LABEL**: `Organization`
  - **ACTION**: Tap (`[636, 460]`)
  - **RESULT**: Opens bottom sheet with Organization legal name, `PAN`, and `GSTIN`
  - **DESTINATION**: `SCR-26`
  - **INPUT REQUIRED**: None
  - **VALIDATION**: None
  - **SCREENSHOT**: `038_account_organization.png`
  - **NOTES**: —

- **ELEMENT**: `Users` Row -> `+ Add user`
  - **TYPE**: Settings Row Button -> Header Action Button
  - **SCREEN**: `SCR-23` -> `SCR-27`
  - **VISIBLE LABEL**: `Users` -> `Add user`
  - **ACTION**: Tap (`[636,639]`, `[1081,803]`)
  - **RESULT**: Opens `Users` bottom sheet, then `Add user` screen
  - **DESTINATION**: `SCR-27` -> `SCR-28`
  - **INPUT REQUIRED**: `Name`, `Mobile number`
  - **VALIDATION**: `Add User` submission `NOT VERIFIED` (Phase 10); trash delete icon `NOT VERIFIED`.
  - **SCREENSHOT**: `039_account_users.png`, `040_account_add_user.png`
  - **NOTES**: —

- **ELEMENT**: `Account balance` / `+ Add money`
  - **TYPE**: Settings Row Button
  - **SCREEN**: `SCR-23`
  - **VISIBLE LABEL**: `Account balance ₹ 0 + Add money`
  - **ACTION**: Tap (`[636, 841]`)
  - **RESULT**: Opens `Account` bank details & NEFT top-up guide (`Share` button present)
  - **DESTINATION**: `SCR-29`
  - **INPUT REQUIRED**: None
  - **VALIDATION**: None
  - **SCREENSHOT**: `041_account_balance.png`
  - **NOTES**: `Share` icon `NOT VERIFIED`.

- **ELEMENT**: `FR8 Coins` Row
  - **TYPE**: List Row Button
  - **SCREEN**: `SCR-23`
  - **VISIBLE LABEL**: `FR8 Coins Earn FR8 Coins on full payment ₹ 98`
  - **ACTION**: Tap (`[636, 1024]`)
  - **RESULT**: Receives focus only; no screen or modal opens (informational row, no right chevron)
  - **DESTINATION**: None
  - **INPUT REQUIRED**: None
  - **VALIDATION**: None
  - **SCREENSHOT**: `035_account_tab.png`
  - **NOTES**: —

- **ELEMENT**: `My payments` Row
  - **TYPE**: Settings Row Button
  - **SCREEN**: `SCR-23`
  - **VISIBLE LABEL**: `My payments ₹ 0`
  - **ACTION**: Tap (`[636, 1208]`)
  - **RESULT**: Opens `My payments` screen (`No incoming payments found`)
  - **DESTINATION**: `SCR-30`
  - **INPUT REQUIRED**: None
  - **VALIDATION**: None
  - **SCREENSHOT**: `042_account_my_payments.png`
  - **NOTES**: —

- **ELEMENT**: `Pending payments` Row
  - **TYPE**: Settings Row Button
  - **SCREEN**: `SCR-23`
  - **VISIBLE LABEL**: `Pending payments ₹ 42654`
  - **ACTION**: Tap (`[636, 1391]`)
  - **RESULT**: Opens `Pending payments` trip list with `Download` header button
  - **DESTINATION**: `SCR-31`
  - **INPUT REQUIRED**: None
  - **VALIDATION**: None
  - **SCREENSHOT**: `043_account_pending_payments.png`
  - **NOTES**: `Download` button `NOT VERIFIED`.

- **ELEMENT**: `POD/Truck tracking` Row -> `Track` -> Table Toggle
  - **TYPE**: Settings Row -> Submit Button -> Icon Radio Toggle
  - **SCREEN**: `SCR-23` -> `SCR-32` -> `SCR-33`
  - **VISIBLE LABEL**: `POD/Truck tracking` -> `Track` -> `Switch to table view`
  - **ACTION**: Tap `[636,1572]`, enter `TN37DM2598`, tap `[635,1021]`, tap `[1088,431]`
  - **RESULT**: Opens tracking input -> displays results card (`SCR-33`); tapping `[1088,431]` triggered Android `"Open with Sheets"` chooser (either export or table trigger)
  - **DESTINATION**: `SCR-32` -> `SCR-33` -> Android Intent Resolver
  - **INPUT REQUIRED**: Truck registration number(s)
  - **VALIDATION**: `Track` button disabled (`#7F97B7`) when textarea is empty (`OBSERVED` in `044`).
  - **SCREENSHOT**: `044_account_pod_truck_tracking.png`, `045_account_pod_truck_tracking_result.png`
  - **NOTES**: —

- **ELEMENT**: `Watch video` / `Help` / `Terms & conditions`
  - **TYPE**: Settings Rows & Footer Link
  - **SCREEN**: `SCR-23`
  - **VISIBLE LABEL**: `Watch video`, `Help`, `Terms & conditions`
  - **ACTION**: Tap (`[636,1458]`, `[636,1946]`, `[635,2320]`)
  - **RESULT**: Opens `Watch videos` (7 guides), `Support` callback sheet, and `TERMS AND CONDITIONS` WebView
  - **DESTINATION**: `SCR-35`, `SCR-34`, `SCR-36`
  - **INPUT REQUIRED**: None
  - **VALIDATION**: None
  - **SCREENSHOT**: `048_account_watch_video.png`, `046_account_help.png`, `049_account_terms.png`
  - **NOTES**: —

- **ELEMENT**: `Logout` & `Delete account`
  - **TYPE**: Settings Row Buttons
  - **SCREEN**: `SCR-23`
  - **VISIBLE LABEL**: `Logout`, `Delete account`
  - **ACTION**: NOT VERIFIED (Skipped per Phase 10 Safe Inspection Rules)
  - **RESULT**: `NOT VERIFIED`
  - **DESTINATION**: Pre-auth / Deletion confirmation (`INFERRED`)
  - **INPUT REQUIRED**: `NOT VERIFIED`
  - **VALIDATION**: `NOT VERIFIED`
  - **SCREENSHOT**: `047_account_bottom.png`
  - **NOTES**: Skipped to avoid ending active session or deleting user data.
