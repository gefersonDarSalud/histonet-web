
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Upload, Calendar, X, Save } from 'lucide-react'; // Iconos

// Componentes de shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    Field,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldContent,
} from "@/components/ui/field";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar"; // Usar alias para evitar conflicto
import { cn } from "@/lib/utils"; // Función de utilidad para clases de Tailwind
import { useParams } from 'react-router-dom';
import type { state } from '#/utils/types';
import type { Patient, PatientFull } from '#/core/entities';

const patientProfileSchema = z.object({
    firstName: z.string().min(1, { message: "El nombre es requerido." }),
    lastName: z.string().min(1, { message: "El apellido es requerido." }),
    code: z.string().regex(/^\d{7,10}$/, { message: "DNI/Cédula inválida. Debe tener entre 7 y 10 dígitos." }),
    email: z.string().email({ message: "Correo electrónico inválido." }),
    phone: z.string().optional(),
    // country: z.string().optional(),
    // city: z.string().optional(),
    address: z.string().optional(),
    birthdate: z.date().nullable().optional(), // Usamos z.date() para el componente de calendario
    gender: z.enum(["Masculino", "Femenino", "Otro"]).optional(),
    // profilePictureUrl: z.string().url().optional().nullable(),
});

type PatientProfileFormValues = z.infer<typeof patientProfileSchema>;


// Valores por defecto (simulando la carga de un paciente existente)
const defaultValues: Partial<PatientProfileFormValues> = {
    firstName: "Juan",
    lastName: "Pérez",
    code: "12345678",
    email: "juan.perez@correo.com",
    phone: "+1 234 567 890",
    // country: "España",
    // city: "Madrid",
    address: "Calle Falsa 123",
    birthdate: new Date('1990-01-01T00:00:00'),
    gender: "Masculino",
    // profilePictureUrl: null, // Si tuviera foto: 'https://placehold.co/160x160/282c34/white?text=JP'
};

// Array de opciones para el selector de género
const genders = ["Masculino", "Femenino", "Otro"];

interface BasicDataProps {
    patientState: state<PatientFull>;
}

export const BasicData = (patientState: BasicDataProps) => {

    const form = useForm<PatientProfileFormValues>({
        resolver: zodResolver(patientProfileSchema),
        defaultValues: patientState.value || defaultValues,
        mode: "onBlur", // Valida al salir del campo
    });

    const onSubmit = (data: PatientProfileFormValues) => {
        console.log("Datos del Formulario Validados:", data);
        alert("Cambios guardados con éxito. Revisa la consola para ver los datos.");
    };

    const handleDelete = () => {
        // En un entorno real, esto mostraría un Diálogo de Confirmación (shadcn Dialog)
        const isConfirmed = window.confirm("¿Está seguro que desea eliminar este paciente? Esta acción no se puede deshacer.");
        if (isConfirmed) {
            console.log("Paciente eliminado.");
            // Aquí iría la lógica de redirección o eliminación
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="p-6 sm:p-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Columna Izquierda: Información Personal */}
                        <div className="flex-grow">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 border-b pb-2">Información Personal</h2>

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
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
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
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />

                                {/* Cédula / DNI */}
                                <Controller
                                    name="dni"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field className="sm:col-span-2">
                                            <FieldLabel>Cédula / DNI</FieldLabel>
                                            <FieldContent>
                                                <Input placeholder="Ej. 12345678" {...field} />
                                            </FieldContent>
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
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
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />

                                {/* Teléfono */}
                                <Controller
                                    name="phone"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field className="sm:col-span-2">
                                            <FieldLabel>Teléfono</FieldLabel>
                                            <FieldContent>
                                                <Input placeholder="Ej. +1 234 567 890" {...field} />
                                            </FieldContent>
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />

                                {/* País */}
                                <Controller
                                    name="country"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field>
                                            <FieldLabel>País</FieldLabel>
                                            <FieldContent>
                                                <Input placeholder="Ej. España" {...field} />
                                            </FieldContent>
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />

                                {/* Ciudad */}
                                <Controller
                                    name="city"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field>
                                            <FieldLabel>Ciudad</FieldLabel>
                                            <FieldContent>
                                                <Input placeholder="Ej. Madrid" {...field} />
                                            </FieldContent>
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
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
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />

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
                                                                ? field.value.toLocaleDateString('es-ES', { year: 'numeric', month: '2-digit', day: '2-digit' })
                                                                : "mm/dd/yyyy"}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-auto p-0" align="start">
                                                        <CalendarComponent
                                                            mode="single"
                                                            selected={field.value || undefined}
                                                            onSelect={field.onChange}
                                                            captionLayout="dropdown"
                                                            fromYear={1900}
                                                            toYear={new Date().getFullYear()}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </FieldContent>
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
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
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />

                            </div>
                        </div>

                        {/* Columna Derecha: Foto del Paciente */}
                        <div className="w-full md:w-56 flex-shrink-0 pt-10">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 border-b pb-2">Foto del Paciente</h2>
                            <div className="flex flex-col items-center">
                                <Avatar className="w-40 h-40 border-4 border-gray-100 dark:border-gray-700 shadow-md mb-4">
                                    <AvatarImage
                                        src={form.watch("profilePictureUrl") || undefined}
                                        alt="Foto del Paciente"
                                    />
                                    <AvatarFallback className="text-3xl font-semibold bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400">
                                        {form.watch("firstName")?.[0] || 'JP'}
                                        {form.watch("lastName")?.[0] || ''}
                                    </AvatarFallback>
                                </Avatar>

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
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-end items-center gap-4 rounded-b-xl">
                    {/* Botón Eliminar Paciente */}
                    <Button
                        type="button"
                        variant="ghost"
                        className="w-full sm:w-auto text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                        onClick={handleDelete}
                    >
                        <X className="mr-2 h-4 w-4" />
                        Eliminar Paciente
                    </Button>

                    {/* Botón Guardar Cambios */}
                    <Button
                        type="submit"
                        className="w-full sm:w-auto bg-gray-900 text-white dark:bg-gray-50 dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200"
                        disabled={form.formState.isSubmitting}
                    >
                        <Save className="mr-2 h-4 w-4" />
                        {form.formState.isSubmitting ? "Guardando..." : "Guardar Cambios"}
                    </Button>
                </div>
            </form>
        </div>)
}