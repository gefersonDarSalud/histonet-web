import type { Business } from "../entities/Business";
import type { Patient } from "../entities/patient.entity";

export interface PatientRepository {

    searchPatients(
        params: {
            id?: string;
            fullname?: string;
            birthdate?: string;
        },
    ): Promise<Patient[]>;

    getInsuranceCompany(
        params: {
            id: string;
        },
    ): Promise<Business[]>
}