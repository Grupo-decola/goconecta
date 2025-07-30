import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/Login/LoginPage";
import InfoPage from "./Pages/InfoPage/InfoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <InfoPage />,
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
]);

export function Router() {
  return <RouterProvider router={router} />;
}