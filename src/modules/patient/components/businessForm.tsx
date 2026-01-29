
import type { PatientContracts } from '#/core/entities';
import { useServices } from '@/components/hooks/useServices';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BusinessCard } from './businessCard';
import { Input } from '@/components/ui/input';
import { BusinessFormAdd } from './BusinessFormAdd';
import { Separator } from '@/components/ui/separator';
import { useAlertStore } from '#/stores/alert/useAlert';

type BusinessFormProps = {
    patient: string | number,
}

export const BusinessForm = ({ patient }: BusinessFormProps) => {
    const { getPatientContracts, deletePatientContracts } = useServices();
    const { alert } = useAlertStore();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [listBusiness, setListBusiness] = useState<PatientContracts[]>([]);
    const [searchBusiness, setSearchBusiness] = useState<string>("");

    const fetchData = useCallback(async (patient: string | number) => {
        setIsLoading(true);
        try {
            const response = await getPatientContracts.execute(patient.toString());
            setListBusiness(response);
        } catch (error) {
            console.error("Error al cargar contratos:", error);
            alert({
                title: "Error de Carga",
                description: "No se pudieron cargar los contratos de empresa.",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    }, [getPatientContracts, alert]);

    useEffect(() => {
        fetchData(patient);
    }, [fetchData, patient]); // Asegúrate de que fetchData esté en las dependencias

    const deleteBusinessContract = useCallback(async (contract: PatientContracts) => {
        setIsLoading(true);
        const { business, insurance, row: contractRow } = contract;
        try {
            const response = await deletePatientContracts.execute(patient.toString(), {
                business: business.id.toString(),
                insurance: insurance.id.toString(),
            });
            if (response.status !== 1) {
                return alert({
                    title: "Error:",
                    description: `No se ha podido eliminar la empresa. ${response.resultado}`,
                    variant: "destructive"
                });
            }
            setListBusiness(prevList => prevList.filter(c => c.row !== contractRow));
            alert({
                title: "Completado",
                description: `Se ha eliminado la empresa. ${response.resultado}`,
                variant: "success"
            });
        }

        catch (error) {
            console.error("Error al eliminar contrato:", error);
            alert({
                title: "Error del sistema:",
                description: "Ocurrió un error inesperado al contactar con el servicio.",
                variant: "destructive"
            });
        }
        finally {
            setIsLoading(false);
        }
    }, [deletePatientContracts, patient, alert]);

    const filteredListBusiness = useMemo(() => listBusiness.filter(business => {
        const businessName = business.business.name;
        const insuranceName = business.insurance.name;
        let resultBusiness: boolean = false;
        let resultInsurance: boolean = false;

        if (businessName) resultBusiness = businessName.toLowerCase().includes(searchBusiness.toLowerCase());
        if (insuranceName) resultInsurance = insuranceName.toLowerCase().includes(searchBusiness.toLowerCase());

        return resultBusiness || resultInsurance;
    }), [listBusiness, searchBusiness]);

    // const fetchData = useCallback(async (patient_id: string | number) => {
    //     setIsLoading(true);
    //     try {
    //         const results: PatientContracts[] = await getPatientContracts.execute(patient_id.toString());
    //         setListBusiness(results);
    //     }
    //     catch (error) {
    //         console.error("Error al buscar pacientes:", error);
    //         setListBusiness([]);
    //     }
    //     finally {
    //         setIsLoading(false);
    //     }
    // }, [getPatientContracts])

    // useEffect(() => {
    //     fetchData(patient);
    // }, [fetchData, patient])



    return (
        <>
            <div className="w-full md:max-w-md my-3 flex flex-col justify-between items-center">
                <Input
                    // icon={SearchIcon}
                    type="text"
                    placeholder="Busca por nombre de la empresa o aseguradora"
                    value={searchBusiness}
                    onChange={(e) => setSearchBusiness(e.target.value)}
                />
            </div>
            <div className='max-h-96 overflow-auto'>
                {
                    isLoading ?
                        <p>Cargando...</p>
                        :
                        filteredListBusiness.map(businessContract => (
                            <BusinessCard
                                key={businessContract.row} // Usar el ID único como key
                                contract={businessContract} // 🚨 Pasar el ID único
                                business={businessContract.business}
                                insurance={businessContract.insurance}
                                onDelete={() => deleteBusinessContract(businessContract)}
                            />
                        ))
                }
            </div>
            <Separator className='my-5' />
            <BusinessFormAdd patientId={patient.toString()} onSuccess={() => fetchData(patient)} />
        </>
    );
};