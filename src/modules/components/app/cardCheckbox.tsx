import { Checkbox } from "@radix-ui/react-checkbox";
import { Label } from "../ui/label";

type CardProps = {
    children: React.ReactNode;
    title: string;
    checked: boolean;
    onCheckedChange: (checked: boolean) => void;
}

export const CardCheckbox = ({ children, title, checked, onCheckedChange }: CardProps) => {
    return (
        <Label className="hover:bg-accent/50 flex items-center gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
            <Checkbox
                checked={checked}
                onCheckedChange={onCheckedChange}
                className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
            />
            <p className="text-sm leading-none font-medium">
                {title}
            </p>
            {children}

        </Label>
    );
}