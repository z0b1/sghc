import { createToken } from '../../../lib/auth';
import { NextRequest, NextResponse } from 'next/server';

// Default admin password - CHANGE THIS IN PRODUCTION!
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'hackclub2026';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    // Validate password
    if (!password || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = await createToken({
      adminId: 'admin',
      email: 'admin@hackclub.local',
    });

    return NextResponse.json({
      token,
      success: true,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
