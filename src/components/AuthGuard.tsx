'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export default function AuthGuard({ children, requireAdmin = true }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const { user } = useAuthStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check localStorage token first
        const token = localStorage.getItem('admin_token');
        console.log('🔍 AuthGuard - Token in localStorage:', !!token);

        if (!token) {
          console.log('❌ AuthGuard - No token found, redirecting to login');
          router.push('/admin/login');
          return;
        }

        // Verify token with API
        const response = await fetch('/api/auth/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token })
        });

        console.log('🔍 AuthGuard - Verify response status:', response.status);
        const data = await response.json();
        console.log('🔍 AuthGuard - Token verification result:', data);

        if (response.ok && data.valid) {
          if (requireAdmin && data.user.role !== 'admin') {
            console.log('❌ AuthGuard - User is not admin');
            localStorage.removeItem('admin_token');
            router.push('/admin/login');
            return;
          }
          
          console.log('✅ AuthGuard - Authentication successful');
          setIsAuthenticated(true);
        } else {
          console.log('❌ AuthGuard - Token invalid, redirecting to login. Error:', data.error);
          localStorage.removeItem('admin_token');
          router.push('/admin/login');
        }
      } catch (error) {
        console.error('❌ AuthGuard - Auth check failed:', error);
        localStorage.removeItem('admin_token');
        router.push('/admin/login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router, requireAdmin]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return <>{children}</>;
}