import type { Business, NewPatient, Patient, PatientContracts, PatientFull, PatientRelationship } from "../entities";

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

    getRelationship(patient: string, list: 'BENEFICIARIO' | 'TITULAR'): Promise<PatientRelationship[]>

    setData(newPatient: NewPatient): Promise<[]>
}