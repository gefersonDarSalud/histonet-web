import type { IService } from "#/core/entities";
import type { VisitRepositorySearchParams } from "#/core/repositories/visitRepository";
import type { SearchResponse } from "#/data/mappers/visitMappers";
import type { VisitRepository } from "#/infrastructure/visitRepository";

export class SearchVisitService implements IService<VisitRepositorySearchParams, SearchResponse[]> {
    private repository: VisitRepository;

    constructor(repository: VisitRepository) {
        this.repository = repository;
    }

    async execute(params: VisitRepositorySearchParams): Promise<SearchResponse[]> {
        return await this.repository.search(params);
    }
}