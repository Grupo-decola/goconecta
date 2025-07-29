import { useForm } from "@mantine/form";
import { TextInput, Stack, Button, Group } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { forwardRef, useImperativeHandle } from "react";

const TravelerForm = forwardRef(({ IsChild }, ref) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      email: "",
      cpfPassport: "",
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
        } // email opcional
        return /^\S+@\S+$/.test(value) ? null : "Email inválido";
      },
      cpfPassport: (value) => {
        if (!value) {
          return "CPF ou Passaporte obrigatório";
        }
        // Validação simples de CPF (11 dígitos) ou passaporte (mínimo 6 caracteres)
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
          // calcula idade
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
    <Stack ta="left">
      <TextInput
        withAsterisk
        label="Name"
        placeholder="Insira Seu nome Completo"
        key={form.key("name")}
        {...form.getInputProps("name")}
      />
      <TextInput
        label="Email(opcional)"
        placeholder="your@email.com"
        key={form.key("email")}
        {...form.getInputProps("email")}
      />
      <TextInput
        withAsterisk
        label="CPF/Passaporte"
        placeholder="CPF/Passaporte"
        key={form.key("cpfPassport")}
        {...form.getInputProps("cpfPassport")}
      />
      <DateInput
        withAsterisk
        label="Data de nascimento"
        placeholder="Selecione a data de nascimento"
        key={form.key("birthDate")}
        maxDate={new Date()}
        {...form.getInputProps("birthDate")}
      />
    </Stack>
  );
});

export default TravelerForm;
