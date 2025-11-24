import type { Business, Patient, PatientFull } from "#/core/entities";
import type { PatientRepository } from "#/core/repositories/patient.repository";
import { PatientApi } from "#/data/api/patient.api.repository";
import { PatientBusinessMapper, PatientFullMapper, PatientMapper } from "#/data/mappers/patient.mappers";
import { getServerUrl } from "#/utils/functions";
import type { PatientFullApiDto } from "#/utils/types";

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

    async getPatientData(patient: { id: string; }): Promise<PatientFull> {
        const urlFull = getServerUrl('paciente', patient.id);
        const response = await fetch(urlFull)

        if (!response.ok) {
            throw new Error(`Error ${response.status}: Fallo al buscar el paciente`);
        }

        const dtos = await response.json() as PatientFullApiDto[];

        return PatientFullMapper.fromApiToDomain(dtos[0]);
    }

}