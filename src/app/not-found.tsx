import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="text-9xl font-bold text-blue-600 mb-4">404</div>
          <div className="text-6xl mb-4">🔍</div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          Sorry, the page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link 
            href="/"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <Home className="h-5 w-5 mr-2" />
            Go to Homepage
          </Link>
          
          <Link 
            href="/products"
            className="w-full bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center justify-center"
          >
            <Search className="h-5 w-5 mr-2" />
            Browse Products
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="w-full text-blue-600 py-3 px-6 rounded-lg font-medium hover:bg-blue-50 transition-colors flex items-center justify-center"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link href="/about" className="text-blue-600 hover:underline">
              About Us
            </Link>
            <Link href="/contact" className="text-blue-600 hover:underline">
              Contact
            </Link>
            <Link href="/categories" className="text-blue-600 hover:underline">
              Categories
            </Link>
            <Link href="/cart" className="text-blue-600 hover:underline">
              Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}