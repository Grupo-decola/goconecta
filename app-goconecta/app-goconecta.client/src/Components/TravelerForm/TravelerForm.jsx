import { forwardRef, useImperativeHandle, useState } from "react";
import {
  TextInput,
  Stack,
  Button,
  Group,
  Grid,
  Box,
  Card,
  Text,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconUser, IconAt, IconId, IconCalendar } from "@tabler/icons-react";

const TravelerForm = forwardRef(({ IsChild, travelerIndex }, ref) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      cpf: "",
      birthDate: null,
    },
    validate: {
      name: (value) => {
        if (!value || value.trim().length < 3) {
          return "Nome obrigatório (mínimo 3 caracteres)";
        }
        return null;
      },
      email: (value) => {
        if (!value) {
          return null;
        }
        return /^\S+@\S+$/.test(value) ? null : "Email inválido";
      },
      cpf: (value) => {
        if (!value) {
          return "CPF ou Passaporte obrigatório";
        }
        const cpfRegex = /^\d{11}$/;
        const passaporteRegex = /^[A-Za-z0-9]{6,}$/;
        if (!cpfRegex.test(value) && !passaporteRegex.test(value)) {
          return "Informe um CPF (11 dígitos) ou passaporte válido";
        }
        return null;
      },
      birthDate: (value) => {
        if (!value) {
          return "Data de nascimento obrigatória";
        }
        const today = new Date();
        const birth = new Date(value);
        if (birth > today) {
          return "Data de nascimento não pode ser futura";
        }
        if (IsChild === true) {
          let age = today.getFullYear() - birth.getFullYear();
          const m = today.getMonth() - birth.getMonth();
          if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--;
          }
          if (age >= 14) {
            return "Criança deve ter menos de 14 anos";
          }
        }
        return null;
      },
    },
  });

  useImperativeHandle(ref, () => ({
    validate: () => form.validate(),
    values: () => form.values,
  }));

  return (
    <Box maw={{ base: "100%", sm: 600, md: 700 }} mx="auto" px="md">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Grid gutter="md">
          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              withAsterisk
              label="Nome Completo"
              placeholder="Insira Seu nome Completo"
              key={form.key("name")}
              {...form.getInputProps("name")}
              leftSection={<IconUser size={16} />}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              label="Email (opcional)"
              placeholder="seu@email.com"
              key={form.key("email")}
              {...form.getInputProps("email")}
              leftSection={<IconAt size={16} />}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <TextInput
              withAsterisk
              label="CPF/Passaporte"
              placeholder="CPF ou Passaporte"
              key={form.key("cpf")}
              {...form.getInputProps("cpf")}
              leftSection={<IconId size={16} />}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <DateInput
              withAsterisk
              label="Data de nascimento"
              placeholder="Selecione a data de nascimento"
              key={form.key("birthDate")}
              maxDate={new Date()}
              {...form.getInputProps("birthDate")}
              leftSection={<IconCalendar size={16} />}
            />
          </Grid.Col>
        </Grid>
      </Card>
    </Box>
  );
});

export default TravelerForm;
