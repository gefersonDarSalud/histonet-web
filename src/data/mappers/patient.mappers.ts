import type { PatientApiDto, PatientBusinessApiDto } from "#/utils/types";
import type { Patient } from "#/core/entities/patient.entity";
import type { Business } from "#/core/entities/Business";

export const PatientMapper = {
    fromApiToDomain(dto: PatientApiDto): Patient {
        return {
            id: dto.ci,
            fullname: dto.nombre_apellido,
            birthdate: dto.fecha_nacimiento,
            gender: dto.sexo,
        };
    },

    fromApiArrayToDomainArray(dtos: PatientApiDto[]): Patient[] {
        return dtos.map(this.fromApiToDomain);
    }
};

export const PatientBusinessMapper = {
    fromApiToDomain(dto: PatientBusinessApiDto): Business {
        return {
            id: dto.id,
            name: dto.nombre,
            code: dto.rif,
            insurance: dto.aseguradora ? {
                id: dto.aseguradora.id,
                name: dto.aseguradora.nombre,
                code: dto.aseguradora.rif,
            } : null,
        }
    },

    fromApiArrayToDomainArray(dtos: PatientBusinessApiDto[]): Business[] {
        return dtos.map(this.fromApiToDomain);
    }
}