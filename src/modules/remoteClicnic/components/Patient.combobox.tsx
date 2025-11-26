import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    // CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useCallback, useEffect, useState } from "react"
import type { PatientComboboxProps, PatientState, SelectOption } from "#/utils/types"
import type { Patient } from "#/core/entities"
import { useServices } from "#/hooks/useServices"

export const PatientCombobox = ({ patient, setPatient }: PatientComboboxProps) => {
    const { searchPatientsService } = useServices();
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [listPatients, setListPatients] = useState<SelectOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback(async (term: string) => {
        setIsLoading(true);
        try {
            const results: Patient[] = await searchPatientsService.execute(term);

            const mappedList: SelectOption[] = results.map(p => ({
                value: p.id,
                label: `${p.fullname} (${p.id})`,
                fullname: p.fullname,
                birthdate: p.birthdate,
            }));

            setListPatients(mappedList);
        }
        catch (error) {
            console.error("Error al buscar pacientes:", error);
            setListPatients([]);
        }
        finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchTerm.length >= 3 || searchTerm.length === 0) {
                fetchData(searchTerm);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, fetchData]);


    const handleSelect = (selectedPatient: SelectOption) => {
        setPatient({
            id: selectedPatient.value,
            fullname: selectedPatient.fullname,
            birthdate: selectedPatient.birthdate,
        } as PatientState);
        setOpen(false);
        setSearchTerm("");
    };

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between w-[400px]"
                >
                    {
                        patient.fullname ?? "Busca el paciente por nombre o cédula..."
                    }
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0">
                <Command>
                    <input
                        className="h-9 px-2 w-full focus:outline-none"
                        type="text"
                        placeholder="Busca al paciente por nombre..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                    <CommandList>
                        {isLoading ? (
                            <CommandGroup>
                                <CommandItem disabled>
                                    <span className="animate-pulse text-sm text-gray-500">
                                        Buscando en el servidor...
                                    </span>
                                </CommandItem>
                            </CommandGroup>
                        ) : (
                            <>
                                {listPatients.length === 0 && searchTerm.length > 0 && !isLoading ? (
                                    <CommandEmpty>No se encontraron pacientes.</CommandEmpty>
                                ) : (
                                    <CommandGroup>
                                        {listPatients.map((patientMap) => (
                                            <CommandItem
                                                key={patientMap.value}
                                                value={patientMap.label}
                                                onSelect={() => handleSelect(patientMap)}
                                            >
                                                {patientMap.label}
                                                <Check
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        patientMap.value === patient.id ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                )}
                            </>
                        )}
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}