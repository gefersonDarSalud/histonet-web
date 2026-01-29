import { Building2, CircleDollarSign, Handshake, ShieldCheck, UserStar } from "lucide-react";
import { useMedicalVisit } from "@/components/hooks/useMedicalVisit";
import { capitalizeText } from "#/utils/functions";
import { DataField } from "../dataField";

export const AdmissionDataPanelContract = () => {
    const { state: visit } = useMedicalVisit();
    return (
        <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-primary" /> Información del Seguro
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 text-sm">
                <DataField label="Tipo de Contrato" value="Asegurado">
                    <Handshake />
                </DataField>
                <DataField label="Baremo" value={visit.feeSchedule.name}>
                    <CircleDollarSign />
                </DataField>
                <DataField label="Titular" value={capitalizeText(visit.patient.fullname)} colSpan="col-span-2 md:col-span-3">
                    <UserStar />
                </DataField>
                <DataField label="Dependencia" value="Recursos Humanos" colSpan="col-span-2">
                    <Building2 />
                </DataField>

            </div>
        </div>
    );
}