import type { ReactNode } from "react";

export const DataField = ({ children, label, value, colSpan, large }: { children: ReactNode, label: string, value: string, colSpan?: string, large?: boolean }) => (
    <div className="flex items-start gap-3">
        {children}
        <div className={colSpan || ''}>
            <p className="text-gray-500 dark:text-gray-400 text-xs">{label}</p>
            <p className={`font-semibold ${large ? 'text-lg' : 'text-sm'}`}>{value}</p>
        </div>
    </div>
);