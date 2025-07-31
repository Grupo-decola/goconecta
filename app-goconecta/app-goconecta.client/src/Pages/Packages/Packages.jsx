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
import { fetchPackages } from "../../services/PackagesService.js";

export default function Packages() {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchPackages()
      .then((data) => {
        setPackages(data);
        setFilteredPackages(data);
      })
      .catch((error) => {
        console.error("Error loading packages:", error);
        setError("Erro ao carregar os pacotes. Tente novamente.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleFilterChange = ({
    destination,
    minPrice,
    maxPrice,
    startDate,
    endDate,
  }) => {
    let filtered = packages;

    if (destination) {
      filtered = filtered.filter(
        (pkg) =>
          pkg.destination.toLowerCase().includes(destination.toLowerCase()) ||
          pkg.title.toLowerCase().includes(destination.toLowerCase())
      );
    }

    if (minPrice !== null) {
      filtered = filtered.filter(pkg => pkg.priceAdults >= minPrice);
    }
    if (maxPrice !== null) {
      filtered = filtered.filter(pkg => pkg.priceAdults <= maxPrice);
    }

    if (startDate) {
      filtered = filtered.filter((pkg) => {
        const pkgStartDate = new Date(pkg.startDate);
        return pkgStartDate >= startDate;
      });
    }
    if (endDate) {
      filtered = filtered.filter((pkg) => {
        const pkgEndDate = new Date(pkg.endDate);
        return pkgEndDate <= endDate;
      });
    }

    setFilteredPackages(filtered);
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

        <Filters onFilterChange={handleFilterChange} />

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
