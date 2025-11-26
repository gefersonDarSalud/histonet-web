import type { PatientContracts } from "#/core/entities";
import type { PatientRepository } from "#/core/repositories/patientRepository";

export class GetPatientContracts {
    private repository: PatientRepository;
    constructor(repository: PatientRepository) {
        this.repository = repository;
    }
    async execute(patient: string): Promise<PatientContracts[]> {
        return await this.repository.getContracts({ id: patient });
    }
}