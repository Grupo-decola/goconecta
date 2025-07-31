import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer class="footer">
    <div class="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          <span>GoConecta Viagens</span>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; {new Date().getFullYear()} GoConecta Viagens. Todos os direitos reservados.</p>
    </div>
  </footer>
);

export default Footer;