const mongoose = require('mongoose');

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

async function deleteAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect('mongodb://localhost:27017/evershop-ecommerce');
    console.log('Connected to MongoDB');

    // Delete existing admin user
    const result = await User.deleteOne({ email: 'admin@evershop.com' });
    
    if (result.deletedCount > 0) {
      console.log('Existing admin user deleted successfully');
    } else {
      console.log('No existing admin user found');
    }

  } catch (error) {
    console.error('Error deleting admin user:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

deleteAdminUser();