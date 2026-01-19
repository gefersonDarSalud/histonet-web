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

type IdNameOptionalId = {
    id?: string | number;
    name: string;
}

type RHFValue = IdNameType | IdNameOptionalId | null | undefined;

type SelectProps = {
    list: IdNameType[];
    title: string;
    placeholder: string;
    value?: RHFValue;
    onChange?: (value: IdNameType | undefined | null) => void;
    onBlur?: () => void;
}


export const Select = (props: SelectProps) => {
    const handleValueChange = (stringId: string) => {
        if (!stringId) {
            props.onChange(null);
            return;
        }
        const selectedItem = props.list.find(item => item.id.toString() === stringId);
        props.onChange(selectedItem ?? null);
    }
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
