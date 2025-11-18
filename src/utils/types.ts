import type { Visit } from "#/core/entities";

export type PatientApiDto = {
    ci: string;
    nombre_apellido: string;
    fecha_nacimiento: string;
    sexo: string;
    id: string,
    nombre: string,
    id_profesion: string,
    id_pais: string,
    id_ciudad: string,
    id_nivel_educativo: string,
    id_zona: string,
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
    id_foto: string,
    id_ci: string,
    id_cliente: string,
    id_carnet: string
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

export type state<type> = {
    value: type,
    set: React.Dispatch<React.SetStateAction<type>>
}