import type { Patient } from "#/core/entities";


export type PatientState = {
    id: string | null; // Cédula o ID
    code: string | null; // Cédula o ID
    fullname: string | null; // Nombre completo
    birthdate: string | null;
}

export type PatientComboboxProps = {
    patient: PatientState;
    setPatient: React.Dispatch<React.SetStateAction<PatientState>>;
}

export type SelectOption = {
    value: string; // ID (Cédula), usado como valor único
    label: string; // Texto (Nombre completo y ID), usado para mostrar
    fullname: string; // Nombre completo (Para el estado del paciente)
    birthdate?: string;
}

export type PatientTableProps = {
    patients: Patient[];
    isLoading: boolean;
}; // El array de pacientes filtrados

export type objectList<T> = { [key: string]: T }

export type state<type> = {
    value: type,
    set: React.Dispatch<React.SetStateAction<type>>
}

