import { Separator } from "@/components/ui/separator";
import { AdmissionDataPanelVisit } from "./admissionDataPanelVisit";
import { AdmissionDataPanelPatient } from "./admissionDataPanelPatient";
import { AdmissionDataPanelContract } from "./admissionDataPanelContract";

export const AdmissionDataPanel = () => {
    return (
        <div className="bg-white dark:bg-[#1e1e1e] p-6 rounded-xl border border-gray-200 dark:border-[#2d2d2d] shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <AdmissionDataPanelPatient />
                    <Separator />
                    <AdmissionDataPanelContract />
                </div>
                <div className="flex">
                    <Separator orientation='vertical' className="w-fit" />
                    <AdmissionDataPanelVisit />
                </div>
            </div>
        </div>
    );
};