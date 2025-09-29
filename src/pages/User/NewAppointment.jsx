import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Mail, MapPin, Stethoscope, Search, ChevronLeft, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

/**
 * New Appointment Booking Page
 * 
 * Purpose: Allows patients to book new appointments with doctors
 * 
 * Features:
 * - Doctor search and filtering
 * - Date and time selection
 * - Appointment type selection
 * - Form validation
 * - Success confirmation
 * - Blue theme integration
 */
const NewAppointment = () => {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('consultation');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    patientName: user?.name || '',
    patientEmail: user?.email || '',
    patientPhone: user?.phone || '',
    reason: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Mock doctor data - in real app, this would come from API
  const mockDoctors = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      specialty: 'General Physician',
      experience: '12 years',
      rating: 4.8,
      availability: 'Available Today',
      image: '/doctor1.jpg',
      fees: 500,
      timeSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM']
    },
    {
      id: 2,
      name: 'Dr. Priya Sharma',
      specialty: 'Pediatrician',
      experience: '8 years',
      rating: 4.9,
      availability: 'Available Tomorrow',
      image: '/doctor2.jpg',
      fees: 600,
      timeSlots: ['09:30 AM', '10:30 AM', '11:30 AM', '01:30 PM', '02:30 PM', '03:30 PM']
    },
    {
      id: 3,
      name: 'Dr. Amit Patel',
      specialty: 'Cardiologist',
      experience: '15 years',
      rating: 4.7,
      availability: 'Available in 2 days',
      image: '/doctor3.jpg',
      fees: 800,
      timeSlots: ['10:00 AM', '11:00 AM', '12:00 PM', '03:00 PM', '04:00 PM', '05:00 PM']
    },
    {
      id: 4,
      name: 'Dr. Anita Desai',
      specialty: 'Gynecologist',
      experience: '10 years',
      rating: 4.6,
      availability: 'Available Today',
      image: '/doctor4.jpg',
      fees: 700,
      timeSlots: ['09:15 AM', '10:15 AM', '11:15 AM', '02:15 PM', '03:15 PM', '04:15 PM']
    }
  ];

  useEffect(() => {
    // Simulate API call to fetch doctors
    setDoctors(mockDoctors);
    setFilteredDoctors(mockDoctors);
  }, []);

  useEffect(() => {
    // Filter doctors based on search query
    if (searchQuery.trim() === '') {
      setFilteredDoctors(doctors);
    } else {
      const filtered = doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredDoctors(filtered);
    }
  }, [searchQuery, doctors]);

  const validateStep = () => {
    const newErrors = {};
    
    switch (step) {
      case 1:
        if (!selectedDoctor) {
          newErrors.doctor = 'Please select a doctor';
        }
        break;
      case 2:
        if (!selectedDate) {
          newErrors.date = 'Please select a date';
        }
        if (!selectedTime) {
          newErrors.time = 'Please select a time slot';
        }
        break;
      case 3:
        if (!formData.patientName.trim()) {
          newErrors.patientName = 'Patient name is required';
        }
        if (!formData.patientEmail.trim()) {
          newErrors.patientEmail = 'Patient email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.patientEmail)) {
          newErrors.patientEmail = 'Please enter a valid email';
        }
        if (!formData.patientPhone.trim()) {
          newErrors.patientPhone = 'Patient phone is required';
        }
        if (!formData.reason.trim()) {
          newErrors.reason = 'Please provide a reason for appointment';
        }
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setBookingSuccess(true);
    }, 2000);
  };

  const generateTimeSlots = () => {
    const slots = [];
    const startTime = 9;
    const endTime = 17;
    
    for (let hour = startTime; hour <= endTime; hour++) {
      for (let minute of [0, 30]) {
        if (hour === endTime && minute === 30) break;
        const time = new Date(2000, 0, 1, hour, minute);
        slots.push(time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }));
      }
    }
    return slots;
  };

  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        date: date.toISOString().split('T')[0],
        display: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
      });
    }
    return dates;
  };

  if (bookingSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50">
        <div className="max-w-2xl mx-auto py-16 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Appointment Booked Successfully!</h1>
            <p className="text-gray-600 mb-8">
              Your appointment with <strong>{selectedDoctor.name}</strong> has been confirmed for{' '}
              <strong>{new Date(selectedDate).toLocaleDateString()}</strong> at <strong>{selectedTime}</strong>.
            </p>
            <div className="bg-blue-50 rounded-lg p-4 mb-8">
              <h3 className="font-semibold text-blue-900 mb-2">Appointment Details:</h3>
              <div className="text-sm text-blue-700 space-y-1">
                <p><strong>Doctor:</strong> {selectedDoctor.name} ({selectedDoctor.specialty})</p>
                <p><strong>Date:</strong> {new Date(selectedDate).toLocaleDateString()}</p>
                <p><strong>Time:</strong> {selectedTime}</p>
                <p><strong>Type:</strong> {appointmentType}</p>
                <p><strong>Fees:</strong> ₹{selectedDoctor.fees}</p>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/app/dashboard'}
                className="px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-lg font-medium hover:from-blue-800 hover:to-blue-900 transition-all duration-200 shadow-lg"
              >
                Go to Dashboard
              </button>
              <button
                onClick={() => window.location.href = '/app/appointments'}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all duration-200"
              >
                View All Appointments
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50">
      <div className="max-w-6xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">Book Your Appointment</h1>
          <p className="text-blue-700">Schedule your consultation with our expert doctors</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((stepNum) => (
              <React.Fragment key={stepNum}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= stepNum ? 'bg-gradient-to-r from-blue-700 to-blue-900 text-white' : 'bg-blue-100 text-blue-600'
                }`}>
                  {step > stepNum ? <CheckCircle className="h-5 w-5" /> : stepNum}
                </div>
                {stepNum < 3 && (
                  <div className={`w-24 h-1 ${
                    step > stepNum ? 'bg-gradient-to-r from-blue-700 to-blue-900' : 'bg-blue-100'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <div className="text-center">
              <p className="text-sm font-medium text-blue-900">
                {step === 1 && 'Select Doctor'}
                {step === 2 && 'Choose Date & Time'}
                {step === 3 && 'Confirm Details'}
              </p>
            </div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {step === 1 && (
            <div>
              <div className="flex items-center mb-6">
                <Stethoscope className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-semibold text-blue-900">Select Your Doctor</h2>
              </div>
              
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search doctors by name or specialty..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Doctor List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredDoctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    onClick={() => setSelectedDoctor(doctor)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      selectedDoctor?.id === doctor.id
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-gray-200 hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-8 w-8 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                        <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                        <p className="text-sm text-gray-600">{doctor.experience} experience</p>
                        <div className="flex items-center mt-2">
                          <span className="text-yellow-500">★</span>
                          <span className="text-sm font-medium ml-1">{doctor.rating}</span>
                          <span className="text-sm text-gray-500 ml-2">• {doctor.availability}</span>
                        </div>
                        <p className="text-sm font-semibold text-blue-700 mt-2">₹{doctor.fees}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {errors.doctor && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                  <p className="text-sm text-red-600">{errors.doctor}</p>
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div>
              <div className="flex items-center mb-6">
                <Calendar className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-semibold text-blue-900">Choose Date & Time</h2>
              </div>

              {/* Appointment Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Appointment Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {['consultation', 'follow-up', 'emergency'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setAppointmentType(type)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        appointmentType === type
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Date</label>
                <div className="grid grid-cols-7 gap-2">
                  {getAvailableDates().map((dateObj) => (
                    <button
                      key={dateObj.date}
                      onClick={() => setSelectedDate(dateObj.date)}
                      className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                        selectedDate === dateObj.date
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="text-xs text-gray-500">{dateObj.display.split(' ')[0]}</div>
                      <div className="font-semibold">{dateObj.display.split(' ')[1]}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Select Time Slot</label>
                  <div className="grid grid-cols-4 gap-2">
                    {selectedDoctor?.timeSlots?.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                          selectedTime === time
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <Clock className="h-4 w-4 mx-auto mb-1" />
                        <div className="text-sm font-medium">{time}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {(errors.date || errors.time) && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center">
                  <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                  <p className="text-sm text-red-600">{errors.date || errors.time}</p>
                </div>
              )}
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="flex items-center mb-6">
                <CheckCircle className="h-6 w-6 text-blue-600 mr-3" />
                <h2 className="text-2xl font-semibold text-blue-900">Confirm Your Details</h2>
              </div>

              {/* Appointment Summary */}
              <div className="bg-blue-50 rounded-lg p-6 mb-6">
                <h3 className="font-semibold text-blue-900 mb-4">Appointment Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-blue-700 font-medium">Doctor</p>
                    <p className="text-blue-900">{selectedDoctor.name}</p>
                    <p className="text-blue-600">{selectedDoctor.specialty}</p>
                  </div>
                  <div>
                    <p className="text-blue-700 font-medium">Date & Time</p>
                    <p className="text-blue-900">{new Date(selectedDate).toLocaleDateString()}</p>
                    <p className="text-blue-600">{selectedTime}</p>
                  </div>
                  <div>
                    <p className="text-blue-700 font-medium">Type</p>
                    <p className="text-blue-900">{appointmentType}</p>
                  </div>
                  <div>
                    <p className="text-blue-700 font-medium">Consultation Fee</p>
                    <p className="text-blue-900">₹{selectedDoctor.fees}</p>
                  </div>
                </div>
              </div>

              {/* Patient Details Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name *</label>
                    <input
                      type="text"
                      value={formData.patientName}
                      onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.patientName ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.patientName && (
                      <p className="text-sm text-red-600 mt-1">{errors.patientName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      value={formData.patientPhone}
                      onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.patientPhone ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.patientPhone && (
                      <p className="text-sm text-red-600 mt-1">{errors.patientPhone}</p>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    value={formData.patientEmail}
                    onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.patientEmail ? 'border-red-300' : 'border-gray-300'
                    }`}
                  />
                  {errors.patientEmail && (
                    <p className="text-sm text-red-600 mt-1">{errors.patientEmail}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Appointment *</label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.reason ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Please describe your symptoms or reason for visit..."
                  />
                  {errors.reason && (
                    <p className="text-sm text-red-600 mt-1">{errors.reason}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes (Optional)</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Any additional information you'd like to share..."
                  />
                </div>
              </form>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="flex items-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            
            {step < 3 ? (
              <button
                onClick={handleNext}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-lg font-medium hover:from-blue-800 hover:to-blue-900 transition-all duration-200 shadow-lg"
              >
                Next
                <ChevronRight className="h-5 w-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-8 py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-lg font-medium hover:from-blue-800 hover:to-blue-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg flex items-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Booking...
                  </>
                ) : (
                  'Confirm Appointment'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAppointment;