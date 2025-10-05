'use client';

import { useState } from 'react';
import { useWebsiteSettingsStore } from '@/store/websiteSettings';
import { Palette, Eye, RotateCcw } from 'lucide-react';

export default function ThemeCustomizer() {
  const { settings, updateSiteSettings } = useWebsiteSettingsStore();
  const [activeColorScheme, setActiveColorScheme] = useState('custom');

  const colorSchemes = [
    {
      id: 'blue',
      name: 'Ocean Blue',
      primary: '#2563eb',
      secondary: '#1d4ed8',
      preview: 'bg-gradient-to-r from-blue-600 to-blue-800'
    },
    {
      id: 'purple',
      name: 'Royal Purple',
      primary: '#7c3aed',
      secondary: '#6d28d9',
      preview: 'bg-gradient-to-r from-purple-600 to-purple-800'
    },
    {
      id: 'green',
      name: 'Forest Green',
      primary: '#059669',
      secondary: '#047857',
      preview: 'bg-gradient-to-r from-green-600 to-green-800'
    },
    {
      id: 'red',
      name: 'Crimson Red',
      primary: '#dc2626',
      secondary: '#b91c1c',
      preview: 'bg-gradient-to-r from-red-600 to-red-800'
    },
    {
      id: 'orange',
      name: 'Sunset Orange',
      primary: '#ea580c',
      secondary: '#c2410c',
      preview: 'bg-gradient-to-r from-orange-600 to-orange-800'
    },
    {
      id: 'teal',
      name: 'Teal Mint',
      primary: '#0d9488',
      secondary: '#0f766e',
      preview: 'bg-gradient-to-r from-teal-600 to-teal-800'
    }
  ];

  const fontOptions = [
    { id: 'inter', name: 'Inter (Modern)', className: 'font-sans' },
    { id: 'roboto', name: 'Roboto (Clean)', className: 'font-sans' },
    { id: 'poppins', name: 'Poppins (Friendly)', className: 'font-sans' },
    { id: 'playfair', name: 'Playfair (Elegant)', className: 'font-serif' },
    { id: 'source-sans', name: 'Source Sans (Professional)', className: 'font-sans' }
  ];

  const applyColorScheme = (scheme: any) => {
    updateSiteSettings({
      primaryColor: scheme.primary,
      secondaryColor: scheme.secondary
    });
    setActiveColorScheme(scheme.id);
  };

  const handleCustomColorChange = (field: 'primaryColor' | 'secondaryColor', value: string) => {
    updateSiteSettings({ [field]: value });
    setActiveColorScheme('custom');
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Theme & Colors</h2>
        <p className="text-gray-600">Customize the look and feel of your website.</p>
      </div>

      <div className="space-y-8">
        {/* Preset Color Schemes */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Color Schemes</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {colorSchemes.map((scheme) => (
              <button
                key={scheme.id}
                onClick={() => applyColorScheme(scheme)}
                className={`relative p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                  activeColorScheme === scheme.id 
                    ? 'border-blue-500 ring-2 ring-blue-200' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-full h-16 rounded-lg mb-3 ${scheme.preview}`}></div>
                <h4 className="font-medium text-gray-900 text-sm">{scheme.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{scheme.primary}</p>
                {activeColorScheme === scheme.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Colors */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Palette className="h-5 w-5 mr-2" />
            Custom Colors
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Color
              </label>
              <div className="flex items-center space-x-3">
                <div 
                  className="w-12 h-10 rounded-lg border-2 border-gray-300 shadow-sm"
                  style={{ backgroundColor: settings.siteSettings.primaryColor }}
                ></div>
                <input
                  type="color"
                  value={settings.siteSettings.primaryColor}
                  onChange={(e) => handleCustomColorChange('primaryColor', e.target.value)}
                  className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.siteSettings.primaryColor}
                  onChange={(e) => handleCustomColorChange('primaryColor', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="#2563eb"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Used for buttons, links, and accents</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Color
              </label>
              <div className="flex items-center space-x-3">
                <div 
                  className="w-12 h-10 rounded-lg border-2 border-gray-300 shadow-sm"
                  style={{ backgroundColor: settings.siteSettings.secondaryColor }}
                ></div>
                <input
                  type="color"
                  value={settings.siteSettings.secondaryColor}
                  onChange={(e) => handleCustomColorChange('secondaryColor', e.target.value)}
                  className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  value={settings.siteSettings.secondaryColor}
                  onChange={(e) => handleCustomColorChange('secondaryColor', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="#7c3aed"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Used for gradients and highlights</p>
            </div>
          </div>
        </div>

        {/* Typography */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Typography</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Font Family
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                {fontOptions.map((font) => (
                  <option key={font.id} value={font.id} className={font.className}>
                    {font.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Heading Size
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                  <option value="xl">Extra Large</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Body Text Size
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="sm">Small</option>
                  <option value="md">Medium</option>
                  <option value="lg">Large</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Line Height
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="tight">Tight</option>
                  <option value="normal">Normal</option>
                  <option value="relaxed">Relaxed</option>
                  <option value="loose">Loose</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Button Styles */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Button Styles</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button Style
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="radio" name="buttonStyle" value="rounded" className="mr-2" defaultChecked />
                  <span>Rounded</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="buttonStyle" value="square" className="mr-2" />
                  <span>Square</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="buttonStyle" value="pill" className="mr-2" />
                  <span>Pill (Fully Rounded)</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Button Size
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="radio" name="buttonSize" value="sm" className="mr-2" />
                  <span>Small</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="buttonSize" value="md" className="mr-2" defaultChecked />
                  <span>Medium</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="buttonSize" value="lg" className="mr-2" />
                  <span>Large</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white border border-gray-200 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Eye className="h-5 w-5 mr-2" />
            Preview
          </h3>
          
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h4 className="text-xl font-bold mb-2" style={{ color: settings.siteSettings.primaryColor }}>
                Sample Heading
              </h4>
              <p className="text-gray-600 mb-4">
                This is how your text will look with the current theme settings. 
                You can see how the colors and typography work together.
              </p>
              <div className="flex space-x-4">
                <button 
                  className="px-4 py-2 rounded-lg text-white font-medium"
                  style={{ backgroundColor: settings.siteSettings.primaryColor }}
                >
                  Primary Button
                </button>
                <button 
                  className="px-4 py-2 rounded-lg text-white font-medium"
                  style={{ backgroundColor: settings.siteSettings.secondaryColor }}
                >
                  Secondary Button
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium">
                  Outline Button
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}