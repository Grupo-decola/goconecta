import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/hospedagens",
    element: <Home />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
