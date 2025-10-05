import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  quantity: number;
  stock: number;
}

interface CartStore {
  items: CartItem[];
  couponCode: string;
  couponDiscount: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getOriginalPrice: () => number;
  getProductDiscounts: () => number;
  getCouponDiscount: () => number;
  getFinalTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: '',
      couponDiscount: 0,
      
      addItem: (product: Omit<CartItem, 'quantity'>) => {
      set((state) => {
        const existingItem = state.items.find(item => item.id === product.id)
        
        if (existingItem) {
          return {
            items: state.items.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          }
        } else {
          // Convert USD to BDT (approximate rate: 1 USD = 110 BDT)
          const bdtPrice = Math.round(product.price * 110)
          const bdtOriginalPrice = product.originalPrice ? Math.round(product.originalPrice * 110) : bdtPrice
          
          return {
            items: [...state.items, { 
              ...product, 
              quantity: 1,
              price: bdtPrice,
              originalPrice: bdtOriginalPrice
            }]
          }
        }
      })
    },
      
      removeItem: (id) => {
        set({
          items: get().items.filter(item => item.id !== id)
        });
      },
      
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        
        set({
          items: get().items.map(item =>
            item.id === id
              ? { ...item, quantity: Math.min(quantity, item.stock) }
              : item
          )
        });
      },
      
      clearCart: () => {
        set({ items: [], couponCode: '', couponDiscount: 0 });
      },
      
      applyCoupon: (code, discount) => {
        set({ couponCode: code, couponDiscount: discount });
      },
      
      removeCoupon: () => {
        set({ couponCode: '', couponDiscount: 0 });
      },
      
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      getOriginalPrice: () => {
        return get().items.reduce((total, item) => {
          const originalPrice = item.originalPrice || item.price;
          return total + (originalPrice * item.quantity);
        }, 0);
      },
      
      getProductDiscounts: () => {
        return get().items.reduce((total, item) => {
          if (item.originalPrice && item.originalPrice > item.price) {
            return total + ((item.originalPrice - item.price) * item.quantity);
          }
          return total;
        }, 0);
      },
      
      getCouponDiscount: () => {
        const subtotal = get().getTotalPrice();
        return (subtotal * get().couponDiscount) / 100;
      },
      
      getFinalTotal: () => {
        const subtotal = get().getTotalPrice();
        const couponDiscount = get().getCouponDiscount();
        // For Bangladesh: Free shipping above 1000 BDT, otherwise 60 BDT
        const shipping = subtotal > 1000 ? 0 : 60;
        // 5% VAT on discounted amount
        const tax = (subtotal - couponDiscount) * 0.05;
        return subtotal - couponDiscount + shipping + tax;
      }
    }),
    {
      name: 'cart-storage',
      onRehydrateStorage: () => (state) => {
        // Optional: Add any rehydration logic here
        console.log('Cart store rehydrated with:', state?.items?.length || 0, 'items');
      },
    }
  )
);