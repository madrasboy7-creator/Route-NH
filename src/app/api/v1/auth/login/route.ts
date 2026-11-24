import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signToken, recordAuditLog } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/api-response';

export async function POST(req: NextRequest) {
  try {
    const { email, password, roleHint } = await req.json();

    if (!email || !password) {
      return errorResponse('Email and password are required', 400);
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase().trim() },
      include: {
        role: true,
        customer: true,
        driver: true,
      },
    });

    if (!user) {
      return errorResponse('Invalid email or password', 401);
    }

    if (user.accountStatus !== 'ACTIVE') {
      return errorResponse('Account is suspended or pending verification', 403);
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return errorResponse('Invalid email or password', 401);
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() },
    });

    const tokenPayload = {
      userId: user.id,
      email: user.email,
      role: user.role.name,
      fullName: user.fullName,
      customerId: user.customer?.id,
      driverId: user.driver?.id,
    };

    const token = signToken(tokenPayload);

    await recordAuditLog({
      actorUserId: user.id,
      action: 'LOGIN',
      entityType: 'USER',
      entityId: String(user.id),
      newValues: { email: user.email, role: user.role.name },
      ipAddress: req.headers.get('x-forwarded-for') || '127.0.0.1',
    });

    const response = successResponse(
      {
        token,
        user: {
          id: user.id,
          publicId: user.publicId,
          email: user.email,
          fullName: user.fullName,
          phone: user.phone,
          role: user.role.name,
          customer: user.customer,
          driver: user.driver,
        },
      },
      'Authentication successful'
    );

    // Set cookie for browser sessions
    response.cookies.set('route_nh_token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: any) {
    console.error('Login error:', error);
    return errorResponse(error.message || 'Authentication failed', 500);
  }
}
