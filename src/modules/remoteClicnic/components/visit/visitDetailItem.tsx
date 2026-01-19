import type { ReactNode } from "react";

export const VisitDetailItem = ({ children, label, value }: { children: ReactNode, label: string, value: string }) => (
    <div className="flex items-start gap-3">
        {children}
        <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{label}</p>
            <p className="font-semibold text-sm">{value}</p>
        </div>
    </div>
);