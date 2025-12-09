import { createContext, useMemo, type ReactNode } from "react";
import { ServiceContainer } from "./core/services/serviceContainer";

export const ServiceContext = createContext<ServiceContainer | undefined>(undefined);

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