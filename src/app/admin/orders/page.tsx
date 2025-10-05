'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ShoppingCart,
  Search,
  Filter,
  Eye,
  Edit,
  Trash2,
  Download,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  CreditCard
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Order {
  _id: string;
  orderNumber: string;
  user: {
    _id: string;
    name: string;
    email: string;
    phone?: string;
  };
  items: {
    product: {
      _id: string;
      name: string;
      price: number;
      images: string[];
    };
    quantity: number;
    price: number;
  }[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  payment: {
    method: string;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    transactionId?: string;
  };
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  billingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
  deliveryDate?: string;
  trackingNumber?: string;
  notes?: string;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-blue-100 text-blue-800',
  processing: 'bg-purple-100 text-purple-800',
  shipped: 'bg-indigo-100 text-indigo-800',
  delivered: 'bg-green-100 text-green-800',
  cancelled: 'bg-red-100 text-red-800'
};

const paymentStatusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  refunded: 'bg-gray-100 text-gray-800'
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');
  const [dateRange, setDateRange] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchOrders();
  }, [page, statusFilter, paymentFilter, dateRange]);

  const fetchOrders = async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(statusFilter !== 'all' && { status: statusFilter }),
        ...(paymentFilter !== 'all' && { paymentStatus: paymentFilter }),
        ...(dateRange !== 'all' && { dateRange }),
        ...(searchTerm && { search: searchTerm })
      });

      const response = await fetch(`/api/admin/orders?${params}`);
      const data = await response.json();
      
      if (response.ok) {
        setOrders(data.orders || []);
        setTotalPages(data.totalPages || 1);
      } else {
        // If API doesn't exist, show demo data
        setOrders(getDemoOrders());
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders(getDemoOrders());
    } finally {
      setLoading(false);
    }
  };

  const getDemoOrders = (): Order[] => {
    return [
      {
        _id: '1',
        orderNumber: 'ORD-2024-001',
        user: {
          _id: '1',
          name: 'John Doe',
          email: 'john@example.com',
          phone: '+880123456789'
        },
        items: [
          {
            product: {
              _id: '1',
              name: 'iPhone 15 Pro',
              price: 1200,
              images: ['https://via.placeholder.com/100']
            },
            quantity: 1,
            price: 1200
          }
        ],
        total: 132000, // In BDT
        subtotal: 132000,
        tax: 0,
        shipping: 0,
        status: 'processing',
        payment: {
          method: 'Credit Card',
          status: 'completed',
          transactionId: 'TXN123456'
        },
        shippingAddress: {
          name: 'John Doe',
          street: '123 Main St',
          city: 'Dhaka',
          state: 'Dhaka',
          zipCode: '1000',
          country: 'Bangladesh'
        },
        billingAddress: {
          name: 'John Doe',
          street: '123 Main St',
          city: 'Dhaka',
          state: 'Dhaka',
          zipCode: '1000',
          country: 'Bangladesh'
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        trackingNumber: 'TRK123456789'
      },
      {
        _id: '2',
        orderNumber: 'ORD-2024-002',
        user: {
          _id: '2',
          name: 'Jane Smith',
          email: 'jane@example.com',
          phone: '+880987654321'
        },
        items: [
          {
            product: {
              _id: '2',
              name: 'MacBook Pro',
              price: 2500,
              images: ['https://via.placeholder.com/100']
            },
            quantity: 1,
            price: 2500
          }
        ],
        total: 275000, // In BDT
        subtotal: 275000,
        tax: 0,
        shipping: 0,
        status: 'delivered',
        payment: {
          method: 'Bank Transfer',
          status: 'completed',
          transactionId: 'TXN789012'
        },
        shippingAddress: {
          name: 'Jane Smith',
          street: '456 Oak Ave',
          city: 'Chittagong',
          state: 'Chittagong',
          zipCode: '4000',
          country: 'Bangladesh'
        },
        billingAddress: {
          name: 'Jane Smith',
          street: '456 Oak Ave',
          city: 'Chittagong',
          state: 'Chittagong',
          zipCode: '4000',
          country: 'Bangladesh'
        },
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        deliveryDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        trackingNumber: 'TRK987654321'
      }
    ];
  };

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        toast.success('Order status updated successfully');
        fetchOrders();
      } else {
        // Demo mode - update locally
        setOrders(orders.map(order => 
          order._id === orderId 
            ? { ...order, status: newStatus as any }
            : order
        ));
        toast.success('Order status updated (demo mode)');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Failed to update order status');
    }
  };

  const handleDelete = async (orderId: string) => {
    if (!confirm('Are you sure you want to delete this order?')) return;

    try {
      const response = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast.success('Order deleted successfully');
        fetchOrders();
      } else {
        // Demo mode - remove locally
        setOrders(orders.filter(order => order._id !== orderId));
        toast.success('Order deleted (demo mode)');
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Failed to delete order');
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-600 mt-2">Manage customer orders and fulfillment</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => window.open('/admin/orders/export', '_blank')}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Download className="h-5 w-5" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
            </div>
            <ShoppingCart className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter(o => o.status === 'pending').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Processing</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter(o => o.status === 'processing').length}
              </p>
            </div>
            <Package className="h-8 w-8 text-purple-600" />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">
                ৳{orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Payments</option>
            <option value="pending">Payment Pending</option>
            <option value="completed">Payment Completed</option>
            <option value="failed">Payment Failed</option>
            <option value="refunded">Refunded</option>
          </select>

          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>

          <button
            onClick={fetchOrders}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Filter className="h-4 w-4" />
            Filter
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                    {order.trackingNumber && (
                      <div className="text-sm text-gray-500">#{order.trackingNumber}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-500" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{order.user.name}</div>
                        <div className="text-sm text-gray-500">{order.user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {order.items.length} item{order.items.length > 1 ? 's' : ''}
                    </div>
                    <div className="text-sm text-gray-500">
                      {order.items[0]?.product.name}
                      {order.items.length > 1 && ` +${order.items.length - 1} more`}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ৳{order.total.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                      className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]} border-none focus:ring-2 focus:ring-blue-500`}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${paymentStatusColors[order.payment.status]}`}>
                      {order.payment.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedOrder(order);
                          setShowDetailsModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <Link
                        href={`/admin/orders/${order._id}/edit`}
                        className="text-green-600 hover:text-green-900"
                      >
                        <Edit className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {showDetailsModal && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Order Details - {selectedOrder.orderNumber}</h3>
              <button
                onClick={() => setShowDetailsModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Order Info */}
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Order Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Order Number:</span>
                      <span className="font-medium">{selectedOrder.orderNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${statusColors[selectedOrder.status]}`}>
                        {selectedOrder.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span>{new Date(selectedOrder.createdAt).toLocaleDateString()}</span>
                    </div>
                    {selectedOrder.trackingNumber && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tracking:</span>
                        <span className="font-medium">{selectedOrder.trackingNumber}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Customer Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Customer Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span>{selectedOrder.user.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{selectedOrder.user.email}</span>
                    </div>
                    {selectedOrder.user.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span>{selectedOrder.user.phone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Payment Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Method:</span>
                      <span>{selectedOrder.payment.method}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${paymentStatusColors[selectedOrder.payment.status]}`}>
                        {selectedOrder.payment.status}
                      </span>
                    </div>
                    {selectedOrder.payment.transactionId && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Transaction ID:</span>
                        <span className="font-medium">{selectedOrder.payment.transactionId}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Address & Items */}
              <div className="space-y-4">
                {/* Shipping Address */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Shipping Address</h4>
                  <div className="text-sm text-gray-600">
                    <div>{selectedOrder.shippingAddress.name}</div>
                    <div>{selectedOrder.shippingAddress.street}</div>
                    <div>
                      {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                    </div>
                    <div>{selectedOrder.shippingAddress.country}</div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-3">Order Items</h4>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                        <div className="flex-1">
                          <div className="font-medium text-sm">{item.product.name}</div>
                          <div className="text-xs text-gray-500">Qty: {item.quantity}</div>
                        </div>
                        <div className="text-sm font-medium">
                          ৳{(item.price * item.quantity).toLocaleString()}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal:</span>
                      <span>৳{selectedOrder.subtotal.toLocaleString()}</span>
                    </div>
                    {selectedOrder.tax > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Tax:</span>
                        <span>৳{selectedOrder.tax.toLocaleString()}</span>
                      </div>
                    )}
                    {selectedOrder.shipping > 0 && (
                      <div className="flex justify-between text-sm">
                        <span>Shipping:</span>
                        <span>৳{selectedOrder.shipping.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>৳{selectedOrder.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredOrders.length === 0 && !loading && (
        <div className="text-center py-12">
          <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || statusFilter !== 'all' || paymentFilter !== 'all' 
              ? 'No orders match your current filters.' 
              : 'No orders have been placed yet.'
            }
          </p>
        </div>
      )}
    </div>
  );
}