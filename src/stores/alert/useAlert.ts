import { create } from 'zustand';

export type AlertProps = {
    title: string;
    description?: string;
    variant: 'default' | 'destructive' | "success" | "warning" | "info";
};

interface AlertState {
    message: AlertProps | null;
    setMessage: (message: AlertProps | null) => void;
    alert: (props: AlertProps) => void;
}

export const useAlertStore = create<AlertState>(set => ({
    message: null,
    setMessage: (message) => set({ message }),
    alert: (props) => {
        set({ message: props });
        setTimeout(() => set({ message: null }), 3000);
    },
}));