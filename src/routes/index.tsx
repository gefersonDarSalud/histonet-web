
import { createBrowserRouter } from "react-router-dom";
import { Home } from "@/home/pages/main";
import { NotFoundPage } from "@/errors/404";
import App from "./../App";



export const routesConfig = [
    {
        path: "/",
        element: <App />,
        NotFoundPage: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
        ],
    },
];

export default createBrowserRouter(routesConfig);