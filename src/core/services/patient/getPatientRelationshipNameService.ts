
import type { IdName, IService } from "#/core/entities";
import type { PatientRepository } from "#/core/repositories/patientRepository";

export class GetPatientRelationshipNameService implements IService<null, IdName[]> {
    constructor(private repository: PatientRepository) { }
    execute = async (): Promise<IdName[]> => {
        return await this.repository.getRelationshipName();
    }
}