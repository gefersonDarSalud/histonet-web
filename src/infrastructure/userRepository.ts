import type { BasicResponse } from "#/core/entities";
import { UserLoginMapper } from "#/data/mappers/userMapper";
import { getServerUrl } from "#/utils/functions";


export class UserRepository {
    async login(credentials: { email: string; password: string; }): Promise<BasicResponse> {
        const urlFull = getServerUrl('usuario/iniciar-sesion');
        console.log(`[UserRepository] Llamando a la API: ${urlFull}`);

        try {
            const response = await fetch(urlFull, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    co_us: credentials.email,
                    clave: credentials.password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ message: 'Error de red o API desconocido.' }));

                throw new Error(errorData.message || `Fallo en el login. Estado: ${response.status}`);
            }
            const data = await response.json();

            return UserLoginMapper.fromApiToDomain(data);;
        }

        catch (error) {
            console.error('[UserRepository] Error en el intento de login:', error);
            throw error;
        }
    }

}