import type { Business, Patient, PatientContracts, PatientFull } from "#/core/entities";
import type { PatientRepository as PatientRepositoryCore } from "#/core/repositories/patientRepository";
import { PatientBusinessMapper, PatientContractsMapper, PatientFullMapper, PatientMapper } from "#/data/mappers/patient.mappers";
import { getServerUrl } from "#/utils/functions";
import type { PatientContractsApiDto, PatientFullApiDto } from "#/utils/types";

export class PatientRepository implements PatientRepositoryCore {
    async search(params: { id?: string, fullname?: string }): Promise<Patient[]> {
        const urlFull = getServerUrl('paciente', {
            id: params.id,
            nombre_apellido: params.fullname,
        });
        const response = await fetch(urlFull);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: Fallo al buscar pacientes`);
        }
        const dtos = await response.json();
        return PatientMapper.fromApiArrayToDomainArray(dtos);
    }

    async getVisitContracts(patient: { id: string; }): Promise<Business[]> {
        const urlFull = getServerUrl('paciente', patient);
        const response = await fetch(urlFull);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: Fallo al buscar pacientes`);
        }
        const dtos = await response.json();
        return PatientBusinessMapper.fromApiArrayToDomainArray(dtos);
    }

    async getData(patient: { id: string; }): Promise<PatientFull> {
        const urlFull = getServerUrl('paciente', patient.id);
        const response = await fetch(urlFull)
        if (!response.ok) {
            throw new Error(`Error ${response.status}: Fallo al buscar el paciente`);
        }
        const dtos = await response.json() as PatientFullApiDto;
        const patientMapped = PatientFullMapper.fromApiToDomain(dtos);
        return patientMapped
    }

    async getContracts(patient: { id: string; }): Promise<PatientContracts[]> {
        const urlFull = getServerUrl('paciente//empresa', patient.id);
        const response = await fetch(urlFull)
        if (!response.ok) {
            throw new Error(`Error ${response.status}: Fallo al buscar las empresas`);
        }
        const dtos = await response.json() as PatientContractsApiDto[];
        return PatientContractsMapper.fromApiArrayToDomainArray(dtos);
    }
}