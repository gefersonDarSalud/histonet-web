
export interface NewPatientRequest {
    ci: string,
    id_paciente: string | null,
    nombre: string,
    apellido: string,
    fecha_nacimiento: string | null,
    sexo: string | null,
    tlf: string | null,
    email: string | null,
    direccion: string | null,
    co_us: string | null,
    inactivar: string,
}

export interface NewContractsRequest {
    id_paciente: string,
    id_empresa: string,
    id_baremo: string,
    id_dependencia: string | null;
    id_aseguradora: string | null,
    CO_US: string | null,
}

export interface DeleteContractsRequest {
    id_paciente: string,
    id_empresa: string,
    id_aseguradora: string | null,
    CO_US: string | null,
}

export interface NewRelationshipRequest {
    id_paciente: string,
    id_titular: string,
    id_parentesco: string,
    CO_US: string | null,
}

export interface DeleteRelationshipRequest {
    id_paciente: string,
    id_titular: string,
    CO_US: string | null,
}

export type PatientRelationshipResponse = {
    id_paciente: string;
    id_titular: string;
    cedula: string;
    nombre_apellido: string;
    id_parentesco: string;
    parentesco: string;
}

export type PatientRelationshipNameResponse = {
    id_parentesco: string,
    parentesco: string
}

export type PatientContractsResponse = {
    id: string
    id_empresa: string,
    empresa: string,
    id_dependencia: string,
    dependecia: string,
    id_aseguradora: string | null,
    aseguradora: string | null,
    id_baremo: string,
    baremo: string,
}

export type PatientResponse = {
    status?: string;
    id?: string;
    ci?: string;
    nombre_apellido?: string;
    fecha_nacimiento?: string;
    sexo?: string;
    nombre?: string;
    apellido?: string | null;
    dir?: string | null;
    correo?: string | null;
    tlfn?: string | null;
    tlfn_local?: string | null;
    estado_civil?: string | null;
    numero_hijos?: string | null;
    grupo_sanguineo?: string | null;
    lateralidad?: string | null;
    id_profesion?: string | null;
    id_pais?: string | null;
    id_ciudad?: string | null;
    id_nivel_educativo?: string | null;
    id_zona?: string | null;
    id_foto?: string | null;
    id_ci?: string | null;
    id_cliente?: string | null;
    id_carnet?: string | null;
}