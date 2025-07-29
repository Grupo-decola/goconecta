import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/Login/LoginPage";
import InfoPage from "./Pages/InfoPage/InfoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <InfoPage />,
  },w
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
  path: "/login",
  element: <LoginPage />
}
]);

export function Router() {
  return <RouterProvider router={router} />;
}