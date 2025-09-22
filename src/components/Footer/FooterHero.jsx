import React from 'react';
import "./footer.css";

function FooterHero() {
  return ( 
    <div className="footer-container">
      {/* Government Logos Section */}
      <div className="logos-section">
        <div className="logos-container">
          <div className="logo-item">
            <img 
              src="/health authority.svg" 
              alt="National Health Authority" 
              className="logo" 
              style={{ width: "200px", height: "auto" }} 
            />
          </div>

          <div className="logo-item">
            <img 
              src="/indian goverment.svg" 
              alt="Ministry of IT" 
              className="logo" 
              style={{ width: "200px", height: "auto" }} 
            />
          </div>

          <div className="logo-item">
            <img 
              src="/symbol Family Welfare.svg" 
              alt="Ministry of Health & Family Welfare" 
              className="logo" 
              style={{ width: "200px", height: "auto" }} 
            />
          </div>

          <div className="logo-item">
            <img 
              src="/MINISTRY of AYUSh.png" 
              alt="Ministry of Ayush" 
              className="logo" 
              style={{ width: "200px", height: "auto" }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FooterHero;