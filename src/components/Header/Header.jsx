import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";
import HeaderHero from "./HeaderHero";

export default function Header({ onLoginClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <HeaderHero onLoginClick={onLoginClick} />

      {/* Navigation bar */}
      <div className="header-bottom">
        <nav className="nav-container">
          <div className="nav-links">
            <Link to="/" className="nav-link active">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/ai-consultant" className="nav-link">AI Consultant</Link>
            <Link to="/videos" className="nav-link">Psycho-educational Videos</Link>
            <Link to="/bookings" className="nav-link">Bookings</Link>
            <Link to="/peer-support" className="nav-link">Peer Support</Link>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </nav>

        {/* Mobile menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-nav-links">
            <Link to="/" className="mobile-nav-link">Home</Link>
            <Link to="/about" className="mobile-nav-link">About</Link>
            <Link to="/ai-consultant" className="mobile-nav-link">AI Consultant</Link>
            <Link to="/videos" className="mobile-nav-link">Psycho-educational Videos</Link>
            <Link to="/bookings" className="mobile-nav-link">Bookings</Link>
            <Link to="/peer-support" className="mobile-nav-link">Peer Support</Link>
          </div>
        </div>
      </div>
    </header>
  );
}