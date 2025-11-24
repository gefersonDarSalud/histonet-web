// 💎 Definición de Dominio. Define la forma pura de los datos que usa la aplicación, independientemente de la fuente.


export interface Business {
    id: string;
    name: string;
    code: string;
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

export type StatusVisit = "Ingresado" | "En Espera" | "En Consulta" | "Atendido" | "Pendiente";

export type TypeVisit = 'asegurado' | 'afiliado' | 'particular'