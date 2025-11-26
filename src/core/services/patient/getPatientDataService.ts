import type { PatientFull } from "../entities";
import type { PatientRepository } from "../repositories/patient.repository";

export class GetPatientDataService {
    private repository: PatientRepository;
    constructor(repository: PatientRepository) {
        this.repository = repository;
    }
    async execute(patient: string): Promise<PatientFull> {
        return await this.repository.getPatientData({ id: patient });;
    }
}