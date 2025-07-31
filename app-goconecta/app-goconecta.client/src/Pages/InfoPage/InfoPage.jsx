import { Stack, Text, Title, Box, Grid } from "@mantine/core";
import ImageCarousel from "../../Components/ImageCarousel/ImageCarousel";
import ReviewView from "../../Components/ReviewView/ReviewView";
import Attractions from "../../Components/Attractions/Attractions";
import MediaGallery from "../../Components/MediaGallery/MediaGallery";
import BookingForm from "../../Components/BookingForm/BookingForm";
import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, PackageDetailDTO } from "../../model";
import { useParams } from "react-router-dom";

export default function InfoPage() {
  const [packageDetail, setPackageDetail] = useState(null);
  const { id } = useParams(); // captura o id da URL
  const ENDPOINT = `${API_URL}Packages/${id}`;

  useEffect(() => {
    axios
      .get(ENDPOINT)
      .then((response) => setPackageDetail(new PackageDetailDTO(response.data)))
      .catch((error) => console.error(error));
  }, [ENDPOINT]);

  return (

    <Box
      maw={{ base: '95%', md: '90%', lg: 1200 }} 
      mx="auto" 
      mt="xl" 
      px="md" 
    >
      
      <Grid gutter="xl"> 
        <Grid.Col 
          span={{ base: 12, md: 8 }} 
        >
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

        <Grid.Col 
          span={{ base: 12, md: 4 }} 
        >
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