import { Trash2 } from "lucide-react";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    // AlertDialogTrigger ya no es necesario, el modal es controlado
} from "@/components/ui/alert-dialog"


export type ConfirmationModalType = {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    title: string;
    message: string;
}

export const ConfirmationModal = (params: ConfirmationModalType) => {
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            params.onCancel();
        }
    };

    return (
        <AlertDialog open={params.isOpen} onOpenChange={handleOpenChange}>
            {/* AlertDialogTrigger se omite porque el modal se controla 
                de forma externa con 'isOpen'. 
            */}
            <AlertDialogContent>
                <AlertDialogHeader>
                    {/* Mapeamos el título */}
                    <AlertDialogTitle className="text-xl font-semibold text-red-600 dark:text-red-400">
                        {params.title}
                    </AlertDialogTitle>

                    {/* Mapeamos el mensaje */}
                    <AlertDialogDescription className="text-gray-600 dark:text-gray-300">
                        {params.message}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {/* Botón de Cancelar */}
                    <AlertDialogCancel onClick={params.onCancel} className="dark:text-gray-300">
                        Cancelar
                    </AlertDialogCancel>

                    {/* Botón de Acción (Confirmar), con estilo Destructivo */}
                    {/* Usamos onClick={onConfirm} para ejecutar la acción */}
                    <AlertDialogAction
                        onClick={params.onConfirm}
                        // Aplicamos el estilo destructivo
                        className="bg-red-600 hover:bg-red-700 text-white"
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Eliminar
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};