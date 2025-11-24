import type { BasicResponse, Mapper } from "#/core/entities";

export type UserLoginApi = {
    STATUS: string;
    RESULTADO: string;
}

export const UserLoginMapper: Mapper<UserLoginApi, BasicResponse> = {
    fromApiToDomain(dto: UserLoginApi): BasicResponse {
        console.log("dto", dto);
        console.log("Number(dto.status) === 1", Number(dto.STATUS) === 1);

        return {
            status: Number(dto.STATUS) === 1 ? 'success' : 'failed',
            message: dto.RESULTADO,
        }
    },

    fromApiArrayToDomainArray(dtos: UserLoginApi[]): BasicResponse[] {
        return dtos.map(this.fromApiToDomain);
    }
};