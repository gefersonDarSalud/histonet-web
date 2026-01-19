import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
} from "@/components/ui/field"
import { useServices } from "@/components/hooks/useServices"
import type { GroupTypeVisit } from "#/core/entities"
import type { PatientState } from "#/utils/types"
import { useState } from "react"



export const NewCall = () => {
    const { getPatientVisitContracts } = useServices();

    const typeVisit: GroupTypeVisit[] = ["particular", "afiliado", "asegurado"]

    const [patient, setPatient] = useState<PatientState>({
        id: null,
        code: null,
        fullname: null,
        birthdate: null,
    });

    const [visitType, setVisitType] = useState<TypeVisit | null>(null);
    const [selectedBusiness, setSelectedBusiness] = useState<string | null>(null);
    const [selectedIsurance, setSelectedIsurance] = useState<string | null>(null);
    const [businessList, setBusinessList] = useState<Business[]>([]);
    const [isBusinessLoading, setIsBusinessLoading] = useState(false);

    const isInsuredPatient = visitType === 'asegurado';
    const patientIdExists = !!patient.id;

    const { insuranceName, getFeeSchedulesInsurance, getFeeSchedulesBusiness, businessObject } = useMemo(() => {
        const business = businessList.find(b => b.id === selectedBusiness);
        const insurance = business?.insurances?.find(i => String(i.id) === String(selectedIsurance));
        const feeSchedulesInsurance = insurance?.feeSchedules;
        const feeSchedulesBusiness = business?.insurances?.find(i => typeof i.id === 'undefined')?.feeSchedules;
        return {
            insuranceName: insurance?.name ?? null,
            getFeeSchedulesInsurance: feeSchedulesInsurance,
            getFeeSchedulesBusiness: feeSchedulesBusiness,
            businessObject: business
        };
    }, [selectedIsurance, selectedBusiness, businessList]);

    const selectedBusinessState = {
        value: selectedBusiness,
        set: setSelectedBusiness
    }

    const selectedIsuranceState = {
        value: selectedIsurance,
        set: setSelectedIsurance
    }


    useEffect(() => {
        if (isInsuredPatient && patientIdExists) {

            const fetchBusinesses = async () => {
                setIsBusinessLoading(true);
                setBusinessList([]);
                setSelectedBusiness(null);

                try {
                    const patientParam = { id: patient.id! };
                    setBusinessList(await getPatientVisitContracts.execute(patientParam));
                }

                catch (error) {
                    console.error("Error al cargar empresas:", error);
                    setBusinessList([]);
                }

                finally {
                    setIsBusinessLoading(false);
                }
            };

            fetchBusinesses();
        } else {
            setBusinessList([]);
            setSelectedBusiness(null);
        }
    }, [isInsuredPatient, patientIdExists, patient.id]);

    const handlePatientChange = (field: keyof PatientState, value: string | null) => {
        setPatient(othersFields => {
            return { ...othersFields, [field]: value }
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    return (
        <Dialog>
            <form onSubmit={handleSubmit}>
                <DialogTrigger asChild>
                    <Button variant="default">Nuevo Ingreso</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[50vw]">
                    <DialogHeader>
                        <div>
                            <DialogTitle className="mb-2">Nuevo Registro de llamada</DialogTitle>
                            <DialogDescription>
                                Busca el Paciente y para registrarlo a la llamada
                            </DialogDescription>
                        </div>
                        <div className="flex justify-between">
                            <PatientCombobox patient={patient} setPatient={setPatient} />
                            <Button variant={"link"} className="flex-1 font-bold cursor-pointer">¿El cliente No esta registrado?</Button>
                        </div>
                    </DialogHeader>
                    <div className="w-full">
                        <FieldGroup>
                            <FieldSet>

                                {/* patient data */}
                                <FieldLegend>Paciente</FieldLegend>
                                <FieldGroup className="grid grid-cols-4 gap-4">
                                    <Field className=" col-span-2">
                                        <FieldLabel htmlFor="newCall-fullname">
                                            Nombre completo
                                        </FieldLabel>
                                        <Input
                                            id="newCall-fullname"
                                            placeholder="Nombre del paciente"
                                            required
                                            value={patient.fullname ?? ''}
                                            onChange={(e) => handlePatientChange('fullname', e.target.value)}
                                            disabled={patientIdExists}
                                        />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="newCall-id">
                                            Cedula
                                        </FieldLabel>
                                        <Input
                                            id="newCall-id"
                                            placeholder="V28563229"
                                            required
                                            value={patient.id ?? ''}
                                            onChange={(e) => handlePatientChange('id', e.target.value)}
                                            disabled={patientIdExists}
                                        />
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="newCall-birthdate">
                                            Fecha de Nacimiento
                                        </FieldLabel>
                                        <Input
                                            id="newCall-birthdate"
                                            type="date"
                                            required
                                            value={patient.birthdate ? patient.birthdate.split('T')[0] : ''}
                                            onChange={(e) => handlePatientChange('birthdate', e.target.value)}
                                            disabled={patientIdExists}
                                        />
                                    </Field>
                                </FieldGroup>

                                {/* config data */}
                                <FieldSeparator />
                                <div className="flex justify-between items-center">
                                    <FieldLegend className="m-0">Configuracion</FieldLegend>
                                    <Field orientation="horizontal" className="w-1/2">
                                        <FieldLabel htmlFor="newCall-patientsTypes">
                                            Tipo de Paciente
                                        </FieldLabel>
                                        <PatientType
                                            typeVisit={typeVisit}
                                            value={visitType}
                                            onValueChange={setVisitType}
                                        />
                                    </Field>
                                </div>
                                <FieldGroup className="grid grid-cols-2 gap-4">
                                    {isInsuredPatient &&
                                        <>
                                            <Field>
                                                <FieldLabel htmlFor="newCall-business">
                                                    Empresa {isBusinessLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin inline" />}
                                                </FieldLabel>
                                                <BusinessCombobox
                                                    listBusiness={businessList}
                                                    businessId={selectedBusinessState}
                                                    disabled={isBusinessLoading || businessList.length === 0}
                                                    businessObject={businessObject}
                                                />
                                            </Field>
                                            {businessObject && businessObject.insurances?.some(insurance => typeof insurance.id !== 'undefined') && businessObject &&
                                                <Field>
                                                    <FieldLabel htmlFor="newCall-insurances">
                                                        Seguro:
                                                    </FieldLabel>
                                                    <InsuranceType
                                                        list={businessObject.insurances}
                                                        state={selectedIsuranceState}
                                                        selectedInsurance={insuranceName ?? ''}
                                                        selfBusiness={{ name: businessObject.name, id: businessObject.id }}
                                                    />
                                                </Field>
                                            }
                                        </>
                                    }
                                </FieldGroup>
                            </FieldSet>
                            <FieldSeparator />

                        </FieldGroup>
                    </div>
                    <DialogFooter>
                        <Field orientation={'horizontal'}>
                            <FieldLabel htmlFor="newCall-patientsTypes">
                                Baremo
                            </FieldLabel>
                            <FeeScheduleType feeSchedules={getFeeSchedulesInsurance ?? getFeeSchedulesBusiness ?? []} />
                        </Field>
                        <DialogClose asChild>
                            <Button variant="outline">Cancelar</Button>
                        </DialogClose>
                        <Button type="submit">Ingresar</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
