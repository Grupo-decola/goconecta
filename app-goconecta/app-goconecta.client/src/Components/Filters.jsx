import {
  TextInput,
  NumberInput,
  Group,
  Button,
  Stack,
  Grid,
  Card,
  Text,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import {
  IconSearch,
  IconMapPin,
  IconCurrencyDollar,
  IconCalendar,
} from "@tabler/icons-react";

export default function Filters({
  onFilterChange,
  destination,
  minPrice,
  maxPrice,
  startDate,
  onFieldChange,
}) {
  const handleFilterChange = () => {
    onFilterChange({
      destination,
      minPrice,
      maxPrice,
      startDate,
      endDate,
    });
  };

  const handleClearFilters = () => {
    onFilterChange({
      destination: "",
      minPrice: null,
      maxPrice: null,
      startDate: null,
      endDate: null,
    });
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder mb="xl">
      <Text fw={600} mb="md" size="lg">
        Filtros
      </Text>

      <Grid gutter={{ base: "sm", md: "md" }} grow>
        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 3 }}>
          <TextInput
            leftSection={<IconMapPin size={16} />}
            placeholder="Para onde você quer ir?"
            value={destination}
            onChange={(event) =>
              onFieldChange("destination", event.currentTarget.value)
            }
            label="Destino"
            size="sm"
          />
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 3 }}>
          <Stack gap="xs">
            <Text size="sm" fw={500}>
              Faixa de Preço
            </Text>
            <Group grow gap="xs">
              <NumberInput
                leftSection={<IconCurrencyDollar size={16} />}
                placeholder="Mín"
                value={minPrice}
                onChange={(value) => onFieldChange("minPrice", value)}
                min={0}
                prefix="R$ "
                size="sm"
              />
              <NumberInput
                leftSection={<IconCurrencyDollar size={16} />}
                placeholder="Máx"
                value={maxPrice}
                onChange={(value) => onFieldChange("maxPrice", value)}
                min={0}
                prefix="R$ "
                size="sm"
              />
            </Group>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, sm: 6, md: 6, lg: 3 }}>
          <DateInput
            leftSection={<IconCalendar size={16} />}
            label="Quando você quer viajar?"
            placeholder="Selecione a data"
            value={startDate}
            onChange={(value) => onFieldChange("startDate", value)}
            size="sm"
          />
        </Grid.Col>
      </Grid>

      <Group mt="lg" justify={{ base: "stretch", sm: "flex-end" }} gap="sm">
        <Button
          variant="subtle"
          onClick={handleClearFilters}
          size="sm"
          style={{ flex: "1 1 0" }}
          color="#DA7818"
        >
          Limpar
        </Button>
        <Button
          leftSection={<IconSearch size={16} />}
          onClick={handleFilterChange}
          variant="filled"
          size="sm"
          style={{ flex: "1 1 0" }}
          color="#DA7818"
        >
          Buscar
        </Button>
      </Group>
    </Card>
  );
}
