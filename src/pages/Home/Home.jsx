import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import { 
  IoHeart, 
  IoMedical, 
  IoVideocam, 
  IoPeople, 
  IoTime,
  IoArrowForward,
  IoStar,
  IoShield,
  IoGlobe
} from 'react-icons/io5';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };
  const features = [
    {
      icon: <IoHeart className="feature-icon" />,
      title: "AI Guided First Aid Support",
      description: "Chat with our AI for coping strategies and professional referrals.",
      color: "green"
    },
    {
      icon: <IoMedical className="feature-icon" />,
      title: "Confidential Booking System",
      description: "Schedule an appointment with an on-campus counsellor or mental health helpline.",
      color: "blue"
    },
    {
      icon: <IoVideocam className="feature-icon" />,
      title: "Psycho-educational Resource Hub",
      description: "Explore videos, relaxation audios, and mental wellness guides.",
      color: "grey"
    },
    {
      icon: <IoPeople className="feature-icon" />,
      title: "Peer Support Platform",
      description: "Join a moderated forum to connect with fellow students for support.",
      color: "orange"
    }
  ];

  const stats = [
    { number: "10,000+", label: "Students Helped", icon: <IoHeart /> },
    { number: "50+", label: "Expert Doctors", icon: <IoMedical /> },
    { number: "24/7", label: "Support Available", icon: <IoTime /> },
    { number: "100%", label: "Confidential", icon: <IoShield /> }
  ];

  return (
    <div className="home">
      {/* Header Component */}
      <Header onLoginClick={handleLoginClick} />

      {/* Hero Section - Now handled by Header component */}

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
          <div className="section-header">
            <h2 className="section-title">Why Choose Namaste Health?</h2>
            <p className="section-subtitle">
              Comprehensive healthcare solutions combining traditional wisdom with modern technology
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className={`feature-card feature-${feature.color}`}>
                <div className="feature-icon-wrapper">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Start Your Wellness Journey?</h2>
            <p className="cta-description">
              Join thousands of students who have already improved their mental health with our platform.
            </p>
            <div className="cta-buttons">
              <Link to="/signup">
                <button className="cta-primary">
                  Get Started Now <IoArrowForward className="btn-icon" />
                </button>
              </Link>
              <Link to="/login">
                <button className="cta-secondary">
                  Already have an account? Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-logo">
              <img src="/images/logo.svg" alt="Namaste Health" className="logo-icon" />
              <span>Namaste Health</span>
            </div>
            <p className="footer-description">
              Your trusted partner in mental wellness and healthcare support.
            </p>
            <div className="footer-links">
              <Link to="/login" className="footer-link">Login</Link>
              <Link to="/signup" className="footer-link">Sign Up</Link>
              <Link to="/app/dashboard" className="footer-link">Dashboard</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Namaste Health. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;