import { useEffect, useState } from "react";
import { Box, Text, Title, Button, Stack, Container } from "@mantine/core";
import { IconUserCircle } from "@tabler/icons-react";

export default function PerfilUsuario() {
  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    tipo: "",
  });

  useEffect(() => {
    // Simulação de dados do usuário logado
    const dados = {
      nome: "Rosilene Farias",
      email: "rosi@email.com",
      tipo: "Cliente",
    };
    setUsuario(dados);
  }, []);

  const handleLogout = () => {
    // Lógica para logout (remover token, redirecionar, etc)
    alert("Logout realizado!");
  };

  return (
    <Container size="xs" style={{ paddingTop: "3rem" }}>
      <Box
        p="lg"
        shadow="sm"
        radius="md"
        style={{
          background: "#f8f9fa",
          border: "1px solid #dee2e6",
          textAlign: "center",
        }}
      >
        <Title
          order={3}
          mb="sm"
          style={{
            color: "#1C448E",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
          }}
        >
          <IconUserCircle size={28} stroke={1.5} />
          Perfil do Usuário
        </Title>

        <Stack spacing="xs" mt="md">
          <Text>
            <strong>Nome:</strong> {usuario.nome}
          </Text>
          <Text>
            <strong>Email:</strong> {usuario.email}
          </Text>
          <Text>
            <strong>Tipo:</strong> {usuario.tipo}
          </Text>
        </Stack>

        <Button
          mt="xl"
          color="red"
          variant="outline"
          fullWidth
          onClick={handleLogout}
        >
          Sair da conta
        </Button>
      </Box>
    </Container>
  );
}
