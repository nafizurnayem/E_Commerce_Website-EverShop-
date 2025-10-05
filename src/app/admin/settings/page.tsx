'use client';

import { useState } from 'react';
import { 
  Settings, 
  Globe, 
  Home, 
  Users, 
  Navigation, 
  Mail,
  Palette,
  Save,
  RotateCcw,
  Eye,
  Monitor,
  Smartphone,
  Upload,
  Link as LinkIcon
} from 'lucide-react';
import { useWebsiteSettingsStore } from '@/store/websiteSettings';
import SiteSettingsTab from '@/components/admin/SiteSettingsTab';
import ContactInfoTab from '@/components/admin/ContactInfoTab';
import HomePageTab from '@/components/admin/HomePageTab';
import AboutPageTab from '@/components/admin/AboutPageTab';
import NavigationTab from '@/components/admin/NavigationTab';
import FooterTab from '@/components/admin/FooterTab';
import ThemeCustomizer from '@/components/admin/ThemeCustomizer';
import toast from 'react-hot-toast';

export default function WebsiteSettingsPage() {
  const [activeTab, setActiveTab] = useState('site');
  const [previewMode, setPreviewMode] = useState('desktop');
  const { settings, resetToDefault } = useWebsiteSettingsStore();

  const tabs = [
    { id: 'site', label: 'Site Settings', icon: Settings },
    { id: 'theme', label: 'Theme & Colors', icon: Palette },
    { id: 'contact', label: 'Contact Info', icon: Mail },
    { id: 'home', label: 'Homepage', icon: Home },
    { id: 'about', label: 'About Page', icon: Users },
    { id: 'navigation', label: 'Navigation', icon: Navigation },
    { id: 'footer', label: 'Footer', icon: Globe },
  ];

  const handleSaveAll = () => {
    toast.success('All settings saved successfully!');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings to default? This action cannot be undone.')) {
      resetToDefault();
      toast.success('Settings reset to default values.');
    }
  };

  const handlePreview = () => {
    window.open('/', '_blank');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'site':
        return <SiteSettingsTab />;
      case 'theme':
        return <ThemeCustomizer />;
      case 'contact':
        return <ContactInfoTab />;
      case 'home':
        return <HomePageTab />;
      case 'about':
        return <AboutPageTab />;
      case 'navigation':
        return <NavigationTab />;
      case 'footer':
        return <FooterTab />;
      default:
        return <SiteSettingsTab />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Settings className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Website Settings</h1>
                <p className="text-sm text-gray-500">Customize your website without coding</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Preview Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setPreviewMode('desktop')}
                  className={`p-2 rounded-md transition-colors ${
                    previewMode === 'desktop' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
                  }`}
                >
                  <Monitor className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPreviewMode('mobile')}
                  className={`p-2 rounded-md transition-colors ${
                    previewMode === 'mobile' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-600'
                  }`}
                >
                  <Smartphone className="h-4 w-4" />
                </button>
              </div>

              {/* Action Buttons */}
              <button
                onClick={handlePreview}
                className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </button>
              
              <button
                onClick={handleReset}
                className="flex items-center px-4 py-2 text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset
              </button>
              
              <button
                onClick={handleSaveAll}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="h-4 w-4 mr-2" />
                Save All
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 text-left rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-5 w-5 mr-3" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>

              {/* Quick Stats */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Info</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Site Name:</span>
                    <span className="font-medium">{settings.siteSettings.siteName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Currency:</span>
                    <span className="font-medium">{settings.siteSettings.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Language:</span>
                    <span className="font-medium">{settings.siteSettings.language.toUpperCase()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className={`font-medium ${
                      settings.siteSettings.maintenanceMode ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {settings.siteSettings.maintenanceMode ? 'Maintenance' : 'Live'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Save Button for Mobile */}
      <div className="lg:hidden fixed bottom-6 right-6">
        <button
          onClick={handleSaveAll}
          className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}