import { useForm } from "@mantine/form";
import { TextInput, Stack } from "@mantine/core";
import { DateInput } from "@mantine/dates";

export default function TravelerForm() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      document: "",
      birthDate: null,
    },
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <Stack ta="left">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />
        <TextInput
          withAsterisk
          label="CPF/Passaporte"
          placeholder="CPF/Passaporte"
          key={form.key("document")}
          {...form.getInputProps("document")}
        />
      <DateInput
        withAsterisk
        label="Idade"
        placeholder="Selecione a data de nascimento"
        key={form.key("birthDate")}
        {...form.getInputProps("birthDate")}
      />
      />
    </Stack>
  );
}
