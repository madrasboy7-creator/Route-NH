import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser, recordAuditLog } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/api-response';

export async function GET(req: NextRequest) {
  try {
    const settings = await prisma.applicationSetting.findMany();
    const settingsMap = settings.reduce((acc: Record<string, string>, s) => {
      acc[s.settingKey] = s.settingValue;
      return acc;
    }, {});

    return successResponse(settingsMap);
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to fetch settings', 500);
  }
}

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser(req);
    if (!user || user.role !== 'ADMIN') {
      return errorResponse('Forbidden: Admin privilege required', 403);
    }

    const body = await req.json();

    for (const [key, val] of Object.entries(body)) {
      await prisma.applicationSetting.upsert({
        where: { settingKey: key },
        update: { settingValue: String(val), updatedBy: user.fullName },
        create: {
          settingKey: key,
          settingValue: String(val),
          updatedBy: user.fullName,
        },
      });
    }

    await recordAuditLog({
      actorUserId: user.userId,
      action: 'UPDATE_SYSTEM_SETTINGS',
      entityType: 'APPLICATION_SETTINGS',
      entityId: 'SYSTEM',
      newValues: body,
    });

    return successResponse(body, 'Settings updated successfully');
  } catch (error: any) {
    return errorResponse(error.message || 'Failed to update settings', 500);
  }
}
