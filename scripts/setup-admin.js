import bcrypt from 'bcryptjs';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

async function createAdminUser() {
  try {
    await connectDB();

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.email);
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const adminUser = new User({
      name: 'Admin',
      email: 'admin@evershop.com',
      password: hashedPassword,
      role: 'admin',
    });

    await adminUser.save();
    console.log('Admin user created successfully!');
    console.log('Email: admin@evershop.com');
    console.log('Password: admin123');
    console.log('Please change the password after first login.');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
}

createAdminUser();