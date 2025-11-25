import { useState } from "react";

type ToastProps = {
    title: string;
    description: string;
    variant: "success" | "error" | "warning" | "info" | "destructive";
};


export const useToast = () => {
    const [message, setMessage] = useState<ToastProps>();
    const toast = (props: ToastProps) => {
        setMessage(props);
        setTimeout(() => setMessage({ title: "", description: "", variant: "success" }), 3000);
    };
    return { toast, message };
};