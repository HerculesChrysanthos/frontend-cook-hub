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
            <a href="#">ΕΠΙΚΟΙΝΩΝΙΑ</a> | <a href="#">ΠΟΛΙΤΙΚΗ ΑΠΟΡΡΗΤΟΥ</a> | <a href="#">ΟΡΟΙ ΧΡΗΣΗΣ</a> |{' '}
            <a href="#">ΠΟΛΙΤΙΚΗ COOKIES</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
