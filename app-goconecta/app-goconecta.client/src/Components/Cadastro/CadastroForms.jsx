import React from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Box,
  Stack,
  Card,
  Title,
  Text,
  Anchor,
  Grid,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "@mantine/form";
import { registerUser } from "../../services/RegisterService";
import RegisterUserDTO from "../../dtos/RegisterUserDTO";
import {
  IconUser,
  IconAt,
  IconLock,
  IconPhone,
  IconId,
} from "@tabler/icons-react";
import { IMaskInput } from "react-imask";
import { useNavigate } from "react-router-dom";

function CadastroFormulario() {
  const navigate = useNavigate();
  const passportRegex = /^(?!\d{6,9}$)[A-Za-z0-9]{3,20}$/;
  const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
  // Aceita formatos como +55 11999999999 ou +55 21987654321
  const phoneRegex = /^\d{2}\s?\d{8,11}$/;
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
      email: (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : "Email inválido",
      password: (value) =>
        value.length < 6 ? "A senha deve ter no mínimo 6 caracteres" : null,
      cpfPassport: (value) =>
        passportRegex.test(value) || cpfRegex.test(value)
          ? null
          : "Informe um documento válido",
      phone: (value) =>
        phoneRegex.test(value)
          ? null
          : "Telefone deve estar no formato +55 11999999999",
    },
  });

  const handleSubmit = async (values) => {
    try {
      const dto = new RegisterUserDTO({
        ...values,
      });
      await registerUser(dto);
      notifications.show({
        title: "Cadastro realizado!",
        message: "Usuário cadastrado com sucesso!",
        color: "success",
        autoClose: 2000,
      });
      navigate("/login");
    } catch (err) {
      if (err?.response?.status === 400) {
        notifications.show({
          title: "Erro ao cadastrar",
          message: "E-mail já está em uso. Tente outro e-mail.",
          color: "error",
          autoClose: 2000,
        });
      } else {
        notifications.show({
          title: "Erro ao cadastrar",
          message: "Erro ao cadastrar. Verifique os dados.",
          color: "error",
          autoClose: 2000,
        });
      }
      // console.error(err); // Removido para evitar warning de lint
    }
  };

  return (
    <Box maw={{ base: "90%", sm: 400 }} mx="auto" mt="xl" px="md">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title order={3} align="center" mb="md">
          Crie sua conta
        </Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid>
            <Grid.Col span={12}>
              <Stack>
                <TextInput
                  label="Nome"
                  placeholder="Seu nome"
                  {...form.getInputProps("name")}
                  leftSection={<IconUser size={16} />}
                />
                <TextInput
                  label="Email"
                  placeholder="seu@email.com"
                  {...form.getInputProps("email")}
                  leftSection={<IconAt size={16} />}
                />
                <PasswordInput
                  label="Senha"
                  placeholder="Crie uma senha"
                  {...form.getInputProps("password")}
                  leftSection={<IconLock size={16} />}
                />
                <TextInput
                  label="Telefone"
                  placeholder="(99) 11999999999"
                  component={IMaskInput}
                  mask="(00) 00000000000"
                  {...form.getInputProps("phone")}
                  leftSection={<IconPhone size={16} />}
                />
                <TextInput
                  label="CPF ou Passaporte"
                  placeholder="123.456.789-00 ou AB123456"
                  component={IMaskInput}
                  mask={
                    /^[0-9]/.test(form.values.cpfPassport)
                      ? "000.000.000-00"
                      : false
                  }
                  {...form.getInputProps("cpfPassport")}
                  leftSection={<IconId size={16} />}
                />
                <Button type="submit" fullWidth mt="sm" color="#DA7818">
                  Cadastrar
                </Button>
              </Stack>
            </Grid.Col>
          </Grid>
        </form>

        <Text size="sm" align="center" mt="md">
          Já tem uma conta?{" "}
          <Anchor component="a" href="/login" size="sm">
            Faça login aqui
          </Anchor>
        </Text>
      </Card>
    </Box>
  );
}

export default CadastroFormulario;
