import type { MedicalVisitResponse } from "#/data/types/visit";
import type { MedicalVisitNursingDetails } from "../entities";

export type VisitRepositorySearchParams = {
    inicio: string;
    fin: string;
    texto?: string;
    compania: string;
    sucursal: string;
    anuladas?: string;
    cantidad: string;
    pagina: string;
}

export interface VisitRepository {
    search(params: VisitRepositorySearchParams): Promise<any[]>;
    get(id: string): Promise<MedicalVisitNursingDetails>;
}