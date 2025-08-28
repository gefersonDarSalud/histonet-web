/**
 * @interface PatientRepository
 * @property {function(id: string): Promise<Patient>} getById
 * @property {function(patient: Patient): Promise<void>} create
 */

import type Patient from "../entities/Patient.entities";

export default interface PatientRepository {
    getById(id: string): Promise<Patient>;
    create(patient: Patient): Promise<void>;
}