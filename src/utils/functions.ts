import { MAX_ID_LENGTH, MIN_ID_LENGTH } from "./globals";

export function isValidIdNumber(term: string): boolean {
    // 1. Debe ser un número (usamos RegExp o Number.isNaN)
    const isNumeric = /^\d+$/.test(term);
    if (!isNumeric) return false;

    // 2. Debe cumplir con las restricciones de longitud de ID/Cédula
    return term.length >= MIN_ID_LENGTH && term.length <= MAX_ID_LENGTH;
};