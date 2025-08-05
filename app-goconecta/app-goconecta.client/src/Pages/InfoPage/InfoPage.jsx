import {
  Box,
  Grid,
  Stack,
  Text,
  Title,
  Center,
  Loader,
  Group,
} from "@mantine/core";
import ImageCarousel from "../../Components/ImageCarousel/ImageCarousel";
import Attractions from "../../Components/Attractions/Attractions";
import ReviewView from "../../Components/ReviewView/ReviewView";
import BookingForm from "../../Components/BookingForm/BookingForm";
import UserReview from "../../Components/UserReview/UserReview";

import { PackageDetailDTO } from "../../dtos/PackageDetailsDTO";
import { useParams } from "react-router-dom";
import { fetchPackageDetail } from "../../services/PackageService";
import { useState, useEffect } from "react";
import { fetchRatings } from "../../services/RatingService";
import { IconMapPin } from "@tabler/icons-react";

export default function InfoPage() {
  const [packageDetail, setPackageDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // captura o id da URL
  // Controle de expansão dos comentários
  const [expandedReviews, setExpandedReviews] = useState({});
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState(null);
  const handleToggleExpand = (idx) => {
    setExpandedReviews((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchPackageDetail(id)
      .then((data) => {
        setPackageDetail(new PackageDetailDTO(data));
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    if (!id) {
      return;
    }
    setReviewsLoading(true);
    setReviewsError(null);
    fetchRatings(id)
      .then((data) => {
        setReviews(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        setReviewsError(err);
        setReviews([]);
      })
      .finally(() => {
        setReviewsLoading(false);
      });
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
    return <Text c="red">Erro ao carregar pacote.</Text>;
  }
  if (!packageDetail) {
    return null;
  }

  return (
    <Box maw={{ base: "95%", md: "90%", lg: 1200 }} mx="auto" mt="xl" px="md">
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap="md">
            <ImageCarousel images={packageDetail.images} />
            <Title order={1}>Detalhes do pacote</Title>
            <Group gap="xs" c="dimmed" wrap="nowrap">
              <IconMapPin />
              <Text c="gray-medium.4" size="sm">
                {packageDetail?.destination}
              </Text>
            </Group>
            {(() => {
              return (
                <ReviewView
                  title={packageDetail?.title}
                  ratingData={packageDetail?.ratingData}
                />
              );
            })()}
            <Text>{packageDetail?.description}</Text>
            <Attractions amenities={packageDetail.amenities} />
            {/* Reviews dos usuários */}
            <Box mt="md">
              {reviewsLoading ? (
                <Text size="sm">Carregando avaliações...</Text>
              ) : reviewsError ? (
                <Text size="sm" color="red">
                  Erro ao carregar avaliações.
                </Text>
              ) : reviews.length === 0 ? (
                <Text size="sm" color="dimmed">
                  Nenhuma avaliação para este pacote ainda.
                </Text>
              ) : (
                reviews.map((review, idx) => (
                  <UserReview
                    key={idx}
                    {...review}
                    expanded={!!expandedReviews[idx]}
                    onToggleExpand={() => handleToggleExpand(idx)}
                  />
                ))
              )}
            </Box>
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <BookingForm
            priceAdults={packageDetail?.priceAdults}
            priceChildren={packageDetail?.priceChildren}
            packageId={packageDetail?.id}
            startDate={packageDetail?.availabilityStartDate}
            endDate={packageDetail?.availabilityEndDate}
          />
        </Grid.Col>
      </Grid>
    </Box>
  );
}
