import type { IdName } from "#/core/entities"
import type { state } from "#/utils/types"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type props = {
    departaments: IdName[];
    selected: state<string | null>;
}

export const DepartamentsSelect = (param: props) => {
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Departamentos</SelectLabel>
                    {param.departaments.map(departament =>
                        <SelectItem value={departament.id.toString()}>{departament.name}</SelectItem>
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
