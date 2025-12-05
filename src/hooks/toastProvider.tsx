import { createContext, useState, type ReactNode } from "react";

export type ToastProps = {
    title: string;
    description?: string;
    variant: 'default' | 'destructive' | "success" | "warning" | "info";
};

type ToastContextType = {
    message: ToastProps | null;
    toast: (props: ToastProps) => void;
    setMessage: (message: ToastProps | null) => void;
};

// 2. Crear el contexto
export const ToastContext = createContext<ToastContextType | undefined>(undefined);

// 3. Crear el Provider (el componente que envuelve la aplicación)
export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [message, setMessage] = useState<ToastProps | null>(null);

    const toast = (props: ToastProps) => {
        setMessage(props);
        // Cierre automático después de 3 segundos
        setTimeout(() => setMessage(null), 3000);
    };

    // El valor que se comparte globalmente
    const value = { message, toast, setMessage };

    return (
        <ToastContext.Provider value={value}>
            {children}
        </ToastContext.Provider>
    );
};

