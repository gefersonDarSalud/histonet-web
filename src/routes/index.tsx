
import { createBrowserRouter } from "react-router-dom";
import { Home } from "@/home/pages/main";
import { NotFoundPage } from "@/errors/404";
import { Login } from "@/auth/pages/login";
import { Signup } from "@/auth/pages/signup";
import { RemoteClinic } from "@/remoteClicnic/pages/main";
import { Patient } from "@/patient/pages/main";
import { PatientProfile } from "@/patient/pages/profile";
import { ProtectedRoute } from "@/auth/components/protectedRoute";
import App from "#/app";

export const routeLabel: Record<string, string> = {
    home: "/",
    remoteClinic: "/telemedicina",
    patient: "/paciente",
    patientProfile: "/paciente/:patientId",
    login: "/iniciar-sesion",
    signup: "/registro",
}

export const routesConfig = [
    {
        path: "/",
        element:
            <ProtectedRoute>
                <App />
            </ProtectedRoute>
        ,
        NotFoundPage: <NotFoundPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: routeLabel.remoteClinic,
                element: <RemoteClinic />,
            },
            {
                path: routeLabel.patient,
                element: <Patient />,
            },
            {
                path: routeLabel.patientProfile,
                element: <PatientProfile />,
            },
        ],
    },
    {
        path: routeLabel.login,
        element: <Login />
        ,
        NotFoundPage: <NotFoundPage />,
    },
    {
        path: routeLabel.signup,
        element: <Signup />,
        NotFoundPage: <NotFoundPage />,
    },

    {
        path: "*",
        element: <NotFoundPage />,
    }

];

export default createBrowserRouter(routesConfig);