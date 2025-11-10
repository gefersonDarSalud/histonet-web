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
import { useState } from "react"
import type { PatientState } from "#/utils/types"


export const NewCall = () => {
    const patientsTypes = [
        {
            name: "Particular",
            value: "Particular"
        },
        {
            name: "Privado",
            value: "Privado"
        },
        {
            name: "Asegurado",
            value: "Asegurado"
        },
        {
            name: "Pam",
            value: "Pam"
        },
        {
            name: "Otro",
            value: "Otro"
        }
    ]

    const listBusiness = [
        {
            value: "Metro de caracas",
            label: "Metro de caracas"
        },
        {
            value: "Seguros Altamira",
            label: "Seguros Altamira"
        },
        {
            value: "Seguros Qualitas",
            label: "Seguros Qualitas"
        },
        {
            value: "Proseguros",
            label: "Proseguros"
        },
    ]

    const [patient, setPatient] = useState<PatientState>({
        id: null,
        fullname: null,
        birthdate: null,
    });

    const handlePatientChange = (field: keyof PatientState, value: string | null) => {
        setPatient(prev => ({
            ...prev,
            [field]: value
        }));
    };

    console.log("Estado del Paciente en NewCall:", patient); // Para debug
    return (
        <Dialog>
            <form>
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
                        <div className="w-full md:max-w-md">
                            <PatientCombobox patient={patient} setPatient={setPatient} />
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
                                            value={patient.birthdate ?? ''}
                                            onChange={(e) => handlePatientChange('birthdate', e.target.value)}
                                        />
                                    </Field>
                                </FieldGroup>

                                {/* config data */}
                                <FieldGroup className="grid grid-cols-2 gap-4">
                                    <Field>
                                        <FieldLabel htmlFor="newCall-business">
                                            Empresa
                                        </FieldLabel>
                                        <div id="newCall-business">
                                            <BusinessCombobox listBusiness={listBusiness} />
                                        </div>
                                    </Field>
                                    <Field>
                                        <FieldLabel htmlFor="newCall-patientsTypes">
                                            Tipo de Paciente
                                        </FieldLabel>
                                        <PatientType id={"newCall-patientsTypes"} patientsTypes={patientsTypes} />
                                    </Field>
                                </FieldGroup>
                            </FieldSet>
                            <FieldSeparator />

                        </FieldGroup>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
