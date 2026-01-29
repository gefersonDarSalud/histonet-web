/* eslint-disable @typescript-eslint/no-explicit-any */

import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";

interface props {
    as?: React.ElementType;
    label?: React.ReactNode;
    error?: string;
    description?: React.ReactNode;
    field: React.InputHTMLAttributes<HTMLInputElement>;
    required?: boolean;
    [key: string]: any;
}

export const FormField = (props: props) => {
    const { as: Component, field, label, error, required, description, ...rest } = props;
    return (
        <Field>
            {label &&
                <FieldLabel htmlFor={field.name}>
                    {label}
                </FieldLabel>
            }
            <Component id={field.name} value={field.value} onChange={field.onChange} {...field} {...rest} required={required} />
            {/* Renderizamos la descripción si existe */}
            {description && <FieldDescription>{description}</FieldDescription>}
            {error && <FieldError errors={[{ message: error }]} />}
        </Field>
    )
}