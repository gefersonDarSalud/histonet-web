import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import { useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from "react";
import type { PatientFull } from "#/core/entities";
import type { state } from "#/utils/types";
import { useServices } from "#/hooks/useServices";
import { PatientProfileForm } from "../components/patientProfileForm";
import { BusinessForm } from "../components/businessForm";
import { RelationshipForm } from "../components/relationshipForm";

export const PatientProfile = () => {
    const { getPatientDataService } = useServices();
    const patientDefault: PatientFull = useMemo(() => ({
        code: '',
        firstName: null,
        lastName: null,
        birthdate: null,
        gender: null,
        phone: null,
        address: null,
        email: null,
    }), [])

    const [isLoading, setIsLoading] = useState(false);
    const { patientId } = useParams();
    const [patient, setPatient] = useState<PatientFull>(patientDefault)

    const patientState: state<PatientFull> = { value: patient, set: setPatient };

    const fetchData = useCallback(async (id: string) => {
        setIsLoading(true);
        try {
            if (id && id !== 'new') {
                setPatient(await getPatientDataService.execute(id));
            }
        }

        catch (error) {
            console.error("Error al buscar pacientes:", error);
            setPatient(patientDefault);
        }

        finally {
            setIsLoading(false);
        }
    }, [patientDefault, getPatientDataService])

    useEffect(() => {
        if (patientId) {
            fetchData(patientId);
        }
    }, [patientId, fetchData, patientDefault]);

    const title = patientId === 'new' ? 'Crear Nuevo Paciente' : 'Perfil de Paciente';
    const subtitle = patientId === 'new' ? 'Ingrese la información del nuevo paciente.' : 'Vea y edite la información del paciente.';

    const isNewPatient = useMemo(() => patientId === 'new', [patientId]);

    const activeTabClasses = "data-[state=active]:bg-gray-900 data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=active]:dark:bg-gray-100 data-[state=active]:dark:text-gray-900";

    return (
        <main className="flex-1 px-4 sm:px-6 lg:px-20 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
                </div>

                <Tabs defaultValue="PatientProfileForm">
                    <TabsList>
                        <TabsTrigger className={activeTabClasses} value="PatientProfileForm">Datos Basicos</TabsTrigger>
                        <TabsTrigger className={activeTabClasses} value="business">Aseguradora</TabsTrigger>
                        <TabsTrigger className={activeTabClasses} value="relationship">Beneficiarios</TabsTrigger>
                    </TabsList>
                    <TabsContent value="PatientProfileForm">
                        <PatientProfileForm patientState={patientState} isNewPatient={isNewPatient} isLoading={isLoading} patientId={patientId ?? ''} />
                    </TabsContent>
                    <TabsContent value="business">
                        <BusinessForm patient={patientId ?? ''} />
                    </TabsContent>
                    <TabsContent value="relationship">
                        <RelationshipForm id_patient={patientId} />
                    </TabsContent>
                </Tabs>
            </div>
        </main>
    );
};



