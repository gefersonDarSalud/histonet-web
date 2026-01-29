import type { Mapper, Response } from "#/core/entities";

export type UserLoginApi = {
    STATUS: number;
    RESULTADO: string;
    token: string;
}

export type UserLoginResponse = Response



export const UserLoginMapper: Mapper<UserLoginApi, UserLoginResponse> = {
    fromApiToDomain(dto: UserLoginApi): UserLoginResponse {
        return {
            status: dto.STATUS,
            resultado: dto.RESULTADO,
        }
    },

    fromApiArrayToDomainArray(dtos: UserLoginApi[]): UserLoginResponse[] {
        return dtos.map(dto => (this.fromApiToDomain(dto)));
    }
};