
import type { PatientContracts } from '#/core/entities';
import { useServices } from '#/hooks/useServices';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BusinessCard } from './businessCard';
import { Input } from '@/components/ui/input';
import { BusinessFormAdd } from './BusinessFormAdd';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/useToast';

type BusinessFormProps = {
    patient: string,
}

export const BusinessForm = ({ patient }: BusinessFormProps) => {
    const { getPatientContracts, deletePatientContracts } = useServices();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [listBusiness, setListBusiness] = useState<PatientContracts[]>([]);
    const [searchBusiness, setSearchBusiness] = useState<string>("");

    const deleteBusinessContract = useCallback(async (contract: PatientContracts) => {
        setIsLoading(true);
        const { business, insurance, row: contractRow } = contract;
        try {
            const response = await deletePatientContracts.execute(patient, {
                business: business.id.toString(),
                insurance: insurance.id.toString(),
            });
            if (response.status !== 1) {
                return toast({
                    title: "Error:",
                    description: `No se ha podido eliminar la empresa. ${response.resultado}`,
                    variant: "destructive"
                });
            }
            setListBusiness(prevList => prevList.filter(c => c.row !== contractRow));
            toast({
                title: "Completado",
                description: `Se ha eliminado la empresa. ${response.resultado}`,
                variant: "success"
            });
        }

        catch (error) {
            console.error("Error al eliminar contrato:", error);
            toast({
                title: "Error del sistema:",
                description: "Ocurrió un error inesperado al contactar con el servicio.",
                variant: "destructive"
            });
        }
        finally {
            setIsLoading(false);
        }
    }, [deletePatientContracts, patient, toast]);

    const filteredListBusiness = useMemo(() => listBusiness.filter(business => {
        const businessName = business.business.name;
        const insuranceName = business.insurance.name;
        let resultBusiness: boolean = false;
        let resultInsurance: boolean = false;

        if (businessName) resultBusiness = businessName.toLowerCase().includes(searchBusiness.toLowerCase());
        if (insuranceName) resultInsurance = insuranceName.toLowerCase().includes(searchBusiness.toLowerCase());

        return resultBusiness || resultInsurance;
    }), [listBusiness, searchBusiness]);

    const fetchData = useCallback(async (patient_id: string) => {
        setIsLoading(true);
        try {
            const results: PatientContracts[] = await getPatientContracts.execute(patient_id);
            setListBusiness(results);
        }
        catch (error) {
            console.error("Error al buscar pacientes:", error);
            setListBusiness([]);
        }
        finally {
            setIsLoading(false);
        }
    }, [getPatientContracts])

    useEffect(() => {
        fetchData(patient);
    }, [fetchData, patient])

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
            <BusinessFormAdd patientId={patient} listBusiness={{
                set: setListBusiness,
                value: listBusiness
            }} />
        </>
    );
};