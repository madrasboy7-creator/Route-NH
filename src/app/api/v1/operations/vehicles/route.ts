import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, recordAuditLog } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return errorResponse('Unauthorized', 401);

    const vehicles = await prisma.vehicle.findMany({
      include: {
        transporter: true,
        tripAssignments: {
          where: { assignmentStatus: 'ACTIVE' },
          include: {
            trip: {
              include: {
                booking: {
                  include: { stops: true },
                },
              },
            },
            driver: { include: { user: true } },
          },
        },
      },
      orderBy: { vehicleStatus: 'asc' },
    });

    return successResponse(vehicles);
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch vehicles', 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return errorResponse('Unauthorized', 401);

    const body = await req.json();
    const {
      transporterId,
      registrationNumber,
      vehicleCategory,
      bodyType,
      capacityKg,
      lengthFt,
      widthFt,
      heightFt,
      insuranceExpiry,
      fitnessExpiry,
      permitExpiry,
      pollutionExpiry,
    } = body;

    if (!registrationNumber || !vehicleCategory || !capacityKg) {
      return errorResponse('Registration number, category, and capacity are required', 400);
    }

    const regUpper = registrationNumber.toUpperCase().trim();
    const existing = await prisma.vehicle.findUnique({
      where: { registrationNumber: regUpper },
    });

    if (existing) {
      return errorResponse(`Vehicle with registration ${regUpper} already exists`, 409);
    }

    const vehicle = await prisma.vehicle.create({
      data: {
        transporterId: parseInt(transporterId || '1', 10),
        registrationNumber: regUpper,
        vehicleCategory,
        bodyType: bodyType || 'CONTAINER',
        capacityKg: parseFloat(capacityKg),
        lengthFt: parseFloat(lengthFt || '32.0'),
        widthFt: parseFloat(widthFt || '8.5'),
        heightFt: parseFloat(heightFt || '9.0'),
        vehicleStatus: 'AVAILABLE',
        insuranceExpiry: insuranceExpiry ? new Date(insuranceExpiry) : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        fitnessExpiry: fitnessExpiry ? new Date(fitnessExpiry) : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        permitExpiry: permitExpiry ? new Date(permitExpiry) : new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        pollutionExpiry: pollutionExpiry ? new Date(pollutionExpiry) : new Date(Date.now() + 180 * 24 * 60 * 60 * 1000),
      },
    });

    await recordAuditLog({
      actorUserId: user.userId,
      action: 'ADD_VEHICLE',
      entityType: 'VEHICLE',
      entityId: String(vehicle.id),
      newValues: { registrationNumber: regUpper, capacityKg },
    });

    return successResponse(vehicle, 'Vehicle registered successfully', 201);
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to add vehicle', 500);
  }
}
