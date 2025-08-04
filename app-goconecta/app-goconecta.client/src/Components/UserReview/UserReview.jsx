import {
  Card,
  Group,
  Avatar,
  Text,
  Stack,
  Box,
  Flex,
  Anchor,
  Rating,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useMemo } from "react";

/**
 * Props para o componente UserReview
 */
/**
 * @typedef {Object} UserReviewProps
 * @property {string} userName - Nome do usuário
 * @property {string} comment - Texto do review
 * @property {number} stars - Nota de 1 a 5
 * @property {string} createdAt - Data ISO da review
 * @property {boolean} [expanded] - Se o texto está expandido
 * @property {function} [onToggleExpand] - Função para expandir/recolher texto
 */

/**
 * Componente para exibir o review de um usuário.
 * Responsivo e estilizado conforme o layout fornecido.
 */
export default function UserReview({
  userName,
  comment,
  stars,
  createdAt,
  expanded = false,
  onToggleExpand,
}) {
  const isMobile = useMediaQuery("(max-width: 600px)");
  const maxLength = 180;
  const showExpand = comment.length > maxLength;
  const displayComment = useMemo(() => {
    if (expanded || !showExpand) {
      return comment;
    }
    return `${comment.slice(0, maxLength)}...`;
  }, [comment, expanded, showExpand, maxLength]);

  // Formatação de data: exibe "Hoje" se for hoje, senão mês/ano
  const dateLabel = useMemo(() => {
    if (!createdAt) {
      return "";
    }
    const date = new Date(createdAt);
    const now = new Date();
    if (
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear()
    ) {
      return "Hoje";
    }
    // Exibe mês e ano em pt-BR
    return date.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });
  }, [createdAt]);

  return (
    <Card
      withBorder
      radius="md"
      p={isMobile ? "md" : "lg"}
      mb="md"
      style={{ minWidth: 0 }}
    >
      <Flex align="flex-start" gap={isMobile ? "sm" : "md"}>
        <Avatar
          radius="xl"
          size={isMobile ? 40 : 48}
          alt={`Avatar de ${userName}`}
        />
        <Stack spacing={4} style={{ flex: 1, minWidth: 0 }}>
          <Text fw={600} size={isMobile ? "md" : "lg"}>
            {userName}
          </Text>
          <Group spacing={8} align="center" wrap="nowrap">
            <Rating
              value={stars}
              readOnly
              size={isMobile ? "md" : "lg"}
              count={5}
            />
            <Text size="xs" fw={500}>
              {dateLabel}
            </Text>
          </Group>
          <Box mt={2} mb={2} style={{ wordBreak: "break-word" }}>
            <Text size={isMobile ? "sm" : "md"}>{displayComment}</Text>
            {showExpand && (
              <Anchor
                size="sm"
                onClick={onToggleExpand}
                style={{
                  cursor: "pointer",
                  display: "inline-block",
                  marginTop: 2,
                }}
                tabIndex={0}
                aria-label={expanded ? "Mostrar menos" : "Mostrar mais"}
              >
                {expanded ? "Mostrar menos" : "Mostrar mais"}
              </Anchor>
            )}
          </Box>
        </Stack>
      </Flex>
    </Card>
  );
}
