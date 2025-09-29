import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Stethoscope, Filter, ChevronLeft, ChevronRight, CheckCircle, Clock3, XCircle, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

/**
 * Appointments List Page
 * 
 * Purpose: Display and manage patient appointments
 * 
 * Features:
 * - List all appointments with status
 * - Filter by status (upcoming, completed, cancelled)
 * - Search functionality
 * - Cancel appointment option
 * - Blue theme integration
 */
const Appointments = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;

  // Mock appointment data - in real app, this would come from API
  const mockAppointments = [
    {
      id: 1,
      doctor: 'Dr. Rajesh Kumar',
      specialty: 'General Physician',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'upcoming',
      type: 'consultation',
      fees: 500,
      location: 'Room 101, Main Building',
      reason: 'Regular health checkup'
    },
    {
      id: 2,
      doctor: 'Dr. Priya Sharma',
      specialty: 'Pediatrician',
      date: '2024-01-10',
      time: '02:30 PM',
      status: 'completed',
      type: 'follow-up',
      fees: 600,
      location: 'Room 205, Children\'s Wing',
      reason: 'Follow-up for child vaccination'
    },
    {
      id: 3,
      doctor: 'Dr. Amit Patel',
      specialty: 'Cardiologist',
      date: '2024-01-08',
      time: '11:00 AM',
      status: 'cancelled',
      type: 'consultation',
      fees: 800,
      location: 'Cardiology Department',
      reason: 'Heart checkup'
    },
    {
      id: 4,
      doctor: 'Dr. Anita Desai',
      specialty: 'Gynecologist',
      date: '2024-01-20',
      time: '09:15 AM',
      status: 'upcoming',
      type: 'consultation',
      fees: 700,
      location: 'Room 302, Women\'s Health Center',
      reason: 'Annual checkup'
    },
    {
      id: 5,
      doctor: 'Dr. Vikram Singh',
      specialty: 'Orthopedic',
      date: '2024-01-12',
      time: '04:00 PM',
      status: 'completed',
      type: 'consultation',
      fees: 750,
      location: 'Orthopedic Clinic',
      reason: 'Knee pain consultation'
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch appointments
    setTimeout(() => {
      setAppointments(mockAppointments);
      setFilteredAppointments(mockAppointments);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    // Filter appointments based on status and search query
    let filtered = appointments;
    
    if (filterStatus !== 'all') {
      filtered = filtered.filter(appointment => appointment.status === filterStatus);
    }
    
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(appointment =>
        appointment.doctor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        appointment.reason.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredAppointments(filtered);
    setCurrentPage(1);
  }, [filterStatus, searchQuery, appointments]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'upcoming':
        return <Clock3 className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4" />;
      default:
        return <Calendar className="h-4 w-4" />;
    }
  };

  const handleCancelAppointment = (appointmentId) => {
    // In real app, this would make an API call
    const updatedAppointments = appointments.map(appointment =>
      appointment.id === appointmentId
        ? { ...appointment, status: 'cancelled' }
        : appointment
    );
    setAppointments(updatedAppointments);
  };

  // Pagination logic
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
  const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-700">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-900 mb-2">My Appointments</h1>
              <p className="text-blue-700">Manage your healthcare appointments</p>
            </div>
            <Link
              to="/app/appointments/new"
              className="px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-lg font-medium hover:from-blue-800 hover:to-blue-900 transition-all duration-200 shadow-lg flex items-center"
            >
              <Calendar className="h-5 w-5 mr-2" />
              Book New Appointment
            </Link>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Stethoscope className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by doctor, specialty, or reason..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="upcoming">Upcoming</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-blue-900">
              {filterStatus === 'all' ? 'All Appointments' : `${filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Appointments`}
              <span className="text-sm font-normal text-gray-500 ml-2">({filteredAppointments.length} total)</span>
            </h2>
          </div>

          {currentAppointments.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {currentAppointments.map((appointment) => (
                <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">{appointment.doctor}</h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                            {getStatusIcon(appointment.status)}
                            <span className="ml-1">{appointment.status}</span>
                          </span>
                        </div>
                        <p className="text-blue-600 font-medium mb-1">{appointment.specialty}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                            {new Date(appointment.date).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-2 text-gray-400" />
                            {appointment.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                            {appointment.location}
                          </div>
                          <div className="flex items-center">
                            <Stethoscope className="h-4 w-4 mr-2 text-gray-400" />
                            {appointment.type}
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Reason:</span> {appointment.reason}
                          </p>
                          <p className="text-sm font-semibold text-blue-700 mt-1">
                            Consultation Fee: ₹{appointment.fees}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {appointment.status === 'upcoming' && (
                      <div className="flex space-x-2">
                        <Link
                          to={`/app/appointments/${appointment.id}`}
                          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200 transition-colors duration-200"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => handleCancelAppointment(appointment.id)}
                          className="px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
              <p className="text-gray-500 mb-6">
                {searchQuery ? 'Try adjusting your search terms' : 'You don\'t have any appointments yet.'}
              </p>
              {!searchQuery && (
                <Link
                  to="/app/appointments/new"
                  className="px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-lg font-medium hover:from-blue-800 hover:to-blue-900 transition-all duration-200 shadow-lg inline-flex items-center"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Your First Appointment
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstAppointment + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastAppointment, filteredAppointments.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredAppointments.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Previous</span>
                    <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                  </button>
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => paginate(index + 1)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === index + 1
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="sr-only">Next</span>
                    <ChevronRight className="h-5 w-5" aria-hidden="true" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;