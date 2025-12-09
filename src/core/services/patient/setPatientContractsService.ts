import type { Response } from "#/core/entities";
import type { PatientRepository } from "#/core/repositories/patientRepository";
import type { NewContractsRequest } from "#/data/types/patient";


export type SetPatientContractsServiceProps = {
    business: string;
    feeSchedule: string;
    departament: string;
    insurance: string | null;
}

export class SetPatientContractsService {
    private repository: PatientRepository;

    constructor(repository: PatientRepository) {
        this.repository = repository;
    }

    async execute(patientId: string, contracts: SetPatientContractsServiceProps): Promise<Response> {
        const newContracts: NewContractsRequest = {
            id_paciente: patientId,
            id_empresa: contracts.business,
            id_dependencia: contracts.departament,
            id_baremo: contracts.feeSchedule ?? '',
            id_aseguradora: contracts.insurance,
            CO_US: 'web',
        }
        return await this.repository.setContracts(newContracts);
    }
}