import { Checkbox } from "@radix-ui/react-checkbox";
import { Fragment } from "react";
import { Label } from "recharts";

type CardProps = {
    children: React.ReactNode
    title: string,
}

export const CardCheckbox = ({ children, title }: CardProps) => {
    return (
        <Fragment>
            <Label className="hover:bg-accent/50 flex items-center gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950">
                <Checkbox className="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
                />
                <p className="text-sm leading-none font-medium">
                    {title}
                </p>
                {children}
            </Label>
        </Fragment>
    );
}