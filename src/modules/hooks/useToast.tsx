import { ToastContext } from "#/hooks/toastProvider";
import { useContext } from "react";

export const useToast = () => {
    const context = useContext(ToastContext);
    if (context === undefined) {
        // Esto previene errores si alguien olvida envolver la app con ToastProvider
        throw new Error('useToast must be used within a ToastProvider');
    }
    // Retorna las funciones y el estado compartido.
    return context;
};