import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/home/pages/main";
import NotFoundPage from "@/errors/404";

export const routesConfig = [
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFoundPage />,
  },
];

export default createBrowserRouter(routesConfig);