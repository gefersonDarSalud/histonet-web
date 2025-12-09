import { routeLabel } from '#/routes';
import { useMemo } from 'react';

export interface BreadcrumbItemData {
    name: string;
    path: string;
    isLast: boolean;
}

/**
 * Procesa la ruta activa para generar la estructura del Breadcrumb.
 * @param activePath La ruta actual de la URL (e.g., '/paciente/12345')
 * @returns Array de BreadcrumbItemData
 */
export const useBreadcrumbPath = (activePath: string): BreadcrumbItemData[] => {
    return useMemo(() => {

        /**
         * Mapeo de rutas estáticas a nombres legibles.
         * Usa los valores de routeLabel como llaves.
         */
        const pathLabels: Record<string, string> = {
            // Definir las rutas base y sus nombres legibles
            [routeLabel.remoteClinic]: "Telemedicina",
            [routeLabel.patient]: "Pacientes",
            // Para rutas con parámetros, usaremos solo el segmento principal
        };
        // Limpiar la ruta y dividir por segmentos
        // '/paciente/12345' -> ['', 'paciente', '12345']
        const segments = activePath.split('/').filter(s => s.length > 0);

        // Empezamos con el Home o Dashboard
        const crumbs: BreadcrumbItemData[] = [{ name: "Inicio", path: "/", isLast: false }];

        let currentPath = "";

        segments.forEach((segment, index) => {
            const isLast = index === segments.length - 1;
            const previousPath = currentPath;
            currentPath += `/${segment}`;

            let name = segment;
            let path = currentPath;

            // 1. Intentar mapear rutas base (ej: /paciente)
            const mappedName = pathLabels[currentPath];
            if (mappedName) {
                name = mappedName;
            }
            // 2. Manejar rutas con parámetros (ej: /paciente/:patientId)
            else if (previousPath === routeLabel.patient) {
                // Si el segmento anterior era '/paciente', asumimos que este es el ID del perfil
                name = `Perfil ${segment}`; // Puedes personalizar cómo se llama el perfil
                path = currentPath;
            }
            // 3. Manejar el caso de que la ruta base no tenga un mapeo (ej: '/' si no está definida en pathLabels)
            else if (currentPath === '/') {
                return; // Ya fue agregado como 'Inicio'
            }

            crumbs.push({ name, path, isLast });
        });

        // 4. Actualizar la propiedad 'isLast' en el penúltimo elemento 
        // ya que el bucle lo pudo haber dejado en 'false'.
        if (crumbs.length > 1) {
            // El verdadero último elemento siempre tiene isLast: true
            crumbs[crumbs.length - 1].isLast = true;
            // Y el penúltimo debe ser el que apunta a la navegación
            if (crumbs.length > 2) {
                crumbs[crumbs.length - 2].isLast = false;
            }
        }

        return crumbs;
    }, [activePath]);
};