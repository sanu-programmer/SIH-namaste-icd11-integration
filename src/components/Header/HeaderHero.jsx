import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";

function HeaderHero({ onLoginClick }) {
  const navigate = useNavigate();

  const handleContactClick = () => {
    // Navigate to contact page instead of scrolling to footer
    navigate('/contact');
  };

  const handleLoginClick = () => {
    // Use the onLoginClick prop if provided, otherwise navigate directly
    if (onLoginClick) {
      onLoginClick();
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="header-hero">
      {/* ✅ Background Image */}
      <div className="header-hero-bg">
        <img 
          src="/images/healthcare-illustration.svg" 
          alt="Healthcare Background" 
          className="header-hero-bg-image"
        />
        <div className="header-hero-overlay"></div>
      </div>
      
      {/* ✅ Content */}
      <div className="header-hero-content">
        <div className="logo-compact">
          <img 
            src="/images/logo.svg"
            alt="Logo Icon"
            className="logo-icon-small"
          />
        </div>

        <div className="header-actions-compact">
          <button className="contact-btn-small" onClick={handleContactClick}>
            Contact
          </button>
          <button className="login-btn-small" onClick={handleLoginClick}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default HeaderHero;