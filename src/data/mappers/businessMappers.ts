import type { Business, IdName, Mapper } from "#/core/entities";

export type SearchApi = {
    ID: number;
    rif: string;
    nombre: string;
}

type DepartamentsApi = {
    id: string;
    nombre: string;
}

type InsuranceApi = {
    id: string;
    nombre: string;
}

type FeeScheduleApi = {
    id: string;
    nombre: string;
}

export type GetListApi = DepartamentsApi | InsuranceApi | FeeScheduleApi

export const searchMapper: Mapper<SearchApi, Business> = {
    fromApiToDomain(dto: SearchApi): Business {
        return {
            id: dto.ID.toString(),
            code: dto.rif,
            name: dto.nombre
        }
    },

    fromApiArrayToDomainArray(dtos: SearchApi[]): Business[] {
        const result = dtos.map(dto => this.fromApiToDomain(dto));
        return result;
    }
};


export const getListMapper: Mapper<GetListApi, IdName> = {
    fromApiToDomain(dto: GetListApi): IdName {
        return {
            id: dto.id,
            name: dto.nombre
        }
    },

    fromApiArrayToDomainArray(dtos: GetListApi[]): IdName[] {
        const result = dtos.map(dto => this.fromApiToDomain(dto));
        return result;
    }
};