import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, recordAuditLog } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const documents = await prisma.shipmentDocument.findMany({
      include: {
        booking: {
          include: { customer: true, trip: true },
        },
        uploader: { select: { fullName: true, role: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return successResponse(documents);
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch documents', 500);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user) return errorResponse('Unauthorized', 401);

    const body = await req.json();
    const { documentId, status, rejectionReason } = body;

    if (!documentId || !['VERIFIED', 'REJECTED'].includes(status)) {
      return errorResponse('Document ID and valid status (VERIFIED/REJECTED) required', 400);
    }

    const doc = await prisma.shipmentDocument.update({
      where: { id: parseInt(documentId, 10) },
      data: {
        documentStatus: status,
        verifiedBy: user.fullName || 'Operations Officer',
        verifiedAt: new Date(),
      },
      include: {
        booking: true,
        trip: true,
      },
    });

    // If POD is verified, check if trip can be marked as COMPLETED and invoice generated
    if (doc.documentType === 'POD' && status === 'VERIFIED' && doc.tripId) {
      const trip = await prisma.trip.findUnique({
        where: { id: doc.tripId },
        include: { assignments: { where: { assignmentStatus: 'ACTIVE' } } },
      });

      if (trip && trip.tripStatus === 'POD_SUBMITTED') {
        await prisma.trip.update({
          where: { id: trip.id },
          data: { tripStatus: 'COMPLETED' },
        });

        // Release vehicle and driver
        if (trip.assignments.length > 0) {
          const assign = trip.assignments[0];
          await prisma.vehicle.update({
            where: { id: assign.vehicleId },
            data: { vehicleStatus: 'AVAILABLE' },
          });
          await prisma.driver.update({
            where: { id: assign.driverId },
            data: { driverStatus: 'AVAILABLE' },
          });
        }

        await prisma.tripStatusHistory.create({
          data: {
            tripId: trip.id,
            previousStatus: 'POD_SUBMITTED',
            newStatus: 'COMPLETED',
            updatedByUserId: user.userId,
            statusNote: 'POD verified by operations. Trip operationally completed.',
          },
        });
      }
    }

    await recordAuditLog({
      actorUserId: user.userId,
      action: `DOCUMENT_${status}`,
      entityType: 'SHIPMENT_DOCUMENT',
      entityId: String(doc.id),
      newValues: { status, rejectionReason },
    });

    return successResponse(doc, `Document ${status.toLowerCase()} successfully`);
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to verify document', 500);
  }
}
