import type { IService, PatientRelationship } from "#/core/entities";
import type { PatientRepository } from "#/core/repositories/patientRepository";

type props = {
    patient: string;
    list: 'BENEFICIARIO' | 'TITULAR';
}

export class GetPatientRelationshipService implements IService<props, PatientRelationship[]> {
    constructor(private repository: PatientRepository) { }
    execute = async ({ patient, list }: props): Promise<PatientRelationship[]> => {
        console.log("await this.repository.getRelationship(patient, list)", await this.repository.getRelationship(patient, list));
        return await this.repository.getRelationship(patient, list);

    }
}