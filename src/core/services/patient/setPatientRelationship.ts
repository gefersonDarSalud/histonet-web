import type { Response } from "#/core/entities";
import type { PatientRepository } from "#/core/repositories/patientRepository";
import type { NewRelationshipRequest } from "#/data/types/patient";

export type SetPatientRelationshipServiceProps = {
    beneficiary: string;
    owner: string;
    relationship: string;
}

export class SetPatientRelationshipService {
    constructor(private repository: PatientRepository) { }

    async execute(relationship: SetPatientRelationshipServiceProps): Promise<Response> {
        const newRelationship: NewRelationshipRequest = {
            id_paciente: relationship.beneficiary,
            id_titular: relationship.owner,
            id_parentesco: relationship.relationship,
            CO_US: 'web',
        }
        return await this.repository.setRelationship(newRelationship);
    }
}