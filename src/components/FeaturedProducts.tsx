'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useReviewStore } from '@/store/reviews';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatCurrency } from '@/utils/currency';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  mainImage: string;
  category: string;
  rating: {
    average: number;
    count: number;
  };
  stock: number;
  discount?: number;
}

// Placeholder products - replace with API data
const placeholderProducts: Product[] = [
  {
    _id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 79.99,
    originalPrice: 99.99,
    mainImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop&crop=center',
    category: 'Electronics',
    rating: { average: 4.5, count: 128 },
    stock: 25,
    discount: 20
  },
  {
    _id: '2',
    name: 'Premium Cotton T-Shirt',
    price: 24.99,
    mainImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center',
    category: 'Fashion',
    rating: { average: 4.3, count: 89 },
    stock: 50
  },
  {
    _id: '3',
    name: 'Smart Fitness Watch',
    price: 199.99,
    originalPrice: 249.99,
    mainImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop&crop=center',
    category: 'Electronics',
    rating: { average: 4.7, count: 203 },
    stock: 15,
    discount: 20
  },
  {
    _id: '4',
    name: 'Organic Skincare Set',
    price: 89.99,
    mainImage: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop&crop=center',
    category: 'Beauty',
    rating: { average: 4.6, count: 156 },
    stock: 30
  },
  {
    _id: '5',
    name: 'Professional Coffee Maker',
    price: 129.99,
    originalPrice: 159.99,
    mainImage: 'https://images.unsplash.com/photo-1517256673644-36ad11246d21?w=400&h=400&fit=crop&crop=center',
    category: 'Home & Garden',
    rating: { average: 4.4, count: 95 },
    stock: 12,
    discount: 19
  },
  {
    _id: '6',
    name: 'Yoga Mat Pro',
    price: 39.99,
    mainImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop&crop=center',
    category: 'Sports',
    rating: { average: 4.2, count: 67 },
    stock: 40
  }
];

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();
  const { getProductRating } = useReviewStore();
  const { language, t } = useLanguage();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/products?featured=true&limit=6');
        // const data = await response.json();
        // setProducts(data.products);
        
        // Using placeholder data for now
        setTimeout(() => {
          setProducts(placeholderProducts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching featured products:', error);
        setProducts(placeholderProducts);
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.mainImage,
      stock: product.stock
    });
    toast.success(`${product.name} added to cart!`);
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                <div className="h-64 bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our hand-picked selection of the best products with amazing deals
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.mainImage}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {product.discount && (
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                    -{product.discount}%
                  </div>
                )}
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100">
                  <Heart className="h-5 w-5 text-gray-600 hover:text-red-500" />
                </button>
              </div>

              <div className="p-4">
                <div className="mb-2">
                  <span className="text-sm text-blue-600 font-medium">
                    {product.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  <Link href={`/products/${product._id}`} className="hover:text-blue-600">
                    {product.name}
                  </Link>
                </h3>

                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {(() => {
                      const productRating = getProductRating(product._id);
                      const avgRating = productRating ? productRating.averageRating : product.rating.average;
                      return renderStars(Math.floor(avgRating));
                    })()}
                  </div>
                  <span className="ml-2 text-sm text-gray-600">
                    {(() => {
                      const productRating = getProductRating(product._id);
                      const count = productRating ? productRating.totalReviews : product.rating.count;
                      return `(${count})`;
                    })()}
                  </span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.stock} left
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock === 0}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="h-4 w-4" />
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/products"
            className="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}