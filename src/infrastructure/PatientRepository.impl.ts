import type { PatientEntity } from "#/core/entities/patient.entity";
import type { PatientRepository } from "#/core/repositories/patient.repository";
import { PatientApi } from "#/data/api/patient.api.repository";
import { PatientMapper } from "#/data/mappers/patient.mappers";


// Implementa el contrato PatientRepository
export class PatientRepositoryImpl implements PatientRepository {
    async searchPatients(
        params: {
            id?: string;
            fullname?: string;
        },
    ): Promise<PatientEntity[]> {
        const dtos = await PatientApi.search({ id: params.id, fullname: params.fullname });
        return PatientMapper.fromApiArrayToDomainArray(dtos);
    }
}