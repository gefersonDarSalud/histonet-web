import type { Mapper, Response } from "#/core/entities";

export type UserLoginApi = {
    STATUS: number;
    RESULTADO: string;
}

export const UserLoginMapper: Mapper<UserLoginApi, Response> = {
    fromApiToDomain(dto: UserLoginApi): Response {
        return {
            status: dto.STATUS,
            resultado: dto.RESULTADO,
        }
    },

    fromApiArrayToDomainArray(dtos: UserLoginApi[]): Response[] {
        return dtos.map(dto => (this.fromApiToDomain(dto)));
    }
};