import type { IdName } from "#/core/entities"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const listDepartaments: IdName[] = [
    { id: 1, name: "cobranza" },
    { id: 2, name: "sistemas" },
    { id: 3, name: "recursos humanos" },
    { id: 4, name: "pago a proveedores" },
    { id: 5, name: "contabilidad" },
    { id: 6, name: "operaciones" },
]

export const DepartamentsSelect = () => {
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Departamentos</SelectLabel>
                    {listDepartaments.map(departament =>
                        <SelectItem value={departament.id.toString()}>{departament.name}</SelectItem>
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
