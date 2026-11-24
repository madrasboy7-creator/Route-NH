import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, recordAuditLog } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/api-response';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return errorResponse('Unauthorized', 401);

    const body = await req.json();
    const {
      bookingId,
      baseFreight,
      charges, // array of { chargeType, description, amount, taxRate }
      validDays,
      currency,
    } = body;

    if (!bookingId || baseFreight === undefined) {
      return errorResponse('Booking ID and base freight are required', 400);
    }

    const booking = await prisma.booking.findUnique({
      where: { id: parseInt(bookingId, 10) },
      include: {
        customer: { include: { user: true } },
        quotations: { orderBy: { versionNumber: 'desc' }, take: 1 },
      },
    });

    if (!booking) return errorResponse('Booking not found', 404);

    const versionNumber = booking.quotations.length > 0 ? booking.quotations[0].versionNumber + 1 : 1;
    const quotationCount = await prisma.quotation.count();
    const quotationReference = `RNH-QT-${new Date().getFullYear()}-${String(quotationCount + 1).padStart(4, '0')}`;

    const numBaseFreight = parseFloat(baseFreight);
    let totalTaxable = numBaseFreight;
    let totalTax = numBaseFreight * 0.12; // Default 12% GST on FTL

    const chargeList: Array<{ chargeType: string; description: string; amount: number; taxable: boolean; taxRate: number }> = [
      {
        chargeType: 'BASE_FREIGHT',
        description: `Base FTL Freight for ${booking.goodsDescription}`,
        amount: numBaseFreight,
        taxable: true,
        taxRate: 12.0,
      },
    ];

    if (charges && Array.isArray(charges)) {
      for (const ch of charges) {
        const amt = parseFloat(ch.amount || '0');
        const rate = parseFloat(ch.taxRate || '18.0');
        const taxable = ch.taxable !== false;
        chargeList.push({
          chargeType: ch.chargeType || 'OTHER',
          description: ch.description || 'Additional logistics charge',
          amount: amt,
          taxable,
          taxRate: rate,
        });
        if (taxable) {
          totalTaxable += amt;
          totalTax += amt * (rate / 100);
        }
      }
    }

    const grandTotal = totalTaxable + totalTax;
    const validityDays = parseInt(validDays || '7', 10);
    const validUntil = new Date(Date.now() + validityDays * 24 * 60 * 60 * 1000);

    const quotation = await prisma.$transaction(async (tx) => {
      // Mark any existing active quotation as SUPERSEDED
      await tx.quotation.updateMany({
        where: { bookingId: booking.id, quotationStatus: 'SENT' },
        data: { quotationStatus: 'SUPERSEDED' },
      });

      const q = await tx.quotation.create({
        data: {
          quotationReference,
          bookingId: booking.id,
          versionNumber,
          preparedBy: user.fullName || 'Operations Team',
          baseFreight: numBaseFreight,
          taxableAmount: totalTaxable,
          taxAmount: totalTax,
          grandTotal,
          currency: currency || 'INR',
          validUntil,
          quotationStatus: 'SENT',
          sentAt: new Date(),
          charges: {
            create: chargeList,
          },
        },
        include: { charges: true },
      });

      await tx.booking.update({
        where: { id: booking.id },
        data: { bookingStatus: 'QUOTATION_SENT' },
      });

      // Notify customer
      await tx.notification.create({
        data: {
          userId: booking.customer.userId,
          notificationType: 'QUOTATION',
          title: `Freight Quotation Received: ${quotationReference}`,
          message: `A freight quotation of ₹${grandTotal.toFixed(2)} has been prepared for your booking ${booking.bookingReference}. Please review and accept to confirm.`,
          bookingId: booking.id,
        },
      });

      return q;
    });

    await recordAuditLog({
      actorUserId: user.userId,
      action: 'CREATE_QUOTATION',
      entityType: 'QUOTATION',
      entityId: String(quotation.id),
      newValues: { quotationReference, grandTotal, bookingReference: booking.bookingReference },
    });

    return successResponse(quotation, 'Quotation prepared and sent to customer', 201);
  } catch (error: any) {
    console.error('Quotation error:', error);
    return errorResponse(error.message || 'Failed to prepare quotation', 500);
  }
}
