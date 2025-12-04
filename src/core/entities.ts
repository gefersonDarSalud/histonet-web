// 💎 Definición de Dominio. Define la forma pura de los datos que usa la aplicación, independientemente de la fuente.

import type { ServiceContainer } from "./services/serviceContainer";

export type Services = ServiceContainer;

export interface IService<T, R> {
    execute(props: T): Promise<R>;
}

export type BasicResponse = {
    message: string;
    status: 'failed' | 'success';
}

export interface Mapper<Param, Return> {
    fromApiToDomain(dto: Param): Return;
    fromApiArrayToDomainArray(dtos: Param[]): Return[];
}

export interface Business {
    id: string | number;
    name: string;
    code?: string;
    insurances?: {
        id: string;
        name: string;
        code: string;
        feeSchedules?: FeeSchedule[];
    }[] | null;
}

export interface Patient {
    id: string, //  ID
    code?: string, // Cédula
    fullname?: string | null, // Nombre completo
    firstName?: string | null, // Nombre
    lastName?: string | null, // Nombre
    birthdate?: string | null, // Fecha de nacimiento
    type?: string // 
    gender?: string | null, // genero
    business?: string, // ?????
    phone?: string | null,
    address?: string | null,
    email?: string | null,
}

export interface PatientFull {
    code: string, // Cédula
    firstName: string | null, // Nombre
    lastName: string | null, // Nombre
    birthdate: string | null, // Fecha de nacimiento
    gender: string | null, // genero
    phone: string | null,
    address: string | null,
    email: string | null,
}

export interface FeeSchedule {
    id: number;
    name: string;
}

export interface Visit {
    code: `${string}-${string}`;
    patient: Patient;
    date: string;
    time: string;
    status: StatusVisit;
    type: TypeVisit;
}

export type IdName = {
    id: number | string;
    name: string;
}

export interface PatientContracts {
    row: number
    business: IdName,
    insurance: IdName,
    departament: IdName,
    feeSchedule: IdName,
}

export interface PatientRelationship {
    patient_code: string;
    id_patient: string;
    id_client: string,
    fullname: string;
    id_relationship: string;
    relationship: string;
}

export interface NewPatient {
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
}

export interface NewContracts {
    id_paciente: string,
    id_empresa: string,
    id_baremo: string,
    id_dependencia: string | null;
    id_aseguradora: string | null,
    CO_US: string | null,
}

export interface DeleteContracts {
    id_paciente: string,
    id_empresa: string,
    id_aseguradora: string | null,
    CO_US: string | null,
}

export type Response = {
    status: number;
    resultado: string;
}

export type StatusVisit = "Ingresado" | "En Espera" | "En Consulta" | "Atendido" | "Pendiente";

export type TypeVisit = 'asegurado' | 'afiliado' | 'particular'