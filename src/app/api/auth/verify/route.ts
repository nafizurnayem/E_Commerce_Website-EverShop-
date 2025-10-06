import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    console.log('🔍 Auth verify - Token received:', !!token);
    console.log('🔍 Auth verify - JWT Secret exists:', !!process.env.JWT_SECRET);

    if (!token) {
      return NextResponse.json({ valid: false, error: 'No token provided' });
    }

    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET not found in environment variables');
      return NextResponse.json({ valid: false, error: 'Server configuration error' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
    console.log('🔍 Auth verify - Token decoded:', { userId: decoded.userId, role: decoded.role });
    
    // Check if user is admin
    if (decoded.role !== 'admin') {
      console.log('❌ Auth verify - User is not admin, role:', decoded.role);
      return NextResponse.json({ valid: false, error: 'Not an admin user' });
    }

    console.log('✅ Auth verify - Verification successful');
    return NextResponse.json({ 
      valid: true, 
      user: {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role
      }
    });
  } catch (error) {
    console.error('❌ Token verification error:', error);
    return NextResponse.json({ valid: false, error: 'Invalid token' });
  }
}