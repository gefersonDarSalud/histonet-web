
export interface MedicalVisitResponse {
    ID: number;
    nro_documento: string;
    fecha_visita: string; // "2024-10-10T04:00:00.000Z"
    tipo_paciente: string; // "Privado"
    motivo: string; // "Orientación Medica Telefónica"
    tipo: number;
    id_origen: number;
    clave: string;
    ci: string; // Cedula/Identificación
    nombre_apellido: string;
    tlfn: string;
    correo: string;
    // Propiedad con nombre vacío, se mapeará a algo más claro o se ignorará
    '': string;
    id_empresa: number;
    nombre_empresa: string;
    id_aseguradora: number | null;
    nombre_aseguradora: string | null;
    id_baremo: number;
    nombre_baremo: string;
    talla: number;
    presion: string | null;
    imc: number;
    temperatura: number;
    peso: number;
    pulso: number;
    sp02: number;
    observacion: string | null;
}