import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, recordAuditLog } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/api-response';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return errorResponse('Unauthorized', 401);

    const tripId = parseInt(params.id, 10);
    const body = await req.json();
    const { newStatus, notes, latitude, longitude } = body;

    const allowedStatuses = [
      'AT_PICKUP',
      'LOADING',
      'LOADED',
      'IN_TRANSIT',
      'DELAYED',
      'AT_DESTINATION',
      'UNLOADING',
      'DELIVERED',
      'POD_SUBMITTED',
    ];

    if (!newStatus || !allowedStatuses.includes(newStatus)) {
      return errorResponse(`Invalid status transition to ${newStatus}`, 400);
    }

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        booking: { include: { customer: true } },
        assignments: { where: { assignmentStatus: 'ACTIVE' } },
      },
    });

    if (!trip) return errorResponse('Trip not found', 404);

    // If driver role, verify driver is assigned to this trip
    if (user.role === 'DRIVER') {
      const driver = await prisma.driver.findFirst({ where: { userId: user.userId } });
      if (!driver) return errorResponse('Driver account required', 403);

      const isAssigned = trip.assignments.some((a) => a.driverId === driver.id);
      if (!isAssigned) {
        return errorResponse('You are not authorized to update this trip', 403);
      }
    }

    const previousStatus = trip.tripStatus;

    const updated = await prisma.$transaction(async (tx) => {
      const updateData: any = { tripStatus: newStatus };
      if (newStatus === 'LOADED' && !trip.actualPickup) {
        updateData.actualPickup = new Date();
      }
      if (newStatus === 'DELIVERED' && !trip.actualDelivery) {
        updateData.actualDelivery = new Date();
      }

      const t = await tx.trip.update({
        where: { id: trip.id },
        data: updateData,
      });

      await tx.tripStatusHistory.create({
        data: {
          tripId: trip.id,
          previousStatus,
          newStatus,
          updatedByUserId: user.userId,
          statusNote: notes || `Driver updated trip status to ${newStatus}`,
          latitude: latitude ? parseFloat(latitude) : null,
          longitude: longitude ? parseFloat(longitude) : null,
        },
      });

      // If location provided, also save tracking point
      if (latitude && longitude && user.driverId) {
        await tx.trackingLocation.create({
          data: {
            tripId: trip.id,
            driverId: user.driverId,
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          },
        });
      }

      // Notify customer
      await tx.notification.create({
        data: {
          userId: trip.booking.customer.userId,
          notificationType: 'SHIPMENT_STATUS',
          title: `Shipment Update: ${trip.booking.bookingReference}`,
          message: `Your shipment status is now: ${newStatus.replace('_', ' ')}. ${notes || ''}`.trim(),
          bookingId: trip.booking.id,
          tripId: trip.id,
        },
      });

      return t;
    });

    await recordAuditLog({
      actorUserId: user.userId,
      action: 'UPDATE_TRIP_STATUS',
      entityType: 'TRIP',
      entityId: String(trip.id),
      newValues: { previousStatus, newStatus, notes },
    });

    return successResponse(updated, `Status updated to ${newStatus}`);
  } catch (error: any) {
    console.error('Driver trip status error:', error);
    return errorResponse(error.message || 'Failed to update trip status', 500);
  }
}
