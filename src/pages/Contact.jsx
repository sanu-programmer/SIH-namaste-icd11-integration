import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Send, User, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitStatus('success');
      setIsSubmitting(false);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    }, 2000);
  };

  const contactInfo = [
    {
      icon: <MapPin size={24} />,
      title: 'Visit Us',
      content: '123 Healthcare Street, Medical District, City 12345',
      details: 'Main Campus'
    },
    {
      icon: <Phone size={24} />,
      title: 'Call Us',
      content: '+1 (555) 123-4567',
      details: 'Mon-Fri 8AM-6PM'
    },
    {
      icon: <Mail size={24} />,
      title: 'Email Us',
      content: 'support@healthcare.com',
      details: 'We respond within 24 hours'
    },
    {
      icon: <Clock size={24} />,
      title: 'Hours',
      content: 'Monday - Friday: 8:00 AM - 6:00 PM',
      details: 'Saturday: 9:00 AM - 2:00 PM'
    }
  ];

  const departments = [
    {
      name: 'General Inquiries',
      email: 'info@healthcare.com',
      phone: '+1 (555) 123-4567'
    },
    {
      name: 'Appointments',
      email: 'appointments@healthcare.com',
      phone: '+1 (555) 123-4568'
    },
    {
      name: 'Medical Records',
      email: 'records@healthcare.com',
      phone: '+1 (555) 123-4569'
    },
    {
      name: 'Billing & Insurance',
      email: 'billing@healthcare.com',
      phone: '+1 (555) 123-4570'
    },
    {
      name: 'Emergency Services',
      email: 'emergency@healthcare.com',
      phone: '+1 (555) 123-4571'
    }
  ];

  return (
    <div className="contact-page">
      {/* Header */}
      <div className="contact-header">
        <div className="contact-header-content">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-subtitle">
            We're here to help you with any questions or concerns you may have
          </p>
        </div>
      </div>

      <div className="contact-container">
        {/* Contact Information Cards */}
        <section className="contact-info-section">
          <div className="info-cards-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="info-card">
                <div className="info-icon">{info.icon}</div>
                <h3 className="info-title">{info.title}</h3>
                <p className="info-content">{info.content}</p>
                <p className="info-details">{info.details}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="contact-form-section">
          <div className="form-section-header">
            <h2 className="section-title">Send Us a Message</h2>
            <p className="section-subtitle">
              Fill out the form below and we'll get back to you as soon as possible
            </p>
          </div>

          <div className="contact-form-container">
            {submitStatus === 'success' && (
              <div className="success-message">
                <div className="success-icon">✓</div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. We'll respond to your inquiry within 24 hours.</p>
                <button
                  className="send-another-button"
                  onClick={() => setSubmitStatus(null)}
                >
                  Send Another Message
                </button>
              </div>
            )}

            {submitStatus !== 'success' && (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name" className="form-label">
                      <User size={16} />
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      <Mail size={16} />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                    placeholder="Enter message subject"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    <MessageSquare size={16} />
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="form-textarea"
                    rows="6"
                    required
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="loading-spinner"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </section>

        {/* Departments Section */}
        <section className="departments-section">
          <h2 className="section-title">Contact Specific Departments</h2>
          <div className="departments-grid">
            {departments.map((dept, index) => (
              <div key={index} className="department-card">
                <h3 className="department-name">{dept.name}</h3>
                <div className="department-contact">
                  <div className="contact-item">
                    <Mail size={16} />
                    <a href={`mailto:${dept.email}`} className="contact-link">
                      {dept.email}
                    </a>
                  </div>
                  <div className="contact-item">
                    <Phone size={16} />
                    <a href={`tel:${dept.phone}`} className="contact-link">
                      {dept.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <div className="faq-container">
            <div className="faq-item">
              <h3 className="faq-question">How quickly will you respond to my inquiry?</h3>
              <p className="faq-answer">
                We strive to respond to all inquiries within 24 hours during business days. 
                For urgent matters, please call our emergency line.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">Can I book an appointment through the contact form?</h3>
              <p className="faq-answer">
                While you can request appointment information through our contact form, 
                we recommend using our <Link to="/bookings" className="faq-link">online booking system</Link> 
                for faster appointment scheduling.
              </p>
            </div>
            <div className="faq-item">
              <h3 className="faq-question">What information should I include in my message?</h3>
              <p className="faq-answer">
                Please include your full name, contact information, and a detailed description 
                of your inquiry. If you're asking about a specific service or appointment, 
                mention that in your message.
              </p>
            </div>
          </div>
        </section>

        {/* Emergency Information */}
        <section className="emergency-section">
          <div className="emergency-card">
            <div className="emergency-header">
              <div className="emergency-icon">🚨</div>
              <h2 className="emergency-title">Emergency Situations</h2>
            </div>
            <p className="emergency-text">
              If you are experiencing a medical emergency, please call 911 immediately 
              or go to your nearest emergency room. Do not use this contact form for 
              emergency situations.
            </p>
            <div className="emergency-contacts">
              <div className="emergency-contact">
                <strong>24/7 Emergency Line:</strong>
                <a href="tel:+15551234571" className="emergency-phone">
                  +1 (555) 123-4571
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Contact;