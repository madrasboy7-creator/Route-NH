# Route NH - Entity Relationship Model (ERD)

```mermaid
erDiagram
    USERS ||--o| CUSTOMERS : has
    USERS ||--o| DRIVERS : has
    USERS ||--o{ AUDIT_LOGS : creates
    USERS ||--o{ NOTIFICATIONS : receives
    ROLES ||--o{ USERS : assigns
    ROLES ||--o{ ROLE_PERMISSIONS : contains
    PERMISSIONS ||--o{ ROLE_PERMISSIONS : defines

    CUSTOMERS ||--o{ BOOKINGS : creates
    BOOKINGS ||--o{ BOOKING_STOPS : has
    BOOKINGS ||--o{ BOOKING_ITEMS : contains
    BOOKINGS ||--o{ QUOTATIONS : receives

    QUOTATIONS ||--o{ QUOTATION_CHARGES : contains

    BOOKINGS ||--o| TRIPS : creates
    TRIPS ||--o{ TRIP_ASSIGNMENTS : has
    TRIPS ||--o{ TRIP_STATUS_HISTORY : records
    TRIPS ||--o{ TRACKING_LOCATIONS : tracks
    TRIPS ||--o{ SHIPMENT_DOCUMENTS : contains

    TRANSPORTERS ||--o{ VEHICLES : manages
    TRANSPORTERS ||--o{ TRIP_ASSIGNMENTS : supplies
    TRANSPORTERS ||--o{ TRANSPORTER_SETTLEMENTS : receives
    VEHICLES ||--o{ TRIP_ASSIGNMENTS : assigned
    DRIVERS ||--o{ TRIP_ASSIGNMENTS : assigned

    BOOKINGS ||--o{ SHIPMENT_DOCUMENTS : owns
    BOOKINGS ||--o| INVOICES : billed
    INVOICES ||--o{ INVOICE_ITEMS : contains
    INVOICES ||--o{ PAYMENTS : receives
    CUSTOMERS ||--o{ SUPPORT_TICKETS : opens
    SUPPORT_TICKETS ||--o{ SUPPORT_MESSAGES : contains
```

## Relational Constraints & Business Invariants

1. **Conflict-Free Vehicle Dispatch**: A vehicle in status `ON_TRIP` cannot be allocated to another active trip until the current trip is `COMPLETED`.
2. **Conflict-Free Driver Allocation**: A driver with an active assignment cannot be assigned to another trip concurrently.
3. **Quotation Acceptance Invariant**: A booking cannot be confirmed without an accepted quotation. Customer acceptance automatically marks the quotation `ACCEPTED`, sets the booking to `CONFIRMED`, and creates an active `Trip` record.
4. **POD Verification Gate**: Trip completion requires delivery verification by the operations desk upon review of uploaded signed PODs.
