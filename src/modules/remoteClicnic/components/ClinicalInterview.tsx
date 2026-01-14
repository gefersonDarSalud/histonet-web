// components/FormularioVisita.tsx

import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Componentes de shadcn/ui
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator'; // Sugiero añadir este componente
import { otherFamilyHistoryOptions, VisitSchema, type VisitFormValues } from '../validations/ClinicalInterview';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';
import { WysiwigEditor } from '@/components/app/wysiwyg';
import Editor from 'react-simple-wysiwyg';
import { Activity, FileUser } from 'lucide-react';
import { InputTag } from './inputTag';
import { InputTagBadge } from './inputTagBadge';
import { SelectSearch } from '@/components/app/selectSearch';
import { PersonalHistory } from './clinicalInterview/personalHistory';
import { ClinicalInterviewSection } from './clinicalInterview/clinicalInterviewSection';
import { ChiefComplaint } from './clinicalInterview/chiefComplaint';
import { FamilyHistory } from './clinicalInterview/familyHistory';


// --- Tipo para los elementos del Plan Médico (para el estado interno) ---
interface MedicalPlanItem {
    id: string; // Usar una ID única
    type: 'Medicamento' | 'Terapia' | 'Cita' | 'Estudio';
    detail: string;
}

// --- Componente de Formulario Principal ---

interface ClinicalInterviewProps {
    // Simulación de datos iniciales. Podrían venir de una API.
    defaultValues?: Partial<VisitFormValues>;
    patientName: string;
    visitNumber: string;
    onSubmit: (data: VisitFormValues) => void;
}

const defaultFormData: VisitFormValues = {
    clinicalInterview: "",
    chiefComplaint: "",
    familyHistory: [],
    otherFamilyHistory: null,
    personalHistory: ["Alergia a Penicilina", "Asma"],
    personalHistoryInput: null,
    habit: ["Ejercicio Regular"],
    habitDetails: null,
    bloodPressure: null,
    heartRate: null,
    temperature: null,
    weight: null,
    painScale: 3,
    observations: null,
    comments: null,
    medicalPlan: [],
};


export const ClinicalInterview: React.FC<ClinicalInterviewProps> = () => {

    const [newHistory, setNewHistory] = useState('');

    // Estado para el Plan Médico (a menudo es mejor manejar esta lista con su propia lógica)
    const [medicalPlan, setMedicalPlan] = useState<MedicalPlanItem[]>([]);

    const form = useForm<VisitFormValues>({
        resolver: zodResolver(VisitSchema),
        defaultValues: { ...defaultFormData },
        mode: 'onBlur', // Validar al perder el foco para un mejor DX
    });

    // Función para manejar el envío (se ejecuta solo si la validación Zod es exitosa)
    const handleFormSubmit = (data: VisitFormValues) => {
        const finalData = { ...data, MedicalPlan: medicalPlan.map(item => ({ type: item.type, detail: item.detail })) };
        // onSubmit(finalData);
    };

    // Función para añadir un antecedente personal al array de RHF
    const handleAddPersonalHistory = () => {
        if (newHistory.trim()) {
            const current = form.getValues('personalHistory') || [];
            const updated = [...current, newHistory.trim()];
            form.setValue('personalHistory', updated, { shouldDirty: true, shouldValidate: true });
            setNewHistory('');
        }
    };



    // Función de ejemplo para añadir un elemento al Plan Médico
    const handleAddMedicalPlan = () => {
        const newId = (Math.random() * 1000).toFixed(0);
        const newItem: MedicalPlanItem = {
            id: newId,
            type: 'Medicamento', // Valor por defecto
            detail: 'Nuevo elemento de plan médico',
        };
        setMedicalPlan(prev => [...prev, newItem]);
    };

    // Función de ejemplo para remover un elemento del Plan Médico
    const handleRemoveMedicalPlan = (id: string) => {
        setMedicalPlan(prev => prev.filter(item => item.id !== id));
    };

    return (
        // El tag <Form {...form}> ha sido reemplazado por un simple <div> o React.Fragment
        <div className="space-y-10">
            <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-10">

                {/* --- Contenedor Principal del Formulario --- */}
                <div className="bg-card p-6 rounded-lg border">
                    <div className="space-y-10">

                        {/* wysiwix */}
                        <div className='flex flex-col justify-between gap-3 '>
                            {/* <ClinicalInterviewSection form={form} /> */}
                            {/* <ChiefComplaint form={form} /> */}
                        </div>

                        <Separator className="my-8" />

                        {/* 3. Antecedentes (Grid) - Adaptación de Checkbox Group y Tags */}


                        {/* --- 3.1 Antecedentes Familiares (Checkbox Group) --- */}
                        <section className='grid grid-cols-2 gap-6 max-h-64 '>
                            <FamilyHistory form={form} />
                            {/* <PersonalHistory form={form} /> */}
                        </section>




                        <Separator className="my-8" />

                        {/* ========================================================================= */}
                        {/* 4. Hábitos (Adaptado a Controller + Field) */}
                        {/* ========================================================================= */}
                        <section>



                        </section>

                        <Separator className="my-8" />

                        {/* ========================================================================= */}
                        {/* 5. Exploración Física (Adaptado a Controller + Field) */}
                        {/* ========================================================================= */}
                        <section>
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
                                <span className="material-symbols-outlined text-primary">stethoscope</span> Exploración Física
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

                                {/* --- PA (bloodPressure) --- */}
                                <Controller
                                    name="bloodPressure"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={field.name}>Presión Arterial</FieldLabel>
                                            <div className="relative">
                                                <Input
                                                    id={field.name}
                                                    placeholder="120/80"
                                                    aria-invalid={fieldState.invalid}
                                                    {...field}
                                                    value={field.value ?? ''}
                                                />
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs text-muted-foreground pointer-events-none">mmHg</div>
                                            </div>
                                            {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />

                                {/* --- FC (heartRate) --- */}
                                <Controller
                                    name="heartRate"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={field.name}>Frec. Cardíaca</FieldLabel>
                                            <div className="relative">
                                                <Input
                                                    id={field.name}
                                                    type="number"
                                                    placeholder="75"
                                                    aria-invalid={fieldState.invalid}
                                                    {...field}
                                                    // Conversión a number para RHF/Zod o null si está vacío
                                                    onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value, 10) : null)}
                                                    value={field.value ?? ''}
                                                />
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs text-muted-foreground pointer-events-none">lpm</div>
                                            </div>
                                            {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />

                                {/* --- TEMP (temperature) --- */}
                                <Controller
                                    name="temperature"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={field.name}>Temperatura</FieldLabel>
                                            <div className="relative">
                                                <Input
                                                    id={field.name}
                                                    type="number"
                                                    step="0.1"
                                                    placeholder="36.5"
                                                    aria-invalid={fieldState.invalid}
                                                    {...field}
                                                    // Conversión a number para RHF/Zod o null si está vacío
                                                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                                                    value={field.value ?? ''}
                                                />
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs text-muted-foreground pointer-events-none">°C</div>
                                            </div>
                                            {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />

                                {/* --- PESO (weight) --- */}
                                <Controller
                                    name="weight"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={field.name}>Peso</FieldLabel>
                                            <div className="relative">
                                                <Input
                                                    id={field.name}
                                                    type="number"
                                                    placeholder="70"
                                                    aria-invalid={fieldState.invalid}
                                                    {...field}
                                                    // Conversión a number para RHF/Zod o null si está vacío
                                                    onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                                                    value={field.value ?? ''}
                                                />
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs text-muted-foreground pointer-events-none">kg</div>
                                            </div>
                                            {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                            </div>

                            {/* --- ESCALA DE DOLOR (RANGE INPUT) --- */}
                            <div className="mt-6">
                                <Controller
                                    name="painScale"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={field.name} className="block text-sm font-medium mb-2">
                                                Escala de Dolor (0-10): **{field.value}**
                                            </FieldLabel>
                                            <Input
                                                id={field.name}
                                                type="range"
                                                min="0"
                                                max="10"
                                                step="1"
                                                className="h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                                                aria-invalid={fieldState.invalid}
                                                {...field}
                                                // RHF: Convertimos a number para RHF, que es lo que espera Zod
                                                onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                                            />
                                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                                <span>0 - Sin dolor</span>
                                                <span>5 - Moderado</span>
                                                <span>10 - Peor dolor</span>
                                            </div>
                                            {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                            </div>
                        </section>

                        <Separator className="my-8" />

                        {/* ========================================================================= */}
                        {/* 6. Observaciones (Adaptado a Controller + Field) */}
                        {/* ========================================================================= */}
                        <section>
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
                                <span className="material-symbols-outlined text-primary">visibility</span> Observaciones Públicas y Privadas
                            </h2>
                            <div className="space-y-6">
                                {/* --- 6.1 Públicas (observations) --- */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="material-symbols-outlined text-muted-foreground">visibility</span>
                                        <h3 className="font-medium text-foreground">Observaciones Públicas</h3>
                                        <span className="text-xs text-muted-foreground">(Visibles para el paciente)</span>
                                    </div>
                                    <Controller
                                        name="observations"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <Textarea
                                                    id={field.name}
                                                    placeholder="Anotaciones que el paciente podrá ver en su portal..."
                                                    className="min-h-[100px]"
                                                    aria-invalid={fieldState.invalid}
                                                    {...field}
                                                />
                                                {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                            </Field>
                                        )}
                                    />
                                </div>

                                {/* --- 6.2 Privadas (comments) --- */}
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="material-symbols-outlined text-muted-foreground">visibility_off</span>
                                        <h3 className="font-medium text-foreground">Observaciones Privadas</h3>
                                        <span className="text-xs text-muted-foreground">(Solo para uso interno)</span>
                                    </div>
                                    <Controller
                                        name="comments"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <Textarea
                                                    id={field.name}
                                                    placeholder="Anotaciones internas, recordatorios, o información sensible..."
                                                    className="min-h-[100px]"
                                                    aria-invalid={fieldState.invalid}
                                                    {...field}
                                                />
                                                {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                            </Field>
                                        )}
                                    />
                                </div>
                            </div>
                        </section>

                        <Separator className="my-8" />

                        {/* ========================================================================= */}
                        {/* 7. Plan Médico (Sin cambios, sigue con estado local) */}
                        {/* ========================================================================= */}
                        <section>
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
                                <span className="material-symbols-outlined text-primary">list_alt</span> Plan Médico
                            </h2>
                            <div className="p-4 border rounded-lg space-y-4">
                                {medicalPlan.map((item) => (
                                    <div
                                        key={item.id}
                                        className="p-3 bg-muted rounded-md border flex items-center gap-4 hover:shadow-sm transition-shadow"
                                    >
                                        <span className="material-symbols-outlined text-muted-foreground cursor-grab">drag_indicator</span>
                                        <div className="flex-1">
                                            <p className="font-medium">{item.type}</p>
                                            <p className="text-sm text-muted-foreground">{item.detail}</p>
                                        </div>
                                        <Button type="button" variant="ghost" size="icon" className="size-8" aria-label={`Editar ${item.type}`}>
                                            <span className="material-symbols-outlined text-lg">edit</span>
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="size-8 text-destructive hover:text-destructive"
                                            onClick={() => handleRemoveMedicalPlan(item.id)}
                                            aria-label={`Eliminar ${item.type}`}
                                        >
                                            <span className="material-symbols-outlined text-lg">delete</span>
                                        </Button>
                                    </div>
                                ))}

                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full flex items-center justify-center gap-2 mt-2 border-dashed border-muted-foreground/50 text-muted-foreground hover:bg-muted"
                                    onClick={handleAddMedicalPlan}
                                >
                                    <span className="material-symbols-outlined text-lg">add</span>Añadir módulo al plan
                                </Button>
                            </div>
                        </section>

                    </div>

                    {/* --- Footer y Botones de Acción --- */}
                    <div className="mt-10 flex justify-end gap-3 border-t pt-6">
                        <Button type="button" variant="outline" onClick={() => form.reset()}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={form.formState.isSubmitting} className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">save</span>
                            {form.formState.isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );


};