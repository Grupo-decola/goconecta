import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CadastroLogin from "./Pages/Cadastro/CadastroLogin";
import LoginPage from "./Pages/Login/LoginPage";
import Home from "./Pages/Home/Home";
import Packages from "./Pages/Packages/Packages";
import InfoPage from "./Pages/InfoPage/InfoPage";
import TravelerRegister from "./Pages/TravelerRegister/TravelerRegister";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import LogoutPage from "./Pages/Logout/LogoutPage";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/hospedagens", element: <Home /> },
  {
    path: "/cadastro",
    element: <CadastroLogin />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/logout",
    element: <LogoutPage />,
  },
  {
    element: <ProtectedRoute />, // wrapper para rotas protegidas
    children: [
      { path: "/pacotes", element: <Packages /> },
      { path: "/pacote/:id", element: <InfoPage /> },
    ],
  },
  {
    path: "/passageiros",
    element: <TravelerRegister />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
