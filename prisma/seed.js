const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('--- Seeding Route NH Database ---');

  // 1. Roles
  const rolesData = [
    { id: 1, name: 'ADMIN', description: 'Super Administrator with full platform control' },
    { id: 2, name: 'OPERATIONS', description: 'Operations Manager & Booking Executive' },
    { id: 3, name: 'DISPATCHER', description: 'Fleet & Driver Dispatch Executive' },
    { id: 4, name: 'CUSTOMER', description: 'Shipper / Cargo Consignor' },
    { id: 5, name: 'DRIVER', description: 'Commercial Heavy Vehicle Driver' },
    { id: 6, name: 'FINANCE', description: 'Billing and Accounts Executive' },
  ];

  for (const r of rolesData) {
    await prisma.role.upsert({
      where: { id: r.id },
      update: { name: r.name, description: r.description },
      create: r,
    });
  }

  // 2. Permissions
  const permissionsData = [
    { id: 1, code: 'booking:create', module: 'bookings', description: 'Create booking requests' },
    { id: 2, code: 'booking:view_all', module: 'bookings', description: 'View all operational bookings' },
    { id: 3, code: 'quotation:manage', module: 'quotations', description: 'Create, review and send quotations' },
    { id: 4, code: 'trip:assign', module: 'dispatch', description: 'Assign vehicles and drivers to trips' },
    { id: 5, code: 'trip:update_status', module: 'dispatch', description: 'Update operational trip status' },
    { id: 6, code: 'driver:track_location', module: 'tracking', description: 'Transmit and track live GPS' },
    { id: 7, code: 'finance:invoice_manage', module: 'finance', description: 'Generate and verify invoices & payments' },
    { id: 8, code: 'admin:system_control', module: 'admin', description: 'Full business settings and user management' },
  ];

  for (const p of permissionsData) {
    await prisma.permission.upsert({
      where: { id: p.id },
      update: { code: p.code, module: p.module, description: p.description },
      create: p,
    });
  }

  // 3. Password hash
  const defaultPasswordHash = await bcrypt.hash('password123', 10);

  // 4. Users
  const usersData = [
    {
      id: 1,
      publicId: 'usr-admin-001',
      fullName: 'Vikramaditya Singhania',
      email: 'admin@routenh.com',
      phone: '+919810011001',
      passwordHash: defaultPasswordHash,
      roleId: 1,
      accountStatus: 'ACTIVE',
    },
    {
      id: 2,
      publicId: 'usr-ops-001',
      fullName: 'Rajesh Nair',
      email: 'operations@routenh.com',
      phone: '+919810022002',
      passwordHash: defaultPasswordHash,
      roleId: 2,
      accountStatus: 'ACTIVE',
    },
    {
      id: 3,
      publicId: 'usr-dispatch-001',
      fullName: 'Amitabh Sen',
      email: 'dispatch@routenh.com',
      phone: '+919810033003',
      passwordHash: defaultPasswordHash,
      roleId: 3,
      accountStatus: 'ACTIVE',
    },
    {
      id: 4,
      publicId: 'usr-cust-001',
      fullName: 'Priya Sharma',
      email: 'priyasharma@gmail.com',
      phone: '+919876543210',
      passwordHash: await bcrypt.hash('priya143', 10),
      roleId: 4,
      accountStatus: 'ACTIVE',
    },
    {
      id: 5,
      publicId: 'usr-cust-002',
      fullName: 'Ananya Deshmukh',
      email: 'logistics@relianceretail.com',
      phone: '+919810055005',
      passwordHash: defaultPasswordHash,
      roleId: 4,
      accountStatus: 'ACTIVE',
    },
    {
      id: 6,
      publicId: 'usr-driver-001',
      fullName: 'Ramesh Kumar Yadav',
      email: 'driver.ramesh@routenh.com',
      phone: '+919810066006',
      passwordHash: defaultPasswordHash,
      roleId: 5,
      accountStatus: 'ACTIVE',
    },
    {
      id: 7,
      publicId: 'usr-driver-002',
      fullName: 'Suresh Gurjar',
      email: 'driver.suresh@routenh.com',
      phone: '+919810077007',
      passwordHash: defaultPasswordHash,
      roleId: 5,
      accountStatus: 'ACTIVE',
    },
    {
      id: 8,
      publicId: 'usr-finance-001',
      fullName: 'Kavita Krishnamurthy',
      email: 'finance@routenh.com',
      phone: '+919810088008',
      passwordHash: defaultPasswordHash,
      roleId: 6,
      accountStatus: 'ACTIVE',
    },
  ];

  for (const u of usersData) {
    await prisma.user.upsert({
      where: { id: u.id },
      update: {
        fullName: u.fullName,
        email: u.email,
        phone: u.phone,
        passwordHash: u.passwordHash,
        roleId: u.roleId,
        accountStatus: u.accountStatus,
      },
      create: u,
    });
  }

  // 5. Customers
  await prisma.customer.upsert({
    where: { userId: 4 },
    update: {},
    create: {
      id: 1,
      userId: 4,
      customerCode: 'CUST-TATA-001',
      customerType: 'BUSINESS',
      companyName: 'Tata Motors Parts Distribution Division',
      gstin: '27AAACT2727Q1ZW',
      pan: 'AAACT2727Q',
      billingEmail: 'accounts.logistics@tatamotors.com',
      billingPhone: '+912266561234',
      verificationStatus: 'VERIFIED',
      accountStatus: 'ACTIVE',
    },
  });

  await prisma.customer.upsert({
    where: { userId: 5 },
    update: {},
    create: {
      id: 2,
      userId: 5,
      customerCode: 'CUST-RELIANCE-002',
      customerType: 'BUSINESS',
      companyName: 'Reliance Retail Supply Chain Ltd',
      gstin: '24AABCR4455P1ZX',
      pan: 'AABCR4455P',
      billingEmail: 'supplychain.billing@relianceretail.com',
      billingPhone: '+912244778899',
      verificationStatus: 'VERIFIED',
      accountStatus: 'ACTIVE',
    },
  });

  // 6. Drivers
  await prisma.driver.upsert({
    where: { userId: 6 },
    update: {},
    create: {
      id: 1,
      userId: 6,
      driverCode: 'DRV-DEL-001',
      licenceNumber: 'DL-0420180091244',
      licenceType: 'HMV_HEAVY_TRANSPORT',
      licenceExpiry: new Date('2030-05-15T00:00:00.000Z'),
      emergencyContact: '+919871100223 (Wife - Sunita Yadav)',
      verificationStatus: 'VERIFIED',
      driverStatus: 'AVAILABLE',
    },
  });

  await prisma.driver.upsert({
    where: { userId: 7 },
    update: {},
    create: {
      id: 2,
      userId: 7,
      driverCode: 'DRV-DEL-002',
      licenceNumber: 'HR-2620190088231',
      licenceType: 'HMV_HEAVY_TRANSPORT',
      licenceExpiry: new Date('2029-11-20T00:00:00.000Z'),
      emergencyContact: '+919871100998 (Brother - Rajesh Gurjar)',
      verificationStatus: 'VERIFIED',
      driverStatus: 'AVAILABLE',
    },
  });

  // 7. Transporters
  await prisma.transporter.upsert({
    where: { transporterCode: 'TRP-RNH-OWNED' },
    update: {},
    create: {
      id: 1,
      transporterCode: 'TRP-RNH-OWNED',
      transporterName: 'Route NH Logistics Fleet Division',
      companyName: 'Route NH Transport Pvt Ltd',
      contactDetails: 'operations@routenh.com | +91 11 4050 9000',
      gstin: '07AAAAA0000A1Z5',
      pan: 'AAAAA0000A',
      transporterType: 'OWNED',
      verificationStatus: 'VERIFIED',
      accountStatus: 'ACTIVE',
    },
  });

  await prisma.transporter.upsert({
    where: { transporterCode: 'TRP-ROYAL-002' },
    update: {},
    create: {
      id: 2,
      transporterCode: 'TRP-ROYAL-002',
      transporterName: 'Royal Road Freight India',
      companyName: 'Royal Freightlines Partnership Ltd',
      contactDetails: 'booking@royalroadfreight.com | +91 22 2500 1122',
      gstin: '27AABCR1234F1Z8',
      pan: 'AABCR1234F',
      transporterType: 'THIRD_PARTY',
      verificationStatus: 'VERIFIED',
      accountStatus: 'ACTIVE',
    },
  });

  // 8. Vehicles
  const vehiclesData = [
    {
      id: 1,
      transporterId: 1,
      registrationNumber: 'DL-01-AB-4589',
      vehicleCategory: '32ft MXL Container',
      bodyType: 'CONTAINER',
      capacityKg: 18000,
      lengthFt: 32.0,
      widthFt: 8.5,
      heightFt: 9.0,
      vehicleStatus: 'AVAILABLE',
      insuranceExpiry: new Date('2027-10-12T00:00:00.000Z'),
      fitnessExpiry: new Date('2027-08-15T00:00:00.000Z'),
      permitExpiry: new Date('2028-01-01T00:00:00.000Z'),
      pollutionExpiry: new Date('2027-04-10T00:00:00.000Z'),
    },
    {
      id: 2,
      transporterId: 1,
      registrationNumber: 'MH-04-GT-7821',
      vehicleCategory: '20ft Multi-Axle',
      bodyType: 'OPEN',
      capacityKg: 12000,
      lengthFt: 20.0,
      widthFt: 8.0,
      heightFt: 7.5,
      vehicleStatus: 'AVAILABLE',
      insuranceExpiry: new Date('2027-11-05T00:00:00.000Z'),
      fitnessExpiry: new Date('2027-09-30T00:00:00.000Z'),
      permitExpiry: new Date('2028-02-15T00:00:00.000Z'),
      pollutionExpiry: new Date('2027-05-12T00:00:00.000Z'),
    },
    {
      id: 3,
      transporterId: 2,
      registrationNumber: 'HR-55-AB-9012',
      vehicleCategory: '24ft Taurus',
      bodyType: 'FLATBED',
      capacityKg: 16000,
      lengthFt: 24.0,
      widthFt: 8.2,
      heightFt: 8.0,
      vehicleStatus: 'AVAILABLE',
      insuranceExpiry: new Date('2027-07-22T00:00:00.000Z'),
      fitnessExpiry: new Date('2027-06-18T00:00:00.000Z'),
      permitExpiry: new Date('2028-04-01T00:00:00.000Z'),
      pollutionExpiry: new Date('2027-03-01T00:00:00.000Z'),
    },
  ];

  for (const v of vehiclesData) {
    await prisma.vehicle.upsert({
      where: { registrationNumber: v.registrationNumber },
      update: v,
      create: v,
    });
  }

  // 9. Route Rates
  const routesData = [
    {
      id: 1,
      sourceCity: 'Delhi NCR',
      destinationCity: 'Mumbai',
      vehicleCategory: '32ft MXL Container',
      baseRate: 72000,
      perKmRate: 52,
      minCharge: 65000,
      estimatedHours: 42,
    },
    {
      id: 2,
      sourceCity: 'Mumbai',
      destinationCity: 'Bengaluru',
      vehicleCategory: '32ft MXL Container',
      baseRate: 58000,
      perKmRate: 54,
      minCharge: 52000,
      estimatedHours: 28,
    },
    {
      id: 3,
      sourceCity: 'Delhi NCR',
      destinationCity: 'Ahmedabad',
      vehicleCategory: '20ft Multi-Axle',
      baseRate: 46000,
      perKmRate: 48,
      minCharge: 42000,
      estimatedHours: 24,
    },
    {
      id: 4,
      sourceCity: 'Chennai',
      destinationCity: 'Kolkata',
      vehicleCategory: '32ft MXL Container',
      baseRate: 85000,
      perKmRate: 55,
      minCharge: 78000,
      estimatedHours: 54,
    },
  ];

  for (const route of routesData) {
    await prisma.routeRate.upsert({
      where: { id: route.id },
      update: route,
      create: route,
    });
  }

  // 10. Sample Seed Booking (In Transit)
  const existingBooking1 = await prisma.booking.findUnique({
    where: { bookingReference: 'RNH-BK-2026-0001' },
  });

  if (!existingBooking1) {
    const booking1 = await prisma.booking.create({
      data: {
        bookingReference: 'RNH-BK-2026-0001',
        customerId: 1,
        createdByUserId: 4,
        requestedPickupDate: new Date('2026-11-20T10:00:00.000Z'),
        preferredDeliveryDate: new Date('2026-11-23T18:00:00.000Z'),
        goodsDescription: 'Automotive Engine Assemblies & Gearboxes',
        goodsCategory: 'AUTOMOTIVE',
        totalWeightKg: 14500,
        packageCount: 28,
        cargoValue: 4200000,
        requiredVehicleCategory: '32ft MXL Container',
        specialInstructions: 'Fragile precision parts. Zero water seepage allowed. Air suspension preferred.',
        bookingStatus: 'CONFIRMED',
        stops: {
          create: [
            {
              stopType: 'PICKUP',
              sequenceNumber: 1,
              contactName: 'Rohan Deshmukh (Plant Dispatcher)',
              contactPhone: '+919822011223',
              addressLine1: 'Tata Motors Plant, Gate No. 4, Pimpri Logistics Hub',
              city: 'Pune',
              state: 'Maharashtra',
              postalCode: '411018',
              latitude: 18.6298,
              longitude: 73.7997,
              scheduledArrival: new Date('2026-11-20T11:00:00.000Z'),
              actualArrival: new Date('2026-11-20T10:45:00.000Z'),
              actualDeparture: new Date('2026-11-20T14:30:00.000Z'),
              instructions: 'Report to security desk with company gate pass and driver Aadhaar card.',
            },
            {
              stopType: 'DELIVERY',
              sequenceNumber: 2,
              contactName: 'Vikram Joshi (Warehouse Manager)',
              contactPhone: '+919811099887',
              addressLine1: 'Tata Regional Distribution Center, Warehouse 9, NH 48 Corridor',
              city: 'Gurugram',
              state: 'Haryana',
              postalCode: '122001',
              latitude: 28.4595,
              longitude: 77.0266,
              scheduledArrival: new Date('2026-11-23T16:00:00.000Z'),
              instructions: 'Unloading docks open 08:00 to 20:00. POD countersignature mandatory.',
            },
          ],
        },
        items: {
          create: [
            {
              itemDescription: 'Turbocharged Diesel Engine Assemblies',
              packageType: 'WOODEN_CRATE',
              quantity: 16,
              unitWeightKg: 650,
              totalWeightKg: 10400,
              lengthCm: 120,
              widthCm: 100,
              heightCm: 110,
              declaredValue: 2800000,
              handlingInstructions: 'Forklift handling from pallet bottom only.',
            },
            {
              itemDescription: 'Manual 6-Speed Transmission Gearbox Units',
              packageType: 'PALLET',
              quantity: 12,
              unitWeightKg: 340,
              totalWeightKg: 4080,
              lengthCm: 100,
              widthCm: 80,
              heightCm: 90,
              declaredValue: 1400000,
              handlingInstructions: 'Stack maximum 2 high.',
            },
          ],
        },
        quotations: {
          create: {
            quotationReference: 'RNH-QT-2026-0001',
            versionNumber: 1,
            preparedBy: 'Rajesh Nair (Operations)',
            baseFreight: 68000,
            taxableAmount: 73500,
            taxAmount: 8820,
            grandTotal: 82320,
            currency: 'INR',
            validUntil: new Date('2026-12-01T00:00:00.000Z'),
            quotationStatus: 'ACCEPTED',
            sentAt: new Date('2026-11-19T14:00:00.000Z'),
            acceptedAt: new Date('2026-11-19T16:30:00.000Z'),
            charges: {
              create: [
                { chargeType: 'BASE_FREIGHT', description: 'Pune to Gurugram FTL 32ft MXL Freight', amount: 68000, taxable: true, taxRate: 12.0 },
                { chargeType: 'LOADING', description: 'Hydraulic ramp loading assistance charge', amount: 2500, taxable: true, taxRate: 12.0 },
                { chargeType: 'UNLOADING', description: 'Destination dock handling charge', amount: 3000, taxable: true, taxRate: 12.0 },
              ],
            },
          },
        },
      },
    });

    // Create Trip for Booking 1
    const trip1 = await prisma.trip.create({
      data: {
        tripReference: 'RNH-TR-2026-0001',
        bookingId: booking1.id,
        tripStatus: 'IN_TRANSIT',
        plannedPickup: new Date('2026-11-20T11:00:00.000Z'),
        plannedDelivery: new Date('2026-11-23T16:00:00.000Z'),
        actualPickup: new Date('2026-11-20T14:30:00.000Z'),
        createdBy: 'Amitabh Sen (Dispatcher)',
        assignments: {
          create: {
            vehicleId: 1,
            driverId: 1,
            transporterId: 1,
            assignedBy: 3,
            assignmentStatus: 'ACTIVE',
          },
        },
        statusHistory: {
          create: [
            { previousStatus: 'CREATED', newStatus: 'VEHICLE_ASSIGNED', updatedByUserId: 3, statusNote: 'Allocated 32ft MXL DL-01-AB-4589' },
            { previousStatus: 'VEHICLE_ASSIGNED', newStatus: 'DRIVER_ASSIGNED', updatedByUserId: 3, statusNote: 'Assigned Driver Ramesh Kumar Yadav' },
            { previousStatus: 'DRIVER_ASSIGNED', newStatus: 'AT_PICKUP', updatedByUserId: 6, statusNote: 'Reached Pune factory gate' },
            { previousStatus: 'AT_PICKUP', newStatus: 'LOADED', updatedByUserId: 6, statusNote: 'Loaded 28 packages. Cargo verified against invoice' },
            { previousStatus: 'LOADED', newStatus: 'IN_TRANSIT', updatedByUserId: 6, statusNote: 'Exited plant gate. Enroute via NH 48' },
          ],
        },
        tracking: {
          create: [
            { driverId: 1, latitude: 18.6298, longitude: 73.7997, accuracyMeters: 5.2, speed: 0, heading: 0, recordedAt: new Date('2026-11-20T14:30:00.000Z') },
            { driverId: 1, latitude: 19.8762, longitude: 74.4532, accuracyMeters: 4.8, speed: 58.5, heading: 18.0, recordedAt: new Date('2026-11-21T02:00:00.000Z') },
            { driverId: 1, latitude: 22.3072, longitude: 73.1812, accuracyMeters: 3.9, speed: 64.0, heading: 12.0, recordedAt: new Date('2026-11-21T18:00:00.000Z') },
            { driverId: 1, latitude: 24.5854, longitude: 73.7125, accuracyMeters: 4.1, speed: 60.2, heading: 15.0, recordedAt: new Date('2026-11-22T04:30:00.000Z') },
          ],
        },
        documents: {
          create: [
            {
              bookingId: booking1.id,
              uploadedByUserId: 6,
              documentType: 'LR',
              storageKey: 'docs/lr/RNH-LR-2026-0001.pdf',
              originalFileName: 'LorryReceipt_Pune_Gurugram_001.pdf',
              mimeType: 'application/pdf',
              fileSize: 452100,
              documentStatus: 'VERIFIED',
              verifiedBy: 'Rajesh Nair',
              verifiedAt: new Date('2026-11-20T16:00:00.000Z'),
            },
            {
              bookingId: booking1.id,
              uploadedByUserId: 6,
              documentType: 'LOADING_PHOTO',
              storageKey: 'docs/photos/loading_pune_dock.jpg',
              originalFileName: 'engine_crates_lashed.jpg',
              mimeType: 'image/jpeg',
              fileSize: 1240500,
              documentStatus: 'VERIFIED',
              verifiedBy: 'Amitabh Sen',
              verifiedAt: new Date('2026-11-20T15:00:00.000Z'),
            },
          ],
        },
      },
    });

    // Update vehicle status
    await prisma.vehicle.update({
      where: { id: 1 },
      data: { vehicleStatus: 'ON_TRIP' },
    });
    // Update driver status
    await prisma.driver.update({
      where: { id: 1 },
      data: { driverStatus: 'ON_TRIP' },
    });

    // Invoice for Booking 1
    const invoice1 = await prisma.invoice.create({
      data: {
        invoiceNumber: 'RNH-INV-2026-0001',
        bookingId: booking1.id,
        customerId: 1,
        invoiceDate: new Date('2026-11-20T16:00:00.000Z'),
        dueDate: new Date('2026-12-05T00:00:00.000Z'),
        subtotal: 73500,
        taxAmount: 8820,
        grandTotal: 82320,
        invoiceStatus: 'PARTIALLY_PAID',
        items: {
          create: [
            { description: 'FTL Road Freight - Pune to Gurugram (32ft MXL)', quantity: 1, unitPrice: 68000, taxableAmount: 68000, taxRate: 12.0, taxAmount: 8160, lineTotal: 76160 },
            { description: 'Hydraulic Ramp Loading Assistance', quantity: 1, unitPrice: 2500, taxableAmount: 2500, taxRate: 12.0, taxAmount: 300, lineTotal: 2800 },
            { description: 'Destination Dock Unloading Handling', quantity: 1, unitPrice: 3000, taxableAmount: 3000, taxRate: 12.0, taxAmount: 360, lineTotal: 3360 },
          ],
        },
        payments: {
          create: {
            receiptReference: 'RNH-REC-2026-0001',
            amount: 40000,
            paymentMethod: 'NEFT',
            paymentStatus: 'SUCCESS',
            gatewayReference: 'HDFC9821739182',
            receivedBy: 'Kavita Krishnamurthy',
            paidAt: new Date('2026-11-21T11:00:00.000Z'),
          },
        },
      },
    });
  }

  // 11. Sample Seed Booking 2 (New Request awaiting quotation)
  const existingBooking2 = await prisma.booking.findUnique({
    where: { bookingReference: 'RNH-BK-2026-0002' },
  });

  if (!existingBooking2) {
    await prisma.booking.create({
      data: {
        bookingReference: 'RNH-BK-2026-0002',
        customerId: 2,
        createdByUserId: 5,
        requestedPickupDate: new Date('2026-11-25T08:00:00.000Z'),
        preferredDeliveryDate: new Date('2026-11-27T14:00:00.000Z'),
        goodsDescription: 'Consumer Electronics & Home Appliances',
        goodsCategory: 'ELECTRONICS',
        totalWeightKg: 8500,
        packageCount: 140,
        cargoValue: 6500000,
        requiredVehicleCategory: '20ft Multi-Axle',
        specialInstructions: 'High value electronics. GPS seal and transit escort required.',
        bookingStatus: 'REQUESTED',
        stops: {
          create: [
            {
              stopType: 'PICKUP',
              sequenceNumber: 1,
              contactName: 'Naveen Reddy',
              contactPhone: '+919840012345',
              addressLine1: 'Reliance Central Fulfillment Center, Bhiwandi Road',
              city: 'Mumbai',
              state: 'Maharashtra',
              postalCode: '421302',
              scheduledArrival: new Date('2026-11-25T08:00:00.000Z'),
            },
            {
              stopType: 'DELIVERY',
              sequenceNumber: 2,
              contactName: 'Raghavan Iyer',
              contactPhone: '+919845098765',
              addressLine1: 'Reliance Super Logistics Hub, Electronic City Phase 2',
              city: 'Bengaluru',
              state: 'Karnataka',
              postalCode: '560100',
              scheduledArrival: new Date('2026-11-27T14:00:00.000Z'),
            },
          ],
        },
        items: {
          create: {
            itemDescription: 'Smart LED Televisions & Inverter Refrigerators',
            packageType: 'CARTON',
            quantity: 140,
            unitWeightKg: 60.7,
            totalWeightKg: 8500,
            lengthCm: 140,
            widthCm: 25,
            heightCm: 85,
            declaredValue: 6500000,
          },
        },
      },
    });
  }

  // 12. Application Settings
  const settingsData = [
    { settingKey: 'company_name', settingValue: 'Route NH Logistics Pvt. Ltd.', description: 'Registered Corporate Name' },
    { settingKey: 'gstin', settingValue: '07AAAAA0000A1Z5', description: 'Goods & Services Tax Identification Number' },
    { settingKey: 'pan', settingValue: 'AAAAA0000A', description: 'Permanent Account Number' },
    { settingKey: 'corporate_address', settingValue: 'NH-48 Logistics Boulevard, Sector 34, Gurugram, Haryana - 122001', description: 'Head Office Address' },
    { settingKey: 'toll_free_support', settingValue: '1800-889-7688', description: '24/7 Operations Control Center' },
    { settingKey: 'default_currency', settingValue: 'INR (₹)', description: 'Display currency' },
    { settingKey: 'default_tax_rate', settingValue: '18.0', description: 'Standard GST on Transportation Services (%)' },
  ];

  for (const s of settingsData) {
    await prisma.applicationSetting.upsert({
      where: { settingKey: s.settingKey },
      update: { settingValue: s.settingValue, description: s.description },
      create: s,
    });
  }

  console.log('--- Seeding Completed Successfully! ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
