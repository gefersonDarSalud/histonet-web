import type { Business, IdName } from "../entities";

export interface BusinessRepository {
    search(business: string): Promise<Business[]>;
    datalist(id: string, list: 'DEPARTAMENTO' | 'ASEGURADORA' | 'BAREMO'): Promise<IdName[]>;
}