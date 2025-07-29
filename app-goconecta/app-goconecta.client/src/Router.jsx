import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./Pages/Login/LoginPage";
import InfoPage from "./Pages/InfoPage/InfoPage";
import TravelerForm from "./Components/TravelerForm/TravelerForm";
import TravelerRegister from "./Pages/TravelerRegister/TravelerRegister";

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
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dev",
    element: <TravelerRegister />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
