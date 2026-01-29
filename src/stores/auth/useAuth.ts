import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { serverUrl } from '#/utils/globals';
import { useAlertStore } from '../alert/useAlert';


interface UserData {
    user: string;
    name: string;
    email: string;
    role: string;
    company: string;
    branch: string;
    doctor: string;
}

interface AuthState {
    user: Partial<UserData> | null;
    isAuthReady: boolean;
    isLoggedIn: boolean;
    isLoading: boolean;
    isProfileSelected: boolean;
    setIsProfileSelected: (val: boolean) => void;
    checkAuthStatus: () => Promise<void>;
    login: () => void;
    logout: () => Promise<void>;
}

const authState = create<AuthState>()

export const useAuthStore = authState(
    persist(
        set => {
            const { alert } = useAlertStore.getState();
            return {
                isLoggedIn: false,
                isAuthReady: false,
                isLoading: false,
                isProfileSelected: false,
                user: null,

                setIsProfileSelected: (val) => set({ isProfileSelected: val }),

                checkAuthStatus: async () => {
                    set({ isLoading: true });
                    try {
                        const response = await fetch(`${serverUrl}/sesion/verificar`, {
                            method: 'GET',
                            credentials: 'include',
                            headers: { 'Content-Type': 'application/json' },
                        });
                        if (!response.ok) {
                            set({ isLoggedIn: false, user: null, isProfileSelected: false });
                            throw new Error('no se pudo verificar la autenticación');
                        }
                        const data = await response.json() as { req: UserData };
                        set({
                            isLoggedIn: true,
                            user: data.req, // Guardamos los datos del usuario
                        });
                    }

                    catch (error) {
                        console.error(error);
                        set({ isLoggedIn: false });
                    }

                    finally {
                        set({ isLoading: false, isAuthReady: true });
                    }
                },

                login: () => {
                    set({ isLoggedIn: true });
                    alert({
                        title: 'Inicio de Sesión Exitoso',
                        variant: 'default',
                        description: 'has iniciado sesión exitosamente.'
                    });
                },

                logout: async () => {
                    try {                        
                        const response = await fetch(`/${serverUrl}/sesion/cerrar`, {
                            method: 'POST',
                            credentials: 'include',
                        });
                        if (response.ok) {
                            set({ isLoggedIn: false, isProfileSelected: false });
                            alert({
                                title: 'Cierre de Sesión',
                                variant: 'default',
                                description: 'Has cerrado sesión exitosamente.'
                            });
                        }
                    }

                    catch (error) {
                        console.error(error);
                        alert({
                            title: 'Error',
                            variant: 'destructive',
                            description: 'No se pudo cerrar sesión.'
                        });
                    }
                },
            }
        },
        {
            name: 'auth-storage', // Nombre de la llave en LocalStorage
            storage: createJSONStorage(() => localStorage),
            // Opcional: Solo persistir isLoggedIn, isProfileSelected y user
            partialize: (state) => ({
                isLoggedIn: state.isLoggedIn,
                isProfileSelected: state.isProfileSelected,
                user: state.user
            }),
        }
    )
);