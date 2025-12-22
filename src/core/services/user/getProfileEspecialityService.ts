import type { IdName, IService } from "#/core/entities";
import { get } from "#/utils/functions";
import { serverUrl } from "#/utils/globals";

export class GetProfileEspecialityService implements IService<string, IdName[]> {
    async execute(list: string): Promise<IdName[]> {
        return (await get<{ id: string, nombre: string }[]>(serverUrl, `/perfil/lista/especialidad/${list}`))
            .map(row => ({
                id: row.id,
                name: row.nombre
            }));
    }
}