import { Check } from "lucide-react"

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
import type { Patient } from "#/core/entities"
import type { state } from "#/utils/types"
import { useState } from "react"

interface props {
    list: Patient[];
    selected: state<string | null>;
    patient: Patient | null;
    disabled?: boolean;
    text: state<string>;
    isLoading?: boolean;
}
// selectedList.id === selected.value.id_patient ? "" : selectedList.id
export const AddRelationshipModalSearchPatient = ({ list, selected, disabled = false, text, patient }: props) => {
    console.log("patient", patient);
    console.log("selected", selected);

    const [open, setOpen] = useState(false);

    const commandItemHandler = (currentPatient: string) => {
        const selectedList = list.find(p => p.id.toLowerCase() === currentPatient.toLowerCase());
        console.log("selectedList: ", selectedList);
        if (selectedList) selected.set(selectedList.id === selected.value ? "" : selectedList.id);
        else selected.set(null);
        setOpen(false)
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild >
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="flex justify-center items-center"
                    disabled={disabled}
                >
                    {patient ? patient?.fullname : "Selecciona el paciente..."}
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
                            {list.map((patient) =>
                                <CommandItem
                                    key={`${patient.id}`}
                                    value={patient.id}
                                    onSelect={commandItemHandler}
                                >
                                    {patient.fullname}
                                    <Check className={cn("ml-auto", selected.value === patient.id ? "opacity-100" : "opacity-0")} />
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
