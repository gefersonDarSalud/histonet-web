import { AtSign, Badge, CalendarClock, FileUser, IdCard, Phone, User } from "lucide-react";

import { capitalizeText, formatPersonalId } from "#/utils/functions";
import { useMedicalVisit } from "@/components/hooks/useMedicalVisit";
import { DataField } from "../dataField";

export const AdmissionDataPanelPatient = () => {
    const { state: visit } = useMedicalVisit();

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <User className="w-5 h-5 text-primary" /> Información del Paciente
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 text-sm">
                <DataField label="Nombre Completo" value={capitalizeText(visit.patient.fullname)} colSpan="col-span-2 md:col-span-3 lg:col-span-2" large >
                    <FileUser />
                </DataField>
                <DataField label="Cédula del Paciente" value={formatPersonalId(visit.patient.id)} >
                    <IdCard />
                </DataField>
                <DataField label="Fecha de Nacimiento" value={`${visit.patient.birthdate !== '' ? visit.patient.birthdate : 'N/A'}`} >
                    <CalendarClock />
                </DataField>
                <DataField label="Teléfono" value={visit.patient.phone || 'N/A'} >
                    <Phone />
                </DataField>
                <DataField label="Correo" value={visit.patient.email || 'N/A'} colSpan="col-span-2" >
                    <AtSign />
                </DataField>
                <div className="flex items-center gap-2 mt-2 col-span-full">
                    <Badge className="w-5 h-5 text-primary" />
                    <span className="font-medium text-sm text-gray-700 dark:text-gray-300">Viene de visitas anteriores</span>
                </div>
            </div>
        </div>
    );

}