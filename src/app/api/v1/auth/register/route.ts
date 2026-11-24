import { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signToken, recordAuditLog } from '@/lib/auth';
import { errorResponse, successResponse } from '@/lib/api-response';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fullName, email, phone, password, companyName, gstin, pan, customerType } = body;

    if (!fullName || !email || !phone || !password) {
      return errorResponse('Full name, email, phone, and password are required', 400);
    }

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: email.toLowerCase().trim() }, { phone: phone.trim() }],
      },
    });

    if (existingUser) {
      return errorResponse('An account with this email or phone number already exists', 409);
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const customerCode = `CUST-${Date.now().toString().slice(-6)}`;

    // Create user and customer in transaction
    const newUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          fullName,
          email: email.toLowerCase().trim(),
          phone: phone.trim(),
          passwordHash,
          roleId: 4, // CUSTOMER role
          accountStatus: 'ACTIVE',
        },
      });

      const customer = await tx.customer.create({
        data: {
          userId: user.id,
          customerCode,
          customerType: customerType || (companyName ? 'BUSINESS' : 'INDIVIDUAL'),
          companyName: companyName || null,
          gstin: gstin || null,
          pan: pan || null,
          billingEmail: email.toLowerCase().trim(),
          billingPhone: phone.trim(),
          verificationStatus: 'VERIFIED',
          accountStatus: 'ACTIVE',
        },
      });

      return { user, customer };
    });

    await recordAuditLog({
      actorUserId: newUser.user.id,
      action: 'REGISTER_CUSTOMER',
      entityType: 'CUSTOMER',
      entityId: String(newUser.customer.id),
      newValues: { email, phone, customerCode },
    });

    const token = signToken({
      userId: newUser.user.id,
      email: newUser.user.email,
      role: 'CUSTOMER',
      fullName: newUser.user.fullName,
      customerId: newUser.customer.id,
    });

    const response = successResponse(
      {
        token,
        user: {
          id: newUser.user.id,
          email: newUser.user.email,
          fullName: newUser.user.fullName,
          role: 'CUSTOMER',
          customer: newUser.customer,
        },
      },
      'Registration successful',
      201
    );

    response.cookies.set('route_nh_token', token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    console.error('Registration error:', error);
    return errorResponse(error.message || 'Registration failed', 500);
  }
}
