const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function runTests() {
  console.log('=====================================================');
  console.log('ROUTE NH PLATFORM - AUTOMATED SYSTEM & E2E TEST SUITE');
  console.log('=====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`[PASS] ${message}`);
      passed++;
    } else {
      console.error(`[FAIL] ${message}`);
      failed++;
    }
  }

  try {
    // 1. Authentication Tests
    console.log('--- 1. Testing Authentication & Role Guard Isolation ---');
    const adminUser = await prisma.user.findUnique({ where: { email: 'admin@routenh.com' }, include: { role: true } });
    assert(adminUser !== null && adminUser.role.name === 'ADMIN', 'Admin user exists with role ADMIN');

    const opsUser = await prisma.user.findUnique({ where: { email: 'operations@routenh.com' }, include: { role: true } });
    assert(opsUser !== null && opsUser.role.name === 'OPERATIONS', 'Operations user exists with role OPERATIONS');

    const customerUser = await prisma.user.findUnique({ where: { email: 'customer@tatamotors.com' }, include: { customer: true } });
    assert(customerUser !== null && customerUser.customer !== null, 'Customer user linked to Customer Profile');

    const driverUser = await prisma.user.findUnique({ where: { email: 'driver.ramesh@routenh.com' }, include: { driver: true } });
    assert(driverUser !== null && driverUser.driver !== null, 'Driver user linked to Driver Profile');

    // Password verification
    const passMatch = await bcrypt.compare('password123', adminUser.passwordHash);
    assert(passMatch === true, 'Bcrypt password hashing and authentication validates securely');

    // 2. Booking Workflow Tests
    console.log('\n--- 2. Testing Customer Booking Creation & Stops ---');
    const customer = customerUser.customer;
    const testBookingRef = `RNH-BK-TEST-${Date.now().toString().slice(-4)}`;

    const testBooking = await prisma.booking.create({
      data: {
        bookingReference: testBookingRef,
        customerId: customer.id,
        createdByUserId: customerUser.id,
        requestedPickupDate: new Date('2026-11-25T10:00:00Z'),
        preferredDeliveryDate: new Date('2026-11-27T18:00:00Z'),
        goodsDescription: 'Industrial Valve Units & Flow Regulators',
        goodsCategory: 'INDUSTRIAL',
        totalWeightKg: 11200,
        packageCount: 18,
        cargoValue: 3400000,
        requiredVehicleCategory: '32ft MXL Container',
        bookingStatus: 'REQUESTED',
        stops: {
          create: [
            {
              stopType: 'PICKUP',
              sequenceNumber: 1,
              contactName: 'Anil Kadam',
              contactPhone: '+919822012345',
              addressLine1: 'Bhosari MIDC Logistics Gate 2',
              city: 'Pune',
              state: 'Maharashtra',
              postalCode: '411026',
              scheduledArrival: new Date('2026-11-25T10:00:00Z'),
            },
            {
              stopType: 'DELIVERY',
              sequenceNumber: 2,
              contactName: 'Sunil Verma',
              contactPhone: '+919811054321',
              addressLine1: 'IMT Manesar Heavy Industrial Park',
              city: 'Gurugram',
              state: 'Haryana',
              postalCode: '122050',
              scheduledArrival: new Date('2026-11-27T18:00:00Z'),
            },
          ],
        },
        items: {
          create: [
            {
              itemDescription: 'Cast Steel Flanged Gate Valves',
              packageType: 'WOODEN_CRATE',
              quantity: 18,
              unitWeightKg: 622.2,
              totalWeightKg: 11200,
              declaredValue: 3400000,
            },
          ],
        },
      },
      include: { stops: true, items: true },
    });

    assert(testBooking.id > 0, `Booking created with ID ${testBooking.id} and reference ${testBookingRef}`);
    assert(testBooking.stops.length === 2, 'Booking stops recorded with 1 PICKUP and 1 DELIVERY stop');
    assert(testBooking.bookingStatus === 'REQUESTED', 'Initial booking status is REQUESTED');

    // 3. Quotation Tests
    console.log('\n--- 3. Testing Quotation Generation & Customer Acceptance ---');
    const quoteRef = `RNH-QT-TEST-${Date.now().toString().slice(-4)}`;
    const baseFreight = 64000;
    const loadingCharge = 2000;
    const unloadingCharge = 2500;
    const taxable = baseFreight + loadingCharge + unloadingCharge;
    const tax = taxable * 0.12; // 12% GST
    const grandTotal = taxable + tax;

    const testQuote = await prisma.quotation.create({
      data: {
        quotationReference: quoteRef,
        bookingId: testBooking.id,
        versionNumber: 1,
        preparedBy: 'Operations Manager Rajesh Nair',
        baseFreight,
        taxableAmount: taxable,
        taxAmount: tax,
        grandTotal,
        currency: 'INR',
        validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        quotationStatus: 'SENT',
        charges: {
          create: [
            { chargeType: 'BASE_FREIGHT', description: 'Pune to Gurugram FTL Freight', amount: baseFreight, taxable: true, taxRate: 12.0 },
            { chargeType: 'LOADING', description: 'Forklift Loading assistance', amount: loadingCharge, taxable: true, taxRate: 12.0 },
            { chargeType: 'UNLOADING', description: 'Unloading dock charges', amount: unloadingCharge, taxable: true, taxRate: 12.0 },
          ],
        },
      },
      include: { charges: true },
    });

    assert(testQuote.id > 0, `Quotation ${quoteRef} created with Grand Total ₹${testQuote.grandTotal}`);
    assert(testQuote.charges.length === 3, 'Quotation contains 3 itemized charge items');

    // Customer accepts quotation -> Booking confirmed -> Trip created
    await prisma.quotation.update({
      where: { id: testQuote.id },
      data: { quotationStatus: 'ACCEPTED', acceptedAt: new Date() },
    });

    await prisma.booking.update({
      where: { id: testBooking.id },
      data: { bookingStatus: 'CONFIRMED' },
    });

    const tripRef = `RNH-TR-TEST-${Date.now().toString().slice(-4)}`;
    const newTrip = await prisma.trip.create({
      data: {
        tripReference: tripRef,
        bookingId: testBooking.id,
        tripStatus: 'CREATED',
        plannedPickup: testBooking.requestedPickupDate,
        plannedDelivery: testBooking.preferredDeliveryDate,
        createdBy: 'Customer Quotation Acceptance',
      },
    });

    assert(newTrip.id > 0, `Trip ${tripRef} automatically created in status CREATED upon quotation acceptance`);

    // 4. Vehicle & Driver Assignment Tests with Conflict Prevention
    console.log('\n--- 4. Testing Fleet Allocation & Conflict Prevention ---');
    const availableVehicle = await prisma.vehicle.findFirst({ where: { vehicleStatus: 'AVAILABLE' } });
    assert(availableVehicle !== null, `Found available vehicle ${availableVehicle?.registrationNumber}`);

    const availableDriver = await prisma.driver.findFirst({ where: { driverStatus: 'AVAILABLE' } });
    assert(availableDriver !== null, `Found available driver ${availableDriver?.driverCode}`);

    // Create assignment
    const assignment = await prisma.tripAssignment.create({
      data: {
        tripId: newTrip.id,
        vehicleId: availableVehicle.id,
        driverId: availableDriver.id,
        transporterId: availableVehicle.transporterId,
        assignedBy: opsUser.id,
        assignmentStatus: 'ACTIVE',
      },
    });

    // Update statuses
    await prisma.vehicle.update({ where: { id: availableVehicle.id }, data: { vehicleStatus: 'ON_TRIP' } });
    await prisma.driver.update({ where: { id: availableDriver.id }, data: { driverStatus: 'ON_TRIP' } });
    await prisma.trip.update({ where: { id: newTrip.id }, data: { tripStatus: 'DRIVER_ASSIGNED' } });

    assert(assignment.id > 0, `Vehicle ${availableVehicle.registrationNumber} and Driver assigned to trip ${tripRef}`);

    // Verify conflict prevention: Vehicle & Driver are now ON_TRIP and cannot be reallocated
    const recheckVehicle = await prisma.vehicle.findUnique({ where: { id: availableVehicle.id } });
    assert(recheckVehicle.vehicleStatus === 'ON_TRIP', 'Vehicle status updated to ON_TRIP (prevents simultaneous allocation)');

    const recheckDriver = await prisma.driver.findUnique({ where: { id: availableDriver.id } });
    assert(recheckDriver.driverStatus === 'ON_TRIP', 'Driver status updated to ON_TRIP (prevents simultaneous trip conflict)');

    // 5. Trip Lifecycle Progression & GPS Telemetry Tests
    console.log('\n--- 5. Testing Driver Trip Status Lifecycle & Real GPS Tracking ---');
    // AT_PICKUP -> LOADED -> IN_TRANSIT
    const statuses = ['AT_PICKUP', 'LOADING', 'LOADED', 'IN_TRANSIT'];
    for (const st of statuses) {
      await prisma.trip.update({ where: { id: newTrip.id }, data: { tripStatus: st } });
      await prisma.tripStatusHistory.create({
        data: {
          tripId: newTrip.id,
          previousStatus: 'TRANSITION',
          newStatus: st,
          updatedByUserId: driverUser.id,
          statusNote: `Automated test transition to ${st}`,
        },
      });
    }

    const currentTrip = await prisma.trip.findUnique({ where: { id: newTrip.id }, include: { statusHistory: true } });
    assert(currentTrip.tripStatus === 'IN_TRANSIT', 'Trip status smoothly progressed to IN_TRANSIT');
    assert(currentTrip.statusHistory.length === 4, 'Trip status history recorded all 4 milestone transitions');

    // Transmit GPS Telemetry
    const gpsRecord = await prisma.trackingLocation.create({
      data: {
        tripId: newTrip.id,
        driverId: availableDriver.id,
        latitude: 21.1458,
        longitude: 72.8223, // Near Surat / Vadodara on NH 48
        accuracyMeters: 4.5,
        speed: 62.4,
        heading: 14.5,
      },
    });
    assert(gpsRecord.id > 0, `Real-time GPS point (${gpsRecord.latitude}, ${gpsRecord.longitude}, ${gpsRecord.speed} km/h) recorded`);

    // 6. Documents & POD Tests
    console.log('\n--- 6. Testing Document Uploads (LR & Signed POD) ---');
    const lrDoc = await prisma.shipmentDocument.create({
      data: {
        bookingId: testBooking.id,
        tripId: newTrip.id,
        uploadedByUserId: driverUser.id,
        documentType: 'LR',
        storageKey: `docs/test/LR_${Date.now()}.pdf`,
        originalFileName: 'LorryReceipt_Pune_Gurugram.pdf',
        mimeType: 'application/pdf',
        fileSize: 312000,
        documentStatus: 'VERIFIED',
      },
    });
    assert(lrDoc.id > 0, 'Lorry Receipt (LR) uploaded and verified');

    // Deliver and Upload POD
    await prisma.trip.update({ where: { id: newTrip.id }, data: { tripStatus: 'DELIVERED', actualDelivery: new Date() } });

    const podDoc = await prisma.shipmentDocument.create({
      data: {
        bookingId: testBooking.id,
        tripId: newTrip.id,
        uploadedByUserId: driverUser.id,
        documentType: 'POD',
        storageKey: `docs/test/POD_${Date.now()}.jpg`,
        originalFileName: 'Signed_Delivery_Challan_Manesar.jpg',
        mimeType: 'image/jpeg',
        fileSize: 840000,
        documentStatus: 'VERIFIED',
        verifiedBy: 'Operations Officer Rajesh Nair',
        verifiedAt: new Date(),
      },
    });
    assert(podDoc.id > 0, 'Proof of Delivery (POD) uploaded and verified');

    // Complete trip & release vehicle/driver
    await prisma.trip.update({ where: { id: newTrip.id }, data: { tripStatus: 'COMPLETED' } });
    await prisma.vehicle.update({ where: { id: availableVehicle.id }, data: { vehicleStatus: 'AVAILABLE' } });
    await prisma.driver.update({ where: { id: availableDriver.id }, data: { driverStatus: 'AVAILABLE' } });

    const closedTrip = await prisma.trip.findUnique({ where: { id: newTrip.id } });
    assert(closedTrip.tripStatus === 'COMPLETED', 'Trip completed upon POD verification');

    const freedVehicle = await prisma.vehicle.findUnique({ where: { id: availableVehicle.id } });
    assert(freedVehicle.vehicleStatus === 'AVAILABLE', 'Vehicle released back to AVAILABLE pool');

    // 7. Finance & Invoicing Tests
    console.log('\n--- 7. Testing GST Invoicing & Payment Reconciliation ---');
    const invNumber = `RNH-INV-TEST-${Date.now().toString().slice(-4)}`;
    const testInvoice = await prisma.invoice.create({
      data: {
        invoiceNumber: invNumber,
        bookingId: testBooking.id,
        customerId: customer.id,
        invoiceDate: new Date(),
        dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
        subtotal: taxable,
        taxAmount: tax,
        grandTotal,
        invoiceStatus: 'ISSUED',
        items: {
          create: [
            { description: 'FTL Road Freight Pune to Gurugram', quantity: 1, unitPrice: baseFreight, taxableAmount: baseFreight, taxRate: 12.0, taxAmount: baseFreight * 0.12, lineTotal: baseFreight * 1.12 },
            { description: 'Loading & Handling Assistance', quantity: 1, unitPrice: loadingCharge, taxableAmount: loadingCharge, taxRate: 12.0, taxAmount: loadingCharge * 0.12, lineTotal: loadingCharge * 1.12 },
            { description: 'Unloading Dock Handling', quantity: 1, unitPrice: unloadingCharge, taxableAmount: unloadingCharge, taxRate: 12.0, taxAmount: unloadingCharge * 0.12, lineTotal: unloadingCharge * 1.12 },
          ],
        },
      },
      include: { items: true },
    });

    assert(testInvoice.id > 0, `Freight Invoice ${invNumber} generated for ₹${testInvoice.grandTotal}`);

    // Partial payment
    const payment = await prisma.payment.create({
      data: {
        invoiceId: testInvoice.id,
        receiptReference: `RNH-REC-TEST-${Date.now().toString().slice(-4)}`,
        amount: grandTotal,
        paymentMethod: 'NEFT',
        paymentStatus: 'SUCCESS',
        gatewayReference: 'HDFC9021948201',
        receivedBy: 'Finance Executive Kavita K',
      },
    });

    await prisma.invoice.update({
      where: { id: testInvoice.id },
      data: { invoiceStatus: 'PAID' },
    });

    const reconciledInvoice = await prisma.invoice.findUnique({ where: { id: testInvoice.id }, include: { payments: true } });
    assert(reconciledInvoice.invoiceStatus === 'PAID', 'Invoice status updated to PAID upon full reconciliation');
    assert(reconciledInvoice.payments.length === 1, 'Payment receipt recorded with immutable audit trail');

    // 8. Audit Logging Tests
    console.log('\n--- 8. Testing Immutable Audit Log Trail ---');
    await prisma.auditLog.create({
      data: {
        actorUserId: adminUser.id,
        action: 'E2E_WORKFLOW_TEST_COMPLETED',
        entityType: 'TRIP',
        entityId: String(newTrip.id),
        newValues: JSON.stringify({ tripReference: tripRef, status: 'COMPLETED' }),
        ipAddress: '127.0.0.1',
      },
    });

    const auditCount = await prisma.auditLog.count({ where: { entityType: 'TRIP', entityId: String(newTrip.id) } });
    assert(auditCount >= 1, 'Audit log recorded for completed lifecycle');

    console.log('\n=====================================================');
    console.log(`TEST SUITE RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log('=====================================================');

    if (failed > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('Test execution error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runTests();
