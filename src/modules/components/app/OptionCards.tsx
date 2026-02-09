import React from 'react';
import { cn } from "@/lib/utils";
import { User, ShieldCheck, Building2, FileSignature, CheckCircle2 } from "lucide-react";

interface Option {
    id: string;
    label: string;
    description: string;
    icon: React.ElementType;
}

interface OptionCardsProps {
    value?: string;
    onChange?: (value: string) => void;

    options?: Option[];
    className?: string;
}

export const OptionCards = (props: OptionCardsProps) => {
    const {
        value,
        onChange,
        options = defaultOptions,
        className
    } = props;

    const handleSelect = (id: string) => {
        if (onChange) {
            onChange(id);
        }
    };

    return (
        <div className={cn("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full", className)}>
            {options.map((option) => {
                const isSelected = value === option.id;
                const Icon = option.icon;

                return (
                    <button
                        key={option.id}
                        type="button"
                        onClick={() => handleSelect(option.id)}
                        className={cn(
                            "relative flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-200 text-center group",
                            "hover:border-primary/50 hover:bg-slate-50",
                            isSelected
                                ? "border-primary bg-blue-50/50 ring-1 ring-primary/20"
                                : "border-slate-200 bg-white"
                        )}
                    >
                        {isSelected && (
                            <div className="absolute top-2 right-2 text-primary">
                                <CheckCircle2 className="h-5 w-5 fill-white" />
                            </div>
                        )}

                        <div className={cn(
                            "p-3 rounded-full mb-3 transition-colors",
                            isSelected ? "bg-primary text-white" : "bg-slate-100 text-slate-500 group-hover:text-primary"
                        )}>
                            <Icon size={24} strokeWidth={2.5} />
                        </div>

                        <h3 className={cn(
                            "font-bold text-sm mb-1",
                            isSelected ? "text-primary" : "text-slate-700"
                        )}>
                            {option.label}
                        </h3>
                        <p className="text-xs text-slate-500 leading-tight">
                            {option.description}
                        </p>
                    </button>
                );
            })}
        </div>
    );
};

const defaultOptions: Option[] = [
    {
        id: 'particular',
        label: 'Particular',
        description: 'Atención directa sin intermediarios',
        icon: User
    },
    {
        id: 'asegurado',
        label: 'Asegurado',
        description: 'Cobertura mediante póliza de seguro',
        icon: ShieldCheck
    },
    {
        id: 'corporativo',
        label: 'Corporativo',
        description: 'Cargo a cuenta de empresa directa',
        icon: Building2
    },
    {
        id: 'convenio',
        label: 'Convenio',
        description: 'Acuerdos institucionales especiales',
        icon: FileSignature
    }
];

export default OptionCards;
