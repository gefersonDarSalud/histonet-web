// src/data/api/UserApiRepository.js

import PatientEntity from '../../core/entities/Patient.entities';
import { backendUrl } from '../../utils/globals';
import patientMappers, { type fromApiPatient } from '../mappers/patient.mappers'; // Mapeador para transformar los datos

function isFromApiPatient(data: any): data is fromApiPatient {
    return 'user_id' in data && 'full_name' in data && 'email_address' in data;
}

export default class PatientApiRepository extends PatientEntity  {
    async getById(id: string): Promise<PatientEntity> {
        const response = await fetch(`${backendUrl}${id}`);
        const patientData = await response.json();

        if (!isFromApiPatient(patientData)) {
            throw new Error("algo fallo")
        }
        
        return patientMappers.fromApi(patientData);
    }

    // Otros métodos...
}