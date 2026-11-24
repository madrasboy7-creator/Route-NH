import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return errorResponse('Unauthorized', 401);

    const drivers = await prisma.driver.findMany({
      include: {
        user: { select: { fullName: true, email: true, phone: true } },
        tripAssignments: {
          where: { assignmentStatus: 'ACTIVE' },
          include: {
            trip: {
              include: {
                booking: { include: { stops: true } },
              },
            },
          },
        },
      },
      orderBy: { driverStatus: 'asc' },
    });

    return successResponse(drivers);
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch drivers', 500);
  }
}
