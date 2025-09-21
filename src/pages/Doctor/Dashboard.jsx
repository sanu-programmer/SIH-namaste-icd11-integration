import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  Stethoscope, 
  Clock,
  Search,
  User,
  FileText,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { doctorAPI } from '../../api/api';

/**
 * Doctor Dashboard Page
 * 
 * Purpose: Doctor's main dashboard showing appointments, patient queue, and quick stats
 * 
 * Features:
 * - Today's appointments overview
 * - Patient queue management
 * - Quick patient search by ABHA
 * - Statistics and performance metrics
 * - Recent diagnoses and prescriptions
 * - Quick access to key features
 * - Responsive design with healthcare theming
 */
const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    todayAppointments: [],
    patientQueue: [],
    stats: {},
    recentDiagnoses: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch dashboard data~
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API call delay for realistic loading experience
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock data for demonstration (replace with actual API responses)
        const mockData = {
          todayAppointments: [
            {
              id: 1,
              time: '09:00 AM',
              patient: {
                name: 'Rajesh Kumar',
                age: 45,
                gender: 'Male',
                abhaId: 'ABHA-1234567890'
              },
              type: 'Follow-up',
              status: 'confirmed',
              priority: 'normal'
            },
            {
              id: 2,
              time: '10:30 AM',
              patient: {
                name: 'Priya Sharma',
                age: 32,
                gender: 'Female',
                abhaId: 'ABHA-0987654321'
              },
              type: 'Consultation',
              status: 'confirmed',
              priority: 'high'
            },
            {
              id: 3,
              time: '02:00 PM',
              patient: {
                name: 'Amit Patel',
                age: 28,
                gender: 'Male',
                abhaId: 'ABHA-1122334455'
              },
              type: 'New Patient',
              status: 'pending',
              priority: 'normal'
            }
          ],
          patientQueue: [
            {
              id: 1,
              patient: {
                name: 'Rajesh Kumar',
                age: 45,
                gender: 'Male',
                abhaId: 'ABHA-1234567890'
              },
              waitTime: '5 minutes',
              status: 'waiting',
              chiefComplaint: 'Chest pain and shortness of breath'
            },
            {
              id: 2,
              patient: {
                name: 'Priya Sharma',
                age: 32,
                gender: 'Female',
                abhaId: 'ABHA-0987654321'
              },
              waitTime: '15 minutes',
              status: 'waiting',
              chiefComplaint: 'High blood pressure'
            }
          ],
          stats: {
            totalPatients: 156,
            todayAppointments: 8,
            completedToday: 5,
            pendingDiagnoses: 3,
            averageConsultationTime: '12 minutes'
          },
          recentDiagnoses: [
            {
              id: 1,
              patient: 'Rajesh Kumar',
              diagnosis: 'Type 2 Diabetes',
              date: '2024-01-10',
              status: 'completed'
            },
            {
              id: 2,
              patient: 'Priya Sharma',
              diagnosis: 'Hypertension',
              date: '2024-01-09',
              status: 'completed'
            }
          ]
        };

        setDashboardData(mockData);
      } catch (err) {
        console.error('Dashboard data fetch error:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Handle patient search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    try {
      // Search patients by ABHA ID or name
      const response = await doctorAPI.searchPatients(searchQuery);
      console.log('Search results:', response.data);
      // Handle search results (could redirect to patient profile)
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  // Get priority color
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-100';
      case 'normal':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'waiting':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
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
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Dashboard</h3>
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
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-mint-600 to-mint-700 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-heading font-bold mb-2">
          Welcome, Dr. {user?.name || 'Doctor'}!
        </h1>
        <p className="text-mint-100">
          Here&apos;s your schedule and patient overview for today
        </p>
      </div>

      {/* Quick Patient Search */}
      <div className="card">
        <h2 className="text-lg font-heading font-semibold text-gray-900 mb-4">
          Quick Patient Search
        </h2>
        <form onSubmit={handleSearch} className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by ABHA ID, name, or phone number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn-primary"
          >
            Search
          </button>
        </form>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Patients</p>
              <p className="text-2xl font-heading font-semibold text-gray-900">
                {dashboardData.stats.totalPatients}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today&apos;s Appointments</p>
              <p className="text-2xl font-heading font-semibold text-gray-900">
                {dashboardData.stats.todayAppointments}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Stethoscope className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed Today</p>
              <p className="text-2xl font-heading font-semibold text-gray-900">
                {dashboardData.stats.completedToday}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg. Consultation</p>
              <p className="text-2xl font-heading font-semibold text-gray-900">
                {dashboardData.stats.averageConsultationTime}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Appointments */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-heading font-semibold text-gray-900">
              Today&apos;s Appointments
            </h2>
            <Link
              to="/doctor/patients"
              className="text-sm text-mint-600 hover:text-mint-700 font-medium"
            >
              View all
            </Link>
          </div>
          
          <div className="space-y-4">
            {dashboardData.todayAppointments.length > 0 ? (
              dashboardData.todayAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-mint-100 rounded-lg flex items-center justify-center">
                      <User className="h-5 w-5 text-mint-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{appointment.patient.name}</p>
                      <p className="text-sm text-gray-600">
                        {appointment.patient.age} years, {appointment.patient.gender}
                      </p>
                      <p className="text-sm text-gray-500">
                        {appointment.time} • {appointment.type}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(appointment.priority)}`}>
                      {appointment.priority}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No appointments scheduled for today</p>
              </div>
            )}
          </div>
        </div>

        {/* Patient Queue */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-heading font-semibold text-gray-900">
              Patient Queue
            </h2>
            <span className="text-sm text-gray-600">
              {dashboardData.patientQueue.length} waiting
            </span>
          </div>
          
          <div className="space-y-4">
            {dashboardData.patientQueue.length > 0 ? (
              dashboardData.patientQueue.map((patient) => (
                <div key={patient.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{patient.patient.name}</p>
                        <p className="text-sm text-gray-600">
                          {patient.patient.age} years, {patient.patient.gender}
                        </p>
                        <p className="text-sm text-gray-500">
                          ABHA: {patient.patient.abhaId}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {patient.waitTime}
                      </p>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
                        {patient.status}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Chief Complaint:</span> {patient.chiefComplaint}
                    </p>
                  </div>
                  <div className="mt-3 flex space-x-2">
                    <Link
                      to={`/doctor/patients/${patient.patient.abhaId}`}
                      className="flex-1 text-center px-3 py-2 text-sm bg-mint-600 hover:bg-mint-700 text-white rounded-lg transition-colors duration-200"
                    >
                      View Profile
                    </Link>
                    <Link
                      to={`/doctor/diagnose/${patient.patient.abhaId}`}
                      className="flex-1 text-center px-3 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                    >
                      Diagnose
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No patients in queue</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Diagnoses */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold text-gray-900">
            Recent Diagnoses
          </h2>
          <Link
            to="/doctor/patients"
            className="text-sm text-mint-600 hover:text-mint-700 font-medium"
          >
            View all
          </Link>
        </div>
        
        <div className="space-y-4">
          {dashboardData.recentDiagnoses.length > 0 ? (
            dashboardData.recentDiagnoses.map((diagnosis) => (
              <div key={diagnosis.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Stethoscope className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{diagnosis.patient}</p>
                    <p className="text-sm text-gray-600">{diagnosis.diagnosis}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(diagnosis.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(diagnosis.status)}`}>
                  {diagnosis.status}
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>No recent diagnoses</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2 className="text-lg font-heading font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/doctor/patients"
            className="flex items-center p-4 bg-mint-50 rounded-lg hover:bg-mint-100 transition-colors duration-200"
          >
            <Users className="h-6 w-6 text-mint-600 mr-3" />
            <span className="font-medium text-mint-700">View All Patients</span>
          </Link>
          
          <Link
            to="/doctor/diagnose"
            className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
          >
            <Stethoscope className="h-6 w-6 text-blue-600 mr-3" />
            <span className="font-medium text-blue-700">New Diagnosis</span>
          </Link>
          
          <Link
            to="/doctor/records"
            className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200"
          >
            <FileText className="h-6 w-6 text-green-600 mr-3" />
            <span className="font-medium text-green-700">View Records</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
