import { InputWithSuffix } from "../../inputWithSuffix";

export const Weight = (props: any) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        const regex = /^\d{0,3}(\.\d{0,1})?$/;
        if (regex.test(val)) {
            props.onChange(val);
        }
    };

    return <InputWithSuffix {...props} onChange={handleChange} />;
};