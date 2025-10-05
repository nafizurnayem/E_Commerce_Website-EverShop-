'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard, Tag, X } from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { useAuthStore } from '@/store/auth';
import { useCartHydration } from '@/hooks/useHydration';
import { useLanguage } from '@/contexts/LanguageContext';
import { formatCurrency, formatBengaliNumber } from '@/utils/currency';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import toast from 'react-hot-toast';

export default function CartPage() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const { 
    items, 
    updateQuantity, 
    removeItem, 
    getTotalPrice, 
    getOriginalPrice,
    getProductDiscounts,
    getCouponDiscount,
    getFinalTotal,
    getTotalItems, 
    clearCart,
    couponCode,
    couponDiscount,
    applyCoupon,
    removeCoupon
  } = useCartStore();
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [couponInput, setCouponInput] = useState('');
  const isCartHydrated = useCartHydration();

  // Only calculate totals after hydration to prevent mismatch
  const totalItems = isCartHydrated ? getTotalItems() : 0;
  const originalPrice = isCartHydrated ? getOriginalPrice() : 0;
  const currentPrice = isCartHydrated ? getTotalPrice() : 0;
  const productDiscounts = isCartHydrated ? getProductDiscounts() : 0;
  const couponDiscountAmount = isCartHydrated ? getCouponDiscount() : 0;
  const finalTotal = isCartHydrated ? getFinalTotal() : 0;

  const handleUpdateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(productId);
      toast.success('Item removed from cart');
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleRemoveItem = (productId: string) => {
    removeItem(productId);
    toast.success('Item removed from cart');
  };

    const handleApplyCoupon = () => {
    if (!couponInput.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    const coupons: Record<string, number> = {
      'SAVE10': 10,
      'WELCOME15': 15,
      'DISCOUNT20': 20,
      'ELECTRONICS25': 25,
      'SAVE400': 400 // Fixed amount coupon
    };

    const upperCouponCode = couponInput.toUpperCase();
    
    if (upperCouponCode === 'SAVE400') {
      // Fixed amount discount
      const discountAmount = Math.min(400, currentPrice);
      const discountPercentage = (discountAmount / currentPrice) * 100;
      applyCoupon(upperCouponCode, discountPercentage);
      toast.success(`Coupon applied! ${formatCurrency(discountAmount, language)} discount`);
    } else if (coupons[upperCouponCode]) {
      applyCoupon(upperCouponCode, coupons[upperCouponCode]);
      const discountPercent = language === 'bn' ? formatBengaliNumber(coupons[upperCouponCode]) : coupons[upperCouponCode];
      toast.success(`Coupon applied! ${discountPercent}% discount`);
    } else {
      toast.error('Invalid coupon code');
    }
    
    setCouponInput('');
  };

  const handleRemoveCoupon = () => {
    removeCoupon();
    toast.success('Coupon removed');
  };

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please login to proceed with checkout');
      router.push('/auth/login');
      return;
    }

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    // Redirect to checkout page
    router.push('/checkout');
  };

  // Show loading state while cart is hydrating
  if (!isCartHydrated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your cart...</p>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="mx-auto h-24 w-24 text-gray-400" />
            <h2 className="mt-6 text-3xl font-bold text-gray-900">Your cart is empty</h2>
            <p className="mt-2 text-lg text-gray-600">
              Looks like you haven't added any items to your cart yet.
            </p>
            <div className="mt-8">
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-1">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Cart Items</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-gray-100">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <ShoppingBag className="h-8 w-8 text-gray-400" />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          In stock: {item.stock} items
                        </p>
                        <p className="text-lg font-semibold text-blue-600">
                          ৳{item.price.toFixed(0)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                            disabled={loading}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="px-4 py-2 text-center min-w-[3rem] text-black font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                            disabled={loading}
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                          disabled={loading}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    {/* Item Total */}
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Subtotal: ৳{(item.price * item.quantity).toFixed(0)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <div className="bg-white rounded-lg shadow-sm sticky top-8">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {/* Original Price (if there are product discounts) */}
                  {productDiscounts > 0 && (
                    <div className="flex justify-between text-gray-500">
                      <span className="text-base">Original Price</span>
                      <span className="text-base line-through">
                        ৳{originalPrice.toFixed(0)}
                      </span>
                    </div>
                  )}
                  
                  {/* Product Discounts */}
                  {productDiscounts > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span className="text-base">Product Discounts</span>
                      <span className="text-base font-medium">
                        -৳{productDiscounts.toFixed(0)}
                      </span>
                    </div>
                  )}
                  
                  {/* Subtotal */}
                  <div className="flex justify-between">
                    <span className="text-base text-gray-600">Subtotal</span>
                    <span className="text-base font-medium text-gray-900">
                      ৳{currentPrice.toFixed(0)}
                    </span>
                  </div>
                  
                  {/* Coupon Discount */}
                  {couponCode && (
                    <div className="flex justify-between text-green-600">
                      <div className="flex items-center space-x-2">
                        <span className="text-base">Coupon ({couponCode})</span>
                        <button
                          onClick={handleRemoveCoupon}
                          className="text-red-500 hover:text-red-700 text-sm"
                          title="Remove coupon"
                        >
                          ×
                        </button>
                      </div>
                      <span className="text-base font-medium">
                        -৳{couponDiscountAmount.toFixed(0)}
                      </span>
                    </div>
                  )}
                  
                  {/* Shipping */}
                  <div className="flex justify-between">
                    <span className="text-base text-gray-600">Shipping</span>
                    <span className="text-base font-medium text-gray-900">
                      {currentPrice > 1000 ? 'Free' : '৳60'}
                    </span>
                  </div>
                  
                  {/* Tax */}
                  <div className="flex justify-between">
                    <span className="text-base text-gray-600">VAT (5%)</span>
                    <span className="text-base font-medium text-gray-900">
                      ৳{((currentPrice - couponDiscountAmount) * 0.05).toFixed(0)}
                    </span>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4">
                    <div className="flex justify-between">
                      <span className="text-lg font-medium text-gray-900">Total</span>
                      <span className="text-lg font-bold text-gray-900">
                        ৳{finalTotal.toFixed(0)}
                      </span>
                    </div>
                    
                    {/* Total Savings */}
                    {(productDiscounts + couponDiscountAmount) > 0 && (
                      <div className="flex justify-between mt-2">
                        <span className="text-sm text-green-600">You Save</span>
                        <span className="text-sm font-medium text-green-600">
                          ৳{(productDiscounts + couponDiscountAmount).toFixed(0)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Coupon Code Section */}
                {!couponCode && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Have a coupon code?</h3>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        placeholder="Enter coupon code"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onKeyPress={(e) => e.key === 'Enter' && handleApplyCoupon()}
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium"
                      >
                        Apply
                      </button>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">
                        Try: SAVE10, WELCOME15, DISCOUNT20, ELECTRONICS25, SAVE400
                      </p>
                    </div>
                  </div>
                )}

                {/* Checkout Button */}
                <div className="mt-6">
                  <button
                    onClick={handleCheckout}
                    className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                  >
                    <CreditCard className="mr-2 h-5 w-5" />
                    Proceed to Checkout
                  </button>
                </div>

                {/* Security Notice */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    Secure checkout powered by SSL encryption
                  </p>
                </div>

                {/* Free Shipping Notice */}
                {currentPrice < 50 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-700">
                      Add ৳{(1000 - currentPrice).toFixed(0)} more for free shipping!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}