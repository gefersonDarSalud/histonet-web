import type { IService, Response } from "#/core/entities";
import { post } from "#/utils/functions";
import { serverUrl } from "#/utils/globals";

type UpdateProfileServiceProps = {
    branchId: string;
    companyId: string;
    queueId: string;
    especialityId: string;
};

export class UpdateProfileService implements IService<UpdateProfileServiceProps, Response> {
    async execute(data: UpdateProfileServiceProps): Promise<Response> {
        return post<Response, UpdateProfileServiceProps>
            (serverUrl, '/perfil/cambiar', data)
    }
}