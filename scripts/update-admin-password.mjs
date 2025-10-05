import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/evershop');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer'
  },
  avatar: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  address: {
    street: { type: String, default: '' },
    city: { type: String, default: '' },
    state: { type: String, default: '' },
    zipCode: { type: String, default: '' },
    country: { type: String, default: '' }
  },
  isEmailVerified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

async function updateAdminPassword() {
  try {
    await connectDB();

    // New secure password that meets all criteria
    const newPassword = 'Admin@123';
    
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    // Update admin user
    const result = await User.findOneAndUpdate(
      { email: 'admin@evershop.com' },
      { 
        password: hashedPassword,
        isActive: true,
        isEmailVerified: true
      },
      { new: true }
    );

    if (result) {
      console.log('✅ Admin password updated successfully!');
      console.log('📧 Email: admin@evershop.com');
      console.log('🔐 New Password: Admin@123');
      console.log('🌐 Admin URL: http://localhost:3001/admin');
      console.log('');
      console.log('Password meets all requirements:');
      console.log('✓ At least 8 characters');
      console.log('✓ Contains uppercase letter (A)');
      console.log('✓ Contains lowercase letters (dmin)');
      console.log('✓ Contains number (123)');
      console.log('✓ Contains special character (@)');
    } else {
      console.log('❌ Admin user not found!');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating admin password:', error);
    process.exit(1);
  }
}

updateAdminPassword();