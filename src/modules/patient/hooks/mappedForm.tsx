import type { PatientFull } from "#/core/entities";
import type { PatientProfileFormValues } from "../components/patientProfileForm";

export const mapPatientToFormValues = (patientData: PatientFull | Partial<PatientProfileFormValues>): PatientProfileFormValues => {

    // 1. Transformación de fecha (string | null a Date | null)
    const dateOfBirth = patientData.birthdate
        ? new Date(patientData.birthdate) // Asume que patientData.birthdate es un string de fecha válido (ISO 8601)
        : null;

    // 2. Transformación de género (string | null a Enum | undefined)
    const validGenders = ["M", "F"];
    const patientGender = patientData.gender && validGenders.includes(patientData.gender)
        ? (patientData.gender as "M" | "F")
        : undefined;

    // 3. Mapeo de valores
    const isActive = patientData.isActive ?? true;
    return {
        // Campos requeridos (Convertir null a "" para evitar errores TS y asegurar inicialización)
        firstName: patientData.firstName ?? '',
        lastName: patientData.lastName ?? '',
        code: patientData.code ?? '',
        email: patientData.email ?? '',

        // Campos opcionales (Convertir null a undefined, lo que espera React Hook Form para opcionales)
        phone: patientData.phone ?? undefined,
        address: patientData.address ?? undefined,

        // Campos con transformación de tipo
        birthdate: dateOfBirth,
        gender: patientGender,
        isActive: isActive,
    };
};
