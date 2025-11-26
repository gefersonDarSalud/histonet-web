import type { BasicResponse } from "../entities";

export type AuthResult = {
    accessToken: string;
    refreshToken: string;
};

export type AuthServiceResponse = {
    data: BasicResponse;
    auth: AuthResult;
};

export interface UserRepository {
    login(credentials: { email: string; password: string; }): Promise<AuthServiceResponse>;
}