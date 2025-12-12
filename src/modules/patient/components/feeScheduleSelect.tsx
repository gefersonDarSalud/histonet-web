import type { IdName } from "#/core/entities";
import { Select } from "@/components/app/select";

export const FeeScheduleSelect = () => {
    const feeScheduleList: IdName[] = [
        { id: 1, name: "hola" },
        { id: 2, name: "hola" },
        { id: 3, name: "hola" },
        { id: 4, name: "hola" }
    ]
    return (
        <>
            <Select list={feeScheduleList} title="Baremo" placeholder="Selecciona un baremo" />
        </>
    );
}