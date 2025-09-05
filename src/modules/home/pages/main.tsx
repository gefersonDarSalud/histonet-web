// import { Button } from "@/components/ui/button"
// import type React from "react"

import React from 'react';
import {
    Bell,
    FileText,
    Plus,
    Eye,
    Edit,
    Trash2,
    Users,
    ArrowRightLeft,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardHeader,
    CardContent,
} from '@/components/ui/card';
import {
    Table,
    TableHeader,
    TableBody,
    TableRow,
    TableHead,
    TableCell,
} from '@/components/ui/table';
import {
    Avatar,
    AvatarImage,
    AvatarFallback,
} from '@/components/ui/avatar';

// Datos simulados
const stats = [
    { id: 1, title: 'Pacientes Hoy', value: 12, icon: Users, color: 'bg-orange-100 text-orange-600' },
    { id: 2, title: 'Consultas del Mes', value: 152, icon: FileText, color: 'bg-blue-100 text-blue-600' },
    { id: 3, title: 'Informes Generados', value: 78, icon: FileText, color: 'bg-green-100 text-green-600' },
    { id: 4, title: 'Interconsultas', value: 5, icon: ArrowRightLeft, color: 'bg-red-100 text-red-600' },
];

const appointments = [
    { id: 1, name: 'Ana Pérez', time: '09:00 AM', reason: 'Control de rutina', initials: 'AP' },
    { id: 2, name: 'Luis García', time: '10:30 AM', reason: 'Presentación de resultados', initials: 'LG' },
    { id: 3, name: 'Maria Rodríguez', time: '11:15 AM', reason: 'Seguimiento de tratamiento', initials: 'MR' },
];

export default (): React.ReactElement => {
    return (
        <>
            {/* Main */}
            <main className="container max-w-full mx-auto p-4 md:p-8 min-h-screen bg-gray-50 font-sans text-gray-800">
                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                            <p className="text-gray-500 mt-1">Bienvenido de nuevo, Dr. Carlos.</p>
                        </div>
                        <Button className="mt-4 md:mt-0 shadow-md">
                            <Plus size={18} className="mr-2" />
                            Nueva Consulta
                        </Button>
                    </div>

                {/* Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat) => (
                            <Card key={stat.id} className="p-6 shadow-lg flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500 text-sm">{stat.title}</p>
                                    <h2 className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</h2>
                                </div>
                                <div className={`p-3 rounded-full ${stat.color}`}>
                                    <stat.icon size={24} />
                                </div>
                            </Card>
                        ))}
                    </div>

                {/* Appointments */}
                <Card className="p-6 shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">Próximas Citas</h3>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Paciente</TableHead>
                                <TableHead>Hora</TableHead>
                                <TableHead>Motivo</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {appointments.map((appointment) => (
                                <TableRow key={appointment.id}>
                                    <TableCell>
                                        <div className="flex items-center space-x-3">
                                            <Avatar>
                                                <AvatarImage src={`https://placehold.co/40x40/E5E7EB/1F2937?text=${appointment.initials}`} />
                                                <AvatarFallback>{appointment.initials}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium text-gray-900">{appointment.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-gray-600">{appointment.time}</TableCell>
                                    <TableCell className="text-gray-600">{appointment.reason}</TableCell>
                                    <TableCell>
                                        <div className="flex justify-end space-x-2">
                                            <Button variant="ghost" size="icon">
                                                <Eye size={18} className="text-gray-600" />
                                            </Button>
                                            <Button variant="ghost" size="icon">
                                                <Edit size={18} className="text-gray-600" />
                                            </Button>
                                            <Button variant="ghost" size="icon">
                                                <Trash2 size={18} className="text-gray-600" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Card>
            </main>
        </>
    )
}