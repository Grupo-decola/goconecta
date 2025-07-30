import React, { useState } from 'react';
import {
  TextInput,
  PasswordInput,
  Button,
  Box,
  Stack,
  Notification,
  Card,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';

function CadastroFormulario() {
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      cpfPassport: '', 
    },

    validate: {
      name: (value) => value.length < 2 ? 'Nome deve ter pelo menos 2 letras' : null,
      email: (value) => /^\S+@\S+$/.test(value) ? null : 'Email inválido',
      password: (value) => value.length < 6 ? 'A senha deve ter no mínimo 6 caracteres' : null,
      cpfPassport: (value) => value.trim() !== '' ? null : 'Informe CPF ou Passaporte',
    },
  });

  const handleSubmit = async (values) => {
    setErro("");
    setSucesso("");

    const dados = {
      ...values,
      role: "Cliente" // fixo
    };

    try {
      await axios.post("http://localhost:5155/api/Usuarios", dados);
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
        <Title order={3} align="center" mb="md">Crie sua conta</Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="Nome"
              placeholder="Seu nome"
              {...form.getInputProps('name')}
            />
            <TextInput
              label="Email"
              placeholder="seu@email.com"
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label="Senha"
              placeholder="Crie uma senha"
              {...form.getInputProps('password')}
            />
            <TextInput
              label="Telefone"
              placeholder="(99) 99999-9999"
              {...form.getInputProps('phone')}
            />
            <TextInput
              label="CPF ou Passaporte"
              placeholder="123.456.789-00 ou ABC123"
              {...form.getInputProps('cpfPassport')}
            />
            <Button type="submit" fullWidth mt="sm" color="orange">Cadastrar</Button>

            {erro && <Notification color="red">{erro}</Notification>}
            {sucesso && <Notification color="green">{sucesso}</Notification>}
          </Stack>
        </form>
      </Card>
    </Box>
  );
}

export default CadastroFormulario;