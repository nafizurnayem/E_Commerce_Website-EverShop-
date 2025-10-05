const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String,
  isActive: Boolean,
  emailVerified: Boolean
});

const User = mongoose.model('User', userSchema);

async function updateAdminPassword() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/evershop-ecommerce');
    console.log('Connected to MongoDB');

    // Hash the new password
    const newPassword = 'Admin@123';
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update or create admin user
    const adminEmail = 'admin@evershop.com';
    
    const result = await User.findOneAndUpdate(
      { email: adminEmail },
      {
        name: 'Admin User',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
        isActive: true,
        emailVerified: true
      },
      { 
        upsert: true, // Create if doesn't exist
        new: true 
      }
    );

    console.log('Admin password updated successfully');
    console.log('Admin Email:', result.email);
    console.log('Admin Role:', result.role);
    console.log('New Password: Admin@123');

  } catch (error) {
    console.error('Error updating admin password:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

updateAdminPassword();