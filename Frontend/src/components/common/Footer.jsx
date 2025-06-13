import React from 'react';
import '/src/components/css/Footer.css';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'orange', padding: '20px' }}>
      <div className="footer-container">
        <div className="footer-left">
          <h3>Navigation</h3>
          <ul>
            <li>Home</li>
            <li>Vehicle</li>
            <li>Store</li>
            <li>About us</li>
          </ul>
        </div>
        <div className="footer-middle">
          <h3>Contact Us</h3>
          <p>WrapForge</p>
          <p>Email: support@WrapForge.com</p>
          <p>Phone: +94 XXX XXX XXX</p>
        </div>
        <div className="footer-right">
          <h3>Follow Us</h3>
          <p>Facebook: @WrapForge</p>
          <p>Instagram: @WrapForge_mods</p>
          <p>YouTube: WrapForge Official</p>
          <p>Twitter: @WrapForge_design</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 WrapForge. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;