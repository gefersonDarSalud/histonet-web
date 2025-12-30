import { WysiwigEditor } from "@/components/app/wysiwyg";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import type { VisitFormValues } from "@/remoteClicnic/validations/ClinicalInterview";
import { Activity } from "lucide-react";
import { Controller, type UseFormReturn } from "react-hook-form";

type props = {
    form: UseFormReturn<VisitFormValues>
}

export const ChiefComplaint = ({ form }: props) => {
    return (
        <section className='w-full mb-5'>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
                <Activity />
                Enfermedad Actual
            </h2>
            <Controller
                name="chiefComplaint"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Cronología, evolución de los síntomas</FieldLabel>
                        <WysiwigEditor
                            id={field.name}
                            placeholder="Detalle la cronología y evolución de los síntomas..."
                            value={field.value}
                            onChange={field.onChange}
                            {...field}
                        />
                        {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
        </section>
    );
} 