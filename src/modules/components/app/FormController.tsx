import type React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormField } from "./formField";

type BaseProps = {
    name: string;
    label?: React.ReactNode;
    description?: React.ReactNode;
    required?: boolean;
}

type InjectedProps = "value" | "onChange" | "onBlur" | "ref" | "name";

type PolymorphicProps<T extends React.ElementType> = BaseProps
    & { as?: T; }
    & Omit<React.ComponentPropsWithoutRef<T>, keyof BaseProps | 'as' | InjectedProps>;

export const FormController = <T extends React.ElementType>(props: PolymorphicProps<T>) => {
    const { as, name, label, description, ...rest } = props;
    const { control, formState: { errors } } = useFormContext();
    const errorObj = errors[name];
    const errorMessage = typeof errorObj?.message === 'string' ? errorObj.message : undefined;
    return <Controller
        control={control}
        name={name}
        render={({ field }) =>
            <FormField
                {...rest}
                as={as}
                field={field}
                description={description}
                label={label}
                error={errorMessage}
            />}
    />
}


