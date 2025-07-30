import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CadastroLogin from "./Pages/Cadastro/CadastroLogin";
import LoginPage from "./Pages/Login/LoginPage";
import Home from "./Pages/Home/Home";
import Packages from "./Pages/Packages";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
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
]);

export function Router() {
  return <RouterProvider router={router} />;
}
