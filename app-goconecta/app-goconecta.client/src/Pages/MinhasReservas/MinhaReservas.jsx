import React, { useEffect, useState } from "react";
import {
  Text,
  Stack,
  Container,
  Loader,
  Center,
  Paper,
  Button,
  Image,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

import { getReservationsByUserId } from "../../services/ReservationService";
import noReservation from "../../assets/img/undraw_travelers_kud9.svg";
import { createRating } from "../../services/RatingService";
import ReservaCard from "./ReservaCard";
import ModalAvaliacao from "./ModalAvaliacao";

function MinhasReservas() {
  const [reservas, setReservas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getReservationsByUserId()
      .then((data) => {
        const ordenadas = ordenarReservas(data);
        setReservas(ordenadas);
        // console.log(ordenadas);
      })
      .catch((error) => {
        // Pode-se adicionar um toast de erro aqui
        // console.error("Erro ao buscar reservas:", error);
      })
      .finally(() => setCarregando(false));
  }, []);

  const handleAvaliar = (packageId) => {
    setSelectedPackageId(packageId);
    setModalOpen(true);
  };

  const handleSubmitAvaliacao = async (values) => {
    try {
      await createRating(selectedPackageId, {
        rating: values.rating,
        comment: values.comment,
      });
      // Sucesso: pode exibir um toast
    } catch (error) {
      // Erro: pode exibir um toast
    } finally {
      setModalOpen(false);
    }
  };
  // Função para determinar status calculado (conclude)
  function getStatusReserva(reserva) {
    const statusApi = reserva.status?.toLowerCase();
    const dataReserva = new Date(reserva.reservationDate);
    const duracao = Number(reserva.package?.durationDays) || 0;
    const dataFim = new Date(dataReserva);
    dataFim.setDate(dataFim.getDate() + duracao);
    const agora = new Date();

    if (statusApi === "confirmed") {
      // Se a data de fim já passou, vira concluída
      if (agora > dataFim) {
        return "conclude";
      }
      return "confirmed";
    }
    if (statusApi === "pending") {
      return "pending";
    }
    // Se não for confirmada ou pendente, mas já passou do fim, considera concluída
    if (agora > dataFim) {
      return "conclude";
    }
    // Se não for concluída e não tiver status conhecido, mantém o original
    return statusApi || "unknown";
  }

  // Função para ordenar reservas por status: confirmed > pending > conclude > outros
  function ordenarReservas(reservas) {
    const statusOrder = { confirmed: 0, pending: 2, conclude: 1 };
    return [...reservas].sort((a, b) => {
      const statusA = getStatusReserva(a);
      const statusB = getStatusReserva(b);
      const orderA = statusOrder[statusA] ?? 99;
      const orderB = statusOrder[statusB] ?? 99;
      return orderA - orderB;
    });
  }

  if (carregando) {
    return (
      <Container p="md">
        <Loader size="lg" />
        <Text>Carregando suas reservas...</Text>
      </Container>
    );
  }

  return (
    <Container py="xl" px={{ base: "sm", sm: "md", md: "xl" }}>
      <Text size="xl" fw={700} mb="md" ta="center">
        Minhas Reservas
      </Text>

      <ModalAvaliacao
        opened={modalOpen}
        onClose={() => setModalOpen(false)}
        packageId={selectedPackageId}
        onSubmit={handleSubmitAvaliacao}
      />

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
                onClick={() => navigate("/pacotes")}
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
          {reservas.map((reserva) => {
            const status = getStatusReserva(reserva);
            console.log(`Reserva #${reserva.reservationNumber} status:`, status);
            return (
              <ReservaCard
                key={reserva.id}
                reserva={reserva}
                status={status}
                onAvaliar={handleAvaliar}
              />
            );
          })}
        </Stack>
      )}
    </Container>
  );
}

export default MinhasReservas;
