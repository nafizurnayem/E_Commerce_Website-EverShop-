'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Star, 
  StarHalf, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  Shield, 
  RotateCcw,
  Plus,
  Minus,
  ChevronLeft,
  Zap,
  Cpu,
  Wifi,
  Thermometer,
  Info
} from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useReviewStore } from '@/store/reviews';
import { useAuthStore } from '@/store/auth';
import ProductReviews from '@/components/ProductReviews';
import { toast } from 'react-hot-toast';

interface ProductSpecification {
  name: string;
  value: string;
}

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
  specifications: ProductSpecification[];
  features: string[];
  compatibility: string[];
  datasheet?: string;
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addItem } = useCartStore();
  const { getProductRating, getProductReviews } = useReviewStore();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Sample product data (replace with API call)
  useEffect(() => {
    const sampleProducts: Product[] = [
      {
        _id: '1',
        name: 'ESP32 Development Board',
        description: 'A powerful, low-cost microcontroller with built-in WiFi and Bluetooth capabilities. Perfect for IoT projects and wireless communication applications.',
        price: 12.99,
        images: [
          'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600',
          'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=600',
          'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=600'
        ],
        category: 'microcontrollers',
        stock: 45,
        rating: 4.8,
        reviews: 124,
        specifications: [
          { name: 'CPU', value: 'Dual-core Tensilica LX6 microprocessor' },
          { name: 'Clock Speed', value: 'Up to 240 MHz' },
          { name: 'Flash Memory', value: '4 MB' },
          { name: 'SRAM', value: '520 KB' },
          { name: 'GPIO Pins', value: '34' },
          { name: 'ADC', value: '18x 12-bit SAR ADC' },
          { name: 'DAC', value: '2x 8-bit DAC' },
          { name: 'WiFi', value: '802.11 b/g/n' },
          { name: 'Bluetooth', value: 'v4.2 BR/EDR and BLE' },
          { name: 'Operating Voltage', value: '3.3V' },
          { name: 'Input Voltage', value: '7-12V' },
          { name: 'Dimensions', value: '55mm x 28mm' }
        ],
        features: [
          'Built-in WiFi and Bluetooth',
          'Ultra-low power consumption',
          'Rich peripheral interfaces',
          'Security features including flash encryption',
          'Arduino IDE compatible',
          'MicroPython support',
          'Espressif IoT Development Framework'
        ],
        compatibility: [
          'Arduino IDE',
          'PlatformIO',
          'ESP-IDF',
          'MicroPython',
          'CircuitPython'
        ],
        datasheet: '/datasheets/esp32-datasheet.pdf'
      },
      {
        _id: '2',
        name: 'Arduino Uno R3',
        description: 'The classic Arduino microcontroller board based on the ATmega328P. Perfect for beginners and prototyping.',
        price: 23.50,
        images: [
          'https://images.unsplash.com/photo-1553808018-8dcc0da72f9e?w=600',
          'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600'
        ],
        category: 'microcontrollers',
        stock: 32,
        rating: 4.9,
        reviews: 89,
        specifications: [
          { name: 'Microcontroller', value: 'ATmega328P' },
          { name: 'Operating Voltage', value: '5V' },
          { name: 'Input Voltage', value: '7-12V (recommended)' },
          { name: 'Digital I/O Pins', value: '14 (6 PWM outputs)' },
          { name: 'Analog Input Pins', value: '6' },
          { name: 'DC Current per I/O Pin', value: '20 mA' },
          { name: 'Flash Memory', value: '32 KB' },
          { name: 'SRAM', value: '2 KB' },
          { name: 'EEPROM', value: '1 KB' },
          { name: 'Clock Speed', value: '16 MHz' }
        ],
        features: [
          'USB connection for programming',
          'Power jack for external power',
          'ICSP header for direct programming',
          'Reset button',
          'LED indicators',
          'Robust and reliable design',
          'Extensive community support'
        ],
        compatibility: [
          'Arduino IDE',
          'PlatformIO',
          'Atmel Studio',
          'Thousands of shields and sensors'
        ]
      }
    ];

    // Simulate API call
    setTimeout(() => {
      const foundProduct = sampleProducts.find(p => p._id === id);
      setProduct(foundProduct || null);
      setLoading(false);
    }, 500);
  }, [id]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />);
    }

    return stars;
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    // Add the item multiple times for the selected quantity
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        stock: product.stock
      });
    }
    
    toast.success(`Added ${quantity} ${product.name} to cart!`);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= (product?.stock || 0)) {
      setQuantity(newQuantity);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/products" className="text-blue-600 hover:text-blue-700">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-600 hover:text-blue-600">Home</Link>
            <span className="text-gray-400">/</span>
            <Link href="/products" className="text-gray-600 hover:text-blue-600">Products</Link>
            <span className="text-gray-400">/</span>
            <Link href={`/products?category=${product.category}`} className="text-gray-600 hover:text-blue-600 capitalize">
              {product.category.replace('-', ' ')}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-blue-600 mb-6 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 mr-1" />
          Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative h-96 bg-white rounded-lg overflow-hidden shadow-lg group">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
              />
              {product.stock < 10 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm animate-pulse">
                  Only {product.stock} left!
                </div>
              )}
            </div>
            
            {/* Image Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex space-x-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative h-20 w-20 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                      selectedImage === index ? 'border-blue-500 shadow-lg' : 'border-gray-200'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center space-x-2">
                <div className="flex">{renderStars(getProductRating(product._id)?.averageRating || product.rating)}</div>
                <span className="text-lg font-medium text-gray-900">{(getProductRating(product._id)?.averageRating || product.rating).toFixed(1)}</span>
                <span className="text-gray-600">({getProductRating(product._id)?.totalReviews || getProductReviews(product._id).length} reviews)</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-blue-600">৳{(product.price * 110).toFixed(0)}</span>
              <span className="text-gray-500 line-through text-xl">৳{(product.price * 1.3 * 110).toFixed(0)}</span>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                23% OFF
              </span>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {product.stock > 0 ? (
                <>
                  <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-600 font-medium">In Stock ({product.stock} available)</span>
                </>
              ) : (
                <>
                  <div className="h-3 w-3 bg-red-500 rounded-full"></div>
                  <span className="text-red-600 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-medium">Quantity:</span>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                    className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-2 font-medium hover:scale-105 transform"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
                
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-lg border transition-all duration-300 hover:scale-105 transform ${
                    isWishlisted 
                      ? 'bg-red-50 border-red-200 text-red-600' 
                      : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                
                <button className="p-3 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-100 transition-all duration-300 hover:scale-105 transform">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 p-3 bg-green-50 rounded-lg">
                  <Truck className="h-5 w-5 text-green-600" />
                  <span className="text-sm text-green-700">Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-blue-50 rounded-lg">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="text-sm text-blue-700">1 Year Warranty</span>
                </div>
                <div className="flex items-center space-x-2 p-3 bg-purple-50 rounded-lg">
                  <RotateCcw className="h-5 w-5 text-purple-600" />
                  <span className="text-sm text-purple-700">30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'description', label: 'Description', icon: Info },
                { id: 'specifications', label: 'Specifications', icon: Cpu },
                { id: 'features', label: 'Features', icon: Zap },
                { id: 'compatibility', label: 'Compatibility', icon: Wifi }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
                <p className="mt-4 text-gray-600">
                  This high-quality electronic component is designed for reliability and performance in both professional and hobby projects. 
                  Built to exacting standards with comprehensive testing to ensure consistent operation.
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                    <span className="font-medium text-gray-900">{spec.name}</span>
                    <span className="text-gray-600">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'features' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'compatibility' && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {product.compatibility.map((item, index) => (
                  <div key={index} className="p-4 bg-green-50 rounded-lg text-center">
                    <span className="text-green-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Product Reviews */}
        <div className="mt-16">
          <ProductReviews productId={product._id} productName={product.name} />
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Placeholder for related products */}
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-4 animate-pulse">
                <div className="h-32 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}