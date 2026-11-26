import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, recordAuditLog } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    let customerId = 1;
    const user = await getCurrentUser(req);
    if (user) {
      const customer = await prisma.customer.findFirst({
        where: { userId: user.userId },
      });
      if (customer) customerId = customer.id;
    }

    const invoices = await prisma.invoice.findMany({
      where: { customerId },
      include: {
        items: true,
        payments: { orderBy: { paidAt: 'desc' } },
        booking: {
          include: {
            stops: { orderBy: { sequenceNumber: 'asc' } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return successResponse(invoices);
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch invoices', 500);
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
    const { invoiceId, amount, paymentMethod, gatewayReference } = body;

    if (!invoiceId || !amount) {
      return errorResponse('Invoice ID and payment amount are required', 400);
    }

    const invoice = await prisma.invoice.findUnique({
      where: { id: parseInt(invoiceId, 10) },
      include: { payments: true },
    });

    if (!invoice || invoice.customerId !== customer.id) {
      return errorResponse('Invoice not found or unauthorized', 404);
    }

    const payAmount = parseFloat(amount);
    const totalPaidSoFar = invoice.payments
      .filter((p) => p.paymentStatus === 'SUCCESS')
      .reduce((sum, p) => sum + p.amount, 0);

    const remainingDue = invoice.grandTotal - totalPaidSoFar;
    if (payAmount > remainingDue + 0.01) {
      return errorResponse(`Payment amount (₹${payAmount}) exceeds remaining balance of ₹${remainingDue.toFixed(2)}`, 400);
    }

    const receiptCount = await prisma.payment.count();
    const receiptReference = `RNH-REC-${new Date().getFullYear()}-${String(receiptCount + 1).padStart(4, '0')}`;

    const newPayment = await prisma.$transaction(async (tx) => {
      const payment = await tx.payment.create({
        data: {
          invoiceId: invoice.id,
          receiptReference,
          amount: payAmount,
          paymentMethod: paymentMethod || 'ONLINE_UPI',
          paymentStatus: 'SUCCESS',
          gatewayReference: gatewayReference || `GATEWAY-${Date.now()}`,
          receivedBy: 'Automated Payment Gateway',
          paidAt: new Date(),
        },
      });

      const newTotalPaid = totalPaidSoFar + payAmount;
      const isFullyPaid = Math.abs(invoice.grandTotal - newTotalPaid) < 1;

      await tx.invoice.update({
        where: { id: invoice.id },
        data: {
          invoiceStatus: isFullyPaid ? 'PAID' : 'PARTIALLY_PAID',
        },
      });

      return payment;
    });

    await recordAuditLog({
      actorUserId: user.userId,
      action: 'RECORD_PAYMENT',
      entityType: 'PAYMENT',
      entityId: String(newPayment.id),
      newValues: { receiptReference, amount: payAmount, invoiceId },
    });

    return successResponse(newPayment, 'Payment recorded successfully', 201);
  } catch (error: any) {
    console.error('Payment record error:', error);
    return errorResponse(error.message || 'Payment processing failed', 500);
  }
}
