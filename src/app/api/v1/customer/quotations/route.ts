import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, recordAuditLog } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return errorResponse('Unauthorized', 401);

    const customer = await prisma.customer.findFirst({
      where: { userId: user.userId },
    });

    if (!customer) return errorResponse('Customer not found', 404);

    const quotations = await prisma.quotation.findMany({
      where: {
        booking: { customerId: customer.id },
      },
      include: {
        charges: true,
        booking: {
          include: {
            stops: { orderBy: { sequenceNumber: 'asc' } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return successResponse(quotations);
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch quotations', 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return errorResponse('Unauthorized', 401);

    const customer = await prisma.customer.findFirst({
      where: { userId: user.userId },
    });

    if (!customer) return errorResponse('Customer not found', 404);

    const body = await req.json();
    const { quotationId, action, rejectionReason } = body;

    if (!quotationId || !['ACCEPT', 'REJECT'].includes(action)) {
      return errorResponse('Valid quotationId and action (ACCEPT / REJECT) required', 400);
    }

    const quotation = await prisma.quotation.findUnique({
      where: { id: parseInt(quotationId, 10) },
      include: {
        booking: {
          include: { customer: true },
        },
      },
    });

    if (!quotation || quotation.booking.customerId !== customer.id) {
      return errorResponse('Quotation not found or unauthorized', 404);
    }

    if (quotation.quotationStatus !== 'SENT') {
      return errorResponse(`Quotation cannot be updated because current status is ${quotation.quotationStatus}`, 400);
    }

    if (new Date() > new Date(quotation.validUntil)) {
      await prisma.quotation.update({
        where: { id: quotation.id },
        data: { quotationStatus: 'EXPIRED' },
      });
      return errorResponse('Quotation validity has expired. Please request a revised quotation.', 400);
    }

    const result = await prisma.$transaction(async (tx) => {
      if (action === 'ACCEPT') {
        const updatedQuote = await tx.quotation.update({
          where: { id: quotation.id },
          data: {
            quotationStatus: 'ACCEPTED',
            acceptedAt: new Date(),
          },
        });

        // Confirm booking
        const updatedBooking = await tx.booking.update({
          where: { id: quotation.bookingId },
          data: {
            bookingStatus: 'CONFIRMED',
          },
        });

        // Automatically create Trip record in CREATED status
        const tripCount = await tx.trip.count();
        const tripReference = `RNH-TR-${new Date().getFullYear()}-${String(tripCount + 1).padStart(4, '0')}`;

        const newTrip = await tx.trip.create({
          data: {
            tripReference,
            bookingId: quotation.bookingId,
            tripStatus: 'CREATED',
            plannedPickup: quotation.booking.requestedPickupDate,
            plannedDelivery: quotation.booking.preferredDeliveryDate,
            createdBy: 'Customer Quotation Acceptance',
            statusHistory: {
              create: {
                previousStatus: 'NONE',
                newStatus: 'CREATED',
                updatedByUserId: user.userId,
                statusNote: `Quotation ${quotation.quotationReference} accepted by customer. Booking confirmed.`,
              },
            },
          },
        });

        // Notify operations team
        const opsUsers = await tx.user.findMany({
          where: { role: { name: { in: ['OPERATIONS', 'DISPATCHER'] } } },
        });

        for (const ops of opsUsers) {
          await tx.notification.create({
            data: {
              userId: ops.id,
              notificationType: 'QUOTATION',
              title: `Quotation Accepted: ${quotation.quotationReference}`,
              message: `Booking ${quotation.booking.bookingReference} confirmed. Trip ${tripReference} is awaiting vehicle & driver allocation.`,
              bookingId: quotation.bookingId,
              tripId: newTrip.id,
            },
          });
        }

        return { quote: updatedQuote, trip: newTrip };
      } else {
        const updatedQuote = await tx.quotation.update({
          where: { id: quotation.id },
          data: {
            quotationStatus: 'REJECTED',
          },
        });

        await tx.booking.update({
          where: { id: quotation.bookingId },
          data: {
            bookingStatus: 'UNDER_REVIEW',
          },
        });

        return { quote: updatedQuote, rejected: true };
      }
    });

    await recordAuditLog({
      actorUserId: user.userId,
      action: action === 'ACCEPT' ? 'ACCEPT_QUOTATION' : 'REJECT_QUOTATION',
      entityType: 'QUOTATION',
      entityId: String(quotation.id),
      newValues: { action, reason: rejectionReason },
    });

    return successResponse(result, `Quotation ${action.toLowerCase()}ed successfully`);
  } catch (error: any) {
    console.error('Quotation action error:', error);
    return errorResponse(error.message || 'Failed to process quotation', 500);
  }
}
