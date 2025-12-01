import type { Mapper } from "#/core/entities";

export type SearchApi = {
    id: string;
    paciente: string;
    AseguradoraNombre?: string;
    EmpresaNombre?: string;
    clave?: string;
    motivo?: string;
    fecha_visita?: string;
    statusNombre?: string;
    nro_documento?: string;
    Cedula?: string;
    hora?: string;
    observacion?: string;
    infcomplementaria?: string;
}

export type SearchResponse = {
    id: string;
    patient: string;
    insurance: string;
    business: string;
    password: string;
    topic: string;
    visit_date: string;
    status: string;
    code: string;
    patient_ci: string;
    time: string;
    observation: string;
    information: string;
}

export const seachMapper: Mapper<SearchApi, SearchResponse> = {
    fromApiToDomain(dto: SearchApi): SearchResponse {
        return {
            id: dto.id,
            patient: dto.paciente,
            insurance: dto.AseguradoraNombre ?? '',
            business: dto.EmpresaNombre ?? '',
            password: dto.clave ?? '',
            topic: dto.motivo ?? '',
            visit_date: dto.fecha_visita ?? '',
            status: dto.statusNombre ?? '',
            code: dto.nro_documento ?? '',
            patient_ci: dto.Cedula ?? '',
            time: dto.hora ?? '',
            observation: dto.observacion ?? '',
            information: dto.infcomplementaria ?? '',
        };
    },

    fromApiArrayToDomainArray(dtos: SearchApi[]): SearchResponse[] {
        return dtos.map(this.fromApiToDomain);
    }
};