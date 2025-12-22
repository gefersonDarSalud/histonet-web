import { routeLabel } from '#/routes';
import { capitalizeText } from '#/utils/functions';
import { useMemo } from 'react';

export interface BreadcrumbItemData {
    name: string;
    path: string;
    isLast: boolean;
}

/**
 * Procesa la ruta activa para generar la estructura del Breadcrumb.
 * @param activePath La ruta actual de la URL (e.g., '/paciente/12345')
 * @returns Array de BreadcrumbItemDat
 */
export const useBreadcrumbPath = (activePath: string): BreadcrumbItemData[] => {
    return useMemo(() => {

        const pathLabels: Record<string, string> = {
            [routeLabel.remoteClinic]: "Telemedicina",
            [routeLabel.patient]: "Pacientes",
        };

        // '/paciente/12345' -> ['', 'paciente', '12345']
        const segments = activePath.split('/').filter(s => s.length > 0);

        if (activePath === "/") {

            const homeName = pathLabels[routeLabel.remoteClinic] || "Inicio";
            return [{ name: homeName, path: "/", isLast: true }];
        }

        const crumbs: BreadcrumbItemData[] = [{ name: capitalizeText(segments[0]), path: "/", isLast: false }];

        let currentPath = "";

        segments.forEach((segment, index) => {
            const isLast = index === segments.length - 1;
            const previousPath = currentPath;
            currentPath += `/${segment}`;

            let name = segment;
            let path = currentPath;

            const mappedName = pathLabels[currentPath];
            if (mappedName) {
                name = mappedName;
            }
            else if (previousPath === routeLabel.patient) {
                name = `Perfil ${segment}`;
                path = currentPath;
            }
            else if (currentPath === '/') {
                return;
            }

            crumbs.push({ name, path, isLast });
        });


        if (crumbs.length > 1) {
            crumbs[crumbs.length - 1].isLast = true;
            if (crumbs.length > 2) {
                crumbs[crumbs.length - 2].isLast = false;
            }
        }

        return crumbs;
    }, [activePath]);
};