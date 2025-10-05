'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BarChart3,
  Package,
  Users,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowRight,
  Settings,
  FolderOpen
} from 'lucide-react';

interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  totalRevenue: number;
  recentOrders: any[];
  topProducts: any[];
  monthlySales: any[];
  categoryStats: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/dashboard');
        const data = await response.json();
        setStats(data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    // Show basic dashboard without API data
    const fallbackStats = {
      totalProducts: 0,
      totalOrders: 0,
      totalUsers: 0,
      totalRevenue: 0,
      recentOrders: [],
      topProducts: [],
      monthlySales: [],
      categoryStats: []
    };

    return (
      <div className="p-8 space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your store.</p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/admin/settings"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
            >
              <Settings className="h-5 w-5" />
              Website Settings
            </Link>
            <Link
              href="/admin/products/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="h-5 w-5" />
              Add Product
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Total Products',
              value: '0',
              icon: <Package className="h-8 w-8 text-blue-600" />,
              change: 'Get started',
              positive: true,
              link: '/admin/products'
            },
            {
              title: 'Total Orders',
              value: '0',
              icon: <ShoppingCart className="h-8 w-8 text-green-600" />,
              change: 'No orders yet',
              positive: true,
              link: '/admin/orders'
            },
            {
              title: 'Total Users',
              value: '0',
              icon: <Users className="h-8 w-8 text-purple-600" />,
              change: 'Build audience',
              positive: true,
              link: '/admin/users'
            },
            {
              title: 'Total Revenue',
              value: '৳0',
              icon: <DollarSign className="h-8 w-8 text-yellow-600" />,
              change: 'Start selling',
              positive: true,
              link: '/admin/analytics'
            }
          ].map((card, index) => (
            <Link key={index} href={card.link} className="block">
              <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                    <div className="flex items-center mt-2">
                      <TrendingUp className="h-4 w-4 text-blue-600 mr-1" />
                      <span className="text-sm font-medium text-blue-600">
                        {card.change}
                      </span>
                    </div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    {card.icon}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Get Started */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Setup</h2>
            <div className="space-y-4">
              <Link href="/admin/categories" className="flex items-center justify-between p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <div className="flex items-center gap-3">
                  <FolderOpen className="h-8 w-8 text-blue-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Create Categories</h3>
                    <p className="text-sm text-gray-600">Organize your products</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-blue-600" />
              </Link>
              
              <Link href="/admin/products/new" className="flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <div className="flex items-center gap-3">
                  <Package className="h-8 w-8 text-green-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Add Products</h3>
                    <p className="text-sm text-gray-600">Start building your inventory</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-green-600" />
              </Link>
              
              <Link href="/admin/settings" className="flex items-center justify-between p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <div className="flex items-center gap-3">
                  <Settings className="h-8 w-8 text-purple-600" />
                  <div>
                    <h3 className="font-medium text-gray-900">Configure Website</h3>
                    <p className="text-sm text-gray-600">Customize your store settings</p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-purple-600" />
              </Link>
            </div>
          </div>

          {/* Features Overview */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Admin Features</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <BarChart3 className="h-6 w-6 text-blue-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Analytics Dashboard</h4>
                  <p className="text-sm text-gray-600">Track sales and performance</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
                <div>
                  <h4 className="font-medium text-gray-900">User Management</h4>
                  <p className="text-sm text-gray-600">Manage customers and admins</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <ShoppingCart className="h-6 w-6 text-purple-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Order Processing</h4>
                  <p className="text-sm text-gray-600">Handle orders and payments</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Settings className="h-6 w-6 text-orange-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Website Customization</h4>
                  <p className="text-sm text-gray-600">No-code website management</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts.toLocaleString(),
      icon: <Package className="h-8 w-8 text-blue-600" />,
      change: '+12%',
      positive: true
    },
    {
      title: 'Total Orders',
      value: stats.totalOrders.toLocaleString(),
      icon: <ShoppingCart className="h-8 w-8 text-green-600" />,
      change: '+8%',
      positive: true
    },
    {
      title: 'Total Users',
      value: stats.totalUsers.toLocaleString(),
      icon: <Users className="h-8 w-8 text-purple-600" />,
      change: '+15%',
      positive: true
    },
    {
      title: 'Total Revenue',
      value: `৳${(stats.totalRevenue * 110).toLocaleString()}`, // Convert USD to BDT
      icon: <DollarSign className="h-8 w-8 text-yellow-600" />,
      change: '+22%',
      positive: true
    }
  ];

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className="flex gap-4">
          <Link
            href="/admin/settings"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Settings className="h-5 w-5" />
            Website Settings
          </Link>
          <Link
            href="/admin/products/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                <div className="flex items-center mt-2">
                  {card.positive ? (
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    card.positive ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {card.change}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">vs last month</span>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
            <Link href="/admin/orders" className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {stats.recentOrders.slice(0, 5).map((order) => (
              <div key={order._id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                <div>
                  <p className="font-medium text-gray-900">Order #{order.orderNumber}</p>
                  <p className="text-gray-600 text-sm">{order.user?.name || 'Guest'}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">৳{(order.total * 110).toLocaleString()}</p>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                    order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Top Products</h2>
            <Link href="/admin/products" className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {stats.topProducts.slice(0, 5).map((product) => (
              <div key={product._id} className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-lg flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">{product.name}</p>
                  <p className="text-gray-600 text-sm">৳{(product.price * 110).toLocaleString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{product.rating.count} sales</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category Statistics */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Category Distribution</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.categoryStats.slice(0, 8).map((category) => (
            <div key={category._id} className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900">{category._id}</h3>
              <p className="text-2xl font-bold text-blue-600 mt-1">{category.count}</p>
              <p className="text-gray-600 text-sm">Avg: ৳{(category.avgPrice * 110).toFixed(0)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}