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


type SelectProps = {
    list: IdName[];
    title: string;
    placeholder: string;
}

export const Select = (props: SelectProps) => {
    return (
        <SelectComponent>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{props.title}</SelectLabel>
                    {props.list.map(item => <SelectItem value={item.id.toString()}>{item.name}</SelectItem>)}
                </SelectGroup>
            </SelectContent>
        </SelectComponent>
    )
}
