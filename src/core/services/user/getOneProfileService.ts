import type { IdName, IService } from "#/core/entities";
import { get } from "#/utils/functions";
import { serverUrl } from "#/utils/globals";

type list = "COMPAÑIAS" | "SUCURSALES" | "MEDICOS";

export class GetOneProfileService implements IService<list, IdName[]> {
    async execute(list: list): Promise<IdName[]> {
        return (await get<{ id: string, nombre: string }[]>(serverUrl, '/perfil/lista', { nombre: list }))
            .map(row => ({
                id: row.id,
                name: row.nombre
            }));
    }
}