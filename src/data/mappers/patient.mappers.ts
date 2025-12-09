import type { Business, IdName, Mapper, Patient, PatientContracts, PatientRelationship } from "#/core/entities";
import type { PatientContractsResponse, PatientRelationshipNameResponse, PatientRelationshipResponse, PatientResponse } from "../types/patient";


export const PatientMapper: Mapper<PatientResponse, Patient> = {
    fromApiToDomain(dto: PatientResponse): Patient {
        return {
            id: String(dto.id),
            code: dto.ci,
            fullname: dto.nombre_apellido,
            birthdate: dto.fecha_nacimiento,
            gender: dto.sexo,
        };
    },

    fromApiArrayToDomainArray(dtos: PatientResponse[]): Patient[] {
        return dtos.map(this.fromApiToDomain);
    }
};

export const PatientBusinessMapper: Mapper<PatientBusinessRe, Business> = {
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


export const PatientFullMapper: Mapper<PatientResponse, Patient> = {
    fromApiToDomain(dto: PatientResponse): Patient {
        return {
            id: dto.id ?? dto.ci,
            firstName: dto.nombre,
            lastName: dto.apellido,
            code: dto.ci,
            birthdate: dto.fecha_nacimiento,
            gender: dto.sexo,
            email: dto.correo,
            phone: dto.tlfn,
            address: dto.dir,
            isActive: dto.status !== '1' ? true : false,
        }
    },

    fromApiArrayToDomainArray(dtos: PatientResponse[]): Patient[] {
        return dtos.map(dto => this.fromApiToDomain(dto));
    }
}

export const PatientContractsMapper: Mapper<PatientContractsResponse, PatientContracts> = {
    fromApiToDomain(dto: PatientContractsResponse): PatientContracts {
        return {
            row: dto.id,
            business: {
                id: dto.id_empresa,
                name: dto.empresa,
            },
            insurance: {
                id: dto.id_aseguradora ?? '',
                name: dto.aseguradora ?? '',
            },
            departament: {
                id: dto.id_dependencia,
                name: dto.dependecia,
            },
            feeSchedule: {
                id: dto.id_baremo,
                name: dto.baremo,
            }
        }
    },
    fromApiArrayToDomainArray(dtos: PatientContractsResponse[]): PatientContracts[] {
        return dtos.map(dto => this.fromApiToDomain(dto));
    }
}

export const PatientRelationShipNameMapper: Mapper<PatientRelationshipNameResponse, IdName> = {
    fromApiToDomain(dto: PatientRelationshipNameResponse): IdName {
        return {
            id: dto.id_parentesco,
            name: dto.parentesco
        }
    },

    fromApiArrayToDomainArray(dtos: PatientRelationshipNameResponse[]): IdName[] {
        return dtos.map(dto => this.fromApiToDomain(dto));
    }
}

export const PatientRelationsMapper: Mapper<PatientRelationshipResponse, PatientRelationship> = {
    fromApiToDomain(dto: PatientRelationshipResponse): PatientRelationship {
        return {
            id_patient: dto.id_paciente,
            id_client: dto.id_titular,
            patient_code: dto.cedula,
            fullname: dto.nombre_apellido,
            id_relationship: dto.id_parentesco,
            relationship: dto.parentesco,
        }
    },
    fromApiArrayToDomainArray(dtos: PatientRelationshipResponse[]): PatientRelationship[] {
        return dtos.map(dto => this.fromApiToDomain(dto));
    }
}