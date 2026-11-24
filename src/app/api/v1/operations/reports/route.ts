import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return errorResponse('Unauthorized', 401);

    // Aggregations
    const [
      totalBookings,
      totalTrips,
      totalRevenueResult,
      totalPendingRevenueResult,
      vehicleStats,
      recentBookings,
      recentTrips,
    ] = await Promise.all([
      prisma.booking.count(),
      prisma.trip.count(),
      prisma.invoice.aggregate({
        _sum: { grandTotal: true },
        where: { invoiceStatus: 'PAID' },
      }),
      prisma.invoice.aggregate({
        _sum: { grandTotal: true },
        where: { invoiceStatus: { in: ['ISSUED', 'PARTIALLY_PAID'] } },
      }),
      prisma.vehicle.groupBy({
        by: ['vehicleStatus'],
        _count: { id: true },
      }),
      prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: { customer: true },
      }),
      prisma.trip.findMany({
        take: 5,
        orderBy: { updatedAt: 'desc' },
        include: {
          booking: { include: { stops: true } },
          assignments: {
            where: { assignmentStatus: 'ACTIVE' },
            include: { vehicle: true, driver: { include: { user: true } } },
          },
        },
      }),
    ]);

    const totalCollected = totalRevenueResult._sum.grandTotal || 0;
    const totalPending = totalPendingRevenueResult._sum.grandTotal || 0;

    return successResponse({
      summary: {
        totalBookings,
        totalTrips,
        totalCollected,
        totalPending,
        vehicleStats,
      },
      recentBookings,
      recentTrips,
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch operational reports', 500);
  }
}
