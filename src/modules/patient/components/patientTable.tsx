import type { PatientTableProps } from "#/utils/types";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useNavigate } from "react-router-dom";

export const PatientTable = ({ patients, isLoading }: PatientTableProps) => {
    const hasPatients = patients.length > 0;
    const navigate = useNavigate();
    const handleRowClick = (patientId: string | number): void => { navigate(`/paciente/${patientId}`); };
    return (
        <Table className="divide-y divide-gray-100">
            {/* Encabezado de la Tabla (shadcn Table Header) */}
            <TableHeader >
                <TableRow className="hidden md:grid md:grid-cols-[2fr_1fr_1fr_1.5fr_0.5fr]">
                    <TableHead className="pl-4 font-bold">Nombre del Paciente</TableHead>
                    <TableHead className="pl-4 font-bold">Cedula</TableHead>
                    <TableHead className='font-bold'>Genero</TableHead>
                    <TableHead className='font-bold'>Fecha de Nacimiento</TableHead>
                    <TableHead className='font-bold'>Empresa</TableHead>
                </TableRow>
            </TableHeader>

            {/* Cuerpo de la Tabla */}
            <TableBody>{
                isLoading ?
                    <TableRow>
                        <TableCell className="p-6 text-center text-gray-500" colSpan={3} align='center'>
                            No se encontraron pacientes para el filtro actual.
                        </TableCell>
                    </TableRow>
                    : !hasPatients ?
                        <TableRow>
                            <TableCell className="p-6 text-center text-gray-500" colSpan={3} align='center'>
                                No se encontraron pacientes para el filtro actual.
                            </TableCell>
                        </TableRow>
                        :
                        patients.map((patient, index) =>
                            <TableRow className="grid grid-cols-5 p-4 border-b border-gray-100 transition-colors hover:bg-gray-50 items-center text-sm md:grid-cols-[2fr_1fr_1fr_1.5fr_0.5fr] min-h-[60px] hover:bg-gray-300"
                                key={index}
                                onClick={() => handleRowClick(patient.id)}
                            >
                                <TableCell className="col-span-2 md:col-span-1 font-medium text-gray-900 pl-4">{patient.fullname}</TableCell>
                                <TableCell className="hidden md:block text-gray-600">{patient.code}</TableCell>
                                <TableCell className="hidden md:block text-gray-600">{patient.gender}</TableCell>
                                <TableCell className="text-gray-600">{patient.birthdate}</TableCell>
                                <TableCell className="col-span-2 md:col-span-1 pr-4 md:pr-0 flex justify-center">{patient.business}</TableCell>
                            </TableRow>
                        )
            }</TableBody>
        </Table>
    )
}