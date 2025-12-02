
import { Loading } from "@/components/app/loading";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { PatientRelationship } from "#/core/entities";
import type { UseFetchSetState } from "#/hooks/useFetch";

type TableData = {
    // 2. 'value' contiene el array de datos
    value: PatientRelationship[];
    // 3. 'set' usa el tipo exportado, con el tipo de dato PatientArray y Error
    set: UseFetchSetState<PatientRelationship[], Error>;
}

type props = {
    owners: TableData;
    isLoading: boolean;
}

export const OwnersTable = ({ owners, isLoading }: props) => {

    const deleteOwner = (index: number) => {
        owners.set((prev) => {
            const newData = prev.data
                ? prev.data.filter((_, i) => i !== index)
                : [];

            return {
                ...prev,
                data: newData,
            };
        })
    }

    const hasOwners = Array.isArray(owners.value) ? owners.value.length > 0 : false;

    return (
        <Table className="divide-y divide-gray-100">
            <TableHeader >
                <TableRow className="hidden md:grid md:grid-cols-[0.5fr_2fr_1fr_0.5Fr]">
                    <TableHead className="pl-4 font-bold">Cedula</TableHead>
                    <TableHead className='font-bold text-center'>Nombre Completo</TableHead>
                    <TableHead className='font-bold'>Parentesco</TableHead>
                    <TableHead className='font-bold'>accion</TableHead>

                </TableRow>
            </TableHeader>

            {/* Cuerpo de la Tabla */}
            <TableBody>{
                isLoading ?
                    <TableRow>
                        <TableCell className="p-6 text-center text-gray-500" colSpan={3} align='center'>
                            <Loading />
                        </TableCell>
                    </TableRow>
                    : !hasOwners ?
                        <TableRow>
                            <TableCell className="p-6 text-center text-gray-500" colSpan={3} align='center'>
                                No se encontraron pacientes para el filtro actual.
                            </TableCell>
                        </TableRow>
                        : (
                            <>

                                {owners.value.map((owners, index) =>
                                    <TableRow className="grid grid-cols-5 p-4 border-b border-gray-100 transition-colors items-center text-sm md:grid-cols-[0.5fr_2fr_1fr_0.5Fr] min-h-[60px]"
                                        key={index}
                                    >
                                        <TableCell className="hidden md:block text-gray-600">{owners.patient_code}</TableCell>
                                        <TableCell className="md:col-span-1 font-medium text-gray-900 pl-4 text-center">{owners.fullname}</TableCell>
                                        <TableCell className="md:col-span-1 font-medium text-gray-900 pl-4">{owners.relationship}</TableCell>
                                        <TableCell className="font-medium text-gray-900">
                                            <Button className=" hover:bg-red-100" variant={"outline"} onClick={() => deleteOwner(index)}>
                                                <X className="text-red-400" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )}

                            </>
                        )
            }</TableBody>
        </Table >
    )
}