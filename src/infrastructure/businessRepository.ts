import type { Business, IdName } from "#/core/entities";
import type { BusinessRepository as BusinessRepositoryCore } from "#/core/repositories/businessRepository";
import { getListMapper, searchMapper, type GetListApi, type SearchApi } from "#/data/mappers/businessMappers";
import { getServerUrl } from "#/utils/functions";

export class BusinessRepository implements BusinessRepositoryCore {
    async search(business: string): Promise<Business[]> {
        const urlFull = getServerUrl('empresa', { nombre: business });
        const response = await fetch(urlFull)
        if (!response.ok) {
            throw new Error(`Error ${response.status}: Fallo al buscar las empresas`);
        }
        const dtos = await response.json() as SearchApi[];
        return searchMapper.fromApiArrayToDomainArray(dtos);
    }

    async datalist(id: string, list: 'DEPARTAMENTO' | 'ASEGURADORA' | 'BAREMO'): Promise<IdName[]> {
        const urlFull = getServerUrl(`empresa/${id}`, { lista: list });
        const response = await fetch(urlFull)
        if (!response.ok) {
            throw new Error(`Error ${response.status}: Fallo al buscar los datos de la empresa`);
        }
        const dtos = await response.json() as GetListApi[];
        return getListMapper.fromApiArrayToDomainArray(dtos)
    }
}