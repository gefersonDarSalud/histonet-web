import type { GroupTypeVisit } from "#/core/entities";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface PatientTypeProps {
    typeVisit: GroupTypeVisit[];
    value: GroupTypeVisit | null;
    onValueChange: (value: GroupTypeVisit) => void;
}


export const PatientType = ({ typeVisit, value, onValueChange }: PatientTypeProps) => {
    return (
        <Select
            value={value ?? ''}
            onValueChange={onValueChange as (value: string) => void}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecciona un paciente" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>tipo</SelectLabel>
                    {typeVisit.map((type, index) =>
                        <SelectItem key={index} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                        </SelectItem>
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
