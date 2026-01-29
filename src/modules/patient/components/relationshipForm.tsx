import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { BeneficiariesTable } from "./beneficiariesTable"
import { OwnersTable } from "./ownersTable"
import { Button } from "@/components/ui/button"
import { useFetch } from "@/components/hooks/useFetch"
import { useServices } from "@/components/hooks/useServices"
import type { PatientRelationship, Response } from "#/core/entities"
import { useCallback, useEffect } from "react"
import { AddRelationshipModal } from "./AddRelationshipModal"
import { useAlertStore, type AlertProps } from "#/stores/alert/useAlert"

export type beneficiariesType = { patient: string; list: 'BENEFICIARIO'; }
export type ownersType = { patient: string; list: 'TITULAR'; }

type props = {
    id_patient?: string;
}

const messages: AlertProps[] = [
    {
        title: "Error de Datos",
        description: "Falta el ID del beneficiario para la eliminación.",
        variant: 'destructive',
    },
    {
        title: "Éxito",
        description: "Beneficiario eliminado correctamente.",
        variant: 'default',
    },
    {
        title: "Error de Conexión",
        description: "Ocurrió un error inesperado al intentar eliminar el beneficiario.",
        variant: 'destructive',
    },
    {
        title: "Error de Datos",
        description: "Falta el ID del titular para la eliminación.",
        variant: 'destructive',
    },
    {
        title: "Éxito",
        description: "Titular eliminado correctamente.",
        variant: 'default',
    },
    {
        title: "Error de Conexión",
        description: "Ocurrió un error inesperado al intentar eliminar el titular.",
        variant: 'destructive',
    },
]

export const RelationshipForm = ({ id_patient }: props) => {
    const { getPatientRelationship, deletePatientRelationship } = useServices();
    const { alert } = useAlertStore();

    const {
        data: beneficiaries,
        loading: beneficiariesloading,
        // error: beneficiariesError,
        execute: beneficiariesFetch,
        set: setGroupBeneficiaries,
    } = useFetch<PatientRelationship[], beneficiariesType[]>(getPatientRelationship.execute, []);

    const {
        data: owners,
        loading: ownersloading,
        // error: ownersError,
        execute: ownerFetch,
        set: setGroupOwners,
    } = useFetch<PatientRelationship[], ownersType[]>(getPatientRelationship.execute, []);

    useEffect(
        () => { if (id_patient) beneficiariesFetch({ patient: id_patient, list: 'BENEFICIARIO' }) },
        [id_patient, beneficiariesFetch]
    )

    useEffect(
        () => { if (id_patient) ownerFetch({ patient: id_patient, list: 'TITULAR' }) },
        [id_patient, ownerFetch]
    );

    const fetchRelationships = useCallback(() => {
        beneficiariesFetch({ patient: id_patient, list: 'BENEFICIARIO' });
        ownerFetch({ patient: id_patient, list: 'TITULAR' });
    }, [id_patient, beneficiariesFetch, ownerFetch]);

    const handleDeleteBeneficiary = useCallback(async (beneficiary: PatientRelationship) => {
        const ownerId = id_patient.toString();
        const beneficiaryId = beneficiary.id_patient.toString();

        if (!beneficiaryId) {
            return alert(messages[0]);
        }

        try {
            const response: Response = await deletePatientRelationship.execute({
                beneficary: beneficiaryId,
                owner: ownerId,
            });

            if (response.status === 1 || response.status === 1) {
                alert(messages[1]);
                fetchRelationships(); // Recargar los listados
            } else {
                alert({
                    title: "Error al Eliminar",
                    description: `No se pudo eliminar al beneficiario: ${response.resultado}`,
                    variant: 'destructive',
                });
            }
        } catch (error) {
            console.error("Error al eliminar beneficiario:", error);
            alert(messages[2]);
        }
    }, [id_patient, deletePatientRelationship, fetchRelationships, alert]);

    const handleDeleteOwner = useCallback(async (owner: PatientRelationship) => {

        const beneficiaryId = id_patient.toString();
        const ownerId = owner.id_client.toString();

        if (!ownerId) {
            return alert(messages[3]);
        }

        try {
            const response: Response = await deletePatientRelationship.execute({
                beneficary: beneficiaryId,
                owner: ownerId,
            });

            if (response.status === 1 || response.status === 1) {
                alert(messages[4]);
                fetchRelationships();
            } else {
                alert({
                    title: "Error al Eliminar",
                    description: `No se pudo eliminar al titular: ${response.resultado}`,
                    variant: 'destructive',
                },);
            }
        } catch (error) {
            console.error("Error al eliminar titular:", error);
            alert(messages[5]);
        }
    }, [id_patient, deletePatientRelationship, fetchRelationships, alert]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Beneficiarios y Titulares</CardTitle>
                <CardDescription>Lista de los beneficiarios y titulares del paciente actual</CardDescription>
                <CardAction>
                    <AddRelationshipModal
                        triggerText="Agregar Paciente"
                        mainPatientId={id_patient}
                        onSaveSuccess={fetchRelationships}
                    />
                </CardAction>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between flex-col gap-3">
                    <span className="font-semibold">Beneficiarios</span>
                    <div className="border border-gray-300 rounded-2xl pt-4">
                        <BeneficiariesTable
                            beneficiaries={{
                                set: setGroupBeneficiaries,
                                value: beneficiaries !== null ? beneficiaries : [],
                            }}
                            isLoading={beneficiariesloading}
                            onDeleteBeneficiary={handleDeleteBeneficiary}
                        />
                    </div>

                </div>
                <div className="flex justify-between flex-col gap-3 mt-5">
                    <span className="font-semibold">Titulares</span>
                    <div className="border border-gray-300 rounded-2xl pt-4">
                        <OwnersTable
                            owners={{
                                set: setGroupOwners,
                                value: owners !== null ? owners : [],
                            }} isLoading={ownersloading}
                            onDeleteOwner={handleDeleteOwner}
                        />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="Flex justify-end">
                <Button>Guardar</Button>
            </CardFooter>
        </Card>)
}