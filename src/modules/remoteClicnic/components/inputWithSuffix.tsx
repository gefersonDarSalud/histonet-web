// components/app/inputWithSuffix.tsx
import { Input } from "@/components/ui/input";

interface InputWithSuffixProps extends React.InputHTMLAttributes<HTMLInputElement> {
    suffix: string;
}

export const InputWithSuffix = ({ suffix, ...props }: InputWithSuffixProps) => {
    return (
        <div className="relative w-full">
            <Input
                {...props}
                value={props.value ?? ''}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-xs text-muted-foreground pointer-events-none">
                {suffix}
            </div>
        </div>
    );
};