import type { Services } from "#/core/entities";
import { ServiceContext } from "#/serviceProvider";
import { useContext } from "react";

export const useServices = (): Services => {
    const context = useContext(ServiceContext);
    if (context === undefined) {
        throw new Error('useServices debe usarse dentro de un ServiceProvider');
    }
    return context;
};