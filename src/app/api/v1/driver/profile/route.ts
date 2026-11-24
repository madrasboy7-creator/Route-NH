import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return errorResponse('Unauthorized', 401);

    const driver = await prisma.driver.findFirst({
      where: { userId: user.userId },
      include: {
        user: { select: { fullName: true, email: true, phone: true } },
        tripAssignments: {
          where: { assignmentStatus: 'ACTIVE' },
          include: {
            vehicle: true,
            trip: {
              include: {
                booking: {
                  include: { stops: { orderBy: { sequenceNumber: 'asc' } }, items: true },
                },
              },
            },
          },
        },
      },
    });

    if (!driver) return errorResponse('Driver profile not found', 404);

    const completedTripsCount = await prisma.tripAssignment.count({
      where: {
        driverId: driver.id,
        trip: { tripStatus: 'COMPLETED' },
      },
    });

    return successResponse({
      driver,
      completedTripsCount,
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch driver profile', 500);
  }
}
