import React from 'react';
import { Button } from "../components/ui/button";
import HomeHero from './HomeHero';
import { Link } from 'react-router-dom';
import { 
  IoHeart, 
  IoMedical, 
  IoVideocam, 
  IoPeople, 
  IoTime 
} from 'react-icons/io5';
import './Home.css';

const Home = () => {
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

  return (
    <div className="home">
      {/* Hero Section */}
      <HomeHero />
      
      {/* Features Section */}
      <section className="features-section">
        <div className="features-container">
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

      {/* Additional Content Sections */}
      <section className="additional-content">
        <div className="content-container">
          <div className="campus-psychiatrist">
            <h2 className="section-title">Connect with your on-campus psychiatrist</h2>
            <p className="section-description">
              Your mental health is just as important as your physical health, and our campus 
              mental health professionals are here to support you every step of the way.
            </p>
          </div>
          
          <div className="expert-section">
            <div className="expert-content">
              <h3 className="expert-title">Looking for an Expert</h3>
              <p className="expert-description">
                Our website is home to some of the eminent doctors in the world.
              </p>
            </div>
            <div className="expert-icon">
              <IoTime className="clock-icon" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;