import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return errorResponse('Unauthorized', 401);

    const customer = await prisma.customer.findFirst({
      where: { userId: user.userId },
    });

    if (!customer) return errorResponse('Customer not found', 404);

    const shipments = await prisma.trip.findMany({
      where: {
        booking: { customerId: customer.id },
      },
      include: {
        booking: {
          include: {
            stops: { orderBy: { sequenceNumber: 'asc' } },
            items: true,
            invoices: true,
          },
        },
        assignments: {
          where: { assignmentStatus: 'ACTIVE' },
          include: {
            vehicle: true,
            driver: {
              include: {
                user: { select: { fullName: true, phone: true } },
              },
            },
          },
        },
        tracking: {
          orderBy: { recordedAt: 'desc' },
          take: 20,
        },
        statusHistory: {
          orderBy: { createdAt: 'desc' },
        },
        documents: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return successResponse(shipments);
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch shipments', 500);
  }
}
