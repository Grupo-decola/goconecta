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
    if (submitting) {
      return;
    }
    setSubmitting(true);
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
    const payload = {
      packageId,
      reservationDate,
      guests: allValues,
    };

    if (allValid) {
      createReservation(payload)
        .then((res) => {
          const sripePayload = {
            reservationId: res.id,
          };
          CheckoutReservation(sripePayload);
          // Não libera o botão, pois o usuário será redirecionado
        })
        .catch(() => {
          setSubmitting(false);
        });
    } else {
      setSubmitting(false);
    }
  };

  let idx = 0;
  return packageId ? (
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
