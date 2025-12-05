import type { DeleteRelationship, Response } from "#/core/entities";
import type { PatientRepository } from "#/core/repositories/patientRepository";


export type DeletePatientRelationshipServiceProps = {
    beneficary: string;
    owner: string;
}

export class DeletePatientRelationshipService {
    private repository: PatientRepository;

    constructor(repository: PatientRepository) {
        this.repository = repository;
    }

    async execute({ beneficary, owner }: DeletePatientRelationshipServiceProps): Promise<Response> {
        const contract: DeleteRelationship = {
            id_paciente: beneficary,
            id_titular: owner,
            CO_US: 'web',
        }
        return await this.repository.deleteRelationship(contract);
    }
}