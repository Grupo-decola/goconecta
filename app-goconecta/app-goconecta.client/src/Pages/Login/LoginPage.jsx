import React from "react";
import LoginForm from "../../Components/Auth/Login/LoginForm"; // Caminho correto
import { useAuth } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";

function LoginPage() {
  const { isAuthenticated } = useAuth(); // Certifique-se de que useAuth está importado corretamente
  return <div>{isAuthenticated ? <Navigate to="/" /> : <LoginForm />}</div>;
}

export default LoginPage;
