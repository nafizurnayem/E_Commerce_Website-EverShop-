'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, ShoppingBag, Check, X } from 'lucide-react';
import { useAuthStore } from '@/store/auth';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordCriteria, setPasswordCriteria] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const router = useRouter();
  const { login } = useAuthStore();

  const validatePassword = (password: string) => {
    const criteria = {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };

    setPasswordCriteria(criteria);

    if (!criteria.minLength) return 'Password must be at least 8 characters long';
    if (!criteria.hasUpperCase) return 'Password must contain at least one uppercase letter';
    if (!criteria.hasLowerCase) return 'Password must contain at least one lowercase letter';
    if (!criteria.hasNumber) return 'Password must contain at least one number';
    if (!criteria.hasSpecialChar) return 'Password must contain at least one special character';
    
    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Real-time password validation
    if (name === 'password') {
      validatePassword(value);
      if (passwordError) setPasswordError('');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        login(data.user);
        toast.success('Login successful!');
        router.push('/');
      } else {
        toast.error(data.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    
    // Check if all required fields are filled
    if (!formData.name.trim()) {
      toast.error('Name is required');
      return;
    }
    
    if (!formData.email.trim()) {
      toast.error('Email is required');
      return;
    }
    
    if (!formData.password) {
      toast.error('Password is required');
      return;
    }
    
    if (!formData.confirmPassword) {
      toast.error('Please confirm your password');
      return;
    }
    
    // Validate password
    const passwordValidationError = validatePassword(formData.password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      console.log('Submitting registration data:', {
        name: formData.name,
        email: formData.email,
        password: '***',
        confirmPassword: '***'
      });
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const data = await response.json();
      console.log('Registration response:', { status: response.status, data });

      if (response.ok) {
        login(data.user);
        toast.success('Account created successfully!');
        router.push('/');
      } else {
        toast.error(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = isLogin ? handleLogin : handleRegister;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center mb-6">
            <ShoppingBag className="h-12 w-12 text-blue-600" />
            <span className="ml-2 text-3xl font-bold text-gray-900">EverShop</span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setPasswordError('');
                setFormData({
                  name: '',
                  email: '',
                  password: '',
                  confirmPassword: ''
                });
              }}
              className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>

        {/* Form */}
        <div className="mt-8 space-y-6">
          <div className="bg-white py-8 px-6 shadow-xl rounded-xl">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Name field - only for registration */}
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-3 py-3 border-2 rounded-lg focus:ring-2 bg-gradient-to-r from-purple-50 to-blue-50 text-gray-800 placeholder-purple-400 ${
                        formData.name.trim() 
                          ? 'border-green-300 focus:border-green-500 focus:ring-green-500' 
                          : 'border-purple-200 focus:border-purple-500 focus:ring-purple-500'
                      }`}
                      placeholder="Enter your full name"
                      required
                    />
                    {formData.name.trim() && (
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <Check className="h-5 w-5 text-green-500" />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-3 py-3 border-2 rounded-lg focus:ring-2 bg-gradient-to-r from-purple-50 to-blue-50 text-gray-800 placeholder-purple-400 ${
                      formData.email.trim() && formData.email.includes('@') 
                        ? 'border-green-300 focus:border-green-500 focus:ring-green-500' 
                        : 'border-purple-200 focus:border-purple-500 focus:ring-purple-500'
                    }`}
                    placeholder="Enter your email"
                    required
                  />
                  {formData.email.trim() && formData.email.includes('@') && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                  )}
                </div>
              </div>

              {/* Password field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`block w-full pl-10 pr-10 py-3 border-2 rounded-lg focus:ring-2 bg-gradient-to-r from-purple-50 to-blue-50 text-gray-800 placeholder-purple-400 ${
                      passwordError 
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                        : formData.password && Object.values(passwordCriteria).every(Boolean)
                        ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
                        : 'border-purple-200 focus:border-purple-500 focus:ring-purple-500'
                    }`}
                    placeholder="Enter your password"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 pr-10 flex items-center pointer-events-none">
                    {!passwordError && formData.password && Object.values(passwordCriteria).every(Boolean) && (
                      <Check className="h-5 w-5 text-green-500" />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                )}
                {!isLogin && (
                  <div className="mt-3 p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200">
                    <p className="font-medium text-purple-800 mb-3">Password Requirements:</p>
                    <div className="space-y-2">
                      <div className={`flex items-center space-x-2 text-sm ${
                        passwordCriteria.minLength ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {passwordCriteria.minLength ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                        <span>At least 8 characters</span>
                      </div>
                      <div className={`flex items-center space-x-2 text-sm ${
                        passwordCriteria.hasUpperCase ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {passwordCriteria.hasUpperCase ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                        <span>One uppercase letter (A-Z)</span>
                      </div>
                      <div className={`flex items-center space-x-2 text-sm ${
                        passwordCriteria.hasLowerCase ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {passwordCriteria.hasLowerCase ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                        <span>One lowercase letter (a-z)</span>
                      </div>
                      <div className={`flex items-center space-x-2 text-sm ${
                        passwordCriteria.hasNumber ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {passwordCriteria.hasNumber ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                        <span>One number (0-9)</span>
                      </div>
                      <div className={`flex items-center space-x-2 text-sm ${
                        passwordCriteria.hasSpecialChar ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {passwordCriteria.hasSpecialChar ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                        <span>One special character (!@#$%^&*)</span>
                      </div>
                    </div>
                    {/* Overall Status */}
                    <div className="mt-3 pt-3 border-t border-purple-200">
                      <div className={`flex items-center space-x-2 text-sm font-medium ${
                        Object.values(passwordCriteria).every(Boolean) ? 'text-green-600' : 'text-purple-600'
                      }`}>
                        {Object.values(passwordCriteria).every(Boolean) ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <X className="h-4 w-4" />
                        )}
                        <span>Password strength: {Object.values(passwordCriteria).every(Boolean) ? 'Strong' : 'Weak'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password field - only for registration */}
              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={`block w-full pl-10 pr-10 py-3 border-2 rounded-lg focus:ring-2 bg-gradient-to-r from-purple-50 to-blue-50 text-gray-800 placeholder-purple-400 ${
                        formData.confirmPassword && formData.password === formData.confirmPassword
                          ? 'border-green-300 focus:border-green-500 focus:ring-green-500'
                          : formData.confirmPassword && formData.password !== formData.confirmPassword
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                          : 'border-purple-200 focus:border-purple-500 focus:ring-purple-500'
                      }`}
                      placeholder="Confirm your password"
                      required
                    />
                    <div className="absolute inset-y-0 right-0 pr-10 flex items-center pointer-events-none">
                      {formData.confirmPassword && formData.password === formData.confirmPassword && (
                        <Check className="h-5 w-5 text-green-500" />
                      )}
                      {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                        <X className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">Passwords do not match</p>
                  )}
                </div>
              )}

              {/* Submit button */}
              <div>
                {!isLogin && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Form Status:</p>
                    <div className="space-y-1 text-xs">
                      <div className={`flex items-center space-x-2 ${formData.name.trim() ? 'text-green-600' : 'text-gray-400'}`}>
                        {formData.name.trim() ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        <span>Name: {formData.name.trim() ? 'Filled' : 'Empty'}</span>
                      </div>
                      <div className={`flex items-center space-x-2 ${formData.email.trim() ? 'text-green-600' : 'text-gray-400'}`}>
                        {formData.email.trim() ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        <span>Email: {formData.email.trim() ? 'Filled' : 'Empty'}</span>
                      </div>
                      <div className={`flex items-center space-x-2 ${formData.password ? 'text-green-600' : 'text-gray-400'}`}>
                        {formData.password ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        <span>Password: {formData.password ? 'Filled' : 'Empty'}</span>
                      </div>
                      <div className={`flex items-center space-x-2 ${formData.confirmPassword ? 'text-green-600' : 'text-gray-400'}`}>
                        {formData.confirmPassword ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        <span>Confirm Password: {formData.confirmPassword ? 'Filled' : 'Empty'}</span>
                      </div>
                    </div>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    isLogin ? 'Sign In' : 'Create Account'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}