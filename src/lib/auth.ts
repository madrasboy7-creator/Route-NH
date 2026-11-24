import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import { prisma } from './prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'route-nh-super-secure-production-secret-2026-key-logistics';

export interface TokenPayload {
  userId: number;
  email: string;
  role: string;
  fullName: string;
  customerId?: number;
  driverId?: number;
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (err) {
    return null;
  }
}

export async function getCurrentUser(req?: NextRequest): Promise<TokenPayload | null> {
  let token: string | undefined;

  // 1. Try Authorization header
  if (req) {
    const authHeader = req.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7);
    }
  }

  // 2. Try cookie
  if (!token) {
    try {
      const cookieStore = cookies();
      token = cookieStore.get('route_nh_token')?.value;
    } catch {
      // In non-server context
    }
  }

  if (!token) return null;

  return verifyToken(token);
}

export async function recordAuditLog({
  actorUserId,
  action,
  entityType,
  entityId,
  oldValues,
  newValues,
  ipAddress,
}: {
  actorUserId?: number;
  action: string;
  entityType: string;
  entityId: string;
  oldValues?: any;
  newValues?: any;
  ipAddress?: string;
}) {
  try {
    await prisma.auditLog.create({
      data: {
        actorUserId: actorUserId || null,
        action,
        entityType,
        entityId: String(entityId),
        oldValues: oldValues ? JSON.stringify(oldValues) : null,
        newValues: newValues ? JSON.stringify(newValues) : null,
        ipAddress: ipAddress || '127.0.0.1',
      },
    });
  } catch (err) {
    console.error('Audit log write error:', err);
  }
}
