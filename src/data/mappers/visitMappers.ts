import type { Mapper, MedicalVisitNursingDetails, VisitStatus } from "#/core/entities";
import type { MedicalVisitResponse } from "../types/visit";

export type SearchApi = {
    id: string;
    paciente: string;
    AseguradoraNombre?: string;
    EmpresaNombre?: string;
    clave?: string;
    motivo?: string;
    fecha_visita?: string;
    statusNombre?: string;
    nro_documento?: string;
    Cedula?: string;
    hora?: string;
    observacion?: string;
    infcomplementaria?: string;
}

export type SearchResponse = {
    id: string;
    patient: string;
    insurance: string;
    business: string;
    password: string;
    topic: string;
    visit_date: string;
    status: string;
    code: string;
    patient_ci: string;
    time: string;
    observation: string;
    information: string;
}

export const seachMapper: Mapper<SearchApi, SearchResponse> = {
    fromApiToDomain(dto: SearchApi): SearchResponse {
        return {
            id: dto.id,
            patient: dto.paciente,
            insurance: dto.AseguradoraNombre ?? '',
            business: dto.EmpresaNombre ?? '',
            password: dto.clave ?? '',
            topic: dto.motivo ?? '',
            visit_date: dto.fecha_visita ?? '',
            status: dto.statusNombre ?? '',
            code: dto.nro_documento ?? '',
            patient_ci: dto.Cedula ?? '',
            time: dto.hora ?? '',
            observation: dto.observacion ?? '',
            information: dto.infcomplementaria ?? '',
        };
    },

    fromApiArrayToDomainArray(dtos: SearchApi[]): SearchResponse[] {
        return dtos.map(this.fromApiToDomain);
    }
};

/**
 * Función auxiliar para determinar el estado de la visita basado en la lógica de negocio.
 * Por defecto, la API no proporciona un campo 'status', así que asumimos 'PENDIENTE'.
 */
const mapStatus = (apiStatus: number | null): VisitStatus => {
    switch (apiStatus) {
        case 0: return 'CANCELADA';
        case 2: return 'EN_CURSO';
        case 3: return 'CERRADA';
        default: return 'PENDIENTE';
    }
};

export const MedicalVisitMapper: Mapper<MedicalVisitResponse, MedicalVisitNursingDetails> = {

    /**
     * Transforma un objeto DTO de la API en el Modelo de Dominio de Visita Médica.
     * @param {MedicalVisitResponse} dto - El objeto de datos crudos de la API.
     * @returns {MedicalVisit} - El objeto limpio y estructurado del Dominio.
     */
    fromApiToDomain(dto: MedicalVisitResponse): MedicalVisitNursingDetails {
        // 💡 Mejor práctica: Las fechas deben ser manejadas consistentemente. 
        // Usamos new Date(string).toISOString() para asegurar formato uniforme, 
        // aunque dto.fecha_visita ya parece ser un formato ISO.

        return {
            visitNumber: dto.nro_documento,
            status: mapStatus(dto.tipo),
            patient: dto.ci && dto.nombre_apellido ? {
                id: dto.ci,
                code: dto.ci,
                fullname: dto.nombre_apellido,
                birthdate: '',
            } : null,
            company: dto.id_empresa && dto.tipo_paciente !== 'Particular' ? {
                id: String(dto.id_empresa),
                name: dto.nombre_empresa,
            } : (dto.id_aseguradora && dto.nombre_aseguradora ? {
                id: String(dto.id_aseguradora),
                name: dto.nombre_aseguradora,
            } : null), // Priorizar Empresa, luego Aseguradora. Si es 'Particular', se deja nulo.

            dateTime: new Date(dto.fecha_visita).toISOString(),

            FeeSchedule: {
                id: dto.id_baremo.toString(),
                name: dto.nombre_baremo,
            },

            // Mapeo de Datos Biométricos (Campo estructurado extra del modelo de dominio)
            biometrics: {
                size: dto.talla,
                weight: dto.peso,
                bodyMassIndex: dto.imc,
                pressure: dto.presion,
                temperature: dto.temperatura,
                pulse: dto.pulso,
                oxygenSaturation: dto.sp02,
            }
        };
    },

    /**
     * Mapea un array de DTOs de la API a un array de Modelos de Dominio.
     * @param {MedicalVisitResponse[]} dtos - Array de objetos DTO.
     * @returns {MedicalVisit[]} - Array de objetos del Dominio.
     */
    fromApiArrayToDomainArray(dtos: MedicalVisitResponse[]): MedicalVisitNursingDetails[] {
        return dtos.map(this.fromApiToDomain);
    }
};