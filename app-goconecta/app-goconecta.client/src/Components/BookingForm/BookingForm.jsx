import {
  Title,
  Card,
  Group,
  NumberInput,
  Stack,
  Button,
  Text,
  Grid,
  Flex,
} from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import {
  IconCalendar,
  IconUsers,
  IconUser,
  IconCurrencyDollar,
} from "@tabler/icons-react";

export default function BookingForm({
  priceAdults,
  priceChildren,
  packageId,
  startDate,
  endDate,
}) {
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
          return "Selecione a Data da viagem";
        }
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const minDate = new Date(today);
        minDate.setDate(today.getDate() + 7); // Viagem deve ser marcada com pelo menos 7 dias de antecedência
        const selected = new Date(value);
        selected.setHours(0, 0, 0, 0);

        if (selected < minDate) {
          return "A viagem deve ser marcada com pelo menos 7 dias de antecedência";
        }
        return null;
      },
    },
  });

  // Calcula o preço total com base nos adultos e crianças
  function getTotalPrice() {
    const totalAdultos = priceAdults * form.getValues().adultos;
    const totalCriancas = (priceChildren || 0) * form.getValues().crianca;
    return `R$ ${(totalAdultos + totalCriancas).toLocaleString("pt-BR")}`;
  }

  return (
    <Card
      shadow="md"
      radius={18}
      p={{ base: 12, sm: 24 }}
      style={{
        border: 'none',
        background: '#fff',
        boxShadow: '0 4px 24px 0 rgba(26,35,72,0.10), 0 1.5px 6px 0 rgba(218,120,24,0.08)',
        minWidth: 0,
        maxWidth: 420,
        margin: '0 auto',
        transition: 'box-shadow 0.2s, background 0.2s',
      }}
    >
      <Stack gap="md">
        <Title order={2} style={{ color: '#182348', fontWeight: 700, fontSize: 24, marginBottom: 2 }}>Agende seu Pacote</Title>
        <DatePickerInput
          label="Data da viagem"
          placeholder="Selecione a Data"
          {...form.getInputProps("date")}
          onChange={(value) => {
            form.setFieldValue("date", value);
            form.validateField("date");
          }}
          leftSection={<IconCalendar size={16} />}
          style={{ width: '100%' }}
        />
        <Group grow>
          <NumberInput
            label="Adultos"
            min={1}
            {...form.getInputProps("adultos")}
            leftSection={<IconUsers size={16} />}
          />
          <NumberInput
            label="Crianças"
            min={0}
            {...form.getInputProps("crianca")}
            leftSection={<IconUser size={16} />}
          />
        </Group>
        <Button
          type="submit"
          fullWidth
          size="md"
          radius="md"
          style={{
            background: 'linear-gradient(90deg, #DA7818 60%, #182348 100%)',
            color: '#fff',
            fontWeight: 700,
            border: 'none',
            borderRadius: 8,
            boxShadow: '0 2px 8px 0 rgba(218,120,24,0.10)',
            marginTop: 8,
            marginBottom: 8,
            transition: 'background 0.18s, box-shadow 0.18s, transform 0.13s',
          }}
          onClick={() => {
            const validation = form.validate();
            if (validation.hasErrors) {
              return;
            }
            const adultos = form.getValues().adultos;
            const crianca = form.getValues().crianca;
            const data = form.getValues().date;
            navigate("/passageiros", {
              state: {
                adults: adultos,
                childs: crianca,
                reservationDate: data,
                packageId,
              },
            });
          }}
        >
          Preencher Dados dos Viajantes
        </Button>
        <Flex justify="space-between" align="center" style={{ background: '#f8f8fa', borderRadius: 8, padding: '8px 14px', marginTop: 6 }}>
          <Text fw={700} style={{ color: '#DA7818' }}>Total:</Text>
          <Group gap="xs">
            <IconCurrencyDollar size={16} color="#DA7818" />
            <Text fw={700} style={{ color: '#182348', fontSize: 18 }}>{getTotalPrice()}</Text>
          </Group>
        </Flex>
      </Stack>
    </Card>
  );
}
