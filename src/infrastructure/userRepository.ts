import type { AuthServiceResponse } from "#/core/services/authService";
import { UserLoginMapper } from "#/data/mappers/userMapper";
import { getServerUrl } from "#/utils/functions";


export class UserRepository {
    async login(credentials: { email: string; password: string; }): Promise<AuthServiceResponse> {
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

            return {
                data: UserLoginMapper.fromApiToDomain(data),
                auth: {
                    accessToken: "mock-jwt-" + Math.random().toString(36).substring(7),
                    refreshToken: "mock-refresh-" + Math.random().toString(36).substring(7),
                },
            };
        }

        catch (error) {
            console.error('[UserRepository] Error en el intento de login:', error);
            throw error;
        }
    }

}