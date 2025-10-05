import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  _id: string;
  name: string;
  email: string;
  role?: string;
  avatar?: string;
  phone?: string;
  createdAt?: string;
  addresses?: Array<{
    type: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  }>;
}

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  login: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  updateUser: (userData: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      
      login: (user) => {
        set({ user, isLoading: false });
      },
      
      logout: () => {
        set({ user: null, isLoading: false });
      },
      
      setLoading: (loading) => {
        set({ isLoading: loading });
      },
      
      updateUser: (userData) => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, ...userData } });
        }
      }
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        // Optional: Add any rehydration logic here
        console.log('Auth store rehydrated with user:', state?.user?.email || 'none');
      },
    }
  )
);