# 06 — Forms and Validation

All forms and structured input dialogs discovered in `in.fr8.book` (`v2.0.122`).

---

## Form 1: Book truck (`SCR-06`, `SCR-07`, `SCR-08`, `SCR-09`)
- **Purpose**: Submit a new Full Truck Load (FTL) truck booking request.
- **Screenshots**: `008_book_truck_form.png` – `013_book_truck_tonnage.png`
- **Submit Button**: `Book` (`#002F70` navy, full-width bottom CTA) — submission `NOT VERIFIED` per Phase 10.
- **Cancel / Back**: Top-left Back arrow (`Go back`) returns to `SCR-01`.

| Field | Type | Required | Validation | Options | Default |
|---|---|---|---|---|---|
| `From` | Searchable City Modal Trigger (`SCR-07`) | Yes (`INFERRED`) | Search requires minimum 4 characters (`"Search City minimum 4 character"` observed) | Recent routes + City search (`City, State` radio items) | Pre-filled from last booking (`Mappedu`) |
| `To` | Searchable City Modal Trigger (`SCR-07`) | Yes (`INFERRED`) | Minimum 4 characters (`INFERRED` same modal) | Recent routes + City search | Pre-filled from last booking (`Vijayawada`) |
| `Material type` | Searchable Radio Modal Trigger (`SCR-08`) | Yes (`INFERRED`) | Search text filter | 38 observed items (`Agriculture` .. `Others`) | `Others` |
| `Ton(MT)` | Inline Numeric Input (`SCR-09`) | Yes (`INFERRED`) | Opens Android `Number keyboard` (numeric digits) | Free numeric entry | `9` |
| `Truck Type` | Grouped Pill Chip Selector (3 groups) | Yes (`INFERRED`) | Single-select pill toggle | **Open** (9), **Closed** (8), **Trailer** (4) — 21 total | `32 Feet Single Axle` |
| `Notes` | Single-line Text Input (`EditText`) | Optional (`INFERRED`) | Free text; placeholder `"Enter other requirements"` | Free text | Empty |

---

## Form 2: POD/Truck tracking (`SCR-32`)
- **Purpose**: Look up POD and trip status for one or multiple truck registration numbers.
- **Screenshots**: `044_account_pod_truck_tracking.png`, `045_account_pod_truck_tracking_result.png`
- **Submit Button**: `Track` (`#7F97B7` disabled when empty; active `#002F70` when input present).
- **Result**: Navigates to `SCR-33` displaying matched truck trips.

| Field | Type | Required | Validation | Options | Default |
|---|---|---|---|---|---|
| Truck numbers | Multi-line Textarea (`EditText`) | Yes | Auto-extracts unique truck numbers from pasted/typed text; `Track` disabled if empty | Free text (`Example: TN78BY9878, KA66AD5667...`) | Empty |

---

## Form 3: Add user (`SCR-28`)
- **Purpose**: Add a new sub-user to the customer organization.
- **Screenshot**: `040_account_add_user.png`
- **Submit Button**: `Add User` (bottom sticky CTA) — submission `NOT VERIFIED` per Phase 10.

| Field | Type | Required | Validation | Options | Default |
|---|---|---|---|---|---|
| `Name` | Text Input (`EditText`) | Yes (`INFERRED`) | Placeholder `"Enter name"` | Free text | Empty |
| `Mobile number` | Phone/Text Input (`EditText`) | Yes (`INFERRED`) | Placeholder `"Enter mobile number"` | Phone number | Empty |

---

## Form 4: Rename Profile (`SCR-25`)
- **Purpose**: Update the logged-in user's display name.
- **Screenshot**: `037_account_edit_profile.png`
- **Actions**: `Cancel` (dismisses sheet, `OBSERVED`), `Save` (`NOT VERIFIED` per Phase 10).

| Field | Type | Required | Validation | Options | Default |
|---|---|---|---|---|---|
| Profile Name | Text Input (`EditText`) | Yes (`INFERRED`) | Non-empty (`INFERRED`) | Free text | Current name (`<REDACTED>`) |

---

## Form 5: My bookings & Trip Filters (`SCR-02`, `SCR-18`, `SCR-19`)
- **Purpose**: Filter booking requests (`Users`, `Truck type`) or trips (`Users`, `Truck type`, `Period`).
- **Screenshots**: `002_book_filter.png` – `004_book_filter_trucktype_bottom.png`, `026_trip_filter.png` – `028_trip_filter_custom_date.png`
- **Actions**: `Reset`, `Apply` (disabled `#7F97B7` until dirty), `Close (X)`.

| Field | Type | Required | Validation | Options | Default |
|---|---|---|---|---|---|
| `Users` | Checkbox Multi-Select | Optional | None | Organization user list (`<Name> - <Phone>`) | Unchecked |
| `Truck type` | Checkbox Multi-Select (Scrollable) | Optional | None | 21 truck types (`32 Feet Single Axle` .. `40 Feet Low Bed`) | Unchecked |
| `Period` (`SCR-18` only) | Radio Single-Select | Optional | `Custom Range` opens `SCR-19` calendar (`Select` disabled until range chosen) | `Last Week`, `Last Month`, `Last Three Month`, `Custom Range` | Unselected |

---

## Form 6: Instant Rates Corridor (`SCR-20`) & Search Bars (`SCR-17`, `SCR-22`, `SCR-24`)
- **Rates Corridor (`SCR-20`)**: `FROM` (`Chennai`), `TO` (`Bangalore`), `Swap cities` (`⇅`) — `cpPanel` (`Select City`) detected in DOM (`PARTIALLY OBSERVED`).
- **Trip Inline Search (`SCR-17`)**: Single text input (`"Search trip id, truck or city"`).
- **Support Search (`SCR-22`)**: Single text input (`"Search for trip id, cardcodes or truck no"` on `Tickets`; `"Search"` on `Chat`).
- **Novu Notifications Search (`SCR-24`)**: Single text input (`"Search notifications..."`).
