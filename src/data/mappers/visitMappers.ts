import type { Mapper, MedicalVisitNursingDetails } from "#/core/entities";
import { mapStatus, mapVisitType } from "#/utils/functions";
import type { MedicalVisitResponse } from "../types/visit";

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


export const getMapper: Mapper<MedicalVisitResponse, MedicalVisitNursingDetails> = {

    fromApiToDomain(dto: MedicalVisitResponse): MedicalVisitNursingDetails {
        return {
            visitNumber: dto.nro_documento,
            visitType: mapVisitType(dto.tipo),
            status: mapStatus(dto.tipo),
            patient: dto.ci && dto.nombre_apellido ? {
                id: dto.ci,
                code: dto.ci,
                fullname: dto.nombre_apellido,
                birthdate: '',
            } : null,

            dateTime: new Date(dto.fecha_visita).toISOString(),

            feeSchedule: {
                id: dto.id_baremo.toString(),
                name: dto.nombre_baremo,
            },

            motive: {
                id: dto.tipo.toString(),
                name: dto.motivo,
            },

            // Mapeo de Datos Biométricos (Campo estructurado extra del modelo de dominio)
            biometrics: {
                size: dto.talla,
                weight: dto.peso,
                bodyMassIndex: dto.imc,
                pressure: dto.presion,
                temperature: dto.temperatura,
                pulse: dto.pulso,
                oxygenSaturation: dto.sp02,
            }
        };
    },

    fromApiArrayToDomainArray(dtos: MedicalVisitResponse[]): MedicalVisitNursingDetails[] {
        return dtos.map(this.fromApiToDomain);
    }
};