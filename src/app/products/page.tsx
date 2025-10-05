'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Filter, Grid, List, Star, ShoppingCart, Zap, Cpu, Wifi, CircuitBoard } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import toast from 'react-hot-toast';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  specifications?: {
    voltage?: string;
    current?: string;
    frequency?: string;
    dimensions?: string;
    weight?: string;
    compatibility?: string[];
  };
  features?: string[];
  rating?: number;
  reviews?: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { addItem } = useCartStore();

  // Sample electronic components data
  const sampleProducts: Product[] = [
    {
      _id: '1',
      name: 'ESP32 Development Board',
      description: 'Powerful WiFi + Bluetooth microcontroller for IoT projects',
      price: 12.99,
      images: ['https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500'],
      category: 'microcontrollers',
      stock: 25,
      specifications: {
        voltage: '3.3V',
        frequency: '240MHz',
        dimensions: '55x28x13mm',
        compatibility: ['Arduino IDE', 'MicroPython', 'ESP-IDF']
      },
      features: ['WiFi 802.11b/g/n', 'Bluetooth 4.2', '34 GPIO pins', 'Built-in antenna'],
      rating: 4.8,
      reviews: 156
    },
    {
      _id: '2',
      name: 'Arduino Uno R3',
      description: 'The classic microcontroller board for beginners and professionals',
      price: 18.50,
      images: ['https://images.unsplash.com/photo-1553406830-ef2513450d76?w=500'],
      category: 'microcontrollers',
      stock: 42,
      specifications: {
        voltage: '5V',
        frequency: '16MHz',
        dimensions: '68.6x53.4mm',
        compatibility: ['Arduino IDE', 'PlatformIO']
      },
      features: ['14 Digital I/O pins', '6 Analog inputs', 'USB connection', 'ISP header'],
      rating: 4.9,
      reviews: 324
    },
    {
      _id: '3',
      name: 'Raspberry Pi 4 Model B',
      description: 'High-performance single-board computer for advanced projects',
      price: 75.00,
      images: ['https://images.unsplash.com/photo-1588508065123-287b28e013da?w=500'],
      category: 'single-board-computers',
      stock: 18,
      specifications: {
        voltage: '5V',
        dimensions: '85.6x56.5mm',
        compatibility: ['Raspberry Pi OS', 'Ubuntu', 'Windows IoT']
      },
      features: ['Quad-core ARM Cortex-A72', '4GB RAM', 'Dual HDMI', 'Gigabit Ethernet'],
      rating: 4.7,
      reviews: 89
    },
    {
      _id: '4',
      name: 'Servo Motor SG90',
      description: 'Micro servo motor for robotics and automation projects',
      price: 3.99,
      images: ['https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=500'],
      category: 'motors',
      stock: 67,
      specifications: {
        voltage: '4.8V-6V',
        current: '100-200mA',
        dimensions: '22.2x11.8x31mm',
        weight: '9g'
      },
      features: ['180° rotation', 'PWM control', 'Plastic gears', 'Standard connector'],
      rating: 4.5,
      reviews: 203
    },
    {
      _id: '5',
      name: 'HC-SR04 Ultrasonic Sensor',
      description: 'Distance measurement sensor for obstacle detection',
      price: 2.49,
      images: ['https://images.unsplash.com/photo-1562408590-e32931084e23?w=500'],
      category: 'sensors',
      stock: 89,
      specifications: {
        voltage: '5V',
        frequency: '40kHz',
        dimensions: '45x20x15mm',
        compatibility: ['Arduino', 'Raspberry Pi', 'ESP32']
      },
      features: ['2cm-400cm range', 'High accuracy', '15° angle', 'Trigger & echo pins'],
      rating: 4.6,
      reviews: 147
    },
    {
      _id: '6',
      name: 'Breadboard 830 Points',
      description: 'Solderless prototype board for circuit building',
      price: 4.99,
      images: ['https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=500'],
      category: 'prototyping',
      stock: 35,
      specifications: {
        dimensions: '165x55x9mm',
        compatibility: ['All components with 0.1" spacing']
      },
      features: ['830 tie points', 'Power rails', 'Color-coded', 'Self-adhesive back'],
      rating: 4.4,
      reviews: 78
    },
    {
      _id: '7',
      name: 'Stepper Motor NEMA 17',
      description: 'High-precision stepper motor for 3D printers and CNC',
      price: 24.99,
      images: ['https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500'],
      category: 'motors',
      stock: 12,
      specifications: {
        voltage: '12V',
        current: '1.2A',
        dimensions: '42x42x34mm',
        weight: '280g'
      },
      features: ['1.8° step angle', '200 steps/rev', 'High torque', 'Standard NEMA 17'],
      rating: 4.8,
      reviews: 56
    },
    {
      _id: '8',
      name: 'NodeMCU ESP8266',
      description: 'WiFi development board based on ESP8266 chip',
      price: 8.99,
      images: ['https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500'],
      category: 'microcontrollers',
      stock: 31,
      specifications: {
        voltage: '3.3V',
        frequency: '80MHz',
        dimensions: '58x31x13mm',
        compatibility: ['Arduino IDE', 'MicroPython', 'Lua']
      },
      features: ['WiFi 802.11 b/g/n', '17 GPIO pins', 'Micro USB', 'CP2102 USB-TTL'],
      rating: 4.6,
      reviews: 198
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: CircuitBoard },
    { id: 'microcontrollers', name: 'Microcontrollers', icon: Cpu },
    { id: 'single-board-computers', name: 'Single Board Computers', icon: Cpu },
    { id: 'motors', name: 'Motors & Actuators', icon: Zap },
    { id: 'sensors', name: 'Sensors', icon: Wifi },
    { id: 'prototyping', name: 'Prototyping', icon: Grid }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(sampleProducts);
      setFilteredProducts(sampleProducts);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return (b.rating || 0) - (a.rating || 0);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, priceRange, sortBy]);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.images[0] || '',
      stock: product.stock
    });
    toast.success(`${product.name} added to cart!`);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading electronic components...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-4">Electronic Components</h1>
          <p className="text-xl text-blue-100">
            High-quality microcontrollers, sensors, motors, and development boards
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 space-y-6">
            {/* Search */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search components..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        selectedCategory === category.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-sm">{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Min: ৳{(priceRange.min * 110).toFixed(0)}</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Max: ৳{(priceRange.max * 110).toFixed(0)}</label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">
                    {filteredProducts.length} products found
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="name">Sort by Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                  <div className="flex border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'}`}
                    >
                      <Grid className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'text-gray-600'}`}
                    >
                      <List className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="bg-white rounded-lg shadow-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-[1.02] group cursor-pointer">
                    <Link href={`/products/${product._id}`} className="block">
                      <div className="relative h-48 bg-gray-100 rounded-t-lg overflow-hidden">
                        <Image
                          src={product.images[0] || '/placeholder.jpg'}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        {product.stock < 10 && (
                          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs animate-pulse">
                            Low Stock
                          </div>
                        )}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
                            <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </div>
                        </div>
                        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 text-center">
                            <span className="text-sm font-medium text-gray-800">View Details</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                      
                      {product.rating && (
                        <div className="flex items-center space-x-1 mb-3">
                          <div className="flex">{renderStars(product.rating)}</div>
                          <span className="text-sm text-gray-600">({product.reviews})</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-blue-600">৳{(product.price * 110).toFixed(0)}</span>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleAddToCart(product);
                          }}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 flex items-center space-x-2 shadow-md hover:shadow-lg"
                        >
                          <ShoppingCart className="h-4 w-4" />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <div key={product._id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
                    <div className="flex flex-col md:flex-row gap-6 p-6">
                      <Link href={`/products/${product._id}`} className="relative w-full md:w-48 h-48 bg-gray-100 rounded-lg overflow-hidden cursor-pointer">
                        <Image
                          src={product.images[0] || '/placeholder.jpg'}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                      
                      <div className="flex-1">
                        <Link href={`/products/${product._id}`}>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 cursor-pointer">{product.name}</h3>
                        </Link>
                        <p className="text-gray-600 mb-4">{product.description}</p>

                        {product.features && (
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-900 mb-2">Key Features:</h4>
                            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                              {product.features.slice(0, 3).map((feature, index) => (
                                <li key={index}>{feature}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-2xl font-bold text-blue-600">৳{(product.price * 110).toFixed(0)}</span>
                            {product.rating && (
                              <div className="flex items-center space-x-1 mt-1">
                                <div className="flex">{renderStars(product.rating)}</div>
                                <span className="text-sm text-gray-600">({product.reviews})</span>
                              </div>
                            )}
                          </div>
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 flex items-center space-x-2"
                          >
                            <ShoppingCart className="h-5 w-5" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <CircuitBoard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}