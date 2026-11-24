import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, recordAuditLog } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user || user.role !== 'ADMIN') {
      return errorResponse('Forbidden: Admin privilege required', 403);
    }

    const users = await prisma.user.findMany({
      include: {
        role: true,
        customer: true,
        driver: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const roles = await prisma.role.findMany({
      include: { permissions: { include: { permission: true } } },
    });

    return successResponse({ users, roles });
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch users', 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user || user.role !== 'ADMIN') {
      return errorResponse('Forbidden: Admin privilege required', 403);
    }

    const body = await req.json();
    const { fullName, email, phone, password, roleId } = body;

    if (!fullName || !email || !phone || !password || !roleId) {
      return errorResponse('Full name, email, phone, password and role are required', 400);
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        fullName,
        email: email.toLowerCase().trim(),
        phone: phone.trim(),
        passwordHash,
        roleId: parseInt(roleId, 10),
        accountStatus: 'ACTIVE',
      },
      include: { role: true },
    });

    await recordAuditLog({
      actorUserId: user.userId,
      action: 'CREATE_STAFF_USER',
      entityType: 'USER',
      entityId: String(newUser.id),
      newValues: { email: newUser.email, role: newUser.role.name },
    });

    return successResponse(newUser, 'Staff account created successfully', 201);
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to create user', 500);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user || user.role !== 'ADMIN') {
      return errorResponse('Forbidden: Admin privilege required', 403);
    }

    const body = await req.json();
    const { userId, accountStatus, roleId } = body;

    if (!userId) return errorResponse('User ID required', 400);

    const updateData: any = {};
    if (accountStatus) updateData.accountStatus = accountStatus;
    if (roleId) updateData.roleId = parseInt(roleId, 10);

    const updated = await prisma.user.update({
      where: { id: parseInt(userId, 10) },
      data: updateData,
      include: { role: true },
    });

    await recordAuditLog({
      actorUserId: user.userId,
      action: 'UPDATE_USER_PERMISSIONS',
      entityType: 'USER',
      entityId: String(updated.id),
      newValues: updateData,
    });

    return successResponse(updated, 'User updated successfully');
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to update user', 500);
  }
}
