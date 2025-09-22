import React from 'react';
import { Link } from 'react-router-dom';
import { IoArrowForward, IoPlay, IoCheckmark, IoHeart } from 'react-icons/io5';
import "./Home.css";

function HomeHero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Your Mental Health
            <span className="hero-title-highlight"> Matters Most </span>
          </h1>
          <p className="hero-description">
            Experience comprehensive healthcare that combines ancient wisdom with modern technology. 
            Connect with expert doctors, access AI-powered support, and join a caring community 
            dedicated to your mental wellness journey.
          </p>
          <div className="hero-buttons">
            <Link to="/signup">
              <button className="hero-cta">
                Start Your Journey
                <IoArrowForward className="btn-icon" />
              </button>
            </Link>
            <button className="hero-secondary">
              <IoPlay className="btn-icon" />
              Watch Demo
            </button>
          </div>
          <div className="hero-features">
            <div className="hero-feature">
              <IoCheckmark className="feature-check" />
              <span>100% Confidential</span>
            </div>
            <div className="hero-feature">
              <IoCheckmark className="feature-check" />
              <span>24/7 Support Available</span>
            </div>
            <div className="hero-feature">
              <IoCheckmark className="feature-check" />
              <span>Expert Doctors</span>
            </div>
          </div>
        </div>
        <div className="hero-illustrations">
          <img 
            src="/images/healthcare-illustration.svg" 
            alt="Healthcare Illustration" 
            className="hero-image"
          />
          <div className="hero-badge">
            <IoHeart className="badge-icon" />
            <span>Trusted by 10,000+ Students</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
