'use client';

import { useState } from 'react';
import { useWebsiteSettingsStore } from '@/store/websiteSettings';
import { Users, Target, Eye, Award, Plus, Trash2 } from 'lucide-react';

export default function AboutPageTab() {
  const { settings, updateAboutPage } = useWebsiteSettingsStore();
  const [formData, setFormData] = useState(settings.aboutPage);

  const handleChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    updateAboutPage({ [field]: value });
  };

  const addTeamMember = () => {
    const newMember = {
      id: Date.now().toString(),
      name: '',
      role: '',
      image: '',
      description: ''
    };
    const newTeam = [...formData.team, newMember];
    handleChange('team', newTeam);
  };

  const updateTeamMember = (index: number, field: string, value: string) => {
    const newTeam = formData.team.map((member, i) => 
      i === index ? { ...member, [field]: value } : member
    );
    handleChange('team', newTeam);
  };

  const removeTeamMember = (index: number) => {
    const newTeam = formData.team.filter((_, i) => i !== index);
    handleChange('team', newTeam);
  };

  const addValue = () => {
    const newValue = {
      title: '',
      description: '',
      icon: 'shield'
    };
    const newValues = [...formData.values, newValue];
    handleChange('values', newValues);
  };

  const updateValue = (index: number, field: string, value: string) => {
    const newValues = formData.values.map((val, i) => 
      i === index ? { ...val, [field]: value } : val
    );
    handleChange('values', newValues);
  };

  const removeValue = (index: number) => {
    const newValues = formData.values.filter((_, i) => i !== index);
    handleChange('values', newValues);
  };

  const addStat = () => {
    const newStat = {
      label: '',
      value: '',
      icon: 'users'
    };
    const newStats = [...formData.stats, newStat];
    handleChange('stats', newStats);
  };

  const updateStat = (index: number, field: string, value: string) => {
    const newStats = formData.stats.map((stat, i) => 
      i === index ? { ...stat, [field]: value } : stat
    );
    handleChange('stats', newStats);
  };

  const removeStat = (index: number) => {
    const newStats = formData.stats.filter((_, i) => i !== index);
    handleChange('stats', newStats);
  };

  const iconOptions = [
    'shield', 'heart', 'users', 'award', 'star', 'globe', 'truck', 'check'
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">About Page Content</h2>
        <p className="text-gray-600">Customize your about page sections and company information.</p>
      </div>

      <div className="space-y-6">
        {/* Basic Info */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Page Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="About EverShop"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Page Subtitle
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => handleChange('subtitle', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your trusted partner for quality electronics"
              />
            </div>
          </div>
        </div>

        {/* Company Story */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Company Story
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Our Story
            </label>
            <textarea
              value={formData.story}
              onChange={(e) => handleChange('story', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Tell your company's story..."
            />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Mission & Vision
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mission Statement
              </label>
              <textarea
                value={formData.mission}
                onChange={(e) => handleChange('mission', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Our mission..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vision Statement
              </label>
              <textarea
                value={formData.vision}
                onChange={(e) => handleChange('vision', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Our vision..."
              />
            </div>
          </div>
        </div>

        {/* Company Values */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Company Values</h3>
            <button
              onClick={addValue}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Value
            </button>
          </div>
          
          <div className="space-y-4">
            {formData.values.map((value, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Value {index + 1}</h4>
                  <button
                    onClick={() => removeValue(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={value.title}
                      onChange={(e) => updateValue(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Quality Assurance"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icon
                    </label>
                    <select
                      value={value.icon}
                      onChange={(e) => updateValue(index, 'icon', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {iconOptions.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon.charAt(0).toUpperCase() + icon.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={value.description}
                      onChange={(e) => updateValue(index, 'description', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Description of this value..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Award className="h-5 w-5 mr-2" />
              Company Statistics
            </h3>
            <button
              onClick={addStat}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Stat
            </button>
          </div>
          
          <div className="space-y-4">
            {formData.stats.map((stat, index) => (
              <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Statistic {index + 1}</h4>
                  <button
                    onClick={() => removeStat(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Label
                    </label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => updateStat(index, 'label', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Happy Customers"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Value
                    </label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) => updateStat(index, 'value', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="50,000+"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Icon
                    </label>
                    <select
                      value={stat.icon}
                      onChange={(e) => updateStat(index, 'icon', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {iconOptions.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon.charAt(0).toUpperCase() + icon.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Members */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
            <button
              onClick={addTeamMember}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Team Member
            </button>
          </div>
          
          <div className="space-y-4">
            {formData.team.map((member, index) => (
              <div key={member.id} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Team Member {index + 1}</h4>
                  <button
                    onClick={() => removeTeamMember(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => updateTeamMember(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Role
                    </label>
                    <input
                      type="text"
                      value={member.role}
                      onChange={(e) => updateTeamMember(index, 'role', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="CEO & Founder"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Photo URL
                  </label>
                  <input
                    type="url"
                    value={member.image}
                    onChange={(e) => updateTeamMember(index, 'image', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={member.description}
                    onChange={(e) => updateTeamMember(index, 'description', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Brief description about this team member..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}