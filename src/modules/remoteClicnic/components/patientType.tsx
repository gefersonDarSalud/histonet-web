import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type patientType = {
    name: string
    value: string
}

type props = {
    patientsTypes: patientType[]
    id: string
}

export const PatientType = (props: props) => {
    const { patientsTypes } = props;
    return (
        <Select>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecciona un paciente" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Fruits</SelectLabel>
                    {patientsTypes.map((type, index) => <SelectItem key={index} value={type.value}>{type.name}</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
