import React from 'react';
import {
  TextInput,
  PasswordInput,
  Select,
  Button,
  Box,
  Stack,
} from '@mantine/core';
import { useForm } from '@mantine/form';

function CadastroFormulario() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      nome: '',
      email: '',
      senha: '',
      telefone: '',
      cpfPassaporte: '',
      perfil: 'Cliente',
    },

    validate: {
      nome: (value) => value.length < 2 ? 'Nome deve ter pelo menos 2 letras' : null,
      email: (value) => /^\S+@\S+$/.test(value) ? null : 'Email inválido',
      senha: (value) => value.length < 6 ? 'A senha deve ter no mínimo 6 caracteres' : null,
      cpfPassaporte: (value) => value.trim() !== '' ? null : 'Informe CPF ou Passaporte',
    },
  });

  return (
    <Box maw={400} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log('Dados enviados:', values))}>
        <Stack>
          <TextInput
            label="Nome"
            placeholder="Seu nome"
            key={form.key('nome')}
            {...form.getInputProps('nome')}
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
            key={form.key('senha')}
            {...form.getInputProps('senha')}
          />
          <TextInput
            label="Telefone"
            placeholder="(99) 99999-9999"
            key={form.key('telefone')}
            {...form.getInputProps('telefone')}
          />
          <TextInput
            label="CPF ou Passaporte"
            placeholder="Informe o documento"
            key={form.key('cpfPassaporte')}
            {...form.getInputProps('cpfPassaporte')}
          />
          <Select
            label="Perfil"
            data={['Cliente', 'Administrador']}
            key={form.key('perfil')}
            {...form.getInputProps('perfil')}
          />
          <Button type="submit">Enviar</Button>
        </Stack>
      </form>
    </Box>
  );
}

export default CadastroFormulario;
