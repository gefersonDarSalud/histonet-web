import type { Business, Patient, PatientFull } from "../entities";

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

    getPatientData(patient: { id: string; }): Promise<PatientFull>;
}