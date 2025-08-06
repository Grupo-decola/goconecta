import {
  Container,
  Title,
  Text,
  List,
  ThemeIcon,
  Card,
  Grid,
  Box,
  Divider,
} from "@mantine/core";
import { IconDiscount2, IconGift, IconClock, IconMap } from "@tabler/icons-react";

export default function BeneficiosPage() {
  return (
    <Box bg="#fff" pt={40} pb={60}>
      <Container size="lg">
        <Title order={2} mb="sm" c="#DA7818">
          Passaporte GoConecta
        </Title>
        <Text size="lg" mb="lg" c="#182348">
          Um programa de benefícios exclusivo para quem ama viajar com conforto,
          economia e vantagens especiais!
        </Text>

        <Divider my="xl" />

        <Grid gutter="xl">
          <Grid.Col xs={12} sm={6}>
            <Title order={3} size="h4" c="#182348" mb="xs">
              Vantagens do Passaporte
            </Title>
            <List spacing="sm" size="md" icon={<ThemeIcon color="orange" radius="xl" size={24}>🎁</ThemeIcon>}>
              <List.Item>Descontos exclusivos em pacotes e hospedagens</List.Item>
              <List.Item>Acesso antecipado a promoções especiais</List.Item>
              <List.Item>Atendimento prioritário com nossos consultores</List.Item>
              <List.Item>Pontos acumulados a cada reserva</List.Item>
              <List.Item>Presente especial no mês do seu aniversário</List.Item>
            </List>
          </Grid.Col>

          <Grid.Col xs={12} sm={6}>
            <Card shadow="sm" radius="md" withBorder p="lg" bg="#fdf3e7">
              <Title order={3} size="h4" mb="sm" c="#182348">
                Como participar?
              </Title>
              <Text size="md" c="#213547">
                É simples! Crie sua conta gratuitamente e comece a reservar com a gente.
                A cada nova viagem, você acumula pontos e desbloqueia novos benefícios.
              </Text>
            </Card>
          </Grid.Col>
        </Grid>

        <Divider my="xl" />

        <Title order={3} size="h4" mb="sm" c="#182348">
          Por que escolher o GoConecta?
        </Title>

        <Grid gutter="md">
          <Grid.Col xs={12} sm={6} md={3}>
            <Card shadow="xs" withBorder p="md">
              <IconDiscount2 size={32} color="#DA7818" />
              <Text fw={600} mt="sm" c="#182348">Melhores Preços</Text>
              <Text size="sm" c="#213547">Descontos reais e exclusivos só para membros Passaporte.</Text>
            </Card>
          </Grid.Col>

          <Grid.Col xs={12} sm={6} md={3}>
            <Card shadow="xs" withBorder p="md">
              <IconGift size={32} color="#DA7818" />
              <Text fw={600} mt="sm" c="#182348">Benefícios Extras</Text>
              <Text size="sm" c="#213547">Surpresas e mimos para quem viaja com frequência.</Text>
            </Card>
          </Grid.Col>

          <Grid.Col xs={12} sm={6} md={3}>
            <Card shadow="xs" withBorder p="md">
              <IconClock size={32} color="#DA7818" />
              <Text fw={600} mt="sm" c="#182348">Atendimento Prioritário</Text>
              <Text size="sm" c="#213547">Suporte rápido e exclusivo em todas as suas reservas.</Text>
            </Card>
          </Grid.Col>

          <Grid.Col xs={12} sm={6} md={3}>
            <Card shadow="xs" withBorder p="md">
              <IconMap size={32} color="#DA7818" />
              <Text fw={600} mt="sm" c="#182348">Experiências Incríveis</Text>
              <Text size="sm" c="#213547">Destinos selecionados para uma viagem perfeita.</Text>
            </Card>
          </Grid.Col>
        </Grid>
      </Container>
    </Box>
  );
}