
import { createBrowserRouter } from "react-router-dom";
import { NotFoundPage } from "@/errors/404";
import { Login } from "@/auth/pages/login";
import { Signup } from "@/auth/pages/signup";
import { RemoteClinic } from "@/remoteClicnic/pages/main";
import { Patient } from "@/patient/pages/main";
import { PatientProfile } from "@/patient/pages/profile";
import { ProtectedRoute } from "@/auth/components/protectedRoute";
import Visit from "@/remoteClicnic/pages/visit";
import App from "#/App";
import { MedicalVisitProvider } from "#/context/providers/medicalVisitProvider";
import { ErrorBoundary } from "@/components/app/errorBoundary";
import { ErrorFallback } from "@/components/app/errorFallback";
import { AuthRedirectRoute } from "@/auth/components/authRedirectRoute";

export const routeLabel: Record<string, string> = {
    // home: "/inicio",
    remoteClinic: "/telemedicina",
    medicalVisit: `/telemedicina/:visitId`,
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
                path: routeLabel.remoteClinic,
                element: <RemoteClinic />,
            },
            {
                index: true,
                path: routeLabel.medicalVisit,
                element:
                    <MedicalVisitProvider>
                        <ErrorBoundary fallback={<ErrorFallback error={new Error("error pues")} />}>
                            <Visit />
                        </ErrorBoundary>
                    </MedicalVisitProvider>
                ,
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
        element:
            <AuthRedirectRoute>
                <Login />
            </AuthRedirectRoute>

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