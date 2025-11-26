import type { Business } from "../entities";

export interface BusinessRepository {
    search(business: string): Promise<Business[]>;
}