import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, recordAuditLog } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return errorResponse('Unauthorized', 401);

    const rates = await prisma.routeRate.findMany({
      orderBy: { sourceCity: 'asc' },
    });

    return successResponse(rates);
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch rates', 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user || user.role !== 'ADMIN') {
      return errorResponse('Forbidden: Admin privilege required', 403);
    }

    const body = await req.json();
    const {
      sourceCity,
      destinationCity,
      vehicleCategory,
      baseRate,
      perKmRate,
      minCharge,
      estimatedHours,
    } = body;

    if (!sourceCity || !destinationCity || !vehicleCategory || !baseRate) {
      return errorResponse('Required route pricing details missing', 400);
    }

    const newRate = await prisma.routeRate.create({
      data: {
        sourceCity,
        destinationCity,
        vehicleCategory,
        baseRate: parseFloat(baseRate),
        perKmRate: parseFloat(perKmRate || '50'),
        minCharge: parseFloat(minCharge || baseRate),
        estimatedHours: parseFloat(estimatedHours || '24'),
        isActive: true,
      },
    });

    await recordAuditLog({
      actorUserId: user.userId,
      action: 'CREATE_ROUTE_RATE',
      entityType: 'ROUTE_RATE',
      entityId: String(newRate.id),
      newValues: { sourceCity, destinationCity, vehicleCategory, baseRate },
    });

    return successResponse(newRate, 'Route rate configuration created', 201);
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to create route rate', 500);
  }
}
