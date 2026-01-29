import { useState } from "react";
import { HousePlus, NotebookText, Users } from "lucide-react";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SelectSearch } from "@/components/app/selectSearch";
import { CardCheckbox } from "@/components/app/cardCheckbox";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import type { IdName } from "#/core/entities";

type IdNameExtended = IdName & { description?: string };

interface props {
    value?: IdNameExtended[];
    onChange: (value: IdNameExtended[]) => void;
    onBlur: () => void;
}

const familiesList: IdName[] = [
    { id: '1', name: 'Padre' },
    { id: '2', name: 'Madre' },
    { id: '5', name: 'Abuelo' },
    { id: '6', name: 'Abuela' },
    { id: '7', name: 'Tío' },
    { id: '8', name: 'Tía' },
]

export const FamilyHistory = ({ value = [], onChange, onBlur }: props) => {
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
                    <Users />
                    Antecedentes Familiares
                </CardTitle>
                <CardDescription>
                    Patologías, Infecciones, Alergias, etc.
                </CardDescription>
                <CardAction>
                    <SelectSearch
                        placeholder="Buscar o seleccionar"
                        empty="No se encontraron Familiares"
                        list={familiesList}
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
            <CardContent className="space-y-4">
                {safeValue.map((family) => (
                    <CardCheckbox
                        key={family.id}
                        title={family.name}
                        checked={true}
                        onCheckedChange={(checked) => {
                            if (!checked) handleRemove(family.id);
                        }}
                    >
                        <InputGroup>
                            <InputGroupInput className="w-full"
                                placeholder="Ingrese detalle/observación"
                                value={family.description || ""}
                                onChange={(e) => handleDescriptionChange(family.id, e.target.value)}
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