import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, recordAuditLog } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/api-response';

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    const userId = user ? user.userId : 6;

    const body = await req.json();
    const {
      tripId,
      documentType, // 'LR', 'POD', 'LOADING_PHOTO', 'UNLOADING_PHOTO'
      originalFileName,
      storageKey,
      mimeType,
      fileSize,
    } = body;

    if (!tripId || !documentType) {
      return errorResponse('Trip ID and Document Type are required', 400);
    }

    const trip = await prisma.trip.findUnique({
      where: { id: parseInt(tripId, 10) },
      include: { booking: true },
    });

    if (!trip) return errorResponse('Trip not found', 404);

    const doc = await prisma.$transaction(async (tx) => {
      const d = await tx.shipmentDocument.create({
        data: {
          bookingId: trip.bookingId,
          tripId: trip.id,
          uploadedByUserId: userId,
          documentType,
          originalFileName: originalFileName || `${documentType}_${Date.now()}.jpg`,
          storageKey: storageKey || `documents/${trip.id}/${documentType}_${Date.now()}.jpg`,
          mimeType: mimeType || 'image/jpeg',
          fileSize: parseInt(fileSize || '102400', 10),
          documentStatus: 'PENDING_VERIFICATION',
        },
      });

      // If document is POD, update trip status to POD_SUBMITTED
      if (documentType === 'POD') {
        await tx.trip.update({
          where: { id: trip.id },
          data: { tripStatus: 'POD_SUBMITTED' },
        });

        await tx.tripStatusHistory.create({
          data: {
            tripId: trip.id,
            previousStatus: trip.tripStatus,
            newStatus: 'POD_SUBMITTED',
            updatedByUserId: user.userId,
            statusNote: 'Driver uploaded signed Proof of Delivery (POD). Awaiting verification.',
          },
        });
      }

      return d;
    });

    await recordAuditLog({
      actorUserId: userId,
      action: 'UPLOAD_DOCUMENT',
      entityType: 'SHIPMENT_DOCUMENT',
      entityId: String(doc.id),
      newValues: { documentType, tripReference: trip.tripReference },
    });

    return successResponse(doc, `${documentType} uploaded successfully`, 201);
  } catch (error: any) {
    console.error('Document upload error:', error);
    return errorResponse(error.message || 'Failed to upload document', 500);
  }
}
