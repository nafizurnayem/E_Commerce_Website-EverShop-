'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useAuthStore } from '@/store/auth';
import { 
  User, 
  Package, 
  Heart, 
  Settings, 
  LogOut, 
  Camera, 
  Eye, 
  EyeOff, 
  Lock,
  Trash2,
  Upload,
  X,
  Save,
  AlertTriangle
} from 'lucide-react';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';

// Disable SSR for this component to avoid hydration issues
const DynamicAccountPage = dynamic(() => Promise.resolve(AccountPageComponent), {
  ssr: false
});

function AccountPageComponent() {
  const { user, logout, updateUser } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlistLoading, setWishlistLoading] = useState(true);
  
  // Profile picture state
  const [profilePicture, setProfilePicture] = useState(user?.avatar || '');
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Password change state
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [changingPassword, setChangingPassword] = useState(false);
  
  // Delete account state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [deletingAccount, setDeletingAccount] = useState(false);

  // Profile editing state
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: {
      street: user?.addresses?.[0]?.street || '',
      city: user?.addresses?.[0]?.city || '',
      state: user?.addresses?.[0]?.state || '',
      postalCode: user?.addresses?.[0]?.postalCode || '',
      country: user?.addresses?.[0]?.country || ''
    }
  });
  const [updatingProfile, setUpdatingProfile] = useState(false);

  useEffect(() => {
    fetchOrders();
    fetchWishlist();
    
    // Auto-refresh every 30 seconds when on orders or wishlist tab
    const interval = setInterval(() => {
      if (activeTab === 'orders') {
        fetchOrders();
      } else if (activeTab === 'wishlist') {
        fetchWishlist();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [activeTab]);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        phone: user.phone || '',
        address: {
          street: user.addresses?.[0]?.street || '',
          city: user.addresses?.[0]?.city || '',
          state: user.addresses?.[0]?.state || '',
          postalCode: user.addresses?.[0]?.postalCode || '',
          country: user.addresses?.[0]?.country || ''
        }
      });
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/orders');
      if (response.ok) {
        const data = await response.json();
        setOrders(data);
      }
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlist = async () => {
    try {
      setWishlistLoading(true);
      const response = await fetch('/api/wishlist');
      if (response.ok) {
        const data = await response.json();
        setWishlist(data.wishlist || []);
      }
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
      toast.error('Failed to load wishlist');
    } finally {
      setWishlistLoading(false);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      const response = await fetch(`/api/wishlist?productId=${productId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        const data = await response.json();
        setWishlist(data.wishlist || []);
        toast.success('Product removed from wishlist');
      } else {
        throw new Error('Failed to remove from wishlist');
      }
    } catch (error) {
      console.error('Remove from wishlist error:', error);
      toast.error('Failed to remove from wishlist');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
      });

      if (response.ok) {
        logout();
        toast.success('Logged out successfully');
        window.location.href = '/';
      } else {
        toast.error('Failed to logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  // Profile picture upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setUploadingImage(true);

    try {
      // Create form data
      const formData = new FormData();
      formData.append('image', file);
      formData.append('userId', user!._id);

      // Upload image (simulate API call for now)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real app, upload to cloud storage:
      // const response = await fetch('/api/user/upload-avatar', {
      //   method: 'POST',
      //   body: formData
      // });
      
      // For demo, create a mock URL
      const mockImageUrl = `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face`;
      
      setProfilePicture(mockImageUrl);
      updateUser({ avatar: mockImageUrl });
      
      toast.success('Profile picture updated successfully!');
    } catch (error) {
      console.error('Image upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploadingImage(false);
    }
  };

  // Remove profile picture
  const handleRemoveImage = async () => {
    try {
      setProfilePicture('');
      updateUser({ avatar: '' });
      toast.success('Profile picture removed');
    } catch (error) {
      toast.error('Failed to remove profile picture');
    }
  };

  // Password change handler
  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      toast.error('New password must be at least 6 characters long');
      return;
    }

    setChangingPassword(true);

    try {
      const response = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword
        })
      });

      if (response.ok) {
        toast.success('Password changed successfully!');
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
        setShowPasswordForm(false);
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to change password');
      }
    } catch (error) {
      console.error('Password change error:', error);
      toast.error('Failed to change password');
    } finally {
      setChangingPassword(false);
    }
  };

  // Profile update handler
  const handleUpdateProfile = async () => {
    if (!profileForm.name.trim()) {
      toast.error('Name is required');
      return;
    }

    setUpdatingProfile(true);

    try {
      const response = await fetch('/api/user/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profileForm)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Profile updated successfully');
        updateUser(data.user);
        setEditingProfile(false);
      } else {
        toast.error(data.error || 'Failed to update profile');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error('Failed to update profile');
    } finally {
      setUpdatingProfile(false);
    }
  };

  const handleCancelEdit = () => {
    setProfileForm({
      name: user?.name || '',
      phone: user?.phone || '',
      address: {
        street: user?.addresses?.[0]?.street || '',
        city: user?.addresses?.[0]?.city || '',
        state: user?.addresses?.[0]?.state || '',
        postalCode: user?.addresses?.[0]?.postalCode || '',
        country: user?.addresses?.[0]?.country || ''
      }
    });
    setEditingProfile(false);
  };

  // Delete account handler
  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== 'DELETE') {
      toast.error('Please type "DELETE" to confirm account deletion');
      return;
    }

    setDeletingAccount(true);

    try {
      const response = await fetch('/api/user/delete-account', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        toast.success('Account deleted successfully');
        logout();
        window.location.href = '/';
      } else {
        const data = await response.json();
        toast.error(data.error || 'Failed to delete account');
      }
    } catch (error) {
      console.error('Account deletion error:', error);
      toast.error('Failed to delete account');
    } finally {
      setDeletingAccount(false);
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'orders', name: 'Orders', icon: Package },
    { id: 'wishlist', name: 'Wishlist', icon: Heart },
    { id: 'settings', name: 'Settings', icon: Settings },
  ];

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-8">Please log in to access your account.</p>
          <a
            href="/auth/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="md:w-64 bg-gray-50 rounded-l-lg p-6">
              <div className="flex flex-col items-center space-y-4 mb-8">
                {/* Profile Picture */}
                <div className="relative group">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
                    {profilePicture ? (
                      <Image
                        src={profilePicture}
                        alt="Profile picture"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-blue-600 flex items-center justify-center">
                        <User className="h-10 w-10 text-white" />
                      </div>
                    )}
                  </div>
                  
                  {/* Upload button overlay */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingImage}
                    className="absolute inset-0 rounded-full bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    {uploadingImage ? (
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    ) : (
                      <Camera className="h-6 w-6 text-white" />
                    )}
                  </button>
                  
                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
                
                {/* Profile info */}
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  
                  {/* Profile picture actions */}
                  {profilePicture && (
                    <button
                      onClick={handleRemoveImage}
                      className="mt-2 text-xs text-red-600 hover:text-red-700"
                    >
                      Remove Photo
                    </button>
                  )}
                </div>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{tab.name}</span>
                    </button>
                  );
                })}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6">
              {activeTab === 'profile' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Profile Information</h2>
                    {!editingProfile && (
                      <button
                        onClick={() => setEditingProfile(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>

                  {editingProfile ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={profileForm.name}
                            onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your full name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            value={profileForm.phone}
                            onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your phone number"
                          />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Street Address
                            </label>
                            <input
                              type="text"
                              value={profileForm.address.street}
                              onChange={(e) => setProfileForm(prev => ({
                                ...prev,
                                address: { ...prev.address, street: e.target.value }
                              }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Enter street address"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              City
                            </label>
                            <input
                              type="text"
                              value={profileForm.address.city}
                              onChange={(e) => setProfileForm(prev => ({
                                ...prev,
                                address: { ...prev.address, city: e.target.value }
                              }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Enter city"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              State/Division
                            </label>
                            <input
                              type="text"
                              value={profileForm.address.state}
                              onChange={(e) => setProfileForm(prev => ({
                                ...prev,
                                address: { ...prev.address, state: e.target.value }
                              }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Enter state or division"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Postal Code
                            </label>
                            <input
                              type="text"
                              value={profileForm.address.postalCode}
                              onChange={(e) => setProfileForm(prev => ({
                                ...prev,
                                address: { ...prev.address, postalCode: e.target.value }
                              }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Enter postal code"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Country
                            </label>
                            <input
                              type="text"
                              value={profileForm.address.country}
                              onChange={(e) => setProfileForm(prev => ({
                                ...prev,
                                address: { ...prev.address, country: e.target.value }
                              }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="Enter country"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-4">
                        <button
                          onClick={handleUpdateProfile}
                          disabled={updatingProfile}
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {updatingProfile ? 'Updating...' : 'Save Changes'}
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          disabled={updatingProfile}
                          className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={user.name}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            value={user.email}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            value={user.phone || 'Not provided'}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Member Since
                          </label>
                          <input
                            type="text"
                            value={new Date(user.createdAt || Date.now()).toLocaleDateString()}
                            disabled
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                          />
                        </div>
                      </div>

                      {/* Address Information Section */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Address Information</h3>
                        {user.addresses && user.addresses.length > 0 ? (
                          <div className="space-y-4">
                            {user.addresses.map((address: any, index: number) => (
                              <div key={index} className="border rounded-lg p-4 bg-gray-50">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Street Address
                                    </label>
                                    <p className="text-gray-900">{address.street || 'Not provided'}</p>
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      City
                                    </label>
                                    <p className="text-gray-900">{address.city || 'Not provided'}</p>
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      State/Division
                                    </label>
                                    <p className="text-gray-900">{address.state || 'Not provided'}</p>
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Postal Code
                                    </label>
                                    <p className="text-gray-900">{address.postalCode || 'Not provided'}</p>
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Country
                                    </label>
                                    <p className="text-gray-900">{address.country || 'Not provided'}</p>
                                  </div>
                                  <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                      Address Type
                                    </label>
                                    <div className="flex items-center space-x-2">
                                      <p className="text-gray-900 capitalize">{address.type || 'home'}</p>
                                      {address.isDefault && (
                                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                          Default
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="border rounded-lg p-6 bg-gray-50 text-center">
                            <div className="text-gray-400 mb-2">
                              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                            <p className="text-gray-600 mb-2">No address information provided</p>
                            <p className="text-sm text-gray-500">Click "Edit Profile" to add your address</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'orders' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Order History</h2>
                    <button
                      onClick={fetchOrders}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Refresh
                    </button>
                  </div>
                  {loading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="mt-2 text-gray-600">Loading orders...</p>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-8">
                      <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No orders found.</p>
                      <a
                        href="/products"
                        className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Start Shopping
                      </a>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order: any) => (
                        <div key={order._id} className="border rounded-lg p-6 bg-white shadow-sm">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="font-semibold text-lg">Order #{order.orderNumber || order._id.slice(-8)}</h3>
                              <p className="text-gray-600 text-sm">
                                Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })}
                              </p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </span>
                          </div>
                          
                          {order.items && order.items.length > 0 && (
                            <div className="mb-4">
                              <h4 className="font-medium text-gray-900 mb-2">Items ({order.items.length})</h4>
                              <div className="space-y-2">
                                {order.items.slice(0, 3).map((item: any, index: number) => (
                                  <div key={index} className="flex items-center space-x-3 text-sm">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                    <span className="text-gray-700">
                                      {item.product?.name || item.productId} × {item.quantity}
                                    </span>
                                    <span className="text-gray-600">
                                      ৳{((item.price || 0) * 110).toLocaleString()}
                                    </span>
                                  </div>
                                ))}
                                {order.items.length > 3 && (
                                  <p className="text-sm text-gray-500 ml-5">
                                    +{order.items.length - 3} more items
                                  </p>
                                )}
                              </div>
                            </div>
                          )}
                          
                          <div className="flex justify-between items-center pt-4 border-t">
                            <div className="text-sm text-gray-600">
                              {order.shippingAddress && (
                                <p>Shipping to: {order.shippingAddress.city}, {order.shippingAddress.state}</p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-semibold text-gray-900">
                                ৳{((order.total || order.totalAmount || 0) * 110).toLocaleString()}
                              </p>
                              <p className="text-sm text-gray-600">Total Amount</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Wishlist</h2>
                    <button
                      onClick={fetchWishlist}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Refresh
                    </button>
                  </div>
                  {wishlistLoading ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
                      <p className="mt-2 text-gray-600">Loading wishlist...</p>
                    </div>
                  ) : wishlist.length === 0 ? (
                    <div className="text-center py-8">
                      <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Your wishlist is empty.</p>
                      <a
                        href="/products"
                        className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Browse Products
                      </a>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {wishlist.map((product: any) => (
                        <div key={product._id} className="border rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition-shadow">
                          <div className="relative mb-4">
                            {product.images && product.images.length > 0 ? (
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                width={200}
                                height={200}
                                className="w-full h-48 object-cover rounded-lg"
                              />
                            ) : (
                              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                                <Package className="h-12 w-12 text-gray-400" />
                              </div>
                            )}
                            <button
                              onClick={() => removeFromWishlist(product._id)}
                              className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
                            >
                              <Heart className="h-5 w-5 text-red-500 fill-current" />
                            </button>
                          </div>
                          
                          <div className="space-y-2">
                            <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                            <p className="text-sm text-gray-600 capitalize">{product.category}</p>
                            
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                {product.discountPercentage > 0 ? (
                                  <>
                                    <span className="text-lg font-bold text-gray-900">
                                      ৳{((product.price * (1 - product.discountPercentage / 100)) * 110).toLocaleString()}
                                    </span>
                                    <span className="text-sm text-gray-500 line-through">
                                      ৳{(product.price * 110).toLocaleString()}
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-lg font-bold text-gray-900">
                                    ৳{(product.price * 110).toLocaleString()}
                                  </span>
                                )}
                              </div>
                              
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                              }`}>
                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                              </span>
                            </div>
                            
                            <div className="flex space-x-2 mt-4">
                              <a
                                href={`/products/${product._id}`}
                                className="flex-1 bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                              >
                                View Product
                              </a>
                              <button
                                onClick={() => removeFromWishlist(product._id)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h2>
                  <div className="space-y-6">
                    {/* Password Section */}
                    <div className="border rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">Password</h3>
                          <p className="text-gray-600 text-sm">
                            Update your password to keep your account secure.
                          </p>
                        </div>
                        <button
                          onClick={() => setShowPasswordForm(!showPasswordForm)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                          <Lock className="h-4 w-4" />
                          Change Password
                        </button>
                      </div>

                      {/* Password Change Form */}
                      {showPasswordForm && (
                        <form onSubmit={handlePasswordChange} className="mt-6 space-y-4 border-t pt-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Current Password
                            </label>
                            <div className="relative">
                              <input
                                type={showPasswords.current ? 'text' : 'password'}
                                value={passwordForm.currentPassword}
                                onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                              />
                              <button
                                type="button"
                                onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              New Password
                            </label>
                            <div className="relative">
                              <input
                                type={showPasswords.new ? 'text' : 'password'}
                                value={passwordForm.newPassword}
                                onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                minLength={6}
                                required
                              />
                              <button
                                type="button"
                                onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Confirm New Password
                            </label>
                            <div className="relative">
                              <input
                                type={showPasswords.confirm ? 'text' : 'password'}
                                value={passwordForm.confirmPassword}
                                onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                required
                              />
                              <button
                                type="button"
                                onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                              >
                                {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              </button>
                            </div>
                          </div>

                          <div className="flex gap-3">
                            <button
                              type="submit"
                              disabled={changingPassword}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                            >
                              {changingPassword ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                  Changing...
                                </>
                              ) : (
                                <>
                                  <Save className="h-4 w-4" />
                                  Save Password
                                </>
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setShowPasswordForm(false);
                                setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
                              }}
                              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </form>
                      )}
                    </div>

                    {/* Profile Picture Section */}
                    <div className="border rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Profile Picture</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Upload a profile picture to personalize your account.
                      </p>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                          {profilePicture ? (
                            <Image
                              src={profilePicture}
                              alt="Profile picture"
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-blue-600 flex items-center justify-center">
                              <User className="h-8 w-8 text-white" />
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadingImage}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                          >
                            {uploadingImage ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Uploading...
                              </>
                            ) : (
                              <>
                                <Upload className="h-4 w-4" />
                                Upload Photo
                              </>
                            )}
                          </button>
                          {profilePicture && (
                            <button
                              onClick={handleRemoveImage}
                              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                            >
                              <X className="h-4 w-4" />
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Recommended: Square image, at least 200x200 pixels. Max file size: 5MB.
                      </p>
                    </div>

                    {/* Email Notifications */}
                    <div className="border rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Notifications</h3>
                      <p className="text-gray-600 text-sm mb-4">
                        Manage your email notification preferences.
                      </p>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3 rounded" defaultChecked />
                          <span className="text-sm">Order updates and shipping notifications</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3 rounded" defaultChecked />
                          <span className="text-sm">Promotional emails and special offers</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3 rounded" />
                          <span className="text-sm">Newsletter and product updates</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3 rounded" />
                          <span className="text-sm">Security alerts and account activity</span>
                        </label>
                      </div>
                    </div>

                    {/* Danger Zone - Delete Account */}
                    <div className="border border-red-200 rounded-lg p-6 bg-red-50">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-red-900 mb-2">Danger Zone</h3>
                          <p className="text-red-700 text-sm mb-4">
                            Once you delete your account, there is no going back. Please be certain.
                          </p>
                          <button
                            onClick={() => setShowDeleteConfirm(!showDeleteConfirm)}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete Account
                          </button>
                        </div>
                      </div>

                      {/* Delete Confirmation */}
                      {showDeleteConfirm && (
                        <div className="mt-6 pt-6 border-t border-red-200">
                          <div className="bg-white rounded-lg p-4 border border-red-200">
                            <h4 className="font-semibold text-red-900 mb-3">Confirm Account Deletion</h4>
                            <p className="text-sm text-red-700 mb-4">
                              This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                            </p>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-red-700 mb-2">
                                  Type <strong>DELETE</strong> to confirm:
                                </label>
                                <input
                                  type="text"
                                  value={deleteConfirmText}
                                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                                  className="w-full px-3 py-2 border border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                                  placeholder="DELETE"
                                />
                              </div>
                              <div className="flex gap-3">
                                <button
                                  onClick={handleDeleteAccount}
                                  disabled={deletingAccount || deleteConfirmText !== 'DELETE'}
                                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {deletingAccount ? (
                                    <>
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                      Deleting...
                                    </>
                                  ) : (
                                    <>
                                      <Trash2 className="h-4 w-4" />
                                      Delete My Account
                                    </>
                                  )}
                                </button>
                                <button
                                  onClick={() => {
                                    setShowDeleteConfirm(false);
                                    setDeleteConfirmText('');
                                  }}
                                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AccountPage() {
  return <DynamicAccountPage />;
}