import { serverUrl } from "#/utils/globals";
import type { PatientApiDto } from "#/utils/types";

export const PatientApi = {
    async search(query: { id?: string, fullname?: string }): Promise<PatientApiDto[]> {

        const params = new URLSearchParams();
        if (query.id) params.append('id', query.id);
        if (query.fullname) params.append('nombre_apellido', query.fullname);

        const urlFull = `${serverUrl}/paciente?${params.toString()}`;
        console.log(urlFull);

        const response = await fetch(urlFull);

        if (!response.ok) {
            throw new Error(`Error ${response.status}: Fallo al buscar pacientes`);
        }

        const data = await response.json();

        return data;
    }
};