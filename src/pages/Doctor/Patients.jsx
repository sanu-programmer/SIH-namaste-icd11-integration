import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Search, 
  User, 
  Phone, 
  Calendar,
  Stethoscope,
  FileText,
  AlertCircle
} from 'lucide-react';
// import { doctorAPI } from '../../api/api';

/**
 * Doctor Patients Page
 * 
 * Purpose: List and search patients for doctors to manage their patient roster
 * 
 * Features:
 * - Patient search by ABHA ID, name, or phone
 * - Patient list with key information
 * - Quick actions (view profile, diagnose, view records)
 * - Patient status and last visit information
 * - Responsive design with healthcare theming
 * - Loading states and error handling
 */
const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch patients data
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API call delay for realistic loading experience
        await new Promise(resolve => setTimeout(resolve, 300));

        // Mock data for demonstration (replace with actual API response)
        const mockPatients = [
          {
            id: 1,
            name: 'Rajesh Kumar',
            age: 45,
            gender: 'Male',
            abhaId: 'ABHA-1234567890',
            phone: '+91-98765-43210',
            email: 'rajesh.kumar@email.com',
            lastVisit: '2024-01-10',
            status: 'active',
            primaryDiagnosis: 'Type 2 Diabetes',
            nextAppointment: '2024-01-20',
            totalVisits: 12
          },
          {
            id: 2,
            name: 'Priya Sharma',
            age: 32,
            gender: 'Female',
            abhaId: 'ABHA-0987654321',
            phone: '+91-98765-43211',
            email: 'priya.sharma@email.com',
            lastVisit: '2024-01-09',
            status: 'active',
            primaryDiagnosis: 'Hypertension',
            nextAppointment: '2024-01-25',
            totalVisits: 8
          },
          {
            id: 3,
            name: 'Amit Patel',
            age: 28,
            gender: 'Male',
            abhaId: 'ABHA-1122334455',
            phone: '+91-98765-43212',
            email: 'amit.patel@email.com',
            lastVisit: '2024-01-05',
            status: 'active',
            primaryDiagnosis: 'Acute Bronchitis',
            nextAppointment: null,
            totalVisits: 3
          },
          {
            id: 4,
            name: 'Sunita Devi',
            age: 55,
            gender: 'Female',
            abhaId: 'ABHA-5566778899',
            phone: '+91-98765-43213',
            email: 'sunita.devi@email.com',
            lastVisit: '2023-12-20',
            status: 'inactive',
            primaryDiagnosis: 'Osteoarthritis',
            nextAppointment: null,
            totalVisits: 15
          }
        ];

        setPatients(mockPatients);
        setFilteredPatients(mockPatients);
      } catch (err) {
        console.error('Patients fetch error:', err);
        setError('Failed to load patients');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  // Filter patients based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredPatients(patients);
      return;
    }

    const filtered = patients.filter(patient =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.abhaId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.primaryDiagnosis.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredPatients(filtered);
  }, [searchTerm, patients]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100';
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
              <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
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
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Patients</h3>
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
            My Patients
          </h1>
          <p className="text-gray-600 mt-1">
            Manage and view your patient roster
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Users className="h-5 w-5 text-mint-600" />
          <span className="text-sm font-medium text-gray-600">
            {filteredPatients.length} patients
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients by name, ABHA ID, phone, or diagnosis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Patients List */}
      <div className="space-y-4">
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient) => (
            <div key={patient.id} className="card">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className="h-12 w-12 bg-mint-100 rounded-lg flex items-center justify-center">
                    <User className="h-6 w-6 text-mint-600" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-heading font-semibold text-gray-900">
                        {patient.name}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
                        {patient.status}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <User className="h-4 w-4 mr-2" />
                        {patient.age} years, {patient.gender}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        {patient.phone}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Calendar className="h-4 w-4 mr-2" />
                        Last visit: {formatDate(patient.lastVisit)}
                      </div>
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">ABHA:</span> {patient.abhaId}
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Primary Diagnosis:</span> {patient.primaryDiagnosis}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Total Visits:</span> {patient.totalVisits}
                      </p>
                      {patient.nextAppointment && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Next Appointment:</span> {formatDate(patient.nextAppointment)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <Link
                    to={`/doctor/patients/${patient.abhaId}`}
                    className="flex items-center px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200"
                    title="View patient profile"
                  >
                    <User className="h-4 w-4 mr-1" />
                    Profile
                  </Link>
                  
                  <Link
                    to={`/doctor/patients/${patient.abhaId}/records`}
                    className="flex items-center px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors duration-200"
                    title="View medical records"
                  >
                    <FileText className="h-4 w-4 mr-1" />
                    Records
                  </Link>
                  
                  <Link
                    to={`/doctor/diagnose/${patient.abhaId}`}
                    className="flex items-center px-3 py-1 text-sm bg-mint-600 hover:bg-mint-700 text-white rounded-lg transition-colors duration-200"
                    title="Create new diagnosis"
                  >
                    <Stethoscope className="h-4 w-4 mr-1" />
                    Diagnose
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Patients Found</h3>
            <p className="text-gray-600">
              {searchTerm 
                ? 'Try adjusting your search criteria'
                : 'No patients assigned to you yet'
              }
            </p>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      {filteredPatients.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-heading font-semibold text-gray-900 mb-4">
            Patient Overview
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-heading font-bold text-mint-600 mb-1">
                {filteredPatients.filter(p => p.status === 'active').length}
              </div>
              <p className="text-sm text-gray-600">Active Patients</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-heading font-bold text-blue-600 mb-1">
                {filteredPatients.filter(p => p.nextAppointment).length}
              </div>
              <p className="text-sm text-gray-600">Upcoming Appointments</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-heading font-bold text-green-600 mb-1">
                {Math.round(filteredPatients.reduce((sum, p) => sum + p.totalVisits, 0) / filteredPatients.length)}
              </div>
              <p className="text-sm text-gray-600">Avg. Visits per Patient</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patients;
