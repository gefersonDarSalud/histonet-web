import type { UserLoginResponse } from "#/data/mappers/userMapper";


export interface UserRepository {
    login(credentials: { email: string; password: string; }): Promise<UserLoginResponse>;
}