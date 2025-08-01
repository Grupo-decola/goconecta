import {
  Card,
  Text,
  Badge,
  Button,
  Group,
  Stack,
  Image,
  Box,
  Rating,
} from "@mantine/core";
import { IconMapPin, IconCalendar, IconUsers } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

export default function PackageCard({ package: pkg }) {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  return (
    <Card shadow="sm" padding={0} radius="md" withBorder h="auto">
      <Image
        src={pkg.image.path}
        height={{ base: 160, sm: 200 }}
        h={250}
        alt={pkg.image.title}
        fallbackSrc="https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ="
      />
      <Box p={{ base: "sm", sm: "md" }}>
        <Stack gap="sm">
          <Group justify="space-between" align="flex-start" wrap="wrap">
            <Text fw={600} size="lg" lineClamp={2} style={{ flex: 1 }}>
              {pkg.title}
            </Text>
            {pkg.featured && (
              <Badge color="orange" variant="filled" size="xs">
                Destaque
              </Badge>
            )}
          </Group>

          <Group gap="xs" c="dimmed" wrap="nowrap">
            <IconMapPin size={14} />
            <Text size="sm">{pkg.destination}</Text>
          </Group>

          {/* <Group gap="xs" c="dimmed" wrap="nowrap">
            <IconCalendar size={14} />
            <Text size="sm">
              {formatDate(pkg.startDate)} - {formatDate(pkg.endDate)}
            </Text>
          </Group> */}

          <Group gap="xs" c="dimmed" wrap="nowrap">
            <IconUsers size={14} />
            <Text size="sm">{pkg.durationDays} dias</Text>
          </Group>

          {pkg.rating && (
            <Group gap="xs" wrap="nowrap">
              <Rating value={pkg.rating} readOnly size="sm" />
              <Text size="sm" c="dimmed">
                ({pkg.reviewCount} avaliações)
              </Text>
            </Group>
          )}

          <Group justify="space-between" align="center" mt="auto" wrap="nowrap">
            <Box style={{ flex: 1 }}>
              <Text size="xl" fw={700} c="blue">
                {formatPrice(pkg.priceAdults)}
              </Text>
              <Text size="xs" c="dimmed">
                por pessoa
              </Text>
            </Box>

            <Button
              variant="filled"
              size="sm"
              onClick={() => navigate(`/pacote/${pkg.hotel.id}`)}
              color="#DA7818"
            >
              Ver Detalhes
            </Button>
          </Group>
        </Stack>
      </Box>
    </Card>
  );
}
