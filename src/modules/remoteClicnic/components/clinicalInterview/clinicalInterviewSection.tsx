import { WysiwigEditor } from "@/components/app/wysiwyg";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import type { VisitFormValues } from "@/remoteClicnic/validations/ClinicalInterview";
import { FileUser } from "lucide-react";
import { Controller, type UseFormReturn } from "react-hook-form";

type props = {
    form: UseFormReturn<VisitFormValues>
}


export const ClinicalInterviewSection = ({ form }: props) => {
    return (
        <section className='w-full mb-5'>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
                <FileUser />
                Entrevista Clínica
            </h2>
            <Controller
                name="clinicalInterview"
                control={form.control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor={field.name}>Motivo de consulta y descripción detallada</FieldLabel>
                        <WysiwigEditor
                            id={field.name}
                            placeholder="Describa el motivo de la visita y la entrevista clínica..."
                            value={field.value}
                            onChange={field.onChange}
                            {...field}
                        />

                        <FieldDescription>
                            Mínimo 20 caracteres. Este campo es crucial.
                        </FieldDescription>
                        {fieldState.error && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />
        </section>
    );
}