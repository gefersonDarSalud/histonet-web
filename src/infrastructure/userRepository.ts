
import { UserLoginMapper, type UserLoginResponse } from "#/data/mappers/userMapper";
import { getServerUrl } from "#/utils/functions";
import type { UserRepository as UserRepositoryCore } from "#/core/repositories/userRepository";




export class UserRepository implements UserRepositoryCore {
    async login(credentials: { email: string; password: string; }): Promise<UserLoginResponse> {
        const urlFull = getServerUrl('sesion/iniciar');

        try {
            const response = await fetch(urlFull, {
                method: 'POST',
                credentials: 'include',
                mode: 'cors',
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
            return UserLoginMapper.fromApiToDomain(data)
        }

        catch (error) {
            console.error('[UserRepository] Error en el intento de login:', error);
            throw error;
        }
    }

}