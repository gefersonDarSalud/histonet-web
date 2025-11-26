import type { Business } from "#/core/entities";
import type { BusinessRepository as BusinessRepositoryCore } from "#/core/repositories/businessRepository";
import { searchMapper, type SearchApi } from "#/data/mappers/businessMappers";
import { getServerUrl } from "#/utils/functions";

export class BusinessRepository implements BusinessRepositoryCore {
    async search(business: string): Promise<Business[]> {
        const urlFull = getServerUrl('empresa', business);
        const response = await fetch(urlFull)
        if (!response.ok) {
            throw new Error(`Error ${response.status}: Fallo al buscar las empresas`);
        }
        const dtos = await response.json() as SearchApi[];
        return searchMapper.fromApiArrayToDomainArray(dtos);
    }
}