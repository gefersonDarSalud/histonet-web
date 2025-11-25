import type { UserRepository } from "#/infrastructure/userRepository";
import type { BasicResponse, IService } from "../entities";

export type AuthResult = {
    accessToken: string;
    refreshToken: string;
};

export type AuthServiceResponse = {
    data: BasicResponse;
    auth: AuthResult;
};

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
        console.log("AuthService inicializado.");
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