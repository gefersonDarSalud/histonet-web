import { useEffect, useState } from 'react';
import { Badge, BadgeCheck, MapIcon, Stethoscope } from 'lucide-react';
import type { MedicalVisitNursingDetails, VisitStatus } from '#/core/entities';
import { AdmissionDataPanel } from '../components/AdmissionDataPanel';
import { useMedicalVisit } from '@/components/hooks/useMedicalVisit';
import { useParams } from 'react-router-dom';
import { useFetch } from '@/components/hooks/useFetch';
import { useServices } from '@/components/hooks/useServices';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loading } from '@/components/app/loading';
import { capitalizeText } from '#/utils/functions';

const TABS = [
    { id: 'ficha-tecnica', label: 'Ficha Técnica', icon: 'User' },
    { id: 'entrevista-clinica', label: 'Entrevista Clínica', icon: 'Stethoscope' },
    { id: 'visitas-anteriores', label: 'Visitas Anteriores', icon: 'Clock' },
];

export default function Visit() {
    const { visitId } = useParams();
    const { dispatch, state: visitContext } = useMedicalVisit();
    const { getMedicalVisit } = useServices();
    const [activeTab, setActiveTab] = useState('ficha-tecnica');
    const { data: visitData, loading: visitDataLoading, error: visitDataError, execute: fetchVisitData } =
        useFetch<MedicalVisitNursingDetails, string[]>(getMedicalVisit.execute, []);

    useEffect(() => {
        fetchVisitData(visitId);
    }, [fetchVisitData, visitId])

    const isLoadContext = visitContext.patient !== null && visitData ? true : false

    useEffect(() => {
        if (visitData) dispatch({ type: 'SET_MEDICAL_VISIT', payload: visitData })
    }, [visitData, dispatch])

    const getStatusColor = (status: VisitStatus) => {
        switch (status) {
            case 'EN_CURSO': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
            case 'PENDIENTE': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
            case 'CERRADA': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
        }
    };

    return (isLoadContext == true
        ?
        <div className="flex-1 w-full max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-h-10">
                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">Formulario de Atención a la Visita</h1>
                <div className='flex flex-col gap-3  justify-end items-start p-5 pt-20'>
                    <span className='font-semibold text-lg max-w-40'>
                        {capitalizeText(visitContext.patient.fullname)}
                    </span>
                    <div className="flex items-center gap-4 border border-transparent rounded-2xl bg-gray-100 p-2">
                        <Stethoscope />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            ID Visita: <span className="font-semibold text-gray-800 dark:text-white">{visitData.visitNumber}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                {/* Componente Tabs de Shadcn UI */}
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-fit grid-cols-3 border-b border-gray-200 dark:border-[#2d2d2d] rounded-none">
                        {TABS.map((tab) => (
                            // El 'value' debe coincidir con el 'value' de TabsContent
                            <TabsTrigger key={tab.id} value={tab.id}
                                className={`shrink-0 border-b-2 px-1 pb-3 text-sm font-semibold inline-flex items-center gap-2 transition-colors duration-200 ease-in-out rounded-none ${activeTab === tab.id ? 'border-b-gray-800 dark:border-b-gray-200 text-gray-800 dark:text-gray-200 rounded-none' : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:border-b-gray-300 dark:hover:border-b-gray-500 rounded-none'}`}
                            >
                                {/* Nota: Aquí debes usar el componente de ícono real, por ejemplo:
                                {tab.icon === 'User' && <User className="w-4 h-4" />}
                                */}
                                <MapIcon className="w-4 h-4" /> {/* Usado como placeholder */}
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {/* Contenido de las pestañas */}
                    <div className="mt-6">
                        {/* Ficha Técnica */}
                        <TabsContent value="ficha-tecnica">
                            <AdmissionDataPanel />
                        </TabsContent>

                        {/* Entrevista Clínica */}
                        <TabsContent value="entrevista-clinica">
                            {/* Descomentar y pasar los props adecuados cuando el componente EntrevistaClinicaContent esté disponible */}
                            {/* <EntrevistaClinicaContent
                                formData={formData}
                                setFormData={setFormData}
                                onSave={handleSave}
                            /> */}
                            <p className="text-gray-500 dark:text-gray-400">Contenido de Entrevista Clínica (Pendiente de implementación)</p>
                        </TabsContent>

                        {/* Visitas Anteriores */}
                        <TabsContent value="visitas-anteriores">
                            {/* Descomentar y pasar los props adecuados cuando el componente VisitasAnterioresContent esté disponible */}
                            {/* <VisitasAnterioresContent visits={MOCK_PREVIOUS_VISITS} /> */}
                            <p className="text-gray-500 dark:text-gray-400">Contenido de Visitas Anteriores (Pendiente de implementación)</p>
                        </TabsContent>
                    </div>
                </Tabs>
            </div>
        </div>
        :
        <Loading />
    );
}