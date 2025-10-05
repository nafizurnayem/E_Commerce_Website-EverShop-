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

async function debugAdminLogin() {
  try {
    await connectDB();

    const testEmail = 'admin@evershop.com';
    const testPassword = 'Admin@123';

    console.log('🔍 Debugging admin login...');
    console.log('📧 Email:', testEmail);
    console.log('🔐 Password:', testPassword);
    console.log('');

    // Find user by email (exactly as the API does)
    console.log('1️⃣ Searching for user...');
    const user = await User.findOne({ email: testEmail.toLowerCase() });
    
    if (!user) {
      console.log('❌ User not found!');
      console.log('📝 Creating new admin user...');
      
      const hashedPassword = await bcrypt.hash(testPassword, 12);
      const newAdmin = new User({
        name: 'Admin',
        email: testEmail.toLowerCase(),
        password: hashedPassword,
        role: 'admin',
        isEmailVerified: true,
        isActive: true
      });
      
      await newAdmin.save();
      console.log('✅ Admin user created!');
      return;
    }

    console.log('✅ User found!');
    console.log('👤 Name:', user.name);
    console.log('📧 Email:', user.email);
    console.log('🎭 Role:', user.role);
    console.log('🟢 Active:', user.isActive);
    console.log('📧 Email Verified:', user.isEmailVerified);
    console.log('');

    // Check if user is active (exactly as the API does)
    console.log('2️⃣ Checking if user is active...');
    if (!user.isActive) {
      console.log('❌ User is deactivated!');
      await User.findByIdAndUpdate(user._id, { isActive: true });
      console.log('✅ User activated!');
    } else {
      console.log('✅ User is active!');
    }

    // Test password verification (exactly as the API does)
    console.log('3️⃣ Testing password verification...');
    const isPasswordValid = await bcrypt.compare(testPassword, user.password);
    console.log('🔍 Password hash in DB:', user.password.substring(0, 20) + '...');
    console.log('🔍 Password comparison result:', isPasswordValid);

    if (!isPasswordValid) {
      console.log('❌ Password verification failed!');
      console.log('🔄 Updating password hash...');
      
      const newHashedPassword = await bcrypt.hash(testPassword, 12);
      await User.findByIdAndUpdate(user._id, { 
        password: newHashedPassword,
        isActive: true,
        isEmailVerified: true
      });
      
      console.log('✅ Password updated!');
      console.log('🔍 New hash:', newHashedPassword.substring(0, 20) + '...');
      
      // Test again
      const retestResult = await bcrypt.compare(testPassword, newHashedPassword);
      console.log('🔍 Retest result:', retestResult);
    } else {
      console.log('✅ Password verification successful!');
    }

    console.log('');
    console.log('🎉 Login should work now!');
    console.log('📧 Email: admin@evershop.com');
    console.log('🔐 Password: Admin@123');
    console.log('🌐 URL: http://localhost:3001/admin/login');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

debugAdminLogin();