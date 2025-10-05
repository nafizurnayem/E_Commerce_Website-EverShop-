'use client';

import dynamic from 'next/dynamic';

// Disable SSR for components to avoid hydration issues during build
const Hero = dynamic(() => import('@/components/Hero'), { ssr: false });
const FeaturedProducts = dynamic(() => import('@/components/FeaturedProducts'), { ssr: false });
const Categories = dynamic(() => import('@/components/Categories'), { ssr: false });
const Newsletter = dynamic(() => import('@/components/Newsletter'), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Newsletter />
    </main>
  );
}
