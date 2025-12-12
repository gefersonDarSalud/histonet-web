import { createContext } from "react";
import type { ToastProps } from "./providers/toastProvider";
import type { MedicalVisitAction, MedicalVisitNursingDetails } from "#/core/entities";


export const ToastContext = createContext<{
    message: ToastProps | null;
    toast: (props: ToastProps) => void;
    setMessage: (message: ToastProps | null) => void;
} | undefined>(undefined);


export const MedicalVisitContext = createContext<{
    state: Partial<MedicalVisitNursingDetails>;
    dispatch: React.Dispatch<MedicalVisitAction>;
} | undefined>(undefined);


