import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import type { IdName } from "#/core/entities"
import type { state } from "#/utils/types" // Mantengo 'state' si lo usas en otros sitios, pero aquí solo necesitamos 'open'

type props = {
    list: IdName[];
    children: React.ReactNode;
    placeholder?: string;
    empty?: string;
    // Control del Popover
    open: state<boolean>;
    // Función de callback al seleccionar un item
    onSelect: (item: IdName) => void;
    // Lista de valores que ya están seleccionados (para mostrar el Check)
    selectedValue: string[];
}


export const SelectSearch = ({
    children,
    placeholder,
    empty,
    list,
    open,
    onSelect,
    selectedValue
}: props) => {
    return (
        <Popover open={open.value} onOpenChange={open.set}>
            <PopoverTrigger className="float float-right" asChild>
                {children}
            </PopoverTrigger>
            <PopoverContent className="" sideOffset={10}>
                <Command>
                    <CommandInput placeholder={placeholder ?? 'Buscar antecedente...'} className="h-9" />
                    <CommandList>
                        <CommandEmpty>{empty ?? "No hay items en la lista"}</CommandEmpty>
                        <CommandGroup>
                            {list.map(item => {
                                // Comprobar si el item ya está seleccionado
                                const isSelected = selectedValue.includes(item.name);

                                return (
                                    <CommandItem
                                        key={item.id}
                                        value={item.name}
                                        onSelect={() => {
                                            onSelect(item); // Llama al callback con el item
                                            open.set(false); // Cierra el popover
                                        }}
                                    >
                                        {item.name}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                isSelected ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}