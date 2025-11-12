import { getServerUrl } from "#/utils/functions";
import type { PatientApiDto, PatientBusinessApiDto } from "#/utils/types";

export const PatientApi = {
    async search(query: object): Promise<PatientApiDto[]> {

        const urlFull = getServerUrl('paciente', query);

        const response = await fetch(urlFull);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: Fallo al buscar pacientes`);
        }

        const data = await response.json();

        return data;
    },

    async getInsuranceCompany(patient: string): Promise<PatientBusinessApiDto[]> {
        const urlFull = getServerUrl('empresa/paciente', patient);
        const response = await fetch(urlFull)

        if (!response.ok) {
            throw new Error(`Error ${response.status}: Fallo al buscar las empresas del paciente`);
        }

        return await response.json() as PatientBusinessApiDto[];
    }
};