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
import type { Business, IdName } from "#/core/entities"
import type { state } from "#/utils/types"

type IdNameOptionalId = {
    id?: string | number;
    name: string;
}

type RHFValue = IdName | IdNameOptionalId | null | undefined;

interface BusinessComboboxProps {
    listBusiness: Business[];
    value: RHFValue;
    onChange: (value: Business | null) => void;
    onBlur: () => void;
    disabled?: boolean;
    text?: state<string>;
    isLoading?: boolean;
}

export const BusinessCombobox = ({ listBusiness, value, onChange, disabled = false, text, onBlur }: BusinessComboboxProps) => {
    const [open, setOpen] = React.useState(false)

    const commandItemHandler = (currentBusiness: string) => {
        const selected = listBusiness.find(b => b.id.toString().toLowerCase() === currentBusiness.toLowerCase());
        if (selected) onChange(value && value.id === selected.id ? null : selected);
        else onChange(null);
        setOpen(false)
    }

    const displayValue = value ? value.name : "Seleciona una empresa...";

    return (
        <Popover
            open={open}
            onOpenChange={(newOpen) => {
                setOpen(newOpen);
                if (!newOpen) {
                    onBlur?.();
                }
            }}
        >
            <PopoverTrigger asChild >
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                    disabled={disabled}
                >
                    {displayValue}
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
                                    value={business.id.toString()}
                                    onSelect={commandItemHandler}
                                >
                                    {business.name}
                                    <Check className={cn("ml-auto", value && value.id === business.id ? "opacity-100" : "opacity-0")} />
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
