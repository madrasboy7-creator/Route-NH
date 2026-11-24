import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, recordAuditLog } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return errorResponse('Unauthorized', 401);

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const where: any = {};
    if (status && status !== 'ALL') {
      where.bookingStatus = status;
    }
    if (search) {
      where.OR = [
        { bookingReference: { contains: search } },
        { goodsDescription: { contains: search } },
        { customer: { companyName: { contains: search } } },
      ];
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        customer: { include: { user: { select: { fullName: true, email: true, phone: true } } } },
        stops: { orderBy: { sequenceNumber: 'asc' } },
        items: true,
        quotations: { include: { charges: true }, orderBy: { versionNumber: 'desc' } },
        trip: {
          include: {
            assignments: {
              where: { assignmentStatus: 'ACTIVE' },
              include: { vehicle: true, driver: { include: { user: true } } },
            },
          },
        },
        invoices: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return successResponse(bookings);
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch operational bookings', 500);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return errorResponse('Unauthorized', 401);

    const body = await req.json();
    const { bookingId, action, rejectionReason } = body;

    if (!bookingId || !action) {
      return errorResponse('Booking ID and action required', 400);
    }

    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(bookingId, 10) },
      include: { customer: { include: { user: true } } },
    });

    if (!booking) return errorResponse('Booking not found', 404);

    let newStatus = booking.bookingStatus;
    if (action === 'APPROVE_FOR_QUOTATION') {
      newStatus = 'UNDER_REVIEW';
    } else if (action === 'REJECT') {
      newStatus = 'REJECTED';
    }

    const updated = await prisma.booking.update({
      where: { id: booking.id },
      data: { bookingStatus: newStatus },
    });

    // Notify customer
    await prisma.notification.create({
      data: {
        userId: booking.customer.userId,
        notificationType: 'BOOKING',
        title: `Booking Update: ${booking.bookingReference}`,
        message:
          action === 'APPROVE_FOR_QUOTATION'
            ? `Your booking request is under review. Our operations team is preparing a quotation.`
            : `Your booking request was rejected. Reason: ${rejectionReason || 'Requirements not serviceable'}.`,
        bookingId: booking.id,
      },
    });

    await recordAuditLog({
      actorUserId: user.userId,
      action: `BOOKING_${action}`,
      entityType: 'BOOKING',
      entityId: String(booking.id),
      newValues: { status: newStatus, rejectionReason },
    });

    return successResponse(updated, 'Booking status updated successfully');
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to update booking', 500);
  }
}
