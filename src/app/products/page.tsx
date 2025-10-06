'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, Filter, Grid, List, Star, ShoppingCart, Zap, Cpu, Wifi, CircuitBoard } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import toast from 'react-hot-toast';
import dynamic from 'next/dynamic';

// Disable SSR for this component
const DynamicProductsPage = dynamic(() => Promise.resolve(ProductsPageComponent), {
  ssr: false
});

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
    interface?: string;
    range?: string;
    resolution?: string;
    accuracy?: string;
    type?: string;
    cpu?: string;
    ram?: string;
    points?: string;
    protocol?: string;
    stepAngle?: string;
    torque?: string;
    [key: string]: any; // Allow additional properties
  };
  features?: string[];
  rating?: number;
  reviews?: number;
}

function ProductsPageComponent() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { addItem } = useCartStore();

  // Electronic Sensors & Components
  const sampleProducts: Product[] = [
    {
      _id: 'sensor-1',
      name: 'DHT22 Temperature Humidity Sensor',
      description: 'High precision digital temperature and humidity sensor module',
      price: 8.99,
      images: ['https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500'],
      category: 'temperature',
      stock: 98,
      specifications: {
        voltage: '3.3V-6V',
        interface: 'Digital (Single-wire)',
        range: '-40°C to +80°C, 0-100% RH',
        accuracy: '±0.5°C, ±2% RH'
      },
      features: ['Digital output', 'Calibrated sensor', 'Long-term stability', 'Low power'],
      rating: 4.8,
      reviews: 234
    },
    {
      _id: 'sensor-2',
      name: 'HC-SR04 Ultrasonic Distance Sensor',
      description: 'Ultrasonic ranging module for accurate distance measurement',
      price: 12.99,
      images: ['https://images.unsplash.com/photo-1518346001043-13c7b4502b5a?w=500'],
      category: 'motion',
      stock: 85,
      specifications: {
        voltage: '5V',
        interface: 'Digital (Trigger/Echo)',
        range: '2cm-400cm',
        accuracy: '±3mm'
      },
      features: ['Non-contact measurement', 'Stable performance', 'Easy interface', 'Wide range'],
      rating: 4.8,
      reviews: 324
    },
    {
      _id: 'sensor-3',
      name: 'PIR Motion Sensor Module',
      description: 'Passive infrared sensor for motion detection applications',
      price: 6.99,
      images: ['https://images.unsplash.com/photo-1563829155-d7d8b0b5aa43?w=500'],
      category: 'motion',
      stock: 95,
      specifications: {
        voltage: '4.5V-20V',
        interface: 'Digital',
        range: '3m-7m detection',
        angle: '120° detection angle'
      },
      features: ['Wide detection angle', 'Adjustable sensitivity', 'Low power consumption', 'Easy setup'],
      rating: 4.7,
      reviews: 156
    },
    {
      _id: 'sensor-4',
      name: 'MPU6050 Gyroscope Accelerometer',
      description: '6-axis motion tracking device with gyroscope and accelerometer',
      price: 14.99,
      images: ['https://images.unsplash.com/photo-1608467017651-82b7c34e46e4?w=500'],
      category: 'motion',
      stock: 67,
      specifications: {
        voltage: '2.375V-3.46V',
        interface: 'I2C',
        range: '±2/±4/±8/±16g, ±250/±500/±1000/±2000°/s',
        accuracy: '16-bit ADC'
      },
      features: ['6-axis motion tracking', 'Digital Motion Processor', 'Low power mode', 'FIFO buffer'],
      rating: 4.9,
      reviews: 278
    },
    {
      _id: 'sensor-5',
      name: 'MQ-2 Gas Smoke Sensor',
      description: 'Gas sensor for detecting LPG, propane, hydrogen, and smoke',
      price: 11.99,
      images: ['https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500'],
      category: 'gas',
      stock: 54,
      specifications: {
        voltage: '5V',
        interface: 'Analog/Digital',
        range: '300-10000ppm',
        preheat: '20 seconds'
      },
      features: ['Wide detecting scope', 'Stable performance', 'Fast response', 'Analog/Digital output'],
      rating: 4.5,
      reviews: 167
    },
    {
      _id: 'sensor-6',
      name: 'LDR Light Sensor Module',
      description: 'Photoresistor sensor for light intensity measurement',
      price: 2.99,
      images: ['https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=500'],
      category: 'light',
      stock: 300,
      specifications: {
        voltage: '3.3V-5V',
        interface: 'Analog',
        range: '1-100000 Lux',
        resistance: '1-100kΩ'
      },
      features: ['Light sensitive', 'Simple interface', 'Cost effective', 'Wide range detection'],
      rating: 4.3,
      reviews: 89
    },
    {
      _id: 'sensor-7',
      name: 'DS3231 Real Time Clock',
      description: 'High precision real-time clock with temperature compensation',
      price: 9.99,
      images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500'],
      category: 'environmental',
      stock: 78,
      specifications: {
        voltage: '2.3V-5.5V',
        interface: 'I2C',
        accuracy: '±2ppm (±1 minute/year)',
        backup: 'Battery included'
      },
      features: ['Temperature compensated', 'Battery backup', 'Alarm functions', 'I2C interface'],
      rating: 4.7,
      reviews: 203
    },
    {
      _id: 'sensor-8',
      name: 'Soil Moisture Sensor',
      description: 'Capacitive soil moisture sensor for plant monitoring',
      price: 7.99,
      images: ['https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500'],
      category: 'environmental',
      stock: 76,
      specifications: {
        voltage: '3.3V-5V',
        interface: 'Analog',
        range: '0-100% moisture',
        type: 'Capacitive'
      },
      features: ['Corrosion resistant', 'No direct soil contact', 'Long lifespan', 'Waterproof probe'],
      rating: 4.6,
      reviews: 134
    },
    {
      _id: 'sensor-9',
      name: 'Pulse Heart Rate Sensor',
      description: 'Optical heart rate sensor for pulse detection',
      price: 15.99,
      images: ['https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500'],
      category: 'biometric',
      stock: 35,
      specifications: {
        voltage: '3.3V-5V',
        interface: 'Analog',
        range: '30-200 BPM',
        type: 'Optical'
      },
      features: ['Optical sensor', 'Real-time monitoring', 'Easy to use', 'Medical grade'],
      rating: 4.4,
      reviews: 87
    },
    {
      _id: 'sensor-10',
      name: 'Capacitive Touch Sensor',
      description: 'Touch-sensitive switch sensor module',
      price: 5.99,
      images: ['https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=500'],
      category: 'touch',
      stock: 123,
      specifications: {
        voltage: '2.0V-5.5V',
        interface: 'Digital',
        sensitivity: 'Adjustable',
        type: 'Capacitive'
      },
      features: ['Capacitive sensing', 'Low power', 'Toggle/momentary modes', 'LED indicator'],
      rating: 4.4,
      reviews: 156
    },
    {
      _id: 'sensor-11',
      name: 'IR Infrared Sensor Module',
      description: 'Infrared sensor for obstacle detection and avoidance',
      price: 4.99,
      images: ['https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=500'],
      category: 'motion',
      stock: 210,
      specifications: {
        voltage: '3.3V-5V',
        interface: 'Digital',
        range: '2cm-30cm',
        beam: 'Infrared'
      },
      features: ['Adjustable sensitivity', 'LED indicators', 'Fast response', 'Non-contact detection'],
      rating: 4.4,
      reviews: 142
    },
    {
      _id: 'sensor-12',
      name: 'Vibration Shock Sensor',
      description: 'Digital vibration and shock detection sensor',
      price: 4.99,
      images: ['https://images.unsplash.com/photo-1563829155-d7d8b0b5aa43?w=500'],
      category: 'motion',
      stock: 89,
      specifications: {
        voltage: '3.3V-5V',
        interface: 'Digital',
        sensitivity: 'Adjustable',
        type: 'SW-420'
      },
      features: ['Adjustable sensitivity', 'LED indicators', 'Compact size', 'Easy installation'],
      rating: 4.3,
      reviews: 78
    },
    {
      _id: 'sensor-13',
      name: 'Raspberry Pi 4 Model B',
      description: 'Single-board computer for IoT and embedded projects',
      price: 85.00,
      images: ['https://images.unsplash.com/photo-1581092918484-8313aa7ac5ff?w=500'],
      category: 'microcontrollers',
      stock: 24,
      specifications: {
        cpu: 'Quad-core ARM Cortex-A72',
        ram: '4GB LPDDR4',
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
    { id: 'all', name: 'All Sensors', icon: CircuitBoard },
    { id: 'temperature', name: 'Temperature Sensors', icon: Cpu },
    { id: 'motion', name: 'Motion & Proximity', icon: Wifi },
    { id: 'environmental', name: 'Environmental', icon: Zap },
    { id: 'light', name: 'Light & Photo', icon: Grid },
    { id: 'gas', name: 'Gas & Smoke', icon: CircuitBoard },
    { id: 'biometric', name: 'Biometric', icon: Cpu },
    { id: 'touch', name: 'Touch & Force', icon: Wifi }
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

export default function ProductsPage() {
  return <DynamicProductsPage />;
}