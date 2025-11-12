import type { Patient } from "./patient.entity";
import type { StatusVisit } from "./status.entity";
import type { TypeVisit } from "./typeVisit.entity";


export interface Visit {
    code: `${string}-${string}`;
    patient: Patient;
    date: string;
    time: string;
    status: StatusVisit;
    type: TypeVisit;
}