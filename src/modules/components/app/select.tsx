import type { IdName } from "#/core/entities"
import {
    Select as SelectComponent,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


// 🚨 TIPO AUXILIAR: Para asegurar que IdName tiene 'id' y 'name'
// Asumo que IdName es { id: string | number, name: string } según tu entidad.
type IdNameType = IdName;


type SelectProps = {
    list: IdNameType[];
    title: string;
    placeholder: string;

    // 🚨 1. ACEPTAR EL VALOR ACTUAL (OBJETO COMPLETO O UNDEFINED/NULL)
    value: IdNameType | undefined | null;

    // 🚨 2. ACEPTAR EL SETTER DE RHF (DEBE REPORTAR EL OBJETO COMPLETO O UNDEFINED)
    onChange: (value: IdNameType | undefined | null) => void;
    onBlur: () => void;
}


export const Select = (props: SelectProps) => {
    const handleValueChange = (stringId: string) => {
        if (!stringId) {
            // Manejar deselección (si es aplicable, aunque Select suele requerir selección)
            props.onChange(null);
            return;
        }

        // 🚨 PASO CLAVE: Buscar el objeto completo que corresponde al ID string
        const selectedItem = props.list.find(item => item.id.toString() === stringId);

        // 🚨 Reportar el objeto completo a React Hook Form
        props.onChange(selectedItem ?? null);
    }

    // El Select de shadcn/ui (Radix) necesita un valor de string para la prop `value`.
    // Usamos el ID del objeto completo que recibimos de RHF.
    const displayIdString = props.value ? props.value.id.toString() : '';


    return (
        <SelectComponent
            value={displayIdString}
            onValueChange={handleValueChange}
            onOpenChange={open => { if (!open) props.onBlur(); }}
        >
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={props.placeholder} >
                    {props.value ? props.value.name : props.placeholder}
                </SelectValue>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{props.title}</SelectLabel>
                    {props.list.map(item =>
                        <SelectItem key={item.id} value={item.id.toString()}>
                            {item.name}
                        </SelectItem>)
                    }
                </SelectGroup>
            </SelectContent>
        </SelectComponent>
    )
}
