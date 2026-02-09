import type { Patient } from "#/core/entities"
import { Code } from "@/components/app/code"
import { FormController } from "@/components/app/FormController"
import { OptionCards } from "@/components/app/OptionCards"
import { SearchCombobox } from "@/components/app/SearchCombobox"
import { useServices } from "@/components/hooks/useServices"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FieldGroup } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { schema } from "@/remoteClicnic/validations/newcall"
import { zodResolver } from "@hookform/resolvers/zod"

import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"

export const NewCall = () => {
    const { searchPatientsService } = useServices();
    const [open, setOpen] = useState<boolean>(false);

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            patientId: "",
            patientCode: "",
            patientFullName: "",
            admissionType: undefined as 'particular' | 'asegurado' | 'corporativo' | 'convenio' | undefined,
            visitMotive: "",
            policyHolderId: "",
            policyHolderName: "",
            businessId: "",
            businessName: "",
            feeScheduleId: "",
            services: [],
            observations: "",
        }
    });

    const { watch, setValue, handleSubmit } = form;
    const admissionType = watch('admissionType');
    const isSelectedPatient = watch().patientCode.length !== 0;

    const onSubmit = (data: unknown) => {
        console.log('Form submitted:', data);
        // Aquí se navegaría a la página de ClinicalInterview
        // navigate('/remote-clinic/visit', { state: { visitData: data } });
        setOpen(false);
    };

    const handleRegisterPatient = () => {
        // Navegar al registro de nuevo paciente
        console.log('Register new patient');
    };

    return (
        <FormProvider {...form}>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="default">Nuevo Ingreso</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[70vw] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="mb-2">Nueva Llamada - Telemedicina</DialogTitle>
                        <DialogDescription className="flex justify-between">
                            <div>

                                Complete los datos para registrar una nueva llamada médica
                            </div>
                            <Button
                                type="button"
                                variant="link"
                                className="font-bold cursor-pointer p-0 h-auto"
                                onClick={handleRegisterPatient}
                            >
                                ¿El paciente no está registrado?
                            </Button>
                        </DialogDescription>
                    </DialogHeader>


                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Paso 1: Búsqueda de Paciente */}
                        <FieldGroup>
                            {!isSelectedPatient ? (
                                <FormController
                                    as={SearchCombobox}
                                    name="patientCode"
                                    label="Buscar Paciente por Cédula o Nombre"
                                    description="Escribe al menos 3 caracteres para iniciar la búsqueda"
                                    queryKey="patients-search"
                                    fetcher={searchPatientsService.execute}
                                    getOptionValue={(p: Patient) => p.code}
                                    getOptionLabel={(p: Patient) => `${p.code} - ${p.fullname}`}
                                    onSelect={(p: Patient) => {
                                        form.setValue("patientFullName", p.fullname)
                                    }}
                                    placeholder="Ej: V28563229"
                                    renderItem={(p: Patient) => (
                                        <div className="flex flex-col cursor-pointer py-1 my-2">
                                            <span className="font-bold">{p.fullname}</span>
                                            <span className="text-xs text-muted-foreground">{p.code}</span>
                                        </div>
                                    )}
                                />
                            ) : (
                                <div className="p-4 bg-slate-50 rounded-lg border">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-bold text-lg">{watch().patientFullName}</p>
                                            <p className="text-muted-foreground">{watch().patientCode}</p>
                                        </div>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                                form.reset(null);
                                                setValue('patientId', '');
                                                setValue('patientCode', '');
                                                setValue('patientFullName', '');
                                            }}
                                        >
                                            Cambiar paciente
                                        </Button>
                                    </div>
                                </div>
                            )}
                        </FieldGroup>

                        {/* Paso 2: Tipo de Ingreso */}

                        <FieldGroup>
                            <Label className="text-lg font-semibold">2. Tipo de Ingreso</Label>
                            <FormController
                                as={OptionCards}
                                name="admissionType"
                            />
                        </FieldGroup>


                        {/* Campos condicionales según el tipo de ingreso */}
                        {['asegurado', 'corporativo'].includes(admissionType || '') && (
                            <FieldGroup>
                                <Label className="text-lg font-semibold">4. {admissionType === 'asegurado' ? 'Aseguradora' : 'Empresa'}</Label>
                                <FormController
                                    as={SearchCombobox}
                                    name="businessId"
                                    label={`Buscar ${admissionType === 'asegurado' ? 'aseguradora' : 'empresa'}`}
                                    queryKey="business-search"
                                    fetcher={() => Promise.resolve([])} // TODO: Implementar servicio de búsqueda de empresas
                                    getOptionValue={(b: { id: string; name: string }) => b.id}
                                    getOptionLabel={(b: { id: string; name: string }) => b.name}
                                    placeholder="Buscar empresa o aseguradora..."
                                />
                            </FieldGroup>
                        )}



                        {/* Debug: Mostrar datos del formulario */}
                        <Code data={watch()} />

                        <DialogFooter className="mt-6">
                            <DialogClose asChild>
                                <Button type="button" variant="outline">Cancelar</Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                disabled={!isSelectedPatient || !admissionType || !watch('visitMotive')}
                            >
                                Continuar a Entrevista Clínica
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </FormProvider>
    )
}
