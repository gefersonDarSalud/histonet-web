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

interface InsuranceTypeProps {
    list: Business[];
    className?: string;
    state: state<string | null>
    selectedInsurance: string;
}


export const InsuranceType = ({ list, state, selectedInsurance, className }: InsuranceTypeProps) => {
    const handleValueChange = (newValue: string) => {
        state.set(newValue === "" ? null : newValue);
    };

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
