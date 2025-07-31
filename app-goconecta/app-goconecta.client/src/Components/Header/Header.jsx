import React from "react";
import Button from "../Buttons/Button";
import { FaHotel, FaPlane, FaSuitcase } from "react-icons/fa";
import "./Header.css";
import logo from "../../assets/img/logo-goconecta-lg.png";
import { useDisclosure } from "@mantine/hooks";
import { Burger, Menu, UnstyledButton, Group, Text, Divider } from "@mantine/core";
import { IconUser } from "@tabler/icons-react";

const Header = () => {
  const [opened, { toggle }] = useDisclosure();

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

          {/* 🔽 Menu suspenso no ícone 👤 */}
          <Menu shadow="md" width={220} position="bottom-end">
            <Menu.Target>
              <UnstyledButton className="user-btn">
                <IconUser size={22} color="#182348" />
              </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown>
              <Group px="sm" py="xs">
                <IconUser size={20} color="#DA7818" />
                <Text size="sm" fw={500} color="#182348">Olá!</Text>
              </Group>

              <Menu.Item
                component="a"
                href="/beneficios"
                icon={<span style={{ fontWeight: 'bold', color: '#DA7818' }}>🎁</span>}
              >
                Benefícios Passaporte
              </Menu.Item>

              <Divider my="xs" />

              <Menu.Item
                component="a"
                href="/login"
                style={{ color: '#182348', fontWeight: 500 }}
              >
                Iniciar Sessão
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </div>

      <nav className="main-nav">
        <ul>
          <li>
            <a href="/hospedagens" className="nav-link active">
              <FaHotel className="nav-icon" />
              <span>Hospedagens</span>
            </a>
          </li>
          <li>
            <a href="/passagens" className="nav-link">
              <FaPlane className="nav-icon" />
              <span>Passagens</span>
            </a>
          </li>
          <li>
            <a href="/pacotes" className="nav-link">
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