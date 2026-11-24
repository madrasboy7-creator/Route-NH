import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return errorResponse('Unauthorized', 401);

    const transporters = await prisma.transporter.findMany({
      include: {
        vehicles: true,
        settlements: { orderBy: { createdAt: 'desc' }, take: 5 },
      },
      orderBy: { transporterName: 'asc' },
    });

    return successResponse(transporters);
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch transporters', 500);
  }
}
