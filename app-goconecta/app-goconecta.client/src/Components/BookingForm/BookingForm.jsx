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
import { IconCalendar, IconUsers, IconUser, IconCurrencyDollar } from '@tabler/icons-react';

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
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Grid>
        <Grid.Col span={12}> 
          <Stack gap="md"> 
            <Title size="h2">Agende seu Pacote</Title>

            <DatePickerInput
              label="Data da viagem"
              placeholder="Selecione a Data"
              {...form.getInputProps("date")}
              onChange={(value) => {
                form.setFieldValue("date", value);
                form.validateField("date");
              }}
              leftSection={<IconCalendar size={16} />} 
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
              size="compact-sm"
              variant="filled"
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
                    date: data,
                    packageId,
                  },
                });
              }}
            >
              Preencher Dados dos Viajantes
            </Button>
            
            <Flex justify="space-between" align="center">
                <Text fw={700}>Total:</Text>
                <Group gap="xs">
                    <IconCurrencyDollar size={16} />
                    <Text fw={700}>{getTotalPrice()}</Text>
                </Group>
            </Flex>
          </Stack>
        </Grid.Col>
      </Grid>
    </Card>
  );
}