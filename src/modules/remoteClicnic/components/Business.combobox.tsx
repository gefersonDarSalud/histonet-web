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

type business = {
    value: string
    label: string
}

type props = {
    listBusiness: business[];
}

export const BusinessCombobox = (props: props) => {
    const { listBusiness } = props
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? listBusiness.find((business) => business.value === value)?.label
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
                                    key={business.value}
                                    value={business.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {business.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === business.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
