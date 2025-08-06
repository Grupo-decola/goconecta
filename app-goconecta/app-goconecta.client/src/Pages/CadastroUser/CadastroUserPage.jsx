import React from "react";
import CadastroFormulario from "../../Components/Auth/Cadastro/CadastroForms";
import { useAuth } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";

export default function CadastroUserPage() {
  const { isAuthenticated } = useAuth();
  return (
    <div>{isAuthenticated ? <Navigate to="/" /> : <CadastroFormulario />}</div>
  );
}
