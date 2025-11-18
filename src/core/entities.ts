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
    id: string,
    fullname: string,
    birthdate?: string,
    type?: string
    gender?: string,
    business?: string,
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