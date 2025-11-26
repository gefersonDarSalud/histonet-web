import { Button } from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import * as z from 'zod';
import { Upload, Calendar, X, Save, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { PatientFull } from "#/core/entities";
import type { state } from "#/utils/types";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from "@/hooks/useToast";
import { mapPatientToFormValues } from "../hooks/mappedForm";
import { ConfirmationModal } from "@/components/app/confirmationModal";
import { cn } from "@/lib/utils";
import { CalendarComponent } from "./calendar";
import { Loading } from "@/components/app/loading";
import { Card } from "@/components/ui/card";

export type PatientProfileFormValues = z.infer<typeof patientProfileSchema>;

export interface PatientProfileFormProps {
    patientState: state<PatientFull>;
    isNewPatient: boolean;
    isLoading: boolean;
}

const patientProfileSchema = z.object({
    firstName: z.string().min(1, { message: "El nombre es requerido." }),
    lastName: z.string().min(1, { message: "El apellido es requerido." }),
    code: z.string().regex(/^[VP]\d{6,10}$/, { message: "Cédula inválida. Debe tener entre 7 y 10 dígitos, y comenzar por V o P" }),
    email: z.string().email({ message: "Correo electrónico inválido." }),
    phone: z.string().optional(),
    // country: z.string().optional(),
    // city: z.string().optional(),
    address: z.string().optional(),
    birthdate: z.date().nullable().optional(), // Usamos z.date() para el componente de calendario
    gender: z.enum(["Masculino", "Femenino", "Otro"]).optional(),
    // profilePictureUrl: z.string().url().optional().nullable(),
});


const emptyDefaults: Partial<PatientProfileFormValues> = {
    firstName: "",
    lastName: "",
    code: "",
    email: "",
    phone: "",
    birthdate: undefined,
    gender: undefined,
};

const genders = ["Masculino", "Femenino", "Otro"];

export const PatientProfileForm = ({ patientState, isNewPatient, isLoading }: PatientProfileFormProps) => {

    const { toast, message } = useToast();
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const initialValues = useMemo(() => {
        if (isNewPatient) {
            return emptyDefaults;
        }
        return patientState.value || emptyDefaults;
    }, [isNewPatient, patientState.value]);

    const form = useForm<PatientProfileFormValues>({
        resolver: zodResolver(patientProfileSchema),
        defaultValues: mapPatientToFormValues(initialValues),
        mode: "onBlur",
    });

    useEffect(() => {
        form.reset(mapPatientToFormValues(initialValues));
    }, [initialValues, form]);

    const onSubmit = (data: PatientProfileFormValues) => {
        console.log("Datos del Formulario Validados:", data);
        toast({
            title: "Éxito",
            description: `Paciente ${isNewPatient ? 'creado' : 'actualizado'} con éxito.`,
            variant: "success"
        });
        return new Promise(resolve => setTimeout(resolve, 1000));
    };

    const handleDelete = () => {
        setIsConfirmModalOpen(true);
    };

    const confirmDeletion = () => {
        console.log(`Paciente ${patientState.value?.code || 'NUEVO'} eliminado.`);
        setIsConfirmModalOpen(false);
        toast({
            title: "Eliminado",
            description: "El paciente ha sido eliminado.",
            variant: "destructive"
        });
    };

    const isSaving = form.formState.isSubmitting;

    if (isLoading) {
        return (
            <Card className="min-h-96 flex justify-center items-center">
                <Loading />
            </Card>
        );
    }

    return (
        <>
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onConfirm={confirmDeletion}
                onCancel={() => setIsConfirmModalOpen(false)}
                title="Confirmar Eliminación"
                message="¿Está seguro que desea eliminar este paciente? Esta acción no se puede deshacer y eliminará permanentemente todos sus registros."
            />

            {message && (
                <div className={cn("fixed bottom-4 right-4 p-4 rounded-lg shadow-xl flex items-center z-50 transition-transform duration-300",
                    message.variant === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                )}>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="font-semibold">{message.title}:dsfsdfsdhfjkhsd</span> {message.description}
                </div>
            )}

            <Card>
                <form onSubmit={form.handleSubmit(onSubmit)} className="">
                    <div className="px-6 sm:px-8">
                        <div className="flex flex-col md:flex-row gap-8">

                            {/* Columna Izquierda: Información Personal */}
                            <div className="flex-grow">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 border-b pb-2">
                                    {isNewPatient ? "Nuevo Paciente: Información Personal" : "Información Personal"}
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                                    {/* Nombre */}
                                    <Controller
                                        name="firstName"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field>
                                                <FieldLabel>Nombre</FieldLabel>
                                                <FieldContent>
                                                    <Input placeholder="Ej. Juan" {...field} />
                                                </FieldContent>
                                                {fieldState.error && (<FieldError errors={[fieldState.error]} />)}
                                            </Field>
                                        )}
                                    />

                                    {/* Apellido */}
                                    <Controller
                                        name="lastName"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field>
                                                <FieldLabel>Apellido</FieldLabel>
                                                <FieldContent>
                                                    <Input placeholder="Ej. Pérez" {...field} />
                                                </FieldContent>
                                                {fieldState.error && (<FieldError errors={[fieldState.error]} />)}
                                            </Field>
                                        )}
                                    />

                                    <Controller
                                        name="code"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field className="">
                                                <FieldLabel>Cédula</FieldLabel>
                                                <FieldContent>
                                                    <Input placeholder="Ej. 12345678" {...field} />
                                                </FieldContent>
                                                {fieldState.error && (<FieldError errors={[fieldState.error]} />)}
                                            </Field>
                                        )}
                                    />

                                    {/* Sexo (Select de shadcn) */}
                                    <Controller
                                        name="gender"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field>
                                                <FieldLabel>Sexo</FieldLabel>
                                                <FieldContent>
                                                    <Select onValueChange={field.onChange} value={field.value}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Seleccionar" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {genders.map((gender) => (
                                                                <SelectItem key={gender} value={gender}>
                                                                    {gender}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                </FieldContent>
                                                {fieldState.error && (<FieldError errors={[fieldState.error]} />)}
                                            </Field>
                                        )}
                                    />

                                    {/* Correo Electrónico */}
                                    <Controller
                                        name="email"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field className="sm:col-span-2">
                                                <FieldLabel>Correo Electrónico</FieldLabel>
                                                <FieldContent>
                                                    <Input type="email" placeholder="Ej. juan.perez@correo.com" {...field} />
                                                </FieldContent>
                                                {fieldState.error && (<FieldError errors={[fieldState.error]} />)}
                                            </Field>
                                        )}
                                    />

                                    {/* Teléfono */}
                                    <Controller
                                        name="phone"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field>
                                                <FieldLabel>Teléfono</FieldLabel>
                                                <FieldContent>
                                                    <Input placeholder="Ej. +1 234 567 890" {...field} />
                                                </FieldContent>
                                                {fieldState.error && (<FieldError errors={[fieldState.error]} />)}
                                            </Field>
                                        )}
                                    />

                                    {/* País (Uncommented in schema) */}
                                    {/* <Controller
                                                name="country"
                                                control={form.control}
                                                render={({ field, fieldState }) => (
                                                    <Field>
                                                        <FieldLabel>País</FieldLabel>
                                                        <FieldContent>
                                                            <Input placeholder="Ej. España" {...field} />
                                                        </FieldContent>
                                                        {fieldState.error && (<FieldError errors={[fieldState.error]} />)}
                                                    </Field>
                                                )}
                                            /> */}

                                    {/* Ciudad (Uncommented in schema) */}
                                    {/* <Controller
                                                name="city"
                                                control={form.control}
                                                render={({ field, fieldState }) => (
                                                    <Field>
                                                        <FieldLabel>Ciudad</FieldLabel>
                                                        <FieldContent>
                                                            <Input placeholder="Ej. Madrid" {...field} />
                                                        </FieldContent>
                                                        {fieldState.error && (<FieldError errors={[fieldState.error]} />)}
                                                    </Field>
                                                )}
                                            /> */}

                                    {/* Fecha de Nacimiento (Usando Popover y shadcn Calendar) */}
                                    <Controller
                                        name="birthdate"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field className="flex flex-col justify-start">
                                                <FieldLabel className="mb-1">Fecha de Nacimiento</FieldLabel>
                                                <FieldContent>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-full justify-start text-left font-normal",
                                                                    !field.value && "text-muted-foreground"
                                                                )}
                                                            >
                                                                <Calendar className="mr-2 h-4 w-4" />
                                                                {field.value
                                                                    ? format(field.value, 'dd/MM/yyyy', { locale: es })
                                                                    : "dd/mm/yyyy"}
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0" align="start">
                                                            <CalendarComponent
                                                                mode="single"
                                                                selected={field.value || null}
                                                                onSelect={(date) => field.onChange(date)}
                                                                captionLayout="dropdown"
                                                                fromYear={1900}
                                                                toYear={new Date().getFullYear()}
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </FieldContent>
                                                {fieldState.error && (<FieldError errors={[fieldState.error]} />)}
                                            </Field>
                                        )}
                                    />


                                    {/* Dirección */}
                                    <Controller
                                        name="address"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field className="sm:col-span-2">
                                                <FieldLabel>Dirección</FieldLabel>
                                                <FieldContent>
                                                    <Input placeholder="Ej. Calle Falsa 123" {...field} />
                                                </FieldContent>
                                                {fieldState.error && (<FieldError errors={[fieldState.error]} />)}
                                            </Field>
                                        )}
                                    />

                                </div>
                            </div>

                            {/* Columna Derecha: Foto del Paciente */}
                            <div className="w-full md:w-56 flex-shrink-0 pt-10">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 border-b pb-2">Foto</h2>
                                <div className="flex flex-col items-center">
                                    {/* <Avatar className="w-40 h-40 border-4 border-gray-100 dark:border-gray-700 shadow-md mb-4">
                                                <AvatarImage
                                                    src={form.watch("profilePictureUrl") || undefined}
                                                    alt="Foto del Paciente"
                                                />
                                                <AvatarFallback className="text-3xl font-semibold bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                                                    {initials || 'JP'}
                                                </AvatarFallback>
                                            </Avatar> */}

                                    {/* Botón de Subir Foto (simulado) */}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full"
                                    >
                                        <Upload className="mr-2 h-4 w-4" />
                                        Subir foto
                                    </Button>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
                                        JPG, PNG o GIF. Máx 5MB.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 5. Pie de Página con Acciones */}
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4 rounded-b-xl">

                        {/* Botón Eliminar Paciente (Solo visible si NO es un paciente nuevo) */}
                        {!isNewPatient && (
                            <Button
                                type="button"
                                variant="ghost"
                                className="w-full sm:w-auto text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 order-2 sm:order-1"
                                onClick={handleDelete} // Triggers custom modal
                                disabled={isSaving}
                            >
                                <X className="mr-2 h-4 w-4" />
                                Eliminar Paciente
                            </Button>
                        )}

                        {/* Botón Guardar Cambios */}
                        <div className={cn("flex w-full sm:w-auto", !isNewPatient ? 'order-1 sm:order-2' : 'justify-end')}>
                            <Button
                                type="submit"
                                className="w-full sm:w-auto bg-blue-600 text-white dark:bg-blue-500 dark:text-white hover:bg-blue-700 dark:hover:bg-blue-600"
                                disabled={isSaving}
                            >
                                <Save className="mr-2 h-4 w-4" />
                                {isSaving ? (isNewPatient ? "Creando..." : "Guardando...") : (isNewPatient ? "Crear Paciente" : "Guardar Cambios")}
                            </Button>
                        </div>
                    </div>
                </form>
            </Card>
        </>
    );
};
