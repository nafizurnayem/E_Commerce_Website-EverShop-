'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber') || searchParams.get('order') || 'ORD-XXXXXXXXXXXX';

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-8">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for your purchase. Your order has been confirmed.
          </p>

          {/* Order Details Card */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <div className="border-b border-gray-200 pb-6 mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Order Confirmation</h2>
              <p className="text-gray-600">Order Number: <span className="font-medium text-gray-900">{orderNumber}</span></p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Payment Status</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Confirmed
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Estimated Delivery</span>
                <span className="font-medium text-gray-900">3-5 business days</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Order Status</span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  <Package className="h-4 w-4 mr-1" />
                  Processing
                </span>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">What happens next?</h3>
            <div className="text-left space-y-2 text-blue-800">
              <p>• You will receive an email confirmation shortly</p>
              <p>• We'll notify you when your order ships</p>
              <p>• Track your order status in your account</p>
              <p>• Contact us if you have any questions</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/account?tab=orders"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              View Order Details
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>

          {/* Support Information */}
          <div className="mt-12 p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Customer Support</h4>
                <p className="text-gray-600">Email: support@evershop.com</p>
                <p className="text-gray-600">Phone: +880 1234-567890</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Return Policy</h4>
                <p className="text-gray-600">Free returns within 7 days</p>
                <p className="text-gray-600">No questions asked</p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">Warranty</h4>
                <p className="text-gray-600">1 year manufacturer warranty</p>
                <p className="text-gray-600">on all electronic components</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}