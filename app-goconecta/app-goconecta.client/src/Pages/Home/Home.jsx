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

// Componentes mock para demonstração
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
    src: '17539888031658365045272634442089_b24507.jpg-db1156be-28aa-4736-ac95-2f39561235a7', 
    alt: 'Cidades Vibrantes',
    title: 'Descubra Cidades Incríveis',
    description: 'Explore destinos urbanos e sua cultura única!'
  },
  { 
    src: 'https://placehold.co/1200x400/B2D7D7/white?text=Destinos+Exóticos', 
    alt: 'Destinos Exóticos',
    title: 'Viaje para o Desconhecido',
    description: 'Aventure-se em lugares exóticos e memoráveis.'
  },
  { 
    src: 'https://placehold.co/1200x400/F0F0B7/black?text=Praias+Paradisíacas', 
    alt: 'Praias Paradisíacas',
    title: 'Relaxe em Praias Deslumbrantes',
    description: 'O sol, a areia e o mar esperam por você!'
  },
  { 
    src: 'https://placehold.co/1200x400/D0A2C9/white?text=Aventura+na+Natureza', 
    alt: 'Aventura na Natureza',
    title: 'Conecte-se com a Natureza',
    description: 'Desfrute de trilhas e paisagens de tirar o fôlego.'
  },
];

// Dados de exemplo para pacotes em destaque
const featuredPackages = [
  { id: 1, title: "Pacote de Férias em Bali", destination: "Bali, Indonésia", image: "https://placehold.co/400x200/FFB6C1/white?text=Bali" },
  { id: 2, title: "Tour Histórico em Roma", destination: "Roma, Itália", image: "https://placehold.co/400x200/87CEEB/white?text=Roma" },
  { id: 3, title: "Safári na África do Sul", destination: "África do Sul", image: "https://placehold.co/400x200/D3D3D3/white?text=Safari" },
  { id: 4, title: "Praias do Nordeste", destination: "Bahia, Brasil", image: "https://placehold.co/400x200/90EE90/white?text=Praias" }
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
            backgroundColor: 'rgba(0,0,0,0.4)', // Fundo escuro para o texto se destacar
            color: 'white',
          }}
          p="md"
        >
          <Stack ta="center">
            {/* Usando o título da imagem para o texto */}
            <Title size={{ base: 'h2', sm: 'h1' }} fw={700}>{image.title}</Title>
            <Text size={{ base: 'sm', sm: 'md' }}>
              {image.description}
            </Text>
            <Button
              size="lg"
              mt="xl"
              color="#DA7818"
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
      {/* Secção principal com o carrossel */}
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

      {/* Secção de Pacotes em Destaque */}
      <Box my="xl">
        <Title order={2} ta="center" mb="lg">Pacotes em Destaque</Title>
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 4 }}
          spacing="xl"
      
        >
          {featuredPackages.map(pkg => <PackageCard key={pkg.id} pkg={pkg} />)}
        </SimpleGrid>
      </Box>

      {/* Secção de Avaliações */}
      <Box my="xl">
        <Grid>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <ReviewView title="Avaliações dos Clientes" />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            {/* Outro conteúdo pode ir aqui, como um CTA ou outro ReviewView */}
            <ReviewView title="Nossa pontuação média" />
          </Grid.Col>
        </Grid>
      </Box>
      
    </Container>
  );
}