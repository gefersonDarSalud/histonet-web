import type { VisitTableProps } from "#/utils/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatusBadge } from "@/home/components/StatusTabs"



export const PatientVisitTable = ({ visits }: VisitTableProps) => {
    const hasPatients = visits.length > 0;
    return (
        <Table className="divide-y divide-gray-100">
            {/* Encabezado de la Tabla (shadcn Table Header) */}
            <TableHeader >
                <TableRow className="hidden md:grid md:grid-cols-[2fr_1fr_1fr_1.5fr_0.5fr]">

                    <TableHead className="pl-4 font-bold">Nombre del Paciente</TableHead>
                    <TableHead className="pl-4 font-bold">Cedula</TableHead>
                    <TableHead className='font-bold'>Nº Visita</TableHead>
                    <TableHead className='font-bold'>Hora de Cita</TableHead>
                    <TableHead className='font-bold text-center'>Estado</TableHead>
                </TableRow>
            </TableHeader>

            {/* Cuerpo de la Tabla */}
            <TableBody>{
                hasPatients
                    ? visits.map((visit, index) =>
                        <TableRow key={index} className="grid grid-cols-5 p-4 border-b border-gray-100 transition-colors hover:bg-gray-50 items-center text-sm md:grid-cols-[2fr_1fr_1fr_1.5fr_0.5fr] min-h-[60px]">
                            <TableCell className="col-span-2 md:col-span-1 font-medium text-gray-900 pl-4">{visit.patient.fullname}</TableCell>
                            <TableCell className="hidden md:block text-gray-600">{visit.patient.id}</TableCell>
                            <TableCell className="hidden md:block text-gray-600">{visit.code}</TableCell>
                            <TableCell className="text-gray-600">{visit.time}</TableCell>
                            <TableCell className="col-span-2 md:col-span-1 pr-4 md:pr-0 flex justify-center">
                                <StatusBadge statusVisit={visit.status} />
                            </TableCell>
                        </TableRow>
                    )
                    :
                    <TableRow>
                        <TableCell className="p-6 text-center text-gray-500" colSpan={3} align='center'>
                            No se encontraron pacientes para el filtro actual.
                        </TableCell>
                    </TableRow>
            }</TableBody>
        </Table>
    )
}