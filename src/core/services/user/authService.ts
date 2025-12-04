import type { IService } from "#/core/entities";
import type { AuthServiceResponse } from "#/core/repositories/userRepository";
import type { UserRepository } from "#/infrastructure/userRepository";

type AuthServiceProps = {
    email: string;
    password: string;
};

type AuthServiceDependencies = {
    userRepository: UserRepository;
};

export class AuthService implements IService<AuthServiceProps, AuthServiceResponse> {
    private userRepository: UserRepository;

    constructor({ userRepository }: AuthServiceDependencies) {
        this.userRepository = userRepository;
    }

    async execute({ email, password }: AuthServiceProps): Promise<AuthServiceResponse> {
        if (!email || !password) throw new Error("El email y la contraseña son obligatorios.");

        try {
            const result = await this.userRepository.login({ email, password });
            if (result.data.status !== 'success') throw new Error(result.data.message);
            return result;
        }

        catch (error) {
            console.error('[AuthService] Fallo en la lógica de autenticación:', error);
            throw error;
        }
    }
}