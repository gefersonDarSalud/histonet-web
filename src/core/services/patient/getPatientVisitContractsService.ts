import type { Business } from "#/core/entities";
import type { PatientRepository } from "#/core/repositories/patientRepository";

export class GetPatientVisitContracts {
    private repository: PatientRepository;
    constructor(repository: PatientRepository) {
        this.repository = repository;
    }
    async execute(patient: { id: string }): Promise<Business[]> {
        return await this.repository.getVisitContracts({ id: patient.id });
    }
}