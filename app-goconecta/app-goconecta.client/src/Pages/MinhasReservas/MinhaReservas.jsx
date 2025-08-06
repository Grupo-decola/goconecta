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

import { notifications } from "@mantine/notifications";

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
      })
      .catch((error) => {})
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
      notifications.show({
        title: "Avaliação enviada!",
        message: "Sua avaliação foi registrada com sucesso.",
        color: "success",
        autoClose: 4000,
      });
    } catch (error) {
      notifications.show({
        title: "Erro ao enviar avaliação",
        message:
          "Não foi possível enviar sua avaliação. Tente novamente mais tarde.",
        color: "error",
        autoClose: 4000,
      });
    } finally {
      setModalOpen(false);
    }
  };

  // Função para ordenar reservas por status: confirmed > pending > conclude > outros
  function ordenarReservas(reservas) {
    const statusOrder = { confirmed: 0, pending: 2, conclude: 1 };
    return [...reservas].sort((a, b) => {
      const orderA = statusOrder[a.status] ?? 99;
      const orderB = statusOrder[b.status] ?? 99;
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
                color="#DA7818"
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
            return (
              <ReservaCard
                key={reserva.id}
                reserva={reserva}
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
