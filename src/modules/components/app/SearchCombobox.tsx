import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Check, ChevronsUpDown, Loader2 } from "lucide-react"
import { useLoading } from "../hooks/useLoading";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command";
import { cn } from "@/lib/utils"; 

interface SearchComboboxProps<T> {
    // Props inyectadas por FormController / React Hook Form
    value?: string;
    onChange?: (value: string) => void;
    onBlur?: () => void;
    name?: string;

    // Lógica de búsqueda
    queryKey: string;
    fetcher: (search: string) => Promise<T[]>;
    getOptionValue: (item: T) => string;
    getOptionLabel: (item: T) => string;

    // UI Props
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    renderItem?: (item: T) => React.ReactNode;
    className?: string;

    onSelect?: (item: T) => void
}

export const SearchCombobox = <T,>(props: SearchComboboxProps<T>) => {
    const {
        onSelect,
        value,
        onChange,
        onBlur,
        queryKey,
        fetcher,
        getOptionValue,
        getOptionLabel,
        placeholder = "Seleccionar opción...",
        searchPlaceholder = "Buscar...",
        emptyMessage = "No se encontraron resultados.",
        renderItem,
        className
    } = props;
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useLoading(searchTerm, 500);
    const { data, isLoading, isFetching } = useQuery({
        queryKey: [queryKey, debouncedSearch],
        queryFn: () => fetcher(debouncedSearch),
        enabled: debouncedSearch.length >= 3,
    });

    const [selectedLabel, setSelectedLabel] = useState("");

    const handleSelect = (item: T) => {
        const val = getOptionValue(item);
        const label = getOptionLabel(item);
        if (onSelect) onSelect(item)
        if (onChange) onChange(val);
        setSelectedLabel(label);
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
                    onBlur={onBlur}
                    className={cn("w-full justify-between font-normal", !value && "text-muted-foreground", className)}
                >
                    <span className="truncate">
                        {value ? (selectedLabel || value) : placeholder}
                    </span>
                    {isLoading || isFetching ? (
                        <Loader2 className="ml-2 h-4 w-4 animate-spin shrink-0 opacity-50" />
                    ) : (
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    )}
                </Button>
            </PopoverTrigger>

            <PopoverContent className="p-0 w-[--radix-popover-trigger-width]" align="start">
                <Command shouldFilter={false}>
                    <CommandInput
                        placeholder={searchPlaceholder}
                        value={searchTerm}
                        onValueChange={setSearchTerm}
                    />
                    <CommandList>
                        {isLoading && debouncedSearch.length >= 3 && (
                            <div className="p-4 text-sm text-center flex items-center justify-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Buscando...
                            </div>
                        )}

                        {!isLoading && debouncedSearch.length > 0 && debouncedSearch.length < 3 && (
                            <div className="p-4 text-sm text-muted-foreground text-center">
                                Escribe al menos 3 caracteres...
                            </div>
                        )}

                        <CommandEmpty>
                            {debouncedSearch.length >= 3 ? emptyMessage : "Comienza a escribir para buscar..."}
                        </CommandEmpty>

                        <CommandGroup>
                            {data?.map((item) => {
                                const itemValue = getOptionValue(item);
                                const isSelected = value === itemValue;

                                return (
                                    <CommandItem
                                        key={itemValue}
                                        value={itemValue}
                                        onSelect={() => handleSelect(item)}
                                        className="flex items-center justify-between"
                                    >
                                        <div className="flex-1">
                                            {renderItem ? renderItem(item) : getOptionLabel(item)}
                                        </div>
                                        {isSelected && <Check className="h-4 w-4 text-primary" />}
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}