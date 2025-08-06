import React, { useState } from "react";
import {
  Container,
  Text,
  Paper,
  Stack,
  Button,
  Title,
  Divider,
} from "@mantine/core";

export default function AjudaPage() {
  const [resposta, setResposta] = useState("");

  const perguntasRespostas = [
    {
      pergunta: "Como faço uma reserva?",
      resposta:
        'Você pode reservar um pacote acessando a página "Pacotes", escolhendo o destino desejado e clicando em "Reservar agora".',
    },
    {
      pergunta: "Como faço login?",
      resposta:
        'Clique em "Iniciar Sessão" no canto superior direito e insira seu e-mail e senha cadastrados.',
    },
    {
      pergunta: "Esqueci minha senha, e agora?",
      resposta:
        'Na tela de login, clique em "Esqueci minha senha" para redefinir.',
    },
    {
      pergunta: "Como funciona o pagamento?",
      resposta:
        "Os pagamentos são realizados via cartão de crédito ou boleto bancário, com confirmação automática.",
    },
    {
      pergunta: "Onde vejo minhas reservas?",
      resposta:
        'Você pode ver suas reservas clicando no menu do usuário e selecionando "Minhas Reservas".',
    },
  ];

  return (
    <Container size="sm" mt="xl">
      <Paper shadow="md" radius="md" p="lg" withBorder>
        <Stack spacing="md">
          <Title order={2} color="#DA7818">
            Ajuda Rápida 🤖
          </Title>
          <Text size="sm" color="dimmed">
            Clique em uma das perguntas abaixo para ver a resposta:
          </Text>

          {perguntasRespostas.map((item, index) => (
            <Button
              key={index}
              variant="light"
              color="orange"
              fullWidth
              onClick={() => setResposta(item.resposta)}
            >
              {item.pergunta}
            </Button>
          ))}

          {resposta && (
            <>
              <Divider my="sm" />
              <Paper p="md" withBorder radius="md" bg="gray.0">
                <Text>{resposta}</Text>
              </Paper>
            </>
          )}
        </Stack>
      </Paper>
    </Container>
  );
}
