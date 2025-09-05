import type { fromApiPatient } from "src/data/mappers/patient.mappers";

export function isFromApiPatient(data: any): data is fromApiPatient {
    return 'user_id' in data && 'full_name' in data && 'email_address' in data;
}