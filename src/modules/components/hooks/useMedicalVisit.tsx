import { MedicalVisitContext } from "#/context";
import { useContext } from "react";

export const useMedicalVisit = () => {
    const context = useContext(MedicalVisitContext);
    if (context === undefined) throw new Error('useMedicalVisit debe usarse dentro de un MedicalVisitProvider');
    return context;
};