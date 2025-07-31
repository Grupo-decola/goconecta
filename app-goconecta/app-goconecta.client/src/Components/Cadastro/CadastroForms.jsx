import React, { useState, useEffect } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Box,
  Stack,
  Notification,
  Card,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import RegisterUserDTO from "../../dtos/RegisterUserDTO";
import { registerUser } from "../../services/RegisterService";

function CadastroFormulario() {
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

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

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      cpfPassport: "",
    },

    validate: {
      name: (value) =>
        value.length < 2 ? "Nome deve ter pelo menos 2 letras" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Email inválido"),
      password: (value) =>
        value.length < 6 ? "A senha deve ter no mínimo 6 caracteres" : null,
      cpfPassport: (value) =>
        value.trim() !== "" ? null : "Informe CPF ou Passaporte",
    },
  });

  const handleSubmit = async (values) => {
    setErro("");
    setSucesso("");

    const dados = new RegisterUserDTO(values);

    try {
      await registerUser(dados);
      setSucesso("Usuário cadastrado com sucesso!");
      form.reset();
    } catch (err) {
      setErro("Erro ao cadastrar. Verifique os dados.");
      console.error(err);
    }
  };

  return (
    <Box maw={400} mx="auto" mt="xl">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={3} align="center" mb="md">
          Crie sua conta
        </Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Nome"
              placeholder="Seu nome"
              {...form.getInputProps("name")}
            />
            <TextInput
              label="Email"
              placeholder="seu@email.com"
              {...form.getInputProps("email")}
            />
            <PasswordInput
              label="Senha"
              placeholder="Crie uma senha"
              {...form.getInputProps("password")}
            />
            <TextInput
              label="Telefone"
              placeholder="(99) 99999-9999"
              {...form.getInputProps("phone")}
            />
            <TextInput
              label="CPF ou Passaporte"
              placeholder="123.456.789-00 ou ABC123"
              {...form.getInputProps("cpfPassport")}
            />
            <Button type="submit" fullWidth mt="sm" color="orange">
              Cadastrar
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

export default CadastroFormulario;
