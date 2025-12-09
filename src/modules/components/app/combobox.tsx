// src/components/ui/agnosticCombobox.tsx (o donde lo vayas a guardar)

import * as React from "react"
import { Check, ChevronsUpDown, X } from "lucide-react" // Agregamos X para desechar ítems

import { cn } from "@/lib/utils" // Utilidad para Tailwind CSS (de shadcn/ui)
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

// Tipos requeridos (asume que los importas desde tus rutas correctas)
import type { state } from "#/utils/types" // state<string> = [string, Dispatch<SetStateAction<string>>]
import type { UseFetchSetState } from "@/components/hooks/useFetch" // Tipo del setter para listas de useFetch

// --- TIPOS AGNOSTICOS AJUSTADOS ---

// El tipo genérico T debe tener al menos estas propiedades para que el ComboBox funcione.
interface SelectableItem {
    id: string;
    name: string;
    // Agrega aquí cualquier otra propiedad que tu objeto T pueda tener
}

/**
 * 1. Estructura de datos para la lista de resultados de búsqueda (list).
 * @template T El tipo de los elementos en el array (debe extender SelectableItem).
 */
type data<T extends SelectableItem> = {
    // 'value' contiene el array de datos
    value: T[];
    // 'set' es el setter para actualizar la lista de resultados (UseFetchSetState<T[], Error>)
    // Asumimos que la lista se recarga con un array de T.
    set: UseFetchSetState<T[], Error>;
}

/**
 * 2. Propiedades del componente Combobox.
 * @template T El tipo del elemento en la lista (debe extender SelectableItem).
 */
interface props<T extends SelectableItem> {
    list: data<T>;
    // 'selected' ahora es un array de ítems seleccionados (ej: Business[])
    selected: T[];
    // Función para actualizar el array de ítems seleccionados
    setSelected: React.Dispatch<React.SetStateAction<T[]>>;
    disabled?: boolean;
    placeholder?: string;
    // 'text' es el estado [value, setter] para el input de búsqueda (opcional)
    // Si se provee, usamos un <input> simple para búsqueda externa. Si no, usamos <CommandInput> para búsqueda interna.
    text?: state<string>;
}

// --- FIN TIPOS AGNOSTICOS AJUSTADOS ---

export const Combobox = <T extends SelectableItem>({
    list,
    selected,
    setSelected,
    disabled = false,
    placeholder = "Selecciona...",
    text: textState,
}: React.PropsWithChildren<props<T>>): React.ReactElement => { // Usamos React.ReactElement para tipado
    const [open, setOpen] = React.useState(false);

    // Desestructuramos textState si existe, si no, serán undefined
    const [searchTerm, setSearchTerm] = textState || [undefined, undefined];

    const isExternalSearch = typeof textState !== 'undefined';

    // Determina el texto a mostrar en el botón
    const buttonText = selected.length > 0
        ? `${selected.length} seleccionados`
        : placeholder;

    // --- LÓGICA DE SELECCIÓN MÚLTIPLE ---
    const commandItemHandler = (currentId: string) => {
        // Buscar el objeto completo en la lista usando el ID que viene del CommandItem
        const itemToToggle = list.value.find(item => item.id.toLowerCase() === currentId.toLowerCase());

        if (!itemToToggle) return; // No hacer nada si no se encuentra el ítem

        setSelected(prevSelected => {
            const isAlreadySelected = prevSelected.some(item => item.id === itemToToggle.id);

            if (isAlreadySelected) {
                // Deseleccionar: filtrar el ítem
                return prevSelected.filter(item => item.id !== itemToToggle.id);
            } else {
                // Seleccionar: agregar el nuevo ítem
                return [...prevSelected, itemToToggle];
            }
        });

        // Solo cerrar el Popover si no se está usando un mecanismo de búsqueda externo
        if (!isExternalSearch) {
            setOpen(false);
        }
    }

    // Función para eliminar un ítem directamente desde el botón/tag
    const handleRemoveTag = (e: React.MouseEvent, itemId: string) => {
        e.stopPropagation(); // Evitar que el clic abra el Popover
        setSelected(prevSelected => prevSelected.filter(item => item.id !== itemId));
    };

    // --- RENDERIZADO ---
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild >
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    // Ajustamos el width para que sea flexible o fijo según tu necesidad
                    className="w-full min-w-[200px] justify-between h-auto min-h-10 p-2"
                    disabled={disabled}
                >
                    <div className="flex flex-wrap gap-1 items-center">
                        {selected.length > 0 ? (
                            // Mostrar ítems seleccionados como "tags"
                            selected.map(item => (
                                <span
                                    key={item.id}
                                    className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700 hover:bg-gray-200"
                                    onClick={(e) => handleRemoveTag(e, item.id)}
                                >
                                    {item.name}
                                    <X className="ml-1 h-3 w-3 text-gray-400 hover:text-gray-900" />
                                </span>
                            ))
                        ) : (
                            // Mostrar Placeholder si no hay nada seleccionado
                            <span className="text-sm text-gray-500">{placeholder}</span>
                        )}
                    </div>
                    <ChevronsUpDown className={`h-4 w-4 shrink-0 opacity-50 ml-2 ${selected.length > 0 ? 'self-start mt-1' : ''}`} />
                </Button>
            </PopoverTrigger>

            <PopoverContent className="p-0 w-[var(--radix-popover-trigger-width)]" align="start">
                <Command>
                    {/* Búsqueda Externa (Controlada por el padre) */}
                    {isExternalSearch && setSearchTerm ? (
                        <div className="p-1">
                            <input
                                placeholder="Busca..."
                                className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    ) : (
                        // Búsqueda Interna (Controlada por CommandInput)
                        <CommandInput placeholder={`Buscar en ${placeholder.toLowerCase()}...`} className="h-9" />
                    )}

                    <CommandList>
                        <CommandEmpty>No se encontraron resultados</CommandEmpty>
                        <CommandGroup>
                            {list.value.map((item) => {
                                const isSelected = selected.some(s => s.id === item.id);
                                return (
                                    <CommandItem
                                        key={item.id}
                                        // Usamos el ID del ítem para que Command sepa qué valor seleccionar
                                        value={item.id}
                                        onSelect={commandItemHandler}
                                    >
                                        {item.name}
                                        <Check
                                            className={cn(
                                                "ml-auto h-4 w-4",
                                                isSelected ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
