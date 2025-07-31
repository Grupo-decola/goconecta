import React from "react";
import LoginForm from "../../Components/Login/LoginForm"; // Caminho correto
import { useAuth } from "../../Context/AuthContext";
import { Text } from "@mantine/core"; // Certifique-se de que o mantine

function LoginPage() {
  const { isAuthenticated } = useAuth(); // Certifique-se de que useAuth está importado corretamente
  return (
    <div>
      {isAuthenticated ? <Text>Você já está autenticado!</Text> : <LoginForm />}
    </div>
  );
}

export default LoginPage;
