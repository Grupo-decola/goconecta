import { Carousel } from "@mantine/carousel";
import {
  Title,
  Text,
  Button,
  Container,
  Image,
  Box,
  SimpleGrid,
  Card,
  Grid,
  Rating,
  Stack,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

import rioImage from "../../assets/img/rio-de-janeiro.jpg";
import amazonasImage from "../../assets/img/amazonas.jpg";
import minasImage from "../../assets/img/minas-gerais.jpg";
import cearaImage from "../../assets/img/ceara.jpg";
import { useEffect, useState } from "react";
import { fetchPackages } from "../../services/PackageService";
import PackageCard from "../../Components/Packages/PackageCard";

function ReviewView({ title }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack align="center" gap="xs">
        <Title order={3}>{title}</Title>
        <Rating value={4.8} fractions={4} readOnly size="xl" />
        <Text size="sm" c="dimmed">
          Baseado em 400 avaliações
        </Text>
      </Stack>
    </Card>
  );
}

const carouselImages = [
  {
    src: rioImage,
    alt: "Rio de Janeiro",
    title: "Explore o Rio de Janeiro",
    description: "Conheça a cidade maravilhosa e suas praias icónicas.",
  },
  {
    src: amazonasImage,
    alt: "Amazonas",
    title: "Aventura na Floresta Amazônia",
    description: "Mergulhe na biodiversidade da maior floresta do mundo.",
  },
  {
    src: minasImage,
    alt: "Minas Gerais",
    title: "História e Cultura em Minas Gerais",
    description: "Visite as cidades históricas e a rica culinária mineira.",
  },
  {
    src: cearaImage,
    alt: "Praias do Ceará",
    title: "Sol e Vento nas Praias do Ceará",
    description: "Relaxe nas praias deslumbrantes do litoral nordestino.",
  },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    fetchPackages({ PageSize: 3 }).then((data) => {
      console.log("Pacotes recebidos na Home:", data);
      setPackages(data);
    });
  }, []);

  const slides = carouselImages.map((image) => (
    <Carousel.Slide key={image.src}>
      <Box style={{ position: "relative" }}>
        <Image src={image.src} alt={image.alt} h={{ base: 250, sm: 400 }} />
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.4)",
            color: "white",
          }}
          p="md"
        >
          <Stack ta="center">
            <Title size={{ base: "h2", sm: "h1" }} fw={700}>
              {image.title}
            </Title>
            <Text size={{ base: "sm", sm: "md" }}>{image.description}</Text>
            <Button
              size="lg"
              color="#DA7818"
              mt="xl"
              onClick={() =>
                navigate(
                  `/pacotes?destination=${encodeURIComponent(image.alt)}`
                )
              }
            >
              Explorar Pacotes
            </Button>
          </Stack>
        </Box>
      </Box>
    </Carousel.Slide>
  ));

  return (
    <Container size="xl" my="md">
      <Carousel
        withIndicators
        loop
        height={{ base: 250, sm: 400 }}
        slideSize={{ base: "100%", sm: "50%", md: "33.333%" }}
        slideGap="md"
        align="start"
      >
        {slides}
      </Carousel>

      <Box my="xl">
        <Title order={2} ta="center" mb="lg">
          Pacotes em Destaque
        </Title>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} package={pkg} />
          ))}
        </SimpleGrid>
      </Box>
      <Box my="xl">
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <ReviewView title="Avaliações dos Clientes" />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <ReviewView title="Nossa pontuação média" />
          </Grid.Col>
        </Grid>
      </Box>
    </Container>
  );
}
