import type { Patient } from "./patient.entity";
import type { StatusVisit } from "./status.entity";
import type { TypeVisit } from "./typeVisit.entity";


export type Visit = {
    code: string;
    patient: Patient;
    date: string;
    time: string;
    status: StatusVisit;
    type: TypeVisit;
}