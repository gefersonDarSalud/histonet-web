export interface IService<T, R> {
    execute(props: T): Promise<R>;
}

export interface IdName {
    id: string;
    name: string;
    code?: string;
}

export type Response = {
    status: number;
    resultado: string;
}

export interface Mapper<Param, Return> {
    fromApiToDomain(dto: Param): Return;
    fromApiArrayToDomainArray(dtos: Param[]): Return[];
}

export type MedicalVisitAction =
    | { type: 'SET_VISIT_DATA'; payload: Partial<MedicalVisitNursingDetails> } // Actualiza múltiples campos
    | { type: 'SET_STATUS'; payload: VisitStatus }
    | { type: 'SET_PATIENT'; payload: Patient }
    | { type: 'UPDATE_BIOMETRICS'; payload: Partial<MedicalVisitNursingDetails['biometrics']> }
    | { type: 'RESET_VISIT' }; // Limpia el estado

// DATA ///////

export interface Patient {
    id: string;
    code: string;
    fullname?: string;
    firstName?: string;
    lastName?: string;
    birthdate?: string;
    type?: string;
    gender?: string;
    business?: string;
    phone?: string | null;
    address?: string | null;
    email?: string | null;
    isActive?: boolean;
}

export type Business = IdName;
export type Insurance = IdName;
export type FeeSchedule = IdName;
export type Departament = IdName;

export interface PatientContracts {
    row: string
    business: Business,
    insurance: Insurance,
    feeSchedule: FeeSchedule,
    departament: Departament,
}

export interface PatientRelationship {
    patient_code: string;
    id_patient: string;
    id_client: string,
    fullname: string;
    id_relationship: string;
    relationship: string;
}

export type VisitStatus = 'PENDIENTE' | 'EN_CURSO' | 'CERRADA' | 'CANCELADA';
export type TypeVisit = 'ASEGURADO' | 'AFILIADO' | 'PARTICULAR';

export interface MedicalVisit {
    visitNumber: string;
    status: VisitStatus;
    patient: Patient | null;
    services?: string;
    business?: Business | null;
    Insurance?: IdName | null;
    FeeSchedule: IdName;
    company?: IdName;
    branchOffice?: IdName;
    dateTime: string;
}

export interface MedicalVisitNursingDetails extends MedicalVisit {
    biometrics?: {
        size: number;
        weight: number;
        temperature: number;
        pulse: number;
        pressure: string | null;
        bodyMassIndex: number;
        oxygenSaturation: number;
    }
}