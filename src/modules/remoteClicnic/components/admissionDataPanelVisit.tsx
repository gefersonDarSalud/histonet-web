import { Clock, HandCoins, Scroll, ShieldAlert } from "lucide-react";
import { VisitDetailItem } from "./visitDetailItem";
import { formatDateTime } from "#/utils/functions";
import { useMedicalVisit } from "@/components/hooks/useMedicalVisit";
import { MedicinePanaIcon } from "./icons";


export const AdmissionDataPanelVisit = () => {
    const { state: visit } = useMedicalVisit();
    const formattedDate = formatDateTime(visit.dateTime);

    return (
        <div className="space-y-6 lg:border-l lg:border-gray-200 dark:lg:border-[#2d2d2d] lg:pl-8 pl-10 pt-5  w-full">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <Scroll className="w-5 h-5 text-primary" /> Detalles de la Visita
            </h3>
            <VisitDetailItem label="Fecha y Hora" value={formattedDate} >
                <Clock className="w-5 h-5 text-primary" />
            </VisitDetailItem>
            <VisitDetailItem
                label="Moneda"
                value="Bolivares"
            >
                <HandCoins className="w-5 h-5 text-primary" />
            </VisitDetailItem>
            <VisitDetailItem
                label="Motivo de la Visita"
                value={visit.motive.name}
            >
                <ShieldAlert className="w-5 h-5 text-primary" />
            </VisitDetailItem>
            <MedicinePanaIcon />
        </div>
    );
}