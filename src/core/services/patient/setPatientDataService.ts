import type { NewPatient, Patient } from "#/core/entities";
import type { PatientRepository } from "#/core/repositories/patientRepository";

export class SetPatientData {
    private repository: PatientRepository;
    constructor(repository: PatientRepository) {
        this.repository = repository;
    }
    async execute(patient: Patient): Promise<[]> {
        if (!patient.firstName || !patient.gender || !patient.address || !patient.code) return [];
        const newPatient: NewPatient = {
            id_paciente: patient.id,
            ci: patient.code,
            nombre: patient.firstName,
            apellido: patient.lastName ?? '',
            sexo: patient.gender,
            direccion: patient.address,
            tlfn: patient.firstName,
            email: patient.firstName,
            co_us: patient.firstName,
            fecha_nacimiento: patient.firstName,
        }
        return await this.repository.setData(newPatient);
    }
}