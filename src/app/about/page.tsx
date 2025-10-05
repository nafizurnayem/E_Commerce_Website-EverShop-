'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Shield, 
  Truck, 
  Users, 
  Award, 
  Globe, 
  Heart,
  Star,
  ChevronRight,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState('story');

  const stats = [
    { label: 'Happy Customers', value: '50,000+', icon: Users },
    { label: 'Products Sold', value: '1M+', icon: Award },
    { label: 'Countries Served', value: '25+', icon: Globe },
    { label: 'Years of Experience', value: '8+', icon: Star }
  ];

  const team = [
    {
      name: 'Nafizur Rahman Nayem',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      description: 'Passionate about bringing quality electronics to everyone.'
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of Product',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400',
      description: 'Expert in sourcing the latest tech innovations.'
    },
    {
      name: 'Mike Chen',
      role: 'Customer Success Manager',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      description: 'Dedicated to ensuring exceptional customer experiences.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Engineering',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      description: 'Leading our technical innovations and platform development.'
    }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Every product undergoes rigorous testing to ensure reliability and performance.'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'We prioritize customer satisfaction above everything else in our business.'
    },
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Quick and secure shipping to get your orders to you as fast as possible.'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Committed to maintaining the highest standards in everything we do.'
    }
  ];

  const milestones = [
    { year: '2016', event: 'EverShop founded in Dhaka, Bangladesh' },
    { year: '2018', event: 'Reached 10,000 customers milestone' },
    { year: '2020', event: 'Expanded to serve entire Bangladesh' },
    { year: '2022', event: 'Launched international shipping' },
    { year: '2024', event: 'Achieved 1M+ products sold' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              About EverShop
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Your trusted partner for quality electronics and innovative technology solutions since 2016.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content Tabs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-lg p-2 shadow-lg">
              {[
                { id: 'story', label: 'Our Story' },
                { id: 'mission', label: 'Mission & Vision' },
                { id: 'values', label: 'Our Values' },
                { id: 'team', label: 'Our Team' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-md font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            {activeTab === 'story' && (
              <div className="space-y-8">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Journey</h2>
                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      EverShop began in 2016 with a simple mission: to make quality electronics 
                      accessible to everyone in Bangladesh. What started as a small operation in 
                      Dhaka has grown into one of the country's most trusted e-commerce platforms.
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Today, we serve customers across Bangladesh and internationally, offering 
                      everything from microcontrollers and development boards to consumer electronics 
                      and smart home devices.
                    </p>
                  </div>
                  <div className="relative h-96 rounded-lg overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600"
                      alt="EverShop headquarters"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Timeline */}
                <div className="mt-16">
                  <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Milestones</h3>
                  <div className="space-y-6">
                    {milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold">
                          {milestone.year}
                        </div>
                        <div className="flex-1 bg-gray-50 p-4 rounded-lg">
                          <p className="text-gray-800 font-medium">{milestone.event}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'mission' && (
              <div className="space-y-12">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Mission & Vision</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-12">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-lg">
                    <h3 className="text-2xl font-bold text-blue-600 mb-4">Our Mission</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      To democratize access to quality electronics and technology by providing 
                      reliable products, exceptional service, and competitive prices to customers 
                      across Bangladesh and beyond.
                    </p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-lg">
                    <h3 className="text-2xl font-bold text-purple-600 mb-4">Our Vision</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      To become the leading e-commerce platform for electronics in South Asia, 
                      empowering innovation and technological advancement in our communities.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-8 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose EverShop?</h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, index) => {
                      const Icon = value.icon;
                      return (
                        <div key={index} className="text-center">
                          <div className="bg-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                            <Icon className="h-8 w-8 text-blue-600" />
                          </div>
                          <h4 className="font-bold text-gray-900 mb-2">{value.title}</h4>
                          <p className="text-gray-600 text-sm">{value.description}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'values' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Core Values</h2>
                  <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                    These values guide everything we do and shape our company culture.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  {values.map((value, index) => {
                    const Icon = value.icon;
                    return (
                      <div key={index} className="bg-gradient-to-r from-white to-gray-50 p-6 rounded-lg border border-gray-200">
                        <div className="flex items-start space-x-4">
                          <div className="bg-blue-100 p-3 rounded-lg">
                            <Icon className="h-6 w-6 text-blue-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                            <p className="text-gray-600 leading-relaxed">{value.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Our Team</h2>
                  <p className="text-gray-600 text-lg max-w-3xl mx-auto">
                    Behind EverShop is a passionate team dedicated to bringing you the best technology solutions.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {team.map((member, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                      <div className="relative h-64">
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                        <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                        <p className="text-gray-600 text-sm">{member.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Shop with EverShop?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and discover our amazing collection of electronics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/products" 
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              Browse Products
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/contact" 
              className="border border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-blue-600 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}