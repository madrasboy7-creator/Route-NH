import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, recordAuditLog } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return errorResponse('Unauthorized', 401);

    const trips = await prisma.trip.findMany({
      include: {
        booking: {
          include: {
            customer: { include: { user: true } },
            stops: { orderBy: { sequenceNumber: 'asc' } },
            items: true,
            invoices: true,
          },
        },
        assignments: {
          where: { assignmentStatus: 'ACTIVE' },
          include: {
            vehicle: true,
            driver: { include: { user: { select: { fullName: true, phone: true } } } },
            transporter: true,
          },
        },
        statusHistory: { orderBy: { createdAt: 'desc' } },
        tracking: { orderBy: { recordedAt: 'desc' }, take: 10 },
        documents: true,
      },
      orderBy: { updatedAt: 'desc' },
    });

    return successResponse(trips);
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch trips', 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return errorResponse('Unauthorized', 401);

    const body = await req.json();
    const { tripId, vehicleId, driverId, transporterId, notes } = body;

    if (!tripId || !vehicleId || !driverId) {
      return errorResponse('Trip ID, Vehicle ID, and Driver ID are required', 400);
    }

    const trip = await prisma.trip.findUnique({
      where: { id: parseInt(tripId, 10) },
      include: {
        booking: { include: { customer: true } },
        assignments: { where: { assignmentStatus: 'ACTIVE' } },
      },
    });

    if (!trip) return errorResponse('Trip not found', 404);

    // Validate vehicle
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: parseInt(vehicleId, 10) },
    });
    if (!vehicle) return errorResponse('Vehicle not found', 404);
    if (vehicle.vehicleStatus === 'ON_TRIP') {
      return errorResponse(`Vehicle ${vehicle.registrationNumber} is currently ON_TRIP on another shipment`, 409);
    }
    if (vehicle.vehicleStatus === 'MAINTENANCE' || vehicle.vehicleStatus === 'INACTIVE') {
      return errorResponse(`Vehicle ${vehicle.registrationNumber} is not serviceable (${vehicle.vehicleStatus})`, 400);
    }

    // Validate vehicle capacity vs cargo weight
    if (vehicle.capacityKg < trip.booking.totalWeightKg) {
      return errorResponse(
        `Vehicle capacity (${vehicle.capacityKg} kg) is less than booking cargo weight (${trip.booking.totalWeightKg} kg)`,
        400
      );
    }

    // Validate driver
    const driver = await prisma.driver.findUnique({
      where: { id: parseInt(driverId, 10) },
      include: { user: true },
    });
    if (!driver) return errorResponse('Driver not found', 404);
    if (driver.driverStatus === 'ON_TRIP') {
      return errorResponse(`Driver ${driver.user.fullName} is currently ON_TRIP on another shipment`, 409);
    }
    if (driver.driverStatus === 'OFF_DUTY' || driver.verificationStatus !== 'VERIFIED') {
      return errorResponse(`Driver ${driver.user.fullName} is not verified or off-duty`, 400);
    }

    // Execute assignment in transaction
    const assignment = await prisma.$transaction(async (tx) => {
      // 1. Mark existing active assignments for this trip as REASSIGNED
      if (trip.assignments.length > 0) {
        for (const oldAssign of trip.assignments) {
          await tx.tripAssignment.update({
            where: { id: oldAssign.id },
            data: {
              assignmentStatus: 'REASSIGNED',
              unassignedAt: new Date(),
            },
          });
          // Free old vehicle and driver
          await tx.vehicle.update({
            where: { id: oldAssign.vehicleId },
            data: { vehicleStatus: 'AVAILABLE' },
          });
          await tx.driver.update({
            where: { id: oldAssign.driverId },
            data: { driverStatus: 'AVAILABLE' },
          });
        }
      }

      // 2. Create new active assignment
      const newAssign = await tx.tripAssignment.create({
        data: {
          tripId: trip.id,
          vehicleId: vehicle.id,
          driverId: driver.id,
          transporterId: parseInt(transporterId || String(vehicle.transporterId), 10),
          assignedBy: user.userId,
          assignmentStatus: 'ACTIVE',
        },
      });

      // 3. Mark vehicle and driver as ON_TRIP
      await tx.vehicle.update({
        where: { id: vehicle.id },
        data: { vehicleStatus: 'ON_TRIP' },
      });
      await tx.driver.update({
        where: { id: driver.id },
        data: { driverStatus: 'ON_TRIP' },
      });

      // 4. Update trip status
      const updatedTrip = await tx.trip.update({
        where: { id: trip.id },
        data: {
          tripStatus: 'DRIVER_ASSIGNED',
        },
      });

      // 5. Status history
      await tx.tripStatusHistory.create({
        data: {
          tripId: trip.id,
          previousStatus: trip.tripStatus,
          newStatus: 'DRIVER_ASSIGNED',
          updatedByUserId: user.userId,
          statusNote: `Assigned vehicle ${vehicle.registrationNumber} and driver ${driver.user.fullName}. ${notes || ''}`.trim(),
        },
      });

      // 6. Notify driver
      await tx.notification.create({
        data: {
          userId: driver.userId,
          notificationType: 'DISPATCH',
          title: `New Trip Assigned: ${trip.tripReference}`,
          message: `You have been assigned to trip ${trip.tripReference} (${trip.booking.goodsDescription}) with vehicle ${vehicle.registrationNumber}. Check your driver portal for pickup navigation.`,
          tripId: trip.id,
        },
      });

      // 7. Notify customer
      await tx.notification.create({
        data: {
          userId: trip.booking.customer.userId,
          notificationType: 'DISPATCH',
          title: `Vehicle Assigned for Booking ${trip.booking.bookingReference}`,
          message: `Vehicle ${vehicle.registrationNumber} and Driver ${driver.user.fullName} (${driver.user.phone}) have been assigned to your shipment.`,
          bookingId: trip.booking.id,
          tripId: trip.id,
        },
      });

      return newAssign;
    });

    await recordAuditLog({
      actorUserId: user.userId,
      action: 'ASSIGN_TRIP',
      entityType: 'TRIP',
      entityId: String(trip.id),
      newValues: {
        tripReference: trip.tripReference,
        vehicle: vehicle.registrationNumber,
        driver: driver.user.fullName,
      },
    });

    return successResponse(assignment, 'Vehicle and driver successfully assigned to trip', 201);
  } catch (error: any) {
    console.error('Trip assignment error:', error);
    return errorResponse(error.message || 'Failed to assign trip', 500);
  }
}
