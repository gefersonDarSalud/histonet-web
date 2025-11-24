import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { ReactElement } from "react";
import { routeLabel } from "#/routes";

export const ProtectedRoute = ({ children }: { children: ReactElement; }) => {
    const location = useLocation();
    const { isLoggedIn } = useAuth();
    if (!isLoggedIn) return <Navigate to={routeLabel.login} replace state={{ from: location }} />;
    return children;
};