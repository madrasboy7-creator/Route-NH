import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
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
    const { latitude, longitude, accuracyMeters, speed, heading, recordedAt } = body;

    if (!latitude || !longitude) {
      return errorResponse('Latitude and longitude are required', 400);
    }

    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      include: {
        assignments: { where: { assignmentStatus: 'ACTIVE' } },
      },
    });

    if (!trip) return errorResponse('Trip not found', 404);

    let driverId = user.driverId;
    if (!driverId) {
      const activeAssign = trip.assignments[0];
      if (activeAssign) driverId = activeAssign.driverId;
    }

    if (!driverId) {
      return errorResponse('No active driver linked to this trip', 400);
    }

    const locationRecord = await prisma.trackingLocation.create({
      data: {
        tripId: trip.id,
        driverId,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        accuracyMeters: accuracyMeters ? parseFloat(accuracyMeters) : null,
        speed: speed ? parseFloat(speed) : null,
        heading: heading ? parseFloat(heading) : null,
        recordedAt: recordedAt ? new Date(recordedAt) : new Date(),
        receivedAt: new Date(),
      },
    });

    return successResponse(
      locationRecord,
      'GPS location telemetry recorded successfully',
      201
    );
  } catch (error: any) {
    console.error('GPS telemetry error:', error);
    return errorResponse(error.message || 'Failed to save location', 500);
  }
}
