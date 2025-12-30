import { Field, FieldError, } from "@/components/ui/field";
import type { VisitFormValues } from "@/remoteClicnic/validations/ClinicalInterview";
import { Controller, type UseFormReturn } from "react-hook-form";
import { InputTagBadge } from "../inputTagBadge";
import { SelectSearch } from "@/components/app/selectSearch";
import type { IdName } from "#/core/entities";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Newspaper } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type props = {
    form: UseFormReturn<VisitFormValues>
}

const antecedents: IdName[] = [
    { id: '1', name: 'Hipertensión' },
    { id: '2', name: 'Diabetes Tipo 2' },
    { id: '3', name: 'Tabaquismo' },
    { id: '4', name: 'Alcoholismo' },
    { id: '5', name: 'Sedentarismo' },
];

export const PersonalHistory = ({ form }: props) => {
    const [open, setOpen] = useState(false);
    const currentPersonalHistory = form.watch('personalHistory') || [];

    const handleRemovePersonalHistory = (history: string) => {
        const current = form.getValues('personalHistory') || [];
        const updated = current.filter(a => a !== history);
        form.setValue('personalHistory', updated, { shouldDirty: true, shouldValidate: true });
    };

    const handleAddPersonalHistory = ({ name }: IdName) => {
        if (currentPersonalHistory.includes(name)) {
            console.warn(`El antecedente '${name}' ya está incluido.`);
            return;
        }
        const updatedHistory = [...currentPersonalHistory, name];
        form.setValue('personalHistory', updatedHistory, { shouldDirty: true, shouldValidate: true });
    };

    return (
        <section>
            <Card>
                <CardHeader>
                    <CardTitle className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground ">
                        <Newspaper />
                        Antecedentes Personales
                    </CardTitle>
                    <CardDescription className="text-base">Condiciones y hábitos</CardDescription>
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
                                            antecedent={antecedent}
                                            handlerOnClick={handleRemovePersonalHistory}
                                        />
                                    )}
                                </div>
                                <div className="flex gap-2">

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