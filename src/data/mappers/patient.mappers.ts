import type { PatientApiDto } from "#/utils/types";
import type { PatientEntity } from "#/core/entities/patient.entity";

export const PatientMapper = {
    fromApiToDomain(dto: PatientApiDto): PatientEntity {
        return {
            id: dto.ci,
            fullname: dto.nombre_apellido,
            birthdate: dto.fecha_nacimiento,
            gender: dto.sexo,
        };
    },

    fromApiArrayToDomainArray(dtos: PatientApiDto[]): PatientEntity[] {
        return dtos.map(this.fromApiToDomain);
    }
};