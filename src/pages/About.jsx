import React from 'react';
import { Link } from 'react-router-dom';
import { IoHeart, IoShield, IoPeople, IoStar } from 'react-icons/io5';
import './About.css';

const About = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      image: "/images/doctor1.jpg",
      bio: "15+ years of experience in healthcare technology and patient care."
    },
    {
      name: "Prof. Michael Chen",
      role: "AI & Technology Lead",
      image: "/images/doctor2.jpg",
      bio: "Expert in machine learning and healthcare AI applications."
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Patient Experience Director",
      image: "/images/doctor3.jpg",
      bio: "Specializes in patient-centered care and healthcare accessibility."
    }
  ];

  const values = [
    {
      icon: <IoHeart className="value-icon" />,
      title: "Patient-Centered Care",
      description: "We put our patients first in everything we do, ensuring compassionate and personalized healthcare experiences."
    },
    {
      icon: <IoShield className="value-icon" />,
      title: "Trust & Security",
      description: "Your health data is protected with enterprise-grade security and complete confidentiality."
    },
    {
      icon: <IoPeople className="value-icon" />,
      title: "Accessibility",
      description: "Making quality healthcare accessible to everyone, regardless of location or circumstances."
    },
    {
      icon: <IoStar className="value-icon" />,
      title: "Excellence",
      description: "Committed to delivering the highest standards of medical care and innovative health solutions."
    }
  ];

  return (
    <div className="about-page">
      {/* Header */}
      <header className="about-header">
        <div className="about-header-content">
          <h1 className="about-title">About Namaste Health</h1>
          <p className="about-subtitle">
            Revolutionizing healthcare through technology, compassion, and innovation
          </p>
        </div>
      </header>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="mission-container">
          <div className="mission-content">
            <h2 className="section-title">Our Mission</h2>
            <p className="mission-text">
              At Namaste Health, we believe that quality healthcare should be accessible, 
              efficient, and personalized. Our platform combines cutting-edge AI technology 
              with compassionate medical professionals to deliver comprehensive healthcare 
              solutions that empower patients and streamline medical processes.
            </p>
            <p className="mission-text">
              We're dedicated to bridging the gap between traditional healthcare and modern 
              technology, ensuring that every individual receives the care they deserve, 
              when they need it, wherever they are.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="values-container">
          <h2 className="section-title">Our Values</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon-wrapper">
                  {value.icon}
                </div>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-description">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="team-container">
          <h2 className="section-title">Our Expert Team</h2>
          <p className="team-subtitle">
            Meet the dedicated professionals behind Namaste Health
          </p>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-card">
                <div className="team-image-wrapper">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="team-image"
                    onError={(e) => {
                      e.target.src = '/images/healthcare-illustration.svg';
                    }}
                  />
                </div>
                <h3 className="team-name">{member.name}</h3>
                <p className="team-role">{member.role}</p>
                <p className="team-bio">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="about-cta-section">
        <div className="about-cta-container">
          <h2 className="cta-title">Ready to Experience Better Healthcare?</h2>
          <p className="cta-description">
            Join thousands of patients who trust Namaste Health for their medical needs
          </p>
          <div className="cta-buttons">
            <Link to="/signup" className="cta-primary">
              Get Started
            </Link>
            <Link to="/login" className="cta-secondary">
              Login to Your Account
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="about-footer">
        <div className="about-footer-content">
          <p>&copy; 2024 Namaste Health. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/" className="footer-link">Home</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;