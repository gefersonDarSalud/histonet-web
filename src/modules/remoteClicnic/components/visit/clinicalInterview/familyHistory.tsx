import type { IdName } from "#/core/entities"
import { CardCheckbox } from "@/components/app/cardCheckbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Newspaper, NotebookText, Users } from "lucide-react"

const familiesList: IdName[] = [
    { id: '1', name: 'Padre' },
    { id: '2', name: 'Madre' },
    { id: '5', name: 'Abuelo' },
    { id: '6', name: 'Abuela' },
    { id: '7', name: 'Tío' },
    { id: '8', name: 'Tía' },
]

export const FamilyHistory = ({ value, onChange, onBlur }: any) => {
    const safeValue = Array.isArray(value) ? value : [];

    const handleToggle = (id: string, name: string, isChecked: boolean) => {
        if (isChecked) onChange([...safeValue, { id, name, description: "" }]);
        else onChange(safeValue.filter((item: any) => item.id !== id));

    };

    const handleDescriptionChange = (id: string, text: string) => {
        const updatedArray = safeValue.map((item: any) => item.id === id ? { ...item, description: text } : item);
        onChange(updatedArray);
    };

    return (
        <Card className="max-h-80 overflow-scroll">
            <CardHeader>
                <CardTitle className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground ">
                    <Users />
                    Antecedentes Familiares
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {familiesList.map((family) => {
                    const existingData = safeValue.find((item: any) => item.id === family.id);
                    const isChecked = !!existingData;

                    return (
                        <CardCheckbox
                            key={family.id}
                            title={family.name}
                            checked={isChecked}
                            onCheckedChange={(checked) => handleToggle(family.id, family.name, !!checked)}
                        >
                            <InputGroup>
                                <InputGroupInput
                                    className="w-full"
                                    placeholder={isChecked ? "Ingrese la patología" : "Marque para escribir"}
                                    value={existingData?.description || ""}
                                    onChange={(e) => handleDescriptionChange(family.id, e.target.value)}
                                    onBlur={onBlur}
                                    // Bloqueamos el input si no está seleccionado
                                    disabled={!isChecked}
                                />
                                <InputGroupAddon>
                                    <NotebookText className={isChecked ? "text-blue-500" : "text-muted-foreground"} />
                                </InputGroupAddon>
                            </InputGroup>
                        </CardCheckbox>
                    );
                })}
            </CardContent>
        </Card>
    )
}
