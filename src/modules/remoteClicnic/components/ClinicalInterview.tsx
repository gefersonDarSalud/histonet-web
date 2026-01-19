import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Schema, type VisitFormValues } from '../validations/ClinicalInterview';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { FormController } from '@/components/app/FormController';
import { Code } from '@/components/app/code';

import { BloodPressureInput } from './clinicalInterview/bloodPressure';

interface MedicalPlanItem {
    id: string;
    type: 'Medicamento' | 'Terapia' | 'Cita' | 'Estudio';
    detail: string;
}

interface ClinicalInterviewProps {
    defaultValues?: Partial<VisitFormValues>;
    patientName: string;
    visitNumber: string;
    onSubmit: (data: VisitFormValues) => void;
}



export const ClinicalInterview: React.FC<ClinicalInterviewProps> = () => {
    const [medicalPlan, setMedicalPlan] = useState<MedicalPlanItem[]>([]);
    const methods = useForm<VisitFormValues>({
        resolver: zodResolver(Schema),
        mode: 'onBlur',
    });

    const { formState, handleSubmit, reset } = methods;

    const handleFormSubmit = (data: VisitFormValues) => {
        const finalData = { ...data, MedicalPlan: medicalPlan.map(item => ({ type: item.type, detail: item.detail })) };
        console.log(finalData);
        // onSubmit(finalData);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-10">
                <Card>
                    <CardContent>
                        {/* <div className='flex flex-col justify-between gap-3 '>
                            <ClinicalInterviewSection />
                            <ChiefComplaint />
                        </div> */}

                        {/* <Separator className="my-8" /> */}

                        {/* <section className='grid grid-cols-2 gap-6 max-h-64 '>
                            <FormController
                                as={FamilyHistory}
                                name='familyHistory'
                            />
                            <FormController
                                as={PersonalHistory}
                                name='personalHistory'
                            />
                        </section> */}

                        <Code data={methods.watch()} />

                        {/* <Separator className="my-8" /> */}

                        {/* <div className='grid grid-cols-2 gap-6 max-h-64'>

                            <FormController
                                as={Habits}
                                name='habit'
                            />
                        </div> */}


                        {/* --- PA (bloodPressure) --- */}
                        <FormController
                            as={BloodPressureInput}
                            name="bloodPressure"
                            label="Presión Arterial"
                            placeholder="120/80"
                            suffix="mmHg"
                        />

                        {/* --- FC (heartRate) --- */}
                        {/* <Controller
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
                                /> */}

                        {/* --- TEMP (temperature) --- */}
                        {/* <Controller
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
                                /> */}

                        {/* --- PESO (weight) --- */}
                        {/* <Controller
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
                                /> */}


                        {/* --- ESCALA DE DOLOR (RANGE INPUT) --- */}

                        {/* <Controller
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
                                /> */}


                        <Separator className="my-8" />

                        {/* <section>
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
                                <span className="material-symbols-outlined text-primary">visibility</span> Observaciones Públicas y Privadas
                            </h2>
                            <div className="space-y-6">

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
                        </section> */}

                        <Separator className="my-8" />


                        {/* <section>
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
                        </section> */}


                        <Separator className="my-8" />
                    </CardContent>
                    <CardFooter>
                        <Button type="button" variant="outline" onClick={() => reset()}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={formState.isSubmitting} className="flex items-center gap-2">
                            <span className="material-symbols-outlined text-lg">save</span>
                            {formState.isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                        </Button>
                    </CardFooter>
                </Card>
                {/* --- Contenedor Principal del Formulario --- */}
            </form>
        </FormProvider>
    );

};