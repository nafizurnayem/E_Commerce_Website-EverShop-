'use client';

import Link from 'next/link';
import { Cpu, Zap, Wifi, Grid, CircuitBoard, Smartphone, Monitor, HardDrive } from 'lucide-react';

export default function CategoriesPage() {
  const categories = [
    {
      id: 'microcontrollers',
      name: 'Microcontrollers',
      description: 'ESP32, Arduino, NodeMCU, and other programmable boards',
      icon: Cpu,
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400',
      count: 45,
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'single-board-computers',
      name: 'Single Board Computers',
      description: 'Raspberry Pi, Orange Pi, and development computers',
      icon: Monitor,
      image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=400',
      count: 12,
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'motors',
      name: 'Motors & Actuators',
      description: 'Servo motors, stepper motors, and DC motors',
      icon: Zap,
      image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=400',
      count: 28,
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'sensors',
      name: 'Sensors',
      description: 'Temperature, distance, motion, and environmental sensors',
      icon: Wifi,
      image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?w=400',
      count: 67,
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'prototyping',
      name: 'Prototyping',
      description: 'Breadboards, jumper wires, and prototyping accessories',
      icon: Grid,
      image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400',
      count: 34,
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 'communication',
      name: 'Communication Modules',
      description: 'WiFi, Bluetooth, LoRa, and wireless communication',
      icon: Smartphone,
      image: 'https://images.unsplash.com/photo-1555952494-efd681c7e3f9?w=400',
      count: 23,
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'power',
      name: 'Power Management',
      description: 'Power supplies, batteries, and voltage regulators',
      icon: HardDrive,
      image: 'https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=400',
      count: 19,
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'components',
      name: 'Electronic Components',
      description: 'Resistors, capacitors, LEDs, and basic components',
      icon: CircuitBoard,
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400',
      count: 156,
      color: 'from-yellow-500 to-yellow-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Product Categories</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore our comprehensive collection of electronic components, microcontrollers, 
              and development tools for your next project
            </p>
          </div>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="group block"
              >
                <div className="bg-white rounded-xl shadow-sm hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-3 group-hover:scale-[1.02] overflow-hidden">
                  {/* Category Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90`}></div>
                    <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-out"
                      style={{ backgroundImage: `url(${category.image})` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon className="h-16 w-16 text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="absolute top-4 right-4 bg-white bg-opacity-90 text-gray-800 px-3 py-1 rounded-full text-sm font-semibold group-hover:bg-opacity-100 transition-all duration-300">
                      {category.count} items
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Category Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {category.description}
                    </p>
                    
                    {/* View Products Button */}
                    <div className="mt-4 flex items-center text-blue-600 font-medium text-sm group-hover:text-blue-700 transform group-hover:translate-x-1 transition-all duration-300">
                      <span>View Products</span>
                      <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Featured Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Components?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We provide high-quality electronic components from trusted manufacturers with comprehensive documentation and support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CircuitBoard className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Authentic Components</h3>
              <p className="text-gray-600">
                All components are sourced directly from manufacturers and authorized distributors
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Shipping</h3>
              <p className="text-gray-600">
                Quick processing and shipping to get your projects started without delay
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Monitor className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Technical Support</h3>
              <p className="text-gray-600">
                Comprehensive documentation, tutorials, and community support
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Next Project?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Browse our complete catalog of electronic components and find everything you need for your IoT, robotics, and electronics projects.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            Browse All Products
            <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}