import { Button } from "@/components/ui/button";
import { useEffect, useMemo } from "react";
import * as z from 'zod';
import { Calendar, Save, PowerOff, Power } from 'lucide-react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import type { IdName, Patient } from "#/core/entities";
import type { state } from "#/utils/types";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from "@/components/hooks/useToast";
import { mapPatientToFormValues } from "../hooks/mappedForm";
// import { ConfirmationModal } from "@/components/app/confirmationModal";
import { cn } from "@/lib/utils";
import { CalendarComponent } from "./calendar";
import { Loading } from "@/components/app/loading";
import { Card } from "@/components/ui/card";
import { useServices } from "@/components/hooks/useServices";
import { Toggle } from "@/components/ui/toggle";

export type PatientProfileFormValues = z.infer<typeof patientProfileSchema>;

export interface PatientProfileFormProps {
    patientState: state<Patient>;
    isNewPatient: boolean;
    isLoading: boolean;
    patientId: string | null;
}

const patientProfileSchema = z.object({
    isActive: z.boolean(),
    firstName: z.string().min(1, { message: "El nombre es requerido." }),
    lastName: z.string().min(1, { message: "El apellido es requerido." }),
    code: z.string().regex(/^[VP]\d{6,10}$/, { message: "Cédula inválida. Debe tener entre 7 y 10 dígitos, y comenzar por V o P" }),
    email: z.string().email({ message: "Correo electrónico inválido." }),
    gender: z.enum(["M", "F"]),
    phone: z.string().optional(),
    address: z.string().optional(),
    birthdate: z.date().nullable().optional(), // Usamos z.date() para el componente de calendario
    // country: z.string().optional(),
    // city: z.string().optional(),
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

const genders: IdName[] = [
    { id: "M", name: "Masculino" },
    { id: "F", name: "Femenino" },
];

export const PatientProfileForm = ({ patientState, isNewPatient, isLoading, patientId }: PatientProfileFormProps) => {
    const { setPatientData } = useServices();
    console.log("patientId", patientId);


    const { toast } = useToast();
    // const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const initialValues = useMemo(() => {
        if (isNewPatient) {
            return emptyDefaults;
        }

        return patientState.value || emptyDefaults;
    }, [isNewPatient, patientState.value]);

    const mappedDefaults = mapPatientToFormValues(initialValues);

    const defaultValuesWithIsActive = {
        ...mappedDefaults,
        isActive: mappedDefaults.isActive ?? false,
    };

    const form = useForm<PatientProfileFormValues>({
        resolver: zodResolver(patientProfileSchema),
        defaultValues: defaultValuesWithIsActive,
        mode: "onBlur",
    });

    useEffect(() => {
        form.reset(mapPatientToFormValues(initialValues));
    }, [initialValues, form]);

    const onSubmit = async (data: PatientProfileFormValues) => {
        try {
            const result = await setPatientData.execute(patientId === 'new' ? null : patientId, data)
            if (result.status !== 1) throw new Error("Algo salio mal");
            toast({
                title: "Éxito",
                description: `${result.resultado}`,
                variant: "success"
            });
        } catch (e) {
            if (e instanceof Error) {
                toast({
                    title: "Error",
                    description: `${e.message}`,
                    variant: "destructive"
                });
            }
        }
    };

    // const handleDelete = () => {
    //     setIsConfirmModalOpen(true);
    // };

    // const confirmDeletion = () => {
    //     setIsConfirmModalOpen(false);

    //     toast({
    //         title: "Eliminado",
    //         description: "El paciente ha sido eliminado.",
    //         variant: "destructive"
    //     });
    // };

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
            {/* <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onConfirm={confirmDeletion}
                onCancel={() => setIsConfirmModalOpen(false)}
                title="Confirmar Eliminación"
                message="¿Está seguro que desea eliminar este paciente? Esta acción no se puede deshacer y eliminará permanentemente todos sus registros."
            /> */}

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
                                                    <Input placeholder="Ej. V12345678" {...field} />
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
                                                    <Select onValueChange={field.onChange} value={field.value || ""}>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Seleccionar" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {genders.map((gender) => (
                                                                <SelectItem key={gender.id} value={gender.id.toString()}>
                                                                    {gender.name}
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

                        </div>
                    </div>

                    {/* 5. Pie de Página con Acciones */}
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4 rounded-b-xl">

                        {/* Botón Eliminar Paciente (Solo visible si NO es un paciente nuevo) */}
                        {!isNewPatient && (
                            <Controller
                                name="isActive" // Nombre del campo en Zod y RHF
                                control={form.control}
                                render={({ field }) => (
                                    <Toggle
                                        pressed={field.value}
                                        onPressedChange={field.onChange}
                                        variant="outline"
                                        className={cn(
                                            "w-full sm:w-auto text-base font-medium transition-colors order-2 sm:order-1",
                                            "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20",
                                            "data-[state=off]:bg-red-50 data-[state=off]:text-red-600 data-[state=off]:font-semibold data-[state=off]:hover:bg-red-100",
                                            "data-[state=on]:bg-blue-50 data-[state=on]:text-blue-600 data-[state=on]:font-semibold data-[state=on]:hover:bg-blue-100"
                                        )}
                                        aria-label="Paciente Inactivo"
                                    >
                                        {field.value
                                            ? <Power className="mr-2 h-4 w-4" />
                                            : <PowerOff className="mr-2 h-4 w-4" />}
                                        {field.value ? "Paciente Activo" : "Paciente Inactivo"}
                                    </Toggle>
                                )}
                            />
                        )}

                        {/* Botón Guardar Cambios */}
                        <div className={cn("flex w-full sm:w-auto", !isNewPatient ? 'order-1 sm:order-2' : 'justify-end')}>
                            <Button
                                type="submit"
                                className="w-full sm:w-auto"
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
