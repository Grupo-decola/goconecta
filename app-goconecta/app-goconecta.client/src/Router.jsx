
import { createBrowserRouter, RouterProvider } from "react-router-dom";


import Home from "./Pages/Home/Home";
import Cadastro from "./Pages/Cadastro/CadastroLogin";
import PerfilUsuario from "./Pages/PerfilUsuario/PerfilUsuario";
import LoginPage from "./Pages/Login/LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/cadastro",
    element: <Cadastro />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/perfil",
    element: <PerfilUsuario />,
  },
]);


export function Router() {
  return <RouterProvider router={router} />;
}
