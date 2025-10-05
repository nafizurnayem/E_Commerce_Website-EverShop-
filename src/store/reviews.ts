import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  userEmail: string;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  verified: boolean; // Whether user actually purchased the product
  helpful: number; // Number of users who found this helpful
  createdAt: string;
  updatedAt: string;
}

export interface ProductRating {
  productId: string;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

interface ReviewStore {
  reviews: Review[];
  productRatings: { [productId: string]: ProductRating };
  userReviews: { [userId: string]: string[] }; // Track which products user has reviewed
  
  // Actions
  addReview: (review: Omit<Review, 'id' | 'createdAt' | 'updatedAt' | 'helpful'>) => void;
  updateReview: (reviewId: string, updates: Partial<Review>) => void;
  deleteReview: (reviewId: string) => void;
  getProductReviews: (productId: string) => Review[];
  getProductRating: (productId: string) => ProductRating | null;
  getUserReviews: (userId: string) => Review[];
  canUserReview: (userId: string, productId: string) => boolean;
  markReviewHelpful: (reviewId: string) => void;
  updateProductRating: (productId: string) => void;
}

// Sample reviews data
const sampleReviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userId: 'user1',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    rating: 5,
    title: 'Excellent headphones!',
    comment: 'Amazing sound quality and very comfortable to wear for long periods. The noise cancellation works perfectly.',
    verified: true,
    helpful: 12,
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    productId: '1',
    userId: 'user2',
    userName: 'Jane Smith',
    userEmail: 'jane@example.com',
    rating: 4,
    title: 'Great value for money',
    comment: 'Good headphones overall. The bass could be a bit better but for the price, they are excellent.',
    verified: true,
    helpful: 8,
    createdAt: '2024-01-20T14:45:00Z',
    updatedAt: '2024-01-20T14:45:00Z'
  },
  {
    id: '3',
    productId: '2',
    userId: 'user3',
    userName: 'Mike Johnson',
    userEmail: 'mike@example.com',
    rating: 5,
    title: 'Perfect fit and quality',
    comment: 'This t-shirt fits perfectly and the cotton quality is amazing. Will definitely buy more colors.',
    verified: true,
    helpful: 5,
    createdAt: '2024-01-18T09:15:00Z',
    updatedAt: '2024-01-18T09:15:00Z'
  }
];

export const useReviewStore = create<ReviewStore>()(
  persist(
    (set, get) => ({
      reviews: sampleReviews,
      productRatings: {},
      userReviews: {},

      addReview: (reviewData) => {
        const newReview: Review = {
          ...reviewData,
          id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          helpful: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        set((state) => {
          const newReviews = [...state.reviews, newReview];
          const newUserReviews = {
            ...state.userReviews,
            [reviewData.userId]: [
              ...(state.userReviews[reviewData.userId] || []),
              reviewData.productId
            ]
          };

          return {
            reviews: newReviews,
            userReviews: newUserReviews
          };
        });

        // Update product rating after adding review
        get().updateProductRating(reviewData.productId);
      },

      updateReview: (reviewId, updates) => {
        set((state) => ({
          reviews: state.reviews.map(review =>
            review.id === reviewId
              ? { ...review, ...updates, updatedAt: new Date().toISOString() }
              : review
          )
        }));

        // Find the review to get productId and update rating
        const review = get().reviews.find(r => r.id === reviewId);
        if (review) {
          get().updateProductRating(review.productId);
        }
      },

      deleteReview: (reviewId) => {
        const review = get().reviews.find(r => r.id === reviewId);
        
        set((state) => ({
          reviews: state.reviews.filter(review => review.id !== reviewId)
        }));

        // Update product rating after deleting review
        if (review) {
          get().updateProductRating(review.productId);
        }
      },

      getProductReviews: (productId) => {
        return get().reviews.filter(review => review.productId === productId)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      },

      getProductRating: (productId) => {
        return get().productRatings[productId] || null;
      },

      getUserReviews: (userId) => {
        return get().reviews.filter(review => review.userId === userId)
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      },

      canUserReview: (userId, productId) => {
        const userReviewedProducts = get().userReviews[userId] || [];
        return !userReviewedProducts.includes(productId);
      },

      markReviewHelpful: (reviewId) => {
        set((state) => ({
          reviews: state.reviews.map(review =>
            review.id === reviewId
              ? { ...review, helpful: review.helpful + 1 }
              : review
          )
        }));
      },

      updateProductRating: (productId) => {
        const productReviews = get().getProductReviews(productId);
        
        if (productReviews.length === 0) {
          set((state) => {
            const newRatings = { ...state.productRatings };
            delete newRatings[productId];
            return { productRatings: newRatings };
          });
          return;
        }

        const totalReviews = productReviews.length;
        const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
        const averageRating = totalRating / totalReviews;

        const ratingDistribution = {
          1: productReviews.filter(r => r.rating === 1).length,
          2: productReviews.filter(r => r.rating === 2).length,
          3: productReviews.filter(r => r.rating === 3).length,
          4: productReviews.filter(r => r.rating === 4).length,
          5: productReviews.filter(r => r.rating === 5).length,
        };

        const productRating: ProductRating = {
          productId,
          averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
          totalReviews,
          ratingDistribution
        };

        set((state) => ({
          productRatings: {
            ...state.productRatings,
            [productId]: productRating
          }
        }));
      }
    }),
    {
      name: 'review-storage',
      onRehydrateStorage: () => (state) => {
        // Initialize product ratings when store is rehydrated
        if (state) {
          const productIds = [...new Set(state.reviews.map(r => r.productId))];
          productIds.forEach(productId => {
            state.updateProductRating(productId);
          });
        }
      },
    }
  )
);