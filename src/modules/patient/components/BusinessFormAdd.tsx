import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { BusinessCombobox } from '@/remoteClicnic/components/main/Business.combobox';
import type { Business, IdName } from '#/core/entities';
import { useServices } from '@/components/hooks/useServices';
import { Select } from '@/components/app/select';
import { useFetch } from '@/components/hooks/useFetch';
import type { SetPatientContractsServiceProps } from '#/core/services/patient/setPatientContractsService';
import { useAlertStore } from '#/stores/alert/useAlert';

const IdNameSchema = z.object({
    id: z.union([
        z.string().min(1, "El ID string es requerido."),
        z.number().int().min(1, "El ID numérico es requerido.")
    ]),
    name: z
        .string()
        .min(1, "El nombre es requerido para la selección."),
}).nullable();

const formSchema = z.object({
    nombreEmpresa: IdNameSchema.refine(val => val !== null, { message: "Debe seleccionar una empresa." }),
    departamento: IdNameSchema.refine(val => val !== null, { message: "Debe seleccionar un departamento." }),
    aseguradora: IdNameSchema,
    baremo: IdNameSchema.refine(val => val !== null, { message: "Debe seleccionar un baremo." }),
});

type FormValues = z.infer<typeof formSchema>;

type BusinessFormProps = {
    patientId: string;
    initialValues?: Partial<FormValues>;
    onSuccess: () => void;
};

export const BusinessFormAdd = ({ patientId, initialValues, onSuccess }: BusinessFormProps) => {
    const { searchBusinessService, getBusinessDataListService, setPatientContracts } = useServices();
    const { alert } = useAlertStore();

    // field
    const [isBusinessLoading, setIsBusinessLoading] = useState(false);
    const [isDepartamentLoading, setIsDepartamentLoading] = useState(false);

    const [businessList, setBusinessList] = useState<Business[]>([]);
    const [departamentList, setDepartamentList] = useState<IdName[]>([]);

    const {
        data: insuranceList,
        // loading: isLoadingInsuranceList,
        // insuranceListError,u
        execute: insuranceListFetch,
    } = useFetch<IdName[], [{ id: string, list: 'ASEGURADORA' }]>(getBusinessDataListService.execute, []);

    const {
        data: feeeScheduleList,
        // loading: isLoadingfeeeScheduleList,
        // error: feeeScheduleListError,
        execute: feeeScheduleListFetch,
    } = useFetch<IdName[], [{ id: string, list: 'BAREMO' }]>(getBusinessDataListService.execute, []);

    const [submissionData, setSubmissionData] = useState<FormValues | null>(null);
    const [businessSearched, setBusinessSearched] = useState<string>("");

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues || {
            nombreEmpresa: null,
            departamento: null,
            aseguradora: null,
            baremo: null,
        },
    });
    const { resetField } = form; // 🚨 Desestructurar resetField

    const selectedBusinessObject = form.watch('nombreEmpresa');
    // const selectedDepartamentObject = form.watch('departamento');

    const selectedBusinessId = selectedBusinessObject ? selectedBusinessObject.id : null;


    const fetchDataBusinessList = useCallback(async (text: string) => {
        try {
            const result = await searchBusinessService.execute(text)
            setBusinessList(result);
        }
        catch (error) {
            console.error("Error al buscar pacientes:", error);
            setBusinessList([]);
        }
        finally {
            setIsBusinessLoading(false);
        }
    }, [searchBusinessService]);

    const fetchDataDepartamentList = useCallback(async (id: string) => {
        try {
            const result = await getBusinessDataListService.execute({ id, list: 'DEPARTAMENTO' })
            setDepartamentList(result);
        }
        catch (error) {
            console.error("Error al buscar pacientes:", error);
            setDepartamentList([]);
        }
        finally {
            setIsDepartamentLoading(false);
        }
    }, [getBusinessDataListService]);

    const isMounted = useRef(false);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }
        resetField('departamento', { defaultValue: null });
        resetField('aseguradora', { defaultValue: null });
        resetField('baremo', { defaultValue: null });
    }, [selectedBusinessObject, resetField])

    useEffect(
        () => {
            if (businessSearched.length >= 3 || businessSearched.length === 0) fetchDataBusinessList(businessSearched);
        }, [fetchDataBusinessList, businessSearched]
    );

    useEffect(
        () => { if (selectedBusinessId) fetchDataDepartamentList(selectedBusinessId.toString()) },
        [fetchDataDepartamentList, selectedBusinessId]
    );

    useEffect(
        () => { if (selectedBusinessId) insuranceListFetch({ id: selectedBusinessId.toString(), list: 'ASEGURADORA' }) },
        [insuranceListFetch, selectedBusinessId]
    )

    useEffect(
        () => { if (selectedBusinessId) feeeScheduleListFetch({ id: selectedBusinessId.toString(), list: 'BAREMO' }) },
        [feeeScheduleListFetch, selectedBusinessId]
    )

    const onSubmit = useCallback(async (data: FormValues) => {
        const dataMapped: SetPatientContractsServiceProps = {
            business: data.nombreEmpresa!.id.toString(),
            insurance: data.aseguradora ? data.aseguradora.id.toString() : null,
            feeSchedule: data.baremo!.id.toString(),
            departament: data.departamento!.id.toString(),
        }
        try {
            const response = await setPatientContracts.execute(patientId, dataMapped)
            if (response.status !== 1) return alert({
                title: "Error al guardar:",
                description: `No se pudo agregar la empresa. ${response.resultado}`,
                variant: "destructive",
            });

            alert({
                title: "Éxito",
                description: `${response.resultado}`,
                variant: "success"
            });
            onSuccess();
            form.reset();
        }

        catch (e) {
            if (e instanceof Error) {
                alert({
                    title: "Error",
                    description: `${e.message}`,
                    variant: "destructive"
                });
            }
        }
    }, [patientId, form, setPatientContracts, alert, onSuccess]);

    const handlerOnSubmit = (data: FormValues) => {
        onSubmit(data)
        setSubmissionData(data);
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Agregar Nueva Empresa</CardTitle>
                <CardDescription>Formulario de registro de nuevas empresas y su información asociada.</CardDescription>
            </CardHeader>
            <CardContent>
                <form id="form-empresas-rhf" onSubmit={form.handleSubmit(handlerOnSubmit)} className="space-y-6">
                    <FieldGroup className='grid grid-cols-3 gap-3'>
                        {/* 1. Nombre de la Empresa (Input) */}
                        <Controller
                            name="nombreEmpresa"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid} className=' col-span-2'>
                                    <FieldLabel htmlFor={field.name}>Nombre de la Empresa</FieldLabel>
                                    <BusinessCombobox
                                        value={field.value}
                                        listBusiness={businessList}
                                        disabled={isBusinessLoading}
                                        onChange={field.onChange}
                                        text={{
                                            value: businessSearched,
                                            set: setBusinessSearched
                                        }}
                                        onBlur={field.onBlur}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        {/* 2. Departamento (Select) */}
                        <Controller
                            name="departamento"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Departamento</FieldLabel>
                                    <Select
                                        list={departamentList}
                                        title='Departamento'
                                        placeholder='Selecciona un departamento'
                                        value={field.value ?? undefined}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        {/* 3. Aseguradora (Search/Input - simulando Combobox) */}
                        <Controller
                            name="aseguradora"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Aseguradora</FieldLabel>
                                    <Select
                                        list={insuranceList ?? []}
                                        title='Aseguradora'
                                        placeholder='Seleciona la Aseguradora'
                                        value={field.value ?? undefined}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                    />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        {/* 4. Baremo (Select) */}
                        <Controller
                            name="baremo"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>Baremo</FieldLabel>
                                    <Select
                                        list={feeeScheduleList ?? []}
                                        title='Baremo'
                                        placeholder='Seleciona un Baremo'
                                        value={field.value ?? undefined}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                    />
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
                {/* {submissionData && <Code data={submissionData} />} */}
            </CardContent>
            <CardFooter className="justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => form.reset()}>
                    Cancelar
                </Button>
                <Button type="submit" form="form-empresas-rhf" variant="default">
                    Guardar
                </Button>
            </CardFooter>
        </Card>
    );
};