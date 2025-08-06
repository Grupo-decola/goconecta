import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CadastroLogin from "./Pages/CadastroUser/CadastroUserPage";
import LoginPage from "./Pages/Login/LoginPage";
import Home from "./Pages/Home/HomePage";
import PackagesPage from "./Pages/Packages/PackagesPage";
import InfoPage from "./Pages/InfoPage/InfoPage";
import TravelerRegisterPage from "./Pages/TravelerRegister/TravelerRegisterPage";
import ProtectedRoute from "./Components/Auth/ProtectedRoute/ProtectedRoute";
import LogoutPage from "./Pages/Logout/LogoutPage";
import BeneficiosPage from "./Pages/Beneficios/BeneficiosPages";
import PassagensPage from "./Pages/Passagens/PassagensPage";
import MinhasReservasPage from "./Pages/MinhasReservas/MinhaReservasPage";
import AjudaPage from "./Pages/Ajuda/AjudaPage";
import AnunciePage from "./Pages/Anuncie/AnunciePage";
import CadastroPropriedadePage from "./Pages/CadastroPropriedade/CadastroProriedadePage";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/hospedagens", element: <Home /> },

  // Adiciona a nova rota para a página de passagens "em breve"
  { path: "/passagens", element: <PassagensPage /> },

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
    element: <MinhasReservasPage />,
  },

  {
    path: "/logout",
    element: <LogoutPage />,
  },
  { path: "/pacotes", element: <PackagesPage /> },
  { path: "/pacote/:id", element: <InfoPage /> },
  {
    element: <ProtectedRoute />, // wrapper para rotas protegidas
    children: [
      {
        path: "/passageiros",
        element: <TravelerRegisterPage />,
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
    element: <AjudaPage />,
  },
  {
    path: "/anuncie",
    element: <AnunciePage />,
  },
  {
    path: "/anuncie/cadastro",
    element: <CadastroPropriedadePage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
