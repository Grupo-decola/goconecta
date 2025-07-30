import React, { useState } from "react";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro("");
    setSucesso("");

    try {
      const resposta = await fetch("https://localhost:7093/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form)
      });

      if (resposta.ok) {
        const dados = await resposta.json();
        console.log("Login realizado:", dados);
        setSucesso("Login realizado com sucesso!");
        // localStorage.setItem("token", dados.token); // opcional
      } else {
        setErro("E-mail ou senha inválidos");
      }
    } catch (erro) {
      console.error("Erro ao fazer login:", erro);
      setErro("Erro ao conectar com o servidor");
    }
  };

  return (
    <Box maw={400} mx="auto" mt="xl">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={3} align="center" mb="md">Acesse sua conta</Title>
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
            <Button type="submit" fullWidth mt="sm" color="orange">Entrar</Button>

            {erro && <Notification color="red">{erro}</Notification>}
            {sucesso && <Notification color="green">{sucesso}</Notification>}
          </Stack>
        </form>
      </Card>
    </Box>
  );
}

export default LoginForm;
