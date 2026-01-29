
import { useState, useCallback, type DependencyList, type Dispatch, type SetStateAction } from 'react';

/**
 * 📝 Interfaz Genérica para el Estado de la Operación Asíncrona
 * @template T - La estructura de datos esperada.
 * @template E - El tipo de error esperado.
 */
export interface useFetchState<T, E = Error> {
    data: T | null;
    loading: boolean;
    error: E | null;
}

export type UseFetchSetState<T, E = Error> = Dispatch<SetStateAction<useFetchState<T, E>>>;

/**
 * 💡 Hook Personalizado Avanzado para gestionar el estado de un servicio asíncrono.
 * Este hook genera una función de ejecución memoizada (similar a useCallback) basada en las dependencias.
 * * @template T - Tipo de dato que la función de servicio devuelve.
 * @template A - Tipo de los argumentos que la función de servicio acepta.
 * @template E - Tipo de error.
 * * @param {(...args: A) => Promise<T>} serviceFunction - La función de servicio que devuelve una Promesa.
 * @param {DependencyList} deps - Array de dependencias (igual que en useEffect/useCallback).
 * @param {boolean} initialLoading - Si la operación debe iniciar en estado de carga.
 * @returns {AsyncState<T, E> & { execute: (...args: A) => Promise<T | void> }} El estado y la función para ejecutar.
 */
export function useFetch<T, A extends any[] = [], E = Error>(
    serviceFunction: (...args: A) => Promise<T>,
    deps: DependencyList,
    initialLoading: boolean = false
) {
    const [state, setState] = useState<useFetchState<T, E>>({
        data: null,
        loading: initialLoading,
        error: null,
    });

    /**
     * ⚙️ Función de Ejecución Memoizada
     * Se reconstruye SÓLO si las dependencias cambian.
     * Esto encapsula la lógica de tu servicio y la lógica de manejo de estado de React.
     */
    const execute = useCallback(
        async (...args: A): Promise<T | void> => {
            // 1. Establecer el estado de carga
            setState((prev) => ({ ...prev, loading: true, error: null }));

            try {
                // 2. Ejecutar la función de servicio proporcionada
                const result: T = await serviceFunction(...args);

                // 3. Actualizar el estado con los datos
                setState({ data: result, loading: false, error: null });

                // Devolver el resultado
                return result;
            } catch (err) {
                // 4. Manejo de Errores
                const typedError = (err as E);
                console.error("useFetch Error:", typedError);

                setState({
                    data: null,
                    loading: false,
                    error: typedError
                });

                // Manejar el error localmente (opcionalmente puedes relanzarlo)
            } finally {
                // 5. Garantizar que la carga se apague (siguiendo tu ejemplo original)
                // Aunque ya lo hicimos en try/catch, esto es una capa de seguridad extra.
                setState(prev => ({ ...prev, loading: false }));
            }
        },
        // IMPORTANTÍSIMO: Usar las dependencias pasadas por el usuario.
        // Esto asegura la estabilidad de la función 'execute'.
        // Los servicios (como serviceFunction) deben estar incluidos si son dependencias.
        [serviceFunction, ...deps]
    );

    // Exponer el estado y la función de ejecución memoizada
    return { ...state, execute, set: setState as Dispatch<SetStateAction<useFetchState<T, E>>> };
}