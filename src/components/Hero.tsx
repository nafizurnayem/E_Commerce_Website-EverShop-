'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';

const slides = [
  {
    id: 1,
    title: "Summer Sale 2024",
    subtitle: "Up to 50% off on selected items",
    description: "Discover amazing deals on fashion, electronics, and more. Limited time offer!",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop&crop=center",
    cta: "Shop Now",
    link: "/products?sale=true"
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Fresh styles just landed",
    description: "Check out the latest trends and must-have items for this season.",
    image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=600&fit=crop&crop=center",
    cta: "Explore",
    link: "/products?filter=new"
  },
  {
    id: 3,
    title: "Premium Collection",
    subtitle: "Luxury at its finest",
    description: "Experience premium quality with our exclusive collection of high-end products.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=600&fit=crop&crop=center",
    cta: "View Collection",
    link: "/products?category=premium"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <div className="space-y-6">
          <h2 className="text-lg md:text-xl font-medium opacity-90">
            {slides[currentSlide].subtitle}
          </h2>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
            {slides[currentSlide].title}
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            {slides[currentSlide].description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <Link
              href={slides[currentSlide].link}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center gap-2 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <ShoppingBag className="h-5 w-5" />
              {slides[currentSlide].cta}
            </Link>
            <Link
              href="/categories"
              className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-gray-900 transition-all duration-300 text-lg font-semibold"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-3 rounded-full transition-all duration-200"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 text-white opacity-75">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm">Scroll</span>
          <div className="w-px h-8 bg-white opacity-50"></div>
        </div>
      </div>
    </section>
  );
}