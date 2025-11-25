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