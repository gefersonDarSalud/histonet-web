
import type { PatientContracts } from '#/core/entities';
import { useServices } from '#/hooks/useServices';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { BusinessCard } from './businessCard';
import { Input } from '@/components/ui/input';
import { BusinessFormAdd } from './BusinessFormAdd';
import { Separator } from '@/components/ui/separator';

// const initialsValue = {
//     nombreEmpresa: '',
//     departamento: '',
//     aseguradora: '',
//     baremo: {},
// }

type BusinessFormProps = {
    patient: string,
}

export const BusinessForm = ({ patient }: BusinessFormProps) => {
    const { getPatientContracts } = useServices();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [listBusiness, setListBusiness] = useState<PatientContracts[]>([]);
    const [searchBusiness, setSearchBusiness] = useState<string>("");

    const deleteBusinessContract = useCallback((contractRow: number) => {
        setListBusiness(prevList => prevList.filter(contract => contract.row !== contractRow));
    }, []);

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

    // function onSubmit(data: FormValues) {
    //     console.log("Datos enviados:", data);
    // }

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
                        filteredListBusiness.map(business => (
                            <BusinessCard
                                key={business.row} // Usar el ID único como key
                                row={business.row} // 🚨 Pasar el ID único
                                business={business.business}
                                insurance={business.insurance}
                                onDelete={deleteBusinessContract}
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