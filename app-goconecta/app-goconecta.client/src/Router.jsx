import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Packages from "./Pages/Packages";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Packages />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
