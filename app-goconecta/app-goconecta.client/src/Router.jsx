import { createBrowserRouter, RouterProvider } from "react-router-dom";
import InfoPage from "./Pages/InfoPage/InfoPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <InfoPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
