import type { VisitStatus, VisitType } from "#/core/entities";
import { MAX_ID_LENGTH, MIN_ID_LENGTH, serverUrl } from "./globals";

export function isValidIdNumber(term: string): boolean {
    // 1. Debe ser un número (usamos RegExp o Number.isNaN)
    const isNumeric = /^\d+$/.test(term);
    if (!isNumeric) return false;

    // 2. Debe cumplir con las restricciones de longitud de ID/Cédula
    return term.length >= MIN_ID_LENGTH && term.length <= MAX_ID_LENGTH;
};

export function getServerUrl(route: string, params?: string | object, url?: string): string {
    if (typeof url === 'undefined') url = serverUrl;
    const queryParams = new URLSearchParams();
    let urlFull = '';

    switch (typeof params) {
        case 'string':
            if (route.includes('//')) {
                urlFull = `${url}/${route.replace('//', `/${params}/`)}`
                break;
            }
            urlFull = `${url}/${route}/${params}`;
            break;

        case 'object':
            for (const [key, value] of Object.entries(params)) {
                if (value === null && value === undefined && String(value).trim() === '') continue;
                queryParams.append(key, String(value));
            }
            urlFull = `${url}/${route}?${queryParams.toString()}`;
            break;
        default:
            urlFull = `${url}/${route}`;
            break;
    }
    return urlFull;
}

export function cn(...classes: string[]): string {
    return classes.filter(Boolean).join(' ')
};

export function formatDate(date: Date) {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}/${year}`;
}

export function calculateAge(birthdate: string): number {
    const diff = Date.now() - new Date(birthdate).getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};

export function formatDateTime(isoDate: string): string {
    const date = new Date(isoDate);
    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true
    };
    return date.toLocaleString('es-ES', options).replace(',', '').replace('.', '');
};


/**
 * Función auxiliar para determinar el estado de la visita basado en la lógica de negocio.
 * Por defecto, la API no proporciona un campo 'status', así que asumimos 'PENDIENTE'.
 */
export function mapStatus(apiStatus: number | null): VisitStatus {
    switch (apiStatus) {
        case 0: return 'CANCELADA';
        case 2: return 'EN_CURSO';
        case 3: return 'CERRADA';
        default: return 'PENDIENTE';
    }
};

/**
 * Función auxiliar para determinar mappear el tipo de la visita basado en la lógica de negocio.
 * Por defecto, la API no proporciona un numero por tipo de visita, y lo convertimos a un string.
 */
export function mapVisitType(type: number): VisitType {
    switch (type) {
        case 1: return { groupType: 'CONTRATO', subType: 'AFILIADO' };
        case 2: return { groupType: 'CONTRATO', subType: 'EMPRESA' };
        case 3: return { groupType: 'CONTRATO', subType: 'ASEGURADO' };
        default: return { groupType: 'INDIVIDUAL', subType: 'PARTICULAR' };
    }
};

/**
 * Convierte un string tipo "v28563229" a formato "V-28.563.229"
 * @param input - Cadena con letra inicial y números (ej: "v28563229")
 * @returns Cadena formateada (ej: "V-28.563.229")
 */
export function formatPersonalId(input: string): string {
    // Extraemos la letra inicial
    const prefix = input.charAt(0).toUpperCase();

    // Extraemos la parte numérica
    const numericPart = input.slice(1);

    // Convertimos a número y aplicamos formato con separadores de miles
    const formattedNumber = Number(numericPart).toLocaleString("es-ES");

    return `${prefix}-${formattedNumber}`;
}

/**
 * Capitaliza cada palabra de un texto.
 * Ej: "holA COMO estas" → "Hola Como Estas"
 */
export function capitalizeText(text: string): string {
    return text
        .toLowerCase()
        .split(/\s+/)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}
