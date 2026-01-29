import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Schema, type VisitFormValues } from '../../validations/ClinicalInterview';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { FormController } from '@/components/app/FormController';
// import { Code } from '@/components/app/code';
import { BloodPressureInput } from './clinicalInterview/bloodPressure';
import { Temperature } from './clinicalInterview/temperature';
import { HeartRate } from './clinicalInterview/heartRate';
import { Weight } from './clinicalInterview/weight';
import { FamilyHistory } from './clinicalInterview/familyHistory';
import { PersonalHistory } from './clinicalInterview/personalHistory';
import { Habits } from './clinicalInterview/habits';
import { WysiwigEditor } from '@/components/app/wysiwyg';
import { Activity, AlertCircle, FileUser, Heart, Weight as WeightIcon, SquareActivity, Thermometer } from 'lucide-react';


export const ClinicalInterview = () => {
    const methods = useForm<VisitFormValues>({
        resolver: zodResolver(Schema),
        mode: 'onBlur',
    });

    const { formState, handleSubmit, reset } = methods;

    const handleFormSubmit = (data: VisitFormValues) => {
        console.log(data);
        // onSubmit(finalData);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-10">
                <Card>
                    <CardContent>
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

                        <Separator className="my-8" />

                        <section className='grid grid-cols-2 gap-6'>
                            <FormController
                                as={FamilyHistory}
                                name='familyHistory'
                            />
                            <FormController
                                as={PersonalHistory}
                                name='personalHistory'
                            />
                        </section>

                        <Separator className="my-8" />

                        <section>
                            <FormController
                                as={Habits}
                                name='habit'
                            />
                        </section>

                        <Separator className="my-8" />

                        <section className='flex gap-x-8 mt-5'>
                            <FormController
                                as={BloodPressureInput}
                                name="bloodPressure"
                                label={
                                    <>
                                        <Heart />
                                        Presión Arterial
                                    </>
                                }
                                placeholder="120/80"
                                description="Ingrese la presión arterial del paciente en presión sistólica y diastólica"
                                suffix="MmHg"
                            />

                            <FormController
                                as={HeartRate}
                                name="heartRate"
                                label={
                                    <>
                                        <SquareActivity />
                                        Frecuencia Cardiaca
                                    </>
                                }
                                placeholder="75.0"
                                description="Ingrese la frecuencia cardiaca del paciente en latidos por minuto"
                                suffix="Ipm"
                            />

                            <FormController
                                as={Temperature}
                                name="temperature"
                                label={
                                    <>
                                        <Thermometer />
                                        Temperatura
                                    </>
                                }
                                placeholder="36.5"
                                description="Ingrese la temperatura del paciente en grados celsius"
                                suffix="°C"
                            />

                            <FormController
                                as={Weight}
                                name="weight"
                                label={
                                    <>
                                        <WeightIcon />
                                        Peso
                                    </>
                                }
                                placeholder="72.1"
                                description="Ingrese el peso del paciente en kilogramos"
                                suffix="Kg"
                            />
                        </section>

                        <Separator className="my-8" />

                        <section className='w-full mb-5'>
                            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-foreground">
                                <AlertCircle />
                                Observaciones
                            </h2>

                            <FormController
                                as={WysiwigEditor}
                                name="observations"
                                label="Informacion adicional sobre el paciente"
                                description="Mínimo 20 caracteres. Este campo es crucial."
                                placeholder="Describa el motivo de la visita y la entrevista clínica..."
                            />
                        </section>

                        {/* <Code data={methods.watch()} /> */}

                    </CardContent>
                    <CardFooter className='flex justify-end gap-5'>
                        <Button type="button" variant="outline" onClick={() => reset()}>
                            Limpiar
                        </Button>
                        <Button type="submit" disabled={formState.isSubmitting} className="flex items-center gap-2">
                            {formState.isSubmitting ? 'Guardando...' : 'Guardar Cambios'}
                        </Button>
                    </CardFooter>
                </Card>
                {/* --- Contenedor Principal del Formulario --- */}
            </form>
        </FormProvider>
    );

};