import { serverUrl } from "#/utils/globals";
import type { objectList } from "#/utils/types";
import type { Message } from "@/components/app/appAlert";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
    message: Message | null;
    setMessage: React.Dispatch<React.SetStateAction<Message | null>>;
    isAuthReady: boolean;
    isLoading: boolean;
    isProfileSelected: boolean;
    setIsProfileSelected: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const messages: objectList<Message> = {
    'sessionSuccess': {
        title: 'Inicio de Sesión Exitoso',
        variant: 'default',
        description: 'has iniciado sesión exitosamente.'
    },
    'sessionError': {
        title: 'Error',
        variant: 'destructive',
        description: 'No se pudo iniciar sesión.'
    },
    'sessionLogout': {
        title: 'Cierre de Sesión',
        variant: 'default',
        description: 'Has cerrado sesión exitosamente.'
    },
}

const apiFetch = async (url: string, method: 'POST' | 'GET') => {
    const response = await fetch(url, {
        method: method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
    });
    return response;
};


export const AuthProvider = ({ children }: React.PropsWithChildren) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [message, setMessage] = useState<Message | null>(null);
    const [isAuthReady, setIsAuthReady] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isProfileSelected, setIsProfileSelected] = useState(false);

    useEffect(() => {
        const checkAuthStatus = async () => {
            setIsLoading(true);
            try {
                const url = `${serverUrl}/sesion/verificar`;
                const response = await apiFetch(url, 'GET');
                if (response.ok) setIsLoggedIn(true);
                else if (response.status === 401) setIsLoggedIn(false);
                else throw new Error("algo salio mal");
            }

            catch (error) {
                console.error("Error al verificar la sesión:", error);
                setIsLoggedIn(false);
            }

            finally {
                setIsLoading(false);
                setIsAuthReady(true);
            }
        };

        checkAuthStatus();
    }, []);

    const login = useCallback(() => {
        setIsLoggedIn(true);
        setMessage(messages.sessionSuccess);
        setTimeout(() => setMessage(null), 3000);
    }, []);

    const logout = useCallback(async () => {
        try {
            const response = await apiFetch(`${serverUrl}/cerrar-sesion`, 'POST');

            if (response.ok) {
                setIsLoggedIn(false);
                setMessage(messages.sessionLogout);
                setTimeout(() => setMessage(null), 3000);
            }

            else {
                setMessage(messages.sessionError);
                setTimeout(() => setMessage(null), 3000);
            }
        }

        catch (error) {
            console.error("Error en el logout:", error);
            setIsLoggedIn(false);
        }
    }, []);

    const contextValue = useMemo(() => ({
        isLoggedIn,
        login,
        logout,
        message,
        setMessage,
        isAuthReady,
        isLoading,
        isProfileSelected,
        setIsProfileSelected,
    }), [isLoggedIn, login, logout, message, isAuthReady, isLoading, isProfileSelected]);

    return <AuthContext.Provider value={contextValue}> {children} </AuthContext.Provider>;
};
