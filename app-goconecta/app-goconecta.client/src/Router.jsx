import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CadastroLogin from "./Pages/Cadastro/CadastroLogin";
import LoginPage from "./Pages/Login/LoginPage";
import Home from "./Pages/Home/Home";
import Packages from "./Pages/Packages/Packages";
import InfoPage from "./Pages/InfoPage/InfoPage";
import TravelerRegister from "./Pages/TravelerRegister/TravelerRegister";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import LogoutPage from "./Pages/Logout/LogoutPage";
import BeneficiosPage from "./Pages/Pontos/BeneficiosPages";
import ComingSoonPage from "./Pages/passagens/ComingSoonPage"; 
import MinhasReservas from "./Pages/MinhasReservas/MinhaReservas";
import Ajuda from "./Pages/ajuda/AjudaPage";
import AnuncieSuaPropriedade from "./Pages/Anuncie/Anuncie";
import CadastroPropriedade from "./Pages/Anuncie-Cadastro/Cadastro";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/hospedagens", element: <Home /> },
  
  // Adiciona a nova rota para a página de passagens "em breve"
  { path: "/passagens", element: <ComingSoonPage /> },

  {
    path: "/cadastro",
    element: <CadastroLogin />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
   {
    path: "/minhasreservas",
    element: <MinhasReservas />,
  },

  {
    path: "/logout",
    element: <LogoutPage />,
  },
  { path: "/pacotes", element: <Packages /> },
  { path: "/pacote/:id", element: <InfoPage /> },
  {
    element: <ProtectedRoute />, // wrapper para rotas protegidas
    children: [
      {
        path: "/passageiros",
        element: <TravelerRegister />,
      },
    ],
  },

  {
    path: "/beneficios",
    element: <BeneficiosPage />,
  },
  {
    path: "/beneficios",
    element: <BeneficiosPage />,
  },


 {
    path: "/ajuda",
    element: <Ajuda />,
  },
  {
    path: "/anuncie",
    element: <AnuncieSuaPropriedade />,
  },
  {
    path: "/anuncie/cadastro",
    element: <CadastroPropriedade />,
  }

 
]);

export function Router() {
  return <RouterProvider router={router} />;
}