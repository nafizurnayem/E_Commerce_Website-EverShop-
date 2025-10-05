import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json({ valid: false, error: 'No token provided' });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    
    // Check if user is admin
    if (decoded.role !== 'admin') {
      return NextResponse.json({ valid: false, error: 'Not an admin user' });
    }

    return NextResponse.json({ 
      valid: true, 
      user: {
        id: decoded.userId,
        email: decoded.email,
        role: decoded.role
      }
    });
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json({ valid: false, error: 'Invalid token' });
  }
}