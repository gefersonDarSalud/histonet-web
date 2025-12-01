import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { DepartamentsSelect } from './departamentsSelect';
import { BusinessCombobox } from '@/remoteClicnic/components/Business.combobox';
import type { Business, IdName } from '#/core/entities';
import { useServices } from '#/hooks/useServices';
import { Select } from '@/components/app/select';
import { useFetch } from '#/hooks/useFetch';
// import type { FeeSchedule } from '#/core/entities';

const formSchema = z.object({
    nombreEmpresa: z
        .string()
        .min(3, "El nombre de la empresa debe tener al menos 3 caracteres.")
        .max(50, "El nombre de la empresa no debe exceder los 50 caracteres."),
    departamento: z
        .string()
        .min(1, "Debe seleccionar un departamento."),
    aseguradora: z
        .string()
        .min(1, "Debe ingresar o buscar una aseguradora."),
    baremo: z
        .string()
        .min(1, "Debe seleccionar un baremo."),
});

type FormValues = z.infer<typeof formSchema>;

type BusinessFormProps = {
    onSubmit: (data: FormValues) => void;
    initialValues?: Partial<FormValues>;
};

export const BusinessFormAdd = ({ onSubmit, initialValues }: BusinessFormProps) => {
    const { searchBusinessService, getBusinessDataListService } = useServices();

    // field
    const [isBusinessLoading, setIsBusinessLoading] = useState(false);
    const [isDepartamentLoading, setIsDepartamentLoading] = useState(false);
    const [businessList, setBusinessList] = useState<Business[]>([]);
    const [departamentList, setDepartamentList] = useState<IdName[]>([]);

    const { data: insuranceList, loading: isLoadingInsuranceList, insuranceListError, execute: insuranceListFetch, } =
        useFetch<IdName[], [{ id: string, list: 'ASEGURADORA' }]>(getBusinessDataListService.execute, []);

    const { data: feeeScheduleList, loading: isLoadingfeeeScheduleList, feeeScheduleListError, execute: feeeScheduleListFetch, } =
        useFetch<IdName[], [{ id: string, list: 'BAREMO' }]>(getBusinessDataListService.execute, []);

    const [selectedBusiness, setSelectedBusiness] = useState<string | null>(null);
    const [selectedDepartament, setSelectedDepartament] = useState<string | null>(null);

    const [submissionData, setSubmissionData] = useState<FormValues | null>(null);
    const [businessSearched, setBusinessSearched] = useState<string>("");

    const selectedBusinessState = {
        value: selectedBusiness,
        set: setSelectedBusiness
    }

    const selectedDepartamentState = {
        value: selectedDepartament,
        set: setSelectedDepartament,
    }

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


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (businessSearched.length >= 3 || businessSearched.length === 0) fetchDataBusinessList(businessSearched);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [fetchDataBusinessList, businessSearched]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (selectedBusiness) fetchDataDepartamentList(selectedBusiness);
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [fetchDataDepartamentList, selectedBusiness]);

    useEffect(
        () => { if (selectedBusiness) insuranceListFetch({ id: selectedBusiness, list: 'ASEGURADORA' }) },
        [insuranceListFetch, selectedBusiness]
    )

    useEffect(
        () => { if (selectedBusiness) feeeScheduleListFetch({ id: selectedBusiness, list: 'BAREMO' }) },
        [feeeScheduleListFetch, selectedBusiness]
    )

    const businessObject = useMemo(() => {
        return businessList.find(b => b.id === selectedBusiness);
    }, [selectedBusiness, businessList])


    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValues,
    });

    const handlerOnSubmit = (data: FormValues) => {
        console.log("Datos enviados:", data);
        onSubmit(data);
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
                                        listBusiness={businessList}
                                        businessId={selectedBusinessState}
                                        disabled={isBusinessLoading}
                                        businessObject={businessObject}
                                        text={{
                                            value: businessSearched,
                                            set: setBusinessSearched
                                        }}
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
                                    <DepartamentsSelect
                                        departaments={departamentList}
                                        selected={selectedDepartamentState}
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
                                    <Select list={insuranceList ?? []} title='Aseguradora' placeholder='Seleciona la Aseguradora' />
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
                                    <Select list={feeeScheduleList ?? []} title='Baremo' placeholder='Seleciona un Baremo' />
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>

                {submissionData && (
                    <div className="mt-8 p-4 bg-gray-100 rounded-lg border border-gray-200">
                        <h3 className="text-lg font-semibold mb-2">Datos Enviados (Simulación)</h3>
                        <pre className="text-sm overflow-x-auto p-2 bg-white rounded">
                            <code>{JSON.stringify(submissionData, null, 2)}</code>
                        </pre>
                    </div>
                )}
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