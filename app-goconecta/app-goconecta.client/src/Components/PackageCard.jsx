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

export default function PackageCard({ package: pkg }) {
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
    <Card
      shadow="sm"
      padding={0}
      radius="md"
      withBorder
      h={{ base: "auto", sm: 400 }}
      mih={{ base: 380, sm: 400 }}
    >
      <Image
        src={pkg.image}
        height={{ base: 160, sm: 200 }}
        alt={pkg.title}
        fallbackSrc="https://via.placeholder.com/400x200?text=Travel+Package"
      />

      <Box p={{ base: "sm", sm: "md" }}>
        <Stack gap="sm" h={{ base: "auto", sm: 180 }}>
          <Group justify="space-between" align="flex-start" wrap="nowrap">
            <Text fw={600} size="lg" lineClamp={2} style={{ flex: 1 }}>
              {pkg.title}
            </Text>
            {pkg.featured && (
              <Badge color="orange" variant="filled" size="xs">
                Destaque
              </Badge>
            )}
          </Group>

          <Group gap="xs" c="dimmed">
            <IconMapPin size={14} />
            <Text size="sm">{pkg.destination}</Text>
          </Group>

          <Group gap="xs" c="dimmed">
            <IconCalendar size={14} />
            <Text size="sm">
              {formatDate(pkg.startDate)} - {formatDate(pkg.endDate)}
            </Text>
          </Group>

          <Group gap="xs" c="dimmed">
            <IconUsers size={14} />
            <Text size="sm">{pkg.duration} dias</Text>
          </Group>

          {pkg.rating && (
            <Group gap="xs">
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
            <Button variant="filled" size="sm">
              Ver Detalhes
            </Button>
          </Group>
        </Stack>
      </Box>
    </Card>
  );
}
