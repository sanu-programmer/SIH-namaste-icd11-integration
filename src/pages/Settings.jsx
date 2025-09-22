import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Bell, Shield, Moon, Globe, Save, Mail, Phone } from 'lucide-react';

const Settings = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    notifications: {
      email: true,
      sms: false,
      push: true
    },
    privacy: {
      profileVisible: true,
      shareData: false,
      allowAnalytics: true
    },
    preferences: {
      theme: 'light',
      language: 'en',
      timezone: 'UTC'
    }
  });

  const [saveStatus, setSaveStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (type) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: !prev.notifications[type]
      }
    }));
  };

  const handlePrivacyChange = (type) => {
    setFormData(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [type]: !prev.privacy[type]
      }
    }));
  };

  const handlePreferenceChange = (type, value) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [type]: value
      }
    }));
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData);
      setSaveStatus('Settings saved successfully!');
      setTimeout(() => setSaveStatus(''), 3000);
    } catch (error) {
      setSaveStatus('Error saving settings. Please try again.');
      setTimeout(() => setSaveStatus(''), 3000);
    }
  };

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'privacy', name: 'Privacy', icon: Shield },
    { id: 'preferences', name: 'Preferences', icon: Globe }
  ];

  return (
    <div className="settings-page min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <div className="settings-header bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-heading font-bold text-slate-900">Settings</h1>
          <p className="text-slate-600 mt-2">Manage your account preferences and privacy settings</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-soft border border-slate-200 overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="lg:w-64 bg-slate-50 border-r border-slate-200">
              <nav className="p-4 space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'bg-primary-100 text-primary-700 border border-primary-200'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {tab.name}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Content */}
            <div className="flex-1 p-6">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">Profile Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">Notification Preferences</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 text-slate-600 mr-3" />
                          <div>
                            <h3 className="font-medium text-slate-900">Email Notifications</h3>
                            <p className="text-sm text-slate-600">Receive updates via email</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleNotificationChange('email')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            formData.notifications.email ? 'bg-primary-600' : 'bg-slate-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              formData.notifications.email ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 text-slate-600 mr-3" />
                          <div>
                            <h3 className="font-medium text-slate-900">SMS Notifications</h3>
                            <p className="text-sm text-slate-600">Receive updates via text message</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleNotificationChange('sms')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            formData.notifications.sms ? 'bg-primary-600' : 'bg-slate-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              formData.notifications.sms ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">Privacy Settings</h2>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div>
                          <h3 className="font-medium text-slate-900">Profile Visibility</h3>
                          <p className="text-sm text-slate-600">Allow others to see your profile</p>
                        </div>
                        <button
                          onClick={() => handlePrivacyChange('profileVisible')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            formData.privacy.profileVisible ? 'bg-primary-600' : 'bg-slate-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              formData.privacy.profileVisible ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div>
                          <h3 className="font-medium text-slate-900">Share Health Data</h3>
                          <p className="text-sm text-slate-600">Share anonymized health data for research</p>
                        </div>
                        <button
                          onClick={() => handlePrivacyChange('shareData')}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            formData.privacy.shareData ? 'bg-primary-600' : 'bg-slate-200'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              formData.privacy.shareData ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'preferences' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900 mb-4">Preferences</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Theme</label>
                        <select
                          value={formData.preferences.theme}
                          onChange={(e) => handlePreferenceChange('theme', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                          <option value="auto">Auto</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Language</label>
                        <select
                          value={formData.preferences.language}
                          onChange={(e) => handlePreferenceChange('language', e.target.value)}
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          <option value="en">English</option>
                          <option value="hi">Hindi</option>
                          <option value="es">Spanish</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-slate-200">
                {saveStatus && (
                  <div className={`mb-4 p-3 rounded-lg ${
                    saveStatus.includes('success') 
                      ? 'bg-green-100 text-green-800 border border-green-200'
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {saveStatus}
                  </div>
                )}
                <button
                  onClick={handleSave}
                  className="inline-flex items-center px-6 py-2 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;