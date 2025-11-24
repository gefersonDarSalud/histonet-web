import type { FeeSchedule } from "#/core/entities";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface FeeScheduleTypeProps {
    feeSchedules: FeeSchedule[];
    className?: string;
}


export const FeeScheduleType = ({ feeSchedules, className }: FeeScheduleTypeProps) => {
    return (
        <Select>
            <SelectTrigger className={`${className} w-[180px]`}>
                <SelectValue placeholder="Selecciona un paciente" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Baremo</SelectLabel>
                    {feeSchedules.map((feeSchedule, index) =>
                        <SelectItem key={index} value={String(feeSchedule.id)}>
                            {feeSchedule.name.charAt(0).toUpperCase() + feeSchedule.name.slice(1)}
                        </SelectItem>
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
