import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar, 
  FileText, 
  Pill, 
  Activity, 
  Heart, 
  Thermometer,
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
// import { userAPI } from '../../api/api';

/**
 * User Dashboard Page
 * 
 * Purpose: Patient dashboard showing health overview, upcoming appointments, prescriptions, and recent visits
 * 
 * Features:
 * - Health stats overview (vitals, medications)
 * - Upcoming appointments with quick actions
 * - Recent prescriptions with refill status
 * - Recent medical encounters/visits
 * - Quick access to key features
 * - Responsive card-based layout
 * - Loading states and error handling
 */
const Dashboard = () => {
  const { user } = useAuth();
  const [dashboardData, setDashboardData] = useState({
    upcomingAppointments: [],
    recentPrescriptions: [],
    recentEncounters: [],
    healthStats: {}
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API call delay for realistic loading experience
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mock data for demonstration (replace with actual API responses)
        const mockData = {
          upcomingAppointments: [
            {
              id: 1,
              date: '2024-01-15',
              time: '10:00 AM',
              doctor: 'Dr. Priya Sharma',
              specialty: 'Cardiology',
              status: 'confirmed'
            },
            {
              id: 2,
              date: '2024-01-20',
              time: '2:30 PM',
              doctor: 'Dr. Rajesh Kumar',
              specialty: 'General Medicine',
              status: 'pending'
            }
          ],
          recentPrescriptions: [
            {
              id: 1,
              medication: 'Metformin 500mg',
              dosage: 'Twice daily',
              prescribedBy: 'Dr. Priya Sharma',
              prescribedDate: '2024-01-10',
              refillsLeft: 2,
              nextRefillDate: '2024-02-10'
            },
            {
              id: 2,
              medication: 'Lisinopril 10mg',
              dosage: 'Once daily',
              prescribedBy: 'Dr. Rajesh Kumar',
              prescribedDate: '2024-01-08',
              refillsLeft: 0,
              nextRefillDate: null
            }
          ],
          recentEncounters: [
            {
              id: 1,
              date: '2024-01-10',
              type: 'Follow-up',
              doctor: 'Dr. Priya Sharma',
              diagnosis: 'Type 2 Diabetes',
              status: 'completed'
            },
            {
              id: 2,
              date: '2024-01-05',
              type: 'Consultation',
              doctor: 'Dr. Rajesh Kumar',
              diagnosis: 'Hypertension',
              status: 'completed'
            }
          ],
          healthStats: {
            bloodPressure: '120/80',
            heartRate: '72 bpm',
            temperature: '98.6°F',
            weight: '70 kg',
            lastUpdated: '2024-01-12'
          }
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

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'completed':
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
          Welcome back, {user?.name || 'Patient'}!
        </h1>
        <p className="text-mint-100">
          Here&apos;s your health overview for today
        </p>
      </div>

      {/* Health Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Blood Pressure</p>
              <p className="text-2xl font-heading font-semibold text-gray-900">
                {dashboardData.healthStats.bloodPressure}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Heart Rate</p>
              <p className="text-2xl font-heading font-semibold text-gray-900">
                {dashboardData.healthStats.heartRate}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Thermometer className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Temperature</p>
              <p className="text-2xl font-heading font-semibold text-gray-900">
                {dashboardData.healthStats.temperature}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Weight</p>
              <p className="text-2xl font-heading font-semibold text-gray-900">
                {dashboardData.healthStats.weight}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-heading font-semibold text-gray-900">
              Upcoming Appointments
            </h2>
            <Link
              to="/appointments"
              className="text-sm text-mint-600 hover:text-mint-700 font-medium"
            >
              View all
            </Link>
          </div>
          
          <div className="space-y-4">
            {dashboardData.upcomingAppointments.length > 0 ? (
              dashboardData.upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-mint-100 rounded-lg flex items-center justify-center">
                      <Calendar className="h-5 w-5 text-mint-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{appointment.doctor}</p>
                      <p className="text-sm text-gray-600">{appointment.specialty}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(appointment.date)} at {appointment.time}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                    {appointment.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No upcoming appointments</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Prescriptions */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-heading font-semibold text-gray-900">
              Recent Prescriptions
            </h2>
            <Link
              to="/prescriptions"
              className="text-sm text-mint-600 hover:text-mint-700 font-medium"
            >
              View all
            </Link>
          </div>
          
          <div className="space-y-4">
            {dashboardData.recentPrescriptions.length > 0 ? (
              dashboardData.recentPrescriptions.map((prescription) => (
                <div key={prescription.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Pill className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{prescription.medication}</p>
                        <p className="text-sm text-gray-600">{prescription.dosage}</p>
                        <p className="text-sm text-gray-500">
                          By {prescription.prescribedBy} on {formatDate(prescription.prescribedDate)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {prescription.refillsLeft} refills left
                      </p>
                      {prescription.nextRefillDate && (
                        <p className="text-xs text-gray-500">
                          Next: {formatDate(prescription.nextRefillDate)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Pill className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                <p>No recent prescriptions</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Medical Encounters */}
      <div className="card">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-heading font-semibold text-gray-900">
            Recent Medical Visits
          </h2>
          <Link
            to="/records"
            className="text-sm text-mint-600 hover:text-mint-700 font-medium"
          >
            View all records
          </Link>
        </div>
        
        <div className="space-y-4">
          {dashboardData.recentEncounters.length > 0 ? (
            dashboardData.recentEncounters.map((encounter) => (
              <div key={encounter.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{encounter.type}</p>
                    <p className="text-sm text-gray-600">{encounter.doctor}</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(encounter.date)} • {encounter.diagnosis}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(encounter.status)}`}>
                    {encounter.status}
                  </span>
                  <Link
                    to={`/records/${encounter.id}`}
                    className="text-mint-600 hover:text-mint-700"
                  >
                    <Clock className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>No recent medical visits</p>
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
            to="/appointments/new"
            className="flex items-center p-4 bg-mint-50 rounded-lg hover:bg-mint-100 transition-colors duration-200"
          >
            <Calendar className="h-6 w-6 text-mint-600 mr-3" />
            <span className="font-medium text-mint-700">Book Appointment</span>
          </Link>
          
          <Link
            to="/records"
            className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
          >
            <FileText className="h-6 w-6 text-blue-600 mr-3" />
            <span className="font-medium text-blue-700">View Records</span>
          </Link>
          
          <Link
            to="/profile"
            className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200"
          >
            <Activity className="h-6 w-6 text-green-600 mr-3" />
            <span className="font-medium text-green-700">Update Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
