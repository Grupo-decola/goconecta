import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 👈 ESSA LINHA É A QUE FALTOU!
import {
  TextInput,
  PasswordInput,
  Button,
  Box,
  Stack,
  Notification,
  Title,
  Card,
  Text,
  Anchor,
  Grid,
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";

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
        // localStorage.setItem("token", dados.token); // opcional: armazena o token de autenticação
      } else if (resposta.status === 401) {
        setErro("E-mail ou senha inválidos");
      } else {
        setErro("Erro ao conectar com o servidor");
      }
    } catch (erro) {
      console.error("Erro ao fazer login:", erro);
      setErro("Erro ao conectar com o servidor. Tente novamente mais tarde.");
    }
  };

  return (
    <Box
      maw={{ base: '90%', sm: 400 }}
      mx="auto"
      mt="xl"
      px="md"
    >
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={3} align="center" mb="md">
          Acesse sua conta
        </Title>
        <form onSubmit={handleSubmit}>
          <Grid>
            <Grid.Col span={12}>
              <Stack>
                <TextInput
                  label="Email"
                  placeholder="seu@email.com"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  leftSection={<IconAt size={16} />}
                />
                <PasswordInput
                  label="Senha"
                  placeholder="Digite sua senha"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  leftSection={<IconLock size={16} />}
                />
                <Button
                  type="submit"
                  fullWidth
                  mt="sm"
                >
                  Entrar
                </Button>
                {erro && (
                  <Notification color="red" mt="md">
                    {erro}
                  </Notification>
                )}
                {sucesso && (
                  <Notification color="green" mt="md">
                    {sucesso}
                  </Notification>
                )}
              </Stack>
            </Grid.Col>
          </Grid>
        </form>
        <Text size="sm" align="center" mt="md">
          Ainda não tem cadastro?{" "}
          <Anchor component="a" href="/Cadastro" size="sm">
            Cadastre-se aqui
          </Anchor>
        </Text>
      </Card>
    </Box>
  );
}

export default LoginForm;