import type { IService, MedicalVisitNursingDetails } from "#/core/entities";
import type { VisitRepository } from "#/core/repositories/visitRepository";
import type { MedicalVisitResponse } from "#/data/types/visit";

export class GetMedicalVisitService implements IService<string, MedicalVisitNursingDetails> {
    constructor(private repository: VisitRepository) { }
    execute = async (id: string): Promise<MedicalVisitNursingDetails> => {
        return await this.repository.get(id);
    }
}