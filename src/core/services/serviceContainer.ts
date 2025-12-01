
// repositories
import type { UserRepository as UserRepositoryCore } from "../repositories/userRepository";
import type { VisitRepository as VisitRepositoryCore } from "../repositories/visitRepository";
import type { BusinessRepository as BusinessRepositoryCore } from "../repositories/businessRepository";
import type { PatientRepository as PatientRepositoryCore } from "../repositories/patientRepository";

// infracturtures
import { UserRepository } from "#/infrastructure/userRepository";
import { BusinessRepository } from "#/infrastructure/businessRepository";
import { VisitRepository } from "#/infrastructure/visitRepository";
import { PatientRepository } from "#/infrastructure/PatientRepository";

//services
import { AuthService } from "./user/authService";
import { SearchBusinessService } from "./business/searchBusinessService";
import { GetBusinessDataListService } from "./business/getBusinessDataListService";
import { GetPatientVisitContracts } from "./patient/getPatientVisitContractsService";
import { SearchPatientsService } from "./patient/searchPatientservice";
import { GetPatientDataService } from "./patient/getPatientDataService";
import { GetPatientContracts } from "./patient/getPatientContractsService";
import { SearchVisitService } from "./visit/searchVisitService";

type Repositories = {
    user: UserRepositoryCore;
    visit: VisitRepositoryCore;
    business: BusinessRepositoryCore;
    patient: PatientRepositoryCore;
}

export class ServiceContainer {
    public readonly repository: Repositories;

    // user 
    public readonly authService: AuthService;

    // visit
    public readonly searchVisit: SearchVisitService;

    // business
    public readonly searchBusinessService: SearchBusinessService;
    public readonly getBusinessDataListService: GetBusinessDataListService;

    // patient 
    public readonly searchPatientsService: SearchPatientsService;
    public readonly getPatientDataService: GetPatientDataService;
    public readonly getPatientContracts: GetPatientContracts;
    public readonly getPatientVisitContracts: GetPatientVisitContracts;



    constructor() {
        this.repository = {
            user: new UserRepository(),
            patient: new PatientRepository(),
            business: new BusinessRepository(),
            visit: new VisitRepository(),
        }

        // user
        this.authService = new AuthService({ userRepository: this.repository.user });

        // visit
        this.searchVisit = new SearchVisitService(this.repository.visit);

        // business 
        console.log("service container");

        this.searchBusinessService = new SearchBusinessService(this.repository.business)
        this.getBusinessDataListService = new GetBusinessDataListService(this.repository.business)

        // patient
        this.searchPatientsService = new SearchPatientsService(this.repository.patient);
        this.getPatientDataService = new GetPatientDataService(this.repository.patient);
        this.getPatientContracts = new GetPatientContracts(this.repository.patient);
        this.getPatientVisitContracts = new GetPatientVisitContracts(this.repository.patient);
    }
}