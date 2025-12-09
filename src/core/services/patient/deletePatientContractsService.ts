import type { Response } from "#/core/entities";
import type { PatientRepository } from "#/core/repositories/patientRepository";
import type { DeleteContractsRequest } from "#/data/types/patient";


export type DeletePatientContractsServiceProps = {
    business: string;
    insurance: string | null;
}

export class DeletePatientContractsService {
    private repository: PatientRepository;

    constructor(repository: PatientRepository) {
        this.repository = repository;
    }

    async execute(patientId: string, contracts: DeletePatientContractsServiceProps): Promise<Response> {
        const deleteContracts: DeleteContractsRequest = {
            id_paciente: patientId,
            id_empresa: contracts.business,
            id_aseguradora: contracts.insurance,
            CO_US: 'web',
        }
        return await this.repository.deleteContracts(deleteContracts);
    }
}