import { Checkbox, Stack, Title, SimpleGrid } from "@mantine/core"; 

export default function Attractions() {
  const present = [
    "Café Da manha",
    "Piscina aquecida",
    "Praia proxima",
    "Wi-Fi",
    "Estacionamento",
    "Serviço de quarto",
    "Academia",
  ]; 

  const presentCheckboxes = present.map((feat) => {
    return <Checkbox key={feat} checked onChange={() => {}} label={feat} />;
  });

  return (
    <Stack align="start">
      <Title size="h2">Incluso:</Title>
      
  
      <SimpleGrid 
        cols={{ base: 1, sm: 2, lg: 3 }}
        spacing="md"
      >
        {presentCheckboxes}
      </SimpleGrid>
    </Stack>
  );
}
