import { UserRepository } from "#/infrastructure/userRepository";
import { AuthService } from "./authService";

export class ServiceContainer {
    public readonly userRepository: UserRepository;
    public readonly authService: AuthService;

    constructor() {
        this.userRepository = new UserRepository();
        this.authService = new AuthService({
            userRepository: this.userRepository,
        });
    }
}