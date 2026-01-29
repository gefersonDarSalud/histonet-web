import type { Response } from "#/core/entities";
import type { PatientRepository } from "#/core/repositories/patientRepository";
import type { NewPatientRequest } from "#/data/types/patient";
import { formatDate } from "#/utils/functions";
import type { PatientProfileFormValues } from "@/patient/components/patientProfileForm";

export class SetPatientData {
    private repository: PatientRepository;
    constructor(repository: PatientRepository) {
        this.repository = repository;
    }
    async execute(patientId: string | null, patient: PatientProfileFormValues): Promise<Response> {
        if (!patient.firstName || !patient.gender || !patient.address || !patient.code) return {
            status: 0,
            resultado: "no Procesado"
        };
        const newPatient: NewPatientRequest = {
            id_paciente: patientId,
            ci: patient.code,
            nombre: patient.firstName,
            apellido: patient.lastName ?? '',
            sexo: patient.gender,
            direccion: patient.address,
            tlf: patient.phone ?? '',
            email: patient.email,
            co_us: 'web',
            fecha_nacimiento: patient.birthdate ? formatDate(patient.birthdate) : '',
            inactivar: patient.isActive ? "0" : "1",
        }
        return await this.repository.setData(newPatient);
    }
}