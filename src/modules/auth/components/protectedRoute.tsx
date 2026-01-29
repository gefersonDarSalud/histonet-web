import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "#/stores/auth/useAuth";
import { routeLabel } from "#/routes";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { isLoggedIn, isProfileSelected } = useAuthStore();    
    if (!isLoggedIn) return <Navigate to={routeLabel.login} replace state={{ from: useLocation() }} />;
    // if (!isProfileSelected) return <Navigate to={routeLabel.login} replace state={{ from: useLocation() }} />;
    return children;
};