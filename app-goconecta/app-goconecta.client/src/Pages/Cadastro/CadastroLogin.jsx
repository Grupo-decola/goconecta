import React from "react";
import CadastroFormulario from "../../Components/Cadastro/CadastroForms";
import { useAuth } from "../../Context/AuthContext";
import { Text } from "@mantine/core";
import { Navigate } from "react-router-dom";

export default function Cadastro() {
  const { isAuthenticated } = useAuth();
  return (
    <div>{isAuthenticated ? <Navigate to="/" /> : <CadastroFormulario />}</div>
  );
}
