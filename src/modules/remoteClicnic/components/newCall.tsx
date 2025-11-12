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

import { BusinessCombobox } from "./Business.combobox"
import { PatientType } from "./patientType"
import { PatientCombobox } from "./Patient.combobox"
import { useEffect, useState } from "react"
import type { PatientState } from "#/utils/types"
import type { TypeVisit } from "#/core/entities/typeVisit.entity"
import type { Business } from "#/core/entities/Business"
import { Loader2 } from "lucide-react"
import { PatientRepositoryImpl } from "#/infrastructure/PatientRepository.impl"

const patientRepository = new PatientRepositoryImpl();


export const NewCall = () => {
    const typeVisit: TypeVisit[] = ["particular", "afiliado", "asegurado"]

    const [patient, setPatient] = useState<PatientState>({
        id: null,
        fullname: null,
        birthdate: null,
    });

    const [visitType, setVisitType] = useState<TypeVisit | null>(null);
    const [selectedBusiness, setSelectedBusiness] = useState<string | null>(null);
    const [businessList, setBusinessList] = useState<Business[]>([]);
    const [isBusinessLoading, setIsBusinessLoading] = useState(false);

    const isInsuredPatient = visitType === 'asegurado';
    const patientIdExists = !!patient.id;

    useEffect(() => {
        if (isInsuredPatient && patientIdExists) {

            const fetchBusinesses = async () => {
                setIsBusinessLoading(true);
                setBusinessList([]);
                setSelectedBusiness(null);

                try {
                    const patientParam = { id: patient.id! };
                    setBusinessList(await patientRepository.getInsuranceCompany(patientParam));
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
        console.log("Datos de la llamada a enviar:", { patient, visitType, selectedBusiness });
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
                                <FieldLegend>Configuración</FieldLegend>
                                <FieldGroup className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="newCall-patientsTypes">
                                            Tipo de Paciente
                                        </FieldLabel>
                                        <PatientType
                                            typeVisit={typeVisit}
                                            value={visitType}
                                            onValueChange={setVisitType}
                                        />
                                    </Field>
                                    {isInsuredPatient ?
                                        <Field>
                                            <FieldLabel htmlFor="newCall-business">
                                                Empresa {isBusinessLoading && <Loader2 className="ml-2 h-4 w-4 animate-spin inline" />}
                                            </FieldLabel>
                                            <div id="newCall-business">
                                                <BusinessCombobox
                                                    listBusiness={businessList}
                                                    selectedBusinessId={selectedBusiness}
                                                    onValueChange={setSelectedBusiness}
                                                    disabled={isBusinessLoading || businessList.length === 0}
                                                />
                                            </div>
                                        </Field>
                                        : null
                                    }
                                </FieldGroup>
                            </FieldSet>
                            <FieldSeparator />

                        </FieldGroup>
                    </div>
                    <DialogFooter>
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
