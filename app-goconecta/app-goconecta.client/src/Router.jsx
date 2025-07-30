import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Páginas principais
import Home from "./Pages/Home/Home";
import Cadastro from "./Pages/Cadastro/CadastroLogin";
import PerfilUsuario from "./Pages/PerfilUsuario/PerfilUsuario";
import LoginPage from "./Pages/Login/LoginPage";
import InfoPage from "./Pages/InfoPage/InfoPage";



const router = createBrowserRouter([
  {
    path: "/",
    element: <InfoPage />, 
  },

    {
    path: "/home",
    element: <Home />, 
  },
  
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/pacote/:id",
    element: <InfoPage />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  {
    path: "/perfil",
    element: <PerfilUsuario />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}