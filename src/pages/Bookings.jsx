import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Bookings.css';

const Bookings = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [bookingStep, setBookingStep] = useState(1);

  const specialties = [
    { id: 'cardiology', name: 'Cardiology', icon: '❤️' },
    { id: 'dermatology', name: 'Dermatology', icon: '🩺' },
    { id: 'neurology', name: 'Neurology', icon: '🧠' },
    { id: 'orthopedics', name: 'Orthopedics', icon: '🦴' },
    { id: 'pediatrics', name: 'Pediatrics', icon: '👶' },
    { id: 'general', name: 'General Medicine', icon: '🏥' }
  ];

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'cardiology',
      image: '/api/placeholder/150/150',
      rating: 4.8,
      experience: '15 years',
      availability: 'Available'
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'dermatology',
      image: '/api/placeholder/150/150',
      rating: 4.9,
      experience: '12 years',
      availability: 'Available'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'neurology',
      image: '/api/placeholder/150/150',
      rating: 4.7,
      experience: '18 years',
      availability: 'Limited'
    },
    {
      id: 4,
      name: 'Dr. David Kim',
      specialty: 'orthopedics',
      image: '/api/placeholder/150/150',
      rating: 4.6,
      experience: '10 years',
      availability: 'Available'
    }
  ];

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
    '05:00 PM', '05:30 PM'
  ];

  const getAvailableDoctors = () => {
    return selectedSpecialty 
      ? doctors.filter(doctor => doctor.specialty === selectedSpecialty)
      : doctors;
  };

  const handleSpecialtySelect = (specialty) => {
    setSelectedSpecialty(specialty);
    setBookingStep(2);
  };

  const handleDoctorSelect = (doctorId) => {
    setSelectedDoctor(doctorId);
    setBookingStep(3);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setBookingStep(4);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setBookingStep(5);
  };

  const handleConfirmBooking = () => {
    // In a real app, this would send the booking data to a backend
    alert('Appointment booked successfully! You will receive a confirmation email shortly.');
    // Reset form
    setBookingStep(1);
    setSelectedSpecialty('');
    setSelectedDoctor('');
    setSelectedDate('');
    setSelectedTime('');
  };

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          date: date.toISOString().split('T')[0],
          day: date.toLocaleDateString('en-US', { weekday: 'short' }),
          dateNum: date.getDate()
        });
      }
    }
    
    return dates.slice(0, 10); // Return first 10 available dates
  };

  const availableDates = generateDates();

  return (
    <div className="bookings-page">
      {/* Header */}
      <div className="bookings-header">
        <div className="bookings-header-content">
          <h1 className="bookings-title">Book an Appointment</h1>
          <p className="bookings-subtitle">
            Schedule your consultation with our experienced healthcare professionals
          </p>
        </div>
      </div>

      <div className="bookings-container">
        {/* Progress Steps */}
        <div className="booking-progress">
          <div className="progress-steps">
            <div className={`progress-step ${bookingStep >= 1 ? 'active' : ''}`}>
              <div className="step-number">1</div>
              <span className="step-label">Specialty</span>
            </div>
            <div className={`progress-step ${bookingStep >= 2 ? 'active' : ''}`}>
              <div className="step-number">2</div>
              <span className="step-label">Doctor</span>
            </div>
            <div className={`progress-step ${bookingStep >= 3 ? 'active' : ''}`}>
              <div className="step-number">3</div>
              <span className="step-label">Date</span>
            </div>
            <div className={`progress-step ${bookingStep >= 4 ? 'active' : ''}`}>
              <div className="step-number">4</div>
              <span className="step-label">Time</span>
            </div>
            <div className={`progress-step ${bookingStep >= 5 ? 'active' : ''}`}>
              <div className="step-number">5</div>
              <span className="step-label">Confirm</span>
            </div>
          </div>
        </div>

        {/* Booking Steps */}
        <div className="booking-content">
          {/* Step 1: Select Specialty */}
          {bookingStep === 1 && (
            <div className="booking-step">
              <h2 className="step-title">Select a Medical Specialty</h2>
              <p className="step-description">Choose the type of specialist you need to consult with</p>
              <div className="specialties-grid">
                {specialties.map((specialty) => (
                  <div
                    key={specialty.id}
                    className="specialty-card"
                    onClick={() => handleSpecialtySelect(specialty.id)}
                  >
                    <div className="specialty-icon">{specialty.icon}</div>
                    <h3 className="specialty-name">{specialty.name}</h3>
                    <p className="specialty-description">Expert care and consultation</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Select Doctor */}
          {bookingStep === 2 && (
            <div className="booking-step">
              <div className="step-header">
                <h2 className="step-title">Choose Your Doctor</h2>
                <button 
                  className="back-button"
                  onClick={() => setBookingStep(1)}
                >
                  ← Back to Specialties
                </button>
              </div>
              <p className="step-description">Select from our available healthcare professionals</p>
              <div className="doctors-grid">
                {getAvailableDoctors().map((doctor) => (
                  <div
                    key={doctor.id}
                    className="doctor-card"
                    onClick={() => handleDoctorSelect(doctor.id)}
                  >
                    <div className="doctor-image-container">
                      <img src={doctor.image} alt={doctor.name} className="doctor-image" />
                      <div className="doctor-rating">
                        ⭐ {doctor.rating}
                      </div>
                    </div>
                    <div className="doctor-info">
                      <h3 className="doctor-name">{doctor.name}</h3>
                      <p className="doctor-specialty">
                        {specialties.find(s => s.id === doctor.specialty)?.name}
                      </p>
                      <p className="doctor-experience">{doctor.experience} experience</p>
                      <div className={`doctor-availability ${doctor.availability.toLowerCase()}`}>
                        {doctor.availability}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Select Date */}
          {bookingStep === 3 && (
            <div className="booking-step">
              <div className="step-header">
                <h2 className="step-title">Select Appointment Date</h2>
                <button 
                  className="back-button"
                  onClick={() => setBookingStep(2)}
                >
                  ← Back to Doctors
                </button>
              </div>
              <p className="step-description">Choose a convenient date for your consultation</p>
              <div className="dates-grid">
                {availableDates.map((date, index) => (
                  <div
                    key={index}
                    className={`date-card ${selectedDate === date.date ? 'selected' : ''}`}
                    onClick={() => handleDateSelect(date.date)}
                  >
                    <div className="date-day">{date.day}</div>
                    <div className="date-number">{date.dateNum}</div>
                    <div className="date-month">Dec 2024</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Select Time */}
          {bookingStep === 4 && (
            <div className="booking-step">
              <div className="step-header">
                <h2 className="step-title">Select Appointment Time</h2>
                <button 
                  className="back-button"
                  onClick={() => setBookingStep(3)}
                >
                  ← Back to Dates
                </button>
              </div>
              <p className="step-description">Choose a time slot that works best for you</p>
              <div className="time-slots-grid">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Confirm Booking */}
          {bookingStep === 5 && (
            <div className="booking-step">
              <div className="step-header">
                <h2 className="step-title">Confirm Your Appointment</h2>
                <button 
                  className="back-button"
                  onClick={() => setBookingStep(4)}
                >
                  ← Back to Time
                </button>
              </div>
              <div className="booking-summary">
                <div className="summary-card">
                  <h3>Appointment Details</h3>
                  <div className="summary-item">
                    <span className="summary-label">Specialty:</span>
                    <span className="summary-value">
                      {specialties.find(s => s.id === selectedSpecialty)?.name}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Doctor:</span>
                    <span className="summary-value">
                      {doctors.find(d => d.id === selectedDoctor)?.name}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Date:</span>
                    <span className="summary-value">
                      {new Date(selectedDate).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Time:</span>
                    <span className="summary-value">{selectedTime}</span>
                  </div>
                </div>
                <div className="booking-notice">
                  <p>📧 You will receive a confirmation email with appointment details</p>
                  <p>📱 Please arrive 15 minutes before your scheduled time</p>
                  <p>📋 Bring your ID and insurance card</p>
                </div>
                <button 
                  className="confirm-booking-button"
                  onClick={handleConfirmBooking}
                >
                  Confirm Appointment
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Help Section */}
        <div className="booking-help">
          <div className="help-card">
            <h3>Need Help?</h3>
            <p>If you need assistance with booking, please contact us:</p>
            <div className="help-contact">
              <p>📞 Call: (555) 123-4567</p>
              <p>📧 Email: appointments@healthcare.com</p>
              <p>🕒 Mon-Fri: 8:00 AM - 6:00 PM</p>
            </div>
          </div>

          <div className="help-card">
            <h3>Before Your Visit</h3>
            <ul>
              <li>Bring your ID and insurance card</li>
              <li>Arrive 15 minutes early</li>
              <li>List your current medications</li>
              <li>Prepare your medical history</li>
              <li>Write down your questions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;