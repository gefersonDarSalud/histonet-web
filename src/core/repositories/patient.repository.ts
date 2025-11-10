import type { Patient } from "../entities/patient.entity";

export interface PatientRepository {
    // El 'search' aquí se mapea a tu método @Get() del backend
    searchPatients(
        params: {
            id?: string;
            fullname?: string;
        },
    ): Promise<Patient[]>;
    // Podrías añadir getAllPatients, getPatientById, etc.
}