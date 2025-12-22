import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { ReactElement } from "react";
import { routeLabel } from "#/routes";
import { LoadingCircle } from "@/components/app/loading";

export const ProtectedRoute = ({ children }: { children: ReactElement; }) => {
    const { isLoggedIn, isAuthReady } = useAuth();
    const location = useLocation();

    if (!isAuthReady) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <LoadingCircle />
            </div>
        );
    }

    const toMain = () => <Navigate to={routeLabel.login} replace state={{ from: location }} />

    if (location.pathname === "/") return toMain();
    if (!isLoggedIn) return toMain();

    return children;
};