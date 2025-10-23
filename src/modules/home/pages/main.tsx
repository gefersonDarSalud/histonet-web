import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PlusIcon } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { StatusBadge } from '../components/StatusTabs';

// --- Datos de Pacientes (Mock Data) ---

type patien = {
    id: number;
    name: string;
    visit: string;
    time: string;
    status: "Ingresado" | "En Espera" | "En Consulta" | "Atendido" | "Pendiente";
}
const initialPatients: patien[] = [
    { id: 1, name: "Sofía Rodríguez", visit: "V-034", time: "09:00 AM", status: "Ingresado" },
    { id: 2, name: "Carlos Pérez", visit: "-", time: "09:30 AM", status: "Pendiente" },
    { id: 3, name: "Laura García", visit: "V-035", time: "10:00 AM", status: "En Espera" },
    { id: 4, name: "Javier López", visit: "V-036", time: "10:30 AM", status: "En Consulta" },
    { id: 5, name: "Isabel Martínez", visit: "V-037", time: "11:00 AM", status: "Atendido" },
    { id: 6, name: "Manuel Sánchez", visit: "-", time: "11:30 AM", status: "Pendiente" },
    { id: 7, name: "Elena Ramos", visit: "V-038", time: "11:45 AM", status: "Ingresado" },
];

export const Home = () => {
    const tabs = ["Todos", "Pendientes", "Registrados"];
    const [activeTab, setActiveTab] = useState("Todos");
    const [searchTerm, setSearchTerm] = useState("");

    const filteredPatients = useMemo(() => {
        let list = initialPatients.filter(patient =>
            patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            patient.visit.toLowerCase().includes(searchTerm.toLowerCase())
        );

        if (activeTab === "Pendientes") {
            list = list.filter(p => p.status === "Pendiente" || p.status === "En Espera");
        } else if (activeTab === "Registrados") {
            list = list.filter(p => ["Ingresado", "En Consulta", "Atendido"].includes(p.status));
        }
        return list;
    }, [activeTab, searchTerm]);

    // --- Renderizado principal ---
    return (
        <div className="min-h-screen bg-gray-50 font-sans">

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* Panel de Recepción Header */}
                <section className="mb-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Panel de Recepción</h1>
                    <p className="mt-1 text-base text-gray-500">
                        Bienvenido. Gestione la llegada de pacientes y las citas del día.
                    </p>
                </section>

                {/* Cola de Pacientes Card (Usando los componentes simulados de shadcn) */}
                <Card>

                    {/* Card Header (Cola de Pacientes + Botón) */}
                    <CardHeader className='flex justify-between items-center'>
                        <CardTitle>Cola de Pacientes</CardTitle>
                        <Button>
                            <PlusIcon />
                            Nuevo Ingreso
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
                        <Tabs defaultValue="Pendientes">
                            <TabsList className="bg-gray-200 border rounded-md">
                                {tabs.map(tab => (
                                    <TabsTrigger
                                        className="data-[state=active]:text-white data-[state=active]:bg-black"
                                        key={tab}
                                        value={tab}
                                        onClick={() => setActiveTab(tab)}
                                    >
                                        {tab}
                                    </TabsTrigger>
                                ))}
                            </TabsList>
                        </Tabs>
                        {/* <StatusTabs activeTab={activeTab} setActiveTab={setActiveTab} /> */}

                    </CardContent>

                    <Table className="divide-y divide-gray-100">
                        {/* Encabezado de la Tabla (shadcn Table Header) */}
                        <TableHeader className="hidden md:grid md:grid-cols-[2fr_1fr_1fr_1.5fr_0.5fr] py-3 px-4 text-xs font-semibold uppercase tracking-wider text-gray-500 bg-gray-50 border-b border-gray-200">
                            <TableHead className="pl-4 font-bold">Nombre del Paciente</TableHead>
                            <TableHead className='font-bold'>Nº Visita</TableHead>
                            <TableHead className='font-bold'>Hora de Cita</TableHead>
                            <TableHead className='font-bold text-center'>Estado</TableHead>
                        </TableHeader>

                        {/* Cuerpo de la Tabla */}
                        <TableBody> {
                            filteredPatients.length > 0
                                ? (
                                    filteredPatients.map(patient =>
                                        <TableRow className="grid grid-cols-5 p-4 border-b border-gray-100 transition-colors hover:bg-gray-50 items-center text-sm md:grid-cols-[2fr_1fr_1fr_1.5fr_0.5fr] min-h-[60px]">
                                            <TableCell className="col-span-2 md:col-span-1 font-medium text-gray-900 pl-4">{patient.name}</TableCell>
                                            <TableCell className="hidden md:block text-gray-600">{patient.visit}</TableCell>
                                            <TableCell className="text-gray-600">{patient.time}</TableCell>
                                            <TableCell className="col-span-2 md:col-span-1 pr-4 md:pr-0 flex justify-center">
                                                <StatusBadge statusVisit={patient.status} />
                                            </TableCell>
                                        </TableRow>
                                    )
                                )
                                : (
                                    <TableRow>
                                        <TableCell className="p-6 text-center text-gray-500" colSpan={3} align='center'>
                                            No se encontraron pacientes para el filtro actual.
                                        </TableCell>
                                    </TableRow>
                                )
                        } </TableBody>
                    </Table>
                </Card>

            </main>

        </div>
    );
};