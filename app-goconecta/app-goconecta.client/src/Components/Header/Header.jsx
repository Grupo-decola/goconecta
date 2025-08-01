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
        <div className="logo">
          <img
            className="LogoGoConecta"
            src={logo}
            alt="Logo GoConecta"
            style={{ height: 100 }}
            onClick={() => (window.location.href = "/")}
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
          <a href="/beneficios" className="action-link">
            Benefícios Passaporte
          </a>

          <Menu shadow="md" width={220} position="bottom-end">
            <Menu.Target>
              <UnstyledButton className="user-btn">
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
                    icon={
                      <span style={{ fontWeight: "bold", color: "#DA7818" }}>
                        🎁
                      </span>
                    }
                  >
                    Benefícios Passaporte
                  </Menu.Item>

                  <Menu.Item
                    component="a"
                    href="/minhasreservas"
                    icon={
                      <span style={{ fontWeight: "bold", color: "#182348" }}>
                        🧳
                      </span>
                    }
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
        </div>
      </div>

      {/* 🧭 Navegação Principal */}
      <nav className="main-nav">
        <ul>
          <li>
            <a
              href="/hospedagens"
              className={`nav-link ${
                isActive("/hospedagens") || isActive("/") ? "active" : ""
              }`}
            >
              <FaHotel className="nav-icon" />
              <span>Hospedagens</span>
            </a>
          </li>

          <li>
            <a
              href="/passagens"
              className={`nav-link ${isActive("/passagens") ? "active" : ""}`}
            >
              <FaPlane className="nav-icon" />
              <span>Passagens</span>
            </a>
          </li>

          <li>
            <a
              href="/pacotes"
              className={`nav-link ${isActive("/pacotes") ? "active" : ""}`}
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
