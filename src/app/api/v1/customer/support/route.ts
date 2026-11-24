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

    const where: any = {};
    if (customer && user.role === 'CUSTOMER') {
      where.customerId = customer.id;
    }

    const tickets = await prisma.supportTicket.findMany({
      where,
      include: {
        customer: true,
        messages: {
          include: { sender: { select: { fullName: true, role: true } } },
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return successResponse(tickets);
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch support tickets', 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return errorResponse('Unauthorized', 401);

    const customer = await prisma.customer.findFirst({
      where: { userId: user.userId },
    });

    if (!customer) return errorResponse('Customer profile required', 403);

    const body = await req.json();
    const { bookingReference, issueCategory, subject, description, priority } = body;

    if (!issueCategory || !subject || !description) {
      return errorResponse('Issue category, subject and description are required', 400);
    }

    const ticket = await prisma.supportTicket.create({
      data: {
        customerId: customer.id,
        bookingReference: bookingReference || null,
        issueCategory,
        subject,
        description,
        priority: priority || 'MEDIUM',
        status: 'OPEN',
        messages: {
          create: {
            senderUserId: user.userId,
            message: description,
          },
        },
      },
      include: { messages: true },
    });

    return successResponse(ticket, 'Support ticket created successfully', 201);
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to create support ticket', 500);
  }
}
