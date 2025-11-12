import type { Business } from "#/core/entities/Business";
import type { Patient } from "#/core/entities/patient.entity";
import type { PatientRepository } from "#/core/repositories/patient.repository";
import { PatientApi } from "#/data/api/patient.api.repository";
import { PatientBusinessMapper, PatientMapper } from "#/data/mappers/patient.mappers";

// Implementa el contrato PatientRepository
export class PatientRepositoryImpl implements PatientRepository {
    async searchPatients(
        params: {
            id?: string;
            fullname?: string;
        },
    ): Promise<Patient[]> {
        const dtos = await PatientApi.search({
            id: params.id,
            nombre_apellido: params.fullname,
        });

        return PatientMapper.fromApiArrayToDomainArray(dtos);
    }

    async getInsuranceCompany(patient: { id: string; }): Promise<Business[]> {
        const dtos = await PatientApi.getInsuranceCompany(patient.id);
        return PatientBusinessMapper.fromApiArrayToDomainArray(dtos);
    }
}