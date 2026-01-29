import type { IdName, Patient, PatientContracts, PatientRelationship, Response } from "#/core/entities";
import type { PatientRepository as PatientRepositoryCore } from "#/core/repositories/patientRepository";
import { PatientContractsMapper, PatientFullMapper, PatientMapper, PatientRelationShipNameMapper, PatientRelationsMapper } from "#/data/mappers/patient.mappers";
import type { DeleteContractsRequest, DeleteRelationshipRequest, NewContractsRequest, NewPatientRequest, NewRelationshipRequest, PatientContractsResponse, PatientRelationshipNameResponse, PatientRelationshipResponse, PatientResponse } from "#/data/types/patient";
import { getServerUrl } from "#/utils/functions";

export class PatientRepository implements PatientRepositoryCore {
    async search(params: { id?: string, fullname?: string }): Promise<Patient[]> {
        const urlFull = getServerUrl('paciente', {
            id: params.id,
            nombre_apellido: params.fullname,
        });
        const response = await fetch(urlFull);
        if (!response.ok) {
            throw new Error(`Error ${response.status}: Fallo al buscar pacientes`);
        }
        const dtos = await response.json();
        return PatientMapper.fromApiArrayToDomainArray(dtos);
    }

    async getData(patient: { id: string; }): Promise<Patient> {
        const urlFull = getServerUrl('paciente', patient.id);
        const response = await fetch(urlFull)
        if (!response.ok) {
            throw new Error(`Error ${response.status}: Fallo al buscar el paciente`);
        }
        const dtos = await response.json() as PatientResponse;
        const patientMapped = PatientFullMapper.fromApiToDomain(dtos);
        return patientMapped;
    }

    async getContracts(patient: { id: string; }): Promise<PatientContracts[]> {
        const urlFull = getServerUrl('paciente//empresa', patient.id);
        const response = await fetch(urlFull)
        if (!response.ok) {
            throw new Error(`Error ${response.status}: Fallo al buscar las empresas`);
        }
        const dtos = await response.json() as PatientContractsResponse[];
        return PatientContractsMapper.fromApiArrayToDomainArray(dtos);
    }

    async getRelationship(patient: string, list: "BENEFICIARIO" | "TITULAR"): Promise<PatientRelationship[]> {
        const urlFull = getServerUrl(`paciente/${patient}/relacion`, { lista: list });
        // paciente/859/relacion?lista=TITULAR
        const response = await fetch(urlFull)
        if (!response.ok) {
            throw new Error(`Error ${response.status}: Fallo al buscar las relaciones del paciente`);
        }
        const dtos = await response.json() as PatientRelationshipResponse[];
        return PatientRelationsMapper.fromApiArrayToDomainArray(dtos);
    }

    async setData(newPatient: NewPatientRequest): Promise<Response> {
        const urlFull = getServerUrl('paciente');
        try {
            const response = await fetch(urlFull, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPatient),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Error de red o API desconocido.' }));
                throw new Error(errorData.message || `Fallo en el login. Estado: ${response.status}`);
            }
            const data = await response.json() as Response[];
            return data[0];
        }

        catch (error) {
            console.error('[PatientRepository] Error en el intento de login:', error);
            throw error;
        }
    }

    async setContracts(contracts: NewContractsRequest): Promise<Response> {
        const urlFull = getServerUrl('paciente/empresa');
        try {
            const response = await fetch(urlFull, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contracts),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Error de red o API desconocido.' }));
                throw new Error(errorData.message || `Fallo en el login. Estado: ${response.status}`);
            }
            const data = await response.json() as Response[];
            return data[0];
        }

        catch (error) {
            console.error('[PatientRepository] Error en el intento de login:', error);
            throw error;
        }
    }

    async deleteContracts(contract: DeleteContractsRequest): Promise<Response> {
        const urlFull = getServerUrl('paciente//empresa', contract.id_paciente);
        try {
            const response = await fetch(urlFull, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contract),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Error de red o API desconocido.' }));
                throw new Error(errorData.message || `Fallo en el login. Estado: ${response.status}`);
            }
            const data = await response.json() as Response[];
            return data[0];
        }

        catch (error) {
            console.error('[PatientRepository] Error en el intento de login:', error);
            throw error;
        }
    }

    async setRelationship(newRelationship: NewRelationshipRequest): Promise<Response> {
        const urlFull = getServerUrl('paciente/relacion');
        try {
            const response = await fetch(urlFull, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newRelationship),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Error de red o API desconocido.' }));
                throw new Error(errorData.message || `Fallo en el login. Estado: ${response.status}`);
            }
            const data = await response.json() as Response[];
            return data[0];
        }

        catch (error) {
            console.error('[PatientRepository] Error en el intento de login:', error);
            throw error;
        }
    }

    async deleteRelationship(deleteRelationship: DeleteRelationshipRequest): Promise<Response> {
        const urlFull = getServerUrl('paciente/relacion');
        try {
            const response = await fetch(urlFull, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(deleteRelationship),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Error de red o API desconocido.' }));
                throw new Error(errorData.message || `Fallo en el login. Estado: ${response.status}`);
            }
            const data = await response.json() as Response[];
            return data[0];
        }

        catch (error) {
            console.error('[PatientRepository] Error en el intento de login:', error);
            throw error;
        }
    }

    async getRelationshipName(): Promise<IdName[]> {
        const urlFull = getServerUrl('paciente/relacion/nombre');
        const response = await fetch(urlFull)
        if (!response.ok) throw new Error(`Error ${response.status}: Fallo al buscar las empresas`);
        const dtos = await response.json() as PatientRelationshipNameResponse[];
        return PatientRelationShipNameMapper.fromApiArrayToDomainArray(dtos);
    }
}