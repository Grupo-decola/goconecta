import { Checkbox, Stack, Title } from "@mantine/core";

export default function Attractions() {
  const present = ["Café Da manha", "piscina aquecida", "praia proxima"];

  const notPresent = [];

  const presentCheckbox = present.map((feat) => {
    return <Checkbox checked onChange={() => {}} label={feat} />;
  });

  return (
    <Stack align="start">
      <Title size="h2">Incluso:</Title>
      <Stack>{presentCheckbox}</Stack>
    </Stack>
  );
}
