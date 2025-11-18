import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState, useMemo } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { NewCall } from '../components/newCall';
import { PatientVisitTable } from '../components/PatientVisitTable';
import type { Visit } from '#/core/entities';

const initialVisit: Visit[] = [
    {
        patient: { "id": "V28563229", "fullname": "Sofía Rodríguez" },
        code: "01-034",
        time: "09:00 AM",
        date: "10/11/2025",
        status: "Ingresado",
        type: "asegurado"
    },
    {
        patient: { "id": "V15546456", "fullname": "Carlos Pérez" },
        code: "-",
        time: "09:30 AM",
        date: "10/11/2025",
        status: "Pendiente",
        type: "particular"
    },
    {
        patient: { "id": "V10687542", "fullname": "Laura García" },
        code: "01-035",
        time: "10:00 AM",
        date: "10/11/2025",
        status: "En Espera",
        type: "afiliado"
    },
    {
        patient: { "id": "V23894562", "fullname": "Javier López" },
        code: "01-036",
        time: "10:30 AM",
        date: "10/11/2025",
        status: "En Consulta",
        type: "particular"
    },
    {
        patient: { "id": "V31846451", "fullname": "Manuel Sánchez" },
        code: "01-037",
        time: "11:30 AM",
        date: "11/11/2025",
        status: "Atendido",
        type: "asegurado"
    }
]

export const RemoteClinic = () => {
    const tabs = ["Todos", "Pendientes", "Registrados"];
    const [activeTab, setActiveTab] = useState("Todos");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredPatients = useMemo(() => {
        let list = initialVisit.filter(visit =>
            visit.patient.fullname.toLowerCase().includes(searchTerm.toLowerCase()) ||
            visit.code.toLowerCase().includes(searchTerm.toLowerCase())
        );

        switch (activeTab) {
            case "Pendientes":
                list = list.filter(p => p.status === "Pendiente" || p.status === "En Espera");
                break;
            case "Registrados":
                list = list.filter(p => ["Ingresado", "En Consulta", "Atendido"].includes(p.status));
                break;
        }

        return list;
    }, [activeTab, searchTerm]);

    // --- Renderizado principal ---
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Panel de Recepción Header */}
                <section className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Telemedicina</h1>
                    {/* <p className="mt-1 text-base text-gray-500">
                        Bienvenido. Gestione la llegada de pacientes y las citas del día.
                    </p> */}
                </section>

                {/* Cola de Pacientes Card (Usando los componentes simulados de shadcn) */}
                <Card>

                    {/* Card Header (Cola de Pacientes + Botón) */}
                    <CardHeader className='flex justify-between items-center'>
                        <CardTitle>Cola de Pacientes</CardTitle>
                        <NewCall />
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
                        <Tabs value={activeTab} onValueChange={setActiveTab}>
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
                        </Tabs>
                        {/* <StatusTabs activeTab={activeTab} setActiveTab={setActiveTab} /> */}

                    </CardContent>

                    <PatientVisitTable visits={filteredPatients} />
                </Card>

            </main>

        </div>
    );
};