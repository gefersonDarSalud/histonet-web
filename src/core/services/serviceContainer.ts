import { PatientRepositoryImpl } from "#/infrastructure/PatientRepository.impl";
import { UserRepository } from "#/infrastructure/userRepository";
import type { PatientRepository } from "../repositories/patient.repository";
import { AuthService } from "./authService";
import { SearchPatientsService } from "./GetAllPatientservice";
import { GetPatientDataService } from "./getPatientData.service";

export class ServiceContainer {
    public readonly userRepository: UserRepository;
    public readonly authService: AuthService;
    public readonly patientRepository: PatientRepository;
    public readonly searchPatientsService: SearchPatientsService;
    public readonly getPatientDataService: GetPatientDataService;

    constructor() {
        this.userRepository = new UserRepository();
        this.authService = new AuthService({
            userRepository: this.userRepository,
        });
        this.patientRepository = new PatientRepositoryImpl();
        this.searchPatientsService = new SearchPatientsService(this.patientRepository);
        this.getPatientDataService = new GetPatientDataService(this.patientRepository);
    }
}