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
// Asumo que estas rutas son correctas
import { PatientRepositoryImpl } from "../../../infrastructure/PatientRepository.impl"
import { SearchPatientsService } from "../../../core/services/GetAllPatientservice"
import type { PatientEntity } from "#/core/entities/patient.entity"
import type { PatientComboboxProps, PatientState, SelectOption } from "./types/newCall.type"

// Inicialización de dependencias
const patientRepository = new PatientRepositoryImpl();
const searchPatientsService = new SearchPatientsService(patientRepository);

export const PatientCombobox = ({ patient, setPatient }: PatientComboboxProps) => {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [listPatients, setListPatients] = useState<SelectOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // ✅ Usamos useCallback para memoizar fetchData
    const fetchData = useCallback(async (term: string) => {
        setIsLoading(true);
        try {
            // 1. Obtener los resultados del servicio (que devuelve PatientEntity[])
            const results: PatientEntity[] = await searchPatientsService.execute(term);

            // 2. 🏆 CORRECCIÓN: Mapear resultados a SelectOption[] DENTRO del try
            const mappedList: SelectOption[] = results.map(p => ({
                // Asegúrate de que PatientEntity tiene .id y .fullname
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
    }, [searchPatientsService]); // Aseguramos que la dependencia esté correcta

    // ✅ useDebounce / useEffect para la búsqueda
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (searchTerm.length >= 3 || searchTerm.length === 0) {
                fetchData(searchTerm);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm, fetchData]); // ✅ Añadir fetchData a las dependencias

    // 🏆 CORRECCIÓN: Función handleSelect simplificada
    const handleSelect = (selectedPatient: SelectOption) => {
        // 2. 🏆 CORRECCIÓN: Llamar a setPatient con el objeto PatientState
        setPatient({
            id: selectedPatient.value,
            fullname: selectedPatient.fullname,
            birthdate: selectedPatient.birthdate,
        } as PatientState);
        setOpen(false); // Cierra el combobox
        setSearchTerm(""); // Opcional: limpiar la búsqueda al seleccionar
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
                        // Muestra el nombre completo del estado del padre
                        patient.fullname ?? "Busca el paciente por nombre o cédula..."
                    }
                    <ChevronsUpDown className="opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0">
                {/* // 3. 🏆 CORRECCIÓN: Deshabilitar el filtro de Command (si usas input simple) 
                  // Opcional: Si el input simple te da problemas, usa <Command filter={false as any}>
                */}
                <Command>
                    <input
                        className="h-9 px-2 w-full focus:outline-none" // ✅ Añadimos focus y w-full
                        type="text"
                        placeholder="Busca al paciente por nombre..."
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm} // ✅ Mantener el control del valor del input
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
                                                // El valor del CommandItem se usa para la navegación por teclado
                                                value={patientMap.label}
                                                // 🏆 CORRECCIÓN: Llamar a handleSelect con el objeto completo
                                                onSelect={() => handleSelect(patientMap)}
                                            >
                                                {patientMap.label}
                                                <Check
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        // Comparar contra el ID del objeto del estado del padre
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