import type { IService } from "#/core/entities";
import type { UserLoginResponse } from "#/data/mappers/userMapper";
import type { UserRepository } from "#/infrastructure/userRepository";

type AuthServiceProps = {
    email: string;
    password: string;
};

type AuthServiceDependencies = {
    userRepository: UserRepository;
};

export class AuthService implements IService<AuthServiceProps, UserLoginResponse> {
    private userRepository: UserRepository;

    constructor({ userRepository }: AuthServiceDependencies) {
        this.userRepository = userRepository;
    }

    async execute({ email, password }: AuthServiceProps): Promise<UserLoginResponse> {
        if (!email || !password) throw new Error("El email y la contraseña son obligatorios.");
        const result = await this.userRepository.login({ email, password });
        return result;
    }
}