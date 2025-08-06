import { useState } from "react";
import {
  Card,
  Textarea,
  Button,
  Group,
  Text,
  Stack,
  Rating,
} from "@mantine/core";
import { useForm } from "@mantine/form";

const MAX_REVIEW_LENGTH = 500;

export default function ReviewCreate({ onSubmit }) {
  const [submitting, setSubmitting] = useState(false);
  const form = useForm({
    initialValues: {
      rating: 0,
      comment: "",
    },
    validate: {
      rating: (value) => (value < 1 ? "Selecione uma nota" : null),
      comment: (value) =>
        value.length < 10
          ? "O comentário deve ter pelo menos 10 caracteres"
          : value.length > MAX_REVIEW_LENGTH
          ? `Máximo de ${MAX_REVIEW_LENGTH} caracteres`
          : null,
    },
  });

  const handleSubmit = async (values) => {
    setSubmitting(true);
    try {
      await onSubmit?.(values);
      form.reset();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="md">
          <Text size="lg" weight={500} mb={4}>
            Avalie o pacote
          </Text>
          <Rating
            value={form.values.rating}
            onChange={(v) => form.setFieldValue("rating", v)}
            size="lg"
            count={5}
            aria-label="Nota em estrelas"
            required
          />
          {form.errors.rating && (
            <Text c="red" size="xs">
              {form.errors.rating}
            </Text>
          )}
          <Textarea
            label="Comentário"
            placeholder="Conte sua experiência com o pacote..."
            minRows={4}
            maxRows={8}
            maxLength={MAX_REVIEW_LENGTH}
            error={form.errors.comment}
            {...form.getInputProps("comment")}
            aria-label="Comentário do review"
          />
          <Group position="right">
            <Button
              type="submit"
              loading={submitting}
              disabled={submitting}
              aria-label="Enviar review"
            >
              Enviar review
            </Button>
          </Group>
        </Stack>
      </form>
    </Card>
  );
}
