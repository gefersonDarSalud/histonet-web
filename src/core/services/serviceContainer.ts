import type { PatientRepository as PatientRepositoryCore } from "../repositories/patientRepository";
import type { BusinessRepository as BusinessRepositoryCore } from "../repositories/businessRepository";
import type { UserRepository as UserRepositoryCore } from "../repositories/userRepository";
import { BusinessRepository } from "#/infrastructure/businessRepository";
import { PatientRepository } from "#/infrastructure/PatientRepository";
import { UserRepository } from "#/infrastructure/userRepository";
import { AuthService } from "./user/authService";
import { SearchPatientsService } from "./patient/searchPatientservice";
import { GetPatientDataService } from "./patient/getPatientDataService";
import { GetPatientContracts } from "./patient/getPatientContractsService";
import { SearchBusinessService } from "./business/searchBusinessService";
import { GetPatientVisitContracts } from "./patient/getPatientVisitContractsService";

type Repositories = {
    user: UserRepositoryCore,
    patient: PatientRepositoryCore,
    business: BusinessRepositoryCore
}

export class ServiceContainer {
    public readonly repository: Repositories;
    public readonly authService: AuthService;
    public readonly searchPatientsService: SearchPatientsService;
    public readonly getPatientDataService: GetPatientDataService;
    public readonly getPatientContracts: GetPatientContracts;
    public readonly getPatientVisitContracts: GetPatientVisitContracts;
    public readonly searchBusinessService: SearchBusinessService;


    constructor() {
        this.repository = {
            user: new UserRepository(),
            patient: new PatientRepository(),
            business: new BusinessRepository()
        }

        // user
        this.authService = new AuthService({ userRepository: this.repository.user });

        // business 
        this.searchBusinessService = new SearchBusinessService(this.repository.business)

        // patient
        this.searchPatientsService = new SearchPatientsService(this.repository.patient);
        this.getPatientDataService = new GetPatientDataService(this.repository.patient);
        this.getPatientContracts = new GetPatientContracts(this.repository.patient);
        this.getPatientVisitContracts = new GetPatientVisitContracts(this.repository.patient);
    }
}