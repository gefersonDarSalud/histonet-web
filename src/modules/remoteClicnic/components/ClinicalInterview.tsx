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
import { habitsOptions, otherFamilyHistoryOptions, VisitSchema, type VisitFormValues } from '../validations/ClinicalInterview';
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field';


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
    // Estado para manejar el campo temporal de "Añadir antecedente"
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

    // Función para remover un antecedente personal
    const handleRemovePersonalHistory = (history: string) => {
        const current = form.getValues('personalHistory') || [];
        const updated = current.filter(a => a !== history);
        form.setValue('personalHistory', updated, { shouldDirty: true, shouldValidate: true });
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

                        <div className='flex  justify-between gap-3 '>

                            {/* ========================================================================= */}
                            {/* 1. Entrevista Clínica (Adaptado a Controller + Field) */}
                            {/* ========================================================================= */}
                            <section className='w-full'>
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
                                    <span className="material-symbols-outlined text-primary">forum</span> Entrevista Clínica
                                </h2>
                                <Controller
                                    name="clinicalInterview"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={field.name}>Motivo de consulta y descripción detallada</FieldLabel>
                                            <Textarea
                                                id={field.name}
                                                placeholder="Describa el motivo de la visita y la entrevista clínica..."
                                                className="min-h-[120px]"
                                                aria-invalid={fieldState.invalid}
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
                            {/* <Separator orientation='vertical' className='mx-5' /> */}

                            {/* ========================================================================= */}
                            {/* 2. Enfermedad Actual (Adaptado a Controller + Field) */}
                            {/* ========================================================================= */}
                            <section className='w-full'>
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
                                    <span className="material-symbols-outlined text-primary">history</span> Enfermedad Actual
                                </h2>
                                <Controller
                                    name="chiefComplaint"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor={field.name}>Cronología, evolución de los síntomas</FieldLabel>
                                            <Textarea
                                                id={field.name}
                                                placeholder="Detalle la cronología y evolución de los síntomas..."
                                                className="min-h-[120px]"
                                                aria-invalid={fieldState.invalid}
                                                {...field}
                                            />
                                            {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                            </section>
                        </div>

                        <Separator className="my-8" />

                        {/* ========================================================================= */}
                        {/* 3. Antecedentes (Grid) - Adaptación de Checkbox Group y Tags */}
                        {/* ========================================================================= */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                            {/* --- 3.1 Antecedentes Familiares (Checkbox Group) --- */}
                            <section>
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
                                    <span className="material-symbols-outlined text-primary">family_restroom</span> Antecedentes Familiares
                                </h2>

                                {/* Controllador para el grupo de Checkboxes */}
                                <Controller
                                    name="familyHistory"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid} className="space-y-4">
                                            <div>
                                                <FieldLabel className="text-base">Condiciones comunes</FieldLabel>
                                                <FieldDescription>Seleccione las condiciones relevantes.</FieldDescription>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {otherFamilyHistoryOptions.map((item) => (
                                                    <label
                                                        key={item}
                                                        className="flex flex-row items-center space-x-2 space-y-0 p-2 border rounded-full hover:bg-muted/50 cursor-pointer"
                                                        htmlFor={`${field.name}-${item}`} // Enlazamos label con input
                                                    >
                                                        <Checkbox
                                                            id={`${field.name}-${item}`}
                                                            checked={field.value?.includes(item)}
                                                            onCheckedChange={(checked) => {
                                                                // Lógica de RHF para manejar arrays con Checkboxes
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

                                {/* Campo para Otros/Notas (Input simple) */}
                                <Controller
                                    name="otherFamilyHistory"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid} className="mt-4">
                                            <FieldLabel htmlFor={field.name}>Otros / Notas</FieldLabel>
                                            <Input
                                                id={field.name}
                                                placeholder="Añadir otra condición..."
                                                aria-invalid={fieldState.invalid}
                                                {...field}
                                                // Convertir null a string vacío para el input
                                                value={field.value ?? ''}
                                            />
                                            {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                            </section>

                            {/* --- 3.2 Antecedentes Personales (Tag Input - Sigue con estado local para la adición) --- */}
                            <section>
                                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
                                    <span className="material-symbols-outlined text-primary">person</span> Antecedentes Personales
                                </h2>

                                {/* Controller sólo para mostrar errores y la etiqueta asociada al campo (personalHistory) */}
                                <Controller
                                    name="personalHistory"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid} className="space-y-4">
                                            <FieldLabel className="text-base">Condiciones y hábitos</FieldLabel>
                                            <FieldDescription>Antecedentes personales (alergias, cirugías, etc.).</FieldDescription>

                                            {/* Visualización de Tags/Chips (usando form.watch) */}
                                            <div className="flex flex-wrap gap-2 min-h-8">
                                                {form.watch('personalHistory')?.map((antecedente) => (
                                                    <div
                                                        key={antecedente}
                                                        className="inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium bg-secondary text-secondary-foreground"
                                                    >
                                                        {antecedente}
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            className="size-4 p-0 rounded-full hover:bg-secondary/70 text-secondary-foreground/70 hover:text-secondary-foreground"
                                                            onClick={() => handleRemovePersonalHistory(antecedente)}
                                                            aria-label={`Eliminar antecedente ${antecedente}`}
                                                        >
                                                            <span className="material-symbols-outlined text-sm">close</span>
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* Input para añadir (Añadido con estado local) */}
                                            <FieldLabel htmlFor="antecedentes-personales-input">Añadir antecedente</FieldLabel>
                                            <div className="flex gap-2">
                                                <Input
                                                    id="antecedentes-personales-input"
                                                    placeholder="Ej. Tabaquismo, cirugía previa..."
                                                    value={newHistory}
                                                    onChange={(e) => setNewHistory(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            e.preventDefault();
                                                            handleAddPersonalHistory();
                                                        }
                                                    }}
                                                />
                                                <Button type="button" onClick={handleAddPersonalHistory} disabled={!newHistory.trim()} variant="secondary">
                                                    Añadir
                                                </Button>
                                            </div>

                                            {/* Mostramos el error del array completo */}
                                            {fieldState.error && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                            </section>
                        </div>

                        <Separator className="my-8" />

                        {/* ========================================================================= */}
                        {/* 4. Hábitos (Adaptado a Controller + Field) */}
                        {/* ========================================================================= */}
                        <section>
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
                                <span className="material-symbols-outlined text-primary">directions_run</span> Hábitos
                            </h2>
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