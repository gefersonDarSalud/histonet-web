import type { Business, DeleteContracts, DeleteRelationship, IdName, NewContracts, NewPatient, NewRelationship, Patient, PatientContracts, PatientFull, PatientRelationship, Response } from "../entities";

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
    ): Promise<Business[]>;

    getData(patient: { id: string; }): Promise<PatientFull>;

    getContracts(patient: { id: string; }): Promise<PatientContracts[]>;

    getRelationship(patient: string, list: 'BENEFICIARIO' | 'TITULAR'): Promise<PatientRelationship[]>;
    getRelationshipName(): Promise<IdName[]>;

    setData(newPatient: NewPatient): Promise<Response>;

    setContracts(newPatient: NewContracts): Promise<Response>;
    setRelationship(newPatient: NewRelationship): Promise<Response>;
    deleteContracts(contract: DeleteContracts): Promise<Response>;
    deleteRelationship(contract: DeleteRelationship): Promise<Response>;
}