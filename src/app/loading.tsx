export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8">
          <span className="text-4xl font-bold text-blue-600">EverShop</span>
        </div>
        
        {/* Loading Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
        </div>
        
        {/* Loading Text */}
        <p className="text-gray-600 text-lg font-medium">Loading...</p>
        <p className="text-gray-500 text-sm mt-2">Please wait while we prepare your content</p>
      </div>
    </div>
  );
}