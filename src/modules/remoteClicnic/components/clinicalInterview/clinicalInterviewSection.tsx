import { FileUser } from "lucide-react";
import { FormController } from "@/components/app/FormController";
import { WysiwigEditor } from "@/components/app/wysiwyg";

export const ClinicalInterviewSection = () => {
    return (
        <section className='w-full mb-5'>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
                <FileUser />
                Entrevista Clínica
            </h2>

            <FormController
                as={WysiwigEditor}
                name="clinicalInterview"
                label="Motivo de consulta y descripción detallada"
                description="Mínimo 20 caracteres. Este campo es crucial."
                placeholder="Describa el motivo de la visita y la entrevista clínica..."
            />
        </section>
    );
}