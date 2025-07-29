import { Stack, Text, Title } from "@mantine/core";
import ImageCarousel from "../../Components/ImageCarousel/ImageCarousel";
import ReviewView from "../../Components/ReviewView/ReviewView";
import Attractions from "../../Components/Attractions/Attractions";
import MediaGallery from "../../Components/MediaGallery/MediaGallery";
import BookingForm from "../../Components/BookingForm/BookingForm";

export default function InfoPage() {
  return (
    <Stack gap="md" maw="80vw">
      <ImageCarousel />
      <Title>Detalhes do pacote</Title>
      <Text c="gray-medium.4" size="xs">
        Localização
      </Text>
      <ReviewView />
      <Text>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro adipisci
        facilis quisquam voluptatibus sit eos similique quibusdam voluptatem.
        Suscipit minus cupiditate omnis nulla nesciunt perspiciatis porro nisi
        iure illum facere!
      </Text>
      <Attractions />
      <MediaGallery />
      <BookingForm />
    </Stack>
  );
}
