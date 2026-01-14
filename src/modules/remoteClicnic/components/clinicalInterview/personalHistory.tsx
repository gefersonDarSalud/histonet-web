import { Field, FieldError, } from "@/components/ui/field";
import type { VisitFormValues } from "@/remoteClicnic/validations/ClinicalInterview";
import { Controller, type UseFormReturn } from "react-hook-form";
import { InputTagBadge } from "../inputTagBadge";
import { SelectSearch } from "@/components/app/selectSearch";
import type { IdName } from "#/core/entities";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Newspaper } from "lucide-react";
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type props = {
    form: UseFormReturn<VisitFormValues>
}

type IdNameExtended = IdName & { description?: string };


const antecedents: IdNameExtended[] = [
    { id: '1', name: 'Hipertensión', description: 'Presión arterial alta' },
    { id: '2', name: 'Diabetes Tipo 2', description: 'Insulina alta' },
    { id: '3', name: 'Tabaquismo', description: 'Fumador' },
    { id: '4', name: 'Alcoholismo', description: 'Bebe' },
    { id: '5', name: 'Sedentarismo', description: 'No hace ejercicio' },
];

export const PersonalHistory = ({ form }: props) => {
    const [open, setOpen] = useState(false);
    const currentPersonalHistory = form.watch('personalHistory') || [];

    const handleRemovePersonalHistory = (IdHistory: string) => {
        const current = form.getValues('personalHistory') || [];
        const updated = current.filter(a => a.id !== IdHistory);
        form.setValue('personalHistory', updated, { shouldDirty: true, shouldValidate: true });
    };

    const handleAddPersonalHistory = (a: IdNameExtended) => {
        if (currentPersonalHistory.some(current => current.id === a.id)) {
            console.warn(`El antecedente '${a.name}' ya está incluido.`);
            return;
        }
        form.setValue('personalHistory', [...currentPersonalHistory, a], { shouldDirty: true, shouldValidate: true });
    };

    return (
        <section>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold flex items-center gap-2 text-foreground ">
                        <Newspaper />
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
                            onSelect={handleAddPersonalHistory}
                            selectedValue={currentPersonalHistory}
                        >
                            <Button type="button"
                                variant="default">
                                Añadir
                            </Button>
                        </SelectSearch>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <Controller
                        name="personalHistory"
                        control={form.control}
                        render={({ fieldState }) => (
                            <Field data-invalid={fieldState.invalid} className="space-y-4">
                                <div className='flex flex-wrap gap-2 min-h-8'>
                                    {currentPersonalHistory.map(antecedent =>
                                        <InputTagBadge
                                            antecedent={antecedent.name}
                                            handlerOnClick={handleRemovePersonalHistory}
                                        />
                                    )}
                                </div>
                                <div className="flex gap-2">



                                </div>

                                {fieldState.error && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </CardContent>
            </Card>
        </section>
    );
} 