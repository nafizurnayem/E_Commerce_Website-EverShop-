'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  ArrowLeft,
  Upload,
  Plus,
  Minus,
  Save,
  X,
  Camera,
  FileText,
  Package,
  Hash,
  Tag,
  Zap,
  Info
} from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ProductSpecification {
  name: string;
  value: string;
}

interface ProductForm {
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  stock: number;
  sku: string;
  manufacturer: string;
  weight: number;
  dimensions: string;
  specifications: ProductSpecification[];
  features: string[];
  compatibility: string[];
  status: 'active' | 'inactive';
}

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('basic');
  
  const [formData, setFormData] = useState<ProductForm>({
    name: '',
    description: '',
    price: 0,
    images: [],
    category: 'microcontrollers',
    stock: 0,
    sku: '',
    manufacturer: '',
    weight: 0,
    dimensions: '',
    specifications: [{ name: '', value: '' }],
    features: [''],
    compatibility: [''],
    status: 'active'
  });

  const categories = [
    { value: 'microcontrollers', label: 'Microcontrollers' },
    { value: 'single-board-computers', label: 'Single Board Computers' },
    { value: 'sensors', label: 'Sensors' },
    { value: 'motors', label: 'Motors & Actuators' },
    { value: 'communication', label: 'Communication Modules' },
    { value: 'power', label: 'Power Management' },
    { value: 'prototyping', label: 'Prototyping & Tools' },
    { value: 'components', label: 'Electronic Components' }
  ];

  const handleInputChange = (field: keyof ProductForm, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSpecificationChange = (index: number, field: 'name' | 'value', value: string) => {
    const newSpecs = [...formData.specifications];
    newSpecs[index][field] = value;
    setFormData(prev => ({ ...prev, specifications: newSpecs }));
  };

  const addSpecification = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { name: '', value: '' }]
    }));
  };

  const removeSpecification = (index: number) => {
    if (formData.specifications.length > 1) {
      const newSpecs = formData.specifications.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, specifications: newSpecs }));
    }
  };

  const handleArrayFieldChange = (field: 'features' | 'compatibility', index: number, value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayField = (field: 'features' | 'compatibility') => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayField = (field: 'features' | 'compatibility', index: number) => {
    if (formData[field].length > 1) {
      const newArray = formData[field].filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, [field]: newArray }));
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // Simulate image upload - in real app, upload to cloud storage
      const newImages = Array.from(files).map((file, index) => 
        `https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&${index}`
      );
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages].slice(0, 5) // Max 5 images
      }));
      toast.success(`${files.length} image(s) uploaded successfully`);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const generateSKU = () => {
    const categoryPrefix = formData.category.substring(0, 3).toUpperCase();
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const sku = `${categoryPrefix}-${randomNum}`;
    setFormData(prev => ({ ...prev, sku }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation
      if (!formData.name.trim()) {
        toast.error('Product name is required');
        return;
      }
      if (!formData.sku.trim()) {
        toast.error('SKU is required');
        return;
      }
      if (formData.price <= 0) {
        toast.error('Price must be greater than ৳0');
        return;
      }
      if (formData.images.length === 0) {
        toast.error('At least one image is required');
        return;
      }

      // Clean up empty fields
      const cleanedFormData = {
        ...formData,
        specifications: formData.specifications.filter(spec => spec.name.trim() && spec.value.trim()),
        features: formData.features.filter(feature => feature.trim()),
        compatibility: formData.compatibility.filter(comp => comp.trim())
      };

      // Simulate API call
      console.log('Saving product:', cleanedFormData);
      
      // In real app, make API call:
      // const response = await fetch('/api/admin/products', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(cleanedFormData)
      // });

      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate loading

      toast.success('Product created successfully!');
      router.push('/admin/products');
      
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error('Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Info },
    { id: 'images', label: 'Images', icon: Camera },
    { id: 'specifications', label: 'Specifications', icon: FileText },
    { id: 'features', label: 'Features', icon: Zap },
    { id: 'inventory', label: 'Inventory', icon: Package }
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Products
          </button>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Add New Electronic Component</h1>
        <p className="text-gray-600 mt-2">Create a new component listing for your electronics inventory</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Basic Information Tab */}
            {activeTab === 'basic' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter product name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      {categories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SKU *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={formData.sku}
                        onChange={(e) => handleInputChange('sku', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Product SKU"
                        required
                      />
                      <button
                        type="button"
                        onClick={generateSKU}
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        Generate
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Manufacturer
                    </label>
                    <input
                      type="text"
                      value={formData.manufacturer}
                      onChange={(e) => handleInputChange('manufacturer', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Manufacturer name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (৳) * - Bangladeshi Taka
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">৳</span>
                      <input
                        type="number"
                        step="1"
                        min="0"
                        value={formData.price}
                        onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                        required
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Enter price in Bangladeshi Taka (BDT). Example: ৳1,500 for a component
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Detailed product description"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Weight (g)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.weight}
                      onChange={(e) => handleInputChange('weight', parseInt(e.target.value) || 0)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Weight in grams"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Dimensions
                    </label>
                    <input
                      type="text"
                      value={formData.dimensions}
                      onChange={(e) => handleInputChange('dimensions', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="L x W x H (e.g., 55mm x 28mm x 13mm)"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Images Tab */}
            {activeTab === 'images' && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Product Images * (Max 5 images)
                  </label>
                  
                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Click to upload images or drag and drop</p>
                      <p className="text-sm text-gray-500 mt-2">PNG, JPG, GIF up to 10MB each</p>
                    </label>
                  </div>

                  {/* Image Preview */}
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                            <Image
                              src={image}
                              alt={`Product image ${index + 1}`}
                              fill
                              className="object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          {index === 0 && (
                            <span className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                              Main
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === 'specifications' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900">Technical Specifications</h3>
                  <button
                    type="button"
                    onClick={addSpecification}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                  >
                    <Plus className="h-4 w-4" />
                    Add Specification
                  </button>
                </div>

                <div className="space-y-4">
                  {formData.specifications.map((spec, index) => (
                    <div key={index} className="flex gap-4 items-center">
                      <div className="flex-1">
                        <input
                          type="text"
                          value={spec.name}
                          onChange={(e) => handleSpecificationChange(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Specification name (e.g., CPU)"
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={spec.value}
                          onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Specification value (e.g., ARM Cortex-M4)"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSpecification(index)}
                        className="text-red-600 hover:text-red-700 p-2"
                        disabled={formData.specifications.length === 1}
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features Tab */}
            {activeTab === 'features' && (
              <div className="space-y-6">
                {/* Features */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Key Features</h3>
                    <button
                      type="button"
                      onClick={() => addArrayField('features')}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                      Add Feature
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.features.map((feature, index) => (
                      <div key={index} className="flex gap-4 items-center">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => handleArrayFieldChange('features', index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter a key feature"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayField('features', index)}
                          className="text-red-600 hover:text-red-700 p-2"
                          disabled={formData.features.length === 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Compatibility */}
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Compatibility</h3>
                    <button
                      type="button"
                      onClick={() => addArrayField('compatibility')}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                    >
                      <Plus className="h-4 w-4" />
                      Add Compatibility
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.compatibility.map((comp, index) => (
                      <div key={index} className="flex gap-4 items-center">
                        <input
                          type="text"
                          value={comp}
                          onChange={(e) => handleArrayFieldChange('compatibility', index, e.target.value)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Compatible platform/software"
                        />
                        <button
                          type="button"
                          onClick={() => removeArrayField('compatibility', index)}
                          className="text-red-600 hover:text-red-700 p-2"
                          disabled={formData.compatibility.length === 1}
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Inventory Tab */}
            {activeTab === 'inventory' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Initial Stock Quantity *
                    </label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="number"
                        min="0"
                        value={formData.stock}
                        onChange={(e) => handleInputChange('stock', parseInt(e.target.value) || 0)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Inventory Status
                    </label>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-2 rounded-lg text-sm font-medium ${
                        formData.stock === 0 ? 'bg-red-100 text-red-800' :
                        formData.stock < 10 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {formData.stock === 0 ? 'Out of Stock' :
                         formData.stock < 10 ? 'Low Stock' : 'In Stock'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Inventory Tips</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Set initial stock quantity based on expected demand</li>
                    <li>• You can update stock quantities later from the main products page</li>
                    <li>• Low stock alerts will be triggered when quantity falls below 10 units</li>
                    <li>• Out of stock products will be automatically marked as unavailable</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Creating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                Create Component
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}