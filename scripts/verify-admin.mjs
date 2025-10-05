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

// User Schema (same as in the app)
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

async function verifyAdminUser() {
  try {
    await connectDB();

    // Find admin user
    const admin = await User.findOne({ email: 'admin@evershop.com' });
    
    if (!admin) {
      console.log('❌ Admin user not found!');
      console.log('Creating admin user...');
      
      // Create admin user
      const hashedPassword = await bcrypt.hash('admin123', 12);
      const adminUser = new User({
        name: 'Admin',
        email: 'admin@evershop.com',
        password: hashedPassword,
        role: 'admin',
        isEmailVerified: true,
        isActive: true
      });

      await adminUser.save();
      console.log('✅ Admin user created successfully!');
    } else {
      console.log('✅ Admin user found:');
      console.log('📧 Email:', admin.email);
      console.log('👤 Name:', admin.name);
      console.log('🔐 Role:', admin.role);
      console.log('✓ Is Active:', admin.isActive);
      console.log('✓ Email Verified:', admin.isEmailVerified);
      
      // Test password verification
      const testPassword = 'admin123';
      const isPasswordValid = await bcrypt.compare(testPassword, admin.password);
      console.log('🔍 Password verification result:', isPasswordValid ? '✅ Valid' : '❌ Invalid');
      
      if (!isPasswordValid) {
        console.log('🔄 Updating password to admin123...');
        const newHashedPassword = await bcrypt.hash('admin123', 12);
        await User.findByIdAndUpdate(admin._id, { 
          password: newHashedPassword,
          isActive: true,
          isEmailVerified: true
        });
        console.log('✅ Password updated successfully!');
      }
    }

    console.log('\n📋 Login Information:');
    console.log('📧 Email: admin@evershop.com');
    console.log('🔐 Password: admin123');
    console.log('🌐 Admin URL: http://localhost:3001/admin');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

verifyAdminUser();