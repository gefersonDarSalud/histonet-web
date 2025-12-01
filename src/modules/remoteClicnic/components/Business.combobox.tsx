import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
import type { Business } from "#/core/entities"
import type { state } from "#/utils/types"

interface BusinessComboboxProps {
    listBusiness: Business[];
    businessId: state<string | null>;
    businessObject?: Business | undefined;
    disabled?: boolean;
    text?: state<string>;
    isLoading?: boolean;
}

export const BusinessCombobox = ({ listBusiness, businessId, disabled = false, businessObject, text }: BusinessComboboxProps) => {
    const [open, setOpen] = React.useState(false)

    const commandItemHandler = (currentBusiness: string) => {
        const selected = listBusiness.find(b => b.id.toLowerCase() === currentBusiness.toLowerCase());
        if (selected) businessId.set(selected.id === businessId.value ? "" : selected.id);
        else businessId.set("");
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild >
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                    disabled={disabled}
                >
                    {businessObject
                        ? businessObject.name
                        : "Selecciona la empresa..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent >
                <Command>
                    {typeof text !== 'undefined'
                        ?
                        <input placeholder="Busca la empresa..." className="h-9" onChange={(e) => text.set(e.target.value)} />
                        :
                        <CommandInput placeholder="Busca la empresa..." className="h-9" />
                    }
                    <CommandList>
                        <CommandEmpty>No se encontraron empresas</CommandEmpty>
                        <CommandGroup>
                            {listBusiness.map((business) =>
                                <CommandItem
                                    key={`${business.id}`}
                                    value={business.id}
                                    onSelect={commandItemHandler}
                                >
                                    {business.name}
                                    <Check className={cn("ml-auto", businessId.value === business.id ? "opacity-100" : "opacity-0")} />
                                </CommandItem>
                            )
                            }
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
