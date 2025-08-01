import { Carousel } from '@mantine/carousel';
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
  Group,
  Rating,
  Stack
} from '@mantine/core';
import { IconMapPin } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import rioImage from '../../assets/img/rio-de-janeiro.jpg';
import amazonasImage from '../../assets/img/amazonas.jpg';
import minasImage from '../../assets/img/minas-gerais.jpg';
import cearaImage from '../../assets/img/ceara.jpg';
import saoPauloImage from '../../assets/img/sao-paulo.jpg';


function PackageCard({ pkg }) {
  const navigate = useNavigate();
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder>
      <Image src={pkg.image} height={160} alt={pkg.title} />
      <Stack mt="md">
        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={700} lineClamp={1}>{pkg.title}</Text>
        </Group>
        <Group gap="xs" c="dimmed">
          <IconMapPin size={14} />
          <Text size="sm">{pkg.destination}</Text>
        </Group>
        <Button 
          variant="filled" 
          fullWidth
          mt="md" 
          color="#DA7818"
          onClick={() => navigate(`/pacote/${pkg.id}`)}
        >
          Ver Detalhes
        </Button>
      </Stack>
    </Card>
  );
}

function ReviewView({ title }) {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack align="center" gap="xs">
        <Title order={3}>{title}</Title>
        <Rating value={4.8} fractions={4} readOnly size="xl" />
        <Text size="sm" c="dimmed">Baseado em 400 avaliações</Text>
      </Stack>
    </Card>
  );
}

const carouselImages = [
  { 
    src: rioImage,
    alt: 'Rio de Janeiro',
    title: 'Explore o Rio de Janeiro',
    description: 'Conheça a cidade maravilhosa e suas praias icónicas.'
  },
  { 
    src: amazonasImage,
    alt: 'Amazonas',
    title: 'Aventura na Floresta Amazónica',
    description: 'Mergulhe na biodiversidade da maior floresta do mundo.'
  },
  { 
    src: minasImage,
    alt: 'Minas Gerais',
    title: 'História e Cultura em Minas Gerais',
    description: 'Visite as cidades históricas e a rica culinária mineira.'
  },
  { 
    src: cearaImage,
    alt: 'Praias do Ceará',
    title: 'Sol e Vento nas Praias do Ceará',
    description: 'Relaxe nas praias deslumbrantes do litoral nordestino.'
  },
];

const featuredPackages = [
  { id: 2, title: "Roteiro Histórico em Minas", destination: "Minas Gerais, MG", image: minasImage },
  { id: 3, title: "Experiência Urbana em São Paulo", destination: "São Paulo, SP", image: saoPauloImage },
  { id: 4, title: "Aventura na Amazônia", destination: "Amazonas, AM", image: amazonasImage },
];

export default function HomePage() {
  const navigate = useNavigate();

  const slides = carouselImages.map((image) => (
    <Carousel.Slide key={image.src}>
      <Box style={{ position: 'relative' }}>
        <Image src={image.src} alt={image.alt} h={{ base: 250, sm: 400 }} />
        <Box 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
            color: 'white',
          }}
          p="md"
        >
          <Stack ta="center">
            <Title size={{ base: 'h2', sm: 'h1' }} fw={700}>{image.title}</Title>
            <Text size={{ base: 'sm', sm: 'md' }}>
              {image.description}
            </Text>
            <Button
              size="lg"
              color="#DA7818"
              mt="xl"
              onClick={() => navigate('/pacotes')}
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
        slideSize={{ base: '100%', sm: '50%', md: '33.333%' }}
        slideGap="md"
        align="start"
      >
        {slides}
      </Carousel>

      <Box my="xl">
        <Title order={2} ta="center" mb="lg">Pacotes em Destaque</Title>
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3 }}
          spacing="xl"
        >
          {featuredPackages.map(pkg => <PackageCard key={pkg.id} pkg={pkg} />)}
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