import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import type { VisitFormValues } from "@/remoteClicnic/validations/ClinicalInterview";
import { Controller, type UseFormReturn } from "react-hook-form";

type props = {
    form: UseFormReturn<VisitFormValues>
}

const habitsOptions = [
    "Tabaquismo",
    "Alcoholismo",
    "Ejercicio Regular",
    "Dieta Balanceada",
] as const;

export const Habits = ({form}: props) => {
    return (
        <>
            <Controller
                name="habit" // Asumo que el nombre es 'habit'
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="space-y-4">
                        <div>
                            <FieldLabel className="text-base">Hábitos comunes</FieldLabel>
                            <FieldDescription>Marque los hábitos relevantes del paciente.</FieldDescription>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {habitsOptions.map((item) => (
                                <label
                                    key={item}
                                    className="flex flex-row items-center space-x-2 space-y-0 p-2 border rounded-full hover:bg-muted/50 cursor-pointer"
                                    htmlFor={`${field.name}-${item}`}
                                >
                                    <Checkbox
                                        id={`${field.name}-${item}`}
                                        checked={field.value?.includes(item)}
                                        onCheckedChange={(checked) => {
                                            const newValue = checked
                                                ? [...(field.value || []), item]
                                                : field.value?.filter((value) => value !== item);
                                            field.onChange(newValue);
                                        }}
                                    />
                                    <span className="text-sm font-normal cursor-pointer">
                                        {item}
                                    </span>
                                </label>
                            ))}
                        </div>
                        {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
            {/* Detalles Adicionales */}
            <Controller
                name="habitDetails" // Asumo que el nombre es 'habitDetails'
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="mt-4">
                        <FieldLabel htmlFor={field.name}>Detalles Adicionales</FieldLabel>
                        <Input
                            id={field.name}
                            placeholder="Ej. Fuma 10 cigarrillos al día, corre 3 veces por semana..."
                            aria-invalid={fieldState.invalid}
                            {...field}
                            value={field.value ?? ''}
                        />
                        {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
        </>

    )

}
