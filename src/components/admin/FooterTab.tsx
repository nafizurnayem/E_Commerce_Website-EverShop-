'use client';

import { useState } from 'react';
import { useWebsiteSettingsStore } from '@/store/websiteSettings';
import { Globe, Plus, Trash2, CreditCard } from 'lucide-react';

export default function FooterTab() {
  const { settings, updateFooter } = useWebsiteSettingsStore();
  const [formData, setFormData] = useState(settings.footer);

  const handleCompanyInfoChange = (field: string, value: string) => {
    const newCompanyInfo = { ...formData.companyInfo, [field]: value };
    const newData = { ...formData, companyInfo: newCompanyInfo };
    setFormData(newData);
    updateFooter({ companyInfo: newCompanyInfo });
  };

  const handleNewsletterChange = (field: string, value: string) => {
    const newNewsletter = { ...formData.newsletter, [field]: value };
    const newData = { ...formData, newsletter: newNewsletter };
    setFormData(newData);
    updateFooter({ newsletter: newNewsletter });
  };

  const addQuickLinksSection = () => {
    const newSection = {
      title: 'New Section',
      links: []
    };
    const newQuickLinks = [...formData.quickLinks, newSection];
    const newData = { ...formData, quickLinks: newQuickLinks };
    setFormData(newData);
    updateFooter({ quickLinks: newQuickLinks });
  };

  const updateQuickLinksSection = (sectionIndex: number, field: string, value: any) => {
    const newQuickLinks = formData.quickLinks.map((section, i) => 
      i === sectionIndex ? { ...section, [field]: value } : section
    );
    const newData = { ...formData, quickLinks: newQuickLinks };
    setFormData(newData);
    updateFooter({ quickLinks: newQuickLinks });
  };

  const removeQuickLinksSection = (sectionIndex: number) => {
    const newQuickLinks = formData.quickLinks.filter((_, i) => i !== sectionIndex);
    const newData = { ...formData, quickLinks: newQuickLinks };
    setFormData(newData);
    updateFooter({ quickLinks: newQuickLinks });
  };

  const addLinkToSection = (sectionIndex: number) => {
    const newLink = { label: '', url: '' };
    const newQuickLinks = formData.quickLinks.map((section, i) => 
      i === sectionIndex 
        ? { ...section, links: [...section.links, newLink] }
        : section
    );
    const newData = { ...formData, quickLinks: newQuickLinks };
    setFormData(newData);
    updateFooter({ quickLinks: newQuickLinks });
  };

  const updateLink = (sectionIndex: number, linkIndex: number, field: string, value: string) => {
    const newQuickLinks = formData.quickLinks.map((section, i) => 
      i === sectionIndex 
        ? {
            ...section, 
            links: section.links.map((link, j) => 
              j === linkIndex ? { ...link, [field]: value } : link
            )
          }
        : section
    );
    const newData = { ...formData, quickLinks: newQuickLinks };
    setFormData(newData);
    updateFooter({ quickLinks: newQuickLinks });
  };

  const removeLink = (sectionIndex: number, linkIndex: number) => {
    const newQuickLinks = formData.quickLinks.map((section, i) => 
      i === sectionIndex 
        ? { ...section, links: section.links.filter((_, j) => j !== linkIndex) }
        : section
    );
    const newData = { ...formData, quickLinks: newQuickLinks };
    setFormData(newData);
    updateFooter({ quickLinks: newQuickLinks });
  };

  const addPaymentMethod = (method: string) => {
    if (!formData.paymentMethods.includes(method)) {
      const newPaymentMethods = [...formData.paymentMethods, method];
      const newData = { ...formData, paymentMethods: newPaymentMethods };
      setFormData(newData);
      updateFooter({ paymentMethods: newPaymentMethods });
    }
  };

  const removePaymentMethod = (method: string) => {
    const newPaymentMethods = formData.paymentMethods.filter(m => m !== method);
    const newData = { ...formData, paymentMethods: newPaymentMethods };
    setFormData(newData);
    updateFooter({ paymentMethods: newPaymentMethods });
  };

  const availablePaymentMethods = [
    'visa', 'mastercard', 'amex', 'paypal', 'bkash', 'nagad', 'rocket', 'stripe'
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Footer Settings</h2>
        <p className="text-gray-600">Customize your website footer content and links.</p>
      </div>

      <div className="space-y-6">
        {/* Company Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Company Information
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
              </label>
              <input
                type="text"
                value={formData.companyInfo.name}
                onChange={(e) => handleCompanyInfoChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your company name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Description
              </label>
              <textarea
                value={formData.companyInfo.description}
                onChange={(e) => handleCompanyInfoChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description of your company"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Footer Logo URL
              </label>
              <input
                type="url"
                value={formData.companyInfo.logo}
                onChange={(e) => handleCompanyInfoChange('logo', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://example.com/logo.png"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Copyright Text
              </label>
              <input
                type="text"
                value={formData.copyright}
                onChange={(e) => {
                  const newData = { ...formData, copyright: e.target.value };
                  setFormData(newData);
                  updateFooter({ copyright: e.target.value });
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="© 2024 Your Company. All rights reserved."
              />
            </div>
          </div>
        </div>

        {/* Quick Links Sections */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Quick Links Sections</h3>
            <button
              onClick={addQuickLinksSection}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Section
            </button>
          </div>
          
          <div className="space-y-6">
            {formData.quickLinks.map((section, sectionIndex) => (
              <div key={sectionIndex} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Section {sectionIndex + 1}</h4>
                  <button
                    onClick={() => removeQuickLinksSection(sectionIndex)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => updateQuickLinksSection(sectionIndex, 'title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Section title"
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700">Links</label>
                    <button
                      onClick={() => addLinkToSection(sectionIndex)}
                      className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      + Add Link
                    </button>
                  </div>
                  
                  {section.links.map((link, linkIndex) => (
                    <div key={linkIndex} className="flex items-center space-x-3">
                      <input
                        type="text"
                        value={link.label}
                        onChange={(e) => updateLink(sectionIndex, linkIndex, 'label', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Link label"
                      />
                      <input
                        type="text"
                        value={link.url}
                        onChange={(e) => updateLink(sectionIndex, linkIndex, 'url', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="/url or https://external.com"
                      />
                      <button
                        onClick={() => removeLink(sectionIndex, linkIndex)}
                        className="text-red-600 hover:text-red-700 p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
                placeholder="Newsletter"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Newsletter Description
              </label>
              <textarea
                value={formData.newsletter.description}
                onChange={(e) => handleNewsletterChange('description', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Subscribe to get updates on new products and offers"
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
                placeholder="Your email address"
              />
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            Payment Methods
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selected Payment Methods
              </label>
              <div className="flex flex-wrap gap-2">
                {formData.paymentMethods.map((method) => (
                  <span
                    key={method}
                    className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    {method.charAt(0).toUpperCase() + method.slice(1)}
                    <button
                      onClick={() => removePaymentMethod(method)}
                      className="ml-2 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Available Payment Methods
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {availablePaymentMethods.map((method) => (
                  <button
                    key={method}
                    onClick={() => addPaymentMethod(method)}
                    disabled={formData.paymentMethods.includes(method)}
                    className={`p-2 text-sm rounded-lg border transition-colors ${
                      formData.paymentMethods.includes(method)
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-300'
                    }`}
                  >
                    {method.charAt(0).toUpperCase() + method.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}