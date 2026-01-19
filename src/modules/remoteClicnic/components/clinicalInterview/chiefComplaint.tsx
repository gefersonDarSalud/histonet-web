import { FormController } from "@/components/app/FormController";
import { WysiwigEditor } from "@/components/app/wysiwyg";
import { Activity } from "lucide-react";

export const ChiefComplaint = () => {
    return (
        <section className='w-full mb-5'>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
                <Activity />
                Enfermedad Actual
            </h2>

            <FormController
                as={WysiwigEditor}
                name="chiefComplaint"
                label="Detalle la cronología y evolución de los síntomas..."
                description="Mínimo 20 caracteres. Este campo es crucial."
            />

        </section>
    );
} 