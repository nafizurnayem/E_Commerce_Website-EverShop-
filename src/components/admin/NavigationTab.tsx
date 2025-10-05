'use client';

import { useState } from 'react';
import { useWebsiteSettingsStore, NavigationItem } from '@/store/websiteSettings';
import { Navigation, Plus, Trash2, Eye, EyeOff, GripVertical } from 'lucide-react';

export default function NavigationTab() {
  const { settings, updateNavigation } = useWebsiteSettingsStore();
  const [navItems, setNavItems] = useState(settings.navigation);

  const addNavItem = () => {
    const newItem: NavigationItem = {
      id: Date.now().toString(),
      label: '',
      url: '',
      type: 'page',
      isVisible: true,
      order: navItems.length + 1
    };
    const newNavItems = [...navItems, newItem];
    setNavItems(newNavItems);
    updateNavigation(newNavItems);
  };

  const updateNavItem = (index: number, field: keyof NavigationItem, value: any) => {
    const newNavItems = navItems.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setNavItems(newNavItems);
    updateNavigation(newNavItems);
  };

  const removeNavItem = (index: number) => {
    const newNavItems = navItems.filter((_, i) => i !== index);
    setNavItems(newNavItems);
    updateNavigation(newNavItems);
  };

  const moveNavItem = (index: number, direction: 'up' | 'down') => {
    const newNavItems = [...navItems];
    const item = newNavItems[index];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex >= 0 && targetIndex < newNavItems.length) {
      newNavItems.splice(index, 1);
      newNavItems.splice(targetIndex, 0, item);
      
      // Update order values
      newNavItems.forEach((item, i) => {
        item.order = i + 1;
      });
      
      setNavItems(newNavItems);
      updateNavigation(newNavItems);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Navigation Menu</h2>
        <p className="text-gray-600">Manage your website's main navigation menu items.</p>
      </div>

      <div className="space-y-6">
        {/* Add New Item */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Menu Items</h3>
          <button
            onClick={addNavItem}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Menu Item
          </button>
        </div>

        {/* Navigation Items */}
        <div className="space-y-4">
          {navItems.map((item, index) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col space-y-1">
                    <button
                      onClick={() => moveNavItem(index, 'up')}
                      disabled={index === 0}
                      className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                    >
                      <GripVertical className="h-4 w-4" />
                    </button>
                  </div>
                  <h4 className="font-medium text-gray-900">
                    {item.label || `Menu Item ${index + 1}`}
                  </h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    item.isVisible 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {item.isVisible ? 'Visible' : 'Hidden'}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateNavItem(index, 'isVisible', !item.isVisible)}
                    className={`p-2 rounded-lg ${
                      item.isVisible 
                        ? 'text-green-600 hover:bg-green-50' 
                        : 'text-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    {item.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  <button
                    onClick={() => removeNavItem(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Label
                  </label>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => updateNavItem(index, 'label', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Menu label"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL
                  </label>
                  <input
                    type="text"
                    value={item.url}
                    onChange={(e) => updateNavItem(index, 'url', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="/page-url or https://external.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    value={item.type}
                    onChange={(e) => updateNavItem(index, 'type', e.target.value as NavigationItem['type'])}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="page">Page</option>
                    <option value="category">Category</option>
                    <option value="external">External Link</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Preset Navigation Options */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Add Presets</h3>
          <p className="text-gray-600 mb-4">Add common navigation items with pre-filled information.</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Home', url: '/', type: 'page' },
              { label: 'Products', url: '/products', type: 'page' },
              { label: 'Categories', url: '/categories', type: 'page' },
              { label: 'About', url: '/about', type: 'page' },
              { label: 'Contact', url: '/contact', type: 'page' },
              { label: 'Cart', url: '/cart', type: 'page' },
              { label: 'Account', url: '/account', type: 'page' },
              { label: 'Blog', url: '/blog', type: 'page' }
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  const exists = navItems.some(item => item.url === preset.url);
                  if (!exists) {
                    const newItem: NavigationItem = {
                      id: Date.now().toString() + preset.label,
                      label: preset.label,
                      url: preset.url,
                      type: preset.type as NavigationItem['type'],
                      isVisible: true,
                      order: navItems.length + 1
                    };
                    const newNavItems = [...navItems, newItem];
                    setNavItems(newNavItems);
                    updateNavigation(newNavItems);
                  }
                }}
                className="p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 text-left transition-colors"
              >
                <div className="font-medium text-gray-900">{preset.label}</div>
                <div className="text-xs text-gray-500">{preset.url}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Preview */}
        <div className="bg-white border border-gray-200 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Navigation className="h-5 w-5 mr-2" />
            Navigation Preview
          </h3>
          <p className="text-gray-600 mb-4">This is how your navigation will appear on the website:</p>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex flex-wrap items-center space-x-6">
              {navItems
                .filter(item => item.isVisible)
                .sort((a, b) => a.order - b.order)
                .map((item) => (
                  <div key={item.id} className="flex items-center">
                    <span className="text-gray-700 hover:text-blue-600 cursor-pointer py-2">
                      {item.label}
                    </span>
                    {item.type === 'external' && (
                      <span className="ml-1 text-xs text-blue-600">↗</span>
                    )}
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}