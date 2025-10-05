'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, Shield, Settings, Check, X } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const router = useRouter();
  const { login } = useAuthStore();

  const validatePassword = (password: string) => {
    // Simplified validation for admin login
    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear any previous errors
    if (passwordError) setPasswordError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log('🔍 Form submission:', { email: formData.email, passwordLength: formData.password.length });

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('🔍 Response status:', response.status);
      const data = await response.json();
      console.log('🔍 Response data:', data);

      if (response.ok) {
        // Check if user has admin role
        if (data.user.role !== 'admin') {
          toast.error('Access denied. Admin privileges required.');
          return;
        }

        console.log('🔍 Login successful, setting user and redirecting...');
        console.log('🔍 Received token:', data.token ? 'Yes' : 'No');
        
        // Set token in localStorage as fallback
        if (data.token) {
          localStorage.setItem('admin_token', data.token);
          console.log('🔍 Token saved to localStorage');
        }
        
        login(data.user);
        toast.success('Welcome back, Admin!');
        
        // Give a short delay to ensure cookie is set, then redirect
        setTimeout(() => {
          console.log('🔍 Redirecting to admin dashboard...');
          window.location.href = '/admin';
        }, 500);
      } else {
        toast.error(data.error || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Admin login error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white rounded-full p-3">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <h2 className="text-3xl font-bold text-white">
            Admin Portal
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Secure access to EverShop management dashboard
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="flex items-center justify-center mb-6">
            <Settings className="h-6 w-6 text-blue-600 mr-2" />
            <span className="text-xl font-semibold text-gray-900">Administration</span>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg placeholder-indigo-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                  placeholder="Enter admin email"
                />
              </div>
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-10 py-3 border-2 border-indigo-200 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg placeholder-indigo-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800"
                  placeholder="Enter admin password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
              
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Authenticating...
                </div>
              ) : (
                <>
                  <Shield className="h-5 w-5 mr-2" />
                  Access Admin Panel
                </>
              )}
            </button>
          </form>

          {/* Demo credentials info */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 font-medium mb-2">Demo Admin Credentials:</p>
            <p className="text-xs text-blue-600">Email: admin@evershop.com</p>
            <p className="text-xs text-blue-600">Password: Admin@123</p>
          </div>

          {/* Security notice */}
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              🔒 This is a secure admin area. All activities are logged.
            </p>
          </div>
        </div>

        {/* Navigation links */}
        <div className="flex justify-between text-center">
          <Link href="/" className="text-sm text-gray-300 hover:text-white">
            ← Customer Site
          </Link>
          <Link href="/auth/login" className="text-sm text-gray-300 hover:text-white">
            Customer Login →
          </Link>
        </div>
      </div>
    </div>
  );
}