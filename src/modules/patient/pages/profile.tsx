import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import { useParams } from 'react-router-dom';
import { BasicData } from '../components/basicData';
import { useCallback, useEffect, useMemo, useState } from "react";
import type { Patient, PatientFull } from "#/core/entities";
import { GetPatientDataService } from "#/core/services/getPatientData.service";
import { PatientRepositoryImpl } from "#/infrastructure/PatientRepository.impl";
import type { state } from "#/utils/types";

const patientRepository = new PatientRepositoryImpl();
const getPatientDataService = new GetPatientDataService(patientRepository)

export const PatientProfile = () => {
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

    const fetchData = useCallback(async (patientId: string) => {
        setIsLoading(true);
        try {
            setPatient(await getPatientDataService.execute(patientId));
        }

        catch (error) {
            console.error("Error al buscar pacientes:", error);
            setPatient(patientDefault);
        }

        finally {
            setIsLoading(false);
        }
    }, [patientDefault])

    useEffect(() => {
        if (patientId) {
            fetchData(patientId);
        }
    }, [patientId, fetchData]);

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 font-display">
            {/* 3. Header de la Aplicación (Simulado) */}
            <header className="flex items-center justify-between whitespace-nowrap border-b border-gray-200 dark:border-gray-800 px-4 sm:px-10 py-4 bg-white dark:bg-gray-950 shadow-sm">
                <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">MediConnect</h2>
                {/* Asumiendo que el nav y el avatar están en el layout superior */}
            </header>

            {/* 4. Contenedor Principal y Título */}
            <main className="flex-1 px-4 sm:px-6 lg:px-20 py-8">
                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Perfil de Paciente</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-1">Vea y edite la información del paciente.</p>
                    </div>

                    <Tabs defaultValue="account">
                        <TabsList>
                            <TabsTrigger className="" value="basicData">Datos Basicos</TabsTrigger>
                            <TabsTrigger value="business">Aseguradora</TabsTrigger>
                            <TabsTrigger value="relationship">Beneficiarios</TabsTrigger>
                        </TabsList>
                        <TabsContent value="basicData">
                            {isLoading && <p>Cargando...</p>}
                            <BasicData patientState={patientState} />
                        </TabsContent>
                        <TabsContent value="business">
                            <p>business</p>
                        </TabsContent>
                        <TabsContent value="relationship">
                            <p>relationship</p>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
};



