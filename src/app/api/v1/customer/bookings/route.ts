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

    if (!customer && user.role !== 'ADMIN' && user.role !== 'OPERATIONS') {
      return errorResponse('Customer profile not found', 404);
    }

    const customerId = customer ? customer.id : undefined;

    const bookings = await prisma.booking.findMany({
      where: customerId ? { customerId } : {},
      include: {
        stops: { orderBy: { sequenceNumber: 'asc' } },
        items: true,
        quotations: {
          include: { charges: true },
          orderBy: { versionNumber: 'desc' },
        },
        trip: {
          include: {
            assignments: {
              where: { assignmentStatus: 'ACTIVE' },
              include: {
                vehicle: true,
                driver: { include: { user: { select: { fullName: true, phone: true } } } },
              },
            },
            statusHistory: { orderBy: { createdAt: 'desc' } },
            tracking: { orderBy: { recordedAt: 'desc' }, take: 1 },
          },
        },
        invoices: true,
        documents: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return successResponse(bookings);
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch bookings', 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return errorResponse('Unauthorized', 401);

    const customer = await prisma.customer.findFirst({
      where: { userId: user.userId },
    });

    if (!customer) return errorResponse('Customer account required to book', 403);

    const body = await req.json();
    const {
      requestedPickupDate,
      preferredDeliveryDate,
      goodsDescription,
      goodsCategory,
      totalWeightKg,
      packageCount,
      cargoValue,
      requiredVehicleCategory,
      specialInstructions,
      stops,
      items,
    } = body;

    if (!requestedPickupDate || !preferredDeliveryDate || !goodsDescription || !totalWeightKg) {
      return errorResponse('Required booking details are missing', 400);
    }

    const bookingCount = await prisma.booking.count();
    const bookingReference = `RNH-BK-${new Date().getFullYear()}-${String(bookingCount + 1).padStart(4, '0')}`;

    const newBooking = await prisma.$transaction(async (tx) => {
      const b = await tx.booking.create({
        data: {
          bookingReference,
          customerId: customer.id,
          createdByUserId: user.userId,
          requestedPickupDate: new Date(requestedPickupDate),
          preferredDeliveryDate: new Date(preferredDeliveryDate),
          goodsDescription,
          goodsCategory: goodsCategory || 'GENERAL',
          totalWeightKg: parseFloat(totalWeightKg),
          packageCount: parseInt(packageCount || '1', 10),
          cargoValue: parseFloat(cargoValue || '0'),
          requiredVehicleCategory: requiredVehicleCategory || '32ft MXL Container',
          specialInstructions: specialInstructions || null,
          bookingStatus: 'REQUESTED',
        },
      });

      // Insert stops
      if (stops && Array.isArray(stops)) {
        for (let i = 0; i < stops.length; i++) {
          const s = stops[i];
          await tx.bookingStop.create({
            data: {
              bookingId: b.id,
              stopType: s.stopType || (i === 0 ? 'PICKUP' : 'DELIVERY'),
              sequenceNumber: i + 1,
              contactName: s.contactName || 'Site Incharge',
              contactPhone: s.contactPhone || customer.billingPhone,
              addressLine1: s.addressLine1 || '',
              addressLine2: s.addressLine2 || null,
              city: s.city || 'City',
              state: s.state || 'State',
              postalCode: s.postalCode || '100001',
              latitude: s.latitude ? parseFloat(s.latitude) : null,
              longitude: s.longitude ? parseFloat(s.longitude) : null,
              scheduledArrival: s.scheduledArrival ? new Date(s.scheduledArrival) : new Date(requestedPickupDate),
              instructions: s.instructions || null,
            },
          });
        }
      }

      // Insert items
      if (items && Array.isArray(items)) {
        for (const item of items) {
          await tx.bookingItem.create({
            data: {
              bookingId: b.id,
              itemDescription: item.itemDescription || goodsDescription,
              packageType: item.packageType || 'CARTON',
              quantity: parseInt(item.quantity || '1', 10),
              unitWeightKg: parseFloat(item.unitWeightKg || (parseFloat(totalWeightKg) / parseInt(item.quantity || '1', 10)).toFixed(2)),
              totalWeightKg: parseFloat(item.totalWeightKg || totalWeightKg),
              lengthCm: item.lengthCm ? parseFloat(item.lengthCm) : null,
              widthCm: item.widthCm ? parseFloat(item.widthCm) : null,
              heightCm: item.heightCm ? parseFloat(item.heightCm) : null,
              declaredValue: parseFloat(item.declaredValue || cargoValue || '0'),
              handlingInstructions: item.handlingInstructions || null,
            },
          });
        }
      }

      // Create notification for operations
      const opsUsers = await tx.user.findMany({
        where: { role: { name: { in: ['OPERATIONS', 'ADMIN'] } } },
      });

      for (const ops of opsUsers) {
        await tx.notification.create({
          data: {
            userId: ops.id,
            notificationType: 'BOOKING',
            title: `New Booking Request: ${bookingReference}`,
            message: `Customer ${customer.companyName || user.fullName} submitted booking for ${goodsDescription} (${totalWeightKg} kg).`,
            bookingId: b.id,
          },
        });
      }

      return b;
    });

    await recordAuditLog({
      actorUserId: user.userId,
      action: 'CREATE_BOOKING',
      entityType: 'BOOKING',
      entityId: String(newBooking.id),
      newValues: { bookingReference, totalWeightKg },
    });

    return successResponse(newBooking, 'Booking request submitted successfully', 201);
  } catch (error: any) {
    console.error('Booking submission error:', error);
    return errorResponse(error.message || 'Failed to submit booking', 500);
  }
}
