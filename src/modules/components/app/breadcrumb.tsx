import React from "react";
import { Breadcrumb as BreadcrumbComponent, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";

import { Link } from "react-router-dom";
import type { BreadcrumbItemData } from "#/hooks/useBreadCrumbPath";

interface AppBreadcrumbProps {
    items: BreadcrumbItemData[];
}

export const Breadcrumb = ({ items }: AppBreadcrumbProps) => {
    return (
        <BreadcrumbComponent className="text-sm font-medium">
            <BreadcrumbList>
                {items.map((item) => (
                    <React.Fragment key={item.path}>
                        <BreadcrumbItem>
                            {/* Si es el último elemento, usa BreadcrumbPage, si no, usa Link */}
                            {item.isLast ? (
                                <BreadcrumbPage className="text-white font-semibold">
                                    {item.name}
                                </BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink asChild>
                                    {/* Usamos Link de react-router-dom con el componente de shadcn/ui */}
                                    <Link
                                        to={item.path}
                                    // className="text-white/80 hover:text-white transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>

                        {/* Agregar separador si no es el último elemento */}
                        {!item.isLast && <BreadcrumbSeparator />}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </BreadcrumbComponent>
    );
}