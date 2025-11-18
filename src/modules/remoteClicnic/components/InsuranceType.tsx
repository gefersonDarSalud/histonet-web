import type { Business } from "#/core/entities";
import type { state } from "#/utils/types";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useMemo } from "react";

interface InsuranceTypeProps {
    list: Business[];
    className?: string;
    state: state<string | null>
}


export const InsuranceType = ({ list, state, className }: InsuranceTypeProps) => {
    const handleValueChange = (newValue: string) => {
        state.set(newValue === "" ? null : newValue);
    };

    const selectedInsurance = useMemo(() => {
        if (!state.value) return null; // Retorna null si no hay ID seleccionado

        // Busca el objeto completo Business usando el ID
        const selected = list.find(i => String(i.id) === String(state.value));
        return selected?.name || null;

    }, [list, state.value]);

    return (
        <Select
            value={selectedInsurance ?? ''}
            onValueChange={handleValueChange}
        >
            <SelectTrigger className={`${className} w-[180px]`}>
                <SelectValue placeholder="Selecciona una aseguradora">
                    {selectedInsurance}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Baremo</SelectLabel>
                    {list.map(insurance =>
                        <SelectItem key={insurance.id} value={String(insurance.id)}>
                            {insurance.name ? insurance.name.charAt(0).toUpperCase() + insurance.name.slice(1) : ''}
                        </SelectItem>
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
