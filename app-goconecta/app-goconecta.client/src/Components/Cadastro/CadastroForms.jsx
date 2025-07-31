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
  Text,
  Anchor,
  Grid, 
} from '@mantine/core';
import { useForm } from '@mantine/form';
import axios from 'axios';
import { 
  IconUser, 
  IconAt, 
  IconLock, 
  IconPhone, 
  IconId 
} from '@tabler/icons-react';

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

    const dados = {
      ...values,
      role: "Cliente" 
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
  
    <Box 
      maw={{ base: '90%', sm: 400 }} 
      mx="auto" 
      mt="xl"
      px="md" 
    >
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
                  {...form.getInputProps('name')}
                  leftSection={<IconUser size={16} />} 
                />
                <TextInput
                  label="Email"
                  placeholder="seu@email.com"
                  {...form.getInputProps('email')}
                  leftSection={<IconAt size={16} />} 
                />
                <PasswordInput
                  label="Senha"
                  placeholder="Crie uma senha"
                  {...form.getInputProps('password')}
                  leftSection={<IconLock size={16} />} 
                />
                <TextInput
                  label="Telefone"
                  placeholder="(99) 99999-9999"
                  {...form.getInputProps('phone')}
                  leftSection={<IconPhone size={16} />} 
                />
                <TextInput
                  label="CPF ou Passaporte"
                  placeholder="123.456.789-00 ou ABC123"
                  {...form.getInputProps('cpfPassport')}
                  leftSection={<IconId size={16} />} 
                />
                <Button 
                  type="submit" 
                  fullWidth 
                  mt="sm" 
                >
                  Cadastrar
                </Button>

                {erro && <Notification color="red" mt="md">{erro}</Notification>}
                {sucesso && <Notification color="green" mt="md">{sucesso}</Notification>}
              </Stack>
            </Grid.Col>
          </Grid>
        </form>

        <Text size="sm" align="center" mt="md">
          Já tem uma conta? {' '}
          <Anchor component="a" href="/login" size="sm">
            Faça login aqui
          </Anchor>
        </Text>
      </Card>
    </Box>
  );
}

export default CadastroFormulario;
