import { Box, Card, Grid, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { IconAt, IconCalendar, IconId, IconUser } from "@tabler/icons-react";
import { forwardRef, useImperativeHandle } from "react";
import { IMaskInput } from "react-imask";

const TravelerForm = forwardRef(({ IsChild }, ref) => {
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
              label="CPF ou Passaporte"
              placeholder="123.456.789-00 ou AB123456"
              component={IMaskInput}
              mask={/^[0-9]/.test(form.values.cpf) ? "000.000.000-00" : false}
              {...form.getInputProps("cpf")}
              leftSection={<IconId size={16} />}
            />
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6 }}>
            <DatePickerInput
              withAsterisk
              label="Data de nascimento"
              placeholder="selecione a data de nascimento"
              key={form.key("birthDate")}
              maxDate={new Date()}
              valueFormat="DD/MM/YYYY"
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
