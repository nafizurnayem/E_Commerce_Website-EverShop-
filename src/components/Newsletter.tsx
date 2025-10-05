'use client';

import { useState } from 'react';
import { Mail, Gift, Truck, Shield, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Replace with actual API call
      // const response = await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Thank you for subscribing! Check your email for exclusive offers.');
      setEmail('');
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const benefits = [
    {
      icon: <Gift className="h-6 w-6" />,
      title: 'Exclusive Offers',
      description: 'Get access to special discounts and deals'
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: 'Free Shipping',
      description: 'Enjoy free shipping on orders over $50'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Secure Shopping',
      description: '100% secure payment and data protection'
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: '24/7 Support',
      description: 'Round-the-clock customer service'
    }
  ];

  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Signup */}
        <div className="text-center mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay in the Loop
            </h2>
            <p className="text-lg md:text-xl opacity-90 mb-8">
              Subscribe to our newsletter and be the first to know about new products, 
              exclusive offers, and seasonal sales.
            </p>
            
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:ring-opacity-50 focus:outline-none"
                  disabled={isSubmitting}
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            
            <p className="text-sm opacity-75 mt-4">
              No spam, unsubscribe at any time. We respect your privacy.
            </p>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="bg-white bg-opacity-20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {benefit.title}
              </h3>
              <p className="text-sm opacity-90">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="border-t border-white border-opacity-20 mt-16 pt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">50K+</div>
              <div className="text-sm opacity-90">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">10K+</div>
              <div className="text-sm opacity-90">Products</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">99%</div>
              <div className="text-sm opacity-90">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
              <div className="text-sm opacity-90">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}