import type { AuthResult } from "#/core/repositories/userRepository";
import type { objectList } from "#/utils/types";
import type { Message } from "@/components/app/appAlert";
import { createContext, useCallback, useEffect, useMemo, useState } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    login: (authData: AuthResult) => void; // <-- Ahora recibe los datos de autenticación
    logout: () => void;
    message: Message | null;
    setMessage: React.Dispatch<React.SetStateAction<Message | null>>;
    isAuthReady: boolean; // Nuevo: indica si la verificación inicial terminó
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


export const AuthProvider = ({ children }: React.PropsWithChildren) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [message, setMessage] = useState<Message | null>(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    const ACCESS_TOKEN_KEY = 'histonet_access_token';

    useEffect(() => {
        console.log("Verificando sesión en localStorage...");
        const token = localStorage.getItem(ACCESS_TOKEN_KEY);
        if (token) {
            setIsLoggedIn(true);
        }
        setIsAuthReady(true);
    }, []);


    const login = useCallback((authData: AuthResult) => {
        if (authData.accessToken) {
            localStorage.setItem(ACCESS_TOKEN_KEY, authData.accessToken);
            setIsLoggedIn(true);
            setMessage(messages.sessionSuccess);
            setTimeout(() => setMessage(null), 3000);
        } else {
            setMessage(messages.sessionError);
            setTimeout(() => setMessage(null), 3000);
        }
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        setIsLoggedIn(false);
        setMessage(messages.sessionLogout);
        setTimeout(() => setMessage(null), 3000);
    }, []);

    const contextValue = useMemo(() => ({
        isLoggedIn,
        login,
        logout,
        message,
        setMessage,
        isAuthReady
    }), [isLoggedIn, login, logout, message, setMessage, isAuthReady]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
