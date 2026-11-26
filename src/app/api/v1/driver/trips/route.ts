import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    const driverWhere = user ? { userId: user.userId } : { id: 1 };

    const driver = await prisma.driver.findFirst({
      where: driverWhere,
    });

    if (!driver) return errorResponse('Driver profile not found', 404);

    const assignments = await prisma.tripAssignment.findMany({
      where: { driverId: driver.id },
      include: {
        vehicle: true,
        trip: {
          include: {
            booking: {
              include: {
                stops: { orderBy: { sequenceNumber: 'asc' } },
                items: true,
                customer: { include: { user: { select: { fullName: true, phone: true } } } },
              },
            },
            statusHistory: { orderBy: { createdAt: 'desc' } },
            tracking: { orderBy: { recordedAt: 'desc' }, take: 10 },
            documents: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const activeTrip = assignments.find(
      (a) =>
        a.assignmentStatus === 'ACTIVE' &&
        !['COMPLETED', 'CANCELLED'].includes(a.trip.tripStatus)
    );

    const pastTrips = assignments.filter(
      (a) => a !== activeTrip
    );

    return successResponse({
      activeTrip: activeTrip ? activeTrip.trip : null,
      activeVehicle: activeTrip ? activeTrip.vehicle : null,
      history: pastTrips.map((p) => p.trip),
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch driver trips', 500);
  }
}
