import React from 'react';
import './footer.css';
import FooterHero from "./FooterHero.jsx";

function Footer() {
  return (
    <div>
      {/* Logos Section */}
      <FooterHero />   {/* ✅ Correct way to use it */}

      {/* Main Footer */}
      <footer className="main-footer">
        <div className="footer-content">
          {/* Contact Column */}
          <div className="footer-column">
            <h3>Contact</h3>
            <div className="contact-info">
              <p>
                National Health Authority<br />
                9th Floor, Tower-1, Jeevan Bharati Building<br />
                Connaught Place, New Delhi - 110 001
              </p>
              <p><strong>Toll Free:</strong> 1800-11-4477</p>
              <p><strong>Email:</strong> abdm[at]nha[dot]gov[dot]in</p>
            </div>
            <div className="social-media">
              <a href="#" className="social-icon" aria-label="Facebook">📘</a>
              <a href="#" className="social-icon" aria-label="YouTube">📺</a>
              <a href="#" className="social-icon" aria-label="Twitter">🐦</a>
              <a href="#" className="social-icon" aria-label="Instagram">📷</a>
            </div>
          </div>

          {/* Important Links Column */}
          <div className="footer-column">
            <h3>Important Links</h3>
            <ul className="footer-links">
              <li><a href="#abdm">Ayushman Bharat Digital Mission</a></li>
              <li><a href="#abha">Ayushman Bharat Health Account (ABHA)</a></li>
              <li><a href="#hpr">Healthcare Professionals Registry</a></li>
              <li><a href="#grievance">Grievance Portal</a></li>
            </ul>
          </div>

          {/* Policies Column */}
          <div className="footer-column">
            <h3>Policies</h3>
            <ul className="footer-links">
              <li><a href="#terms">Terms and Conditions</a></li>
              <li><a href="#website-policy">Website Policies</a></li>
              <li><a href="#privacy">Data Privacy Policy</a></li>
              <li><a href="#health-data">Health Data Management Policy</a></li>
            </ul>
          </div>

          {/* App Download Column */}
          <div className="footer-column">
            <h3>ABHA App</h3>
            <div className="app-download">
              <div className="qr-codes">
                <div className="qr-code">
                  <div className="qr-placeholder">
                    <div className="abha-logo">A❤️</div>
                  </div>
                  <a href="#" className="download-btn google-play">
                    GET IT ON<br />Google Play
                  </a>
                </div>
                <div className="qr-code">
                  <div className="qr-placeholder">
                    <div className="abha-logo">A❤️</div>
                  </div>
                  <a href="#" className="download-btn app-store">
                    Available on the<br />App Store
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>
              This Website belongs to National Health Authority, Ministry of Health and Family Welfare, Government of India
            </p>
            <p>Page last updated on: 29/07/2023</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;