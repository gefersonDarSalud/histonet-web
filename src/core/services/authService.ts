import type { UserRepository } from "#/infrastructure/userRepository";
import type { BasicResponse, IService } from "../entities";

type AuthServiceProps = {
    email: string;
    password: string;
};

type AuthServiceDependencies = {
    userRepository: UserRepository;
};

export class AuthService implements IService<AuthServiceProps, BasicResponse> {
    private userRepository: UserRepository;

    constructor({ userRepository }: AuthServiceDependencies) {
        this.userRepository = userRepository;
        console.log("AuthService inicializado.");
    }

    async execute({ email, password }: AuthServiceProps): Promise<BasicResponse> {
        if (!email || !password) throw new Error("El email y la contraseña son obligatorios.");

        try {
            const authData = await this.userRepository.login({ email, password });
            console.log("authData: ", authData);

            if (authData.status !== 'success') throw new Error(authData.message);
            return authData;
        }

        catch (error) {
            console.error('[AuthService] Fallo en la lógica de autenticación:', error);
            throw error;
        }
    }
}