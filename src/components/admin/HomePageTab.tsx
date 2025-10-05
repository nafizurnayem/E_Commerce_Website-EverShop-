'use client';

import { useState } from 'react';
import { useWebsiteSettingsStore } from '@/store/websiteSettings';
import { Home, Image as ImageIcon, Star, Users, Plus, Trash2 } from 'lucide-react';

export default function HomePageTab() {
  const { settings, updateHomePage } = useWebsiteSettingsStore();
  const [formData, setFormData] = useState(settings.homePage);

  const handleChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    updateHomePage({ [field]: value });
  };

  const handleHeroButtonChange = (field: string, value: string) => {
    const newHeroButton = { ...formData.heroButton, [field]: value };
    const newData = { ...formData, heroButton: newHeroButton };
    setFormData(newData);
    updateHomePage({ heroButton: newHeroButton });
  };

  const handleNewsletterChange = (field: string, value: string) => {
    const newNewsletter = { ...formData.newsletter, [field]: value };
    const newData = { ...formData, newsletter: newNewsletter };
    setFormData(newData);
    updateHomePage({ newsletter: newNewsletter });
  };

  const addTestimonial = () => {
    const newTestimonial = {
      id: Date.now().toString(),
      name: '',
      text: '',
      rating: 5,
      image: ''
    };
    const newTestimonials = [...formData.testimonials, newTestimonial];
    handleChange('testimonials', newTestimonials);
  };

  const updateTestimonial = (index: number, field: string, value: any) => {
    const newTestimonials = formData.testimonials.map((testimonial, i) => 
      i === index ? { ...testimonial, [field]: value } : testimonial
    );
    handleChange('testimonials', newTestimonials);
  };

  const removeTestimonial = (index: number) => {
    const newTestimonials = formData.testimonials.filter((_, i) => i !== index);
    handleChange('testimonials', newTestimonials);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Homepage Content</h2>
        <p className="text-gray-600">Customize your homepage sections and content.</p>
      </div>

      <div className="space-y-6">
        {/* Hero Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Home className="h-5 w-5 mr-2" />
            Hero Section
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Title
              </label>
              <input
                type="text"
                value={formData.heroTitle}
                onChange={(e) => handleChange('heroTitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your main headline"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Subtitle
              </label>
              <textarea
                value={formData.heroSubtitle}
                onChange={(e) => handleChange('heroSubtitle', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Supporting text for your headline"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Image URL
              </label>
              <input
                type="url"
                value={formData.heroImage}
                onChange={(e) => handleChange('heroImage', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/hero-image.jpg"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Text
                </label>
                <input
                  type="text"
                  value={formData.heroButton.text}
                  onChange={(e) => handleHeroButtonChange('text', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Shop Now"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Button Link
                </label>
                <input
                  type="text"
                  value={formData.heroButton.link}
                  onChange={(e) => handleHeroButtonChange('link', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="/products"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Newsletter Section</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Newsletter Title
              </label>
              <input
                type="text"
                value={formData.newsletter.title}
                onChange={(e) => handleNewsletterChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Stay Updated"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Newsletter Subtitle
              </label>
              <input
                type="text"
                value={formData.newsletter.subtitle}
                onChange={(e) => handleNewsletterChange('subtitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Get the latest deals and new arrivals"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Placeholder
              </label>
              <input
                type="text"
                value={formData.newsletter.placeholder}
                onChange={(e) => handleNewsletterChange('placeholder', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email address"
              />
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Users className="h-5 w-5 mr-2" />
              Customer Testimonials
            </h3>
            <button
              onClick={addTestimonial}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Testimonial
            </button>
          </div>
          
          <div className="space-y-4">
            {formData.testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Testimonial {index + 1}</h4>
                  <button
                    onClick={() => removeTestimonial(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customer Name
                    </label>
                    <input
                      type="text"
                      value={testimonial.name}
                      onChange={(e) => updateTestimonial(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Customer Photo URL
                    </label>
                    <input
                      type="url"
                      value={testimonial.image}
                      onChange={(e) => updateTestimonial(index, 'image', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Testimonial Text
                  </label>
                  <textarea
                    value={testimonial.text}
                    onChange={(e) => updateTestimonial(index, 'text', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="What the customer said..."
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Rating (1-5)
                  </label>
                  <select
                    value={testimonial.rating}
                    onChange={(e) => updateTestimonial(index, 'rating', parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={1}>1 Star</option>
                    <option value={2}>2 Stars</option>
                    <option value={3}>3 Stars</option>
                    <option value={4}>4 Stars</option>
                    <option value={5}>5 Stars</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}