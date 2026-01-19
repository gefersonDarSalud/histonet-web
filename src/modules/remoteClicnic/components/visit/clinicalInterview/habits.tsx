import { useState } from "react";
import { HousePlus, NotebookText } from "lucide-react";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SelectSearch } from "@/components/app/selectSearch";
import { CardCheckbox } from "@/components/app/cardCheckbox";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import type { IdName } from "#/core/entities";

type IdNameExtended = IdName & { description?: string };

interface PersonalHistoryProps {
    value?: IdNameExtended[];
    onChange: (value: IdNameExtended[]) => void;
    onBlur: () => void;
}

const habits: IdNameExtended[] = [
    { id: '1', name: 'Correr' },
    { id: '2', name: 'Nadar' },
    { id: '3', name: 'Futbol' },
    { id: '4', name: 'Fiesta' },
    { id: '5', name: 'Leer en la noche' },
];

export const Habits = ({ value = [], onChange, onBlur }: PersonalHistoryProps) => {
    const [open, setOpen] = useState(false);
    const safeValue = Array.isArray(value) ? value : [];

    const handleAdd = (item: IdNameExtended) => {
        if (safeValue.some(i => i.id === item.id)) return;
        onChange([...safeValue, { ...item, description: "" }]);
    };

    const handleRemove = (id: string) => {
        onChange(safeValue.filter(i => i.id !== id));
    };

    const handleDescriptionChange = (id: string, description: string) => {
        onChange(safeValue.map(i => i.id === id ? { ...i, description } : i));
    };

    return (
        <Card className="max-h-80 overflow-scroll">
            <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2 text-foreground">
                    <HousePlus />
                    Habitos Personales
                </CardTitle>
                <CardDescription>
                    Corre, Nadar, Leer en la noche, etc.
                </CardDescription>
                <CardAction>
                    <SelectSearch
                        placeholder="Buscar o seleccionar"
                        empty="No se encontraron Habitos"
                        list={habits}
                        open={{ set: setOpen, value: open }}
                        onSelect={handleAdd}
                        selectedValue={safeValue}
                    >
                        <Button type="button" variant="default">
                            Añadir
                        </Button>
                    </SelectSearch>
                </CardAction>
            </CardHeader>
            <CardContent className="space-y-4 px-40">
                {safeValue.map((habits) => (
                    <CardCheckbox
                        key={habits.id}
                        title={habits.name}
                        checked={true}
                        onCheckedChange={(checked) => {
                            if (!checked) handleRemove(habits.id);
                        }}
                    >
                        <InputGroup>
                            <InputGroupInput className="w-full"
                                placeholder="Ingrese detalle/observación"
                                value={habits.description || ""}
                                onChange={(e) => handleDescriptionChange(habits.id, e.target.value)}
                                onBlur={onBlur}
                            />
                            <InputGroupAddon>
                                <NotebookText />
                            </InputGroupAddon>
                        </InputGroup>
                    </CardCheckbox>
                ))}
            </CardContent>
        </Card>
    );
};