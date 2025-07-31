import {
  Box,
  Container,
  Grid,
  Text,
  Anchor,
  Group,
  Divider,
  Stack,
} from '@mantine/core';
import {
  InstagramLogo,
  LinkedinLogo,
  EnvelopeSimple,
  Phone,
} from '@phosphor-icons/react';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <Box
      component="footer"
      bg="#f2e7dc" // tom bege mais sólido que o header-top
      py="xl"
      mt="xl"
      style={{ borderTop: '1px solid #e0e0e0' }}
    >
      <Container size="lg">
        <Grid gutter="xl">
          {/* Sobre a empresa */}
          <Grid.Col xs={12} sm={4}>
            <Text fw={700} size="lg" style={{ color: '#DA7818' }}>
              GoConecta
            </Text>
            <Text size="sm" color="#182348" mt={4}>
              Descubra, planeje e viaje com confiança. A gente cuida de tudo para você viver o melhor do mundo.
            </Text>
          </Grid.Col>

          {/* Navegação */}
          <Grid.Col xs={12} sm={4}>
            <Text fw={600} mb="xs" style={{ color: '#182348' }}>Navegue</Text>
            <Stack spacing={6}>
              <Anchor href="/" size="sm" style={{ color: '#182348' }}>Início</Anchor>
              <Anchor href="/pacotes" size="sm" style={{ color: '#182348' }}>Pacotes</Anchor>
              <Anchor href="/hospedagens" size="sm" style={{ color: '#182348' }}>Hospedagens</Anchor>
              <Anchor href="/contato" size="sm" style={{ color: '#182348' }}>Contato</Anchor>
            </Stack>
          </Grid.Col>

          {/* Contato e redes sociais */}
          <Grid.Col xs={12} sm={4}>
            <Text fw={600} mb="xs" style={{ color: '#182348' }}>Fale Conosco</Text>
            <Group spacing={6}>
              <Phone size={20} color="#DA7818" />
              <Text size="sm" color="#182348">0800 123 4567</Text>
            </Group>
            <Group spacing={6} mt={4}>
              <EnvelopeSimple size={20} color="#DA7818" />
              <Text size="sm" color="#182348">contato@goconecta.com</Text>
            </Group>

            <Text fw={600} mt="md" mb={4} style={{ color: '#182348' }}>Redes Sociais</Text>
            <Group spacing="md">
              <Anchor href="https://instagram.com" target="_blank">
                <InstagramLogo size={26} color="#182348" />
              </Anchor>
              <Anchor href="https://linkedin.com" target="_blank">
                <LinkedinLogo size={26} color="#182348" />
              </Anchor>
            </Group>
          </Grid.Col>
        </Grid>

        <Divider my="md" color="#DA7818" />

        <Text size="xs" align="center" style={{ color: '#182348' }}>
          © {year} GoConecta Viagens · Todos os direitos reservados
        </Text>
      </Container>
    </Box>
  );
}