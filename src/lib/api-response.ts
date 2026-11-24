import { NextResponse } from 'next/server';

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string | null;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export function successResponse<T>(data: T, message?: string, status = 200) {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
      error: null,
    },
    { status }
  );
}

export function paginatedResponse<T>(
  data: T[],
  total: number,
  page: number,
  limit: number,
  message?: string
) {
  return NextResponse.json({
    success: true,
    message,
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
    error: null,
  });
}

export function errorResponse(error: string, status = 400) {
  return NextResponse.json(
    {
      success: false,
      data: null,
      error,
    },
    { status }
  );
}
