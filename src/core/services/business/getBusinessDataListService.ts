import type { IdName, IService } from "#/core/entities";
import type { BusinessRepository } from "#/core/repositories/businessRepository";

type props = {
    id: string,
    list: 'DEPARTAMENTO' | 'ASEGURADORA' | 'BAREMO'
}

export class GetBusinessDataListService implements IService<props, IdName[]> {
    private repository: BusinessRepository;

    constructor(repository: BusinessRepository) {
        this.repository = repository;
    }

    execute = async (param: props): Promise<IdName[]> => {
        return this.repository.datalist(param.id, param.list);
    }
}