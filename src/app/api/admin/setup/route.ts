import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';

export async function POST() {
  try {
    await connectDB();
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ 
      email: process.env.ADMIN_EMAIL || 'admin@evershop.com' 
    });
    
    if (existingAdmin) {
      return NextResponse.json({
        message: 'Admin user already exists'
      });
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD || 'admin123', 
      12
    );

    const adminUser = new User({
      name: 'Admin User',
      email: process.env.ADMIN_EMAIL || 'admin@evershop.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      emailVerified: true
    });

    await adminUser.save();

    return NextResponse.json({
      message: 'Admin user created successfully',
      admin: {
        email: adminUser.email,
        role: adminUser.role
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating admin user:', error);
    return NextResponse.json(
      { error: 'Failed to create admin user' },
      { status: 500 }
    );
  }
}