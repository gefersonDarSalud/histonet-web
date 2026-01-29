
import { getServerUrl } from "#/utils/functions";
import type { VisitRepository as VisitRepositoryCore, VisitRepositorySearchParams } from "#/core/repositories/visitRepository";
import { getMapper, seachMapper, type SearchApi, type SearchResponse } from "#/data/mappers/visitMappers";
import type { MedicalVisitResponse } from "#/data/types/visit";
import type { MedicalVisitNursingDetails } from "#/core/entities";



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

    async get(id: string): Promise<MedicalVisitNursingDetails> {
        const urlFull = getServerUrl('visita', id);
        const response = await fetch(urlFull);
        if (!response.ok) throw new Error(`Error ${response.status}: Fallo al buscar la visita`);
        const dto = await response.json() as MedicalVisitResponse;
        return getMapper.fromApiToDomain(dto);
    }

}