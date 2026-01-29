import type { ServiceContainer } from "#/core/services/serviceContainer";
import { ServiceContext } from "#/serviceProvider";
import { useContext } from "react";

export const useServices = (): ServiceContainer => {
    const context = useContext(ServiceContext);
    if (context === undefined) {
        throw new Error('useServices debe usarse dentro de un ServiceProvider');
    }
    return context;
};