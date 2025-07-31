import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CadastroLogin from "./Pages/Cadastro/CadastroLogin";
import LoginPage from "./Pages/Login/LoginPage";
import Home from "./Pages/Home/Home";
import Packages from "./Pages/Packages/Packages";
import InfoPage from "./Pages/InfoPage/InfoPage";
import TravelerRegister from "./Pages/TravelerRegister/TravelerRegister";
import BeneficiosPage from "./Pages/Pontos/BeneficiosPages";


const router = createBrowserRouter([
  { path: "/Home", element: <Home /> },
  {
    path: "/cadastro",
    element: <CadastroLogin />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/pacotes",
    element: <Packages />,
  },
  {
    path: "/pacote/:id",
    element: <InfoPage />,
  },
   {
    path: "/passageiros",
    element: <TravelerRegister />,
  },


 {
    path: "/beneficios",
    element: <BeneficiosPage />,
  },
 
 
]);

export function Router() {
  return <RouterProvider router={router} />;
}
