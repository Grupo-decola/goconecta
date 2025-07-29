import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Cadastro from "./Pages/Cadastro/CadastroLogin";
import LoginPage from "./Pages/LoginPage/LoginPage";

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
  element: <LoginPage />
}
]);

export function Router() {
  return <RouterProvider router={router} />;
}