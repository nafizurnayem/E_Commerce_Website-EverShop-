import { useEffect, useState } from 'react';

/**
 * Hook to prevent hydration mismatches by ensuring client-side only rendering
 * for components that depend on browser-specific state like localStorage
 */
export function useIsClient() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}

/**
 * Hook specifically for cart data to handle hydration safely
 */
export function useCartHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Wait for the store to hydrate from localStorage
    const timeout = setTimeout(() => {
      setIsHydrated(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return isHydrated;
}

/**
 * Hook specifically for auth data to handle hydration safely
 */
export function useAuthHydration() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Wait for the store to hydrate from localStorage
    const timeout = setTimeout(() => {
      setIsHydrated(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return isHydrated;
}