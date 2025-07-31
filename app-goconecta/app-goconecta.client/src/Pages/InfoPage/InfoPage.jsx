import { Stack, Text, Title, Box, Grid, Center, Loader } from "@mantine/core";
import ImageCarousel from "../../Components/ImageCarousel/ImageCarousel";
import ReviewView from "../../Components/ReviewView/ReviewView";
import Attractions from "../../Components/Attractions/Attractions";
import MediaGallery from "../../Components/MediaGallery/MediaGallery";
import BookingForm from "../../Components/BookingForm/BookingForm";
import { useEffect, useState } from "react";

import { PackageDetailDTO } from "../../model";
import { useParams } from "react-router-dom";
import { fetchPackageDetail } from "../../services/PackageService";

export default function InfoPage() {
  const [packageDetail, setPackageDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // captura o id da URL

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchPackageDetail(id)
      .then((data) => setPackageDetail(new PackageDetailDTO(data)))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Center h="100vh">
        <Stack align="center" gap="md">
          <Loader size="lg" />
          <Text>Carregando pacote...</Text>
        </Stack>
      </Center>
    );
  }
  if (error) {
    return <Text color="red">Erro ao carregar pacote.</Text>;
  }
  if (!packageDetail) {
    return null;
  }

  return (
    <Box maw={{ base: "95%", md: "90%", lg: 1200 }} mx="auto" mt="xl" px="md">
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap="md">
            <ImageCarousel />
            <Title order={1}>Detalhes do pacote</Title>
            <Text c="gray-medium.4" size="xs">
              {packageDetail?.destination}
            </Text>
            <ReviewView title={packageDetail?.title} />
            <Text>{packageDetail?.description}</Text>
            <Attractions />
            <MediaGallery />
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <BookingForm
            priceAdults={packageDetail?.priceAdults}
            priceChildren={packageDetail?.priceChildren}
            packageId={packageDetail?.id}
          />
        </Grid.Col>
      </Grid>
    </Box>
  );
}
