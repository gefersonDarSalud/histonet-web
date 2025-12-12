import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";


// --- 7.2. Entrevista Clínica (Tab 2 - Nursing/Doctor Form) ---
const EntrevistaClinicaContent = ({ formData, setFormData, onSave }: {
    formData: NursingFormData;
    setFormData: React.Dispatch<React.SetStateAction<NursingFormData>>;
    onSave: () => void;
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { id, value } = e.target;

        // Handle biometrics nested state
        if (['pressure', 'heartRate', 'temperature', 'weight', 'notes'].includes(id)) {
            setFormData(prev => ({
                ...prev,
                biometrics: {
                    ...prev.biometrics,
                    [id]: value
                }
            }));
        } else {
            // Handle top-level state
            setFormData(prev => ({
                ...prev,
                [id]: value
            }));
        }
    };

    return (
        <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-xl border border-gray-200 dark:border-[#2d2d2d] shadow-sm">
            <div className="space-y-8">
                {/* Entrevista Clínica */}
                <FormSection title="Entrevista Clínica" iconName="Stethoscope">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                        <InputGroup
                            id="motiveOfConsultation"
                            label="Motivo de Consulta"
                            placeholder="Ej. Dolor de cabeza, fiebre..."
                            value={formData.motiveOfConsultation}
                            onChange={handleChange}
                        />
                        <SelectGroup
                            id="illnessType"
                            label="Tipo de Enfermedad"
                            options={['Aguda', 'Crónica', 'Infecciosa', 'Otra']}
                            value={formData.illnessType}
                            onChange={handleChange}
                        />
                    </div>
                </FormSection>

                {/* Enfermedad Actual */}
                <FormSection title="Enfermedad Actual" iconName="Stethoscope">
                    <TextareaGroup
                        id="currentIllnessDescription"
                        label="Descripción"
                        placeholder="Describa la condición actual del paciente..."
                        rows={4}
                        value={formData.currentIllnessDescription}
                        onChange={handleChange}
                    />
                </FormSection>

                {/* Antecedentes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormSection title="Antecedentes Familiares" iconName="Clock">
                        <TextareaGroup
                            id="familyHistory"
                            label="Descripción"
                            placeholder="Antecedentes médicos relevantes en la familia..."
                            rows={3}
                            value={formData.familyHistory}
                            onChange={handleChange}
                        />
                    </FormSection>
                    <FormSection title="Antecedentes Personales" iconName="Clock">
                        <TextareaGroup
                            id="personalHistory"
                            label="Descripción"
                            placeholder="Historial médico, alergias, cirugías previas..."
                            rows={3}
                            value={formData.personalHistory}
                            onChange={handleChange}
                        />
                    </FormSection>
                </div>

                {/* Exploración Física */}
                <FormSection title="Exploración Física" iconName="Stethoscope">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-4">
                        <InputGroup id="pressure" label="Presión Arterial" placeholder="ej. 120/80" value={formData.biometrics.pressure} onChange={handleChange} />
                        <InputGroup id="heartRate" label="Frec. Cardíaca" placeholder="ej. 75 lpm" value={formData.biometrics.heartRate} onChange={handleChange} />
                        <InputGroup id="temperature" label="Temperatura" placeholder="ej. 36.5°C" value={formData.biometrics.temperature} onChange={handleChange} />
                        <InputGroup id="weight" label="Peso" placeholder="ej. 70 kg" value={formData.biometrics.weight} onChange={handleChange} />
                    </div>
                    <div className="mt-4">
                        <TextareaGroup
                            id="notes"
                            label="Notas Adicionales"
                            placeholder="Detalles de la exploración física..."
                            rows={3}
                            value={formData.biometrics.notes}
                            onChange={handleChange}
                        />
                    </div>
                </FormSection>

                {/* Diagnóstico y Plan Médico */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormSection title="Diagnóstico" iconName="Clock">
                        <TextareaGroup
                            id="diagnosis"
                            label="Impresión Diagnóstica"
                            placeholder="Describa el diagnóstico principal y secundarios..."
                            rows={4}
                            value={formData.diagnosis}
                            onChange={handleChange}
                        />
                    </FormSection>
                    <FormSection title="Plan Médico" iconName="Stethoscope">
                        <TextareaGroup
                            id="medicalPlan"
                            label="Tratamiento y Recomendaciones"
                            placeholder="Medicamentos, terapias, estudios, próxima cita..."
                            rows={4}
                            value={formData.medicalPlan}
                            onChange={handleChange}
                        />
                    </FormSection>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-10 flex justify-end gap-3 border-t border-gray-200 dark:border-[#2d2d2d] pt-6">
                <Button variant="outline" onClick={() => console.log('Cancelado')} className="flex items-center gap-2">
                    <X /> Cancelar
                </Button>
                <Button variant="default" onClick={onSave} className="flex items-center gap-2 bg-primary hover:bg-gray-600 text-white">
                    <Save /> Guardar Cambios
                </Button>
            </div>
        </div>
    );
};

