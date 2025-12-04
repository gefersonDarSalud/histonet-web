
import { getServerUrl } from "#/utils/functions";
import type { VisitRepository as VisitRepositoryCore, VisitRepositorySearchParams } from "#/core/repositories/visitRepository";
import { seachMapper, type SearchApi, type SearchResponse } from "#/data/mappers/visitMappers";



export class VisitRepository implements VisitRepositoryCore {
    async search(params: VisitRepositorySearchParams): Promise<SearchResponse[]> {
        const urlFull = getServerUrl('visita', params);
        const response = await fetch(urlFull);
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Error de red o API desconocido.' }));
            throw new Error(errorData.message || `Fallo en el login. Estado: ${response.status}`);
        }
        const dtos = await response.json() as SearchApi[];
        return seachMapper.fromApiArrayToDomainArray(dtos);
    }

}