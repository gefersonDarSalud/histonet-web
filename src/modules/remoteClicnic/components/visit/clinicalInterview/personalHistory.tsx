import { useState } from "react";
import { Newspaper, NotebookText, UserPen } from "lucide-react";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SelectSearch } from "@/components/app/selectSearch";
import { CardCheckbox } from "@/components/app/cardCheckbox";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import type { IdName } from "#/core/entities";

type IdNameExtended = IdName & { description?: string };

// Props que recibirá automáticamente desde FormController
interface PersonalHistoryProps {
    value?: IdNameExtended[];
    onChange: (value: IdNameExtended[]) => void;
    onBlur: () => void;
}

const antecedents: IdNameExtended[] = [
    { id: '1', name: 'Hipertensión' },
    { id: '2', name: 'Diabetes Tipo 2' },
    { id: '3', name: 'Tabaquismo' },
    { id: '4', name: 'Alcoholismo' },
    { id: '5', name: 'Sedentarismo' },
];

export const PersonalHistory = ({ value = [], onChange, onBlur }: PersonalHistoryProps) => {
    const [open, setOpen] = useState(false);
    const safeValue = Array.isArray(value) ? value : [];

    // Añadir desde el buscador
    const handleAdd = (item: IdNameExtended) => {
        if (safeValue.some(i => i.id === item.id)) return;
        onChange([...safeValue, { ...item, description: "" }]);
    };

    // Eliminar (al desmarcar el checkbox)
    const handleRemove = (id: string) => {
        onChange(safeValue.filter(i => i.id !== id));
    };

    // Actualizar descripción del input
    const handleDescriptionChange = (id: string, description: string) => {
        onChange(safeValue.map(i => i.id === id ? { ...i, description } : i));
    };

    return (
        <Card className="max-h-80 overflow-scroll">
            <CardHeader>
                <CardTitle className="text-xl font-semibold flex items-center gap-2 text-foreground">
                    <UserPen />
                    Antecedentes Personales
                </CardTitle>
                <CardDescription>
                    Patologías, Infecciones, Alergias, etc.
                </CardDescription>
                <CardAction>
                    <SelectSearch
                        placeholder="Buscar o seleccionar"
                        empty="No se encontraron antecedentes"
                        list={antecedents}
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
            <CardContent className="flex">
                {safeValue.map((antecedent) => (
                    <CardCheckbox
                        key={antecedent.id}
                        title={antecedent.name}
                        checked={true} // Si está en la lista, está marcado
                        onCheckedChange={(checked) => {
                            if (!checked) handleRemove(antecedent.id);
                        }}
                    >
                        <InputGroup>
                            <InputGroupInput
                                placeholder="Ingrese detalle/observación"
                                className="w-full"
                                value={antecedent.description || ""}
                                onChange={(e) => handleDescriptionChange(antecedent.id, e.target.value)}
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