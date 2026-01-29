import type { Business, IService } from "#/core/entities";
import type { BusinessRepository } from "#/core/repositories/businessRepository";

export class SearchBusinessService implements IService<string, Business[]> {
    private repository: BusinessRepository;

    constructor(repository: BusinessRepository) {
        this.repository = repository;
    }

    async execute(business: string): Promise<Business[]> {
        return this.repository.search(business);
    }
}