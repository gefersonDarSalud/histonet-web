import { createContext, useMemo, type ReactNode } from "react";
import { ServiceContainer } from "./core/services/serviceContainer";
import type { Services } from "./core/entities";

export const ServiceContext = createContext<Services | undefined>(undefined);

export const ServiceProvider = ({ children }: {
    children: ReactNode;
}) => {
    // 3. Crear el contenedor SÓLO una vez
    const container = useMemo(() => new ServiceContainer(), []);

    return (
        <ServiceContext.Provider value={container} >
            {children}
        </ServiceContext.Provider>
    );
};