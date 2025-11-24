import type { FeeSchedule } from "#/core/entities";
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
    list: {
        id?: string;
        name?: string;
        code?: string;
        feeSchedules?: FeeSchedule[];
    }[];
    className?: string;
    state: state<string | null>
    selectedInsurance: string;
    selfBusiness: {
        id: string;
        name: string;
    }
}


export const InsuranceType = ({ list, state, selectedInsurance, className, selfBusiness }: InsuranceTypeProps) => {
    const handleValueChange = (newValue: string) => {
        state.set(newValue === "" ? null : newValue);
    };

    return (
        <Select
            value={selectedInsurance}
            onValueChange={handleValueChange}
        >
            <SelectTrigger className={`${className} w-[180px]`}>
                <SelectValue placeholder="No ha seleccionado una aseguradora">
                    {selectedInsurance}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Aseguradora</SelectLabel>
                    {list.map((insurance, index) => {
                        console.log(insurance);

                        return (<SelectItem key={index} value={String(insurance.id) ? String(insurance.id) : ''}>
                            {insurance.name ? insurance.name.charAt(0).toUpperCase() + insurance.name.slice(1) : selfBusiness.name}
                        </SelectItem>)
                    })}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
