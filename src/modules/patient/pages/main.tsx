
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { PatientTable } from '../components/patientTable';
import type { Patient as PatientEntity } from '#/core/entities';
import { useServices } from '@/components/hooks/useServices';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { routeLabel } from '#/routes';

export const Patient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [listPatients, setListPatients] = useState<PatientEntity[]>([]);
    const { searchPatientsService } = useServices();

    const navigate = useNavigate();

    const fetchData = useCallback(async (text: string) => {
        setIsLoading(true);
        try {
            const results: PatientEntity[] = await searchPatientsService.execute(text);
            setListPatients(results);
        }
        catch (error) {
            console.error("Error al buscar pacientes:", error);
            setListPatients([]);
        }
        finally {
            setIsLoading(false);
        }
    }, [searchPatientsService]);


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchTerm.length >= 3 || searchTerm.length === 0) {
                fetchData(searchTerm);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, fetchData]);

    const filteredPatients = useMemo(() => {
        const list = listPatients.filter(patient => {
            let fullName: boolean = false;
            if (patient.fullname) fullName = patient.fullname.toLowerCase().includes(searchTerm.toLowerCase());

            return fullName || patient.code?.toLowerCase().includes(searchTerm.toLowerCase());
        });

        return list;
    }, [listPatients, searchTerm]);

    const handleCreateNewPatient = () => {
        // Obtenemos la ruta base y reemplazamos ':patientId' con 'new'
        const newPatientPath = routeLabel.patientProfile.replace(":patientId", "new");
        navigate(newPatientPath);
    };



    // --- Renderizado principal ---
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Panel de Recepción Header */}
                <section className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Pacientes</h1>
                    {/* <p className="mt-1 text-base text-gray-500">
                        Bienvenido. Gestione la llegada de pacientes y las citas del día.
                    </p> */}
                </section>

                {/* Cola de Pacientes Card (Usando los componentes simulados de shadcn) */}
                <Card>

                    {/* Card Header (Cola de Pacientes + Botón) */}
                    <CardHeader className='flex justify-between items-center'>
                        <CardTitle>Buscar Pacientes</CardTitle>
                        <Button onClick={handleCreateNewPatient}>
                            Crear Nuevo Paciente
                        </Button>
                    </CardHeader>

                    {/* Herramientas de Filtro y Búsqueda */}
                    <CardContent className="bg-gray-50/50 flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 md:space-x-4">

                        {/* Campo de Búsqueda (shadcn Input) */}
                        <div className="w-full md:max-w-md">
                            <Input
                                // icon={SearchIcon}
                                type="text"
                                placeholder="Buscar pacientes por nombre o DNI"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        {/* Pestañas de Estado (shadcn Tabs) */}
                        {/* <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList className="bg-gray-200 border rounded-md">
                                {tabs.map(tab => (
                                    <TabsTrigger
                                        className="data-[state=active]:text-white data-[state=active]:bg-black"
                                        key={tab}
                                        value={tab}
                                    >
                                        {tab}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs> */}
                        {/* <StatusTabs activeTab={activeTab} setActiveTab={setActiveTab} /> */}

                    </CardContent>
                    <PatientTable patients={filteredPatients} isLoading={isLoading} />
                </Card>
            </main>

        </div>
    );
};