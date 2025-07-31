import React, { useState, useEffect } from "react";
import { login } from "../../services/AuthService";
import {
  TextInput,
  PasswordInput,
  Button,
  Box,
  Stack,
  Notification,
  Title,
  Card,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  // Notificações desaparecem após 5s
  useEffect(() => {
    let timer;
    if (erro) {
      timer = setTimeout(() => setErro(""), 5000);
    }
    return () => clearTimeout(timer);
  }, [erro]);

  useEffect(() => {
    let timer;
    if (sucesso) {
      timer = setTimeout(() => setSucesso(""), 5000);
    }
    return () => clearTimeout(timer);
  }, [sucesso]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    try {
      await login(form.email, form.password);
      navigate("/pacotes"); // Redireciona para a página inicial após login
      setSucesso("Login realizado com sucesso!");
    } catch (err) {
      if (err?.response?.status === 401) {
        setErro("E-mail ou senha inválidos");
      } else {
        setErro("Erro ao conectar com o servidor");
      }
    }
  };

  return (
    <Box maw={400} mx="auto" mt="xl">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={3} align="center" mb="md">
          Acesse sua conta
        </Title>
        <form onSubmit={handleSubmit}>
          <Stack>
            <TextInput
              label="Email"
              placeholder="seu@email.com"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <PasswordInput
              label="Senha"
              placeholder="Digite sua senha"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <Button type="submit" fullWidth mt="sm" color="orange">
              Entrar
            </Button>

            {erro && (
              <Notification
                color="red"
                onClose={() => setErro("")}
                withCloseButton
                aria-label="Fechar notificação de erro"
              >
                {erro}
              </Notification>
            )}
            {sucesso && (
              <Notification
                color="green"
                onClose={() => setSucesso("")}
                withCloseButton
                aria-label="Fechar notificação de sucesso"
              >
                {sucesso}
              </Notification>
            )}
          </Stack>
        </form>
      </Card>
    </Box>
  );
}

export default LoginForm;
