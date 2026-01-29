import { useMemo } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AlertCircleIcon, CheckCircle2Icon, X } from "lucide-react";

export type Message = {
    title: string;
    description?: string;
    variant: 'default' | 'destructive' | "success" | "warning" | "info";
};

export const AppAlert = ({ message, onClose }: { message: Message, onClose: () => void }) => {
    const finalAlertVariant = useMemo(() => {
        if (message.variant === "success" || message.variant === "warning" || message.variant === "info") {
            return "default";
        }
        return message.variant;
    }, [message.variant]);

    const Icon = useMemo(() => {
        return message.variant === 'default' ? CheckCircle2Icon : AlertCircleIcon;
    }, [message.variant]);

    const titleText = message.title;
    const descriptionText = message.description;

    return (
        <div className="fixed bottom-4 right-4 z-50 transition-transform duration-300">
            <Alert variant={finalAlertVariant} className="min-w-[300px] max-w-sm shadow-xl">
                <Icon className="h-4 w-4" />

                {/* Botón de cerrar */}
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none"
                    aria-label="Cerrar alerta"
                >
                    <X className="h-4 w-4" />
                </button>

                <AlertTitle>{titleText}</AlertTitle>
                {descriptionText && (
                    <AlertDescription>
                        {descriptionText}
                    </AlertDescription>
                )}
            </Alert>
        </div>
    );
};