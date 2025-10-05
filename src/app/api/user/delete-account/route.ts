import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Order from '@/models/Order';
import { verifyToken } from '@/lib/auth';

export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    const decoded = await verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Find user
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Prevent admin from deleting their account if they're the last admin
    if (user.role === 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' });
      if (adminCount <= 1) {
        return NextResponse.json(
          { error: 'Cannot delete the last admin account' },
          { status: 400 }
        );
      }
    }

    // Check for pending orders
    const pendingOrders = await Order.countDocuments({
      user: decoded.userId,
      status: { $in: ['pending', 'processing', 'shipped'] }
    });

    if (pendingOrders > 0) {
      return NextResponse.json(
        { 
          error: `Cannot delete account with ${pendingOrders} pending order(s). Please wait for orders to be completed or contact support.` 
        },
        { status: 400 }
      );
    }

    // Anonymize user data instead of hard delete (for order history preservation)
    const deletedEmail = `deleted_${Date.now()}@example.com`;
    
    await User.findByIdAndUpdate(decoded.userId, {
      name: 'Deleted User',
      email: deletedEmail,
      password: '',
      avatar: '',
      phone: '',
      isActive: false,
      deletedAt: new Date(),
      updatedAt: new Date()
    });

    // Clear the auth cookie
    const response = NextResponse.json({
      message: 'Account deleted successfully'
    });

    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0
    });

    return response;
  } catch (error) {
    console.error('Account deletion error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}