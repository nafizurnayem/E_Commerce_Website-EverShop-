'use client';

import { useState } from 'react';
import { Star, ThumbsUp, Filter, Flag, User } from 'lucide-react';
import { useReviewStore } from '@/store/reviews';
import { useAuthStore } from '@/store/auth';
import ReviewForm from './ReviewForm';
import toast from 'react-hot-toast';

interface ProductReviewsProps {
  productId: string;
  productName: string;
}

export default function ProductReviews({ productId, productName }: ProductReviewsProps) {
  const { user } = useAuthStore();
  const { 
    getProductReviews, 
    getProductRating, 
    canUserReview, 
    markReviewHelpful 
  } = useReviewStore();
  
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const reviews = getProductReviews(productId);
  const productRating = getProductRating(productId);
  
  // Filter and sort reviews
  const filteredReviews = reviews
    .filter(review => filterRating ? review.rating === filterRating : true)
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'highest':
          return b.rating - a.rating;
        case 'lowest':
          return a.rating - b.rating;
        default:
          return 0;
      }
    });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleHelpfulClick = (reviewId: string) => {
    markReviewHelpful(reviewId);
    toast.success('Thank you for your feedback!');
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6'
    };

    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const renderRatingDistribution = () => {
    if (!productRating) return null;

    return (
      <div className="space-y-2">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = productRating.ratingDistribution[rating as keyof typeof productRating.ratingDistribution];
          const percentage = productRating.totalReviews > 0 ? (count / productRating.totalReviews) * 100 : 0;
          
          return (
            <button
              key={rating}
              onClick={() => setFilterRating(filterRating === rating ? null : rating)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 ${
                filterRating === rating ? 'bg-blue-50 border border-blue-200' : ''
              }`}
            >
              <span className="text-sm font-medium">{rating}</span>
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600">{count}</span>
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-6">
        {/* Header with Overall Rating */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Customer Reviews</h2>
            
            {productRating ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {renderStars(Math.round(productRating.averageRating), 'lg')}
                  <span className="ml-2 text-2xl font-bold text-gray-900">
                    {productRating.averageRating.toFixed(1)}
                  </span>
                </div>
                <div className="text-gray-600">
                  Based on {productRating.totalReviews} review{productRating.totalReviews !== 1 ? 's' : ''}
                </div>
              </div>
            ) : (
              <p className="text-gray-600">No reviews yet</p>
            )}
          </div>

          {/* Write Review Button */}
          <div className="mt-4 lg:mt-0">
            {user && canUserReview(user._id, productId) ? (
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
              >
                Write a Review
              </button>
            ) : user ? (
              <div className="text-gray-500 text-sm">
                You have already reviewed this product
              </div>
            ) : (
              <button
                onClick={() => window.location.href = '/auth/login'}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 font-medium"
              >
                Login to Review
              </button>
            )}
          </div>
        </div>

        {/* Rating Distribution and Filters */}
        {productRating && productRating.totalReviews > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Rating Distribution */}
            <div className="lg:col-span-1">
              <h3 className="font-medium text-gray-900 mb-4">Rating Breakdown</h3>
              {renderRatingDistribution()}
            </div>

            {/* Sort and Filter Controls */}
            <div className="lg:col-span-2">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort by
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="highest">Highest Rating</option>
                    <option value="lowest">Lowest Rating</option>
                  </select>
                </div>
                
                {filterRating && (
                  <div className="flex items-end">
                    <button
                      onClick={() => setFilterRating(null)}
                      className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Clear Filter
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-gray-500" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-medium text-gray-900">{review.userName}</h4>
                        <div className="flex items-center space-x-2 mt-1">
                          {renderStars(review.rating, 'sm')}
                          {review.verified && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              Verified Purchase
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                    
                    <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
                    <p className="text-gray-700 mb-4">{review.comment}</p>
                    
                    {/* Review Images */}
                    {review.images && review.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {review.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`Review image ${index + 1}`}
                            className="w-full h-20 object-cover rounded-md cursor-pointer hover:opacity-80"
                          />
                        ))}
                      </div>
                    )}
                    
                    {/* Helpful Button */}
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => handleHelpfulClick(review.id)}
                        className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span className="text-sm">
                          Helpful ({review.helpful})
                        </span>
                      </button>
                      
                      <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600">
                        <Flag className="h-4 w-4" />
                        <span className="text-sm">Report</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                {filterRating 
                  ? `No ${filterRating}-star reviews found`
                  : 'No reviews yet'
                }
              </div>
              {user && canUserReview(user._id, productId) && (
                <button
                  onClick={() => setShowReviewForm(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-medium"
                >
                  Be the first to review
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Review Form Modal */}
      {showReviewForm && (
        <ReviewForm
          productId={productId}
          productName={productName}
          onClose={() => setShowReviewForm(false)}
          onSubmit={() => {
            // Reviews will be automatically updated due to store reactivity
          }}
        />
      )}
    </div>
  );
}