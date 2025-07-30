import { Stack, Title, Button, Group } from "@mantine/core";
import TravelerForm from "../../Components/TravelerForm/TravelerForm";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

export default function TravelerRegister() {
  const location = useLocation();
  const { adults = 1, childs = 0, packageId, date } = location.state || {};
  const total = Number(adults) + Number(childs);
  const formRefs = Array.from({ length: total }, () => useRef());

  const handleSubmitAll = () => {
    let allValid = true;
    const allValues = [];
    formRefs.forEach((ref) => {
      if (ref.current) {
        const result = ref.current.validate();
        if (result.hasErrors) {
          allValid = false;
        }
        allValues.push(ref.current.values());
      }
    });
    if (allValid) {
      const payload = {
        packageId,
        date,
        hospedes: allValues,
      };
      // Envie allValues para o backend ou prossiga
      console.log("Todos válidos:", payload);
    } else {
      // Mostre erro
      console.log("Algum formulário inválido");
    }
  };

  let idx = 0;
  return (
    <Stack>
      {Array.from({ length: adults }).map((_, i) => (
        <Stack key={`adult-stack-${i}`}>
          <Title order={3}>Adulto {i + 1}</Title>
          <TravelerForm ref={formRefs[idx++]} IsChild={false} />
        </Stack>
      ))}
      {Array.from({ length: childs }).map((_, i) => (
        <Stack key={`child-stack-${i}`}>
          <Title order={3}>Criança {i + 1}</Title>
          <TravelerForm ref={formRefs[idx++]} IsChild />
        </Stack>
      ))}
      <Group justify="center" mt="md">
        <Button onClick={handleSubmitAll}>Enviar todos</Button>
      </Group>
    </Stack>
  );
}
