import React from "react";
import Button from "../Buttons/Button";
import { FaHotel, FaPlane, FaSuitcase } from "react-icons/fa";
import "./Header.css";
import logo from "../../assets/img/logo-goconecta-lg.png";
import { useDisclosure } from "@mantine/hooks";
import { Burger } from "@mantine/core";

const Header = () => {
  const [opened, { toggle }] = useDisclosure();
  const isActive = (path) => window.location.pathname === path;


  return (
    <header className="main-header">
      <div className="header-top">
        <div className="logo">
          <img
            className="LogoGoConecta"
            src={logo}
            alt="Logo GoConecta"
            style={{ height: 100 }}
            onClick={() => window.location.href = "/"}
          />
        </div>
        <div className="burger-menu">
          <Burger
            opened={opened}
            onClick={toggle}
            aria-label="Toggle navigation"
          />
        </div>
        <div className="header-actions">
          <span className="phone">
            Televendas <b>0800 123 4567</b>
          </span>
          <a href="/anuncie" className="action-link">
            Anuncie sua propriedade
          </a>
          <a href="/ajuda" className="action-link">
            Ajuda
          </a>
          <a href="/minhas-viagens" className="action-link">
            Minhas Viagens
          </a>
          <a href="/beneficios" className="action-link">
            Benefícios Passaporte
          </a>
          <button className="user-btn">
            <span className="user-icon">👤</span>
          </button>
        </div>
      </div>
      <nav className="main-nav">
        <ul>
          <li>
            <a href="/hospedagens" className={`nav-link ${isActive('/hospedagens') || isActive('/') ? 'active' : ''}`}>
              <FaHotel className="nav-icon" />
              <span>Hospedagens</span>
            </a>
          </li>
          <li>
            <a href="/passagens" className={`nav-link ${isActive('/passagens') ? 'active' : ''}`}>
              <FaPlane className="nav-icon" />
              <span>Passagens</span>
            </a>
          </li>
          <li>
            <a href="/pacotes" className={`nav-link ${isActive('/pacotes') ? 'active' : ''}`}>
              <FaSuitcase className="nav-icon" />
              <span>Pacotes</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
