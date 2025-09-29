import React from 'react';
import { Button } from '../components/ui/button';
import "./Home.css";

function HomeHero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <h1 
            className="hero-title"
            style={{
              color: "#ffffff",
              textShadow: "0 0 8px rgba(255,255,255,0.8)",
              fontWeight: "bold"
            }}
          >
            Bridging Ancient Wisdom 
          </h1>
          <p className="hero-description">
            The WHO Global Traditional Medicine Centre (GTMC), located in Jamnagar, Gujarat, stands as a beacon of integrative health innovation. Supported by the Ministry of AYUSH, GTMC serves as a global knowledge hub, advancing the scientific language of traditional medicine. This includes its integration into the International  
          </p>
          <Button variant="cta" className="hero-cta">
            Get Started
          </Button>
        </div>
        <div 
          className="hero-illustrations"
          style={{
            flex: "1",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <img 
            src="/bimar bhacha.jpeg" 
            alt="Hero Illustration" 
            className="hero-image"
            style={{
              width: "100%",
              height: "100%",
              maxWidth: "500px",
              borderRadius: "16px",
              objectFit: "cover",
              boxShadow: "0 6px 12px rgba(0,0,0,0.4)"
            }}
          />
        </div>
      </div>
    </section>
  );
}

export default HomeHero;
