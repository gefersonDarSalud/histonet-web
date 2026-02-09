// hooks/use-debounce.ts
import { useEffect, useState } from "react";

/**
 * Hook para retrasar la actualización de un valor.
 * @param value El valor de entrada (usualmente el string del input)
 * @param delay El tiempo de espera en milisegundos
 */
export function useLoading<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Establecer un temporizador para actualizar el valor debounced
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpiar el temporizador si el valor cambia antes de que expire el tiempo
    // o si el componente se desmonta
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}