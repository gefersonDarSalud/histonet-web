import { routeLabel } from "#/routes";
import { useAuthStore } from "#/stores/auth/useAuth";
import { Navigate, useLocation } from "react-router-dom";

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const { isLoggedIn, isProfileSelected } = useAuthStore();
    if (isLoggedIn) return <Navigate to={routeLabel.remoteClinic} replace  state={{ from: useLocation() }}/>;
    return children;
};