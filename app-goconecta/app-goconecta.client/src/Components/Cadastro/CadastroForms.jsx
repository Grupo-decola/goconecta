import React from 'react';
import {
  TextInput,
  PasswordInput,
  Select,
  Button,
  Box,
  Stack,
  Notification,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import axios from 'axios';

function CadastroFormulario() {
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
      password: '',
      phone: '',
      cpfPassaport: '',
      role: 'Cliente',
    },

    validate: {
      name: (value) => value.length < 2 ? 'Nome deve ter pelo menos 2 letras' : null,
      email: (value) => /^\S+@\S+$/.test(value) ? null : 'Email inválido',
      password: (value) => value.length < 6 ? 'A senha deve ter no mínimo 6 caracteres' : null,
      cpfPassaport: (value) => value.trim() !== '' ? null : 'Informe CPF ou Passaporte',
    },
  });

  const handleSubmit = async (values) => {
    setErro("");
    setSucesso("");
    try {
      const response = await axios.post("http://localhost:5155/api/Usuarios", values);
      setSucesso("Usuário cadastrado com sucesso!");
      form.reset(); // limpa o formulário
    } catch (err) {
      setErro("Erro ao cadastrar. Verifique os dados.");
      console.error(err);
    }
  };

  return (
    <Box maw={400} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label="Nome"
            placeholder="Seu nome"
            key={form.key('name')}
            {...form.getInputProps('name')}
          />
          <TextInput
            label="Email"
            placeholder="Seu email"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Senha"
            placeholder="Crie uma senha"
            key={form.key('password')}
            {...form.getInputProps('password')}
          />
          <TextInput
            label="Telefone"
            placeholder="(99) 99999-9999"
            key={form.key('phone')}
            {...form.getInputProps('phone')}
          />
          <TextInput
            label="CPF ou Passaporte"
            placeholder="Informe o documento"
            key={form.key('cpfPassaport')}
            {...form.getInputProps('cpfPassaport')}
          />
          <Select
            label="Perfil"
            data={['Cliente', 'Administrador']}
            key={form.key('role')}
            {...form.getInputProps('role')}
          />
          <Button type="submit">Cadastrar</Button>

          {erro && <Notification color="red">{erro}</Notification>}
          {sucesso && <Notification color="green">{sucesso}</Notification>}
        </Stack>
      </form>
    </Box>
  );
}

export default CadastroFormulario;