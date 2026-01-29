
import type { IdName } from "#/core/entities"
import { Select } from "@/components/app/select"
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,

} from "@/components/ui/dialog"
import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field"

import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Separator } from "@/components/ui/separator"


import { zodResolver } from "@hookform/resolvers/zod"
import { ExternalLink } from "lucide-react"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { useServices } from "@/components/hooks/useServices";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useAuthStore } from "#/stores/auth/useAuth";
import { useAlertStore } from "#/stores/alert/useAlert";


const idNameSchema = z.object({
    id: z.union([
        z.string().min(1, "El ID string es requerido."),
        z.number().int().min(1, "El ID numérico es requerido.")
    ]),
    name: z
        .string()
        .min(1, "El nombre es requerido para la selección."),
}).nullable();

const formSchema = z.object({
    branch: idNameSchema.refine(val => val !== null, { message: "Debe seleccionar una empresa." }),
    company: idNameSchema.refine(val => val !== null, { message: "Debe seleccionar una empresa." }),
    medicalProfile: idNameSchema.refine(val => val !== null, { message: "Debe seleccionar una empresa." }),
    especiality: idNameSchema.refine(val => val !== null, { message: "Debe seleccionar un departamento." }),
});


type FormSchema = z.infer<typeof formSchema>


type props = {
    open: boolean;
    isDoctor: boolean;
    onOpenChange: (open: any) => void;
}

export const ModalProfile = ({ open, onOpenChange, isDoctor }: props) => {
    const { updateProfileService, getOneProfileService, getProfileEspecialityService } = useServices();
    const { alert } = useAlertStore();
    const auth = useAuthStore.getState();
    const navigate = useNavigate();
    const from = useLocation().state?.from?.pathname || "/";
    const form = useForm({
        resolver: zodResolver(formSchema),
    });
    const medicalProfileId = form.watch("medicalProfile")?.id;

    const companiesQuery = useQuery<IdName[]>({
        queryKey: ['profileLists', 'companies'],
        queryFn: () => getOneProfileService.execute("COMPAÑIAS"),
        enabled: open,
    },);

    const branchesQuery = useQuery<IdName[]>({
        queryKey: ['profileLists', 'branches'],
        queryFn: () => getOneProfileService.execute("SUCURSALES"),
        enabled: open,
    });


    const medicalProfilesQuery = useQuery<IdName[]>({
        queryKey: ['profileLists', 'medicalProfiles'],
        enabled: open,
        queryFn: () => getOneProfileService.execute("MEDICOS"),
    });


    const especialitiesQuery = useQuery<IdName[]>({
        queryKey: ['profileLists', 'especialities', medicalProfileId],
        enabled: !!medicalProfileId,
        queryFn: () => getProfileEspecialityService.execute(medicalProfileId.toString() ?? "no"),
    });

    const hadleFormSubimt = form.handleSubmit(async (data: FormSchema) => {
        try {
            await updateProfileService.execute({
                branchId: data.branch.id.toString(),
                companyId: data.company.id.toString(),
                queueId: data.medicalProfile.id.toString(),
                especialityId: data.especiality.id.toString(),
            });

            auth.setIsProfileSelected(true);
            navigate(from, { replace: true });
            onOpenChange(false);
        } catch (error) {
            alert({
                title: "Error",
                variant: "destructive",
                description: `algo ha salido mal | ${error}`
            });
        }
    });

    useEffect(() => {
        if (medicalProfileId !== undefined) form.setValue('especiality', null, { shouldValidate: true });
    }, [medicalProfileId, form]);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="px-20 py-10">
                <form onSubmit={hadleFormSubimt}>
                    <DialogHeader>
                        <DialogTitle>Seleciona El Perfil</DialogTitle>
                    </DialogHeader>
                    <FieldSet className="sm:max-w-[425px]">
                        <FieldGroup >
                            <Controller name="company" control={form.control} render={({ field }) =>
                                <Field>
                                    <FieldLabel>Compañia</FieldLabel>
                                    <Select
                                        list={companiesQuery.data ?? []}
                                        title="Compañias"
                                        placeholder="Seleciona una compañia"
                                        value={field.value ?? undefined}
                                        onBlur={field.onBlur}
                                        onChange={field.onChange}
                                    />
                                    {/* <FieldDescription>Empresa Empleadora</FieldDescription> */}
                                </Field>
                            }
                            />
                            <Controller name="branch" control={form.control} render={({ field }) =>
                                <Field>
                                    <FieldLabel>Sucursal</FieldLabel>
                                    <Select
                                        list={branchesQuery.data ?? []}
                                        title="Sucursal"
                                        placeholder="Seleciona una sucursal"
                                        value={field.value ?? undefined}
                                        onBlur={field.onBlur}
                                        onChange={field.onChange}
                                    />
                                    {/* <FieldDescription>Sede de la Empresa Empleadora</FieldDescription> */}
                                </Field>}
                            />
                        </FieldGroup>

                        {isDoctor &&
                            <>
                                <Separator />
                                <FieldGroup className="">
                                    <FieldLegend>Seleccion Médica</FieldLegend>
                                    <Controller name="medicalProfile" control={form.control} render={({ field }) =>
                                        <Field>
                                            <FieldLabel>Perfil Médico</FieldLabel>
                                            <Select
                                                list={medicalProfilesQuery.data ?? []}
                                                title="Perfil Médico"
                                                placeholder="Seleciona una compañia"
                                                value={field.value ?? undefined}
                                                onBlur={field.onBlur}
                                                onChange={field.onChange}
                                            />
                                            {/* <FieldDescription>Sede de la Empresa Empleadora</FieldDescription> */}
                                        </Field>}
                                    />
                                    <Controller name="especiality" control={form.control} render={({ field }) =>
                                        <Field>
                                            <FieldLabel>Especiliadad Médica</FieldLabel>
                                            <Select
                                                list={especialitiesQuery.data ?? []}
                                                title="Especialidad"
                                                placeholder="Seleciona una compañia"
                                                value={field.value ?? undefined}
                                                onBlur={field.onBlur}
                                                onChange={field.onChange}
                                            />
                                            {/* <FieldDescription>Sede de la Empresa Empleadora</FieldDescription> */}
                                        </Field>}
                                    />
                                </FieldGroup>
                            </>
                        }

                    </FieldSet>
                    <DialogFooter className="pt-5">
                        <DialogClose asChild>
                            <Button variant="outline">Regresar</Button>
                        </DialogClose>

                        <InputGroup className="bg-black text-white hover:opacity-90" >
                            <InputGroupInput type="submit" value="Ingresar" />
                            <InputGroupAddon>
                                <ExternalLink />
                            </InputGroupAddon>
                        </InputGroup>

                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
