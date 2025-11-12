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
import type { Business } from "#/core/entities/Business"

interface BusinessComboboxProps {
    listBusiness: Business[];
    selectedBusinessId: string | null;
    onValueChange: (value: string) => void;
    disabled?: boolean;
}

export const BusinessCombobox = ({ listBusiness, selectedBusinessId, onValueChange, disabled = false }: BusinessComboboxProps) => {
    const selectedBusiness = listBusiness.find((business) => business.id === selectedBusinessId)
    const [open, setOpen] = React.useState(false)

    const commandItemHandler = (currentBusiness: string) => {
        const selected = listBusiness.find(b => b.name.toLowerCase() === currentBusiness.toLowerCase());
        if (selected) onValueChange(selected.id === selectedBusinessId ? "" : selected.id);
        else onValueChange("");
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                    disabled={disabled}
                >
                    {selectedBusiness
                        ? selectedBusiness.name
                        : "Selecciona la empresa..."}
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Busca la empresa..." className="h-9" />
                    <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                            {listBusiness.map((business) => (
                                <CommandItem
                                    key={business.id}
                                    value={business.id}
                                    onSelect={commandItemHandler}
                                >
                                    {business.name}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            selectedBusinessId === business.id ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
            {selectedBusiness && selectedBusiness.insurance &&
                <>
                    <div className="text-muted-foreground text-sm space-y-1 px-3 mt-1">
                        {selectedBusiness.insurance?.name}
                    </div>
                </>
            }
        </Popover>
    )
}
