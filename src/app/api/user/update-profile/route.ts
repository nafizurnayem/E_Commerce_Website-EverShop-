import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    const decoded = await verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, phone, address } = await request.json();

    // Validate required fields
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    // Validate phone number format (optional)
    if (phone && !/^[\d\s\-\+\(\)]+$/.test(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number format' },
        { status: 400 }
      );
    }

    await connectDB();

    // Update user profile
    const updateData: any = {
      name: name.trim(),
      updatedAt: new Date()
    };

    if (phone !== undefined) {
      updateData.phone = phone.trim();
    }

    // If address is provided, update the default address or create new one
    if (address && Object.keys(address).length > 0) {
      const user = await User.findById(decoded.userId);
      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      // Find existing default address or create new one
      const existingAddresses = user.addresses || [];
      const defaultAddressIndex = existingAddresses.findIndex((addr: any) => addr.isDefault);
      
      const newAddress = {
        type: address.type || 'home',
        street: address.street || '',
        city: address.city || '',
        state: address.state || '',
        postalCode: address.postalCode || '',
        country: address.country || '',
        isDefault: true
      };

      if (defaultAddressIndex >= 0) {
        // Update existing default address
        existingAddresses[defaultAddressIndex] = newAddress;
      } else {
        // Add new address as default
        existingAddresses.push(newAddress);
      }

      updateData.addresses = existingAddresses;
    }

    const updatedUser = await User.findByIdAndUpdate(
      decoded.userId,
      updateData,
      { new: true, select: '-password' }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}