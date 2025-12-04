import type { IdName, PatientContracts } from "#/core/entities"
import { ConfirmationModal } from "@/components/app/confirmationModal"
import { Button } from "@/components/ui/button"
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/useToast"
import { X } from "lucide-react"
import { useState } from "react"



type BusinessCardProps = {
    contract: PatientContracts
    business: IdName;
    insurance: IdName;
    onDelete: (contract: PatientContracts) => void;
}


export const BusinessCard = ({ business, insurance, contract, onDelete }: BusinessCardProps) => {
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const { toast } = useToast()

    const confirmDeletion = (onDelete: (contract: PatientContracts) => void) => {
        onDelete(contract)
        setIsConfirmModalOpen(false);
        toast({
            title: "Eliminado",
            description: "El paciente ha sido eliminado.",
            variant: "destructive"
        });
    };

    return (
        <>
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onConfirm={() => confirmDeletion(onDelete)}
                onCancel={() => setIsConfirmModalOpen(false)}
                title="Confirmar Eliminación"
                message="¿Está seguro que desea eliminar esta empresa?"
            />
            <Card id={`business-card${contract.row}`} className="mb-5">
                <CardHeader>
                    <CardTitle>{business.name}</CardTitle>
                    <CardDescription>{insurance.name}</CardDescription>
                    <CardAction className="flex justify-between gap-3">
                        <Button variant="outline" onClick={() => setIsConfirmModalOpen(true)}>
                            <X className="text-red-500" />
                        </Button>
                    </CardAction>
                </CardHeader>
            </Card>
        </>
    )
}