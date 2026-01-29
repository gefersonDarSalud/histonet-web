// src/auth/components/AuthInitializer.tsx
import { useEffect } from "react";
import { useAuthStore } from "#/stores/auth/useAuth";
import { LoadingCircle } from "@/components/app/loading";

export const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
    const checkAuth = useAuthStore((state) => state.checkAuthStatus);
    const {isLoading} = useAuthStore();
    useEffect(() => {        
        checkAuth();
    }, []);

    if (isLoading) {
        return (
            <div className="h-screen w-screen flex items-center justify-center">
                <LoadingCircle />
            </div>
        );
    }

    return <div>{children}</div>;
};