import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";

import {
  Burger,
  Menu,
  UnstyledButton,
  Group,
  Text,
  Divider,
} from "@mantine/core";

import { FaHotel, FaPlane, FaSuitcase } from "react-icons/fa";
import { IconUser, IconLogout } from "@tabler/icons-react";

import Button from "../Buttons/Button";
import logo from "../../assets/img/logo-goconecta-lg.png";
import "./Header.css";

import { getDecodedToken } from "../../services/AuthService";
import { useAuth } from "../../Context/AuthContext";

const Header = () => {
  const { isAuthenticated } = useAuth();
  const [opened, { toggle }] = useDisclosure();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decoded = getDecodedToken();
      setUserName(decoded?.unique_name || "");
    }
  }, [isAuthenticated]);

  const isActive = (path) => window.location.pathname === path;

  return (
    <header className="main-header">
      <div className="header-top">
        <div className="logo" style={{ minWidth: 60 }}>
          <img
            className="LogoGoConecta"
            src={logo}
            alt="Logo GoConecta"
            style={{ height: 70, cursor: "pointer" }}
            onClick={() => (window.location.href = "/")}
          />
        </div>

        {/* Header actions visíveis só em telas médias/grandes */}
        <div
          className="header-actions"
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 12,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <span className="phone">Televendas <b>0800 123 4567</b></span>
          <div className="header-menu-links">
            <a href="/anuncie" className="action-link" aria-label="Anuncie sua propriedade">
              Anuncie
            </a>
            <a href="/ajuda" className="action-link" aria-label="Ajuda">
              Ajuda
            </a>
            <a href="/beneficios" className="action-link" aria-label="Benefícios Passaporte">
              Benefícios
            </a>
          </div>
          {/* Ícone de usuário só em telas médias/grandes */}
          <span className="user-desktop-menu">
            <Menu shadow="md" width={220} position="bottom-end">
              <Menu.Target>
                <UnstyledButton className="user-btn" aria-label={isAuthenticated ? "Menu do usuário" : "Iniciar sessão"}>
                  <IconUser size={22} color="#182348" />
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                {isAuthenticated ? (
                  <div>
                    <Group px="sm" py="xs">
                      <IconUser size={20} color="#DA7818" />
                      <Text size="sm" fw={500} color="#182348">
                        {userName ? `Olá, ${userName}!` : "Olá!"}
                      </Text>
                    </Group>
                    <Menu.Item
                      component="a"
                      href="/beneficios"
                      icon={<span style={{ fontWeight: "bold", color: "#DA7818" }}>🎁</span>}
                    >
                      Benefícios Passaporte
                    </Menu.Item>
                    <Menu.Item
                      component="a"
                      href="/minhasreservas"
                      icon={<span style={{ fontWeight: "bold", color: "#182348" }}>🧳</span>}
                    >
                      Minhas Viagens
                    </Menu.Item>
                    <Divider my="xs" />
                    <Menu.Item
                      icon={<IconLogout size={18} color="#DA7818" />}
                      onClick={() => {
                        localStorage.removeItem("accessToken");
                        window.location.href = "/login";
                      }}
                      style={{ fontWeight: 500, color: "#182348" }}
                    >
                      Sair
                    </Menu.Item>
                  </div>
                ) : (
                  <Menu.Item
                    component="a"
                    href="/login"
                    style={{ color: "#182348", fontWeight: 500 }}
                  >
                    Iniciar Sessão
                  </Menu.Item>
                )}
              </Menu.Dropdown>
            </Menu>
          </span>
          <div className="burger-menu" style={{ marginLeft: 12 }}>
            <Menu opened={opened} onChange={toggle} position="bottom-end" shadow="md" width={220}>
              <Menu.Target>
                <Burger
                  opened={opened}
                  onClick={toggle}
                  aria-label="Abrir menu de navegação"
                />
              </Menu.Target>
              <Menu.Dropdown>
                {/* Apenas opções de sessão, igual ao menu do usuário na web */}
                {isAuthenticated ? (
                  <>
                    <Menu.Item
                      component="a"
                      href="/beneficios"
                      icon={<span style={{ fontWeight: "bold", color: "#DA7818" }}>🎁</span>}
                    >
                      Benefícios Passaporte
                    </Menu.Item>
                    <Menu.Item
                      component="a"
                      href="/minhasreservas"
                      icon={<span style={{ fontWeight: "bold", color: "#182348" }}>🧳</span>}
                    >
                      Minhas Viagens
                    </Menu.Item>
                    <Divider my="xs" />
                    <Menu.Item
                      onClick={() => {
                        localStorage.removeItem("accessToken");
                        window.location.href = "/login";
                      }}
                      icon={<IconLogout size={18} color="#DA7818" />}
                      style={{ fontWeight: 500, color: "#182348" }}
                    >
                      Sair
                    </Menu.Item>
                  </>
                ) : (
                  <Menu.Item
                    component="a"
                    href="/login"
                    icon={<IconUser size={18} color="#182348" />}
                    style={{ fontWeight: 500 }}
                  >
                    Iniciar Sessão
                  </Menu.Item>
                )}
              </Menu.Dropdown>
            </Menu>
          </div>
        </div>
      </div>
      {/* Navegação Principal */}
      <nav className="main-nav" style={{ width: "100%", overflowX: "auto", marginTop: 2 }}>
        <ul style={{ display: "flex", flexWrap: "nowrap", gap: 18, minWidth: 320, width: "max-content", padding: "10px 0", margin: 0, listStyle: "none", justifyContent: "flex-start", alignItems: "center" }}>
          <li>
            <a
              href="/hospedagens"
              className={`nav-link ${isActive("/hospedagens") || isActive("/") ? "active" : ""}`}
              aria-label="Hospedagens"
            >
              <FaHotel className="nav-icon" />
              <span>Hospedagens</span>
            </a>
          </li>
          <li>
            <a
              href="/passagens"
              className={`nav-link ${isActive("/passagens") ? "active" : ""}`}
              aria-label="Passagens"
            >
              <FaPlane className="nav-icon" />
              <span>Passagens</span>
            </a>
          </li>
          <li>
            <a
              href="/pacotes"
              className={`nav-link ${isActive("/pacotes") ? "active" : ""}`}
              aria-label="Pacotes"
            >
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
