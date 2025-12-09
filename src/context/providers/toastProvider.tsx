import { useState, type ReactNode } from "react";
import { ToastContext } from "..";

export type ToastProps = {
    title: string;
    description?: string;
    variant: 'default' | 'destructive' | "success" | "warning" | "info";
};

export const ToastProvider = ({ children }: { children: ReactNode }) => {
    const [message, setMessage] = useState<ToastProps | null>(null);

    const toast = (props: ToastProps) => {
        setMessage(props);
        setTimeout(() => setMessage(null), 3000);
    };
    const value = { message, toast, setMessage };

    return (
        <ToastContext.Provider value={value}>
            {children}
        </ToastContext.Provider>
    );
};

