import {
  Container,
  Title,
  SimpleGrid,
  Loader,
  Center,
  Text,
  Stack,
  Alert,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useState, useEffect } from "react";
import PackageCard from "../../Components/PackageCard.jsx";
import Filters from "../../Components/Filters.jsx";
import { fetchPackages } from "../../services/PackageService.js";
import { useSearchParams } from "react-router-dom";

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  // Estado local dos filtros
  const getFiltersFromParams = () => ({
    destination: searchParams.get("Destination") || "",
    minPrice: searchParams.get("MinPrice") || "",
    maxPrice: searchParams.get("MaxPrice") || "",
    startDate: searchParams.get("AvailabilityStartDate") || null,
    endDate: searchParams.get("AvailabilityEndDate") || null,
  });

  const [filterValues, setFilterValues] = useState(getFiltersFromParams());

  // Sincroniza estado local com searchParams ao montar e ao navegar
  useEffect(() => {
    setFilterValues(getFiltersFromParams());
  }, [searchParams]);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchPackages(searchParams)
      .then((data) => {
        setPackages(data);
        setFilteredPackages(data);
      })
      .catch(() => {
        setError("Erro ao carregar os pacotes. Tente novamente.");
      })
      .finally(() => setLoading(false));
  }, [searchParams]);

  // Atualiza estado local dos filtros conforme usuário interage
  const handleFieldChange = (field, value) => {
    setFilterValues((prev) => ({ ...prev, [field]: value }));
  };

  // Aplica filtros e atualiza searchParams
  const handleFilterChange = (values) => {
    setFilterValues(values);
    const params = {};
    if (values.destination) {
      params.Destination = values.destination;
    }
    if (values.minPrice !== null && values.minPrice !== undefined) {
      params.MinPrice = values.minPrice;
    }
    if (values.maxPrice !== null && values.maxPrice !== undefined) {
      params.MaxPrice = values.maxPrice;
    }
    if (values.startDate) {
      const dateObj =
        values.startDate instanceof Date
          ? values.startDate
          : new Date(values.startDate);
      if (
        dateObj &&
        typeof dateObj.toISOString === "function" &&
        !isNaN(dateObj)
      ) {
        params.AvailabilityStartDate = dateObj.toISOString().split("T")[0];
      }
    }
    if (values.endDate) {
      const dateObj =
        values.endDate instanceof Date
          ? values.endDate
          : new Date(values.endDate);
      if (
        dateObj &&
        typeof dateObj.toISOString === "function" &&
        !isNaN(dateObj)
      ) {
        params.AvailabilityEndDate = dateObj.toISOString().split("T")[0];
      }
    }
    setSearchParams(params);
  };

  if (loading) {
    return (
      <Center h="100vh">
        <Stack align="center" gap="md">
          <Loader size="lg" />
          <Text>Carregando pacotes...</Text>
        </Stack>
      </Center>
    );
  }

  if (error) {
    return (
      <Container size="xl" py="xl">
        <Alert icon={<IconInfoCircle size={16} />} title="Erro" color="red">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container
      size="xl"
      py={{ base: "md", sm: "xl" }}
      px={{ base: "sm", sm: "md" }}
    >
      <Stack gap={{ base: "lg", sm: "xl" }}>
        <Title order={1} ta="center" size="2rem" fw={700}>
          Pacotes de Viagem
        </Title>

        <Filters
          onFilterChange={handleFilterChange}
          destination={filterValues.destination}
          minPrice={filterValues.minPrice}
          maxPrice={filterValues.maxPrice}
          startDate={filterValues.startDate}
          endDate={filterValues.endDate}
          onFieldChange={handleFieldChange}
        />

        {filteredPackages.length === 0 ? (
          <Center py={{ base: 40, sm: 60 }}>
            <Stack align="center" gap="md">
              <IconInfoCircle size={48} color="gray" />
              <Text size="lg" fw={500} c="dimmed" ta="center">
                Nenhum pacote encontrado
              </Text>
              <Text size="sm" c="dimmed" ta="center" maw={400} px="sm">
                Tente ajustar os filtros ou explore outros destinos para
                encontrar o pacote ideal para sua viagem.
              </Text>
            </Stack>
          </Center>
        ) : (
          <>
            <Text size="sm" c="dimmed" px={{ base: "sm", sm: 0 }}>
              {filteredPackages.length} pacote
              {filteredPackages.length !== 1 ? "s" : ""} encontrado
              {filteredPackages.length !== 1 ? "s" : ""}
            </Text>

            <SimpleGrid
              cols={{ base: 1, xs: 2, sm: 2, md: 3, lg: 3, xl: 4 }}
              spacing={{ base: "md", sm: "lg" }}
              verticalSpacing={{ base: "md", sm: "lg" }}
            >
              {filteredPackages.map((pkg) => (
                <PackageCard key={pkg.id} package={pkg} />
              ))}
            </SimpleGrid>
          </>
        )}
      </Stack>
    </Container>
  );
}
