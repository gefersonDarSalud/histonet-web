import type { Business, Patient, PatientContracts, PatientFull } from "../entities";

export interface PatientRepository {

    search(
        params: {
            id?: string;
            fullname?: string;
            birthdate?: string;
        },
    ): Promise<Patient[]>;

    getVisitContracts(
        params: {
            id: string;
        },
    ): Promise<Business[]>

    getData(patient: { id: string; }): Promise<PatientFull>;

    getContracts(patient: { id: string; }): Promise<PatientContracts[]>;
}