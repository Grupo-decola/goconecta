import { Title, Card, Group, NumberInput, Stack, Button } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";

export default function BookingForm() {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      data: null,
      adultos: 1,
      crianca: 0,
    },
  });

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Stack gap="md">
        <Title size="h2">Agende seu pacote</Title>

        <DatePickerInput
          label="Data da viagem"
          placeholder="Selecione a data"
          {...form.getInputProps("data")}
        />

        <Group grow>
          <NumberInput
            label="Adultos"
            min={1}
            {...form.getInputProps("adultos")}
          />
          <NumberInput
            label="Crianças"
            min={0}
            {...form.getInputProps("crianca")}
          />
        </Group>

        <Button type="submit" fullWidth>
          Verificar disponibilidade
        </Button>
      </Stack>
    </Card>
  );
}
