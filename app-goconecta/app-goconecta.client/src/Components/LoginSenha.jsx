import React from 'react';
import {
  TextInput,
  PasswordInput,
  Button,
  Box,
  Stack,
  Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';

function LoginForm() {
  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      email: '',
      senha: '',
    },
    validate: {
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : 'Email inválido',
      senha: (value) =>
        value.length >= 6 ? null : 'A senha deve ter pelo menos 6 caracteres',
    },
  });

  const handleLogin = (values) => {
    console.log('Tentando login com:', values);
    // aqui você pode chamar uma API com fetch ou axios
  };

  return (
    <Box maw={400} mx="auto">
      <Title order={3} mb="md">Login</Title>
      <form onSubmit={form.onSubmit(handleLogin)}>
        <Stack>
          <TextInput
            label="Email"
            placeholder="Seu email"
            key={form.key('email')}
            {...form.getInputProps('email')}
          />
          <PasswordInput
            label="Senha"
            placeholder="Digite sua senha"
            key={form.key('senha')}
            {...form.getInputProps('senha')}
          />
          <Button type="submit">Entrar</Button>
        </Stack>
      </form>
    </Box>
  );
}

export default LoginForm;
