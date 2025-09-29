import React, { useState, useEffect } from 'react';
import { 
  Stethoscope, 
  Search, 
  Filter, 
  User,
  Mail,
  Phone,
  Shield,
  CheckCircle,
  X,
  AlertCircle,
} from 'lucide-react';
import { adminAPI } from '../../api/api';
import { mockDoctors } from '../../data/mockData';

/**
 * Admin Doctors Page
 * 
 * Purpose: Manage doctor accounts, approve ABHA integration, and view performance metrics
 * 
 * Features:
 * - Doctor list with search and filtering
 * - ABHA approval workflow
 * - Doctor performance metrics
 * - License and credential management
 * - Activity logs and audit trail
 * - Responsive design with healthcare theming
 */
const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [showDoctorModal, setShowDoctorModal] = useState(false);

  // Fetch doctors data
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API call delay for realistic loading experience
        await new Promise(resolve => setTimeout(resolve, 300));

        // Use comprehensive mock data
        setDoctors(mockDoctors);
        setFilteredDoctors(mockDoctors);
      } catch (err) {
        console.error('Doctors fetch error:', err);
        setError('Failed to load doctors');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Filter doctors based on search term and status
  useEffect(() => {
    let filtered = doctors;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.phone.includes(searchTerm) ||
        doctor.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(doctor => doctor.status === statusFilter);
    }

    setFilteredDoctors(filtered);
  }, [searchTerm, statusFilter, doctors]);

  // Handle doctor approval
  const handleDoctorApproval = async (doctorId) => {
    try {
      await adminAPI.approveDoctor(doctorId);
      
      // Update local state
      setDoctors(prev => prev.map(doctor => 
        doctor.id === doctorId 
          ? { ...doctor, status: 'active', abhaApproved: true } 
          : doctor
      ));
      
      // Update selected doctor if it's the same doctor
      if (selectedDoctor && selectedDoctor.id === doctorId) {
        setSelectedDoctor(prev => ({ 
          ...prev, 
          status: 'active', 
          abhaApproved: true 
        }));
      }
      
      alert('Doctor approved successfully!');
    } catch (err) {
      console.error('Doctor approval error:', err);
      alert('Failed to approve doctor');
    }
  };

  // Handle doctor status update
  const handleStatusUpdate = async (doctorId, newStatus) => {
    try {
      await adminAPI.updateUser(doctorId, { status: newStatus });
      
      // Update local state
      setDoctors(prev => prev.map(doctor => 
        doctor.id === doctorId ? { ...doctor, status: newStatus } : doctor
      ));
      
      // Update selected doctor if it's the same doctor
      if (selectedDoctor && selectedDoctor.id === doctorId) {
        setSelectedDoctor(prev => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      console.error('Status update error:', err);
      alert('Failed to update doctor status');
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
      case 'pending_approval':
        return 'text-yellow-600 bg-yellow-100';
      case 'suspended':
        return 'text-red-600 bg-red-100';
      case 'inactive':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Doctors</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="btn-primary"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">
            Doctor Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage doctor accounts and approve ABHA integration
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Stethoscope className="h-5 w-5 text-mint-600" />
          <span className="text-sm font-medium text-gray-600">
            {filteredDoctors.length} doctors
          </span>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors by name, email, license, or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          
          <div className="sm:w-48">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input-field pl-10"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending_approval">Pending Approval</option>
                <option value="suspended">Suspended</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Doctors List */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specialty & License
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ABHA Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Performance
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDoctors.map((doctor) => (
                <tr key={doctor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Stethoscope className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {doctor.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {doctor.qualification}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{doctor.specialty}</div>
                    <div className="text-sm text-gray-500">{doctor.licenseNumber}</div>
                    <div className="text-sm text-gray-500">{doctor.experience}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        doctor.abhaApproved 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {doctor.abhaApproved ? 'Approved' : 'Pending'}
                      </span>
                      <div className="text-sm text-gray-500">
                        {doctor.abhaId}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {doctor.totalPatients} patients
                    </div>
                    <div className="text-sm text-gray-500">
                      {doctor.totalEncounters} encounters
                    </div>
                    {doctor.averageRating > 0 && (
                      <div className="text-sm text-gray-500">
                        ⭐ {doctor.averageRating}/5.0
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doctor.status)}`}>
                      {doctor.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatTimestamp(doctor.lastLogin)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => {
                          setSelectedDoctor(doctor);
                          setShowDoctorModal(true);
                        }}
                        className="text-mint-600 hover:text-mint-700"
                        title="View details"
                      >
                        <User className="h-4 w-4" />
                      </button>
                      
                      {doctor.status === 'pending_approval' && (
                        <button
                          onClick={() => handleDoctorApproval(doctor.id)}
                          className="text-green-600 hover:text-green-700"
                          title="Approve doctor"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => handleStatusUpdate(doctor.id, doctor.status === 'active' ? 'suspended' : 'active')}
                        className={`${
                          doctor.status === 'active' 
                            ? 'text-yellow-600 hover:text-yellow-700' 
                            : 'text-green-600 hover:text-green-700'
                        }`}
                        title={doctor.status === 'active' ? 'Suspend' : 'Activate'}
                      >
                        {doctor.status === 'active' ? <X className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <Stethoscope className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Doctors Found</h3>
            <p className="text-gray-600">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria'
                : 'No doctors registered yet'
              }
            </p>
          </div>
        )}
      </div>

      {/* Doctor Detail Modal */}
      {showDoctorModal && selectedDoctor && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-heading font-semibold text-gray-900">
                  Doctor Details
                </h2>
                <button
                  onClick={() => setShowDoctorModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Professional Information</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Name:</span>
                      <p className="font-medium">{selectedDoctor.name}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Specialty:</span>
                      <p className="font-medium">{selectedDoctor.specialty}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Qualification:</span>
                      <p className="font-medium">{selectedDoctor.qualification}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Experience:</span>
                      <p className="font-medium">{selectedDoctor.experience}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">License Number:</span>
                      <p className="font-medium">{selectedDoctor.licenseNumber}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Hospital:</span>
                      <p className="font-medium">{selectedDoctor.hospital}</p>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Contact Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{selectedDoctor.email}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span>{selectedDoctor.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 text-gray-400 mr-2" />
                      <span>ABHA ID: {selectedDoctor.abhaId}</span>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Performance Metrics</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Total Patients:</span>
                      <p className="font-medium">{selectedDoctor.totalPatients}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Total Encounters:</span>
                      <p className="font-medium">{selectedDoctor.totalEncounters}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Average Rating:</span>
                      <p className="font-medium">
                        {selectedDoctor.averageRating > 0 ? `⭐ ${selectedDoctor.averageRating}/5.0` : 'No ratings yet'}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-600">Registration Date:</span>
                      <p className="font-medium">{formatDate(selectedDoctor.registrationDate)}</p>
                    </div>
                  </div>
                </div>

                {/* Status Information */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Status Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Account Status:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedDoctor.status)}`}>
                        {selectedDoctor.status.replace('_', ' ')}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">ABHA Approval:</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        selectedDoctor.abhaApproved 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {selectedDoctor.abhaApproved ? 'Approved' : 'Pending'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Last Login:</span>
                      <span>{formatTimestamp(selectedDoctor.lastLogin)}</span>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Address</h3>
                  <p className="text-sm text-gray-600">{selectedDoctor.address}</p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => setShowDoctorModal(false)}
                  className="btn-secondary"
                >
                  Close
                </button>
                {selectedDoctor.status === 'pending_approval' && (
                  <button
                    onClick={() => {
                      handleDoctorApproval(selectedDoctor.id);
                      setShowDoctorModal(false);
                    }}
                    className="btn-primary"
                  >
                    Approve Doctor
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;
