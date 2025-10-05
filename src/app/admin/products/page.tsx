'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Package,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal,
  Upload,
  Download,
  AlertCircle,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  Star,
  DollarSign,
  Cpu,
  Zap,
  Wifi,
  Grid,
  CircuitBoard
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  rating?: number;
  reviews?: number;
  specifications: { name: string; value: string; }[];
  features: string[];
  compatibility: string[];
  createdAt: string;
  updatedAt: string;
  status: 'active' | 'inactive' | 'out-of-stock';
  sku: string;
  manufacturer: string;
  weight?: number;
  dimensions?: string;
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [showBulkEditModal, setShowBulkEditModal] = useState(false);

  // Sample electronics components data
  useEffect(() => {
    const sampleProducts: Product[] = [
      {
        _id: '1',
        name: 'ESP32 Development Board',
        description: 'A powerful, low-cost microcontroller with built-in WiFi and Bluetooth capabilities. Perfect for IoT projects.',
        price: 12.99,
        images: ['https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400'],
        category: 'microcontrollers',
        stock: 45,
        rating: 4.8,
        reviews: 124,
        specifications: [
          { name: 'CPU', value: 'Dual-core Tensilica LX6' },
          { name: 'Clock Speed', value: 'Up to 240 MHz' },
          { name: 'Flash Memory', value: '4 MB' },
          { name: 'GPIO Pins', value: '34' }
        ],
        features: ['WiFi & Bluetooth', 'Low power consumption', 'Arduino IDE compatible'],
        compatibility: ['Arduino IDE', 'PlatformIO', 'ESP-IDF'],
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-03-20T14:22:00Z',
        status: 'active',
        sku: 'ESP32-DEV-001',
        manufacturer: 'Espressif',
        weight: 10,
        dimensions: '55mm x 28mm x 13mm'
      },
      {
        _id: '2',
        name: 'Arduino Uno R3',
        description: 'The classic Arduino microcontroller board based on the ATmega328P. Perfect for beginners.',
        price: 23.50,
        images: ['https://images.unsplash.com/photo-1553808018-8dcc0da72f9e?w=400'],
        category: 'microcontrollers',
        stock: 32,
        rating: 4.9,
        reviews: 89,
        specifications: [
          { name: 'Microcontroller', value: 'ATmega328P' },
          { name: 'Operating Voltage', value: '5V' },
          { name: 'Digital I/O Pins', value: '14' },
          { name: 'Clock Speed', value: '16 MHz' }
        ],
        features: ['USB programming', 'Robust design', 'Extensive community support'],
        compatibility: ['Arduino IDE', 'PlatformIO', 'Atmel Studio'],
        createdAt: '2024-01-10T08:15:00Z',
        updatedAt: '2024-03-18T16:45:00Z',
        status: 'active',
        sku: 'ARD-UNO-R3-001',
        manufacturer: 'Arduino',
        weight: 25,
        dimensions: '68.6mm x 53.4mm x 15mm'
      },
      {
        _id: '3',
        name: 'Raspberry Pi 4 Model B (4GB)',
        description: 'A powerful single-board computer with quad-core ARM Cortex-A72 processor.',
        price: 75.00,
        images: ['https://images.unsplash.com/photo-1588508065123-287b28e013da?w=400'],
        category: 'single-board-computers',
        stock: 0,
        rating: 4.7,
        reviews: 256,
        specifications: [
          { name: 'CPU', value: 'Quad-core ARM Cortex-A72' },
          { name: 'RAM', value: '4GB LPDDR4' },
          { name: 'GPU', value: 'VideoCore VI' },
          { name: 'Storage', value: 'MicroSD card slot' }
        ],
        features: ['4K video output', 'Gigabit Ethernet', 'USB 3.0 ports'],
        compatibility: ['Raspberry Pi OS', 'Ubuntu', 'Windows 10 IoT'],
        createdAt: '2024-02-01T12:00:00Z',
        updatedAt: '2024-03-25T09:30:00Z',
        status: 'out-of-stock',
        sku: 'RPI4-4GB-001',
        manufacturer: 'Raspberry Pi Foundation',
        weight: 46,
        dimensions: '85mm x 56mm x 17mm'
      },
      {
        _id: '4',
        name: 'HC-SR04 Ultrasonic Sensor',
        description: 'Ultrasonic distance sensor module for measuring distances from 2cm to 400cm.',
        price: 3.99,
        images: ['https://images.unsplash.com/photo-1562408590-e32931084e23?w=400'],
        category: 'sensors',
        stock: 128,
        rating: 4.6,
        reviews: 67,
        specifications: [
          { name: 'Range', value: '2cm - 400cm' },
          { name: 'Resolution', value: '0.3cm' },
          { name: 'Angle', value: '< 15°' },
          { name: 'Frequency', value: '40Hz' }
        ],
        features: ['High accuracy', 'Stable readings', 'Easy integration'],
        compatibility: ['Arduino', 'Raspberry Pi', 'ESP32'],
        createdAt: '2024-01-20T14:25:00Z',
        updatedAt: '2024-03-15T11:10:00Z',
        status: 'active',
        sku: 'HCSR04-001',
        manufacturer: 'Generic',
        weight: 8,
        dimensions: '45mm x 20mm x 15mm'
      },
      {
        _id: '5',
        name: 'SG90 Servo Motor',
        description: 'Micro servo motor with 180-degree rotation for robotics projects.',
        price: 2.99,
        images: ['https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400'],
        category: 'motors',
        stock: 85,
        rating: 4.4,
        reviews: 43,
        specifications: [
          { name: 'Rotation', value: '180°' },
          { name: 'Torque', value: '1.8 kg/cm' },
          { name: 'Speed', value: '0.1s/60°' },
          { name: 'Voltage', value: '4.8V - 6V' }
        ],
        features: ['Precise control', 'Lightweight', 'Easy mounting'],
        compatibility: ['Arduino', 'Raspberry Pi', 'PIC'],
        createdAt: '2024-01-25T16:40:00Z',
        updatedAt: '2024-03-22T13:15:00Z',
        status: 'active',
        sku: 'SG90-001',
        manufacturer: 'TowerPro',
        weight: 9,
        dimensions: '22.2mm x 11.8mm x 31mm'
      },
      {
        _id: '6',
        name: 'NodeMCU ESP8266',
        description: 'WiFi development board based on ESP8266 module with USB interface.',
        price: 8.99,
        images: ['https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=400'],
        category: 'microcontrollers',
        stock: 67,
        rating: 4.5,
        reviews: 156,
        specifications: [
          { name: 'MCU', value: 'ESP8266' },
          { name: 'Voltage', value: '3.3V' },
          { name: 'WiFi', value: '802.11 b/g/n' },
          { name: 'GPIO', value: '17' }
        ],
        features: ['Built-in WiFi', 'Lua scripting', 'Arduino compatible'],
        compatibility: ['Arduino IDE', 'Lua', 'MicroPython'],
        createdAt: '2024-01-18T09:20:00Z',
        updatedAt: '2024-03-10T15:35:00Z',
        status: 'active',
        sku: 'NODEMCU-ESP8266-001',
        manufacturer: 'Amica',
        weight: 7,
        dimensions: '58mm x 31mm x 13mm'
      }
    ];

    setTimeout(() => {
      setProducts(sampleProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price':
        return a.price - b.price;
      case 'stock':
        return b.stock - a.stock;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'created':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      default:
        return 0;
    }
  });

  const categories = [
    { value: 'all', label: 'All Categories', icon: Package },
    { value: 'microcontrollers', label: 'Microcontrollers', icon: Cpu },
    { value: 'single-board-computers', label: 'Single Board Computers', icon: CircuitBoard },
    { value: 'sensors', label: 'Sensors', icon: Wifi },
    { value: 'motors', label: 'Motors', icon: Zap },
    { value: 'communication', label: 'Communication', icon: Wifi },
    { value: 'power', label: 'Power Management', icon: Zap },
    { value: 'prototyping', label: 'Prototyping', icon: Grid }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'out-of-stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockStatus = (stock: number) => {
    if (stock === 0) return { color: 'text-red-600', icon: XCircle, label: 'Out of Stock' };
    if (stock < 10) return { color: 'text-yellow-600', icon: AlertCircle, label: 'Low Stock' };
    return { color: 'text-green-600', icon: CheckCircle, label: 'In Stock' };
  };

  const handleDeleteProduct = (productId: string) => {
    setProductToDelete(productId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (productToDelete) {
      setProducts(products.filter(p => p._id !== productToDelete));
      toast.success('Product deleted successfully');
      setShowDeleteModal(false);
      setProductToDelete(null);
    }
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) {
      setProducts(products.filter(p => !selectedProducts.includes(p._id)));
      toast.success(`${selectedProducts.length} products deleted`);
      setSelectedProducts([]);
    }
  };

  const handleBulkStatusChange = (status: 'active' | 'inactive') => {
    setProducts(products.map(p => 
      selectedProducts.includes(p._id) ? { ...p, status } : p
    ));
    toast.success(`${selectedProducts.length} products updated`);
    setSelectedProducts([]);
  };

  const toggleSelectAll = () => {
    if (selectedProducts.length === sortedProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(sortedProducts.map(p => p._id));
    }
  };

  const handleQuickStockUpdate = (productId: string, newStock: number) => {
    setProducts(products.map(p => 
      p._id === productId ? { ...p, stock: newStock } : p
    ));
    toast.success('Stock updated successfully');
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-300 rounded w-1/4"></div>
          <div className="h-12 bg-gray-300 rounded"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-300 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Electronics Component Management</h1>
          <p className="text-gray-600 mt-1">{products.length} total products • {filteredProducts.length} filtered</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => window.open('/admin/products/import', '_blank')}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Import CSV
          </button>
          <button 
            onClick={() => {
              const csvData = products.map(p => `${p.sku},${p.name},${p.price},${p.stock},${p.category}`).join('\n');
              const blob = new Blob([csvData], { type: 'text/csv' });
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = 'products.csv';
              a.click();
            }}
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
          <Link
            href="/admin/products/new"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Component
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Products</h3>
              <p className="text-2xl font-bold text-gray-900">{products.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Low Stock</h3>
              <p className="text-2xl font-bold text-gray-900">
                {products.filter(p => p.stock > 0 && p.stock < 10).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <XCircle className="h-8 w-8 text-red-600" />
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Out of Stock</h3>
              <p className="text-2xl font-bold text-gray-900">
                {products.filter(p => p.stock === 0).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Value</h3>
              <p className="text-2xl font-bold text-gray-900">
                ৳{(products.reduce((sum, p) => sum + (p.price * p.stock), 0) * 110).toFixed(0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, description, or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="stock">Sort by Stock</option>
              <option value="rating">Sort by Rating</option>
              <option value="created">Sort by Date Created</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedProducts.length > 0 && (
          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-blue-800 font-medium">
                {selectedProducts.length} component(s) selected
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => handleBulkStatusChange('active')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  Activate
                </button>
                <button
                  onClick={() => handleBulkStatusChange('inactive')}
                  className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors flex items-center gap-2"
                >
                  <AlertCircle className="h-4 w-4" />
                  Deactivate
                </button>
                <button
                  onClick={handleBulkDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Selected
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedProducts.length === sortedProducts.length && sortedProducts.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Component
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedProducts.map((product) => {
                const stockStatus = getStockStatus(product.stock);
                const StockIcon = stockStatus.icon;
                
                return (
                  <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedProducts.includes(product._id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProducts([...selectedProducts, product._id]);
                          } else {
                            setSelectedProducts(selectedProducts.filter(id => id !== product._id));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-gray-100 mr-4">
                          <Image
                            src={product.images[0] || '/placeholder.jpg'}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.manufacturer}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-mono text-gray-900">{product.sku}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                        {product.category.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm text-gray-900">
                        <span className="text-green-600 mr-1">৳</span>
                        {(product.price * 110).toFixed(0)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <StockIcon className={`h-4 w-4 mr-2 ${stockStatus.color}`} />
                        <input
                          type="number"
                          value={product.stock}
                          onChange={(e) => handleQuickStockUpdate(product._id, parseInt(e.target.value) || 0)}
                          className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}>
                        {product.status.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {product.rating ? (
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="text-sm text-gray-900">{product.rating}</span>
                          <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-400">No ratings</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/products/${product._id}`}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                          title="View Component"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link
                          href={`/admin/products/${product._id}/edit`}
                          className="text-indigo-600 hover:text-indigo-900 p-1 rounded transition-colors"
                          title="Edit Component"
                        >
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                          title="Delete Component"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No components found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Component</h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete this component? This action cannot be undone and will remove all associated data.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Delete Component
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}