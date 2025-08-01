import React from "react";
import CadastroFormulario from "../../Components/Cadastro/CadastroForms";
import { useAuth } from "../../Context/AuthContext";
import { Text } from "@mantine/core";

export default function Cadastro() {
  const { isAuthenticated } = useAuth();
  return (
    <div>
      {isAuthenticated ? (
        <Text>Você já está autenticado!</Text>
      ) : (
        <CadastroFormulario />
      )}
    </div>
  );
}
