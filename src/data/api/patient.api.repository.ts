// src/data/api/UserApiRepository.js

import { isFromApiPatient } from 'src/utils/functions';
import PatientEntity from '../../core/entities/Patient.entities';
import { backendUrl } from '../../utils/globals';
import patientMappers from '../mappers/patient.mappers'; // Mapeador para transformar los datos

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