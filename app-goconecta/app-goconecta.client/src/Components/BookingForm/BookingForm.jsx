import {
  Title,
  Card,
  Group,
  NumberInput,
  Stack,
  Button,
  Text,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

export default function BookingForm({ priceAdults, priceChildren, packageId }) {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      date: null,
      adultos: 1,
      crianca: 0,
    },
    validate: {
      date: (value) => {
        if (!value) {
          return "Selecione a data da viagem";
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const minDate = new Date(today);
        minDate.setDate(today.getDate() + 7);
        const selected = new Date(value);
        selected.setHours(0, 0, 0, 0);

        if (selected < minDate) {
          return "A viagem deve ser marcada com pelo menos 7 dias de antecedência";
        }
        return null;
      },
    },
  });

  function getTotalPrice() {
    const totalAdultos = priceAdults * form.getValues().adultos;
    const totalCriancas = (priceChildren || 0) * form.getValues().crianca;
    return `R$ ${(totalAdultos + totalCriancas).toLocaleString("pt-BR")}`;
  }

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Stack gap="md">
        <Title size="h2">Agende seu pacote</Title>

        <DatePickerInput
          label="Data da viagem"
          placeholder="Selecione a data"
          {...form.getInputProps("date")}
          onChange={(value) => {
            form.setFieldValue("date", value);
            form.validateField("date");
          }}
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
        <Button
          type="submit"
          fullWidth
          size="compact-sm"
          variant="filled"
          onClick={() => {
            const validation = form.validate();
            if (validation.hasErrors) {
              // O Mantine já exibe os erros nos campos automaticamente
              return;
            }
            const adultos = form.getValues().adultos;
            const crianca = form.getValues().crianca;
            const data = form.getValues().date;
            navigate("/passageiros", {
              state: {
                adults: adultos,
                childs: crianca,
                date: data,
                packageId,
              },
            });
          }}
        >
          Preencher dados dos viajantes
        </Button>
        <Text>Total: {getTotalPrice()}</Text>
      </Stack>
    </Card>
  );
}
