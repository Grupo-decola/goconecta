import { Checkbox, Stack, Title, SimpleGrid } from "@mantine/core";

export default function Attractions({ amenities }) {
  return (
    <Stack align="start">
      <Title size="h2">Incluso:</Title>

      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="md">
        {amenities.map((amenity) => (
          <Checkbox key={amenity.id} checked onChange={() => {}} label={amenity.name} />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
