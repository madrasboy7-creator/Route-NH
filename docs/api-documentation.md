# Route NH - API Documentation

Base URI: `/api/v1`

## 1. Authentication Endpoints

- `POST /api/v1/auth/login`: Authenticate user with email and password. Returns JWT token and sets cookie.
- `GET /api/v1/auth/me`: Retrieve currently authenticated user profile, active role, and granular permissions.
- `POST /api/v1/auth/register`: Register new commercial customer profile.

## 2. Customer Endpoints

- `GET /api/v1/customer/bookings`: List bookings for the authenticated customer.
- `POST /api/v1/customer/bookings`: Submit a new booking request with stops and cargo item specifications.
- `GET /api/v1/customer/quotations`: Retrieve quotations prepared by operations.
- `POST /api/v1/customer/quotations`: Accept or reject a quotation (`action: "ACCEPT" | "REJECT"`).
- `GET /api/v1/customer/shipments`: Retrieve active shipments with live GPS telemetry, vehicle, and driver details.
- `GET /api/v1/customer/invoices`: View customer freight invoices and payment records.
- `POST /api/v1/customer/invoices`: Record payment towards an invoice.
- `GET /api/v1/customer/support`: List support tickets.
- `POST /api/v1/customer/support`: Create a support ticket.

## 3. Operations & Dispatch Endpoints

- `GET /api/v1/operations/dashboard`: Summary counts and metrics for new bookings, quotes, fleet, and active trips.
- `GET /api/v1/operations/bookings`: List all operational bookings with status filters.
- `POST /api/v1/operations/quotations`: Generate an itemized freight quotation (base freight, loading, unloading, toll, taxes).
- `GET /api/v1/operations/vehicles`: View registered fleet and document validity status.
- `POST /api/v1/operations/vehicles`: Add a new commercial vehicle to the fleet.
- `GET /api/v1/operations/drivers`: View commercial drivers and licence validity.
- `GET /api/v1/operations/trips`: List all operational trips.
- `POST /api/v1/operations/trips`: Assign compliant vehicle and verified driver to a trip (with conflict prevention).
- `GET /api/v1/operations/documents`: List uploaded LR, POD, and photos for verification.
- `PATCH /api/v1/operations/documents`: Verify or reject a shipment document.

## 4. Driver Endpoints

- `GET /api/v1/driver/profile`: Retrieve driver profile and assigned vehicle.
- `GET /api/v1/driver/trips`: Get active trip assignment and trip history.
- `POST /api/v1/driver/trips/:id/status`: Advance trip status milestone (`AT_PICKUP`, `LOADING`, `LOADED`, `IN_TRANSIT`, `DELIVERED`, `POD_SUBMITTED`).
- `POST /api/v1/driver/trips/:id/location`: Broadcast live GPS coordinates (`latitude`, `longitude`, `speed`, `accuracy`).
- `POST /api/v1/driver/documents`: Upload Lorry Receipt (LR) or signed Proof of Delivery (POD).

## 5. Super Admin Endpoints

- `GET /api/v1/admin/users`: List all platform users and staff accounts.
- `POST /api/v1/admin/users`: Create a new staff account (Operations, Dispatcher, Finance, Admin).
- `GET /api/v1/admin/pricing`: Retrieve highway corridor freight rates.
- `POST /api/v1/admin/pricing`: Add a new corridor route rate.
- `GET /api/v1/admin/audit-logs`: View platform security and operational audit trail.
- `GET /api/v1/admin/settings`: View corporate and tax configuration settings.
- `POST /api/v1/admin/settings`: Update system configuration.
