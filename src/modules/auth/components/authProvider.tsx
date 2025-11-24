import { createContext, useCallback, useMemo, useState } from "react";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export interface AuthContextType {
    isLoggedIn: boolean;
    login: () => void;
    logout: () => void;
    message: string | null;
    setMessage: React.Dispatch<React.SetStateAction<string | null>>;
}

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    // Simulación de inicio de sesión
    const login = useCallback(() => {
        setIsLoggedIn(true);
        setMessage('¡Inicio de sesión exitoso!');
        // Limpiar mensaje después de 3 segundos
        setTimeout(() => setMessage(null), 3000);
    }, []);

    // Simulación de cierre de sesión
    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setMessage('Sesión cerrada correctamente.');
        setTimeout(() => setMessage(null), 3000);
    }, []);

    const contextValue = useMemo(() => ({ isLoggedIn, login, logout, message, setMessage }), [isLoggedIn, login, logout, message, setMessage]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
