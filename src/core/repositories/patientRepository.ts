import type { DeleteContractsRequest, DeleteRelationshipRequest, NewContractsRequest, NewPatientRequest, NewRelationshipRequest } from "#/data/types/patient";
import type { Business, IdName, Patient, PatientContracts, PatientRelationship, Response } from "../entities";

export interface PatientRepository {

    search(params: { id?: string; fullname?: string; birthdate?: string; }): Promise<Patient[]>;

    getVisitContracts(params: { id: string; },): Promise<Business[]>;

    getData(patient: { id: string; }): Promise<Patient>;

    getContracts(patient: { id: string; }): Promise<PatientContracts[]>;

    getRelationship(patient: string, list: 'BENEFICIARIO' | 'TITULAR'): Promise<PatientRelationship[]>;
    getRelationshipName(): Promise<IdName[]>;

    setData(newPatient: NewPatientRequest): Promise<Response>;

    setContracts(newPatient: NewContractsRequest): Promise<Response>;
    setRelationship(newPatient: NewRelationshipRequest): Promise<Response>;
    deleteContracts(contract: DeleteContractsRequest): Promise<Response>;
    deleteRelationship(contract: DeleteRelationshipRequest): Promise<Response>;
}