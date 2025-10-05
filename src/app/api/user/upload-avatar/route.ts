import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { verifyToken } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    const decoded = await verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get form data
    const formData = await request.formData();
    const image = formData.get('image') as File;
    
    if (!image) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Validate file type
    if (!image.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    // Validate file size (5MB max)
    if (image.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File size too large' }, { status: 400 });
    }

    await connectDB();

    // In a real application, you would upload to cloud storage like Cloudinary, AWS S3, etc.
    // For this demo, we'll simulate the upload and return a mock URL
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock uploaded image URL (in real app, this would be the actual upload result)
    const avatarUrl = `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face&t=${Date.now()}`;
    
    // Update user avatar in database
    const user = await User.findByIdAndUpdate(
      decoded.userId,
      { 
        avatar: avatarUrl,
        updatedAt: new Date()
      },
      { new: true }
    ).select('-password');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Avatar uploaded successfully',
      avatarUrl,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Avatar upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    const decoded = await verifyToken(token);
    
    if (!decoded) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    // Remove avatar from user
    const user = await User.findByIdAndUpdate(
      decoded.userId,
      { 
        avatar: '',
        updatedAt: new Date()
      },
      { new: true }
    ).select('-password');

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Avatar removed successfully',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Avatar removal error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}