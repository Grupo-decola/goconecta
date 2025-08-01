import React, { useEffect, useState } from 'react';
import {
  Card,
  Text,
  Stack,
  Badge,
  Group,
  Container,
  Loader,
  Center,
  Paper,
  Button,
  Image,
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconCheck, IconClock, IconCalendar, IconMapPin } from '@tabler/icons-react';

import { getReservationsByUserId } from '../../services/ReservationService';
import noReservation from '../../assets/img/undraw_travelers_kud9.svg';

function MinhasReservas() {
  const [reservas, setReservas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getReservationsByUserId()
      .then((data) => {
        console.log("Reservas carregadas:", data);
        setReservas(data);
      })
      .catch((error) => {
        console.error("Erro ao buscar reservas:", error);
      })
      .finally(() => setCarregando(false));
  }, []);

  if (carregando) {
    return (
      <Container p="md">
        <Loader size="lg" />
        <Text>Carregando suas reservas...</Text>
      </Container>
    );
  }

  return (
    <Container py="xl" px={{ base: 'sm', sm: 'md', md: 'xl' }}>
      <Text size="xl" fw={700} mb="md" ta="center">
        Minhas Reservas
      </Text>

      {reservas.length === 0 ? (
        <Center mih="60vh">
          <Paper
            shadow="md"
            p="md"
            radius="md"
            withBorder
            w="100%"
            maw={480}
            mx="auto"
            ta="center"
          >
            <Image
              src={noReservation}
              alt="Sem reservas"
              height={120}
              fit="contain"
              mb="md"
              withPlaceholder
              mx="auto"
            />
            <Stack spacing="xs" align="center">
              <Text size="lg" fw={600} ta="center">
                Você ainda não possui reservas
              </Text>
              <Text size="sm" c="dimmed" ta="center">
                Que tal começar agora sua próxima aventura?
              </Text>
              <Button
                onClick={() => navigate('/pacotes')}
                color="orange"
                radius="md"
                fullWidth
                mt="sm"
              >
                Ver Pacotes Disponíveis
              </Button>
            </Stack>
          </Paper>
        </Center>
      ) : (
        <Stack spacing="md">
          {reservas.map((reserva) => (
            <Card
              key={reserva.id}
              shadow="md"
              padding="md"
              radius="md"
              withBorder
              style={{
                transition: 'transform 0.2s',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.01)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            >
              {/* IMAGEM REMOVIDA AQUI */}

              <Stack spacing="xs" mt="sm">
                <Group position="apart" mb="xs" wrap="wrap">
                  <Text fw={600} size="lg">{reserva.package.title}</Text>
                  <Badge
                    color={reserva.status === 'Confirmada' ? 'green' : 'orange'}
                    leftSection={
                      reserva.status === 'Confirmada' ? (
                        <IconCheck size={12} />
                      ) : (
                        <IconClock size={12} />
                      )
                    }
                  >
                    {reserva.status}
                  </Badge>
                </Group>

                <Text size="sm" color="dimmed">
                  Número da reserva: <strong>{reserva.reservationNumber}</strong>
                </Text>

                <Group spacing="xs">
                  <IconMapPin size={16} />
                  <Text size="sm">Destino: {reserva.package.destination}</Text>
                </Group>

                <Text size="sm">Hotel: {reserva.package.hotel?.name}</Text>

                <Group spacing="xs">
                  <IconCalendar size={16} />
                  <Text size="sm">
                    Data da reserva:{' '}
                    {new Date(reserva.reservationDate).toLocaleDateString('pt-BR')}
                  </Text>
                </Group>

                <Text size="sm">
                  Preço (Adulto): R$ {reserva.package.priceAdults.toFixed(2)}
                </Text>
              </Stack>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
}

export default MinhasReservas;