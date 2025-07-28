import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="main-footer">
    <div className="footer-content">
      <div className="footer-logo">
        <span>GoConecta Viagens</span>
      </div>
      <div className="footer-links">
        <a href="/sobre">Sobre nós</a>
        <a href="/contato">Contato</a>
        <a href="/ajuda">Ajuda</a>
        <a href="/politica">Política de Privacidade</a>
      </div>
      <div className="footer-copy">
        &copy; {new Date().getFullYear()} GoConecta Viagens. Todos os direitos reservados.
      </div>
    </div>
  </footer>
);

export default Footer;