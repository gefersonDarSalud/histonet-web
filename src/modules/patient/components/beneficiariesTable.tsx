
import { Loading } from "@/components/app/loading";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PatientRelationship } from "#/core/entities";
import type { UseFetchSetState } from "#/hooks/useFetch";

type TableData = {
    // 2. 'value' contiene el array de datos
    value: PatientRelationship[];
    // 3. 'set' usa el tipo exportado, con el tipo de dato PatientArray y Error
    set: UseFetchSetState<PatientRelationship[], Error>;
}

type props = {
    // La prop 'beneficiaries' es ahora el objeto que contiene 'value' y 'set'
    beneficiaries: TableData;
    isLoading: boolean;
    onDeleteBeneficiary: (beneficiary: PatientRelationship) => void;
}

export const BeneficiariesTable = ({ beneficiaries, isLoading, onDeleteBeneficiary }: props) => {

    const deleteBeneficiaries = (index: number) => {
        beneficiaries.set((prev) => {
            const newData = prev.data
                ? prev.data.filter((_, i) => i !== index)
                : [];

            return {
                ...prev,
                data: newData,
            };
        })
    }

    const handleClickDelete = (index: number, beneficiary: PatientRelationship) => {
        deleteBeneficiaries(index);
        onDeleteBeneficiary(beneficiary);
    }

    const hasBeneficiaries = beneficiaries.value.length > 0;

    return (
        <Table className="divide-y divide-gray-100" >
            <TableHeader >
                <TableRow className="hidden md:grid md:grid-cols-[0.5fr_2fr_1fr_0.5Fr] px-5">
                    <TableHead className="font-bold">Cedula</TableHead>
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
                    : !hasBeneficiaries ?
                        <TableRow>
                            <TableCell className="p-6 text-center text-gray-500" colSpan={3} align='center'>
                                No se encontraron pacientes para el filtro actual.
                            </TableCell>
                        </TableRow>
                        :
                        beneficiaries.value.map((beneficiary, index) =>
                            <TableRow className="grid grid-cols-5 border-b border-gray-100 transition-colors items-center text-sm md:grid-cols-[0.5fr_2fr_1fr_0.5Fr] min-h-[60px] px-5"
                                key={index}
                            >
                                <TableCell className="hidden md:block text-gray-600">{beneficiary.patient_code}</TableCell>
                                <TableCell className="text-center font-medium text-gray-900 ">{beneficiary.fullname}</TableCell>
                                <TableCell className="font-medium text-gray-900">{beneficiary.relationship}</TableCell>
                                <TableCell className="font-medium text-gray-900">
                                    <Button className=" hover:bg-red-100" variant={"outline"} onClick={() => handleClickDelete(index, beneficiary)}>
                                        <X className="text-red-400" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
            }</TableBody>
        </Table>
    )
}