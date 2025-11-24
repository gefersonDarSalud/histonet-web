import type { Business, Patient, PatientFull } from "#/core/entities";
import type { PatientApiDto, PatientBusinessApiDto, PatientFullApiDto } from "#/utils/types";


export interface Mapper<Param, Return> {
    /**
     * Convierte un único Data Transfer Object (DTO) de la API 
     * a un único Objeto de Dominio.
     * @param dto El objeto DTO recibido de la API.
     * @returns El objeto de Dominio (limpio).
     */
    fromApiToDomain(dto: Param): Return;

    /**
     * Convierte un arreglo de Data Transfer Objects (DTOs) de la API 
     * a un arreglo de Objetos de Dominio.
     * @param dtos El arreglo de DTOs recibido de la API.
     * @returns El arreglo de Objetos de Dominio.
     */
    fromApiArrayToDomainArray(dtos: Param[]): Return[];
}


export const PatientMapper: Mapper<PatientApiDto, Patient> = {
    fromApiToDomain(dto: PatientApiDto): Patient {
        return {
            id: String(dto.id),
            code: dto.ci,
            fullname: dto.nombre_apellido,
            birthdate: dto.fecha_nacimiento,
            gender: dto.sexo,
        };
    },

    fromApiArrayToDomainArray(dtos: PatientApiDto[]): Patient[] {
        return dtos.map(this.fromApiToDomain);
    }
};

export const PatientBusinessMapper: Mapper<PatientBusinessApiDto, Business> = {
    fromApiToDomain(dto: PatientBusinessApiDto): Business {
        if (!dto || !dto.id) return {} as Business;
        const insurances = dto.aseguradoras?.map(aseguradora => {
            const feeSchedules = aseguradora.baremos?.map(baremo => ({
                id: Number(baremo.id),
                name: baremo.nombre,
            })) ?? [];
            return {
                id: aseguradora.id,
                name: aseguradora.nombre,
                code: aseguradora.rif,
                feeSchedules,
            };
        }) ?? null;

        const result = {
            id: dto.id,
            name: dto.nombre,
            code: dto.rif,
            insurances,
        } as Business

        return result;
    },

    fromApiArrayToDomainArray(dtos: PatientBusinessApiDto[]): Business[] {
        return dtos.map(dto => this.fromApiToDomain(dto));
    }
}


export const PatientFullMapper: Mapper<PatientFullApiDto, PatientFull> = {
    fromApiToDomain(dto: PatientFullApiDto): PatientFull {
        return {
            firstName: dto.nombre,
            lastName: dto.apellido,
            code: dto.ci,
            birthdate: dto.fecha_nacimiento,
            gender: dto.sexo,
            email: dto.correo,
            phone: dto.tlfn,
            address: dto.dir,
        }
    },

    fromApiArrayToDomainArray(dtos: PatientFullApiDto[]): PatientFull[] {
        return dtos.map(dto => this.fromApiToDomain(dto));
    }
}