# Route NH - Permission Matrix & Access Control

| Entity / Action | Customer | Operations | Dispatcher | Driver | Finance | Admin |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **Own Profile** | View/Edit | View/Edit | View/Edit | View/Edit | View/Edit | Full Access |
| **Create Booking** | Yes | Yes (Audit) | No | No | No | Yes |
| **View Customer Bookings** | Own Only | All | All | No | Read Only | All |
| **Prepare Freight Quotation** | No | Yes | No | No | Read Only | Yes |
| **Accept/Reject Quotation** | Yes (Own) | No | No | No | No | Yes |
| **Allocate Vehicle & Driver** | No | Yes | Yes | No | No | Yes |
| **Update Trip Status** | No | Yes | Yes | Assigned Trip | No | Yes |
| **Transmit GPS Coordinates** | No | No | No | Assigned Trip | No | System |
| **Upload LR & Signed POD** | View Own | Manage | Manage | Assigned Trip | No | Full Access |
| **Verify POD Documents** | No | Yes | Yes | No | No | Yes |
| **Generate Freight Invoice** | View Own | No | No | No | Yes | Yes |
| **Record Customer Payment** | Submit Own | No | No | No | Yes | Yes |
| **Corridor Rate Pricing** | No | No | No | No | No | Yes |
| **Manage Staff Accounts** | No | No | No | No | No | Yes |
| **Immutable Audit Logs** | No | Limited | Limited | No | Limited | Full Access |
