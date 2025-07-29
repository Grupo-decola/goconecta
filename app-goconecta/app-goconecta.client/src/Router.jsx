import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Packages from "./Pages/Packages";

import LoginPage from "./Pages/Login/LoginPage";
import InfoPage from "./Pages/InfoPage/InfoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Packages />,
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
  path: "/login",
  element: <LoginPage />
}
]);

export function Router() {
  return <RouterProvider router={router} />;
}