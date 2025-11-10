
import { createBrowserRouter } from "react-router-dom";
import { Home } from "@/home/pages/main";
import { NotFoundPage } from "@/errors/404";
import App from "./../App";
import { Login } from "@/auth/pages/login";
import { Signup } from "@/auth/pages/signup";
import { RemoteClinic } from "@/remoteClicnic/pages/main";


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
            {
                path: "telemedicina",
                element: <RemoteClinic />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
        NotFoundPage: <NotFoundPage />,
    },
    {
        path: "/registro",
        element: <Signup />,
        NotFoundPage: <NotFoundPage />,
    },

];

export default createBrowserRouter(routesConfig);