import type { PatientFull } from "#/core/entities";
import type { PatientRepository } from "#/core/repositories/patientRepository";

export class GetPatientDataService {
    private repository: PatientRepository;
    constructor(repository: PatientRepository) {
        this.repository = repository;
    }
    async execute(patient: string): Promise<PatientFull> {
        return await this.repository.getData({ id: patient });;
    }
}