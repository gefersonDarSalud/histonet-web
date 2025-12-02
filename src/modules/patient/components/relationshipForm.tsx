import {
    Card,
    // CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { BeneficiariesTable } from "./beneficiariesTable"
import { OwnersTable } from "./ownersTable"
import { Button } from "@/components/ui/button"
import { useFetch } from "#/hooks/useFetch"
import { useServices } from "#/hooks/useServices"
import type { PatientRelationship } from "#/core/entities"
import { useEffect } from "react"

export type beneficiariesType = { patient: string; list: 'BENEFICIARIO'; }
export type ownersType = { patient: string; list: 'TITULAR'; }

type props = {
    id_patient?: string;
}

export const RelationshipForm = ({ id_patient }: props) => {
    const { getPatientRelationship } = useServices();

    const {
        data: beneficiaries,
        loading: beneficiariesloading,
        // error: beneficiariesError,
        execute: beneficiariesFetch,
        set: setGroupBeneficiaries,
    } = useFetch<
        PatientRelationship[], beneficiariesType[]
    >(getPatientRelationship.execute, []);

    const {
        data: owners,
        loading: ownersloading,
        // error: ownersError,
        execute: ownerFetch,
        set: setGroupOwners,
    } = useFetch<
        PatientRelationship[], ownersType[]
    >(getPatientRelationship.execute, []);

    useEffect(
        () => { if (id_patient) beneficiariesFetch({ patient: id_patient, list: 'BENEFICIARIO' }) },
        [id_patient, beneficiariesFetch]
    )

    useEffect(
        () => { if (id_patient) ownerFetch({ patient: id_patient, list: 'TITULAR' }) },
        [id_patient, ownerFetch]
    );

    console.log("owners:", owners);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Beneficiarios y Titulares</CardTitle>
                <CardDescription>Lista de los beneficiarios y titulares del paciente actual</CardDescription>
                {/* <CardAction>Card Action</CardAction> */}
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
                        />
                    </div>

                </div>
                <div className="flex justify-between flex-col gap-3 mt-5">
                    <span className="font-semibold">Titulares</span>
                    <div className="border border-gray-300 rounded-2xl pt-4">
                        <OwnersTable owners={{
                            set: setGroupOwners,
                            value: owners !== null ? owners : [],
                        }} isLoading={ownersloading} />
                    </div>
                </div>
            </CardContent>
            <CardFooter className="Flex justify-end">
                <Button>Guardar</Button>
            </CardFooter>
        </Card>)
}