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
    /**
     * Transforma un objeto DTO de la API en el Modelo de Dominio.
     * @param {Param} dto - El objeto de datos crudos de la API.
     * @returns {Return} - El objeto limpio y estructurado del Dominio.
     */
    fromApiToDomain(dto: Param): Return;

    /**
     * Mapea un array de DTOs de la API a un array de Modelos de Dominio.
     * @param {Param[]} dtos - Array de objetos DTO.
     * @returns {Return[]} - Array de objetos del Dominio.
     */
    fromApiArrayToDomainArray(dtos: Param[]): Return[];
}

export type MedicalVisitAction =
    | { type: 'SET_MEDICAL_VISIT'; payload: Partial<MedicalVisitNursingDetails> } // Actualiza múltiples campos
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

export type GroupTypeVisit = 'CONTRATO' | 'INDIVIDUAL';
export type ContractType = 'ASEGURADO' | 'AFILIADO' | 'EMPRESA';
export type ContractVisit = { groupType: 'CONTRATO'; subType: ContractType; };
export type IndividualType = 'PARTICULAR';
export type IndividualVisit = { groupType: 'INDIVIDUAL'; subType: IndividualType; };
export type VisitType = ContractVisit | IndividualVisit;

export interface MedicalVisit {
    visitNumber: string;
    visitType: VisitType;
    status: VisitStatus;
    patient: Patient | null;
    services?: string;
    business?: Business | null;
    insurance?: IdName | null;
    insuranceCode?: string | null;
    feeSchedule: IdName;
    dateTime: string;
    motive: IdName;
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