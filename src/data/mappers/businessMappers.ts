import type { Business, Mapper } from "#/core/entities";

export type SearchApi = {
    id: number;
    rif: string;
    nombre: string;
}

export const searchMapper: Mapper<SearchApi, Business> = {
    fromApiToDomain(dto: SearchApi): Business {
        return {
            id: dto.id.toString(),
            code: dto.rif,
            name: dto.nombre
        }
    },

    fromApiArrayToDomainArray(dtos: SearchApi[]): Business[] {
        return dtos.map(this.fromApiToDomain);
    }
};