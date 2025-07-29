import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Cadastro from "./Pages/Cadastro/CadastroLogin";
import LoginPage from "./Pages/Login/LoginPage";
import InfoPage from "./Pages/InfoPage/InfoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <InfoPage />,
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
    path: "/pacote/:id",
    element: <InfoPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
