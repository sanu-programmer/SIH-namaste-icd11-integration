import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Shield,
  Link as LinkIcon,
  Save,
  Edit,
  Check,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Profile Page
 * 
 * Purpose: Allow users to view and edit their personal information, manage ABHA linking, and view consent history
 * 
 * Features:
 * - Personal information display and editing
 * - ABHA ID linking functionality
 * - Consent history management
 * - Profile picture upload (placeholder)
 * - Form validation and error handling
 * - Responsive design with healthcare theming
 * - Accessibility support with proper labels
 */
const Profile = () => {
  const { user, updateProfile, linkAbha, error, clearError } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    emergencyContact: '',
    medicalHistory: '',
    allergies: '',
    currentMedications: ''
  });
  const [abhaData, setAbhaData] = useState({
    abhaId: '',
    abhaNumber: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form data from user context
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || '',
        emergencyContact: user.emergencyContact || '',
        medicalHistory: user.medicalHistory || '',
        allergies: user.allergies || '',
        currentMedications: user.currentMedications || ''
      });
      
      setAbhaData({
        abhaId: user.abhaId || '',
        abhaNumber: user.abhaNumber || ''
      });
    }
  }, [user]);

  // Clear errors when component mounts
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle ABHA data changes
  const handleAbhaChange = (e) => {
    const { name, value } = e.target;
    setAbhaData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    clearError();

    try {
      const result = await updateProfile(formData);
      
      if (result.success) {
        setIsEditing(false);
      }
    } catch (err) {
      console.error('Profile update error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle ABHA linking
  const handleLinkAbha = async (e) => {
    e.preventDefault();
    
    if (!abhaData.abhaId.trim() || !abhaData.abhaNumber.trim()) {
      setErrors(prev => ({
        ...prev,
        abha: 'Both ABHA ID and ABHA Number are required'
      }));
      return;
    }

    setIsSubmitting(true);
    clearError();

    try {
      const result = await linkAbha(abhaData);
      
      if (result.success) {
        setErrors(prev => ({
          ...prev,
          abha: ''
        }));
      }
    } catch (err) {
      console.error('ABHA linking error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
    
    // Reset form data to original user data
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        dateOfBirth: user.dateOfBirth || '',
        gender: user.gender || '',
        emergencyContact: user.emergencyContact || '',
        medicalHistory: user.medicalHistory || '',
        allergies: user.allergies || '',
        currentMedications: user.currentMedications || ''
      });
    }
  };

  // Mock consent history data
  const consentHistory = [
    {
      id: 1,
      date: '2024-01-10',
      type: 'Data Sharing Consent',
      status: 'Active',
      description: 'Consent to share medical data with healthcare providers'
    },
    {
      id: 2,
      date: '2024-01-05',
      type: 'Research Participation',
      status: 'Active',
      description: 'Consent to participate in medical research studies'
    },
    {
      id: 3,
      date: '2023-12-20',
      type: 'Emergency Contact Access',
      status: 'Active',
      description: 'Consent for emergency contact to access medical information'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">
            Profile Settings
          </h1>
          <p className="text-gray-600 mt-1">
            Manage your personal information and healthcare preferences
          </p>
        </div>
        
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center px-4 py-2 bg-mint-600 hover:bg-mint-700 text-white rounded-lg transition-colors duration-200"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </button>
        )}
      </div>

      {/* Global Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        </div>
      )}

      {/* Profile Information */}
      <div className="card">
        <div className="flex items-center space-x-4 mb-6">
          <div className="h-20 w-20 bg-mint-100 rounded-full flex items-center justify-center">
            <User className="h-10 w-10 text-mint-600" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-semibold text-gray-900">
              Personal Information
            </h2>
            <p className="text-gray-600">
              Update your personal details and contact information
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`input-field pl-10 ${!isEditing ? 'bg-gray-50' : ''} ${errors.name ? 'border-red-300' : ''}`}
                  placeholder="Enter your full name"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`input-field pl-10 ${!isEditing ? 'bg-gray-50' : ''} ${errors.email ? 'border-red-300' : ''}`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`input-field pl-10 ${!isEditing ? 'bg-gray-50' : ''} ${errors.phone ? 'border-red-300' : ''}`}
                  placeholder="Enter your phone number"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                Date of Birth
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`input-field pl-10 ${!isEditing ? 'bg-gray-50' : ''} ${errors.dateOfBirth ? 'border-red-300' : ''}`}
                />
              </div>
              {errors.dateOfBirth && (
                <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                disabled={!isEditing}
                className={`input-field ${!isEditing ? 'bg-gray-50' : ''} ${errors.gender ? 'border-red-300' : ''}`}
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer-not-to-say">Prefer not to say</option>
              </select>
              {errors.gender && (
                <p className="mt-1 text-sm text-red-600">{errors.gender}</p>
              )}
            </div>

            {/* Emergency Contact */}
            <div>
              <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-1">
                Emergency Contact
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  id="emergencyContact"
                  name="emergencyContact"
                  type="tel"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`input-field pl-10 ${!isEditing ? 'bg-gray-50' : ''}`}
                  placeholder="Emergency contact number"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <textarea
                id="address"
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                disabled={!isEditing}
                className={`input-field pl-10 ${!isEditing ? 'bg-gray-50' : ''}`}
                placeholder="Enter your address"
              />
            </div>
          </div>

          {/* Medical Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="allergies" className="block text-sm font-medium text-gray-700 mb-1">
                Allergies
              </label>
              <textarea
                id="allergies"
                name="allergies"
                rows={3}
                value={formData.allergies}
                onChange={handleChange}
                disabled={!isEditing}
                className={`input-field ${!isEditing ? 'bg-gray-50' : ''}`}
                placeholder="List any known allergies"
              />
            </div>

            <div>
              <label htmlFor="currentMedications" className="block text-sm font-medium text-gray-700 mb-1">
                Current Medications
              </label>
              <textarea
                id="currentMedications"
                name="currentMedications"
                rows={3}
                value={formData.currentMedications}
                onChange={handleChange}
                disabled={!isEditing}
                className={`input-field ${!isEditing ? 'bg-gray-50' : ''}`}
                placeholder="List current medications"
              />
            </div>
          </div>

          {/* Medical History */}
          <div>
            <label htmlFor="medicalHistory" className="block text-sm font-medium text-gray-700 mb-1">
              Medical History
            </label>
            <textarea
              id="medicalHistory"
              name="medicalHistory"
              rows={4}
              value={formData.medicalHistory}
              onChange={handleChange}
              disabled={!isEditing}
              className={`input-field ${!isEditing ? 'bg-gray-50' : ''}`}
              placeholder="Describe your medical history"
            />
          </div>

          {/* Form Actions */}
          {isEditing && (
            <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 rounded-lg transition-colors duration-200"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center px-4 py-2 bg-mint-600 hover:bg-mint-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
      </div>

      {/* ABHA Integration */}
      <div className="card">
        <div className="flex items-center space-x-3 mb-6">
          <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Shield className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-heading font-semibold text-gray-900">
              ABHA Integration
            </h2>
            <p className="text-gray-600">
              Link your ABHA ID for seamless healthcare access
            </p>
          </div>
        </div>

        {user?.abhaId ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Check className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-green-800">ABHA ID Linked</p>
                <p className="text-sm text-green-700">
                  Your ABHA ID: {user.abhaId}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <form onSubmit={handleLinkAbha} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="abhaId" className="block text-sm font-medium text-gray-700 mb-1">
                  ABHA ID
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    id="abhaId"
                    name="abhaId"
                    type="text"
                    value={abhaData.abhaId}
                    onChange={handleAbhaChange}
                    className="input-field pl-10"
                    placeholder="Enter your ABHA ID"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="abhaNumber" className="block text-sm font-medium text-gray-700 mb-1">
                  ABHA Number
                </label>
                <input
                  id="abhaNumber"
                  name="abhaNumber"
                  type="text"
                  value={abhaData.abhaNumber}
                  onChange={handleAbhaChange}
                  className="input-field"
                  placeholder="Enter your ABHA Number"
                />
              </div>
            </div>

            {errors.abha && (
              <p className="text-sm text-red-600">{errors.abha}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              <LinkIcon className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Linking...' : 'Link ABHA ID'}
            </button>
          </form>
        )}
      </div>

      {/* Consent History */}
      <div className="card">
        <h2 className="text-xl font-heading font-semibold text-gray-900 mb-6">
          Consent History
        </h2>
        
        <div className="space-y-4">
          {consentHistory.map((consent) => (
            <div key={consent.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">{consent.type}</h3>
                <p className="text-sm text-gray-600">{consent.description}</p>
                <p className="text-xs text-gray-500 mt-1">
                  Given on {new Date(consent.date).toLocaleDateString()}
                </p>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                {consent.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
