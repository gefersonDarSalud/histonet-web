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
        <Label className="hover:bg-accent/50 flex items-center gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600  dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
            <Checkbox
                checked={checked}
                onCheckedChange={onCheckedChange}
            />
            <p className="text-sm leading-none font-medium">
                {title}
            </p>
            {children}

        </Label>
    );
}