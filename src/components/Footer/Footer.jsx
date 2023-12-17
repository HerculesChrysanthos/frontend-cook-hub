/* Footer.jsx */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="social-icons">
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
        <div className="footer-text">
          <h4>&copy; 2023 CookHub</h4>
          <p>
            ΕΠΙΚΟΙΝΩΝΙΑ |  ΠΟΛΙΤΙΚΗ ΑΠΟΡΡΗΤΟΥ |  ΟΡΟΙ ΧΡΗΣΗΣ |  ΠΟΛΙΤΙΚΗ COOKIES
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;