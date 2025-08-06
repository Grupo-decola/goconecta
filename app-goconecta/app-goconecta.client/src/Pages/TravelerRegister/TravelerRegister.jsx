import { Stack, Title, Button, Group, Loader } from "@mantine/core";
import TravelerForm from "../../Components/TravelerForm/TravelerForm";
import { useRef, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { createReservation } from "../../services/ReservationService";
import { CheckoutReservation } from "../../services/StripeService";

export default function TravelerRegister() {
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);

  const {
    adults = 1,
    childs = 0,
    packageId,
    reservationDate,
  } = location.state || {};
  const total = Number(adults) + Number(childs);
  const formRefs = Array.from({ length: total }, () => useRef());

  const handleSubmitAll = () => {
    console.log("handleSubmitAll chamado");
    if (submitting) {
      console.log("Já está enviando, ignorando novo envio");
      return;
    }
    setSubmitting(true);
    let allValid = true;
    const allValues = [];
    formRefs.forEach((ref, idx) => {
      if (ref.current) {
        const result = ref.current.validate();
        console.log(`Form[${idx}] validate result:`, result);
        if (result.hasErrors) {
          allValid = false;
        }
        allValues.push(ref.current.values());
      } else {
        console.log(`Form[${idx}] ref.current está nulo`);
      }
    });
    const payload = {
      packageId,
      reservationDate,
      guests: allValues,
    };
    console.log("Payload para createReservation:", payload);

    if (allValid) {
      console.log("Todos os formulários são válidos, enviando...");
      createReservation(payload)
        .then((res) => {
          console.log("Resposta do createReservation:", res);
          const sripePayload = {
            reservationId: res.id,
            successUrl: "https://localhost:51808/minhasreservas",
          };
          console.log("Payload para CheckoutReservation:", sripePayload);
          CheckoutReservation(sripePayload);
          // Não libera o botão, pois o usuário será redirecionado
        })
        .catch((err) => {
          console.log("Erro ao criar reserva:", err);
          setSubmitting(false);
        });
    } else {
      console.log("Algum formulário está inválido, não enviando.");
      setSubmitting(false);
    }
  };

  let idx = 0;
  return packageId ? (
    <Stack mt="xl" gap="xl">
      {Array.from({ length: adults }).map((_, i) => (
        <Stack key={`adult-stack-${i}`}>
          <Title order={3} ta="center">
            Adulto {i + 1}
          </Title>
          <TravelerForm ref={formRefs[idx++]} IsChild={false} />
        </Stack>
      ))}
      {Array.from({ length: childs }).map((_, i) => (
        <Stack key={`child-stack-${i}`}>
          <Title order={3} ta="center">
            Criança {i + 1}
          </Title>
          <TravelerForm ref={formRefs[idx++]} IsChild />
        </Stack>
      ))}
      <Group justify="center" mt="md">
        <Button
          onClick={handleSubmitAll}
          loading={submitting}
          disabled={submitting}
          leftSection={submitting ? <Loader size={18} color="white" /> : null}
          aria-busy={submitting}
        >
          {submitting ? "Enviando..." : "Enviar todos"}
        </Button>
      </Group>
    </Stack>
  ) : (
    <Navigate to="/pacotes" />
  );
}
