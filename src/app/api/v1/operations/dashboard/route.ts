import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return errorResponse('Unauthorized', 401);

    const [
      newBookingRequests,
      bookingsAwaitingQuotes,
      confirmedBookings,
      vehiclesAvailable,
      vehiclesOnTrip,
      driversAvailable,
      driversOnTrip,
      activeTrips,
      completedTrips,
      pendingPodUploads,
      unpaidInvoices,
    ] = await Promise.all([
      prisma.booking.count({ where: { bookingStatus: 'REQUESTED' } }),
      prisma.booking.count({ where: { bookingStatus: 'UNDER_REVIEW' } }),
      prisma.booking.count({ where: { bookingStatus: 'CONFIRMED' } }),
      prisma.vehicle.count({ where: { vehicleStatus: 'AVAILABLE' } }),
      prisma.vehicle.count({ where: { vehicleStatus: 'ON_TRIP' } }),
      prisma.driver.count({ where: { driverStatus: 'AVAILABLE' } }),
      prisma.driver.count({ where: { driverStatus: 'ON_TRIP' } }),
      prisma.trip.count({
        where: {
          tripStatus: {
            in: [
              'CREATED',
              'VEHICLE_ASSIGNED',
              'DRIVER_ASSIGNED',
              'AT_PICKUP',
              'LOADING',
              'LOADED',
              'DISPATCHED',
              'IN_TRANSIT',
              'DELAYED',
              'AT_DESTINATION',
              'UNLOADING',
            ],
          },
        },
      }),
      prisma.trip.count({ where: { tripStatus: 'COMPLETED' } }),
      prisma.trip.count({ where: { tripStatus: 'DELIVERED' } }),
      prisma.invoice.count({ where: { invoiceStatus: { in: ['ISSUED', 'PARTIALLY_PAID', 'OVERDUE'] } } }),
    ]);

    const recentTrips = await prisma.trip.findMany({
      take: 5,
      orderBy: { updatedAt: 'desc' },
      include: {
        booking: {
          include: {
            customer: true,
            stops: true,
          },
        },
        assignments: {
          where: { assignmentStatus: 'ACTIVE' },
          include: {
            vehicle: true,
            driver: { include: { user: { select: { fullName: true, phone: true } } } },
          },
        },
      },
    });

    return successResponse({
      stats: {
        newBookingRequests,
        bookingsAwaitingQuotes,
        confirmedBookings,
        vehiclesAvailable,
        vehiclesOnTrip,
        driversAvailable,
        driversOnTrip,
        activeTrips,
        completedTrips,
        pendingPodUploads,
        unpaidInvoices,
      },
      recentTrips,
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch operations dashboard', 500);
  }
}
