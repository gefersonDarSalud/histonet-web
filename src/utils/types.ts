import type { Patient, Visit } from "#/core/entities";

export type PatientApiDto = {
    ci: string;
    nombre_apellido: string;
    fecha_nacimiento: string;
    sexo: string;
    id: number,
    nombre: string,
    id_profesion: number,
    id_pais: number,
    id_ciudad: number,
    id_nivel_educativo: number,
    id_zona: number,
    apellido: string,
    dir: string,
    correo: string,
    tlfn: string,
    tlfn_local: string,
    estado_civil: string,
    numero_hijos: string,
    grupo_sanguineo: string,
    status: string,
    lateralidad: string,
    id_foto: number,
    id_ci: number,
    id_cliente: number,
    id_carnet: number
}

export type PatientFullApiDto = {
    ci: string,
    nombre: string,
    apellido: string,
    fecha_nacimiento: string | null,
    sexo: string | null,
    correo: string | null,
    tlfn: string | null,
    dir: string | null,
}

export type PatientContractsApiDto = {
    id: number
    id_empresa: number,
    empresa: string,
    id_dependencia: number,
    dependecia: string,
    id_aseguradora: number,
    aseguradora: string,
    id_baremo: number,
    baremo: string,
}

export type PatientRelationshipApiDto = {
    ID: string;
    nombre: string;
    id_parentesco: string;
    parentesco: string;
}

export type PatientBusinessApiDto = {
    id: string;
    nombre: string;
    rif: string;
    aseguradoras?: {
        id: string;
        nombre: string;
        rif: string;
        baremos?: {
            id: string;
            nombre: string;
        }[];
    }[] | null;
}

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

export type VisitTableProps = {
    visits: Visit[];
}; // El array de pacientes filtrados

export type PatientTableProps = {
    patients: Patient[];
    isLoading: boolean;
}; // El array de pacientes filtrados

export type objectList<T> = { [key: string]: T }

export type state<type> = {
    value: type,
    set: React.Dispatch<React.SetStateAction<type>>
}