import React from "react";
import { Card, Text, Stack, Badge, Group, Button } from "@mantine/core";
import {
  IconCheck,
  IconClock,
  IconCalendar,
  IconMapPin,
  IconStar,
  IconCross,
  IconCancel,
  IconCurrencyReal,
  IconHomeDollar,
} from "@tabler/icons-react";
import { FaHotel } from "react-icons/fa";

/**
 * Componente de apresentação de uma reserva individual.
 * @param {object} props
 * @param {object} props.reserva - Objeto da reserva
 * @param {string} props.status - Status calculado (confirmed, pending, conclude)
 * @param {function} props.onAvaliar - Função chamada ao clicar em "Avaliar pacote"
 */
function ReservaCard({ reserva, onAvaliar }) {
  // Feedback visual baseado no status
  let badgeProps = {
    color: "gray",
    leftSection: null,
    children: "Desconhecido",
  };
  let cardBorder = undefined;
  let cardBg = undefined;
  switch (reserva.status) {
    case "Confirmed":
      badgeProps = {
        color: "green",
        leftSection: <IconCheck size={12} />,
        children: "Confirmada",
      };
      cardBorder = "2px solid #51cf66";
      cardBg = "#f0fff4";
      break;
    case "Pending":
      badgeProps = {
        color: "orange",
        leftSection: <IconClock size={12} />,
        children: "Pendente",
      };
      cardBorder = "2px solid #fab005";
      cardBg = "#fff9f0";
      break;
    case "Completed":
      badgeProps = {
        color: "blue",
        leftSection: <IconCheck size={12} />,
        children: "Concluída",
      };
      cardBorder = "2px solid #228be6";
      cardBg = "#f0f4ff";
      break;
    case "Cancelled":
      badgeProps = {
        color: "red",
        leftSection: <IconCancel size={12} />,
        children: "Cancelada",
      };
      cardBorder = "2px solid #DC3545";
      cardBg = "#F7D5D9";
      break;
    default:
      badgeProps = {
        color: "gray",
        leftSection: null,
        children: reserva.status,
      };
      cardBorder = undefined;
      cardBg = undefined;
  }

  return (
    <Card
      key={reserva.id}
      shadow="md"
      padding="md"
      radius="md"
      withBorder
      style={{
        transition: "transform 0.2s",
        cursor: "pointer",
        border: cardBorder,
        background: cardBg,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.01)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {/* Imagem do pacote pode ser adicionada aqui se necessário */}
      <Stack spacing="xs" mt="sm">
        <Group position="apart" mb="xs" wrap="wrap">
          <Text fw={600} size="lg">
            {reserva.package.title}
          </Text>
          <Badge {...badgeProps} />
        </Group>
        <Text size="sm" color="dimmed">
          Número da reserva: <strong>{reserva.reservationNumber}</strong>
        </Text>
        <Group spacing="xs">
          <IconMapPin size={16} />
          <Text size="sm">Destino: {reserva.package.destination}</Text>
        </Group>
        <Group spacing="xs">
          <FaHotel size={16} />
          <Text size="sm">Hotel: {reserva.package.hotel?.name}</Text>
        </Group>
        <Group spacing="xs">
          <IconCalendar size={16} />
          <Text size="sm">
            Data da reserva:{" "}
            {new Date(reserva.reservationDate).toLocaleDateString("pt-BR")}
          </Text>
        </Group>
        <Group spacing="xs">
          <IconHomeDollar size={16} />
          <Text size="sm">Preço total: R$ {reserva.totalPrice.toFixed(2)}</Text>
        </Group>
        <Group position="right" mt="xs">
          {reserva.status === "Completed" ? (
            <Button
              leftSection={<IconStar size={16} />}
              color="yellow"
              variant="light"
              onClick={() => onAvaliar(reserva.package.id)}
            >
              Avaliar pacote
            </Button>
          ) : null}
        </Group>
      </Stack>
    </Card>
  );
}

export default ReservaCard;
