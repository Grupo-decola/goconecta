import { useAuth } from "../../Context/AuthContext";
import { Center, Stack, Loader, Text } from "@mantine/core";

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { notifications } from "@mantine/notifications";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Center h="100vh">
        <Stack align="center" gap="md">
          <Loader size="lg" />
          <Text>Carregando Informações do usuário</Text>
        </Stack>
      </Center>
    );
  }

  if (!isAuthenticated) {
    sessionStorage.setItem(
      "redirectPath",
      JSON.stringify({
        pathname: location.pathname,
        search: location.search,
        state: location.state,
      })
    );
    notifications.show({
      id: "auth-required",
      title: "Acesso restrito",
      message: "Você precisa estar logado para visualizar esta página.",
      color: "error",
      autoClose: 3000,
    });
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
