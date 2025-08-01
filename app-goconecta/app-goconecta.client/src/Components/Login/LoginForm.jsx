import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import {
  TextInput,
  PasswordInput,
  Button,
  Box,
  Stack,
  Title,
  Card,
  Text,
  Anchor,
  Grid,
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { useAuth } from "../../Context/AuthContext";
import { notifications } from "@mantine/notifications";
function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      notifications.show({
        title: "Login realizado!",
        message: "Login realizado com sucesso!",
        color: "success",
        autoClose: 5000,
      });
      const redirectData = JSON.parse(sessionStorage.getItem("redirectPath"));
      sessionStorage.removeItem("redirectPath");
      if (redirectData) {
        navigate(redirectData.pathname + (redirectData.search || ""), {
          state: redirectData.state,
          replace: true,
        });
      } else {
        navigate("/", { replace: true });
      }
    } catch (error) {
      if (error?.response?.status === 401) {
        notifications.show({
          title: "Erro ao fazer login",
          message: "E-mail ou senha inválidos",
          color: "error",
          autoClose: 2000,
        });
      } else {
        notifications.show({
          title: "Erro ao fazer login",
          message:
            "Erro ao conectar com o servidor. Tente novamente mais tarde.",
          color: "error",
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <Box maw={{ base: "90%", sm: 400 }} mx="auto" mt="xl" px="md">
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
                <Button type="submit" fullWidth mt="sm">
                  Entrar
                </Button>
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
