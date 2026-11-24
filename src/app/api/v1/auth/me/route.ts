import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const userPayload = await getCurrentUser(req);
    if (!userPayload) {
      return errorResponse('Unauthorized', 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: userPayload.userId },
      include: {
        role: {
          include: {
            permissions: {
              include: {
                permission: true,
              },
            },
          },
        },
        customer: true,
        driver: true,
      },
    });

    if (!user) {
      return errorResponse('User not found', 404);
    }

    return successResponse({
      id: user.id,
      publicId: user.publicId,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
      role: user.role.name,
      permissions: user.role.permissions.map((p) => p.permission.code),
      customer: user.customer,
      driver: user.driver,
    });
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch user', 500);
  }
}
